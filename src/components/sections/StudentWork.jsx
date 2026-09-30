import { Maximize2 } from "lucide-react";
import { useCallback, useState } from "react";
import { STUDENT_WORK } from "../../data/media";
import Lightbox from "../overlays/Lightbox";
import Img from "../ui/Img";
import SectionTitle from "../ui/SectionTitle";
import Slider from "../ui/Slider";
import SliderArrows, { useArrows } from "../ui/SliderArrows";

const breakpoints = {
  0: { slidesPerView: 1.4, spaceBetween: 16 },
  768: { slidesPerView: 2.6, spaceBetween: 24 },
  1200: { slidesPerView: 4, spaceBetween: 30 },
};

/** "Student Work" (Pearl's Student Outcomes): tall photo carousel that opens a photo viewer. */
export default function StudentWork() {
  const arrows = useArrows();
  const [open, setOpen] = useState(null);
  const move = useCallback((dir) => setOpen((i) => (i + dir + STUDENT_WORK.length) % STUDENT_WORK.length), []);
  if (!STUDENT_WORK.length) return null;

  return (
    <section id="student-work" className="overflow-hidden py-[var(--section)]">
      <div className="wrap mb-[30px] flex items-end justify-between gap-5">
        <SectionTitle bold="Student" light="Work" />
        <SliderArrows arrows={arrows} className="hidden md:flex" />
      </div>
      <Slider arrows={arrows} label="Student work" className="px-[var(--pad)]!" options={{ breakpoints }}>
        {STUDENT_WORK.map((item, i) => (
          <button
            key={item.image + i}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`View photo: ${item.title}`}
            className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-card border-0 bg-band p-0 text-left"
          >
            <Img src={item.image} alt="" className="transition-transform duration-700 ease-soft group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-[linear-gradient(transparent,rgba(0,0,0,.8))] px-5 pt-16 pb-5 text-white">
              <span className="text-lg font-medium">{item.title}</span>
              <Maximize2 className="size-5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
            </span>
          </button>
        ))}
      </Slider>
      {open !== null && <Lightbox items={STUDENT_WORK} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </section>
  );
}
