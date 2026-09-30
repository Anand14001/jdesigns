import { useCallback, useEffect, useState } from "react";
import { CONTACT, HERO } from "../../data/content";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import { Hoop } from "../icons/Illustrations";
import Button from "../ui/Button";

const SLIDE_COUNT = 2;
const AUTOPLAY_MS = 6000;

const slideBase =
  "slide col-start-1 row-start-1 flex items-center pt-10 pb-[70px] md:min-h-[clamp(540px,calc(100vh_-_var(--header-h)_-_32px),max(764px,53vw))] md:pt-[60px] md:pb-[90px]";

function SlideOne({ active }) {
  return (
    <div
      className={`${slideBase} bg-[radial-gradient(circle_at_78%_50%,#3a0d0a_0,#070707_55%)] ${active ? "is-active" : ""}`}
      role="group"
      aria-roledescription="slide"
      aria-label="1 of 2"
    >
      <div className="wrap grid w-full grid-cols-1 items-center gap-[30px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[60px]">
        <div>
          <p className="mb-[18px] text-sm font-medium text-red">{HERO.eyebrow}</p>
          <h1 className="mb-[22px] text-[2.125rem] leading-[1.1] font-medium tracking-[-0.015em] text-white md:text-[clamp(2.25rem,4.4vw,3.5rem)]">
            Turn your creativity into <em className="text-red not-italic">a skill</em> and your skill into{" "}
            <em className="text-red not-italic">an income</em>.
          </h1>
          <p className="max-w-[35rem] text-base text-white/80 md:text-lg">{HERO.lead}</p>
          <div className="mt-[30px] flex flex-wrap gap-3.5">
            <Button href="#courses" className="max-md:flex-[1_1_100%]">Explore Courses</Button>
            <Button href={CONTACT.phoneHref} variant="outlineLight" className="max-md:flex-[1_1_100%]">
              Call {CONTACT.phoneDisplay}
            </Button>
          </div>
        </div>
        <Hoop className="h-auto w-[min(300px,70%)] justify-self-center lg:w-[min(26.875rem,100%)]" />
      </div>
    </div>
  );
}

function SlideTwo({ active }) {
  return (
    <div
      className={`${slideBase} bg-hero ${active ? "is-active" : ""}`}
      role="group"
      aria-roledescription="slide"
      aria-label="2 of 2"
    >
      <div className="wrap w-full text-center">
        <h2 className="mb-[30px] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-white uppercase md:mb-[50px]">
          Your <span className="text-red">first stitch</span> starts here.
        </h2>
        <ul className="mx-auto grid max-w-[62.5rem] list-none grid-cols-3 gap-5 gap-y-6 p-0 lg:grid-cols-5">
          {HERO.facts.map((f) => (
            <li key={f.strong} className="flex flex-col text-base leading-[1.3] md:text-[1.375rem]">
              <strong className="font-medium">{f.strong}</strong>
              <span className="font-light text-white/85">{f.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">
          <Button href={CONTACT.phoneHref} className="max-md:flex-[1_1_100%]">Call Now</Button>
          <Button href={CONTACT.whatsappHref} variant="outlineLight" className="max-md:flex-[1_1_100%]">
            WhatsApp Us
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // restarts the autoplay timer after a manual pick

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDE_COUNT), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, tick]);

  const goTo = useCallback((i) => {
    setCurrent(i);
    setTick((t) => t + 1);
  }, []);

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative overflow-hidden bg-hero text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div className="grid">
        <SlideOne active={current === 0} />
        <SlideTwo active={current === 1} />
      </div>

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-[18px]" role="tablist" aria-label="Choose slide">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`size-3.5 cursor-pointer rounded-full border p-0 ${
              current === i ? "border-white bg-white" : "border-red bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
