import { STATS } from "../../data/content";
import Reveal from "../ui/Reveal";

/** Numbers strip: counters roll up (GSAP) when scrolled into view; 6px rule underneath. */
export default function Stats() {
  return (
    <section className="pb-2.5">
      <div className="wrap">
        <div className="grid grid-cols-1 border-b-[6px] border-black pb-2.5 md:grid-cols-4 md:pb-[46px]">
          {STATS.map(({ count, suffix, text, label }) => (
            <Reveal
              key={label}
              className="flex flex-row items-center justify-start gap-6 border-b border-black py-[26px] last:border-b-0
                md:min-h-[116px] md:flex-col md:items-start md:justify-center md:gap-0 md:border-b-0 md:border-l md:px-[30px] md:py-0
                md:first:border-l-0 md:first:pl-0 xl:px-[60px]"
            >
              <strong className="min-w-[120px] text-[1.875rem] leading-[1.1] font-extrabold whitespace-nowrap text-ink md:min-w-0 md:text-[2.75rem]">
                {text ?? <span data-count={count}>{count}</span>}
                {suffix && (
                  <sup className="ml-1.5 align-[10px] text-lg leading-[0] font-light md:align-[14px] md:text-[1.75rem]">{suffix}</sup>
                )}
              </strong>
              <span className="m-0 text-lg text-ink md:mt-2.5 md:text-base">{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
