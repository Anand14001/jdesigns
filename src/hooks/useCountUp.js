import { useEffect, useState } from "react";
import { useReducedMotion } from "./useMediaQuery";

/** Counts from 0 to target (ease-out, 1.4s) once `start` becomes true. */
export function useCountUp(target, start, duration = 1400) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!start || reduceMotion || target == null) return;
    let frame;
    let t0 = null;
    const tick = (ts) => {
      if (t0 === null) t0 = ts;
      const progress = Math.min((ts - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration, reduceMotion]);

  return value;
}
