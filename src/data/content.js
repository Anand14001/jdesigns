// All site copy lives here, word for word from the original index.html.
// Stand-in photos and placeholder sections live separately in media.js.

export const CONTACT = {
  phoneDisplay: "+91 99405 85875",
  phoneHref: "tel:+919940585875",
  whatsappNumber: "919940585875",
  whatsappHref:
    "https://wa.me/919940585875?text=Hello%20J%20Designs%2C%20I%20would%20like%20to%20know%20about%20your%20courses.",
  location: "Poonamallee, Chennai, Tamil Nadu",
};

// Old one-page links (/#about …) and the page each one lives on now.
export const LEGACY_ANCHORS = {
  "#about": "/about/",
  "#courses": "/courses/",
  "#approach": "/courses/#approach",
  "#founder": "/about/#founder",
  "#contact": "/contact/",
};

export const HERO = {
  eyebrow: "Since 2011 · Poonamallee, Chennai",
  // No longer shown: the first banner is now the heading and the two buttons
  // alone. Kept here in case the sentence is wanted back one day.
  lead:
    "Practical tailoring, garment construction and Aari embroidery training for women. You learn by stitching real garments, with personal guidance at every step from Mrs. Sasikala J.",
  facts: [
    { strong: "15+", text: "Years of teaching" },
    { strong: "200+", text: "Women trained" },
    { strong: "Beginner", text: "friendly" },
    { strong: "Hands-on", text: "practice" },
    { strong: "Individual", text: "attention" },
  ],
};

export const NOTICE =
  "New batches for beginners and advanced learners. Call or WhatsApp to reserve your seat.";

export const AUDIENCE = {
  title: ["Who Can", "Join"],
  sub: "Made for women at every stage",
  items: [
    { icon: "sprout", title: "Beginners", text: "No prior experience needed. We start from threading the needle." },
    { icon: "home", title: "Homemakers", text: "Learn a valuable skill on a schedule that fits around your family life." },
    { icon: "scissors", title: "Aspiring Designers", text: "Build strong construction and embroidery basics for a career in fashion." },
    { icon: "briefcase", title: "Future Entrepreneurs", text: "Get the skills and confidence to start your own home-based tailoring business." },
  ],
};

export const STATS = [
  { count: 15, suffix: "+", label: "Years of Experience" },
  { count: 200, suffix: "+", label: "Women Trained" },
  { count: 5, label: "Core Courses" },
  { text: "1 : 1", label: "Personal Guidance" },
];

export const ABOUT = {
  title: ["About", "the Institute"],
  sub: "Fashion education built on real, practical skill",
  checklist: [
    "Learn by doing, stitching real garments from day one",
    "Small batches with individual guidance",
    "Training plus professional tailoring services under one roof",
    "Mentorship for starting your own tailoring business",
  ],
};

/** "Why Choose J Designs?" — the four reasons, each with a short line of its own. */
export const ADVANTAGE = {
  title: ["Why Choose", "J Designs?"],
  sub: "More than just learning to stitch, we help you build confidence, creativity, and skills for a future in fashion.",
  items: [
    {
      title: "Expert Guidance",
      text: "Learn from experienced trainers with personalized guidance and practical instruction.",
    },
    {
      title: "Hands-On Learning",
      text: "Build real-world tailoring and fashion skills through practical training and creative projects.",
    },
    {
      title: "Beginner-Friendly Courses",
      text: "Start from the basics and develop your skills step by step, even with no prior experience.",
    },
    {
      title: "Empowering Opportunities",
      text: "Turn your passion for fashion into professional skills, independent work, and entrepreneurial opportunities.",
    },
  ],
};

export const COURSES = {
  title: ["Our", "Courses"],
  lead: "Five core courses, from your first stitch to finished designer garments",
  text: "Every course combines demonstration, guided practice and finishing techniques, so you leave able to stitch with confidence.",
  items: [
    {
      icon: "intro",
      slug: "introduction-to-tailoring",
      tag: "Start Here",
      title: "Introduction to Tailoring",
      text: "A gentle first step into tailoring for anyone who has never used a sewing machine.",
      points: ["Sewing machine handling & care", "Tools, fabrics & basic hand stitches", "Taking body measurements"],
    },
    {
      icon: "basic",
      slug: "basic-tailoring",
      tag: "Foundation",
      title: "Basic Tailoring Course",
      text: "Core garment construction skills that every professional tailor relies on.",
      points: ["Fabric measurement, marking & cutting", "Seams, darts, hems & finishing", "Stitching simple everyday garments"],
    },
    {
      icon: "blouse",
      slug: "blouse-designing",
      badge: "Most Popular",
      title: "Blouse Designing",
      text: "Design and stitch well-fitted blouses, from simple styles to designer patterns.",
      points: ["Accurate blouse measurement & drafting", "Princess cut, lining & padded blouses", "Neck, sleeve & back designs"],
    },
    {
      icon: "salwar",
      slug: "salwar-maxi-kurti",
      tag: "Garments",
      title: "Salwar, Maxi & Kurti Stitching",
      ariaTitle: "Salwar, Maxi and Kurti Stitching",
      text: "Make popular ethnic and everyday wear with a professional fit and finish.",
      points: ["Salwar, churidar & pant cutting", "Kurti styles, slits, yokes & collars", "Maxi / nighty & gown construction"],
    },
    {
      icon: "aari",
      slug: "aari-embroidery",
      tag: "Embroidery",
      title: "Aari Embroidery",
      text: "Master the traditional hook needle art behind bridal and designer blouses.",
      points: ["Frame setting & Aari needle techniques", "Chain, zardosi, stone, bead & sequin work", "Bridal & designer blouse embroidery"],
    },
  ],
  cta: {
    title: "Not sure where to begin?",
    text: "Call us and we'll suggest the right course for your experience and goals. Batch timings and fees are shared on enquiry.",
    button: "Get Course Details",
  },
};

