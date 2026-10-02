import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { FOUNDER } from "../../data/content";
import { FOUNDER_PHOTO } from "../../data/media";
import Img from "../ui/Img";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/**
 * The founder, as a portrait plate rather than one more content card.
 *
 * It deliberately does not use <Card>: that shell is what the courses, the
 * achievements and the student work all wear, and dressing her in it made the
 * one person on the page read as another tile. Three things do the work here --
 * an upright crop that lets her fill the frame, her name read off the photo
 * instead of off a slab beneath it, and an offset rule that gives the flat
 * studio backdrop an edge it has not got against a near-white page.
 */
export default function Founder({ teaser = false }) {
  return (
    <section id="founder" className="py-[var(--section)]">
      <div className="wrap">
        <SectionTitle as="h2" bold={FOUNDER.title[0]} light={FOUNDER.title[1]} />

        <div className="mt-[30px] grid grid-cols-1 items-center gap-10 lg:grid-cols-[23.5625rem_1fr] lg:gap-[60px]">
          <Reveal className="max-w-[26.25rem] lg:max-w-none">
            {/* `pcard` / `pcard-media` are the site's hover-zoom hooks, so the
                photo breathes on hover exactly like every other card. */}
            <figure className="pcard relative m-0">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-card border-2 border-violet/30 md:translate-x-4 md:translate-y-4"
              />

              <div className="pcard-media relative aspect-[4/5] overflow-hidden rounded-card bg-media shadow-[0_24px_60px_-28px_rgb(31_26_36_/_.55)]">
                {FOUNDER_PHOTO ? (
                  <Img src={FOUNDER_PHOTO} alt={FOUNDER.name} className="object-[50%_12%]" />
                ) : (
                  // Sits high in the frame so her initials clear the caption below.
                  <div className="absolute inset-0 grid place-items-center bg-band pb-[22%]" aria-hidden="true">
                    <div className="grid aspect-square w-[58%] place-items-center rounded-full bg-plum text-[clamp(4rem,8vw,6rem)] font-extrabold text-white">
                      SJ
                    </div>
                  </div>
                )}

                {/* Mixed from --color-plum rather than black, and solid enough at
                    the foot to carry white and gold well past AA. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(59_30_82_/_.96)_0%,rgb(59_30_82_/_.88)_14%,rgb(59_30_82_/_.42)_28%,rgb(59_30_82_/_.10)_40%,transparent_48%)]"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="m-0 text-2xl font-medium text-white">{FOUNDER.name}</p>
                  {/* The one place the zari gold is allowed to carry text: 6.2:1
                      on plum, against 2.25:1 on paper. */}
                  <span aria-hidden="true" className="my-2.5 block h-px w-10 bg-gold" />
                  <p className="m-0 text-sm font-medium text-gold">{FOUNDER.role}</p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <Reveal>
            <blockquote className="m-0 mb-[26px] border-l-4 border-violet pl-[26px] text-xl leading-[1.4] font-light text-ink md:text-[1.625rem]">
              {FOUNDER.quote}
            </blockquote>
            {teaser ? (
              <Link to="/about/#founder" className="group inline-flex items-center gap-2 font-extrabold text-ink hover:text-violet">
                Read more about {FOUNDER.name}
                <ArrowUpRight className="size-5 text-violet transition-transform duration-300 ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
