// components/PersonCard.jsx
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { placeholder } from "@/public/assets";

export default function PersonCard({ name, role, linkedin, image, index = 0 }) {
  return (
    // AOS lives on the outer wrapper so it doesn't fight the card's own transitions
    <div data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
      <div className="flex h-full items-center gap-4 rounded-2xl border border-primary-200/10 bg-secondary-900/70 p-4 md:gap-5 md:p-5">
        <Image
          src={image || placeholder}
          alt=""
          width={96}
          height={96}
          className="h-20 w-20 flex-none rounded-full object-cover md:h-24 md:w-24"
        />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-lg font-semibold leading-snug text-secondary-100">
            {name}
          </p>
          <p className="mt-0.5 text-sm text-accent-300">{role}</p>
          {linkedin && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="mt-3 inline-flex rounded text-xl text-text-300 transition-colors hover:text-accent-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              <FaLinkedin />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
