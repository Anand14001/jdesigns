import { FOUNDER } from "../../data/content";
import { Card, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** Faculty-style card for the founder, with her quote and bio alongside. */
export default function Founder() {
  return (
    <section id="founder" className="py-[var(--section)]">
      <div className="wrap">
        <SectionTitle as="p" bold={FOUNDER.title[0]} light={FOUNDER.title[1]} />

        <div className="mt-[30px] grid grid-cols-1 items-center gap-[60px] lg:grid-cols-[23.5625rem_1fr]">
          <Reveal className="max-w-[26.25rem] lg:max-w-none">
            <Card>
              <CardMedia tone="grey" square>
                <div className="grid aspect-square w-[64%] place-items-center rounded-full bg-black text-[clamp(4rem,8vw,6rem)] font-extrabold text-white">
                  SJ
                </div>
              </CardMedia>
              <CardBody>
                <h2 className="mb-2 text-2xl font-medium text-white">{FOUNDER.name}</h2>
                <p className="m-0 text-sm font-medium text-white">{FOUNDER.role}</p>
              </CardBody>
            </Card>
          </Reveal>

          <Reveal>
            <blockquote className="m-0 mb-[26px] border-l-4 border-red pl-[26px] text-xl leading-[1.4] font-light text-ink md:text-[1.625rem]">
              {FOUNDER.quote}
            </blockquote>
            <p className="leading-[1.7] text-muted">{FOUNDER.bio}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
