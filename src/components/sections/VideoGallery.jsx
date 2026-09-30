import { useState } from "react";
import { VIDEOS } from "../../data/media";
import { PlayIcon } from "../icons/Icons";
import VideoModal from "../overlays/VideoModal";
import Img from "../ui/Img";
import SectionTitle from "../ui/SectionTitle";
import Slider, { cardBreakpoints } from "../ui/Slider";
import SliderArrows, { useArrows } from "../ui/SliderArrows";

/** "Video Gallery": black band with video cards; each plays in a popup. */
export default function VideoGallery() {
  const arrows = useArrows();
  const [playing, setPlaying] = useState(null);
  if (!VIDEOS.length) return null;

  return (
    <section className="overflow-hidden bg-black py-[var(--section)] text-white">
      <div className="wrap mb-[30px] flex items-end justify-between gap-5">
        <SectionTitle dark bold="Video" light="Gallery" />
        <SliderArrows arrows={arrows} dark className="hidden md:flex" />
      </div>
      <Slider arrows={arrows} label="Videos" className="px-[var(--pad)]!" options={{ breakpoints: cardBreakpoints(3) }}>
        {VIDEOS.map((v) => (
          <button
            key={v.title}
            type="button"
            onClick={() => setPlaying(v)}
            aria-label={`Play video: ${v.title}`}
            className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-white"
          >
            <span className="relative block aspect-video overflow-hidden rounded-card bg-[#1a1a1a]">
              <Img src={v.image} alt="" className="opacity-80 transition-[transform,opacity] duration-700 ease-soft group-hover:scale-105 group-hover:opacity-100" />
              <span className="absolute inset-0 grid place-items-center">
                <PlayIcon className="size-16 text-white transition-transform duration-300 group-hover:scale-110 md:size-20" />
              </span>
            </span>
            <span className="mt-4 block text-xl font-medium">{v.title}</span>
          </button>
        ))}
      </Slider>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
