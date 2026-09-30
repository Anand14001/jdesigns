import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "../../site/SmoothScroll";

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,iframe,[tabindex]:not([tabindex="-1"])';

/**
 * Accessible popup: closes on Escape or backdrop click, keeps Tab focus inside,
 * pauses page scrolling, and returns focus to whatever opened it.
 */
export default function Modal({ open, onClose, label, className = "", dark = false, children }) {
  const panelRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const panel = panelRef.current;
    (panel.querySelector("[data-autofocus]") || panel.querySelector(FOCUSABLE) || panel).focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      lenis?.start();
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, onClose, lenis]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 md:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        data-lenis-prevent
        className={`modal-panel relative max-h-[calc(100dvh-1.5rem)] w-full overflow-y-auto overscroll-contain rounded-card outline-none ${dark ? "bg-black text-white" : "bg-white text-ink"} ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-3 right-3 z-10 grid size-10 cursor-pointer place-items-center rounded-full border-0 ${
            dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-band text-black hover:bg-line"
          }`}
        >
          <X className="size-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
