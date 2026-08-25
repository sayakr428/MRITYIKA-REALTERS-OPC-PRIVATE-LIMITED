import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const titleColor = tone === "dark" ? "text-green-950" : "text-paper";
  const bodyColor = tone === "dark" ? "text-ink-soft" : "text-green-100";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      {eyebrow ? (
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-600">
          {eyebrow}
        </span>
      ) : null}
      <h2 className={`font-display text-balance text-3xl font-semibold leading-[1.1] md:text-[2.6rem] ${titleColor}`}>
        {title}
      </h2>
      {body ? <p className={`text-balance text-base leading-relaxed md:text-lg ${bodyColor}`}>{body}</p> : null}
    </Reveal>
  );
}
