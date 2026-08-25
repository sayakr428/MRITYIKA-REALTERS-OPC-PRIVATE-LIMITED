"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/** How long the mascot holds at centre-screen before flying to the corner. */
const INTRO_HOLD_MS = 1500;

/** Canvas working resolution. The source video is 720x1280 (9:16). */
const CANVAS_W = 360;
const CANVAS_H = 640;

/** White-knockout thresholds: fully clear above OPAQUE_MAX, feathered below. */
const CLEAR_AT = 250;
const FEATHER_AT = 242;

/** ElevenLabs Conversational AI agent, extracted from your talk-to link. */
const AGENT_ID = "agent_5001m0w0dk76e79rw5k126hnkwjx";

export function IntroMascot() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"intro" | "docked">("intro");
  const [panelOpen, setPanelOpen] = useState(false);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setPhase("docked");
      return;
    }
    const t = setTimeout(() => setPhase("docked"), INTRO_HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  // The source video is H.264 with no alpha channel, so the mascot sits on a
  // baked-in white ground. Key that white out per frame onto a canvas, which
  // gives real transparency and keeps the mascot readable on dark sections.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (video.readyState < 2) return;

      ctx.drawImage(video, 0, 0, CANVAS_W, CANVAS_H);
      const frame = ctx.getImageData(0, 0, CANVAS_W, CANVAS_H);
      const d = frame.data;

      for (let i = 0; i < d.length; i += 4) {
        const min = Math.min(d[i], d[i + 1], d[i + 2]);
        if (min >= CLEAR_AT) {
          d[i + 3] = 0;
        } else if (min > FEATHER_AT) {
          d[i + 3] = Math.round((255 * (CLEAR_AT - min)) / (CLEAR_AT - FEATHER_AT));
        }
      }

      ctx.putImageData(frame, 0, 0);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const isIntro = phase === "intro";

  return (
    <>
      {/* A translucent veil, not a curtain: the site loads and stays readable
          underneath, just dimmed, while the mascot is centre-stage. */}
      <AnimatePresence>
        {isIntro ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[100] bg-white/75"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : null}
      </AnimatePresence>

      {/* Loaded once, the first time the panel is opened. Matches ElevenLabs'
          documented embed snippet exactly (agent-id + this script), so the
          custom element upgrades in place once the script registers it. */}
      {widgetLoaded ? (
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
        />
      ) : null}

      {/* The widget forces its own custom element to `position:fixed` (see
          the global CSS override for it), so it must never sit inside an
          animated/transformed ancestor — a non-`none` `transform` on any
          parent would silently hijack it into a new containing block and
          break that fixed positioning. Rendered as a bare sibling instead. */}
      {panelOpen && scriptReady ? (
        <elevenlabs-convai
          agent-id={AGENT_ID}
          variant="expanded"
          avatar-orb-color-1="#1f4e33"
          avatar-orb-color-2="#c29b45"
        />
      ) : null}

      {/* Loading chip only — opacity-only animation, so it never risks
          becoming a containing block for the widget above. */}
      <AnimatePresence>
        {panelOpen && !scriptReady ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-21 z-[102] flex h-12 items-center gap-2 rounded-full bg-paper px-4 shadow-lifted md:bottom-14 md:right-30"
          >
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-green-900/20 border-t-green-900" />
            <span className="text-xs text-ink-soft">Loading…</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layout
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ aspectRatio: "720 / 1280" }}
        className={
          isIntro
            ? "pointer-events-none fixed left-1/2 top-1/2 z-[101] h-[76vh] -translate-x-1/2 -translate-y-1/2"
            : "fixed bottom-24 right-3 z-[101] h-28 md:bottom-6 md:right-6 md:h-40"
        }
      >
        <button
          type="button"
          onClick={() => {
            if (isIntro) return;
            setWidgetLoaded(true);
            setPanelOpen((v) => !v);
          }}
          aria-label={isIntro ? undefined : panelOpen ? "Close chat" : "Talk to Shantiban City"}
          aria-expanded={isIntro ? undefined : panelOpen}
          tabIndex={isIntro ? -1 : 0}
          className="relative block h-full w-full"
          style={{ cursor: isIntro ? "default" : "pointer" }}
        >
          {/* Decode source only: the canvas above is what the visitor sees. */}
          <video
            ref={videoRef}
            src="/videos/intro-mascot.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />
          <canvas ref={canvasRef} className="relative h-full w-full" />
        </button>
      </motion.div>
    </>
  );
}
