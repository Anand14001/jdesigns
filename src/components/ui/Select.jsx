import { Check, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Dropdown built to the site's own design, because a native <select> draws its
 * open list with the operating system and no amount of CSS reaches inside it.
 *
 * The trigger keeps the shape of the text inputs beside it, so the three fields
 * still read as one set; only the list is ours. Behaviour follows the ARIA
 * collapsible-listbox pattern: focus stays on the trigger the whole time and
 * `aria-activedescendant` names the current row, which also means the list never
 * has to fight the enquiry popup's focus trap.
 *
 * It opens two ways, because the seven course names need about 300px and a phone
 * has not got that to spare either above or below the field inside the popup:
 *
 *  - phone  -- a sheet up from the bottom of the window, clear of the popup
 *              altogether, with rows big enough to hit with a thumb.
 *  - wider  -- a list anchored to the field, measured against whatever scrolls
 *              around it so it is never cropped.
 *
 * The anchored list stays in normal flow rather than being portalled: Lenis
 * scrolls the page, and anything `position: fixed` would float free of the field
 * it belongs to while the page moves. The sheet is portalled and fixed on
 * purpose -- it belongs to the window, not to the form.
 */

/** Row height, and the breathing space kept between the list and the edge that
 *  crops it. Both are used only to decide which way the anchored list opens. */
const ROW_H = 44;
const GAP = 12;
/** Below this many rows' worth of room, the anchored list opens upwards instead. */
const MIN_ROWS = 4;

export default function Select({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  name,
  invalid = false,
  className = "",
  "aria-describedby": describedBy,
}) {
  const sheet = useMediaQuery("(max-width: 47.99rem)");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  // Which way the anchored list opens and how tall it may be, both measured at
  // the moment it opens -- see measure().
  const [place, setPlace] = useState({ up: false, maxHeight: 272 });

  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const typed = useRef({ text: "", at: 0 });
  const listId = `${useId()}-listbox`;
  const optionId = (i) => `${listId}-${i}`;

  /**
   * Work out where the anchored list fits. What crops it is not the window but
   * whatever scrolls around it, so: find the nearest scrolling ancestor, take
   * the part of it still on screen, and size the list to the room left there.
   */
  const measure = useCallback(() => {
    const trigger = triggerRef.current;
    const rect = trigger?.getBoundingClientRect();
    if (!rect) return;

    let clip = { top: 0, bottom: window.innerHeight };
    for (let el = trigger.parentElement; el && el !== document.body; el = el.parentElement) {
      if (/auto|scroll|overlay/.test(getComputedStyle(el).overflowY)) {
        const box = el.getBoundingClientRect();
        clip = { top: Math.max(clip.top, box.top), bottom: Math.min(clip.bottom, box.bottom) };
        break;
      }
    }

    const below = clip.bottom - rect.bottom;
    const above = rect.top - clip.top;
    // Downwards nearly always. The list scrolls inside itself anyway, so a side
    // that is merely short is still the right side -- opening upwards covers the
    // fields the person has just filled in, and that costs more than a row or
    // two of reach. It flips only when there is not even room for MIN_ROWS.
    const up = below < MIN_ROWS * ROW_H && above > below;
    setPlace({ up, maxHeight: Math.max(160, Math.min(272, (up ? above : below) - GAP * 2)) });
  }, [options.length]);

  const openList = useCallback(() => {
    if (!sheet) measure();
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }, [measure, options, sheet, value]);

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }, []);

  const pick = useCallback(
    (i) => {
      onChange(options[i]);
      close();
    },
    [close, onChange, options]
  );

  // Keep the active row in view when the arrow keys walk past the edge of the list.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  // Nudge the panel behind an anchored list so it is shown whole rather than
  // half cut off at the bottom of the popup.
  useEffect(() => {
    if (open && !sheet) listRef.current?.scrollIntoView({ block: "nearest" });
  }, [open, sheet]);

  // The sheet covers the window, so the page behind it should sit still.
  useEffect(() => {
    if (!open || !sheet) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open, sheet]);

  // A click anywhere else closes an anchored list. `mousedown` rather than
  // `click` so it settles before the next control takes focus.
  useEffect(() => {
    if (!open || sheet) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, sheet]);

  const onKeyDown = (e) => {
    const last = options.length - 1;

    if (e.key === "Escape" && open) {
      // Stopped here so the first Escape closes the list and only a second one
      // closes the dialog around it.
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown": e.preventDefault(); setActive((i) => Math.min(last, i + 1)); break;
      case "ArrowUp": e.preventDefault(); setActive((i) => Math.max(0, i - 1)); break;
      case "Home": e.preventDefault(); setActive(0); break;
      case "End": e.preventDefault(); setActive(last); break;
      case "Enter":
      case " ": e.preventDefault(); pick(active); break;
      case "Tab": setOpen(false); break;
      default:
        // Typeahead: letters typed in quick succession search as one string, so
        // "sa" reaches "Salwar..." rather than stopping at every S in turn.
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const now = Date.now();
          typed.current.text = (now - typed.current.at < 600 ? typed.current.text : "") + e.key.toLowerCase();
          typed.current.at = now;
          const found = options.findIndex((o) => o.toLowerCase().startsWith(typed.current.text));
          if (found >= 0) setActive(found);
        }
    }
  };

  const rows = options.map((o, i) => {
    const selected = o === value;
    return (
      <li
        key={o}
        id={optionId(i)}
        role="option"
        aria-selected={selected}
        data-active={i === active}
        onMouseEnter={() => !sheet && setActive(i)}
        onClick={() => pick(i)}
        className={`flex cursor-pointer items-center justify-between gap-2 rounded-[4px] transition-colors duration-150 ${
          sheet ? "px-4 py-3.5 text-base" : "px-3 py-2.5 text-[0.9375rem]"
        } ${i === active && !sheet ? "bg-mist" : ""} ${selected ? "bg-mist font-medium text-violet" : "text-ink"}`}
      >
        <span>{o}</span>
        {selected && <Check aria-hidden="true" className="size-4 shrink-0 text-violet" />}
      </li>
    );
  });

  const listProps = {
    ref: listRef,
    id: listId,
    role: "listbox",
    "aria-labelledby": id,
    tabIndex: -1,
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {/* Carries the value for anything that reads the form straight from the
          DOM. The listbox below is the control. */}
      <input type="hidden" name={name} value={value ?? ""} />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? close(false) : openList())}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-btn border bg-white px-3.5 py-3 text-left text-base text-ink transition-[border-color,box-shadow] duration-200 focus:border-violet focus:shadow-[0_0_0_3px_rgba(102,45,145,.2)] focus:outline-none ${
          open ? "border-violet shadow-[0_0_0_3px_rgba(102,45,145,.2)]" : invalid ? "border-violet" : "border-line"
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-5 shrink-0 text-muted transition-transform duration-300 ease-soft ${open ? "-rotate-180 text-violet" : ""}`}
        />
      </button>

      {open && !sheet && (
        <ul
          {...listProps}
          style={{ maxHeight: place.maxHeight }}
          className={`select-menu absolute inset-x-0 z-20 m-0 list-none overflow-y-auto overscroll-contain rounded-btn border border-line bg-white p-1.5 shadow-[0_18px_44px_-14px_rgb(31_26_36_/_.35)] ${
            place.up ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
          }`}
        >
          {rows}
        </ul>
      )}

      {open && sheet &&
        createPortal(
          <div className="fixed inset-0 z-[120] flex flex-col justify-end">
            <div className="select-scrim absolute inset-0 bg-shell/70" onMouseDown={() => close()} aria-hidden="true" />
            <div className="select-sheet relative max-h-[72dvh] overflow-hidden rounded-t-card bg-white pb-[max(12px,env(safe-area-inset-bottom))] text-ink shadow-[0_-12px_40px_-12px_rgb(14_11_19_/_.5)]">
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-line" aria-hidden="true" />
              <p className="px-5 pt-3 pb-1 text-sm font-medium text-muted">{label}</p>
              <ul {...listProps} className="m-0 max-h-[calc(72dvh-6rem)] list-none overflow-y-auto overscroll-contain p-2">
                {rows}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
