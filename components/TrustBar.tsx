import { Star } from "@phosphor-icons/react/dist/ssr";
import { project } from "@/lib/content";
import { Reveal } from "./Reveal";

const stats = [
  { value: `${project.totalPlots}`, label: "Total Plots" },
  { value: project.plotUnit, label: "Per Residential Plot" },
  { value: project.commercialArea, label: "Commercial Space" },
  { value: project.distanceFromKolkata, label: "From Kolkata City" },
  { value: project.possession, label: "Possession Status" },
];

export function TrustBar() {
  return (
    <div className="bg-paper py-10 md:py-12">
      <div className="container-page flex flex-wrap justify-between gap-x-10 gap-y-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.05} className="flex flex-col gap-1">
            <span className="font-display text-xl font-semibold text-green-900 md:text-2xl">
              {stat.value}
            </span>
            <span className="text-xs text-ink-faint">{stat.label}</span>
          </Reveal>
        ))}
      </div>
      <div className="container-page mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 pt-6 text-sm text-ink-soft">
        <span>
          Developed by <strong className="font-semibold text-green-900">{project.builder}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-gold-600">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} weight={i < Math.round(project.rating) ? "fill" : "regular"} />
            ))}
          </span>
          {project.rating.toFixed(1)} locality rating &middot; {project.reviewCount} reviews
        </span>
      </div>
    </div>
  );
}
