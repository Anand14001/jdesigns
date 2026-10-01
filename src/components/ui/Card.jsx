import { Link } from "react-router";
import { ArrowLong } from "../icons/Icons";
import Img from "./Img";

/** The rounded card used across the site: a photo on top, a plum body underneath. */
export function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`pcard relative flex h-full flex-col overflow-hidden rounded-card bg-plum text-white ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

const RATIOS = { wide: "aspect-[1/0.72]", square: "aspect-square", tall: "aspect-[4/5]" };

/** Photo area of a card; zooms in gently when the card is hovered. */
export function CardMedia({ image, alt = "", ratio = "wide", className = "", imgClassName = "", children }) {
  return (
    <div className={`pcard-media relative overflow-hidden bg-band ${RATIOS[ratio]} ${className}`}>
      {image && <Img src={image} alt={alt} className={imgClassName} />}
      {children}
    </div>
  );
}

export function CardBody({ className = "", children }) {
  return <div className={`flex flex-1 flex-col p-6 pb-7 md:px-8 md:pt-[30px] md:pb-[34px] ${className}`}>{children}</div>;
}

/** Long accent arrow at the bottom of a card: a page link (`to`) or a button (`onClick`). */
export function CardArrow({ to, onClick, label }) {
  const cls = "pcard-arrow mt-auto inline-block w-[66px] cursor-pointer border-0 bg-transparent p-0 pt-7 text-left text-violet-tint";
  const icon = <ArrowLong className="h-[18px] w-[66px] transition-transform duration-[350ms] ease-soft" />;
  if (to) return <Link to={to} aria-label={label} className={cls}>{icon}</Link>;
  return <button type="button" onClick={onClick} aria-label={label} className={cls}>{icon}</button>;
}
