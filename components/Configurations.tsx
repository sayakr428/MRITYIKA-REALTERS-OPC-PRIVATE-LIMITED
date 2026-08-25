import { project } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { InvestmentCalculator } from "./InvestmentCalculator";

export function Configurations() {
  return (
    <section className="relative overflow-hidden bg-paper py-12 md:py-20">
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute left-0 top-0 z-0 h-80 w-80 object-contain object-left-top opacity-25 md:h-[32rem] md:w-[32rem] lg:h-[38rem] lg:w-[38rem]"
      >
        <source src="/videos/bougainvillea-flowers-01.webm" type="video/webm" />
      </video>
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-72 w-72 rotate-180 object-contain object-left-top opacity-20 md:h-[26rem] md:w-[26rem] lg:h-[30rem] lg:w-[30rem]"
      >
        <source src="/videos/bougainvillea-flowers-01.webm" type="video/webm" />
      </video>

      <div className="container-page relative z-10 flex flex-col gap-10">
        <SectionHeading
          title="Two ways to invest in one address."
          body="Residential plots for the home you'll live in, commercial frontage for the business you're building."
        />

        <div className="grid gap-10 border-t border-green-950/10 pt-10 lg:grid-cols-2 lg:gap-14">
          {/* Plot types stack on the left so the calculator can fill the
              right-hand column instead of leaving it empty. */}
          <div className="flex flex-col divide-y divide-green-950/10">
            <Reveal className="flex flex-col gap-5 pb-8">
              <h3 className="font-display text-2xl font-semibold text-green-950 md:text-3xl">
                Residential Plots
              </h3>
              <p className="max-w-md text-ink-soft">
                {project.totalPlots} plots across blocks A01 to A34, each sized at{" "}
                {project.plotUnit}, ready for you to design and build your own home within a
                secured, landscaped campus.
              </p>
              <dl className="mt-1 flex gap-10">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Total Plots</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                    {project.totalPlots}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Plot Size</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                    {project.plotUnit}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="flex flex-col gap-5 pt-8">
              <h3 className="font-display text-2xl font-semibold text-green-950 md:text-3xl">
                Commercial Plots
              </h3>
              <p className="max-w-md text-ink-soft">
                {project.commercialLand} set aside for retail and business frontage, right at the
                entrance of a growing, gated residential population.
              </p>
              <dl className="mt-1 flex gap-10">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Land</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                    {project.commercialLand}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-ink-faint">Built Area</dt>
                  <dd className="mt-1 font-display text-xl font-semibold text-green-900">
                    {project.commercialArea}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="pt-8">
              <p className="text-ink-soft">
                Pricing varies by block and plot facing. Ask us when you book your visit.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <InvestmentCalculator />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
