export default function Logo({ ariaLabel }) {
  return (
    <a href="#home" className="inline-flex items-center gap-2.5 text-white" aria-label={ariaLabel}>
      <span className="grid size-8 place-items-center rounded-full bg-red text-[1.1rem] leading-none font-extrabold text-white md:size-9 md:text-xl">
        J
      </span>
      <span className="flex flex-col leading-[1.05]">
        <strong className="text-lg font-medium tracking-[-0.01em] md:text-xl">J Designs</strong>
        <small className="text-[0.5625rem] font-extrabold tracking-[0.14em] uppercase">&amp; Fashion Institute</small>
      </span>
    </a>
  );
}
