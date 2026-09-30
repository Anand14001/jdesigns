import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { FOUNDER } from "../../data/content";
import { FOUNDER_PHOTO } from "../../data/media";
import { Card, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** Faculty-style card for the founder with her quote. `teaser` = short version linking to About. */
export default function Founder({ teaser = false }) {
  return (
    <section id="founder" className="py-[var(--section)]">
      <div className="wrap">
        <SectionTitle as="h2" bold={FOUNDER.title[0]} light={FOUNDER.title[1]} />

        <div className="mt-[30px] grid grid-cols-1 items-center gap-10 lg:grid-cols-[23.5625rem_1fr] lg:gap-[60px]">
          <Reveal className="max-w-[26.25rem] lg:max-w-none">
            <Card>
              <CardMedia ratio="square" image={FOUNDER_PHOTO || undefined} alt={FOUNDER.name} className="bg-media!">
                {!FOUNDER_PHOTO && (
                  <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <div className="grid aspect-square w-[64%] place-items-center rounded-full bg-black text-[clamp(4rem,8vw,6rem)] font-extrabold text-white">
                      SJ
                    </div>
                  </div>
                )}
              </CardMedia>
              <CardBody>
                <p className="mb-2 text-2xl font-medium text-white">{FOUNDER.name}</p>
                <p className="m-0 text-sm font-medium text-white">{FOUNDER.role}</p>
              </CardBody>
            </Card>
          </Reveal>

          <Reveal>
            <blockquote className="m-0 mb-[26px] border-l-4 border-red pl-[26px] text-xl leading-[1.4] font-light text-ink md:text-[1.625rem]">
              {FOUNDER.quote}
            </blockquote>
            {teaser ? (
              <Link to="/about/#founder" className="inline-flex items-center gap-2 font-extrabold text-ink hover:text-red">
                Read more about {FOUNDER.name} <ArrowRight className="size-5 text-red" />
              </Link>
            ) : (
              <p className="leading-[1.7] text-muted">{FOUNDER.bio}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
