"use client";
import { Button, Dialog, DialogFooter } from "@/components/Provider";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function EventCard({
  description,
  InnerImage,
  CoverImage,
  index = 0,
  link,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((o) => !o);

  return (
    <>
      {/* AOS on the wrapper so it doesn't fight the button's own transitions */}
      <div data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
        <button
          type="button"
          onClick={handleOpen}
          aria-haspopup="dialog"
          aria-label="View event details"
          className="block w-full rounded-2xl border border-primary-200/10 bg-secondary-900/70 p-3 text-left transition-colors duration-300 hover:border-accent-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
        >
          <Image
            width={600}
            height={400}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="h-auto w-full rounded-xl object-cover"
            src={CoverImage}
            alt="Event poster"
          />
        </button>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        size="lg"
        className="max-h-[90dvh] overflow-y-auto rounded-2xl border border-primary-200/10 bg-secondary-900 shadow-2xl shadow-black/40"
        animate={{
          mount: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" },
          },
          unmount: {
            opacity: 0,
            scale: 0.97,
            y: 12,
            transition: { duration: 0.2, ease: "easeIn" },
          },
        }}
      >
        <div className="p-5 md:flex md:gap-8 md:p-8">
          <Image
            src={InnerImage}
            alt="Event poster, full size"
            width={400}
            height={400}
            sizes="(min-width: 768px) 20rem, 100vw"
            className="aspect-square w-full flex-none rounded-xl bg-secondary-950/60 object-contain md:w-80"
          />
          <p className="mt-5 text-base leading-relaxed text-text-100 md:mt-0 md:text-lg">
            {description}
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button
            aria-label="Close"
            variant="text"
            color="white"
            onClick={() => setOpen(false)}
          >
            <span>Close</span>
          </Button>
          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent-400 px-5 py-2.5 font-medium text-background-950 transition-colors hover:bg-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
            >
              Know more
            </Link>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default EventCard;
