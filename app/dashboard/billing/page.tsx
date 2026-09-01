'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BillingDashboardPage() {
  const [currentPlan, setCurrentPlan] = useState('Professional');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('sanctum_token') : null;
    if (token) {
      fetch('https://portal.perceptras.net/api/payments/last-plan', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.data?.plan?.name) {
            setCurrentPlan(data.data.plan.name);
          }
        })
        .catch(() => {});
    }
  }, []);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border border-border p-6 bg-surface space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Subscription Plan
            </span>
            <h3 className="font-syne text-2xl font-bold uppercase text-foreground">
              {currentPlan} Plan
            </h3>
          </div>
          <span className="border border-foreground bg-foreground text-background font-mono text-[10px] font-bold px-2 py-0.5 uppercase">
            Active
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border font-mono text-xs">
          <div>
            <span className="text-muted text-[10px] uppercase">Channel Quota</span>
            <p className="font-bold text-foreground">Up to 64 Streams</p>
          </div>
          <div>
            <span className="text-muted text-[10px] uppercase">Billing Term</span>
            <p className="font-bold text-foreground">Annual (Save 20%)</p>
          </div>
          <div>
            <span className="text-muted text-[10px] uppercase">Next Renewal</span>
            <p className="font-bold text-foreground">August 2027</p>
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <Link href="/pricing/">
            <Button variant="primary" size="sm">
              Change Subscription Tier →
            </Button>
          </Link>
          <Link href="/contact?subject=Plan%20Upgrade%20Inquiry">
            <Button variant="outline" size="sm">
              Talk to Sizing Specialist
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
