import { MISSION_VISION } from "../../data/content";
import Reveal from "../ui/Reveal";

export default function MissionVision() {
  return (
    <section id="mission" className="bg-band py-[var(--section)]">
      <div className="wrap grid grid-cols-1 gap-6 md:grid-cols-2">
        {MISSION_VISION.map((item) => (
          <Reveal key={item.label} className="rounded-2xl bg-white px-6 py-[30px] shadow-[0_6px_24px_rgba(0,0,0,.06)] md:p-11">
            <h2
              className={`mb-[22px] inline-block rounded-btn border px-5 py-1.5 text-xs font-medium ${
                item.dark ? "border-plum bg-plum text-white" : "border-ink/30 text-ink"
              }`}
            >
              {item.label}
            </h2>
            <p className="m-0 text-[1.1875rem] leading-[1.45] text-ink md:text-[1.375rem]">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
