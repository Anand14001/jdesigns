import { Controller } from "react-hook-form";
import { CONTACT_SECTION } from "../../data/content";
import Select from "../ui/Select";

const input =
  "w-full rounded-btn border bg-white px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] duration-200 focus:border-violet focus:shadow-[0_0_0_3px_rgba(102,45,145,.2)] focus:outline-none";
const labelCls = "mt-4 mb-1.5 block text-sm font-medium";

export const nameRules = {
  validate: (v) => v.trim() !== "" || "Please enter your name.",
};

export const phoneRules = {
  validate: (v) => {
    const digits = v.replace(/\D/g, "");
    return (digits.length >= 10 && digits.length <= 13) || "Please enter a valid phone number.";
  },
};

/** Label + input/select/textarea + its error message, wired up for React Hook Form.
 *
 *  A select is the odd one out: it is our own listbox rather than a native
 *  <select>, so it has no change event for `register` to listen to. It takes
 *  `control` and `name` instead and is wired through RHF's Controller. */
export function Field({ id, label, optional, error, as = "input", options, registration, control, name, ...rest }) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `${input} ${error ? "border-violet" : "border-line"} ${as === "textarea" ? "resize-y" : ""}`,
    ...registration,
    ...rest,
  };

  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label} {optional && <span className="font-light text-muted">(optional)</span>}
      </label>
      {as === "select" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              id={id}
              label={label}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={options}
              invalid={!!error}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
      ) : as === "textarea" ? (
        <textarea rows={3} {...shared} />
      ) : (
        <input {...shared} />
      )}
      {error && (
        <p id={errorId} role="alert" className="m-0 mt-1.5 text-sm text-[#c62d1f]">
          {error.message}
        </p>
      )}
    </div>
  );
}

export const COURSE_OPTIONS = CONTACT_SECTION.courseOptions;
