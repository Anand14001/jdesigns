import { useState } from "react";
import { NOTICE } from "../../data/content";

/** Red announcement strip under the hero, dismissible. */
export default function Notice() {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="relative bg-red text-center text-white">
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label="Dismiss"
        className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border-0 bg-transparent text-base font-extrabold text-white md:left-[30px]"
      >
        X
      </button>
      <p className="m-0 px-11 py-2 text-[0.8125rem] font-medium md:px-[60px] md:py-[7px] md:text-[0.9375rem]">{NOTICE}</p>
    </div>
  );
}
