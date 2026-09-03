"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What counts as a stream for billing purposes?",
    a: "Each authorized video or sensor input connected to your pipeline counts as one stream, regardless of resolution or frame rate.",
  },
  {
    q: "Can we switch plans as our deployment grows?",
    a: "Yes. You can move from NODE to NETWORK to GRID as your stream count and site footprint expand no need to migrate infrastructure.",
  },
  {
    q: "Does pricing include the AI models we run?",
    a: "No. Pricing covers the perception infrastructure and platform access model licensing and compute for inference are managed separately based on what you deploy.",
  },
  {
    q: "Is there a cost for exceeding our plan's stream limit?",
    a: "Exceeding your plan's stream allocation typically requires upgrading to the next tier rather than incurring per-stream overage charges contact sales for specifics.",
  },
  {
    q: "What's included in GRID's custom pricing?",
    a: "GRID pricing is scoped to your deployment size, region count, and support needs contact sales for a quote tailored to your infrastructure.",
  },
  {
    q: "Do lower-tier plans get access to future feature updates?",
    a: "Feature access depends on your plan tier, but core pipeline and API stability are maintained across all plans as the platform evolves.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="divide-y divide-border border-y border-border">
      {FAQS.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="bg-surface">
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer hover:bg-foreground/5 transition-colors"
            >
              <span className="font-syne text-sm font-bold uppercase text-foreground pr-4">
                {faq.q}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted shrink-0 transition-transform ${
                  isOpen ? "rotate-180 text-foreground" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 font-mono text-xs text-muted leading-relaxed max-w-3xl">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
