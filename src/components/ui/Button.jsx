import { Link } from "react-router";

const VARIANTS = {
  violet: "bg-violet border-violet text-white hover:bg-violet-deep hover:border-violet-deep",
  outlineLight: "border-white/80 text-white hover:bg-white hover:text-shell",
  outlineDark: "border-ink text-ink hover:bg-ink hover:text-white",
  white: "bg-white border-white text-ink hover:bg-violet-deep hover:border-violet-deep hover:text-white",
};

const SIZES = {
  md: "rounded-btn px-[22px] py-3 text-sm",
  sm: "rounded-btn px-[18px] py-[9px] text-[0.8125rem]",
  pill: "rounded-full px-4 py-[9px] text-[0.8125rem]",
};

/**
 * One button style for everything:
 *  - `to="/courses/"`  page link (React Router)
 *  - `href="tel:..."`  normal link (http links open in a new tab)
 *  - neither           <button> (pass onClick, or type="submit")
 */
export default function Button({ to, href, variant = "violet", size = "md", className = "", children, ...rest }) {
  const hasDisplay = /(?:^|\s)(?:hidden|block|inline-block|flex|inline-flex|grid)(?:!|\b)/.test(className);
  const baseDisplay = hasDisplay ? "" : "inline-flex ";
  const classes = `${baseDisplay}cursor-pointer items-center justify-center gap-2 border font-extrabold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet disabled:cursor-wait disabled:opacity-60 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>;
  if (href) {
    const external = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return <button type="button" className={classes} {...rest}>{children}</button>;
}
