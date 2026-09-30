import { useRef, useState } from "react";
import { ACHIEVEMENTS } from "../../data/media";
import { Card, CardBody, CardMedia } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

/** "Achievements" with category tabs (arrow keys move between tabs). */
export default function Achievements() {
  const [tab, setTab] = useState(0);
  const tabRefs = useRef([]);
  if (!ACHIEVEMENTS.length) return null;

  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (tab + dir + ACHIEVEMENTS.length) % ACHIEVEMENTS.length;
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const group = ACHIEVEMENTS[tab];

  return (
    <section className="bg-band py-[var(--section)]">
      <div className="wrap">
        <div className="mb-[30px] flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle bold="Our" light="Achievements" />
          <div role="tablist" aria-label="Achievement categories" onKeyDown={onKeyDown} className="flex gap-2">
            {ACHIEVEMENTS.map((g, i) => (
              <button
                key={g.label}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`ach-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={tab === i}
                aria-controls="ach-panel"
                tabIndex={tab === i ? 0 : -1}
                onClick={() => setTab(i)}
                className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  tab === i ? "border-black bg-black text-white" : "border-[#b5b5b5] bg-transparent text-black hover:border-black"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <ul
          id="ach-panel"
          role="tabpanel"
          aria-labelledby={`ach-tab-${tab}`}
          key={group.label}
          className="no-scrollbar -mx-5 m-0 grid animate-[fade_.45s_ease] snap-x snap-mandatory auto-cols-[82%] grid-flow-col gap-4 overflow-x-auto list-none px-5 py-0
            md:mx-0 md:grid-flow-row md:grid-cols-3 md:gap-[30px] md:overflow-visible md:px-0"
        >
          {group.items.map((item) => (
            <li key={item.title} className="snap-start">
              <Card>
                <CardMedia image={item.image} alt="" />
                <CardBody>
                  <h3 className="mb-2 text-2xl font-medium text-white">{item.title}</h3>
                  <p className="m-0 text-[0.9375rem] text-white/80">{item.text}</p>
                </CardBody>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
