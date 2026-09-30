import { ArrowLong } from "../icons/Icons";

/**
 * The black rounded card used across the page:
 * a media panel on top and a black body underneath.
 */
export function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`pcard relative flex flex-col overflow-hidden rounded-card text-white ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

const MEDIA_TONES = {
  light: "bg-band text-black",
  grey: "bg-media",
};

export function CardMedia({ tone = "light", square = false, className = "", children }) {
  return (
    <div
      aria-hidden="true"
      className={`relative grid place-items-center ${square ? "aspect-square" : "aspect-[1/0.72]"} ${MEDIA_TONES[tone]} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={`flex flex-1 flex-col bg-black p-6 pb-7 md:px-8 md:pt-[30px] md:pb-[34px] ${className}`}>{children}</div>;
}

/** Red long arrow link at the bottom of a card. */
export function CardArrow({ href, label }) {
  return (
    <a href={href} aria-label={label} className="pcard-arrow mt-auto inline-block w-[66px] pt-7 text-red">
      <ArrowLong className="h-[18px] w-[66px] transition-transform duration-[350ms] ease-soft" />
    </a>
  );
}
