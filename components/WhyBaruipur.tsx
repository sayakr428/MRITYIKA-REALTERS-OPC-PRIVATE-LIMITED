import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const stats = [
  { value: "28", label: "Under-construction projects in Baruipur, Kolkata South" },
  { value: "35", label: "Ready-to-move housing societies already established here" },
  { value: "10", label: "New project options for buyers exploring the locality" },
];

export function WhyBaruipur() {
  return (
    <section className="bg-paper py-12 md:py-20">
      <div className="container-page flex flex-col gap-14">
        <Reveal className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <h2 className="font-display text-balance text-3xl font-semibold leading-[1.15] text-green-950 md:text-[2.4rem]">
            Why property in Baruipur keeps getting harder to find.
          </h2>
          <p className="text-balance leading-relaxed text-ink-soft md:text-lg">
            Baruipur is one of Kolkata South&apos;s prime locations to own a home, with
            infrastructure that keeps improving and a neighbourhood that is still emerging.
            Kolkata South&apos;s job market keeps bringing fresh housing demand into the area, and
            Baruipur absorbs most of it. For you, that means today&apos;s prices won&apos;t hold
            for long.
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 divide-y divide-green-950/8 border-y border-green-950/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col gap-2 px-2 py-8 text-center sm:px-8">
              <span className="font-display text-4xl font-semibold text-green-800 md:text-5xl">
                {stat.value}
              </span>
              <span className="mx-auto max-w-[16rem] text-sm text-ink-faint">{stat.label}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
