import { SOCIAL } from "../../data/media";
import { SOCIAL_ICONS, SOCIAL_LABELS } from "../icons/Icons";

/** The order they appear in, whatever order they are written in the data. */
const ORDER = ["instagram", "facebook", "youtube", "linkedin", "x"];

/** Only the accounts that actually have a link; the rest stay off the page. */
export const activeSocials = () =>
  ORDER.filter((name) => SOCIAL[name]).map((name) => ({ name, url: SOCIAL[name] }));

const SIZES = {
  md: { ring: "size-10", icon: "size-5" },
  lg: { ring: "size-12", icon: "size-[22px]" },
};

/**
 * The row of round social buttons, shared by the footer and the contact page so
 * there is one place to style them and one place (media.js) to set the links.
 * Renders nothing at all while no account has a link.
 */
export default function SocialLinks({ size = "md", label = "Follow us on social media", className = "" }) {
  const links = activeSocials();
  if (!links.length) return null;
  const { ring, icon } = SIZES[size];

  return (
    <ul aria-label={label} className={`m-0 flex list-none items-center gap-3 p-0 ${className}`}>
      {links.map(({ name, url }) => {
        const Icon = SOCIAL_ICONS[name];
        return (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`J Designs on ${SOCIAL_LABELS[name]} (opens in a new tab)`}
              className={`grid ${ring} place-items-center rounded-full border border-white/50 text-white transition-colors duration-300 hover:border-violet-tint hover:bg-violet focus-visible:border-violet-tint focus-visible:bg-violet`}
            >
              <Icon className={icon} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
