import { ACHIEVEMENTS } from "../../data/media";
import { Card, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/**
 * "Achievements": one titled block per group -- what the institute has built,
 * then what its students have done with it.
 *
 * These used to be two tabs, which meant half the section was never seen unless
 * someone thought to press the second one. Laid out as blocks, both groups are
 * on the page and the two stories read in order; the rule and the counter above
 * each heading are what keep the six cards from running together as one list.
 */
export default function Achievements() {
  if (!ACHIEVEMENTS.length) return null;

  return (
    <section className="bg-band py-[var(--section)]">
      <div className="wrap">
        <SectionTitle bold="Our" light="Achievements" className="mb-[30px]" />

        {ACHIEVEMENTS.map((group, i) => (
          <div key={group.title} className={i ? "mt-12 md:mt-[70px]" : ""}>
            <Reveal className="mb-6 flex items-start justify-between gap-6 border-t border-ink/10 pt-6 md:mb-[30px] md:pt-7">
              <div>
                <h3 className="text-xl font-medium text-ink md:text-2xl">{group.title}</h3>
                <p className="m-0 mt-1.5 max-w-2xl text-[0.9375rem] text-muted">{group.tagline}</p>
              </div>
              {/* The same 01 / 02 counter the hero uses, so the blocks read as a
                  sequence rather than two unrelated rows of cards. */}
              <span aria-hidden="true" className="hidden shrink-0 pt-1 text-sm font-extrabold text-violet md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Reveal>

            {/* One row per group, swiped on a phone and a three-up grid from 768px. */}
            <ul
              className="no-scrollbar -mx-5 grid snap-x snap-mandatory scroll-px-5 md:scroll-px-0 auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto list-none px-5 py-0
                md:mx-0 md:grid-flow-row md:grid-cols-3 md:gap-[30px] md:overflow-visible md:px-0"
            >
              {group.items.map((item) => (
                <li key={item.title} className="snap-start">
                  <Card>
                    <CardMedia image={item.image} alt="" />
                    <CardBody>
                      <h4 className="mb-2 text-2xl font-medium text-white">{item.title}</h4>
                      <p className="m-0 text-[0.9375rem] text-white/80">{item.text}</p>
                    </CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
