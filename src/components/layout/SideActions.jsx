import { Phone } from "lucide-react";
import { CONTACT } from "../../data/content";
import { WhatsAppIcon } from "../icons/Icons";

const btn =
  "flex h-[42px] items-center justify-center gap-2 rounded-lg bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,.25)] transition-transform duration-200 hover:-translate-x-[3px] md:h-[46px] md:w-[46px]";

/** Floating call + WhatsApp buttons on the right edge. */
export default function SideActions() {
  return (
    <div className="fixed right-2 bottom-[90px] z-[60] flex flex-col items-end gap-3.5 md:top-1/2 md:right-3 md:bottom-auto md:-translate-y-1/2">
      <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phoneDisplay}`} className={`${btn} rounded-full px-3 md:rounded-lg md:px-0`}>
        <span className="text-sm font-medium md:hidden">Call Us</span>
        <Phone className="size-5 shrink-0 md:size-6" />
      </a>
      <a href={CONTACT.whatsappHref} target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className={`${btn} w-[42px]`}>
        <WhatsAppIcon className="size-6 shrink-0 md:size-7" />
      </a>
    </div>
  );
}
