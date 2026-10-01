import { Link } from "react-router";
import { asset } from "../../lib/paths";

/** The institute's logo (public/images/j-designs-logo.png, cropped to the artwork and web-sized from j_designs_logo.png). */
export default function Logo({ ariaLabel = "J Designs & Fashion Institute home", className = "" }) {
  return (
    <Link to="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label={ariaLabel}>
      <img
        src={asset("images/j-designs-logo.png")}
        alt="J Designs Fashion Institute"
        width="497"
        height="192"
        className="block h-12 w-auto lg:h-16"
      />
    </Link>
  );
}
