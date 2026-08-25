"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "on-dark" | "link";

const base =
  "group inline-flex items-center gap-2.5 text-[0.95rem] font-medium transition-colors duration-300 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-green-900 text-paper px-6 py-3 hover:bg-green-800",
  outline: "border border-green-900/25 text-green-900 px-6 py-3 hover:border-green-900",
  "on-dark": "bg-paper text-green-950 px-6 py-3 hover:bg-green-100",
  link: "text-green-900 border-b border-green-900/30 pb-0.5 hover:border-green-900",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  onClick,
  className = "",
  external,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span>{children}</span>
      {variant !== "link" ? (
        <ArrowRight
          size={15}
          weight="regular"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
