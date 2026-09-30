import { useEffect } from "react";
import { asset } from "../../lib/paths";
import { CircleNext, CirclePrev } from "../icons/Icons";
import Modal from "../ui/Modal";

/** Full-screen photo viewer with previous / next and arrow-key support. */
export default function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") onMove(-1);
      if (e.key === "ArrowRight") onMove(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onMove]);

  return (
    <Modal open onClose={onClose} label={item.title} dark className="max-w-5xl">
      <figure className="m-0 p-4 pt-14 md:p-8 md:pt-14">
        <img src={asset(item.image)} alt={item.title} className="mx-auto max-h-[70vh] w-auto rounded-lg object-contain" />
        <figcaption className="mt-5 flex items-center justify-between gap-4">
          <span>
            <strong className="block text-xl font-medium">{item.title}</strong>
            <span className="text-sm text-white/60">
              {index + 1} / {items.length}
            </span>
          </span>
          {items.length > 1 && (
            <span className="flex shrink-0 gap-3 text-white">
              <button type="button" onClick={() => onMove(-1)} aria-label="Previous photo" className="cursor-pointer border-0 bg-transparent p-0 text-white">
                <CirclePrev className="h-10 w-[60px]" />
              </button>
              <button type="button" onClick={() => onMove(1)} aria-label="Next photo" className="cursor-pointer border-0 bg-transparent p-0 text-white">
                <CircleNext className="h-10 w-[60px]" />
              </button>
            </span>
          )}
        </figcaption>
      </figure>
    </Modal>
  );
}
