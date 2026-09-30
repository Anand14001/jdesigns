import Achievements from "../components/sections/Achievements";
import Advantage from "../components/sections/Advantage";
import Audience from "../components/sections/Audience";
import CtaBand from "../components/sections/CtaBand";
import ExploreCourses from "../components/sections/ExploreCourses";
import Founder from "../components/sections/Founder";
import HeroCarousel from "../components/sections/HeroCarousel";
import Instagram from "../components/sections/Instagram";
import QuickBar from "../components/sections/QuickBar";
import Stats from "../components/sections/Stats";
import StudentWork from "../components/sections/StudentWork";
import VideoGallery from "../components/sections/VideoGallery";
import Notch from "../components/ui/Notch";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <QuickBar />
      <Advantage />
      <Stats />
      <ExploreCourses />
      <Audience />
      <Notch />
      <StudentWork />
      <Achievements />
      <Founder teaser />
      <CtaBand className="pt-0" />
      <Instagram />
      <VideoGallery />
    </>
  );
}
