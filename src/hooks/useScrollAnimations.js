import { gsap, useGSAP } from "../lib/motion";

/**
 * Scroll-driven animations for everything inside `scope`, re-run on each page change:
 *  [data-reveal="up|left"]  fade up / slide in from the left
 *  [data-img-reveal]        photo uncovers left-to-right while zooming out
 *  [data-parallax]          background photo drifts slower than the page
 *  [data-count="200"]       number counts up from 0
 * Nothing runs when the visitor's device asks for reduced motion.
 */
export function useScrollAnimations(scope, pageKey) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          const left = el.dataset.reveal === "left";
          gsap.from(el, {
            autoAlpha: 0,
            x: left ? -30 : 0,
            y: left ? 0 : 28,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray("[data-img-reveal]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power4.inOut" });
          if (img) tl.from(img, { scale: 1.25, duration: 1.4, ease: "power3.out" }, 0);
        });

        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        gsap.utils.toArray("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { value: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = Math.round(counter.value)),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope, dependencies: [pageKey], revertOnUpdate: true }
  );
}
