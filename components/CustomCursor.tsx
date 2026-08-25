"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const RING_TEXT = "MRITYIKA REALTRERS";

function ringChars() {
  const unit = `${RING_TEXT}  •  `.repeat(2);
  return unit.split("");
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const chars = ringChars();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = dotRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      if (!ready) setReady(true);
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", onMove);

    const spin = ringRef.current
      ? gsap.to(ringRef.current, { rotate: 360, duration: 14, ease: "linear", repeat: -1 })
      : null;

    return () => {
      window.removeEventListener("mousemove", onMove);
      spin?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 md:block"
    >
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-paper/95 shadow-soft transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <div ref={ringRef} className="absolute inset-0">
          {chars.map((ch, i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 text-[6.5px] font-bold uppercase tracking-wide text-green-950"
              style={{
                transform: `rotate(${(360 / chars.length) * i}deg) translateY(-37px)`,
                transformOrigin: "0 0",
              }}
            >
              {ch}
            </span>
          ))}
        </div>
        <span className="h-2 w-2 rounded-full bg-green-950" />
      </div>
    </div>
  );
}
