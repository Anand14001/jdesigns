import { Download, MapPin, Minus, Phone, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { CONTACT, NAV } from "../../data/content";
import { useSite } from "../../site/SiteContext";
import { useLenis } from "../../site/SmoothScroll";
import { WhatsAppIcon } from "../icons/Icons";
import Button from "../ui/Button";
import Logo from "./Logo";

/** Phone / tablet menu: full-height drawer with accordions for Courses and About. */
export default function MobileMenu({ open, onClose }) {
  const { openEnquiry, openBrochure } = useSite();
  const lenis = useLenis();
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }
    const opener = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    panelRef.current.querySelector("button")?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      lenis?.start();
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, lenis]);

  const action = (fn) => () => {
    onClose();
    fn();
  };

  return (
    <div className={`fixed inset-0 z-[70] lg:hidden ${open ? "" : "pointer-events-none"}`}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-lenis-prevent
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-y-auto overscroll-contain bg-black text-white transition-transform duration-[400ms] ease-soft ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-white/15 px-5">
          <Logo />
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-10 cursor-pointer place-items-center border-0 bg-transparent p-0 text-white">
            <X className="size-7" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="px-5">
          <ul className="m-0 list-none p-0">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-white/15">
                {item.links ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={expanded === item.label}
                      aria-controls={`sub-${item.mega}`}
                      onClick={() => setExpanded((x) => (x === item.label ? null : item.label))}
                      className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-0 py-[18px] text-left text-xl font-medium text-white"
                    >
                      {item.label}
                      {expanded === item.label ? <Minus className="size-5 text-red" /> : <Plus className="size-5" />}
                    </button>
                    <ul id={`sub-${item.mega}`} hidden={expanded !== item.label} className="m-0 list-none p-0 pb-4">
                      <li>
                        <NavLink to={item.to} end className="block py-2.5 pl-4 text-base text-white/80 hover:text-red">
                          {item.mega === "courses" ? "All Courses" : "About Us"}
                        </NavLink>
                      </li>
                      {item.links
                        .filter((l) => l.to !== item.to)
                        .map((l) => (
                          <li key={l.to}>
                            <NavLink to={l.to} className="block py-2.5 pl-4 text-base text-white/80 hover:text-red">
                              {l.label}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </>
                ) : (
                  <NavLink to={item.to} className="block py-[18px] text-xl font-medium text-white hover:text-red">
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 grid gap-3 px-5">
          <Button onClick={action(() => openEnquiry())}>Enquire Now</Button>
          <Button variant="outlineLight" onClick={action(() => openBrochure())}>
            <Download className="size-4" /> Download Brochure
          </Button>
        </div>

        <div className="mt-auto grid gap-4 px-5 pt-10 pb-8 text-sm">
          <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-white">
            <Phone className="size-5" /> {CONTACT.phoneDisplay}
          </a>
          <a href={CONTACT.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 text-white">
            <WhatsAppIcon className="size-5" /> WhatsApp Us
          </a>
          <span className="flex items-center gap-3 text-red">
            <MapPin className="size-5" /> {CONTACT.location}
          </span>
        </div>
      </div>
    </div>
  );
}
