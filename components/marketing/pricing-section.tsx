'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';

interface Plan {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  monthly_price: number | string;
  yearly_price: number | string;
  popular?: boolean;
  features: string[];
}

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    slug: 'starter',
    description: 'Essential real-time video ingest and AI inference for prototypes and single-facility pilots.',
    monthly_price: '49',
    yearly_price: '39',
    popular: false,
    features: [
      'Up to 8 concurrent camera streams',
      'Perceptras Flow zero-copy pipeline',
      'Perceptras Accel standard runtime',
      'gRPC & WebSocket telemetry output',
      'Community & email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    slug: 'professional',
    description: 'High-density multi-camera perception and 3D spatial analytics for production deployments.',
    monthly_price: '199',
    yearly_price: '159',
    popular: true,
    features: [
      'Up to 64 concurrent camera streams',
      'Perceptras Zone 3D spatial tracking',
      'INT8 & FP8 automatic quantization',
      'Kafka & MQTT event stream brokers',
      'Sub-2ms line-rate inference',
      'Standard SLA & priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    slug: 'enterprise',
    description: 'Custom cluster orchestration, multi-node edge grid, and dedicated architectural support.',
    monthly_price: 'Custom',
    yearly_price: 'Custom',
    popular: false,
    features: [
      'Unlimited camera & sensor streams',
      'Perceptras Grid distributed cluster',
      'Multi-node failover & load balancing',
      'Custom hardware kernel auto-tuning',
      'Air-gapped on-premise deployment',
      '24/7 dedicated engineering support & custom SLA',
    ],
  },
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [plans, setPlans] = useState<Plan[]>(DEFAULT_PLANS);

  useEffect(() => {
    // Attempt to fetch live subscription plans from backend
    fetch('https://portal.perceptras.net/api/subscription-plans')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          // Format backend plans into frontend structure
          interface BackendPlan {
            id?: string | number;
            name: string;
            slug: string;
            description?: string;
            price?: number | string;
            monthly_price?: number | string;
            yearly_price?: number | string;
            popular?: boolean;
            features?: string[];
          }
          const formatted: Plan[] = (data.data as BackendPlan[]).map((item) => ({
            id: item.id || item.slug,
            name: item.name,
            slug: item.slug,
            description: item.description || '',
            monthly_price: item.monthly_price ?? item.price ?? '0',
            yearly_price: item.yearly_price ?? Math.round(Number(item.price || 0) * 0.8),
            popular: Boolean(item.popular),
            features: Array.isArray(item.features) ? item.features : [],
          }));
          if (formatted.length >= 3) {
            setPlans(formatted);
          }
        }
      })
      .catch(() => {
        // Fallback to default plans silently
      });
  }, []);

  return (
    <div className="space-y-12">
      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center gap-3">
        <span
          className={`font-mono text-xs uppercase tracking-wider cursor-pointer ${
            billingCycle === 'monthly' ? 'text-foreground font-bold' : 'text-muted'
          }`}
          onClick={() => setBillingCycle('monthly')}
        >
          Monthly Billing
        </span>
        <button
          type="button"
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer border border-border bg-surface p-0.5 transition-colors focus:outline-none"
        >
          <span
            className={`inline-block h-4 w-4 bg-foreground transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <span
          className={`font-mono text-xs uppercase tracking-wider cursor-pointer flex items-center gap-2 ${
            billingCycle === 'yearly' ? 'text-foreground font-bold' : 'text-muted'
          }`}
          onClick={() => setBillingCycle('yearly')}
        >
          <span>Annual Billing</span>
          <span className="border border-foreground bg-foreground text-background font-mono text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
            Save 20%
          </span>
        </span>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => {
          const isCustom = plan.monthly_price === 'Custom';
          const price = billingCycle === 'yearly' ? plan.yearly_price : plan.monthly_price;

          return (
            <div
              key={plan.slug}
              className={`border p-8 bg-surface flex flex-col justify-between transition-colors relative ${
                plan.popular
                  ? 'border-foreground ring-1 ring-foreground shadow-sm'
                  : 'border-border hover:border-foreground/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-6 bg-foreground text-background font-mono text-[10px] font-bold px-3 py-0.5 uppercase tracking-widest border border-border z-20">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-6">
                  <h3 className="font-syne text-xl font-bold uppercase">{plan.name}</h3>
                  <p className="font-mono text-xs text-muted mt-2 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1">
                    {isCustom ? (
                      <span className="font-syne text-3xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="font-mono text-sm text-muted">$</span>
                        <span className="font-syne text-4xl font-bold text-foreground">
                          {price}
                        </span>
                        <span className="font-mono text-xs text-muted">/ month</span>
                      </>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-muted mt-1">
                    {isCustom
                      ? 'Tailored to your camera topology'
                      : billingCycle === 'yearly'
                      ? 'Billed annually'
                      : 'Billed monthly'}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted font-semibold">
                    Included Capabilities:
                  </p>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-mono text-xs text-foreground">
                      <Check className="h-3.5 w-3.5 text-foreground shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={
                    isCustom
                      ? '/contact?subject=Enterprise%20Inquiry'
                      : `/auth/register?plan=${plan.slug}&interval=${billingCycle}`
                  }
                >
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span>{isCustom ? 'Contact Solutions' : 'Get Started'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
