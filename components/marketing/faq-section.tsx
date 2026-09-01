'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What types of cameras and video streams does Perceptras support?',
    a: 'Perceptras supports all standard RTSP, RTP, and H.264/H.265/AV1 IP cameras, as well as industrial vision standards including GigE Vision, USB3 Vision, and MIPI CSI-2 sensor modules. No proprietary camera hardware is required.',
  },
  {
    q: 'Can Perceptras run 100% on-premise without internet connectivity?',
    a: 'Yes. Perceptras is built for air-gapped industrial environments. You can deploy all modules (Flow, Accel, Zone, Grid) directly on local edge hardware or on-premise servers with zero external telemetry transmission.',
  },
  {
    q: 'How does Perceptras achieve sub-2ms inference latency?',
    a: 'We use a unified zero-copy memory architecture. Video frames are decoded directly into accelerator tensor memory, eliminating CPU-to-GPU memory copies, while neural execution graphs are pre-compiled and quantized.',
  },
  {
    q: 'Can we use our own custom AI models with Perceptras Accel?',
    a: 'Yes. Perceptras Accel accepts standard PyTorch, ONNX, and JAX model exports. The compiler automatically optimizes layer operations and applies INT8/FP8 quantization without altering model accuracy.',
  },
  {
    q: 'How does multi-camera 3D tracking work across blind spots?',
    a: 'Perceptras Zone performs multi-camera extrinsic calibration to map all views to a single 3D metric coordinate system. Re-identification embeddings allow continuous tracking of entities even when they move across camera blind spots.',
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
                  isOpen ? 'rotate-180 text-foreground' : ''
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
