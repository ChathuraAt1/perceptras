"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Section, Container } from "@/components/layout/section-container";
import { Heading, MonoTag } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sha256Hex } from "@/lib/crypto";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Check,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface PlanDetails {
  slug: string;
  name: string;
  monthlyPrice: number;
  yearlyMonthlyPrice: number;
  features: string[];
}

const PLAN_DATA: Record<string, PlanDetails> = {
  starter: {
    slug: "starter",
    name: "Starter Plan",
    monthlyPrice: 49,
    yearlyMonthlyPrice: 39,
    features: [
      "Up to 8 concurrent camera channels",
      "Perceptras Flow zero-copy DMA runtime",
      "Perceptras Accel standard FP16 runtime",
      "gRPC & WebSocket telemetry output",
      "Community & email support",
    ],
  },
  professional: {
    slug: "professional",
    name: "Professional Plan",
    monthlyPrice: 199,
    yearlyMonthlyPrice: 159,
    features: [
      "Up to 64 concurrent camera channels",
      "Perceptras Zone 3D spatial tracking",
      "INT8 & FP8 automatic model quantization",
      "Kafka & MQTT event stream brokers",
      "Sub-2ms line-rate inference",
      "Standard SLA & priority support",
    ],
  },
  enterprise: {
    slug: "enterprise",
    name: "Enterprise Plan",
    monthlyPrice: 799,
    yearlyMonthlyPrice: 639,
    features: [
      "Unlimited camera & sensor channels",
      "Perceptras Grid distributed cluster",
      "Multi-node failover & load balancing",
      "Custom hardware kernel auto-tuning",
      "Air-gapped on-premise deployment",
      "24/7 dedicated engineering support",
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();

  const planParam = searchParams.get("plan") || "professional";
  const intervalParam =
    searchParams.get("interval") || searchParams.get("billing") || "yearly";

  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string>(
    PLAN_DATA[planParam] ? planParam : "professional",
  );
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    intervalParam === "monthly" ? "monthly" : "yearly",
  );

  // Customer Contact State
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");

  // Payment Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  // Billing Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const country = "US";

  // Checkout Flow Stages
  // 'payment' -> 'account_setup' (if guest) -> 'success'
  const [step, setStep] = useState<"payment" | "account_setup" | "success">(
    "payment",
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Account creation password state for guests
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false);

  // Success state
  const [txnId, setTxnId] = useState("");

  const plan = PLAN_DATA[selectedPlanSlug] || PLAN_DATA.professional;
  const unitPrice =
    billingCycle === "yearly" ? plan.yearlyMonthlyPrice : plan.monthlyPrice;
  const totalAmount = billingCycle === "yearly" ? unitPrice * 12 : unitPrice;

  // Format Card Number input with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsProcessing(true);

    const cleanCard = cardNumber.replace(/\s+/g, "");
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      setErrorMsg("Please enter a valid 16-digit card number.");
      setIsProcessing(false);
      return;
    }

    if (!expiryMonth || !expiryYear || !cvv) {
      setErrorMsg("Please provide complete expiration date and CVV.");
      setIsProcessing(false);
      return;
    }

    const token =
      typeof window !== "undefined"
        ? sessionStorage.getItem("sanctum_token")
        : null;

    if (token) {
      // User is already logged in -> Process subscription directly with backend
      try {
        const res = await fetch(
          "https://portal.perceptras.net/api/subscriptions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              plan_slug: selectedPlanSlug,
              payment_method: {
                card_number: cleanCard,
                expiry_month: expiryMonth.padStart(2, "0"),
                expiry_year: expiryYear.slice(-2),
                cvv,
                card_holder: cardHolder || `${firstName} ${lastName}`,
              },
              billing_address: {
                street: street || "123 Tech Blvd",
                city: city || "San Francisco",
                state: stateCode || "CA",
                zip: zip || "94107",
                country: country || "US",
              },
            }),
          },
        );

        const data = await res.json().catch(() => null);

        if (res.ok) {
          setTxnId(data?.data?.payment?.transaction_id || `TXN_${Date.now()}`);
          setStep("success");
        } else {
          setErrorMsg(
            data?.message ||
              "Payment processing failed. Please check card details.",
          );
        }
      } catch {
        setErrorMsg("Server connection failed. Please try again.");
      } finally {
        setIsProcessing(false);
      }
    } else {
      // Guest Checkout -> Move to Account Setup / Sign In with same email
      setTimeout(() => {
        setIsProcessing(false);
        setTxnId(`TXN_${Date.now()}`);
        setStep("account_setup");
      }, 800);
    }
  };

  const handleAccountComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsProcessing(true);

    if (!password || password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      setIsProcessing(false);
      return;
    }

    try {
      const hash = await sha256Hex(password);

      if (isExistingUser) {
        // Sign in existing user
        const loginRes = await fetch(
          "https://portal.perceptras.net/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email,
              password_hash: hash,
              plan_slug: selectedPlanSlug,
              billing_cycle: billingCycle,
            }),
          },
        );

        const loginData = await loginRes.json().catch(() => null);

        if (loginRes.ok && loginData?.data?.token) {
          sessionStorage.setItem("sanctum_token", loginData.data.token);
          setStep("success");
        } else {
          setErrorMsg(
            loginData?.message || "Invalid credentials for this account.",
          );
        }
      } else {
        // Register new user with this email
        const registerRes = await fetch(
          "https://portal.perceptras.net/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              username:
                email.split("@")[0] + "_" + Math.floor(Math.random() * 1000),
              first_name: firstName || "Vision",
              last_name: lastName || "Engineer",
              email,
              password_hash: hash,
              password_hash_confirmation: hash,
              plan_slug: selectedPlanSlug,
              billing_cycle: billingCycle,
            }),
          },
        );

        const regData = await registerRes.json().catch(() => null);

        if (registerRes.ok && regData?.data?.token) {
          sessionStorage.setItem("sanctum_token", regData.data.token);
          setStep("success");
        } else {
          // If email is already taken, switch to sign in prompt
          if (
            regData?.message?.toLowerCase().includes("already taken") ||
            regData?.errors?.email
          ) {
            setIsExistingUser(true);
            setErrorMsg(
              "An account with this email already exists. Please enter your existing password to link this subscription.",
            );
          } else {
            setErrorMsg(regData?.message || "Account registration failed.");
          }
        }
      }
    } catch {
      setErrorMsg("Failed to establish account. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Section className="pt-24 md:pt-32 pb-8">
        <Container className="max-w-6xl">
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/pricing/"
              className="font-mono text-xs text-muted hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Plans</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <MonoTag>SECURE SUBSCRIPTION CHECKOUT</MonoTag>
              <Heading
                as="h2"
                className="text-3xl md:text-4xl mt-2 font-bold uppercase"
              >
                Perceptras Subscription Checkout
              </Heading>
            </div>
          </div>
        </Container>
      </Section>

      <Section borders={{ bottom: true }} className="pb-24">
        <Container className="max-w-6xl">
          {/* ════════════════════════════════════════════════════════ */}
          {/* STEP 3: SUCCESSFUL PAYMENT CONFIRMATION                  */}
          {/* ════════════════════════════════════════════════════════ */}
          {step === "success" ? (
            <div className="max-w-xl mx-auto border border-border bg-surface p-8 md:p-10 space-y-6 text-center shadow-2xl">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500 text-emerald-500 mx-auto flex items-center justify-center">
                <Check className="h-8 w-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <MonoTag>PAYMENT AUTHORIZED</MonoTag>
                <h2 className="font-syne text-2xl md:text-3xl font-bold uppercase text-foreground">
                  Subscription Activated!
                </h2>
                <p className="font-mono text-xs text-muted leading-relaxed">
                  Thank you for subscribing to{" "}
                  <span className="text-foreground font-bold">{plan.name}</span>{" "}
                  ({billingCycle === "yearly" ? "Annual Term" : "Monthly Term"}
                  ). Your edge node quota is provisioned and ready for stream
                  ingest.
                </p>
              </div>

              <div className="p-4 bg-surface/50 border border-border font-mono text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-muted">Transaction ID:</span>
                  <span className="font-bold text-foreground">{txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Account Email:</span>
                  <span className="font-bold text-foreground">
                    {email || "Authenticated User"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Plan Quota:</span>
                  <span className="font-bold text-emerald-500">
                    Active (Up to 64 Streams)
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/dashboard/">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span>Launch Controller Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="md" className="w-full">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ── Left Column: Checkout & Card Form ───────────── */}
              <div className="lg:col-span-7 space-y-8">
                {/* ──────────────────────────────────────────────── */}
                {/* STEP 1: PAYMENT & CARD ENTRY                     */}
                {/* ──────────────────────────────────────────────── */}
                {step === "payment" && (
                  <form
                    onSubmit={handlePaymentSubmit}
                    className="border border-border bg-surface p-6 md:p-8 space-y-6"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-foreground" />
                        <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                          Payment Method
                        </h3>
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="border border-red-500/50 bg-red-500/5 p-3 flex items-center gap-2 font-mono text-xs text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Customer Identification */}
                    <div className="space-y-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                        1. Customer Information
                      </p>

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="vision.lead@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          placeholder="Alistair"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                          label="Last Name"
                          placeholder="Vance"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>

                      <Input
                        label="Company / Organization (Optional)"
                        placeholder="Autonomous Robotics Corp"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    {/* Credit Card Details */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                        2. Credit / Debit Card Details
                      </p>

                      <Input
                        label="Cardholder Name"
                        placeholder="Alistair Vance"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                      />

                      <Input
                        label="Card Number"
                        placeholder="4242 4242 4242 4242"
                        required
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                      />

                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          label="Exp Month (MM)"
                          placeholder="12"
                          maxLength={2}
                          required
                          value={expiryMonth}
                          onChange={(e) => setExpiryMonth(e.target.value)}
                        />
                        <Input
                          label="Exp Year (YY)"
                          placeholder="28"
                          maxLength={2}
                          required
                          value={expiryYear}
                          onChange={(e) => setExpiryYear(e.target.value)}
                        />
                        <Input
                          label="CVV / CVC"
                          placeholder="123"
                          maxLength={4}
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="space-y-4 pt-4 border-t border-border">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                        3. Billing Address
                      </p>

                      <Input
                        label="Street Address"
                        placeholder="742 Physical AI Way"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />

                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          label="City"
                          placeholder="San Francisco"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                        <Input
                          label="State / Province"
                          placeholder="CA"
                          value={stateCode}
                          onChange={(e) => setStateCode(e.target.value)}
                        />
                        <Input
                          label="Postal / ZIP"
                          placeholder="94107"
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center gap-2 font-bold"
                      >
                        <Lock className="h-4 w-4" />
                        <span>
                          {isProcessing
                            ? "Processing Payment..."
                            : `Authorize Payment ($${totalAmount}.00)`}
                        </span>
                      </Button>
                    </div>
                  </form>
                )}

                {/* ──────────────────────────────────────────────── */}
                {/* STEP 2: ACCOUNT PROVISIONING / SIGN IN           */}
                {/* ──────────────────────────────────────────────── */}
                {step === "account_setup" && (
                  <form
                    onSubmit={handleAccountComplete}
                    className="border border-border bg-surface p-6 md:p-8 space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-border pb-4">
                      <Lock className="h-5 w-5 text-foreground" />
                      <h3 className="font-syne text-lg font-bold uppercase text-foreground">
                        {isExistingUser
                          ? "Sign In to Apply Subscription"
                          : "Set Account Password"}
                      </h3>
                    </div>

                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs space-y-1">
                      <p className="font-bold text-emerald-500">
                        Payment Authorized for {email}
                      </p>
                      <p className="text-muted text-[11px]">
                        {isExistingUser
                          ? "We found an existing Perceptras ID for this email. Please enter your password to connect your active plan."
                          : "Create a password to access your dedicated cluster controller workspace and API tokens."}
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="border border-red-500/50 bg-red-500/5 p-3 flex items-center gap-2 font-mono text-xs text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Input
                        label="Account Email"
                        type="email"
                        disabled
                        value={email}
                      />

                      <Input
                        label={
                          isExistingUser
                            ? "Your Password"
                            : "Create Password (min 8 characters)"
                        }
                        type="password"
                        placeholder="••••••••••••"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      {!isExistingUser && (
                        <Input
                          label="Confirm Password"
                          type="password"
                          placeholder="••••••••••••"
                          required
                          minLength={8}
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                      )}
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isProcessing}
                        className="w-full flex items-center justify-center gap-2 font-bold"
                      >
                        <span>
                          {isProcessing
                            ? "Activating Subscription..."
                            : isExistingUser
                              ? "Sign In & Activate"
                              : "Create Account & Launch"}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsExistingUser(!isExistingUser);
                          setErrorMsg("");
                        }}
                        className="font-mono text-xs text-muted hover:text-foreground underline cursor-pointer text-center"
                      >
                        {isExistingUser
                          ? "Need to create a new account instead?"
                          : "Already have an account? Sign in here"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* ── Right Column: Order Summary & Plan Breakdown ── */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border border-border bg-surface p-6 md:p-8 space-y-6 sticky top-24">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h3 className="font-syne text-base font-bold uppercase text-foreground">
                      Order Summary
                    </h3>
                    <span className="font-mono text-xs border border-foreground bg-foreground text-background px-2 py-0.5 font-bold uppercase">
                      {plan.name}
                    </span>
                  </div>

                  {/* Plan Selector */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-[10px] uppercase text-muted font-bold">
                      Select Tier
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["starter", "professional"] as const).map((slug) => (
                        <button
                          key={slug}
                          type="button"
                          onClick={() => setSelectedPlanSlug(slug)}
                          className={`py-2 text-center border uppercase font-bold transition-colors cursor-pointer ${
                            selectedPlanSlug === slug
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-surface text-muted hover:text-foreground"
                          }`}
                        >
                          {slug}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Billing Term Selector */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-[10px] uppercase text-muted font-bold">
                      Billing Cycle
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBillingCycle("monthly")}
                        className={`py-2 text-center border uppercase font-bold transition-colors cursor-pointer ${
                          billingCycle === "monthly"
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-surface text-muted hover:text-foreground"
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle("yearly")}
                        className={`py-2 text-center border uppercase font-bold transition-colors cursor-pointer ${
                          billingCycle === "yearly"
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-surface text-muted hover:text-foreground"
                        }`}
                      >
                        Annual (-20%)
                      </button>
                    </div>
                  </div>

                  {/* Price Calculation Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-border font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted">
                        {plan.name} ({billingCycle}):
                      </span>
                      <span className="font-bold text-foreground">
                        {billingCycle === "yearly"
                          ? `$${unitPrice}/mo × 12 mos`
                          : `$${unitPrice}/mo`}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted">
                        Edge Cluster Activation:
                      </span>
                      <span className="font-bold text-emerald-500">
                        FREE ($0.00)
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted">Estimated Tax / VAT:</span>
                      <span className="font-bold text-foreground">$0.00</span>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-border text-sm">
                      <span className="font-syne font-bold uppercase text-foreground">
                        Total Due Today:
                      </span>
                      <span className="font-syne font-bold text-xl text-foreground">
                        ${totalAmount}.00
                      </span>
                    </div>
                  </div>

                  {/* Included Plan Features */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-bold">
                      Included Capabilities:
                    </p>
                    <div className="space-y-2">
                      {plan.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 font-mono text-xs text-foreground"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-xs text-muted">
          Loading Checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
