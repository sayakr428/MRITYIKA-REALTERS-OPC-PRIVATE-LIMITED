import Image from "next/image";
import { ArrowSquareOut, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { phone, project } from "@/lib/content";

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
    <footer className="border-t border-paper/10 bg-green-950 pb-24 pt-12 text-paper md:pb-12 md:pt-14">
      <div className="container-page flex flex-col gap-10">
        
        {/* 4-Column Footer Grid in exact requested order */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.1fr_1.1fr_0.9fr_1fr] md:items-start text-center md:text-left">
          
          {/* Position 1: DEVELOPED BY */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-400 border-b border-gold-400/40 pb-1">
              DEVELOPED BY
            </span>
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="relative h-20 w-44 md:h-24 md:w-52 rounded-xl bg-white p-2.5 shadow-lifted border border-white/20">
                <Image
                  src="/images/mrityika-logo.png"
                  alt="Mrityika Realters OPC Private Limited Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="font-display text-lg md:text-xl font-bold tracking-wide text-paper max-w-xs leading-snug">
                Mrityika Realters OPC Private Limited
              </h4>
            </div>
          </div>

          {/* Position 2: EXCLUSIVE STRATEGY PARTNER */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-gold-400 border-b border-gold-400/40 pb-1">
              EXCLUSIVE STRATEGY PARTNER
            </span>
            <a
              href="https://www.webgrow360.online"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center md:items-start gap-3 transition-all hover:opacity-95"
              title="Visit WebGrow360 Online (www.webgrow360.online)"
            >
              <div className="relative h-20 w-44 md:h-24 md:w-52 rounded-xl bg-black border border-gold-400/40 p-2 shadow-lifted transition-transform group-hover:scale-[1.03]">
                <Image
                  src="/images/webgrow360-logo.png"
                  alt="WebGrow360 Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="inline-flex items-center gap-2 font-display text-lg md:text-xl font-extrabold text-gold-400 group-hover:text-gold-300 transition-colors">
                <span>WebGrow360</span>
                <ArrowSquareOut size={20} weight="bold" className="shrink-0" />
              </div>
            </a>
          </div>

          {/* Position 3: SITE ADDRESS */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-green-300 border-b border-green-300/40 pb-1">
              SITE ADDRESS
            </span>
            <div className="flex flex-col items-center md:items-start gap-2 text-green-100 text-sm leading-relaxed">
              <span className="font-display text-base font-semibold text-paper">
                Shantiban City
              </span>
              <p className="max-w-xs">
                Tapna, Baruipur, Dist. South 24 Parganas, Kolkata – 700145
              </p>
              
              <div className="mt-1 flex flex-col gap-2 pt-2 border-t border-paper/10 w-full items-center md:items-start">
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-2 text-sm text-green-100 hover:text-gold-300 transition-colors"
                >
                  <Phone size={16} weight="fill" className="text-gold-400" />
                  <span>{phone.display}</span>
                </a>
                <a
                  href={`https://wa.me/${phone.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-green-100 hover:text-gold-300 transition-colors"
                >
                  <WhatsappLogo size={16} weight="fill" className="text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Position 4: FIND US (MAP) */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-green-300 border-b border-green-300/40 pb-1">
              FIND US
            </span>
            <div className="relative h-36 w-full max-w-xs overflow-hidden rounded-xl border border-paper/15 shadow-md">
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
                className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-[0.7rem] font-medium text-green-950 shadow-lifted transition-colors hover:bg-white hover:text-green-700"
              >
                Open in Maps <ArrowSquareOut size={12} weight="bold" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="border-t border-paper/15 pt-6 text-center text-xs text-green-300/80">
          <p>All rights reserved &copy; {new Date().getFullYear()} Mrityika Realters OPC Private Limited</p>
        </div>

      </div>
    </footer>
  );
}
