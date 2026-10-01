import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { asset } from "../../lib/paths";
import Modal from "../ui/Modal";

/* Same round, gold-edged buttons the testimonial carousel uses, so every
   "move to the next one" control on a dark surface looks the same. */
const navBtn =
  "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full " +
  "border border-gold/40 bg-shell/90 text-gold shadow-xl backdrop-blur-md transition-all duration-300 " +
  "hover:scale-110 hover:border-gold hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold sm:size-12";

/** Full-screen photo viewer with previous / next and arrow-key support. */
export default function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];
  const many = items.length > 1;
  // `alt` carries the description for photos with no caption worth showing.
  const label = item.title || item.alt || "Photo";

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") onMove(-1);
      if (e.key === "ArrowRight") onMove(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onMove]);

  return (
    <Modal open onClose={onClose} label={label} dark className="max-w-5xl">
      <figure className="m-0 p-3 pt-16 pb-5 md:p-6 md:pt-16 md:pb-7">
        <div className="relative">
          <img
            src={asset(item.image)}
            alt={label}
            className="mx-auto block max-h-[68vh] w-auto rounded-xl object-contain"
          />
          {many && (
            <>
              <button type="button" onClick={() => onMove(-1)} aria-label="Previous photo" className={`${navBtn} left-2 md:left-4`}>
                <ChevronLeft className="size-5 sm:size-6" />
              </button>
              <button type="button" onClick={() => onMove(1)} aria-label="Next photo" className={`${navBtn} right-2 md:right-4`}>
                <ChevronRight className="size-5 sm:size-6" />
              </button>
            </>
          )}
        </div>

        <figcaption className="mt-5 flex flex-col items-center gap-2 text-center">
          {item.title && <strong className="text-lg font-medium text-white">{item.title}</strong>}
          {many && (
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs tracking-wide text-white/55">
              <b className="font-semibold text-white">{index + 1}</b> / {items.length}
            </span>
          )}
        </figcaption>
      </figure>
    </Modal>
  );
}
