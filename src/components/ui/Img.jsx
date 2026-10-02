import { asset } from "../../lib/paths";

/** Photo that fills its box (object-cover). Lazy-loaded unless `eager`.
 *
 *  `mobileSrc` is an upright version of the same scene for phones. A wide photo
 *  has to be cropped so hard on a narrow screen that little of it survives, so
 *  below 768px the browser is offered the tall one instead and picks it before
 *  it starts downloading -- only one of the two is ever fetched. */
export default function Img({ src, mobileSrc, alt = "", eager = false, className = "", ...rest }) {
  const img = (
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

  if (!mobileSrc) return img;
  return (
    <picture className="contents">
      <source media="(max-width: 47.99rem)" srcSet={asset(mobileSrc)} />
      {img}
    </picture>
  );
}
