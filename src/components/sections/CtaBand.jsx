import { Download } from "lucide-react";
import { COURSES } from "../../data/content";
import { useSite } from "../../site/SiteContext";
import { Hoop } from "../icons/Illustrations";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

/** "Not sure where to begin?" call-to-action with enquiry + brochure buttons. */
export default function CtaBand({ className = "" }) {
  const { openEnquiry, openBrochure } = useSite();
  return (
    <section className={`py-[var(--section)] ${className}`}>
      <div className="wrap">
        <Reveal className="relative flex flex-col items-start gap-[30px] overflow-hidden rounded-card bg-black px-6 py-8 text-white md:px-10 md:py-[42px] lg:flex-row lg:items-center lg:justify-between lg:pr-[220px]">
          <div className="relative z-[1]">
            <h2 className="mb-1.5 text-2xl text-white md:text-[1.75rem]">{COURSES.cta.title}</h2>
            <p className="m-0 max-w-[45rem] text-white/75">{COURSES.cta.text}</p>
          </div>
          <div className="relative z-[1] flex w-full flex-wrap gap-3 lg:w-auto lg:flex-nowrap">
            <Button onClick={() => openEnquiry("Not sure – need guidance")} className="max-md:flex-[1_1_100%]">
              {COURSES.cta.button}
            </Button>
            <Button variant="outlineLight" onClick={() => openBrochure()} className="max-md:flex-[1_1_100%]">
              <Download className="size-4" /> Brochure
            </Button>
          </div>
          <Hoop className="pointer-events-none absolute -right-10 -bottom-16 hidden size-[260px] opacity-90 lg:block" />
        </Reveal>
      </div>
    </section>
  );
}
