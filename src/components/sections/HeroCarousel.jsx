import { Download } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { CONTACT, HERO } from "../../data/content";
import { HERO_IMAGES, HERO_IMAGES_MOBILE } from "../../data/media";
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
      <p data-hero-anim className="mb-[18px] text-sm font-medium text-violet-tint">{HERO.eyebrow}</p>
      {/* text-balance evens out the lines so the wrap reads as a deliberate
          break rather than a stray word left on its own. */}
      <h1 data-hero-anim className="mb-[22px] text-[2.125rem] leading-[1.1] font-medium tracking-[-0.015em] text-balance text-white md:text-[clamp(2.25rem,3.6vw,3.25rem)]">
        Turn your creativity into <em className="text-violet-tint not-italic">a skill</em> and your skill into{" "}
        <em className="text-violet-tint not-italic">an income</em>.
      </h1>
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
        Your <span className="text-violet-tint">first stitch</span> starts here.
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
      {/* Written out here rather than taken from COURSES.lead, so the accent can
          fall on the payoff the way it does on the other two banners. The data
          copy still feeds the page description -- change one, change the other. */}
      <h2 data-hero-anim className="mb-[22px] max-w-[48rem] text-[2rem] leading-[1.1] font-medium tracking-[-0.015em] text-white md:text-[clamp(2.25rem,4.2vw,3.5rem)]">
        Five core courses, from your first stitch to{" "}
        <em className="text-violet-tint not-italic">finished designer garments</em>
      </h2>
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
  {
    label: "Turn your creativity into a skill",
    Content: SlideOne,
    // This photo has the trainer standing in the right of the frame, so the slide
    // is composed as two halves: words on the left, her on the right, never
    // touching. `focus` is where the photo is anchored as it is cropped -- the
    // percentages move with the breakpoint because a narrow window cuts away far
    // more of a wide photo than a broad one does. Below 768px it is a different,
    // upright photo (see HERO_IMAGES_MOBILE), so `base` is a focal point for
    // that one: her face a little above centre, the room cropped off the left.
    subject: true,
    focus: { base: "62% 25%", md: "72% 4%", xl: "68% 45%" },
  },
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
  // Autoplay pauses while keyboard focus is inside the hero, so anyone tabbing
  // through the buttons is not carried off mid-slide. Hovering does not pause it.
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
          autoplay: { delay: AUTOPLAY_MS, disableOnInteraction: false },
        }}
      >
        {SLIDES.map(({ label, Content, subject, focus }, i) => (
          <div
            key={label}
            className={`relative flex h-full min-h-[clamp(560px,calc(100svh_-_var(--header-h)),880px)] ${
              // A slide with a person in it is two compositions: stacked while the
              // frame is narrow, side by side once it is wide enough for both.
              subject ? "flex-col bg-hero xl:flex-row xl:items-center" : "items-center"
            }`}
          >
            <div
              className={
                subject
                  ? "hero-bg absolute inset-0 overflow-hidden md:relative md:inset-auto md:h-[clamp(190px,26svh,320px)] md:shrink-0 xl:absolute xl:inset-0 xl:h-auto"
                  : "hero-bg absolute inset-0"
              }
              aria-hidden="true"
              style={focus ? { "--hero-focus": focus.base, "--hero-focus-md": focus.md, "--hero-focus-xl": focus.xl } : undefined}
            >
              <Img src={HERO_IMAGES[i]} mobileSrc={HERO_IMAGES_MOBILE[i]} eager={i === 0} />
              <div
                className={`absolute inset-0 ${
                  subject ? "hero-veil-subject" : "bg-[linear-gradient(90deg,rgba(0,0,0,.72)_0%,rgba(0,0,0,.45)_55%,rgba(0,0,0,.12)_100%)]"
                }`}
              />
            </div>

            <div
              className={`wrap relative w-full ${
                subject
                  ? "flex flex-1 flex-col justify-end pt-7 pb-[96px] md:justify-center xl:block xl:flex-none xl:pt-16 xl:pb-[120px]"
                  : "pt-12 pb-[120px] md:pt-16"
              }`}
            >
              {/* On a wide frame, held to roughly half the hero so the words have
                  a column of their own and stop well short of her. */}
              <div className={subject ? "xl:max-w-[52%]" : ""}>
                <Content />
              </div>
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
                  className={`absolute inset-y-0 left-0 w-full origin-left bg-violet-tint ${active === i ? "" : "scale-x-0"}`}
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
