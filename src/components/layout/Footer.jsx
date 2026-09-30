import { useEffect, useState } from "react";
import { FOOTER } from "../../data/content";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Logo from "./Logo";

function FooterColumn({ title, links, open, collapsible, onToggle }) {
  return (
    <div className="border-b border-white/18 md:border-0">
      <h4 className="m-0 md:mb-5">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className={`flex w-full items-center justify-between border-0 bg-transparent p-0 text-left text-base font-medium text-white ${
            collapsible ? "cursor-pointer py-[18px]" : "cursor-default"
          }`}
        >
          {title}
          {collapsible && <span className="text-[1.375rem] font-light" aria-hidden="true">{open ? "−" : "+"}</span>}
        </button>
      </h4>
      <ul className={`m-0 list-none gap-3.5 p-0 pb-5 md:pb-0 ${open ? "grid" : "hidden"}`}>
        {links.map((link) => (
          <li key={link.label}>
            {link.href ? <a href={link.href} className="hover:text-white">{link.label}</a> : link.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openCols, setOpenCols] = useState({});

  // Collapse every column again whenever we switch into the mobile layout
  useEffect(() => setOpenCols({}), [isMobile]);

  const toggle = (title) => {
    if (!isMobile) return;
    setOpenCols((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <footer className="border-t-[3px] border-white bg-black pt-[30px] text-[0.9375rem] text-white/75 md:pt-[60px]">
      <div className="wrap">
        <div className="grid grid-cols-1 pb-[30px] md:grid-cols-[repeat(3,auto)] md:justify-start md:gap-x-[60px] md:gap-y-10 md:pb-[50px] lg:gap-x-[100px] lg:pl-24">
          {FOOTER.columns.map((col) => (
            <FooterColumn
              key={col.title}
              {...col}
              collapsible={isMobile}
              open={!isMobile || !!openCols[col.title]}
              onToggle={() => toggle(col.title)}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-4 border-t-2 border-white pt-10 pb-[50px] lg:grid-cols-[auto_1fr_auto] lg:gap-[30px]">
          <Logo />
          <p className="m-0 max-w-[26.25rem] text-white/60">{FOOTER.about}</p>
          <p className="m-0 text-white/60">
            © {new Date().getFullYear()} J Designs &amp; Fashion Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
