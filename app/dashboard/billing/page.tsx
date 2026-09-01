'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const INVOICES = [
  { id: 'INV-2026-08', date: 'August 15, 2026', amount: '$799.00', plan: 'Professional (Annual)', status: 'Paid' },
  { id: 'INV-2025-08', date: 'August 15, 2025', amount: '$799.00', plan: 'Professional (Annual)', status: 'Paid' },
];

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
    <div className="space-y-8 max-w-5xl">
      {/* Current Subscription Card */}
      <div className="border border-border p-6 md:p-8 bg-surface space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Current Active Subscription
            </span>
            <h3 className="font-syne text-2xl md:text-3xl font-bold uppercase text-foreground mt-1">
              {currentPlan} Tier
            </h3>
          </div>
          <span className="border border-foreground bg-foreground text-background font-mono text-[10px] font-bold px-3 py-1 uppercase self-start">
            Active // Annual Billing
          </span>
        </div>

        {/* Quota breakdown meters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-border font-mono text-xs">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Camera Stream Quota:</span>
              <span className="font-bold text-foreground">4 / 64 Channels</span>
            </div>
            <div className="w-full bg-border h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[6.25%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Node Clustering:</span>
              <span className="font-bold text-foreground">3 / 8 Nodes</span>
            </div>
            <div className="w-full bg-border h-1.5 overflow-hidden">
              <div className="bg-foreground h-full w-[37.5%]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted">Next Renewal:</span>
              <span className="font-bold text-foreground">August 2027</span>
            </div>
            <p className="text-[10px] text-muted">20% Annual Discount Applied</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <Link href="/pricing/">
            <Button variant="primary" size="sm">
              Change Subscription Plan →
            </Button>
          </Link>
          <Link href="/contact?subject=Enterprise%20Sizing%20Inquiry">
            <Button variant="outline" size="sm">
              Request Custom Capacity Quote
            </Button>
          </Link>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="space-y-4">
        <h4 className="font-syne text-sm font-bold uppercase text-foreground">
          Billing &amp; Invoice History
        </h4>

        <div className="border border-border bg-surface overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-surface/80 text-[10px] uppercase tracking-wider text-muted">
                <th className="py-3 px-4 font-semibold">Invoice ID</th>
                <th className="py-3 px-4 font-semibold">Billing Date</th>
                <th className="py-3 px-4 font-semibold">Plan Description</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-foreground/5 transition-colors">
                  <td className="py-3 px-4 font-bold text-foreground">{inv.id}</td>
                  <td className="py-3 px-4 text-muted">{inv.date}</td>
                  <td className="py-3 px-4 text-foreground">{inv.plan}</td>
                  <td className="py-3 px-4 font-bold text-foreground">{inv.amount}</td>
                  <td className="py-3 px-4 text-emerald-500 font-bold">{inv.status}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading ${inv.id} receipt PDF...`)}
                      className="text-foreground hover:underline inline-flex items-center gap-1 font-bold text-[10px]"
                    >
                      <Download className="h-3 w-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
