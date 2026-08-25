import { project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ZoomableImage } from "./ZoomableImage";

const specs = [
  { label: "Total Plots", value: `${project.totalPlots}` },
  { label: "Residential Plot Size", value: project.plotUnit },
  { label: "Commercial Land", value: project.commercialLand },
  { label: "Commercial Area", value: project.commercialArea },
];

export function MasterPlan() {
  return (
    <section id="master-plan" className="bg-paper py-12 md:py-20">
      <div className="container-page flex flex-col gap-10">
        <SectionHeading
          eyebrow="The Master Plan"
          title="Every plot placed around one landscaped lake."
          body="220 plots, laid out across blocks A01 to A34, wrap a central lake and clubhouse so daily amenities stay a short walk from every doorstep."
          align="center"
        />

        <Reveal
          delay={0.05}
          className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-green-950/10 pt-6 sm:grid-cols-4"
        >
          {specs.map((spec) => (
            <div key={spec.label}>
              <div className="font-display text-xl font-semibold text-green-900 md:text-2xl">
                {spec.value}
              </div>
              <div className="mt-1 text-xs text-ink-faint">{spec.label}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <ZoomableImage
            src="/images/plot-plan.jpg"
            alt="Shantiban City master plan showing plot blocks A01 to A34, the lake, clubhouse and amenity zones"
            ratioClass="aspect-[16/10] sm:aspect-[16/9]"
            sizes="(min-width: 1024px) 1200px, 100vw"
            label="Zoom the master plan"
          />
        </Reveal>
      </div>
    </section>
  );
}
