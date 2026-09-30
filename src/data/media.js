// ---------------------------------------------------------------------------
// STAND-IN PHOTOS AND SECTIONS
//
// Everything in this file is temporary. The photos in public/images/stand-in/
// are free public-domain stock images (see CREDITS.md there), used until your
// own photos are ready. Replace each path with your own photo, e.g.
//   "images/my-aari-work.jpg"   (put the file in public/images/)
//
// Sections switch off automatically when their list is empty ([]).
// ---------------------------------------------------------------------------

const stand = (name) => `images/stand-in/${name}.webp`;

/** Hero slider backgrounds, in slide order. */
export const HERO_IMAGES = [stand("hero-silks"), stand("hero-threads"), stand("course-blouse")];

/** One photo per course (key = course slug in content.js). */
export const COURSE_IMAGES = {
  "introduction-to-tailoring": stand("course-intro"),
  "basic-tailoring": stand("course-basic"),
  "blouse-designing": stand("sketch"),
  "salwar-maxi-kurti": stand("course-salwar"),
  "aari-embroidery": stand("course-aari"),
};

/** Top banners of the inner pages. */
export const PAGE_BANNERS = {
  courses: stand("spools"),
  about: stand("threads-pile"),
  contact: stand("threads-row"),
};

/** Photos in the "J Designs Advantage" and "About the Institute" sections. */
export const ADVANTAGE_IMAGES = [stand("kit-dark"), stand("scissors-thread")];
export const ABOUT_IMAGE = stand("hero-dressforms");

/** Founder photo. Leave "" to show her initials instead. */
export const FOUNDER_PHOTO = "";

/** Course brochure (PDF in public/, e.g. "brochure.pdf").
 *  While empty, the "Download Brochure" form asks for it on WhatsApp instead. */
export const BROCHURE_URL = "";

/** Footer "Follow Us" links. Empty ones are hidden. */
export const SOCIAL = {
  instagram: "",
  facebook: "",
  youtube: "",
};

/** "Student Work" gallery (Pearl's Student Outcomes). */
export const STUDENT_WORK = [
  { image: stand("work-floral"), title: "Aari Embroidery" },
  { image: stand("work-blouse"), title: "Blouse Designing" },
  { image: stand("work-dress-green"), title: "Salwar, Maxi & Kurti" },
  { image: stand("work-panel"), title: "Aari Embroidery" },
  { image: stand("work-dress-gold"), title: "Basic Tailoring" },
  { image: stand("work-motif"), title: "Aari Embroidery" },
  { image: stand("work-dress-brown"), title: "Salwar, Maxi & Kurti" },
];

/** "Latest From Instagram". Add your handle and profile link to show the Follow button. */
export const INSTAGRAM = {
  handle: "",
  url: "",
  posts: [
    stand("threads-pile"), stand("course-aari"), stand("yarn"), stand("threads-glass"),
    stand("sewing-kit"), stand("threads-wood"), stand("thimble"), stand("threads-circle"),
  ],
};

/** "Achievements" tabs. The words come from your existing content; only the photos are stand-ins. */
export const ACHIEVEMENTS = [
  {
    label: "Institute",
    items: [
      { image: stand("hero-dressforms"), title: "Founded in 2011", text: "Mrs. Sasikala J founded J Designs in 2011 and has run it ever since." },
      { image: stand("machine"), title: "15+ Years of Teaching", text: "Around 15 years of training women in tailoring, garment construction and Aari embroidery." },
      { image: stand("notions"), title: "5 Core Courses", text: "Five core courses, from your first stitch to finished designer garments" },
    ],
  },
  {
    label: "Students",
    items: [
      { image: stand("threads-row"), title: "200+ Women Trained", text: "Complete beginners, aspiring designers, homemakers and women who want to start a home-based business." },
      { image: stand("spools"), title: "Income From Home", text: "Many of her students have gone on to take tailoring orders and build income from home." },
      { image: stand("sketch-2"), title: "Mentorship", text: "Mentorship for starting your own tailoring business" },
    ],
  },
];

/** "Facilities" (Pearl's Infrastructure). Captions are taken from your course syllabus. */
export const FACILITIES = [
  { image: stand("machine-vintage"), title: "Sewing Machines", text: "Sewing machine handling & care" },
  { image: stand("scissors-thread"), title: "Cutting & Marking", text: "Fabric measurement, marking & cutting" },
  { image: stand("work-border"), title: "Aari Frames", text: "Frame setting & Aari needle techniques" },
  { image: stand("course-aari"), title: "Embellishments", text: "Chain, zardosi, stone, bead & sequin work" },
  { image: stand("bobbins"), title: "Tools & Threads", text: "Tools, fabrics & basic hand stitches" },
];

/** "Video Gallery". Add a YouTube video id (the part after v= in the link) to make a card play.
 *  Cards without an id show a "coming soon" note with a WhatsApp link. */
export const VIDEOS = [
  { youtubeId: "", title: "Aari Embroidery", image: stand("course-aari") },
  { youtubeId: "", title: "Blouse Designing", image: stand("sketch") },
  { youtubeId: "", title: "Introduction to Tailoring", image: stand("course-intro") },
  { youtubeId: "", title: "Salwar, Maxi & Kurti Stitching", image: stand("course-salwar") },
];
