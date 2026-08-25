"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MagnifyingGlassPlus, MagnifyingGlassMinus, X } from "@phosphor-icons/react/dist/ssr";

const ZOOM_STEPS = [1, 1.75, 2.5, 3.5];

export function ZoomableImage({
  src,
  alt,
  ratioClass,
  sizes,
  label = "View full size",
}: {
  src: string;
  alt: string;
  ratioClass: string;
  sizes: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "+" || e.key === "=") setStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1));
      if (e.key === "-") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setStep(0);
  }, [open]);

  const zoom = ZOOM_STEPS[step];
  const canZoomIn = step < ZOOM_STEPS.length - 1;
  const canZoomOut = step > 0;

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || zoom === 1) return;
    drag.current = { x: e.clientX, y: e.clientY, left: el.scrollLeft, top: el.scrollTop };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el || !drag.current) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
    el.scrollTop = drag.current.top - (e.clientY - drag.current.y);
  };

  const endDrag = () => {
    drag.current = null;
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden"
        aria-label={`${label}: ${alt}`}
      >
        <div className={`relative w-full overflow-hidden ${ratioClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="bg-paper-alt object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.01]"
          />
        </div>
        <span className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-950 px-4 py-2 text-xs font-medium text-paper">
          <MagnifyingGlassPlus size={15} />
          {label}
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[110] flex flex-col bg-green-950/95"
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-green-200">
                {Math.round(zoom * 100)}%
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(s - 1, 0))}
                  disabled={!canZoomOut}
                  aria-label="Zoom out"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 disabled:opacity-40"
                >
                  <MagnifyingGlassMinus size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(s + 1, ZOOM_STEPS.length - 1))}
                  disabled={!canZoomIn}
                  aria-label="Zoom in"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 disabled:opacity-40"
                >
                  <MagnifyingGlassPlus size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close image view"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="flex-1 overflow-auto overscroll-contain p-4 md:p-8"
              style={{ cursor: zoom > 1 ? "grab" : "default", touchAction: "pinch-zoom" }}
            >
              {/* Plain img: the zoom needs natural intrinsic sizing and free
                  scroll panning, which next/image's fill layout fights. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                draggable={false}
                onClick={() =>
                  setStep((s) => (s === ZOOM_STEPS.length - 1 ? 0 : s + 1))
                }
                className="mx-auto h-auto select-none bg-paper"
                style={{ width: `${zoom * 100}%`, maxWidth: zoom === 1 ? "100%" : "none" }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
