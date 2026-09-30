import { useInView } from "../../hooks/useInView";

/**
 * Fades an element up (or slides it in from the left) when it scrolls into view.
 * Renders any tag via `as`, so it can wrap headings, list items, articles, etc.
 */
export default function Reveal({ as: Tag = "div", left = false, className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  const base = left ? "reveal-left" : "reveal";
  return (
    <Tag ref={ref} className={`${base} ${inView ? "is-visible" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
