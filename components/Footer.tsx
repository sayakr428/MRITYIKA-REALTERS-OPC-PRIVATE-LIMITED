import { ArrowSquareOut, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { LogoMark } from "./Logo";
import { phone, project } from "@/lib/content";

const exploreLinks = [
  { href: "#overview", label: "Overview" },
  { href: "#amenities", label: "Amenities" },
  { href: "#master-plan", label: "Master Plan" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

/** Baruipur town centre — the closest point OpenStreetMap can resolve for
    Tapna. Google's key-less `output=embed` iframe trick now gets blocked by
    X-Frame-Options, so this uses OSM's embed endpoint, which permits framing
    without any API key. */
const MAP_LAT = 22.3607154;
const MAP_LON = 88.4325575;
const MAP_BBOX = "88.4025575,22.3407154,88.4625575,22.3807154";
const MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik&marker=${MAP_LAT},${MAP_LON}`;
const MAP_LINK = `https://www.openstreetmap.org/?mlat=${MAP_LAT}&mlon=${MAP_LON}#map=14/${MAP_LAT}/${MAP_LON}`;

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-green-950 pb-28 pt-16 text-paper md:pb-16">
      <div className="container-page flex flex-col gap-12">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.6fr_0.85fr_0.85fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" tone="light" />
              <span className="font-display text-lg text-paper">
                Shantiban <span className="italic text-gold-400">City</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-green-200">
              A luxury gated community of {project.totalPlots} residential and commercial plots in{" "}
              {project.locality}, developed by {project.builder}.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-green-200">
              Presented to you by Mrityika Realters OPC Private Limited.
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-green-200">
              Exclusive Strategic Partner:{" "}
              <span className="font-semibold text-gold-400">WebGrow360</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Explore
            </span>
            {exploreLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-green-100 transition-colors hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Get in Touch
            </span>
            <a
              href={`tel:${phone.tel}`}
              className="flex items-center gap-2.5 text-sm text-green-100 transition-colors hover:text-gold-300"
            >
              <Phone size={16} weight="fill" />
              {phone.display}
            </a>
            <a
              href={`https://wa.me/${phone.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-green-100 transition-colors hover:text-gold-300"
            >
              <WhatsappLogo size={16} weight="fill" />
              Chat on WhatsApp
            </a>
            <span className="flex items-start gap-2.5 text-sm text-green-100">
              <MapPin size={16} weight="fill" className="mt-0.5 shrink-0" />
              {project.locality}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-300">
              Find Us
            </span>
            <div className="relative h-40 overflow-hidden rounded-lg border border-paper/10 md:h-full md:min-h-[9rem]">
              <iframe
                src={MAP_EMBED_SRC}
                title="Shantiban City location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0 }}
              />
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-green-950 shadow-lifted transition-colors hover:text-green-700"
              >
                Open in Maps <ArrowSquareOut size={13} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-6 text-xs text-green-300">
          <p>
            &copy; {new Date().getFullYear()} {project.builder}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
