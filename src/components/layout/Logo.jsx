import { Link } from "react-router";
import { asset } from "../../lib/paths";

/** The institute's logo (public/images/j-designs-logo.webp, a web-sized copy of j_designs_logo.png). */
export default function Logo({ ariaLabel = "J Designs & Fashion Institute home", className = "" }) {
  return (
    <Link to="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label={ariaLabel}>
      <img
        src={asset("images/j-designs-logo.webp")}
        alt="J Designs Fashion Institute"
        width="496"
        height="160"
        className="block h-10 w-auto md:h-12"
      />
    </Link>
  );
}
