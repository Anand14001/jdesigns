import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { ABOUT, COURSES, FOOTER, FOUNDER, NAV } from "../../data/content";
import { ABOUT_IMAGE, COURSE_IMAGES } from "../../data/media";
import { useSite } from "../../site/SiteContext";
import Button from "../ui/Button";
import Img from "../ui/Img";

const linkCls =
  "group flex items-center justify-between gap-4 border-b border-white/15 py-3.5 text-lg font-medium text-white transition-colors hover:text-red focus-visible:text-red";

/** Courses panel: course list on the left, a live preview of the hovered course on the right. */
function CoursesPanel() {
  const { openEnquiry } = useSite();
  const [active, setActive] = useState(0);
  const course = COURSES.items[active];
  const extra = NAV[0].links.at(-1); // "How You'll Learn"

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-[60px]">
      <div>
        <p className="mb-2 text-sm font-medium text-red">Our Courses</p>
        <ul className="m-0 list-none p-0">
          {COURSES.items.map((c, i) => (
            <li key={c.slug}>
              <Link
                to={`/courses/${c.slug}/`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`${linkCls} ${i === active ? "text-red!" : ""}`}
              >
                {c.title}
                <ArrowRight className="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          <Link to="/courses/" className="text-white underline underline-offset-4 hover:text-red">View all courses</Link>
          <Link to={extra.to} className="text-white underline underline-offset-4 hover:text-red">{extra.label}</Link>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] overflow-hidden rounded-card bg-white/[0.06]">
        <div className="relative min-h-[300px]">
          <Img key={course.slug} src={COURSE_IMAGES[course.slug]} alt="" className="absolute inset-0 animate-[fade_.4s_ease]" />
          {course.badge && (
            <span className="absolute top-4 left-4 rounded-btn bg-red px-3 py-[5px] text-xs font-extrabold text-white">{course.badge}</span>
          )}
        </div>
        <div className="flex flex-col p-8">
          {course.tag && <span className="mb-2 text-sm font-medium text-white/70">{course.tag}</span>}
          <p className="mb-3 text-2xl font-medium text-white">{course.title}</p>
          <p className="mb-4 text-[0.9375rem] text-white/80">{course.text}</p>
          <ul className="m-0 mb-6 grid list-none gap-2 p-0">
            {course.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm text-white/75">
                <Check className="mt-0.5 size-4 shrink-0 text-red" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-3">
            <Button to={`/courses/${course.slug}/`} size="sm">View Course</Button>
            <Button size="sm" variant="outlineLight" onClick={() => openEnquiry(course.title)}>Enquire</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** About panel: page links, a short introduction and the founder. */
function AboutPanel() {
  const links = NAV[1].links;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] gap-[60px]">
      <div>
        <p className="mb-2 text-sm font-medium text-red">About Us</p>
        <ul className="m-0 list-none p-0">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkCls}>
                {l.label}
                <ArrowRight className="size-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] overflow-hidden rounded-card bg-white/[0.06]">
        <div className="relative min-h-[300px]">
          <Img src={ABOUT_IMAGE} alt="" className="absolute inset-0" />
        </div>
        <div className="flex flex-col p-8">
          <p className="mb-3 text-2xl font-medium text-white">{ABOUT.sub}</p>
          <p className="mb-6 text-[0.9375rem] text-white/80">{FOOTER.about}</p>
          <div className="mt-auto border-t border-white/15 pt-5">
            <p className="m-0 text-lg font-medium text-white">{FOUNDER.name}</p>
            <p className="m-0 text-sm text-white/70">{FOUNDER.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PANELS = { courses: CoursesPanel, about: AboutPanel };

/**
 * Full-width dropdown under the header (desktop). Always in the page so it can
 * fade in and out; `inert` keeps it out of the Tab order while closed.
 */
export default function MegaMenu({ id, open, onMouseEnter, onMouseLeave }) {
  const Panel = PANELS[id];
  return (
    <div
      id={`mega-${id}`}
      inert={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute inset-x-0 top-full border-t-[3px] border-red bg-black shadow-[0_30px_60px_rgba(0,0,0,.35)] transition-[opacity,transform,visibility] duration-300 ease-soft ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="wrap py-10">
        <Panel />
      </div>
    </div>
  );
}
