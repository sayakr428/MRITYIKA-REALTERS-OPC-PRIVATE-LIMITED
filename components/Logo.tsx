import Image from "next/image";

export function LogoMark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={`relative block shrink-0 ${className}`}>
      <Image
        src="/images/logo-mark.png"
        alt=""
        fill
        sizes="48px"
        priority
        // The mark is deep green on transparent, so on dark surfaces it is
        // flattened to a white silhouette to stay legible.
        className={`object-contain ${tone === "light" ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}

export function Wordmark({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-green-900" : "text-paper";
  const sub = tone === "dark" ? "text-ink-soft" : "text-green-100";
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className={`font-display text-[1.05rem] tracking-[0.02em] ${color}`}>
        Shantiban <span className="italic text-gold-600">City</span>
      </span>
      <span className={`text-[0.6rem] uppercase tracking-[0.28em] ${sub} mt-0.5`}>
        Mrityika Realters
      </span>
    </span>
  );
}
