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
    else window.scrollTo(0, 0);
    return;
  }
  const offset = -headerOffset();
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate, force: true });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}
