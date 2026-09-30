import { useRef, useState } from "react";
import { CONTACT, CONTACT_SECTION } from "../../data/content";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

const EMPTY = { name: "", phone: "", course: CONTACT_SECTION.courseOptions[0], message: "" };

const field =
  "w-full rounded-btn border bg-white px-3.5 py-3 text-base text-ink transition-[border-color,box-shadow] duration-200 focus:border-black focus:shadow-[0_0_0_3px_rgba(239,70,55,.2)] focus:outline-none";
const label = "mt-4 mb-1.5 block text-sm font-medium";

/** Enquiry form: validates name + phone, then opens WhatsApp with the details filled in. */
export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [error, setError] = useState({ field: null, message: "" });
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const update = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const name = values.name.trim();
    const phone = values.phone.trim();
    const digits = phone.replace(/\D/g, "");

    if (!name) {
      setError({ field: "name", message: "Please enter your name." });
      nameRef.current.focus();
      return;
    }
    if (digits.length < 10 || digits.length > 13) {
      setError({ field: "phone", message: "Please enter a valid phone number." });
      phoneRef.current.focus();
      return;
    }
    setError({ field: null, message: "" });

    const lines = [
      "Hello J Designs & Fashion Institute,",
      "",
      "Name: " + name,
      "Phone: " + phone,
      "Interested in: " + values.course,
    ];
    const msg = values.message.trim();
    if (msg) lines.push("Message: " + msg);

    const url = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setValues(EMPTY);
  };

  const border = (name) => (error.field === name ? "border-red" : "border-line");

  return (
    <Reveal as="form" id="enquiryForm" noValidate onSubmit={onSubmit} className="rounded-card bg-white px-5 py-7 text-ink md:p-10">
      <h3 className="mb-1 text-2xl">Send an Enquiry</h3>
      <p className="mb-5 text-[0.9375rem] text-muted">Your enquiry opens in WhatsApp so we can reply to you quickly.</p>

      <label htmlFor="name" className={label}>Your Name</label>
      <input ref={nameRef} type="text" id="name" name="name" placeholder="Enter your name" required
        value={values.name} onChange={update} className={`${field} ${border("name")}`} />

      <label htmlFor="phone" className={label}>Phone Number</label>
      <input ref={phoneRef} type="tel" id="phone" name="phone" placeholder="10-digit mobile number" required pattern="[0-9+\s-]{10,15}"
        value={values.phone} onChange={update} className={`${field} ${border("phone")}`} />

      <label htmlFor="course" className={label}>Interested Course</label>
      <select id="course" name="course" value={values.course} onChange={update} className={`${field} border-line`}>
        {CONTACT_SECTION.courseOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <label htmlFor="message" className={label}>
        Message <span className="font-light text-muted">(optional)</span>
      </label>
      <textarea id="message" name="message" rows={3} placeholder="Preferred timings, questions…"
        value={values.message} onChange={update} className={`${field} resize-y border-line`} />

      <p role="alert" className="mt-3 mb-1.5 min-h-[1.2em] text-sm text-[#c62d1f]">{error.message}</p>
      <Button as="button" type="submit" className="w-full">Send via WhatsApp</Button>
    </Reveal>
  );
}
