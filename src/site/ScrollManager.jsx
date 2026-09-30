import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { LEGACY_ANCHORS } from "../data/content";
import { routeFor } from "../data/routes";
import { ScrollTrigger } from "../lib/motion";
import { scrollToTarget, useLenis } from "./SmoothScroll";

/**
 * On every navigation: forwards old one-page links (/#contact → /contact/),
 * sets the page title and description, then scrolls to the top or to the #anchor.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const firstLoad = useRef(true);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const route = routeFor(pathname);
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);
  }, [pathname]);

  useEffect(() => {
    // Old one-page link: go to the page it lives on now.
    if (pathname === "/" && LEGACY_ANCHORS[hash]) {
      navigate(LEGACY_ANCHORS[hash], { replace: true });
      return;
    }

    const initial = firstLoad.current;

    if (!hash) {
      firstLoad.current = false;
      scrollToTarget(lenisRef.current, null);
      return;
    }

    const find = () => document.getElementById(decodeURIComponent(hash.slice(1)));
    // Wait a frame so the new page has rendered before looking for the anchor.
    // When a page is opened directly at an #anchor, jump there instantly and
    // correct once images above it have loaded.
    const frame = requestAnimationFrame(() => {
      firstLoad.current = false;
      const el = find();
      if (el) scrollToTarget(lenisRef.current, el, { immediate: initial });
    });
    const settle = () => {
      const el = find();
      if (el) scrollToTarget(lenisRef.current, el, { immediate: true });
    };
    if (initial) {
      if (document.readyState === "complete") setTimeout(settle, 300);
      else window.addEventListener("load", settle, { once: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", settle);
    };
  }, [pathname, hash, key, navigate]);

  // Recalculate scroll animations once images on the new page have loaded.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