export const APPROACH = {
  title: ["How You'll", "Learn"],
  sub: "A hands-on method that builds real confidence",
  steps: [
    { num: "01", title: "Fabric & Measurement", text: "Understand fabrics and take accurate body measurements, the foundation of every good fit." },
    { num: "02", title: "Stitching Techniques", text: "Practise machine and hand stitching step by step, under close supervision." },
    { num: "03", title: "Hands-on Practice", text: "Construct real garments yourself instead of only watching demonstrations." },
    { num: "04", title: "Garment Finishing", text: "Learn the finishing details that make a garment look professional and ready to sell." },
    { num: "05", title: "Individual Guidance", text: "Get personal attention and mentoring matched to your pace and your goals." },
  ],
};

export const MISSION_VISION = [
  {
    label: "Our Mission",
    dark: true,
    text: "To empower women through accessible, practical fashion education by developing their tailoring and embroidery skills, encouraging creativity, and creating opportunities for financial independence and entrepreneurship.",
  },
  {
    label: "Our Vision",
    text: "To nurture confident, skilled women who can transform their passion for fashion into professional careers, independent businesses, and sustainable income opportunities.",
  },
];

export const FOUNDER = {
  title: ["Meet the", "Founder"],
  name: "Mrs. Sasikala J",
  role: "Founder & Lead Trainer",
  quote:
    "“Every woman has creativity in her. With the right skill and the right guidance, that creativity can become confidence, an income and a business of her own.”",
  bio: "Mrs. Sasikala J founded J Designs in 2011 and has run it ever since. For about 15 years she has trained women in tailoring, garment construction and Aari embroidery, and she guides each student personally. Many of her students have gone on to take tailoring orders and build income from home.",
};

export const CONTACT_SECTION = {
  title: ["Get in", "Touch"],
  sub: "Visit or call us to enrol",
  intro: "Have a question about courses, batch timings, fees or tailoring services? We're happy to help.",
  services: "Fashion training & tailoring services",
  courseOptions: [
    "Introduction to Tailoring",
    "Basic Tailoring Course",
    "Blouse Designing",
    "Salwar, Maxi & Kurti Stitching",
    "Aari Embroidery",
    "Tailoring Services (stitching orders)",
    "Not sure – need guidance",
  ],
};

export const FOOTER = {
  about: "Empowering women through practical fashion education, tailoring and Aari embroidery since 2011.",
  columns: [
    {
      title: "Courses",
      links: [
        { to: "/courses/introduction-to-tailoring/", label: "Introduction to Tailoring" },
        { to: "/courses/basic-tailoring/", label: "Basic Tailoring" },
        { to: "/courses/blouse-designing/", label: "Blouse Designing" },
        { to: "/courses/salwar-maxi-kurti/", label: "Salwar, Maxi & Kurti" },
        { to: "/courses/aari-embroidery/", label: "Aari Embroidery" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { to: "/about/", label: "About Us" },
        { to: "/courses/#approach", label: "Our Approach" },
        { to: "/about/#founder", label: "Founder" },
        { to: "/contact/", label: "Contact" },
      ],
    },
    {
      title: "Contact",
      links: [
        { href: "tel:+919940585875", label: "+91 99405 85875" },
        { label: "Poonamallee, Chennai" },
        { label: "Tamil Nadu, India" },
      ],
    },
  ],
};

// Main menu. Items with `mega` open a full-width panel on desktop
// and an accordion on phones.
export const NAV = [
  {
    label: "Courses",
    to: "/courses/",
    mega: "courses",
    links: [
      ...COURSES.items.map((c) => ({ to: `/courses/${c.slug}/`, label: c.title })),
      { to: "/courses/#approach", label: "How You'll Learn" },
    ],
  },
  {
    label: "About Us",
    to: "/about/",
    mega: "about",
    links: [
      { to: "/about/", label: "About the Institute" },
      { to: "/about/#mission", label: "Our Mission & Vision" },
      { to: "/about/#founder", label: "Meet the Founder" },
      { to: "/about/#facilities", label: "Facilities" },
    ],
  },
  { label: "Student Work", to: "/#student-work" },
  { label: "Contact", to: "/contact/" },
];
