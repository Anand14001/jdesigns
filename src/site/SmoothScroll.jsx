import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useMediaQuery";
import { gsap, ScrollTrigger } from "../lib/motion";

const LenisContext = createContext(null);

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
 *  Switched off when the visitor has asked their device for reduced motion. */
export function SmoothScrollProvider({ children }) {
  const reduceMotion = useReducedMotion();
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    if (reduceMotion) return;
    const instance = new Lenis({ autoRaf: false, lerp: 0.12 });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reduceMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export const useLenis = () => useContext(LenisContext);

/** Height of the fixed header, so anchor targets are not hidden under it. */
export const headerOffset = () => (document.querySelector("[data-site-header]")?.offsetHeight ?? 0) + 10;

/** Scroll to an element (or the top), smoothly when Lenis is running. */
export function scrollToTarget(lenis, target, { immediate = false } = {}) {
  if (target == null) {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  // Work out the pixel position from the real scroll position (Lenis's own
  // value can lag behind on first load), then hand Lenis a number.
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
  if (lenis) lenis.scrollTo(top, { immediate, force: true });
  else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}
