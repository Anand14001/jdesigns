import Contact from "../components/sections/Contact";
import PageHero from "../components/sections/PageHero";
import { CONTACT_SECTION } from "../data/content";
import { PAGE_BANNERS } from "../data/media";

export default function ContactPage() {
  return (
    <>
      <PageHero image={PAGE_BANNERS.contact} current="Contact" title={CONTACT_SECTION.title} sub={CONTACT_SECTION.sub} />
      <Contact showTitle={false} />
    </>
  );
}
