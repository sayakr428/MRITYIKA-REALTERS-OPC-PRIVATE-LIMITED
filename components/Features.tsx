import Image from "next/image";
import { features, type Feature } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

const rowA = features.slice(0, 7);
const rowB = features.slice(7);

function MarqueeRow({
  items,
  direction,
}: {
  items: Feature[];
  direction: "left" | "right";
}) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div
        className={`flex w-max items-start gap-10 md:gap-14 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {loop.map((feature, i) => (
          <figure
            key={`${feature.title}-${i}`}
            className="flex w-[10rem] shrink-0 flex-col items-center gap-4 text-center md:w-[13rem]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full">
              <Image
                src={feature.image}
                alt=""
                fill
                sizes="(min-width: 768px) 13rem, 10rem"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
              />
            </div>
            <figcaption>
              <h3 className="font-display text-base font-semibold leading-snug text-green-950">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-faint">{feature.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-paper py-12 md:py-20">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          title="Thirteen reasons to choose this address."
          body="From everyday convenience to long-term value, nothing important is more than a short drive away."
        />
      </div>

      <div className="mt-6 flex flex-col gap-16 md:gap-20">
        <MarqueeRow items={rowA} direction="left" />
        <MarqueeRow items={rowB} direction="right" />
      </div>
    </section>
  );
}
