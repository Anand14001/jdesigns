import { CONTACT } from "../../data/content";
import { whatsappLink } from "../../lib/paths";
import { WhatsAppIcon } from "../icons/Icons";
import Button from "../ui/Button";
import Img from "../ui/Img";
import Modal from "../ui/Modal";

/**
 * Plays a YouTube video (privacy-enhanced, no cookies) in a popup.
 * Videos without an id yet show a "coming soon" note with a WhatsApp link.
 */
export default function VideoModal({ video, onClose }) {
  return (
    <Modal open={!!video} onClose={onClose} label={video?.title ?? "Video"} dark className="max-w-5xl">
      {video && (
        <div className="p-4 pt-14 md:p-8 md:pt-14">
          {video.youtubeId ? (
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                title={video.title}
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          ) : (
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-lg">
              <Img src={video.image} alt="" className="absolute inset-0 opacity-35" />
              <div className="relative px-6 text-center">
                <p className="mb-2 text-2xl font-medium">This video is coming soon</p>
                <p className="mx-auto mb-6 max-w-md text-white/75">Ask us on WhatsApp and we'll share a demo of the {video.title} class.</p>
                <Button
                  href={whatsappLink(CONTACT.whatsappNumber, [`Hello J Designs, I would like to see a demo of the ${video.title} class.`])}
                >
                  <WhatsAppIcon className="size-5" /> Ask on WhatsApp
                </Button>
              </div>
            </div>
          )}
          <p className="m-0 mt-5 text-xl font-medium">{video.title}</p>
        </div>
      )}
    </Modal>
  );
}
