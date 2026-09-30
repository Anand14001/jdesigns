import { ChevronDown, Download, MapPin, Menu, Phone } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { CONTACT, NAV } from "../../data/content";
import { useSite } from "../../site/SiteContext";
import { WhatsAppIcon } from "../icons/Icons";
import Button from "../ui/Button";
import AnnouncementBar from "./AnnouncementBar";
import Logo from "./Logo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

/** True when the page path belongs to this menu item (e.g. /courses/aari-embroidery/ → Courses). */
const isActive = (item, pathname) => item.to !== "/" && !item.to.includes("#") && pathname.startsWith(item.to);

/**
 * Fixed site header: announcement bar, utility bar (desktop), logo + menu.
 * Slides away while scrolling down and comes back when scrolling up.
 */
export default function Header() {
  const { pathname, key } = useLocation();
  const { openEnquiry, openBrochure } = useSite();
  const [mega, setMega] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef(null);
  const closeTimer = useRef(null);
  const closeDrawer = useCallback(() => setDrawer(false), []);

  // Close every menu after navigating.
  useEffect(() => {
    setMega(null);
    setDrawer(false);
  }, [key]);

  // Publish the header height so the page starts below it.
  useLayoutEffect(() => {
    const el = headerRef.current;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - last) < 8) return;
        setHidden(y > last && y > 400);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (hidden) setMega(null);
  }, [hidden]);

  // Escape closes the open mega menu and returns focus to its button.
  useEffect(() => {
    if (!mega) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMega(null);
      document.getElementById(`mega-btn-${mega}`)?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mega]);

  const openMega = (id) => {
    clearTimeout(closeTimer.current);
    setMega(id);
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(null), 180);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onBlur = (e) => {
    if (!headerRef.current.contains(e.relatedTarget)) setMega(null);
  };

  const pinned = mega || drawer;

  return (
    <>
      <header
        ref={headerRef}
        data-site-header
        onFocus={() => setHidden(false)}
        onBlur={onBlur}
        className={`fixed inset-x-0 top-0 z-50 bg-black text-white transition-transform duration-500 ease-soft ${
          hidden && !pinned ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <AnnouncementBar />

        {/* Utility bar (desktop) */}
        <div className="hidden border-b border-white/10 lg:block">
          <div className="wrap flex h-[34px] items-center justify-between gap-[30px] text-sm font-medium">
            <span className="flex items-center gap-2 text-red">
              <MapPin className="size-4" /> {CONTACT.location}
            </span>
            <div className="flex items-center gap-[30px]">
              <button type="button" onClick={() => openBrochure()} className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-sm font-medium text-white hover:text-red">
                <Download className="size-4" /> Download Brochure
              </button>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-red">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
              <a href={CONTACT.phoneHref} className="flex items-center gap-2 hover:text-red">
                <Phone className="size-4" /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Logo + menu */}
        <div className="wrap flex h-[64px] items-center gap-5 lg:h-[70px]">
          <Logo />

          <nav aria-label="Main navigation" className="ml-auto hidden h-full lg:block">
            <ul className="m-0 flex h-full list-none items-center gap-1 p-0 xl:gap-3">
              {NAV.map((item) =>
                item.mega ? (
                  <li key={item.label} className="flex h-full items-center" onMouseEnter={() => openMega(item.mega)} onMouseLeave={scheduleClose}>
                    <NavLink
                      to={item.to}
                      className={`flex h-full items-center px-2 text-base font-medium transition-colors hover:text-red xl:text-lg ${
                        isActive(item, pathname) || mega === item.mega ? "text-red" : "text-white"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                    <button
                      id={`mega-btn-${item.mega}`}
                      type="button"
                      aria-expanded={mega === item.mega}
                      aria-controls={`mega-${item.mega}`}
                      aria-label={`${item.label} menu`}
                      onClick={() => setMega((m) => (m === item.mega ? null : item.mega))}
                      className="-ml-1 grid size-7 cursor-pointer place-items-center border-0 bg-transparent p-0 text-white hover:text-red"
                    >
                      <ChevronDown className={`size-4 transition-transform duration-300 ${mega === item.mega ? "rotate-180" : ""}`} />
                    </button>
                  </li>
                ) : (
                  <li key={item.label} className="flex h-full items-center">
                    <NavLink
                      to={item.to}
                      className={`flex h-full items-center px-2 text-base font-medium transition-colors hover:text-red xl:text-lg ${
                        isActive(item, pathname) ? "text-red" : "text-white"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <Button size="sm" onClick={() => openEnquiry()} className="hidden! lg:inline-flex!">
            Enquire Now
          </Button>

          <button
            type="button"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
            aria-controls="mobile-menu"
            className="ml-auto grid size-10 cursor-pointer place-items-center border-0 bg-transparent p-0 text-white lg:hidden"
          >
            <Menu className="size-7" />
          </button>
        </div>

        {NAV.filter((i) => i.mega).map((item) => (
          <div key={item.mega} className="hidden lg:block">
            <MegaMenu id={item.mega} open={mega === item.mega} onMouseEnter={() => openMega(item.mega)} onMouseLeave={scheduleClose} />
          </div>
        ))}
      </header>

      {/* Dim the page behind an open mega menu */}
      <div
        aria-hidden="true"
        onClick={() => setMega(null)}
        className={`fixed inset-0 z-40 hidden bg-black/50 transition-opacity duration-300 lg:block ${mega ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <MobileMenu open={drawer} onClose={closeDrawer} />
    </>
  );
}
