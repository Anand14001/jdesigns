import Approach from "../components/sections/Approach";
import CourseGrid from "../components/sections/CourseGrid";
import CtaBand from "../components/sections/CtaBand";
import PageHero from "../components/sections/PageHero";
import Notch from "../components/ui/Notch";
import { COURSES } from "../data/content";
import { PAGE_BANNERS } from "../data/media";

export default function CoursesPage() {
  return (
    <>
      <PageHero image={PAGE_BANNERS.courses} current="Courses" title={COURSES.title} sub={COURSES.lead} />
      <CourseGrid />
      <CtaBand className="pt-0" />
      <Notch />
      <Approach />
    </>
  );
}
