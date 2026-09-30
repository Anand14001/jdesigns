import { Download, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FOOTER } from "../../data/content";
import { SOCIAL } from "../../data/media";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useSite } from "../../site/SiteContext";
import { SOCIAL_ICONS, SOCIAL_LABELS } from "../icons/Icons";
import Logo from "./Logo";

function FooterLink({ link }) {
  if (link.to) return <Link to={link.to} className="hover:text-white">{link.label}</Link>;
  if (link.href) return <a href={link.href} className="hover:text-white">{link.label}</a>;
  return link.label;
}

function FooterColumn({ title, links, open, collapsible, onToggle, children }) {
  const id = `footer-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <div className="border-b border-white/18 md:border-0">
      <h4 className="m-0 md:mb-5">
        {collapsible ? (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={id}
            className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-0 py-[18px] text-left text-base font-medium text-white"
          >
            {title}
            {open ? <Minus className="size-5" /> : <Plus className="size-5" />}
          </button>
        ) : (
          <span className="text-base font-medium text-white">{title}</span>
        )}
      </h4>
      <ul id={id} className={`m-0 list-none gap-3.5 p-0 pb-5 md:pb-0 ${open ? "grid" : "hidden"}`}>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
        {children}
      </ul>
    </div>
  );
}

function FollowUs() {
  const links = Object.entries(SOCIAL).filter(([, url]) => url);
  if (!links.length) return null;
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-white">Follow Us</span>
      {links.map(([name, url]) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <a key={name} href={url} target="_blank" rel="noopener" aria-label={SOCIAL_LABELS[name]}
            className="grid size-10 place-items-center rounded-full border border-white/40 text-white transition-colors hover:border-red hover:bg-red">
            <Icon className="size-5" />
          </a>
        );
      })}
    </div>
  );
}

export default function Footer() {
  const { openBrochure } = useSite();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openCols, setOpenCols] = useState({});

  // Collapse every column again whenever we switch into the phone layout.
  useEffect(() => setOpenCols({}), [isMobile]);
  const toggle = (title) => setOpenCols((prev) => ({ ...prev, [title]: !prev[title] }));

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
            >
              {col.title === "Contact" && (
                <li>
                  <button type="button" onClick={() => openBrochure()} className="flex cursor-pointer items-center gap-2 border-0 bg-transparent p-0 text-[0.9375rem] text-white/75 hover:text-white">
                    <Download className="size-4" /> Download Brochure
                  </button>
                </li>
              )}
            </FooterColumn>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-5 border-t-2 border-white pt-10 pb-[50px] lg:grid-cols-[auto_1fr_auto] lg:gap-[30px]">
          <Logo />
          <p className="m-0 max-w-[26.25rem] text-white/60">{FOOTER.about}</p>
          <div className="grid gap-4 lg:justify-items-end">
            <FollowUs />
            <p className="m-0 text-white/60">
              © {new Date().getFullYear()} J Designs &amp; Fashion Institute. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
