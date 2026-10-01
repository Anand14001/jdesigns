// SVG icons ported from the original site, plus social and play icons.
// Everyday interface icons come from lucide-react.

export const ArrowLong = (props) => (
  <svg viewBox="0 0 66 18" aria-hidden="true" {...props}>
    <path d="M0 9h63M55 1.5 63 9l-8 7.5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const CirclePrev = (props) => (
  <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
    <circle cx="20" cy="20" r="18.5" fill="none" stroke="#662D91" />
    <path d="M10 20h46M18 12l-8 8 8 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const CircleNext = (props) => (
  <svg viewBox="0 0 60 40" aria-hidden="true" {...props}>
    <circle cx="40" cy="20" r="18.5" fill="none" stroke="#662D91" />
    <path d="M4 20h46M42 12l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.5L3 29l6.7-1.7c1.9 1 4.1 1.6 6.3 1.6 7.2 0 13-5.8 13-13S23.2 3 16 3zm0 23.7c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1 1.1-3.9-.3-.4C5.8 20 5.3 18 5.3 16 5.3 10.1 10.1 5.3 16 5.3S26.7 10.1 26.7 16 21.9 26.7 16 26.7zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
  </svg>
);

export const ThreadIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="7" y="3" width="10" height="3" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <rect x="7" y="18" width="10" height="3" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8.5 6v12M15.5 6v12M8.5 9l7 2M8.5 13l7 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

/* ---------- "Who Can Join" line icons ---------- */
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 };

export const AUDIENCE_ICONS = {
  sprout: (
    <>
      <path d="M24 44V22M24 22c0-8 6-13 15-13 0 9-6 13-15 13ZM24 28c0-6-5-10-13-10 0 7 5 10 13 10Z" {...stroke} strokeLinejoin="round" />
      <path d="M14 44h20" {...stroke} strokeLinecap="round" />
    </>
  ),
  home: (
    <>
      <path d="M6 22 24 7l18 15M11 18v24h26V18" {...stroke} strokeLinejoin="round" />
      <path d="M20 42V30h8v12" {...stroke} />
    </>
  ),
  scissors: (
    <>
      <circle cx="13" cy="12" r="6" {...stroke} />
      <circle cx="13" cy="36" r="6" {...stroke} />
      <path d="M18 15 42 38M18 33 42 10" {...stroke} strokeLinecap="round" />
    </>
  ),
  briefcase: (
    <>
      <rect x="5" y="14" width="38" height="27" rx="3" {...stroke} />
      <path d="M17 14V9h14v5M5 25h38M21 25v4h6v-4" {...stroke} />
    </>
  ),
};

/* ---------- Social icons (Lucide no longer ships brand logos) ---------- */
export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
  </svg>
);

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21Z" fill="currentColor" />
    </svg>
  ),
  youtube: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3Z" fill="currentColor" />
    </svg>
  ),
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.9 20H3.6V9.3h3.3ZM5.2 7.8a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM20.4 20h-3.3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10.1V9.3h3.2v1.5c.4-.8 1.5-1.7 3.1-1.7 3.3 0 4 2.2 4 5Z" fill="currentColor" />
    </svg>
  ),
  x: (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9Zm-1.1 16.2h1.7L7.3 4.7H5.5Z" fill="currentColor" />
    </svg>
  ),
};

export const SOCIAL_LABELS = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", linkedin: "LinkedIn", x: "X" };

export const PlayIcon = (props) => (
  <svg viewBox="0 0 80 80" aria-hidden="true" {...props}>
    <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="4" />
    <path d="M32 25v30l24-15Z" fill="currentColor" />
  </svg>
);
