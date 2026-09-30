import { useEffect, useLayoutEffect } from "react";
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

  useLayoutEffect(() => {
    if (pathname === "/" && LEGACY_ANCHORS[hash]) navigate(LEGACY_ANCHORS[hash], { replace: true });
  }, [pathname, hash, navigate]);

  useEffect(() => {
    const route = routeFor(pathname);
    document.title = route.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", route.description);
  }, [pathname]);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!hash) {
      scrollToTarget(lenis, null);
      return;
    }
    // Wait a frame so the new page has rendered before looking for the anchor.
    const id = requestAnimationFrame(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) scrollToTarget(lenis, el);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash, key, lenis]);

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
