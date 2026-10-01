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
const gallery = (n) => `images/stand-in/Gallery${n}.jpg`;

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

/** Photos in the "Why Choose J Designs?" and "About the Institute" sections. */
export const ADVANTAGE_IMAGES = [stand("kit-dark"), stand("scissors-thread")];
export const ABOUT_IMAGE = stand("hero-dressforms");

/** Founder photo. Leave "" to show her initials instead. */
export const FOUNDER_PHOTO = "images/stand-in/founder.jpg";

/** Course brochure (PDF in public/, e.g. "brochure.pdf").
 *  While empty, the "Download Brochure" form asks for it on WhatsApp instead. */
export const BROCHURE_URL = "";

/** Social accounts, shown in the footer and on the Contact page.
 *
 *  Paste the full address of each page, exactly as it appears in the browser
 *  bar when you are looking at your own profile. For example:
 *    instagram: "https://www.instagram.com/jdesigns.institute/",
 *    facebook:  "https://www.facebook.com/jdesignsinstitute",
 *    youtube:   "https://www.youtube.com/@jdesignsinstitute",
 *
 *  An account you do not have yet stays "" and is simply left off the page --
 *  no empty circle, no dead link. If none are filled in, the whole "Follow us"
 *  block disappears. */
export const SOCIAL = {
  instagram: "https://www.instagram.com/j_designs_institution",
  facebook: "https://www.facebook.com/people/J-Designs-Institution/61582163956008/",
  youtube: "https://www.youtube.com/@jdesignsandinstitution",
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

/** "Photo Gallery" grid. The profile link comes from SOCIAL.instagram above, so
 *  it only ever has to be typed once; add `handle` to show @name and the Follow
 *  button under the heading. */
export const INSTAGRAM = {
  handle: "j_designs_institution",
  get url() {
    return SOCIAL.instagram;
  },
  posts: [
    gallery(1), gallery(2), gallery(3), gallery(4),
    gallery(5), gallery(6), gallery(7), gallery(8),
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

/** "Testimonials": student videos, shot upright like a Reel or Short.
 *
 *  `youtubeId` is the code at the end of the link. For
 *  youtube.com/shorts/O8fO88yCt_k   it is "O8fO88yCt_k";
 *  youtube.com/watch?v=O8fO88yCt_k  it is also "O8fO88yCt_k";
 *  youtu.be/O8fO88yCt_k             it is also "O8fO88yCt_k".
 *
 *  `title` is the student, `role` the course she took. `image` is optional --
 *  leave it out and YouTube's own still for that video is used. */
export const TESTIMONIALS = [
  { youtubeId: "", title: "Sasikala R", role: "Aari Embroidery", image: stand("course-aari") },
  { youtubeId: "", title: "Krithika M", role: "Blouse Designing", image: stand("sketch") },
  { youtubeId: "", title: "Neelima S", role: "Basic Tailoring", image: stand("course-basic") },
  { youtubeId: "", title: "Anitha K", role: "Salwar, Maxi & Kurti", image: stand("course-salwar") },
  { youtubeId: "", title: "Divya P", role: "Introduction to Tailoring", image: stand("course-intro") },
];
