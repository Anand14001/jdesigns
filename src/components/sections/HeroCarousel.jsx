import { Download } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CONTACT, COURSES, HERO } from "../../data/content";
import { HERO_IMAGES } from "../../data/media";
import { useReducedMotion } from "../../hooks/useMediaQuery";
import { gsap } from "../../lib/motion";
import { useSite } from "../../site/SiteContext";
import Button from "../ui/Button";
import Img from "../ui/Img";
import Slider from "../ui/Slider";

const AUTOPLAY_MS = 6000;
const btnRow = "mt-[30px] flex flex-wrap gap-3.5";

function SlideOne() {
  return (
    <>
      <p data-hero-anim className="mb-[18px] text-sm font-medium text-red">{HERO.eyebrow}</p>
      <h1 data-hero-anim className="mb-[22px] text-[2.125rem] leading-[1.1] font-medium tracking-[-0.015em] text-white md:text-[clamp(2.25rem,4.4vw,3.75rem)]">
        Turn your creativity into <em className="text-red not-italic">a skill</em> and your skill into{" "}
        <em className="text-red not-italic">an income</em>.
      </h1>
      <p data-hero-anim className="max-w-[35rem] text-base text-white/85 md:text-lg">{HERO.lead}</p>
      <div data-hero-anim className={btnRow}>
        <Button to="/courses/" className="max-md:flex-[1_1_100%]">Explore Courses</Button>
        <Button href={CONTACT.phoneHref} variant="outlineLight" className="max-md:flex-[1_1_100%]">
          Call {CONTACT.phoneDisplay}
        </Button>
      </div>
    </>
  );
}

function SlideTwo() {
  return (
    <>
      <h2 data-hero-anim className="mb-[30px] text-[clamp(2.5rem,7vw,5.75rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-white uppercase md:mb-[40px]">
        Your <span className="text-red">first stitch</span> starts here.
      </h2>
      <ul data-hero-anim className="m-0 grid max-w-[56rem] list-none grid-cols-3 gap-5 gap-y-6 p-0 lg:grid-cols-5">
        {HERO.facts.map((f) => (
          <li key={f.strong} className="flex flex-col text-base leading-[1.3] md:text-[1.25rem]">
            <strong className="font-medium text-white">{f.strong}</strong>
            <span className="font-light text-white/85">{f.text}</span>
          </li>
        ))}
      </ul>
      <div data-hero-anim className={btnRow}>
        <Button href={CONTACT.phoneHref} className="max-md:flex-[1_1_100%]">Call Now</Button>
        <Button href={CONTACT.whatsappHref} variant="outlineLight" className="max-md:flex-[1_1_100%]">WhatsApp Us</Button>
      </div>
    </>
  );
}

function SlideThree() {
  const { openBrochure } = useSite();
  return (
    <>
      <h2 data-hero-anim className="mb-[22px] max-w-[48rem] text-[2rem] leading-[1.1] font-medium tracking-[-0.015em] text-white md:text-[clamp(2.25rem,4.2vw,3.5rem)]">
        {COURSES.lead}
      </h2>
      <p data-hero-anim className="max-w-[35rem] text-base text-white/85 md:text-lg">{COURSES.text}</p>
      <div data-hero-anim className={btnRow}>
        <Button to="/courses/" className="max-md:flex-[1_1_100%]">View Courses</Button>
        <Button variant="outlineLight" onClick={() => openBrochure()} className="max-md:flex-[1_1_100%]">
          <Download className="size-4" /> Download Brochure
        </Button>
      </div>
    </>
  );
}

const SLIDES = [
  { label: "Turn your creativity into a skill", Content: SlideOne },
  { label: "Your first stitch starts here", Content: SlideTwo },
  { label: "Our courses", Content: SlideThree },
];

/** Full-screen photo hero: cross-fading slides, text animated in with GSAP, autoplay with progress. */
export default function HeroCarousel() {
  const reduceMotion = useReducedMotion();
  const swiperRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);

  const animateIn = useCallback((swiper) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = swiper.slides[swiper.activeIndex]?.querySelectorAll("[data-hero-anim]");
    if (!items?.length) return;
    gsap.fromTo(items, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: true });
  }, []);

  const onReady = useCallback(
    (swiper) => {
      swiperRef.current = swiper;
      swiper.on("slideChange", () => setActive(swiper.activeIndex));
      swiper.on("slideChangeTransitionStart", () => animateIn(swiper));
      swiper.on("autoplayTimeLeft", (_, __, progress) => progressRef.current?.style.setProperty("--progress", String(1 - progress)));
      animateIn(swiper);
    },
    [animateIn]
  );

  const goTo = (i) => swiperRef.current?.slideTo(i);
  // Autoplay pauses while the mouse is over the hero or keyboard focus is inside it.
  const pause = () => swiperRef.current?.autoplay?.pause();
  const resume = (e) => {
    if (e.type === "blur" && e.currentTarget.contains(e.relatedTarget)) return;
    swiperRef.current?.autoplay?.resume();
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      onFocus={pause}
      onBlur={resume}
      className="hero relative overflow-hidden bg-hero text-white"
    >
      <Slider
        label="Highlights"
        onReady={onReady}
        options={{
          effect: "fade",
          fadeEffect: { crossFade: true },
          speed: 900,
          rewind: true,
          autoplay: { delay: AUTOPLAY_MS, pauseOnMouseEnter: true, disableOnInteraction: false },
        }}
      >
        {SLIDES.map(({ label, Content }, i) => (
          <div key={label} className="relative flex h-full min-h-[clamp(560px,calc(100svh_-_var(--header-h)),880px)] items-center">
            <div className="hero-bg absolute inset-0" aria-hidden="true">
              <Img src={HERO_IMAGES[i]} eager={i === 0} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.62)_55%,rgba(0,0,0,.3)_100%)]" aria-hidden="true" />
            <div className="wrap relative w-full pt-12 pb-[120px] md:pt-16">
              <Content />
            </div>
          </div>
        ))}
      </Slider>

      {/* Slide tabs with autoplay progress */}
      <div className="wrap absolute inset-x-0 bottom-6 z-10 md:bottom-10">
        <div className="flex flex-1 gap-3 md:max-w-[38rem] md:gap-5" role="group" aria-label="Choose slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}: ${s.label}`}
              aria-current={active === i ? "true" : undefined}
              className="group flex-1 cursor-pointer border-0 bg-transparent p-0 pt-2 text-left text-white"
            >
              <span className={`mb-2 block text-sm font-extrabold transition-colors ${active === i ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative block h-[3px] overflow-hidden bg-white/25">
                <span
                  ref={active === i ? progressRef : undefined}
                  className={`absolute inset-y-0 left-0 w-full origin-left bg-red ${active === i ? "" : "scale-x-0"}`}
                  style={active === i ? { transform: reduceMotion ? "none" : "scaleX(var(--progress, 0))" } : undefined}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
