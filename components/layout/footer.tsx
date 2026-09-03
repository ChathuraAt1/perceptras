"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/layout/section-container";
import { Logo } from "@/components/ui/logo";
import { FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Hide site footer when inside the dedicated dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-surface/30">
      <Container className="py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          <div>
            <Link
              href="/"
              className="inline-flex items-center mb-2.5 hover:opacity-90 transition-opacity"
            >
              <Logo className="h-8 sm:h-9 w-auto" />
            </Link>
            <p className="font-mono text-[10px] text-muted">
              Reusable perception infrastructure turning visual streams into
              structured operational events.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link
              href="/products/"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/features/"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing/"
              className="hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about/"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact/"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Separate Legal, Social & Copyright Sub-Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 font-mono text-[10px] text-muted">
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/privacy/"
              className="hover:text-foreground underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              className="hover:text-foreground underline transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies/"
              className="hover:text-foreground underline transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/Perceptras46"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Perceptras on X"
              title="X (Twitter)"
              className="p-2 border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/50 transition-all duration-200"
            >
              <FaXTwitter className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.facebook.com/perceptras/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Perceptras on Facebook"
              title="Facebook"
              className="p-2 border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/50 transition-all duration-200"
            >
              <FaFacebookF className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.youtube.com/@Perceptras"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to Perceptras on YouTube"
              title="YouTube"
              className="p-2 border border-border bg-surface text-muted hover:text-foreground hover:border-foreground/50 transition-all duration-200"
            >
              <FaYoutube className="h-3.5 w-3.5" />
            </a>
          </div>

          <div>
            <p>&copy; {year} Perceptras. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
