import { Check, Download, Phone } from "lucide-react";
import { useParams } from "react-router";
import { AUDIENCE_ICONS } from "../components/icons/Icons";
import EnquiryForm from "../components/forms/EnquiryForm";
import ExploreCourses from "../components/sections/ExploreCourses";
import PageHero from "../components/sections/PageHero";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import SectionTitle from "../components/ui/SectionTitle";
import { APPROACH, AUDIENCE, CONTACT, COURSES } from "../data/content";
import { COURSE_IMAGES } from "../data/media";
import { useSite } from "../site/SiteContext";
import NotFoundPage from "./NotFoundPage";

/** One page per course: overview, syllabus, method, who can join, enquiry form. */
export default function CourseDetailPage() {
  const { slug } = useParams();
  const { openBrochure } = useSite();
  const course = COURSES.items.find((c) => c.slug === slug);
  if (!course) return <NotFoundPage />;

  return (
    <>
      <PageHero
        image={COURSE_IMAGES[course.slug]}
        crumbs={[{ label: "Courses", to: "/courses/" }]}
        current={course.title}
        title={[course.title, ""]}
        sub={course.text}
        tag={course.badge ?? course.tag}
      />

      <section className="py-[var(--section)]">
        <div className="wrap grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-[70px]">
          <div className="grid gap-14">
            <div>
              <SectionTitle bold="Course" light="Overview" />
              <Reveal as="p" className="mt-4 mb-0 text-lg leading-[1.7] text-ink">{course.text} {COURSES.text}</Reveal>
            </div>

            <div>
              <SectionTitle bold="What You'll" light="Learn" />
              <ul className="m-0 mt-6 grid list-none gap-4 p-0 md:grid-cols-3">
                {course.points.map((p) => (
                  <Reveal as="li" key={p} className="rounded-card bg-black p-6 text-white">
                    <Check className="mb-4 size-7 text-red" />
                    <span className="text-lg leading-snug font-medium">{p}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <SectionTitle bold={APPROACH.title[0]} light={APPROACH.title[1]} sub={APPROACH.sub} />
              <ol className="m-0 mt-6 list-none border-t border-black p-0">
                {APPROACH.steps.map((s) => (
                  <Reveal as="li" key={s.num} className="grid grid-cols-[56px_1fr] gap-4 border-b border-line py-5 md:grid-cols-[80px_220px_1fr]">
                    <span className="text-2xl font-extrabold text-red">{s.num}</span>
                    <strong className="text-lg font-medium text-ink">{s.title}</strong>
                    <span className="text-muted max-md:col-start-2">{s.text}</span>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div>
              <SectionTitle bold={AUDIENCE.title[0]} light={AUDIENCE.title[1]} sub={AUDIENCE.sub} />
              <ul className="m-0 mt-6 grid list-none gap-4 p-0 sm:grid-cols-2">
                {AUDIENCE.items.map((a) => (
                  <Reveal as="li" key={a.title} className="flex gap-4 rounded-card bg-band p-6">
                    <svg viewBox="0 0 48 48" className="size-10 shrink-0 text-black" aria-hidden="true">{AUDIENCE_ICONS[a.icon]}</svg>
                    <span>
                      <strong className="mb-1 block text-lg font-medium text-ink">{a.title}</strong>
                      <span className="text-[0.9375rem] text-muted">{a.text}</span>
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          <aside className="grid gap-4 lg:sticky lg:top-[calc(var(--header-h)+20px)]">
            <EnquiryForm idPrefix="course-" initialCourse={course.title} title={`Enquire about ${course.ariaTitle ?? course.title}`} className="border border-line shadow-[0_10px_40px_rgba(0,0,0,.08)] md:p-8!" />
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outlineDark" onClick={() => openBrochure(course.title)}>
                <Download className="size-4" /> Brochure
              </Button>
              <Button href={CONTACT.phoneHref} variant="outlineDark">
                <Phone className="size-4" /> Call Us
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <ExploreCourses exclude={course.slug} title={["Other", "Courses"]} sub={COURSES.lead} />
    </>
  );
}
