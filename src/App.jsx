import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SideActions from "./components/layout/SideActions";
import About from "./components/sections/About";
import Approach from "./components/sections/Approach";
import Audience from "./components/sections/Audience";
import Contact from "./components/sections/Contact";
import Courses from "./components/sections/Courses";
import Founder from "./components/sections/Founder";
import Hero from "./components/sections/Hero";
import MissionVision from "./components/sections/MissionVision";
import Notice from "./components/sections/Notice";
import QuickBar from "./components/sections/QuickBar";
import Stats from "./components/sections/Stats";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Notice />
        <QuickBar />
        <Audience />
        <Stats />
        <About />
        <div className="wrap">
          <div className="notch" aria-hidden="true" />
        </div>
        <Courses />
        <Approach />
        <MissionVision />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <SideActions />
    </>
  );
}
