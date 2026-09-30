import { COURSES } from "../../data/content";
import { COURSE_ICONS } from "../icons/Icons";
import Button from "../ui/Button";
import { Card, CardArrow, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

function CourseCard({ icon, tag, badge, title, ariaTitle, text, points }) {
  return (
    <Reveal as="article" className="flex">
      <Card className="w-full">
        <CardMedia>
          <svg viewBox="0 0 48 48" className="size-24">{COURSE_ICONS[icon]}</svg>
          {badge && (
            <span className="absolute top-[18px] left-[18px] rounded-btn bg-red px-3 py-[5px] text-xs font-extrabold text-white">
              {badge}
            </span>
          )}
        </CardMedia>
        <CardBody>
          <h3 className="mb-2 text-2xl font-medium text-white">{title}</h3>
          {tag && <span className="mb-[18px] block text-sm font-medium text-white">{tag}</span>}
          <p className="mb-3 text-[0.9375rem] text-white/85">{text}</p>
          <ul className="m-0 mt-1 grid list-none gap-1.5 p-0">
            {points.map((point) => (
              <li
                key={point}
                className="relative pl-4 text-sm text-white/78 before:absolute before:top-[0.62em] before:left-0 before:size-1.5 before:rounded-full before:bg-red before:content-['']"
              >
                {point}
              </li>
            ))}
          </ul>
          <CardArrow href="#contact" label={`Enquire about ${ariaTitle ?? title}`} />
        </CardBody>
      </Card>
    </Reveal>
  );
}

/** "Explore Programmes" style grid: intro text in the first cell, then the course cards. */
export default function Courses() {
  return (
    <section id="courses" className="pt-2.5 pb-[var(--section)]">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[30px] lg:grid-cols-3">
          <div className="md:col-span-full lg:col-span-1 lg:pr-5">
            <SectionTitle bold={COURSES.title[0]} light={COURSES.title[1]} />
            <Reveal as="p" className="mt-2 mb-4 text-xl leading-[1.35] font-medium text-ink">
              {COURSES.lead}
            </Reveal>
            <Reveal as="p" className="text-muted">{COURSES.text}</Reveal>
          </div>

          {COURSES.items.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>

        <Reveal className="mt-[30px] flex flex-col items-start gap-[30px] rounded-card bg-black px-6 py-7 text-white md:px-10 md:py-[34px] lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="mb-1.5 text-2xl text-white">{COURSES.cta.title}</h3>
            <p className="m-0 max-w-[45rem] text-white/75">{COURSES.cta.text}</p>
          </div>
          <Button href="#contact" className="max-md:w-full">{COURSES.cta.button}</Button>
        </Reveal>
      </div>
    </section>
  );
}
