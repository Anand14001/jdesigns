import { useRef, useState } from "react";
import { AUDIENCE } from "../../data/content";
import { AUDIENCE_ICONS } from "../icons/Icons";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

/** "Who Can Join" — black icon cards. On phones they swipe sideways with dots. */
export default function Audience() {
  const rowRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const onScroll = () => {
    const row = rowRef.current;
    const first = row?.firstElementChild;
    if (!first) return;
    const idx = Math.round(row.scrollLeft / (first.getBoundingClientRect().width || 1));
    setActiveDot(Math.min(AUDIENCE.items.length - 1, idx));
  };

  return (
    <section className="pt-[50px] pb-[var(--section)]">
      <div className="wrap">
        <SectionTitle bold={AUDIENCE.title[0]} light={AUDIENCE.title[1]} sub={AUDIENCE.sub} className="mb-10" />

        <div
          ref={rowRef}
          onScroll={onScroll}
          className="no-scrollbar -mx-5 grid snap-x snap-mandatory auto-cols-[76%] grid-flow-col gap-5 overflow-x-auto px-5
            md:mx-0 md:grid-flow-row md:grid-cols-2 md:gap-[30px] md:overflow-visible md:px-0 xl:grid-cols-4"
        >
          {AUDIENCE.items.map((item) => (
            <Reveal
              key={item.title}
              className="flex snap-center flex-col items-center rounded-card bg-black px-[26px] pt-[34px] pb-8 text-center text-white"
            >
              <svg viewBox="0 0 48 48" className="mb-[22px] size-[52px] text-white" aria-hidden="true">
                {AUDIENCE_ICONS[item.icon]}
              </svg>
              <h3 className="mb-2.5 text-2xl text-white">{item.title}</h3>
              <p className="m-0 text-[0.9375rem] text-white/72">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-[22px] flex justify-center gap-2.5 md:hidden" aria-hidden="true">
          {AUDIENCE.items.map((item, i) => (
            <span key={item.title} className={`size-[7px] rounded-full ${i === activeDot ? "bg-ink" : "bg-[#c4c4c4]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
