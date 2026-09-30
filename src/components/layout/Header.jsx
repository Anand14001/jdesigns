import { useEffect, useState } from "react";
import { CONTACT, NAV_LINKS } from "../../data/content";
import { useActiveSection } from "../../hooks/useActiveSection";
import { PhoneIcon } from "../icons/Icons";
import Button from "../ui/Button";
import Logo from "./Logo";

const SECTION_IDS = ["home", ...NAV_LINKS.map((l) => l.href.slice(1))];

export default function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Close the mobile menu with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black text-white">
      {/* Row 1: utility bar (desktop) */}
      <div className="hidden lg:block">
        <div className="wrap flex h-[34px] items-center justify-end gap-[30px] text-sm font-medium">
          <span className="text-red">📍 {CONTACT.location}</span>
          <a href={CONTACT.phoneHref} className="hover:text-red">📞 {CONTACT.phoneDisplay}</a>
        </div>
      </div>

      {/* Row 2: logo + navigation */}
      <div className="wrap flex h-[70px] items-center justify-between gap-5">
        <Logo ariaLabel="J Designs & Fashion Institute home" />

        <nav
          id="nav"
          aria-label="Main navigation"
          className={`fixed top-0 right-0 flex h-screen w-[min(340px,86vw)] flex-col items-start gap-6 border-l border-white/15 bg-black px-[30px] pt-[100px] pb-[30px] transition-transform duration-[350ms] ease-soft
            lg:static lg:h-auto lg:w-auto lg:translate-x-0 lg:flex-row lg:items-center lg:gap-[22px] lg:border-0 lg:bg-transparent lg:p-0 xl:gap-8
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={`text-xl font-medium transition-colors duration-200 hover:text-red lg:text-base xl:text-lg ${
                active === link.href.slice(1) ? "text-red" : "text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" onClick={close} size="sm">
            Enquire Now
          </Button>
        </nav>

        <a href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phoneDisplay}`} className="ml-auto block size-[26px] text-white lg:hidden">
          <PhoneIcon className="size-full" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav"
          className="relative z-[70] cursor-pointer border-0 bg-transparent p-1.5 lg:hidden"
        >
          <span className={`my-[5px] block h-[3px] w-6 bg-red transition-transform duration-300 ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`my-[5px] block h-[3px] w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </div>
    </header>
  );
}
