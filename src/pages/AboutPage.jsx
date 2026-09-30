import About from "../components/sections/About";
import Achievements from "../components/sections/Achievements";
import CtaBand from "../components/sections/CtaBand";
import Facilities from "../components/sections/Facilities";
import Founder from "../components/sections/Founder";
import MissionVision from "../components/sections/MissionVision";
import PageHero from "../components/sections/PageHero";
import Stats from "../components/sections/Stats";
import { ABOUT } from "../data/content";
import { PAGE_BANNERS } from "../data/media";

export default function AboutPage() {
  return (
    <>
      <PageHero image={PAGE_BANNERS.about} current="About Us" title={ABOUT.title} sub={ABOUT.sub} />
      <About showTitle={false} />
      <Stats />
      <div className="h-[var(--section)]" />
      <MissionVision />
      <Founder />
      <Achievements />
      <Facilities />
      <CtaBand className="pt-0" />
    </>
  );
}
