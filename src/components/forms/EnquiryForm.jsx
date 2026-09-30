import { useState } from "react";
import { useForm } from "react-hook-form";
import { CONTACT } from "../../data/content";
import { whatsappLink } from "../../lib/paths";
import Button from "../ui/Button";
import { COURSE_OPTIONS, Field, nameRules, phoneRules } from "./fields";

/**
 * Enquiry form (React Hook Form): checks name + phone, then opens WhatsApp
 * with the details filled in. Used on the Contact page, course pages and in the popup.
 */
export default function EnquiryForm({ idPrefix = "", initialCourse, title = "Send an Enquiry", className = "" }) {
  const defaults = {
    name: "",
    phone: "",
    course: COURSE_OPTIONS.includes(initialCourse) ? initialCourse : COURSE_OPTIONS[0],
    message: "",
  };
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: defaults });
  const [sent, setSent] = useState(false);

  const onSubmit = (v) => {
    const url = whatsappLink(CONTACT.whatsappNumber, [
      "Hello J Designs & Fashion Institute,",
      "",
      "Name: " + v.name.trim(),
      "Phone: " + v.phone.trim(),
      "Interested in: " + v.course,
      v.message.trim() ? "Message: " + v.message.trim() : null,
    ]);
    window.open(url, "_blank", "noopener");
    reset(defaults);
    setSent(true);
  };

  const id = (name) => `${idPrefix}${name}`;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={`rounded-card bg-white px-5 py-7 text-ink md:p-10 ${className}`}>
      <h3 className="mb-1 text-2xl">{title}</h3>
      <p className="mb-2 text-[0.9375rem] text-muted">Your enquiry opens in WhatsApp so we can reply to you quickly.</p>

      <Field id={id("name")} label="Your Name" placeholder="Enter your name" autoComplete="name" data-autofocus
        error={errors.name} registration={register("name", nameRules)} />
      <Field id={id("phone")} label="Phone Number" type="tel" inputMode="tel" placeholder="10-digit mobile number" autoComplete="tel"
        error={errors.phone} registration={register("phone", phoneRules)} />
      <Field id={id("course")} label="Interested Course" as="select" options={COURSE_OPTIONS} registration={register("course")} />
      <Field id={id("message")} label="Message" optional as="textarea" placeholder="Preferred timings, questions…"
        registration={register("message")} />

      <Button type="submit" className="mt-6 w-full" onClick={() => setSent(false)}>Send via WhatsApp</Button>
      <p role="status" className="m-0 mt-3 min-h-[1.25em] text-sm text-muted">
        {sent && "WhatsApp has opened with your details. Just press send."}
      </p>
    </form>
  );
}
