/**
 * Marks an element to fade up (or slide in from the left) when it scrolls
 * into view. The animation itself runs in useScrollAnimations (GSAP ScrollTrigger).
 */
export default function Reveal({ as: Tag = "div", left = false, children, ...rest }) {
  return (
    <Tag data-reveal={left ? "left" : "up"} {...rest}>
      {children}
    </Tag>
  );
}
