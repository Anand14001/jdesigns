import { Phone } from "lucide-react";
import { CONTACT } from "../../data/content";
import { useSite } from "../../site/SiteContext";
import { WhatsAppIcon } from "../icons/Icons";
import Button from "../ui/Button";

const link =
  "flex items-center justify-center gap-1.5 border-r border-white/30 text-xs whitespace-nowrap text-white underline";

/** Call / WhatsApp / Enquire bar shown under the hero on phones and tablets. */
export default function QuickBar() {
  const { openEnquiry } = useSite();
  return (
    <div className="wrap grid grid-cols-[1fr_1fr_auto] items-center gap-2.5 bg-black py-2.5 text-white lg:hidden">
      <a href={CONTACT.phoneHref} className={link}>
        <Phone className="size-5" />
        <span>Call Now</span>
      </a>
      <a href={CONTACT.whatsappHref} target="_blank" rel="noopener" className={link}>
        <WhatsAppIcon className="size-[22px]" />
        <span>WhatsApp Us</span>
      </a>
      <Button size="pill" onClick={() => openEnquiry()}>Enquire Now</Button>
    </div>
  );
}
