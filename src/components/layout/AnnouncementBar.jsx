import { X } from "lucide-react";
import { useState } from "react";
import { NOTICE } from "../../data/content";
import { useSite } from "../../site/SiteContext";

const KEY = "jd-notice-closed";
const wasClosed = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

/** Red announcement strip at the very top. Dismissible for the rest of the visit. */
export default function AnnouncementBar() {
  const { openEnquiry } = useSite();
  const [hidden, setHidden] = useState(wasClosed);
  if (hidden) return null;

  const close = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode: just hide for now */
    }
  };

  return (
    <div className="relative bg-red text-white">
      <p className="m-0 px-11 py-2 text-center text-[0.8125rem] font-medium md:px-[60px] md:py-[7px] md:text-[0.9375rem]">
        {NOTICE}{" "}
        <button type="button" onClick={() => openEnquiry()} className="cursor-pointer border-0 bg-transparent p-0 font-extrabold text-white underline underline-offset-2">
          Enquire Now
        </button>
      </p>
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 cursor-pointer place-items-center border-0 bg-transparent text-white md:right-[30px]"
      >
        <X className="size-4" strokeWidth={3} />
      </button>
    </div>
  );
}
