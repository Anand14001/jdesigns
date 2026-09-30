import { Check } from "lucide-react";
import { COURSES } from "../../data/content";
import { COURSE_IMAGES } from "../../data/media";
import { useSite } from "../../site/SiteContext";
import Button from "../ui/Button";
import { Card, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";

/** All five courses as full cards (Courses page). Each card has its own #anchor. */
export default function CourseGrid() {
  const { openEnquiry } = useSite();

  return (
    <section className="py-[var(--section)]">
      <div className="wrap">
        <Reveal as="p" className="mb-[30px] max-w-3xl text-lg text-muted md:mb-10">{COURSES.text}</Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[30px] xl:grid-cols-3">
          {COURSES.items.map((c) => (
            <Reveal as="article" key={c.slug} id={c.slug} className="flex">
              <Card className="w-full">
                <CardMedia image={COURSE_IMAGES[c.slug]} alt="">
                  {c.badge && (
                    <span className="absolute top-[18px] left-[18px] rounded-btn bg-red px-3 py-[5px] text-xs font-extrabold text-white">{c.badge}</span>
                  )}
                </CardMedia>
                <CardBody>
                  {c.tag && <span className="mb-2 block text-sm font-medium text-white/70">{c.tag}</span>}
                  <h2 className="mb-2 text-2xl font-medium text-white">{c.title}</h2>
                  <p className="mb-4 text-[0.9375rem] text-white/85">{c.text}</p>
                  <ul className="m-0 mb-7 grid list-none gap-2 p-0">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-white/78">
                        <Check className="mt-0.5 size-4 shrink-0 text-red" /> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Button to={`/courses/${c.slug}/`} size="sm" aria-label={`View course: ${c.ariaTitle ?? c.title}`}>View Course</Button>
                    <Button size="sm" variant="outlineLight" onClick={() => openEnquiry(c.title)} aria-label={`Enquire about ${c.ariaTitle ?? c.title}`}>
                      Enquire
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
