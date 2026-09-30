import { Children, useEffect, useRef } from "react";
import Swiper from "swiper";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { prefersReducedMotion } from "../../lib/motion";

/** Card carousels: 1.15 cards on phones, 2.2 on tablets, 3 (or `desktop`) on laptops. */
export const cardBreakpoints = (desktop = 3) => ({
  0: { slidesPerView: 1.15, spaceBetween: 16 },
  768: { slidesPerView: 2.2, spaceBetween: 30 },
  1200: { slidesPerView: desktop, spaceBetween: 30 },
});

/**
 * Thin React wrapper around Swiper (Swiper 14 no longer ships React components).
 * Each child becomes one slide. `arrows` = { prev, next } refs to buttons.
 * Slides are never cloned (no loop mode), so React stays in charge of the markup.
 * Options are read once; give the Slider a new `key` to change them.
 */
export default function Slider({ options = {}, arrows, label, className = "", slideClassName = "", onReady, children }) {
  const el = useRef(null);
  const onReadyRef = useRef(onReady);
  const optionsRef = useRef(options);
  const count = Children.count(children);

  useEffect(() => {
    onReadyRef.current = onReady;
  });

  useEffect(() => {
    const opts = optionsRef.current;
    const reduce = prefersReducedMotion();
    const swiper = new Swiper(el.current, {
      modules: [A11y, Autoplay, EffectFade, Keyboard, Navigation],
      watchOverflow: true,
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { containerMessage: label, slideRole: "group" },
      speed: reduce ? 0 : 600,
      ...opts,
      autoplay: reduce ? false : opts.autoplay ?? false,
      navigation: arrows
        ? { prevEl: arrows.prev.current, nextEl: arrows.next.current, disabledClass: "is-disabled", lockClass: "is-locked" }
        : false,
    });
    onReadyRef.current?.(swiper);
    return () => swiper.destroy(true, true);
  }, [count, label, arrows]);

  return (
    <div ref={el} className={`swiper ${className}`}>
      <div className="swiper-wrapper">
        {Children.map(children, (child) => (
          <div className={`swiper-slide h-auto! ${slideClassName}`}>{child}</div>
        ))}
      </div>
    </div>
  );
}
