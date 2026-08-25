import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { phone } from "@/lib/content";

export function MobileStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex gap-px border-t border-green-950/10 bg-paper md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={`tel:${phone.tel}`}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium text-green-900"
      >
        <Phone size={16} weight="regular" />
        Call Now
      </a>
      <a
        href={`https://wa.me/${phone.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-green-900 py-3.5 text-sm font-medium text-paper"
      >
        <WhatsappLogo size={17} weight="fill" />
        WhatsApp
      </a>
    </div>
  );
}
