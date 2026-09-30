import { FACILITIES } from "../../data/media";
import Img from "../ui/Img";
import SectionTitle from "../ui/SectionTitle";
import Slider from "../ui/Slider";
import SliderArrows, { useArrows } from "../ui/SliderArrows";

const breakpoints = {
  0: { slidesPerView: 1.15, spaceBetween: 16 },
  768: { slidesPerView: 2.2, spaceBetween: 24 },
  1200: { slidesPerView: 3.2, spaceBetween: 30 },
};

/** "Facilities" (Pearl's Infrastructure): photo carousel with captions over the photo. */
export default function Facilities() {
  const arrows = useArrows();
  if (!FACILITIES.length) return null;

  return (
    <section id="facilities" className="overflow-hidden py-[var(--section)]">
      <div className="wrap mb-[30px] flex items-end justify-between gap-5">
        <SectionTitle bold="Our" light="Facilities" />
        <SliderArrows arrows={arrows} className="hidden md:flex" />
      </div>
      <Slider arrows={arrows} label="Facilities" className="px-[var(--pad)]!" options={{ breakpoints }}>
        {FACILITIES.map((f) => (
          <figure key={f.title} className="group relative m-0 aspect-[4/3] overflow-hidden rounded-card bg-band">
            <Img src={f.image} alt="" className="transition-transform duration-700 ease-soft group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(0,0,0,.85))] px-6 pt-20 pb-6 text-white">
              <strong className="block text-xl font-medium">{f.title}</strong>
              <span className="text-sm text-white/80">{f.text}</span>
            </figcaption>
          </figure>
        ))}
      </Slider>
    </section>
  );
}
