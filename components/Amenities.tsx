"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Baby,
  Footprints,
  Armchair,
  FlowerLotus,
  Waves,
  CookingPot,
  Fish,
  Basketball,
  Martini,
  HouseLine,
  Barbell,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react/dist/ssr";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { amenities, galleryImages, type Amenity } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { InteractiveGrid } from "./InteractiveGrid";

const iconMap: Record<Amenity["icon"], React.ElementType> = {
  baby: Baby,
  footprints: Footprints,
  personArmchair: Armchair,
  flowerLotus: FlowerLotus,
  waves: Waves,
  cookingPot: CookingPot,
  fish: Fish,
  basketball: Basketball,
  martini: Martini,
  houseLine: HouseLine,
  barbell: Barbell,
};

// How much scroll (px) it takes to advance the stack by one card.
const STEP_PX = 620;

// Depth keyframes lifted directly from ultraconfidentiel.com's own CSS:
// .project._1 { translate(-36%) }                    front, full scale
// .project.absoulute._2 { translate(20%) scale(.7) } opacity .5
// .project.absoulute._3 { translate(68%) scale(.4) } opacity .2
// .project.absoulute._4 { translate(80%) scale(.4) } opacity 0
// `x` is a percentage of the card's own (unscaled) width, matching how CSS
// resolves transform: translate(%) — independent of the scale() alongside it.
const KEYFRAMES = [
  { p: -0.45, x: -70, s: 1, o: 0 },
  { p: 0, x: -36, s: 1, o: 1 },
  { p: 1, x: 20, s: 0.7, o: 0.5 },
  { p: 2, x: 68, s: 0.4, o: 0.2 },
  { p: 3, x: 80, s: 0.4, o: 0 },
];

function sampleDepth(position: number) {
  const min = KEYFRAMES[0].p;
  const max = KEYFRAMES[KEYFRAMES.length - 1].p;
  const p = Math.max(min, Math.min(max, position));
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p);
      return {
        x: a.x + (b.x - a.x) * t,
        s: a.s + (b.s - a.s) * t,
        o: a.o + (b.o - a.o) * t,
      };
    }
  }
  return { x: KEYFRAMES[0].x, s: KEYFRAMES[0].s, o: 0 };
}

