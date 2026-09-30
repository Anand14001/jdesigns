const VARIANTS = {
  red: "bg-red border-red text-white hover:bg-red-dark hover:border-red-dark",
  outlineLight: "border-white/80 text-white hover:bg-white hover:text-black",
};

const SIZES = {
  md: "rounded-btn px-[22px] py-3 text-sm",
  sm: "rounded-btn px-[18px] py-[9px] text-[0.8125rem]", // header "Enquire Now"
  pill: "rounded-full px-4 py-[9px] text-[0.8125rem]", // mobile quick bar
};

/**
 * Link styled as a button. External links (http) open in a new tab.
 * Pass `as="button"` for a form submit button.
 */
export default function Button({ as: Tag = "a", variant = "red", size = "md", className = "", href, children, ...rest }) {
  const external = href?.startsWith("http");
  return (
    <Tag
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`inline-flex cursor-pointer items-center justify-center border font-extrabold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-red ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
