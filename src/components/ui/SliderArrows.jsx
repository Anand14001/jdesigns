import { useRef } from "react";
import { CircleNext, CirclePrev } from "../icons/Icons";

const btn =
  "h-10 w-[60px] cursor-pointer border-0 bg-transparent p-0 transition-opacity [&.is-disabled]:cursor-default [&.is-disabled]:opacity-35 [&.is-locked]:hidden";

/** Refs for a pair of arrows; pass the same object to <SliderArrows> and <Slider arrows>. */
export function useArrows() {
  const prev = useRef(null);
  const next = useRef(null);
  const pair = useRef({ prev, next });
  return pair.current;
}

/** Pearl's red-circle previous / next arrows. */
export default function SliderArrows({ arrows, dark = false, className = "" }) {
  const color = dark ? "text-white" : "text-black";
  return (
    <div className={`flex shrink-0 gap-5 ${className}`}>
      <button ref={arrows.prev} type="button" aria-label="Previous" className={`${btn} ${color}`}>
        <CirclePrev className="h-10 w-[60px]" />
      </button>
      <button ref={arrows.next} type="button" aria-label="Next" className={`${btn} ${color}`}>
        <CircleNext className="h-10 w-[60px]" />
      </button>
    </div>
  );
}
