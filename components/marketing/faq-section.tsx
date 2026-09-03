"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "We already have cameras and models do we need to replace them?",
    a: "No. Perceptras is built to work with compatible models and existing visual streams, not to force a hardware or model swap. We integrate with the hardware and models you already have, and provide tools to optimize and scale them.",
  },
  {
    q: "Will Perceptras guarantee accurate detection for our site?",
    a: "No platform can promise that. Accuracy depends on your models, camera placement, and site conditions Perceptras standardizes the pipeline around them. Our tools help you validate and tune performance, but ultimate responsibility for accuracy rests with your team.",
  },
  {
    q: "Can we run this across multiple sites without managing each one separately?",
    a: "Yes. The edge-to-core infrastructure manager gives you one view of deployment status and configuration across every connected site. From a single interface, you can monitor health, deploy pipeline updates, adjust zones, and review logs without logging into each device.",
  },
  {
    q: "How do we get perception data into our own operational systems?",
    a: "Structured events and metadata are delivered through APIs, so your existing systems can consume them without custom integration work per site. Configure ingestion pipelines once in Perceptras, and all connected sites will automatically route perception events to your APIs no additional integration per site required.",
  },
  {
    q: "What exactly does Perceptras take on versus what stays with our team?",
    a: "We handle the perception pipeline from camera ingestion, through AI model execution and multi-camera tracking, to event streaming and system health monitoring. Your team stays focused on defining detection requirements, placing cameras, validating model outputs, and managing site operations. We provide the reliable infrastructure; you provide the domain expertise and validation.",
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
