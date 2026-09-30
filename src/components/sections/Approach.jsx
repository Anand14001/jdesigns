import { APPROACH } from "../../data/content";
import { Card, CardBody, CardMedia } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Slider, { cardBreakpoints } from "../ui/Slider";
import SliderArrows, { useArrows } from "../ui/SliderArrows";

/** "How You'll Learn": five numbered steps in a carousel with red circle arrows. */
export default function Approach() {
  const arrows = useArrows();
  return (
    <section id="approach" className="overflow-hidden py-[var(--section)]">
      <div className="wrap mb-[30px] flex items-end justify-between gap-5">
        <SectionTitle bold={APPROACH.title[0]} light={APPROACH.title[1]} sub={APPROACH.sub} />
        <SliderArrows arrows={arrows} className="hidden md:flex" />
      </div>
      <Slider arrows={arrows} label="How you'll learn" className="px-[var(--pad)]!" options={{ breakpoints: cardBreakpoints(3) }}>
        {APPROACH.steps.map((step) => (
          <Card key={step.num}>
            <CardMedia ratio="square" className="grid place-items-center">
              <span className="text-[clamp(6rem,12vw,10rem)] leading-none font-extrabold tracking-[-0.04em] text-black" aria-hidden="true">
                {step.num}
              </span>
            </CardMedia>
            <CardBody>
              <span className="mb-2 text-sm font-extrabold text-red">{step.num}</span>
              <h3 className="mb-2 text-2xl font-medium text-white">{step.title}</h3>
              <p className="m-0 text-[0.9375rem] text-white/85">{step.text}</p>
            </CardBody>
          </Card>
        ))}
      </Slider>
    </section>
  );
}