function AmenityCard({
  amenity,
  index,
  onJump,
}: {
  amenity: Amenity;
  index: number;
  onJump: (i: number) => void;
}) {
  const Icon = iconMap[amenity.icon];
  const photo = amenity.image ? galleryImages[amenity.image] : null;
  const hasMedia = Boolean(amenity.video || photo);
  const [muted, setMuted] = useState(true);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onJump(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onJump(index);
        }
      }}
      className="stack-card absolute left-1/2 top-1/2 h-[72vh] w-[min(52vw,44rem)] cursor-pointer overflow-hidden text-left shadow-lifted"
      aria-label={`Show ${amenity.title}`}
    >
      {amenity.video ? (
        <>
          {/* data-video marks this for the scroll rig, which plays/pauses it
              directly by proximity to the front — see the ScrollTrigger
              onUpdate below. Keeps that hot path out of React state. */}
          <video
            data-video
            src={amenity.video}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-green-950 to-transparent" />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMuted((m) => !m);
            }}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-paper backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            {muted ? <SpeakerSlash size={16} weight="bold" /> : <SpeakerHigh size={16} weight="bold" />}
          </button>
        </>
      ) : photo ? (
        <>
          <Image
            src={photo}
            alt={amenity.title}
            fill
            sizes="52vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-green-950 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
      )}

      <div className="relative flex h-full flex-col justify-between p-7">
        <span className={`font-display text-sm ${hasMedia ? "text-paper/70" : "text-gold-300"}`}>
          {amenity.code}
        </span>
        <div>
          <Icon size={24} weight="light" className="mb-3 text-paper" />
          <h3 className="font-display text-2xl font-semibold leading-snug text-paper">
            {amenity.title}
          </h3>
          <p
            className={`mt-1.5 max-w-xs text-sm leading-relaxed ${hasMedia ? "text-green-100" : "text-neutral-300"}`}
          >
            {amenity.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileAmenityCard({ amenity }: { amenity: Amenity }) {
  const Icon = iconMap[amenity.icon];
  const photo = amenity.image ? galleryImages[amenity.image] : null;
  const hasMedia = Boolean(amenity.video || photo);
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative h-[22rem] w-[17rem] shrink-0 snap-start overflow-hidden">
      {amenity.video ? (
        <>
          <video
            src={amenity.video}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-green-950 to-transparent" />
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-paper backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            {muted ? <SpeakerSlash size={14} weight="bold" /> : <SpeakerHigh size={14} weight="bold" />}
          </button>
        </>
      ) : photo ? (
        <>
          <Image src={photo} alt={amenity.title} fill sizes="280px" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-green-950 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-950" />
      )}
      <div className="relative flex h-full flex-col justify-between p-6">
        <span className={`font-display text-sm ${hasMedia ? "text-paper/70" : "text-gold-300"}`}>
          {amenity.code}
        </span>
        <div>
          <Icon size={20} weight="light" className="mb-2.5 text-paper" />
          <h3 className="font-display text-lg font-semibold leading-snug text-paper">
            {amenity.title}
          </h3>
          <p className={`mt-1 text-sm leading-relaxed ${hasMedia ? "text-green-100" : "text-neutral-300"}`}>
            {amenity.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Amenities() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<(i: number) => void>(() => {});
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnhanced(desktop && !reduce);
  }, []);

  useEffect(() => {
    if (!enhanced || !wrapRef.current || !stageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".stack-card", stageRef.current);
    const last = cards.length - 1;
    const distance = STEP_PX * last;

    const ctx = gsap.context(() => {
      // Promoting these to their own compositor layers up front (rather than
      // on-demand mid-scroll) is what keeps the transform/opacity churn below
      // from ever touching layout — that promotion-on-demand is a common
      // source of the stutter this was tuned to fix.
      gsap.set(cards, { yPercent: -50, force3D: true, willChange: "transform, opacity" });

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => `+=${distance}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const active = self.progress * last;
          cards.forEach((card, i) => {
            const position = i - active;
            const kf = sampleDepth(position);
            gsap.set(card, {
              xPercent: -50 + kf.x,
              scale: kf.s,
              opacity: kf.o,
              zIndex: Math.round(400 - position * 100),
              force3D: true,
            });

            // Only the front-most card or its immediate neighbours are ever
            // worth decoding video for — every other one just burns main
            // thread and GPU time it needs for the transform itself, which
            // is exactly what was reading as jank once several cards had
            // autoplaying video instead of a static image.
            const video = card.querySelector<HTMLVideoElement>("[data-video]");
            if (video) {
              const shouldPlay = Math.abs(position) < 1.5;
              if (shouldPlay && video.paused) video.play().catch(() => {});
              if (!shouldPlay && !video.paused) video.pause();
            }
          });
        },
      });

      st.refresh();

      // Jump the pinned scroll position so a clicked card becomes the front one.
      jumpRef.current = (i: number) => {
        const target = st.start + (i / last) * (st.end - st.start);
        window.scrollTo({ top: target, behavior: "smooth" });
      };
    }, wrap);

    return () => ctx.revert();
  }, [enhanced]);

  return (
    <section id="amenities" className="bg-paper pb-0 pt-12 md:pt-20">
      <div className="container-page">
        <SectionHeading
          title="Eleven amenities, mapped to a single campus."
          body="Every deck, court and garden on the master plan is built and ready for you today."
        />
      </div>

      {enhanced ? (
        <div
          ref={wrapRef}
          className="relative z-0 mt-4 h-[86vh] min-h-[38rem] overflow-hidden bg-paper-alt"
        >
          <InteractiveGrid />
          <div ref={stageRef} className="relative h-full w-full">
            {amenities.map((amenity, i) => (
              <AmenityCard
                key={amenity.code}
                amenity={amenity}
                index={i}
                onJump={(idx) => jumpRef.current(idx)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6">
          {amenities.map((amenity) => (
            <MobileAmenityCard key={amenity.code} amenity={amenity} />
          ))}
        </div>
      )}
    </section>
  );
}
