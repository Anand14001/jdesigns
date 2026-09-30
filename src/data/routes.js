// Every address on the site with its browser-tab title and search description.
// Used by the app (page titles) and by the build (one real HTML file per address).
import { ABOUT, CONTACT_SECTION, COURSES, FOOTER } from "./content.js";

const NAME = "J Designs & Fashion Institute";

export const ROUTES = [
  {
    path: "/",
    title: "J Designs & Fashion Institute | Tailoring & Aari Embroidery Classes in Poonamallee, Chennai",
    description:
      "J Designs & Fashion Institute, Poonamallee, Chennai. Practical tailoring, blouse designing, salwar, maxi & kurti stitching and Aari embroidery training for women since 2011. 200+ women trained.",
  },
  {
    path: "/courses/",
    title: `Courses | ${NAME}`,
    description: `${COURSES.lead}. ${COURSES.text}`,
  },
  ...COURSES.items.map((c) => ({
    path: `/courses/${c.slug}/`,
    title: `${c.title} | ${NAME}`,
    description: c.text,
  })),
  {
    path: "/about/",
    title: `About Us | ${NAME}`,
    description: `${ABOUT.sub}. ${FOOTER.about}`,
  },
  {
    path: "/contact/",
    title: `Contact | ${NAME}`,
    description: CONTACT_SECTION.intro,
  },
];

export const routeFor = (pathname) => {
  const path = pathname.endsWith("/") ? pathname : pathname + "/";
  return ROUTES.find((r) => r.path === path) ?? ROUTES[0];
};
