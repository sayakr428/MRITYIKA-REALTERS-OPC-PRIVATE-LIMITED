import {
  Bank,
  GraduationCap,
  Storefront,
  Hospital,
  Factory,
  RoadHorizon,
  Train,
  Subway,
  MapPin,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";
import { locationItems, type LocationItem, type LocationIcon } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ZoomableImage } from "./ZoomableImage";

const itemIcon: Record<LocationIcon, React.ElementType> = {
  bank: Bank,
  college: GraduationCap,
  academy: Buildings,
  bazar: Storefront,
  hospital: Hospital,
  factory: Factory,
  bypass: RoadHorizon,
  railway: Train,
  junction: MapPin,
  metro: Subway,
};

const order: LocationItem["category"][] = [
  "Banking",
  "Education",
  "Market",
  "Healthcare",
  "Transit",
];

export function LocationAdvantages() {
  return (
    <section id="location" className="bg-paper py-12 md:py-20">
      <div className="container-page flex flex-col gap-12">
        <SectionHeading
          eyebrow="Location Advantages"
          title="Everyday life is already close by."
          body="Baruipur's social infrastructure sits within a short drive, with the city itself reachable in about 20 km via the bypass."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="border border-green-950/8">
              <ZoomableImage
                src="/images/location-map.png"
                alt="Map showing Shantiban City's connectivity to Tollygunge Metro, Baruipur Station, EM Bypass and nearby schools, banks and markets"
                ratioClass="aspect-[16/11]"
                sizes="(min-width: 1024px) 45vw, 90vw"
                label="Zoom the map"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-7">
            {order.map((category) => {
              const items = locationItems.filter((i) => i.category === category);
              return (
                <div key={category}>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
                    {category}
                  </span>
                  <ul className="mt-3 grid grid-cols-1 gap-x-6 border-t border-green-950/8 pt-1 sm:grid-cols-2">
                    {items.map((item) => {
                      const Icon = itemIcon[item.icon];
                      return (
                        <li
                          key={item.name}
                          className="flex items-start justify-between gap-3 py-2.5 text-sm"
                        >
                          <span className="flex items-start gap-2.5 text-ink-soft">
                            <Icon
                              size={17}
                              weight="regular"
                              className="mt-0.5 shrink-0 text-green-700"
                            />
                            {item.name}
                          </span>
                          <span className="shrink-0 font-medium text-green-800">
                            {item.distance}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
