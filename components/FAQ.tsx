"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const columns = [faqs.slice(0, 4), faqs.slice(4)];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-12 md:py-20">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          title="Questions, answered."
          body="The details buyers ask about most before visiting the site."
        />

        <Reveal delay={0.1} className="grid gap-x-10 sm:grid-cols-2">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col divide-y divide-green-950/10 border-t border-green-950/10"
            >
              {col.map((item, itemIdx) => {
                const i = colIdx * 4 + itemIdx;
                const isOpen = openIndex === i;
                return (
                  <div
                    key={item.q}
                    onMouseEnter={() => setOpenIndex(i)}
                    onMouseLeave={() => setOpenIndex(null)}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className="font-display text-base font-semibold text-green-950">
                          {item.q}
                        </span>
                        <span
                          className={`shrink-0 text-green-800 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          <Plus size={16} weight="regular" />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0">
                        <p className="pb-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
