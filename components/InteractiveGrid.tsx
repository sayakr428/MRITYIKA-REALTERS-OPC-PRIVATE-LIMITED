"use client";

import { useEffect, useRef } from "react";

/**
 * A fine square grid that fills its positioned parent. A second, gold-lit
 * copy of the same grid is masked to a soft circle that follows the pointer,
 * so the lines nearest the cursor light up. Listens on the parent element
 * (not itself) since this layer is pointer-events-none.
 */
export function InteractiveGrid({ cell = 44 }: { cell?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const target = root?.parentElement;
    if (!root || !target) return;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      root.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      root.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onLeave = () => {
      root.style.setProperty("--mx", "-9999px");
      root.style.setProperty("--my", "-9999px");
    };

    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerleave", onLeave);
    return () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const lineColor = "rgba(15,26,18,0.08)";
  const glowColor = "rgba(194,155,69,0.9)";
  const gridImage = (color: string) =>
    `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: gridImage(lineColor), backgroundSize: `${cell}px ${cell}px` }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: gridImage(glowColor),
          backgroundSize: `${cell}px ${cell}px`,
          WebkitMaskImage:
            "radial-gradient(240px circle at var(--mx, -9999px) var(--my, -9999px), black, transparent 70%)",
          maskImage:
            "radial-gradient(240px circle at var(--mx, -9999px) var(--my, -9999px), black, transparent 70%)",
        }}
      />
    </div>
  );
}
