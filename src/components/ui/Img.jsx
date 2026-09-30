import { asset } from "../../lib/paths";

/** Photo that fills its box (object-cover). Lazy-loaded unless `eager`. */
export default function Img({ src, alt = "", eager = false, className = "", ...rest }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" } : {})}
      className={`block size-full object-cover ${className}`}
      {...rest}
    />
  );
}
