import { MapPin, Phone } from "lucide-react";
import { CONTACT, CONTACT_SECTION } from "../../data/content";
import { ThreadIcon } from "../icons/Icons";
import { DottedTriangle } from "../icons/Illustrations";
import EnquiryForm from "../forms/EnquiryForm";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const DETAILS = [
  { Icon: Phone, label: "Phone / WhatsApp", value: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  { Icon: MapPin, label: "Location", value: CONTACT.location },
  { Icon: ThreadIcon, label: "Services", value: CONTACT_SECTION.services },
];

/** Black contact section with details, map and the enquiry form. */
export default function Contact({ showTitle = true }) {
  return (
    <section id="contact" className="relative bg-black pt-[var(--section)] pb-[130px] text-white lg:pb-[190px]">
      <div className="wrap relative">
        {showTitle && (
          <SectionTitle dark bold={CONTACT_SECTION.title[0]} light={CONTACT_SECTION.title[1]} sub={CONTACT_SECTION.sub} className="mb-10" />
        )}

        <div className="relative z-[1] grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[60px]">
          <Reveal>
            <p className="text-[1.0625rem] text-white/75">{CONTACT_SECTION.intro}</p>

            <ul className="mt-[26px] mb-8 list-none p-0">
              {DETAILS.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-[18px] border-b border-white/18 py-4 first:border-t">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/50 text-white" aria-hidden="true">
                    <Icon className="size-[22px]" strokeWidth={1.5} />
                  </span>
                  <div>
                    <small className="block text-[0.8125rem] text-white/60">{label}</small>
                    {href ? (
                      <a href={href} className="text-lg font-medium text-white hover:text-red">{value}</a>
                    ) : (
                      <span className="text-lg font-medium text-white">{value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-[260px] overflow-hidden rounded-card bg-[#2a2a2a]">
              <iframe
                title="Map showing Poonamallee, Chennai"
                src="https://maps.google.com/maps?q=Poonamallee,%20Chennai,%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0"
              />
            </div>
          </Reveal>

          <Reveal id="enquiry">
            <EnquiryForm />
          </Reveal>
        </div>

        <DottedTriangle className="pointer-events-none absolute right-[var(--pad)] -bottom-[130px] h-[120px] w-[180px] lg:-bottom-[190px] lg:h-[180px] lg:w-[270px]" />
      </div>
    </section>
  );
}
