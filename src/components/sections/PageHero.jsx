import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Img from "../ui/Img";

/**
 * Banner at the top of inner pages: photo with a slow parallax, breadcrumb,
 * big bold/light title and a red rule underneath.
 * `crumbs` = [{ label, to }] between Home and the current page.
 */
export default function PageHero({ image, crumbs = [], current, title, sub, tag }) {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <div data-parallax className="absolute -inset-y-[12%] inset-x-0">
            <Img src={image} eager />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.74)_0%,rgba(0,0,0,.48)_50%,rgba(0,0,0,.15)_100%)]" />
        </div>
      )}
      <div className="wrap relative flex min-h-[300px] flex-col justify-end pt-10 pb-12 md:min-h-[380px] md:pb-16">
        <nav aria-label="Breadcrumb" className="mb-6 md:mb-10">
          <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0 text-sm text-white/75">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.to} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                <Link to={c.to} className="hover:text-white">{c.label}</Link>
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <span aria-current="page" className="text-white">{current}</span>
            </li>
          </ol>
        </nav>
        {tag && <span data-reveal="up" className="mb-3 inline-block w-fit rounded-btn bg-gold px-3 py-[5px] text-xs font-extrabold text-shell">{tag}</span>}
        <h1 data-reveal="left" className="m-0 max-w-[50rem] text-[2.25rem] leading-[1.05] font-light tracking-[-0.015em] text-white md:text-[clamp(2.75rem,5vw,4.25rem)]">
          <b className="font-extrabold">{title[0]}</b> {title[1]}
        </h1>
        {sub && <p data-reveal="up" className="m-0 mt-4 max-w-[40rem] text-base text-white/80 md:text-xl">{sub}</p>}
      </div>
      <div className="h-1.5 bg-gold" aria-hidden="true" />
    </section>
  );
}
