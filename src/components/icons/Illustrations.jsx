// Decorative illustrations ported unchanged from the original site.

const PETAL_ANGLES = [45, 90, 135, 180, 225, 270, 315];
const SEQUINS = [[0, -118], [83, -83], [118, 0], [83, 83], [0, 118], [-83, 83], [-118, 0], [-83, -83]];
const CENTRE_DOTS = [[0, -7], [6.6, -2.2], [4.1, 5.7], [-4.1, 5.7], [-6.6, -2.2]];

/** Embroidery hoop with Aari floral motif (hero, slide 1). */
export function Hoop({ className }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <circle cx="200" cy="200" r="178" fill="#ffffff" />
      <circle cx="200" cy="200" r="168" fill="#d9d9d9" />
      <circle cx="200" cy="200" r="158" fill="#141414" />
      <rect x="186" y="10" width="28" height="30" rx="4" fill="#ffffff" />
      <circle cx="200" cy="18" r="6" fill="#707070" />
      <g transform="translate(200 205)">
        <g fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7">
          <circle r="104" />
        </g>
        <g id="petals">
          <path d="M0 -20 C 22 -48, 22 -78, 0 -96 C -22 -78, -22 -48, 0 -20Z" fill="#ef4637" />
          <path d="M0 -30 C 12 -50, 12 -70, 0 -82 C -12 -70, -12 -50, 0 -30Z" fill="#ffffff" />
        </g>
        {PETAL_ANGLES.map((a) => (
          <use key={a} href="#petals" transform={`rotate(${a})`} />
        ))}
        <circle r="24" fill="#ffffff" />
        <circle r="14" fill="#ef4637" />
        <g fill="#ffffff">
          {CENTRE_DOTS.map(([cx, cy]) => (
            <circle key={`${cx},${cy}`} r="3" cx={cx} cy={cy} />
          ))}
        </g>
        <g fill="#ffffff">
          {SEQUINS.map(([cx, cy]) => (
            <circle key={`${cx},${cy}`} r="4" cx={cx} cy={cy} />
          ))}
        </g>
      </g>
      <path d="M300 330 C 350 300, 380 250, 360 200" fill="none" stroke="#ef4637" strokeWidth="2.5" />
      <g transform="rotate(-35 330 320)">
        <rect x="262" y="317" width="120" height="5" rx="2.5" fill="#b5b5b5" />
        <ellipse cx="372" cy="319.5" rx="6" ry="2" fill="#141414" />
      </g>
    </svg>
  );
}

/** Dress form (About card). */
export function DressForm({ className }) {
  return (
    <svg viewBox="0 0 300 360" className={className} aria-hidden="true">
      <path d="M150 20 v18" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
      <path d="M95 50 C 120 40, 180 40, 205 50 C 225 70, 222 110, 208 140 C 198 165, 200 185, 214 215 C 230 250, 228 285, 210 305 L 90 305 C 72 285, 70 250, 86 215 C 100 185, 102 165, 92 140 C 78 110, 75 70, 95 50Z" fill="#000000" />
      <path d="M95 50 C 120 40, 180 40, 205 50 C 212 58, 216 68, 217 80 C 180 70, 120 70, 83 80 C 84 68, 88 58, 95 50Z" fill="#2b2b2b" />
      <path d="M150 55 V 305" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M96 140 C 130 150, 170 150, 204 140" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" fill="none" />
      <g fill="#ef4637">
        <circle cx="150" cy="95" r="4" />
        <circle cx="150" cy="120" r="4" />
        <circle cx="150" cy="170" r="4" />
      </g>
      <rect x="143" y="305" width="14" height="30" fill="#000000" />
      <path d="M100 345 h100" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/** Dotted triangle graphic (bottom of the contact section). */
export function DottedTriangle({ className }) {
  return (
    <svg viewBox="0 0 270 180" className={className} aria-hidden="true">
      <defs>
        <pattern id="dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill="#ffffff" />
        </pattern>
      </defs>
      <path d="M0 45h270L180 135Z" fill="url(#dots)" />
      <path d="M180 135 270 45v90Z" fill="#ffffff" />
      <path d="M40 40l20-26M52 40l18-22M64 40l12-14" stroke="#ffffff" strokeWidth="5" />
      <path d="M140 180l40-45M152 180l40-45" stroke="#ffffff" strokeWidth="1" />
    </svg>
  );
}
