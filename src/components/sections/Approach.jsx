import { useCallback, useEffect, useRef, useState } from "react";
import { APPROACH } from "../../data/content";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import { CircleNext, CirclePrev } from "../icons/Icons";
import { Card, CardBody, CardMedia } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

/** "How You'll Learn" — Life@Pearl style carousel with red circle arrows. */
export default function Approach() {
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scroll = (dir) => {
    const el = trackRef.current;
    const card = el?.querySelector(".pcard");
    const step = card ? card.getBoundingClientRect().width + 30 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section id="approach" className="py-[var(--section)]">
      <div className="wrap flex flex-col items-start justify-between gap-5 md:flex-row">
        <div>
          <SectionTitle bold={APPROACH.title[0]} light={APPROACH.title[1]} sub={APPROACH.sub} />
        </div>
        <div className="hidden shrink-0 gap-5 md:flex">
          <button type="button" onClick={() => scroll(-1)} disabled={atStart} aria-label="Previous"
            className="h-10 w-[60px] cursor-pointer border-0 bg-transparent p-0 text-black disabled:cursor-default disabled:opacity-35">
            <CirclePrev className="h-10 w-[60px]" />
          </button>
          <button type="button" onClick={() => scroll(1)} disabled={atEnd} aria-label="Next"
            className="h-10 w-[60px] cursor-pointer border-0 bg-transparent p-0 text-black disabled:cursor-default disabled:opacity-35">
            <CircleNext className="h-10 w-[60px]" />
          </button>
        </div>
      </div>

      <div ref={trackRef} onScroll={sync} className="carousel">
        <ol className="carousel-cols m-0 grid list-none grid-flow-col gap-4 p-0 md:gap-[30px]">
          {APPROACH.steps.map((step) => (
            <Card as="li" key={step.num} className="snap-start">
              <CardMedia square>
                <span className="text-[clamp(6rem,12vw,10rem)] leading-none font-extrabold tracking-[-0.04em] text-black">
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
        </ol>
      </div>
    </section>
  );
}
