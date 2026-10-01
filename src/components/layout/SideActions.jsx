import { Phone } from "lucide-react";
import { CONTACT } from "../../data/content";
import { WhatsAppIcon } from "../icons/Icons";

/* Both pills open to the same 13.75rem -- the width the longer of the two
   labels needs -- so hovering either gives the same shape, not two ragged
   sizes. Written out in full because Tailwind only sees whole class names. */
const pill =
  "group flex h-[42px] w-[42px] items-center justify-end gap-0 overflow-hidden rounded-full bg-white pr-[9px] " +
  "text-ink shadow-[0_2px_10px_rgba(0,0,0,.25)] transition-[width,gap,padding] duration-300 ease-soft " +
  "md:h-[46px] md:w-[46px] md:pr-[11px] " +
  "md:hover:w-[13.75rem] md:hover:gap-2.5 md:hover:pl-5 " +
  "md:focus-visible:w-[13.75rem] md:focus-visible:gap-2.5 md:focus-visible:pl-5";

/* The label is clipped to nothing until the pill opens, so it never forces the
   button wider than it should be. Once open it claims a fixed slot and centres
   in it, so the short label sits in the middle of the pill rather than leaving
   all the empty space on one side. */
const text =
  "hidden max-w-0 shrink-0 overflow-hidden text-center text-sm font-medium whitespace-nowrap opacity-0 " +
  "transition-[max-width,opacity] duration-300 ease-soft md:block " +
  "md:group-hover:max-w-[10rem] md:group-hover:min-w-[9rem] md:group-hover:opacity-100 " +
  "md:group-focus-visible:max-w-[10rem] md:group-focus-visible:min-w-[9rem] md:group-focus-visible:opacity-100";

/** Floating call + WhatsApp buttons on the right edge. They open leftwards on
 *  hover (or keyboard focus) to name themselves; on phones, where there is no
 *  hover, they stay as two matching icon buttons. */
export default function SideActions() {
  return (
    <div className="fixed right-2 bottom-[90px] z-[60] flex flex-col items-end gap-3.5 md:top-1/2 md:right-3 md:bottom-auto md:-translate-y-1/2">
      <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phoneDisplay}`} className={pill}>
        <span aria-hidden="true" className={text}>Call Us</span>
        <Phone className="size-5 shrink-0 md:size-6" />
      </a>

      <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Connect on WhatsApp" className={pill}>
        <span aria-hidden="true" className={text}>Connect on WhatsApp</span>
        <WhatsAppIcon className="size-6 shrink-0 md:size-7" />
      </a>
    </div>
  );
}
