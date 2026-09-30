import { useRef } from "react";
import { Route, Routes, useLocation } from "react-router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import SideActions from "./components/layout/SideActions";
import SiteModals from "./components/overlays/SiteModals";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CoursesPage from "./pages/CoursesPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScrollManager from "./site/ScrollManager";
import { SiteProvider } from "./site/SiteContext";
import { SmoothScrollProvider } from "./site/SmoothScroll";

function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  useScrollAnimations(mainRef, pathname);

  return (
    <>
      <a href="#main" className="sr-only z-[200] rounded-btn bg-red px-4 py-2 font-extrabold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:slug" element={<CourseDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <SideActions />
      <SiteModals />
    </>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <SmoothScrollProvider>
        <Layout />
      </SmoothScrollProvider>
    </SiteProvider>
  );
}
