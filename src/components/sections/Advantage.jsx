import { GraduationCap, Scissors, Store, Users } from "lucide-react";
import { ADVANTAGE } from "../../data/content";
import { ADVANTAGE_IMAGES } from "../../data/media";
import Img from "../ui/Img";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const ICONS = [Users, Scissors, GraduationCap, Store];

/** "Why Choose J Designs?": photo collage + the four reasons to join. */
export default function Advantage() {
  return (
    <section className="py-[var(--section)]">
      <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[70px]">
        <div className="relative hidden pb-[18%] md:block" aria-hidden="true">
          <div data-img-reveal className="aspect-[4/3] w-[82%] overflow-hidden rounded-card">
            <Img src={ADVANTAGE_IMAGES[0]} />
          </div>
          <div data-img-reveal className="absolute right-0 bottom-0 aspect-square w-[48%] overflow-hidden rounded-card border-[6px] border-white">
            <Img src={ADVANTAGE_IMAGES[1]} />
          </div>
        </div>

        <div>
          <SectionTitle bold={ADVANTAGE.title[0]} light={ADVANTAGE.title[1]} sub={ADVANTAGE.sub} />
          <ul className="m-0 mt-8 grid list-none grid-cols-1 border-t border-ink p-0 sm:grid-cols-2">
            {ADVANTAGE.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  className="flex items-start gap-4 border-b border-line py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-violet text-violet">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="m-0 text-[1.0625rem] leading-snug font-bold text-ink">{item.title}</p>
                    <p className="m-0 mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
