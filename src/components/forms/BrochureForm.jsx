import { useState } from "react";
import { useForm } from "react-hook-form";
import { CONTACT } from "../../data/content";
import { BROCHURE_URL } from "../../data/media";
import { asset, whatsappLink } from "../../lib/paths";
import Button from "../ui/Button";
import { COURSE_OPTIONS, Field, nameRules, phoneRules } from "./fields";

/**
 * Brochure form (Pearl's "Download Brochure" popup).
 * With a brochure PDF set in media.js it downloads the file;
 * until then it asks for the brochure on WhatsApp.
 */
export default function BrochureForm({ initialCourse }) {
  const defaults = {
    name: "",
    phone: "",
    course: COURSE_OPTIONS.includes(initialCourse) ? initialCourse : COURSE_OPTIONS[0],
  };
  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: defaults });
  const [sent, setSent] = useState(false);

  const onSubmit = (v) => {
    if (BROCHURE_URL) {
      const a = document.createElement("a");
      a.href = asset(BROCHURE_URL);
      a.download = "";
      document.body.append(a);
      a.click();
      a.remove();
    } else {
      window.open(
        whatsappLink(CONTACT.whatsappNumber, [
          "Hello J Designs & Fashion Institute,",
          "",
          "Please send me the course brochure.",
          "Name: " + v.name.trim(),
          "Phone: " + v.phone.trim(),
          "Interested in: " + v.course,
        ]),
        "_blank",
        "noopener"
      );
    }
    reset(defaults);
    setSent(true);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="px-5 pt-14 pb-7 md:px-10 md:pb-10">
      <h2 className="mb-1 text-2xl font-light">
        <b className="font-extrabold">Download</b> Brochure
      </h2>
      <p className="mb-2 text-[0.9375rem] text-muted">
        {BROCHURE_URL
          ? "Share your details and the brochure will download straight away."
          : "Share your details and we'll send the brochure to you on WhatsApp."}
      </p>

      <Field id="brochure-name" label="Your Name" placeholder="Enter your name" autoComplete="name" data-autofocus
        error={errors.name} registration={register("name", nameRules)} />
      <Field id="brochure-phone" label="Phone Number" type="tel" inputMode="tel" placeholder="10-digit mobile number" autoComplete="tel"
        error={errors.phone} registration={register("phone", phoneRules)} />
      <Field id="brochure-course" label="Interested Course" as="select" options={COURSE_OPTIONS} name="course" control={control} />

      <Button type="submit" className="mt-6 w-full" onClick={() => setSent(false)}>
        {BROCHURE_URL ? "Download Brochure" : "Get Brochure on WhatsApp"}
      </Button>
      <p role="status" className="m-0 mt-3 min-h-[1.25em] text-sm text-muted">
        {sent && (BROCHURE_URL ? "Your download has started." : "WhatsApp has opened with your request. Just press send.")}
      </p>
    </form>
  );
}
