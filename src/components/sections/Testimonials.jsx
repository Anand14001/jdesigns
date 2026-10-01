import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../../data/media";
import { prefersReducedMotion } from "../../lib/motion";
import { PlayIcon } from "../icons/Icons";
import SectionTitle from "../ui/SectionTitle";

const COUNT = TESTIMONIALS.length;
const AUTOPLAY_MS = 2000;
const SWIPE_PX = 40;

/**
 * true  - every card is a live YouTube player, so each one carries YouTube's
 *         own title bar and play button from the moment the page loads.
 * false - a card shows a still until it is clicked, then becomes a player.
 *         Far lighter: one player instead of five, and no YouTube cookies
 *         until someone presses play.
 */
const LIVE_EMBEDS = true;

/** YouTube's own still, used when a card has no `image` of its own. */
const poster = (t) => t.image || (t.youtubeId ? `https://i.ytimg.com/vi/${t.youtubeId}/hqdefault.jpg` : "");

/** Where a card sits relative to the centre: 0 is centre, +/-1 the flanks, beyond that hidden. */
function offsetFrom(index, active) {
  const half = Math.floor(COUNT / 2);
  let off = index - active;
  if (off > half) off -= COUNT;
  if (off < -half) off += COUNT;
  return off;
}

const PLACE = {
  centre: "translate-x-0 scale-100 opacity-100 z-20 ring-2 ring-gold/80 shadow-[0_0_35px_rgba(216,165,49,0.3)]",
  left: "-translate-x-[68%] sm:-translate-x-[85%] md:-translate-x-[95%] scale-[0.82] sm:scale-[0.85] opacity-40 hover:opacity-75 z-10 cursor-pointer border border-gold/30 grayscale-[20%]",
  right: "translate-x-[68%] sm:translate-x-[85%] md:translate-x-[95%] scale-[0.82] sm:scale-[0.85] opacity-40 hover:opacity-75 z-10 cursor-pointer border border-gold/30 grayscale-[20%]",
  hidden: "scale-75 opacity-0 pointer-events-none z-0",
};

const arrowBtn =
  "absolute top-1/2 z-30 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full " +
  "border border-gold/40 bg-shell/90 text-gold shadow-xl backdrop-blur-md transition-all duration-300 " +
  "hover:scale-110 hover:border-gold hover:bg-gold/20 focus-visible:ring-2 focus-visible:ring-gold sm:size-12";

/** One upright card: a still that becomes a player, or a player from the start. */
function TestimonialCard({ item, isCentre, onPlay }) {
  const [live, setLive] = useState(LIVE_EMBEDS);
  const frame = useRef(null);

  // Clicking inside a YouTube iframe hands it focus, which blurs the window.
  // That is the only signal the page gets that someone pressed play.
  useEffect(() => {
    if (!live) return;
    const onBlur = () => document.activeElement === frame.current && onPlay();
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [live, onPlay]);

  if (!item.youtubeId) {
    return (
      <div className="relative size-full">
        <img src={poster(item)} alt="" className="size-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80" />
        <span className="absolute inset-x-0 top-0 p-4 md:p-5">
          <span className="block truncate text-[0.9375rem] font-bold text-white">{item.title}</span>
          <span className="mt-0.5 block truncate text-xs text-violet-tint">{item.role}</span>
        </span>
        <span className="absolute inset-x-0 bottom-0 p-4 text-center text-xs text-white/70">Video coming soon</span>
      </div>
    );
  }

  if (live) {
    return (
      <iframe
        ref={frame}
        src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}${LIVE_EMBEDS ? "" : "?autoplay=1"}`}
        title={`${item.title} - ${item.role}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="size-full border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setLive(true);
        onPlay();
      }}
      aria-label={`Play testimonial from ${item.title}`}
      tabIndex={isCentre ? 0 : -1}
      className="group relative size-full cursor-pointer border-0 bg-transparent p-0"
    >
      <img src={poster(item)} alt="" loading="lazy" className="size-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80" />
      <span className="absolute inset-x-0 top-0 p-4 text-left md:p-5">
        <span className="block truncate text-[0.9375rem] font-bold text-white">{item.title}</span>
        <span className="mt-0.5 block truncate text-xs text-violet-tint">{item.role}</span>
      </span>
      <span className="absolute inset-0 grid place-items-center">
        <PlayIcon className="size-14 text-white/90 transition-transform duration-300 group-hover:scale-110 md:size-16" />
      </span>
    </button>
  );
}

/**
 * "Testimonials": upright student videos stacked three deep, the middle one lit
 * up in gold. Advances by itself and wraps around in both directions.
 * Hand-rolled rather than Swiper: the cards move in place by transform instead
 * of riding along a track, so there is no track for a slider to carry.
 */
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [played, setPlayed] = useState(false);
  const [nudge, setNudge] = useState(0);
  const drag = useRef(null);

  const step = useCallback((dir) => {
    setActive((i) => (i + dir + COUNT) % COUNT);
    setNudge((n) => n + 1);
  }, []);

  const goTo = useCallback((i) => {
    setActive(i);
    setNudge((n) => n + 1);
  }, []);

  // Advances on its own. Held while the pointer is over it, and for good once
  // someone starts a video. `nudge` restarts the count after a manual move.
  useEffect(() => {
    if (hovered || played || prefersReducedMotion()) return;
    const id = setInterval(() => setActive((i) => (i + 1) % COUNT), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [hovered, played, nudge]);

  const onPointerDown = (e) => (drag.current = e.clientX);
  const onPointerUp = (e) => {
    if (drag.current === null) return;
    const moved = e.clientX - drag.current;
    drag.current = null;
    if (moved < -SWIPE_PX) step(1);
    else if (moved > SWIPE_PX) step(-1);
  };

  if (!COUNT) return null;

  return (
    <section id="testimonials" className="overflow-hidden bg-shell py-[var(--section)] text-white">
      <div className="wrap mb-[30px] text-center">
        <SectionTitle dark bold="Student" light="Testimonials" />
        <p className="mx-auto mt-2.5 max-w-xl text-white/70">
          In their own words: what our students made, and where it took them.
        </p>
      </div>

      <div
        className="relative mx-auto w-full max-w-5xl px-2 py-4 select-none sm:px-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial" className={`${arrowBtn} left-2 sm:left-4`}>
          <ChevronLeft className="size-5 sm:size-6" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next testimonial" className={`${arrowBtn} right-2 sm:right-4`}>
          <ChevronRight className="size-5 sm:size-6" />
        </button>

        <div
          className="relative flex h-[460px] touch-pan-y items-center justify-center sm:h-[540px] md:h-[600px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => (drag.current = null)}
        >
          {TESTIMONIALS.map((item, i) => {
            const off = offsetFrom(i, active);
            const place = off === 0 ? PLACE.centre : off === -1 ? PLACE.left : off === 1 ? PLACE.right : PLACE.hidden;
            return (
              <div
                key={item.youtubeId || item.title}
                aria-hidden={Math.abs(off) > 1}
                onClick={() => off !== 0 && step(off)}
                className={`absolute aspect-[9/16] w-[230px] overflow-hidden rounded-2xl bg-white/5 shadow-2xl transition-all duration-500 ease-soft sm:w-[270px] md:w-[310px] ${place}`}
              >
                <TestimonialCard item={item} isCentre={off === 0} onPlay={() => setPlayed(true)} />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.youtubeId || item.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}: ${item.title}`}
              aria-current={i === active}
              className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-all duration-300 ${
                i === active ? "w-7 bg-gold" : "w-2 bg-gold/40 hover:bg-gold/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
