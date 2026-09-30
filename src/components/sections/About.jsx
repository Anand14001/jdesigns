import { ABOUT } from "../../data/content";
import { DressForm } from "../icons/Illustrations";
import { Card, CardBody, CardMedia } from "../ui/Card";
import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-[var(--section)]">
      <div className="wrap">
        <SectionTitle bold={ABOUT.title[0]} light={ABOUT.title[1]} sub={ABOUT.sub} />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:gap-[60px]">
          <Reveal className="[&_p]:mb-4 [&_p]:leading-[1.7]">
            <p>
              <strong>J Designs &amp; Fashion Institute</strong> is a fashion training and tailoring institute in
              Poonamallee, Chennai. It was founded and is led by <strong>Mrs. Sasikala J</strong>. We focus on
              empowering women through practical fashion education, professional tailoring, garment construction
              and Aari embroidery.
            </p>
            <p>
              In around 15 years we have trained more than 200 women. Our students include complete beginners,
              aspiring designers, homemakers and women who want to start a home-based business. Beyond teaching
              technique, we help each student turn her creativity into practical skills, an independent income and
              her own business.
            </p>
            <ul className="mt-7 list-none border-t border-black p-0">
              {ABOUT.checklist.map((item) => (
                <li
                  key={item}
                  className="relative border-b border-line py-3.5 pl-[30px] before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-4 before:bg-red before:content-['']"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal aria-hidden="true" className="max-w-[26.25rem] lg:max-w-none">
            <Card>
              <CardMedia square>
                <DressForm className="h-auto w-[62%]" />
              </CardMedia>
              <CardBody className="flex-row! items-baseline gap-3.5 px-8! py-6!">
                <span className="text-sm text-white/70">Est.</span>
                <strong className="text-2xl font-medium">2011</strong>
              </CardBody>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
