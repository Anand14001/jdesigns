import { ZoomIn } from "lucide-react";
import { useCallback, useState } from "react";
import { INSTAGRAM } from "../../data/media";
import { InstagramIcon } from "../icons/Icons";
import Lightbox from "../overlays/Lightbox";
import Button from "../ui/Button";
import Img from "../ui/Img";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const tile =
  "group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-xl border-0 bg-line p-0 md:rounded-2xl";

/** Hover veil with the magnifier, matching what the tile does: open the photo. */
function Overlay() {
  return (
    <span className="absolute inset-0 grid place-items-center bg-plum/0 text-white opacity-0 transition-all duration-300 group-hover:bg-plum/55 group-hover:opacity-100 group-focus-visible:bg-plum/55 group-focus-visible:opacity-100">
      <ZoomIn className="size-9" />
    </span>
  );
}

/** "Photo Gallery": tiles open the photo viewer; the button beside the heading
 *  is the one thing that leaves for Instagram. */
export default function Instagram() {
  const [open, setOpen] = useState(null);
  // `alt`, not `title`: these are our own photos with no caption worth printing,
  // so the viewer shows the photo and a counter rather than "Recent work 4".
  const items = INSTAGRAM.posts.map((image, i) => ({ image, alt: `Our work, photo ${i + 1}` }));
  const move = useCallback((dir) => setOpen((i) => (i + dir + items.length) % items.length), [items.length]);
  if (!items.length) return null;

  return (
    <section className="bg-band py-[var(--section)]">
      <div className="wrap">
        <div className="mb-[30px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <SectionTitle bold="Photo" light="Gallery" sub={INSTAGRAM.handle ? `@${INSTAGRAM.handle.replace(/^@/, "")}` : undefined} />
          {INSTAGRAM.url && (
            <Button href={INSTAGRAM.url} variant="outlineDark">
              <InstagramIcon className="size-4" /> Follow Us
            </Button>
          )}
        </div>

        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-5">
          {items.map((item, i) => (
            <Reveal as="li" key={item.image + i}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`View ${item.alt}`} className={tile}>
                <Img src={item.image} alt="" className="transition-transform duration-700 ease-soft group-hover:scale-105" />
                <Overlay />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </section>
  );
}
