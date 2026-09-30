import { useSite } from "../../site/SiteContext";
import BrochureForm from "../forms/BrochureForm";
import EnquiryForm from "../forms/EnquiryForm";
import Modal from "../ui/Modal";

/** "Enquire Now" and "Download Brochure" popups, available on every page. */
export default function SiteModals() {
  const { enquiry, closeEnquiry, brochure, closeBrochure } = useSite();

  return (
    <>
      <Modal open={enquiry.open} onClose={closeEnquiry} label="Enquire Now" className="max-w-xl">
        <EnquiryForm idPrefix="popup-" initialCourse={enquiry.course} title="Enquire Now" className="pt-14!" />
      </Modal>
      <Modal open={brochure.open} onClose={closeBrochure} label="Download Brochure" className="max-w-xl">
        <BrochureForm initialCourse={brochure.course} />
      </Modal>
    </>
  );
}
