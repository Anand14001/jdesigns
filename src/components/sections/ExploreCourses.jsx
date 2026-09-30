import { COURSES } from "../../data/content";
import { COURSE_IMAGES } from "../../data/media";
import Button from "../ui/Button";
import { Card, CardArrow, CardBody, CardMedia } from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Slider, { cardBreakpoints } from "../ui/Slider";
import SliderArrows, { useArrows } from "../ui/SliderArrows";

/** Card for one course, linking to its page. Also used for "Other Courses". */
export function CourseCard({ course }) {
  return (
    <Card>
      <CardMedia image={COURSE_IMAGES[course.slug]} alt="">
        {course.badge && (
          <span className="absolute top-[18px] left-[18px] rounded-btn bg-red px-3 py-[5px] text-xs font-extrabold text-white">{course.badge}</span>
        )}
      </CardMedia>
      <CardBody>
        {course.tag && <span className="mb-2 block text-sm font-medium text-white/70">{course.tag}</span>}
        <h3 className="mb-2 text-2xl font-medium text-white">{course.title}</h3>
        <p className="m-0 text-[0.9375rem] text-white/85">{course.text}</p>
        <CardArrow to={`/courses/${course.slug}/`} label={`View ${course.ariaTitle ?? course.title}`} />
      </CardBody>
    </Card>
  );
}

/** "Explore Courses" (Pearl's Explore Programmes): carousel of course cards. */
export default function ExploreCourses({ exclude, title = ["Explore", "Courses"], sub = COURSES.lead }) {
  const arrows = useArrows();
  const courses = COURSES.items.filter((c) => c.slug !== exclude);

  return (
    <section id="explore-courses" className="overflow-hidden py-[var(--section)]">
      <div className="wrap mb-[30px] flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <SectionTitle bold={title[0]} light={title[1]} sub={sub} />
        <SliderArrows arrows={arrows} className="hidden md:flex" />
      </div>
      <Slider arrows={arrows} label="Courses" className="px-[var(--pad)]!" options={{ breakpoints: cardBreakpoints(3) }}>
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </Slider>
      <div className="wrap mt-[30px]">
        <Button to="/courses/" variant="outlineDark">View All Courses</Button>
      </div>
    </section>
  );
}
