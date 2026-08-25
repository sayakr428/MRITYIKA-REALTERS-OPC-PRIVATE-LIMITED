"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { List, X, Phone, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { LogoMark, Wordmark } from "./Logo";
import { CTAButton } from "./Button";
import { phone } from "@/lib/content";

const leftLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#amenities", label: "Amenities" },
  { href: "#master-plan", label: "Master Plan" },
];

const rightLinks = [
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

const allLinks = [...leftLinks, ...rightLinks];

interface HeaderProps {
  onOpenBrochure?: () => void;
}

export function Header({ onOpenBrochure }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:top-6">
      <div
        className="relative grid w-full max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-3 overflow-hidden rounded-full px-3 py-2 md:grid-cols-[1fr_auto_1fr] md:px-4"
        style={{ boxShadow: "0 12px 32px -14px rgba(15,26,18,0.28)" }}
      >
        {/* Liquid-glass shell */}
        <div
          className="absolute inset-0 z-0 rounded-full"
          style={{
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            filter: "url(#glass-distortion)",
            isolation: "isolate",
          }}
        />
        <div className="absolute inset-0 z-10 rounded-full bg-white/45" />
        <div
          className="absolute inset-0 z-20 rounded-full"
          style={{
            boxShadow:
              "inset 1.5px 1.5px 1px 0 rgba(255,255,255,0.7), inset -1px -1px 1px 1px rgba(255,255,255,0.4)",
          }}
        />

        <nav className="relative z-30 hidden items-center gap-6 lg:flex" aria-label="Primary">
          {leftLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-green-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="relative z-30 flex items-center justify-center gap-2 justify-self-start md:justify-self-center"
        >
          <LogoMark className="h-9 w-9" />
          <Wordmark tone="dark" />
        </a>

        <div className="relative z-30 flex items-center justify-end gap-5">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Secondary">
            {rightLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-ink-soft transition-colors duration-300 hover:text-green-900"
              >
                {link.label}
              </a>
            ))}
          </nav>


          <CTAButton
            href="#enquire"
            variant="primary"
            className="hidden !rounded-full !px-5 !py-2.5 text-sm md:inline-flex"
          >
            Book a Site Visit
          </CTAButton>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center text-green-900 lg:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[4.5rem] z-30 bg-green-950 lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-8 py-10">
              <div className="flex flex-col divide-y divide-paper/10 border-t border-paper/10">
                {allLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="py-4 font-display text-2xl text-paper"
                  >
                    {link.label}
                  </motion.a>

                ))}
              </div>
              <motion.a
                href={`tel:${phone.tel}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 + allLinks.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-lg text-paper"
              >
                <Phone size={18} weight="regular" />
                {phone.display}
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}


