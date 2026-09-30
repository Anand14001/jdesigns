import Reveal from "./Reveal";

/** Pearl-style heading: bold words followed by light words, with an optional sub line. */
export default function SectionTitle({ bold, light, sub, as = "h2", dark = false, className = "" }) {
  return (
    <div className={className}>
      <Reveal as={as} left className={`mb-2.5 text-2xl leading-tight font-light md:text-[1.75rem] ${dark ? "text-white" : "text-ink"}`}>
        <b className="font-extrabold">{bold}</b> {light}
      </Reveal>
      {sub && (
        <Reveal as="p" className={`m-0 max-w-3xl ${dark ? "text-white/70" : "text-muted"}`}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}
