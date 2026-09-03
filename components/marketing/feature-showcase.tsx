"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FeatureShowcase() {
  // Live dynamic telemetry simulation
  const [tick, setTick] = useState(0);
  const [timeStr, setTimeStr] = useState("10:42:15.04");
  const [latency, setLatency] = useState("1.2");
  const [fps, setFps] = useState("240.0");
  const [tracks, setTracks] = useState(14);
  const [amr1X, setAmr1X] = useState("12.4");
  const [amr1Y, setAmr1Y] = useState("4.8");
  const [amr1Conf, setAmr1Conf] = useState("99.4");
  const [amr2X, setAmr2X] = useState("24.8");
  const [amr2Y, setAmr2Y] = useState("9.1");
  const [amr2Conf, setAmr2Conf] = useState("98.7");

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);

      // Current live time
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(
        2,
        "0",
      );
      setTimeStr(`${hh}:${mm}:${ss}.${ms}`);

      // Small realistic fluctuations
      const t = Date.now() / 1000;
      setFps((239.5 + Math.sin(t * 1.5) * 0.7).toFixed(1));
      setLatency((1.18 + Math.cos(t * 2) * 0.12).toFixed(1));
      setTracks(Math.sin(t * 0.3) > 0.4 ? 15 : 14);

      // Robotic navigation coordinates
      setAmr1X((12.4 + Math.sin(t * 0.8) * 0.25).toFixed(1));
      setAmr1Y((4.8 + Math.cos(t * 0.8) * 0.18).toFixed(1));
      setAmr1Conf((99.2 + Math.sin(t * 3) * 0.4).toFixed(1));

      setAmr2X((24.8 + Math.cos(t * 0.6) * 0.3).toFixed(1));
      setAmr2Y((9.1 + Math.sin(t * 0.6) * 0.22).toFixed(1));
      setAmr2Conf((98.5 + Math.cos(t * 2.5) * 0.4).toFixed(1));
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Left Column: Catchy Customer-Focused Narrative */}
      <div className="lg:col-span-6 space-y-6">
        <div className="inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground" />
          <span>Real-World Perception</span>
        </div>

        <h2 className="font-syne text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
          One perception layer. Every physical AI use case.
        </h2>

        <p className="font-mono text-sm text-muted leading-relaxed">
          Perceptras standardizes the parts of the stack that keep getting
          rebuilt stream onboarding, inference configuration, tracking, event
          output, and observability so teams compose and deploy computer-vision
          pipelines instead of reinventing them.
        </p>

        <div className="space-y-3 pt-2">
          {[
            "Visual-stream onboarding",
            "Perception pipeline orchestration",
            "Model inference and tracking",
            "Structured event and metadata APIs",
            "Edge-to-core deployment management",
            "Pipeline observability and validation support",
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5 stroke-[1.75]" />
              <span className="font-mono text-xs text-foreground leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/contact?subject=Architecture%20Consultation">
            <Button
              variant="primary"
              size="md"
              className="flex items-center gap-2"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/products/">
            <Button variant="outline" size="md">
              View Product Suite
            </Button>
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Frame / Realistic Live Camera Feed Simulation */}
      <div className="lg:col-span-6">
        <div className="border border-border bg-surface relative p-1 shadow-2xl">
          {/* Corner crosshairs */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-foreground z-20" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-foreground z-20" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-foreground z-20" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-foreground z-20" />

          {/* Top telemetry bar */}
          <div className="border-b border-border px-4 py-2.5 bg-surface/90 flex items-center justify-between font-mono text-[10px]">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-foreground font-bold uppercase tracking-wider">
                LIVE FEED // CLUSTER NODE 01
              </span>
              <span className="hidden sm:inline text-muted font-normal">
                [CAM_04: BAY 4A]
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted hidden sm:inline">
                64 STREAMS SYNCHRONIZED
              </span>
              <span className="text-emerald-500 font-bold border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px]">
                ONLINE
              </span>
            </div>
          </div>

          {/* Perception canvas simulation with realistic photo feed */}
          <div className="relative aspect-[16/10] bg-zinc-950 flex flex-col justify-between overflow-hidden text-zinc-100 font-mono select-none">
            {/* Real high-angle warehouse CCTV image */}
            <Image
              src="/images/home/camera-feed.webp"
              alt="Live industrial perception camera feed showing autonomous robots navigating warehouse floor"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-center filter brightness-[0.92] contrast-[1.08]"
            />

            {/* Subtle CCTV scanline effect */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, #000, #000 1px, transparent 1px, transparent 2px)",
                backgroundSize: "100% 2px",
              }}
            />

            {/* Real-time sweeping laser scan radar line */}
            <div
              className="absolute left-0 right-0 h-24 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 pointer-events-none transition-all duration-300"
              style={{
                top: `${((tick * 3) % 110) - 10}%`,
              }}
            />

            {/* Top metadata overlay HUD */}
            <div className="relative z-10 p-3 sm:p-4 flex justify-between items-start text-[10px]">
              <div className="bg-zinc-950/85 backdrop-blur-xs border border-zinc-700/80 px-2.5 py-1.5 space-y-0.5 shadow-lg">
                <div className="flex items-center gap-2 pb-0.5 border-b border-zinc-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-200 font-bold text-[9px] tracking-wider">
                    {timeStr}
                  </span>
                </div>
                <p className="text-zinc-400 pt-0.5">
                  LATENCY:{" "}
                  <span className="text-emerald-400 font-bold">
                    {latency} ms
                  </span>
                </p>
                <p className="text-zinc-400">
                  FPS: <span className="text-zinc-100 font-bold">{fps}</span>
                </p>
              </div>

              <div className="bg-zinc-950/85 backdrop-blur-xs border border-zinc-700/80 px-2.5 py-1.5 text-right space-y-0.5 shadow-lg">
                <p className="text-zinc-400">
                  PRECISION:{" "}
                  <span className="text-zinc-100 font-bold">INT8 / FP8</span>
                </p>
                <p className="text-zinc-400">
                  TRACKS:{" "}
                  <span className="text-emerald-400 font-bold">
                    {tracks} ACTIVE
                  </span>
                </p>
                <p className="text-zinc-400 text-[9px]">
                  STREAM:{" "}
                  <span className="text-zinc-300 font-semibold">
                    1080p @ 60Hz
                  </span>
                </p>
              </div>
            </div>

            {/* Visual Bounding Box 1 Front Left Orange AMR */}
            <div className="absolute bottom-[8%] left-[23%] w-[22%] h-[24%] border-2 border-emerald-400 bg-emerald-500/15 pointer-events-none shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all duration-150">
              <div className="absolute -top-5 left-0 bg-emerald-500 text-zinc-950 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap flex items-center gap-1 shadow">
                <span>ID_04 // ROBOT_AMR [{amr1Conf}%]</span>
              </div>
              <div className="absolute bottom-1 right-1 text-[8px] text-emerald-300 bg-zinc-950/80 px-1 py-0.5 border border-emerald-500/40">
                X: {amr1X}m | Y: {amr1Y}m
              </div>
              {/* Corner crosshairs */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-emerald-400" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-emerald-400" />
            </div>

            {/* Visual Bounding Box 2 Front Right Blue AMR */}
            <div className="absolute bottom-[13%] left-[51%] w-[21%] h-[24%] border-2 border-sky-400 bg-sky-500/15 pointer-events-none shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-150">
              <div className="absolute -top-5 left-0 bg-sky-400 text-zinc-950 text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider whitespace-nowrap shadow">
                ID_11 // ROBOT_AMR [{amr2Conf}%]
              </div>
              <div className="absolute bottom-1 right-1 text-[8px] text-sky-200 bg-zinc-950/80 px-1 py-0.5 border border-sky-500/40">
                ZONE: AISLE_04 | X: {amr2X}m | Y: {amr2Y}m
              </div>
              {/* Corner crosshairs */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-sky-400" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-sky-400" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-sky-400" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-sky-400" />
            </div>

            {/* Visual Bounding Box 3 High-bay Storage Racks Spatial Geofence */}
            <div className="absolute top-[48%] left-[64%] w-[16%] h-[18%] border border-dashed border-amber-400/80 bg-amber-500/10 pointer-events-none">
              <div className="absolute -top-4 left-0 bg-amber-500/90 text-zinc-950 text-[8px] font-bold px-1 py-0.2 uppercase">
                ID_07 // AMR_TRANSFER
              </div>
            </div>

            {/* Dynamic Spatial Trajectory Vectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Path 1: From left lane to center AMR */}
              <path
                d="M 120 380 Q 200 360 310 370 T 430 350"
                fill="none"
                stroke="rgba(52, 211, 153, 0.75)"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeDashoffset={-tick * 2}
              />
              <circle cx="310" cy="370" r="3" fill="#34d399" />
              <circle cx="430" cy="350" r="4" fill="#ffffff" />

              {/* Path 2: Right AMR outbound navigation */}
              <path
                d="M 620 400 Q 700 370 780 340"
                fill="none"
                stroke="rgba(56, 189, 248, 0.7)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeDashoffset={-tick * 3}
              />
              <circle cx="780" cy="340" r="3" fill="#38bdf8" />
            </svg>

            {/* Bottom status strip HUD */}
            <div className="relative z-10 p-3 sm:p-4">
              <div className="flex items-center justify-between text-[10px] bg-zinc-950/90 backdrop-blur-xs border border-zinc-700/80 px-3 py-1.5 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-zinc-400">PIPELINE:</span>
                  <span className="text-zinc-100 font-bold">
                    PERCEPTRAS FLOW &amp; ZONE
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span className="text-emerald-400 font-bold tracking-wider">
                    ZERO-COPY STREAMING
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Caption */}
          <div className="p-3 bg-surface border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] text-muted">
            <span>
              Spatial intelligence tracking across overlapping camera views
            </span>
            <span className="text-foreground font-semibold">
              100% On-Premise
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
