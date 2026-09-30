# J Designs & Fashion Institute — website

Multi-page site for J Designs & Fashion Institute, Poonamallee, Chennai.
Layout and components follow the Pearl Academy style; all words are the institute's own.

**Built with:** React 19 · Vite · Tailwind CSS · React Router · Swiper · GSAP + ScrollTrigger · Lenis (smooth scrolling) · React Hook Form · Lucide icons

## Pages

| Address | Contents |
|---|---|
| `/` | Hero slider, "J Designs Advantage", numbers, Explore Courses carousel, Who Can Join, Student Work, Achievements, Founder, Instagram, Video Gallery |
| `/courses/` | All five courses, "Not sure where to begin?", How You'll Learn |
| `/courses/aari-embroidery/` (one page per course) | Overview, what you'll learn, method, who can join, enquiry form, other courses |
| `/about/` | About the Institute, numbers, Mission & Vision, Founder, Achievements, Facilities |
| `/contact/` | Contact details, map, enquiry form |

Old one-page links (`/#contact`, `/#courses`, `/#founder` …) forward automatically to the new pages.

Site-wide: announcement bar, mega menus (Courses, About Us), phone menu, **Enquire Now** popup,
**Download Brochure** popup, floating call / WhatsApp buttons. All forms send to WhatsApp (+91 99405 85875).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build and publish

```bash
npm run build      # outputs the finished site to dist/
npm run preview    # check dist/ locally before uploading
```

Upload the **contents** of `dist/` to any web host (Netlify, Vercel, GitHub Pages, cPanel …), at the
top level or in a sub-folder. Every page is a real HTML file (`dist/courses/index.html`, …), so links
opened directly or shared on WhatsApp work without any special server settings.

## Editing

| What | Where |
|---|---|
| Text, phone number, menus, courses | `src/data/content.js` |
| Photos and the placeholder sections (see below) | `src/data/media.js` |
| Page titles and Google descriptions | `src/data/routes.js` |
| Logo | `public/images/j-designs-logo.webp` (web copy of `public/j_designs_logo.png`) |
| Browser-tab icon | `public/favicon-48.png`, `public/apple-touch-icon.png` (made from `public/favicon.svg`) |

### Stand-in photos — replace before launch

The photos in `public/images/stand-in/` are **free public-domain stock photos** used until the
institute's own photos are ready (sources in `public/images/stand-in/CREDITS.md`).

To replace one: put your photo in `public/images/` and change its path in `src/data/media.js`,
e.g. `"images/my-aari-work.jpg"`.

| In `media.js` | Shown in | Notes |
|---|---|---|
| `HERO_IMAGES` | Home hero slider | 3 wide photos |
| `COURSE_IMAGES` | Course cards, course pages, mega menu | one per course |
| `PAGE_BANNERS` | Top of Courses / About / Contact | wide photos |
| `ADVANTAGE_IMAGES`, `ABOUT_IMAGE` | Home "Advantage", About mega menu | |
| `STUDENT_WORK` | Home "Student Work" gallery | **should be real student work** |
| `INSTAGRAM` | Home "Latest From Instagram" | add `handle` + `url` to show the Follow button and link the photos |
| `ACHIEVEMENTS` | Home + About tabs | text is from your content; photos are stand-ins |
| `FACILITIES` | About "Our Facilities" | photos of your own classroom |
| `VIDEOS` | Home "Video Gallery" | add a YouTube id to make a card play; until then it offers a WhatsApp demo |
| `FOUNDER_PHOTO` | Founder card | empty shows "SJ" initials |
| `BROCHURE_URL` | Brochure popup | empty = asks for the brochure on WhatsApp; set to e.g. `"brochure.pdf"` (file in `public/`) to download it |
| `SOCIAL` | Footer "Follow Us" | empty links are hidden |

Setting a list to `[]` hides that section completely.

## Where things live

```
index.html              page shell (title, fonts, icons, Google info)
vite.config.js          build + the step that writes one HTML file per page
src/
  main.jsx, App.jsx     start-up and page routes
  data/                 content.js, media.js, routes.js
  pages/                HomePage, CoursesPage, CourseDetailPage, AboutPage, ContactPage, NotFoundPage
  site/                 SiteContext (popups), SmoothScroll (Lenis), ScrollManager (titles, #anchors, old links)
  components/
    layout/             Header, MegaMenu, MobileMenu, AnnouncementBar, Footer, SideActions, Logo
    sections/           every page section (HeroCarousel, Advantage, ExploreCourses, …)
    forms/              EnquiryForm, BrochureForm (React Hook Form)
    overlays/           SiteModals, Lightbox, VideoModal
    ui/                 Button, Card, Slider (Swiper), SliderArrows, Modal, SectionTitle, Img …
  hooks/                useScrollAnimations (GSAP), useMediaQuery
  index.css             colours, font, breakpoints, a few custom styles
```

Visitors whose phone or computer is set to "reduce motion" get the site without smooth scrolling,
animations or the auto-playing slider.
