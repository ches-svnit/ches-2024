import { ChESlogo } from "../public/assets";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

const emails = ["ches@svnit.ac.in", "ches.svnit@gmail.com"];

const phones = [
  {
    name: "Vedica Mahendian",
    tel: "+919909030287",
    display: "+91 99090 30287",
  },
  { name: "Divyam Bhandari", tel: "+917579055308", display: "+91 75790 55308" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://m.facebook.com/ches.svnit.aiche",
    Icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ches_svnit_aiche/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/chemical-engineering-society-svnit/mycompany/",
    Icon: FaLinkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@aichechessvnit7048",
    Icon: FaYoutube,
  },
  {
    label: "Find us on Google Maps",
    href: "https://www.google.com/maps/place/Sardar+Vallabhbhai+National+Institute+of+Technology,+SVNIT./@21.1663287,72.7642292,15z/data=!4m10!1m2!2m1!1ssvnit+location!3m6!1s0x3be04dec8b56fdf3:0x423b99085d26d1f9!8m2!3d21.1663287!4d72.7832836!15sCg5zdm5pdCBsb2NhdGlvbpIBCnVuaXZlcnNpdHngAQA!16zL20vMDZscjIz?entry=ttu",
    Icon: FaMapMarkerAlt,
  },
];

const linkClass =
  "rounded text-text-100 transition-colors hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400";

const headingClass = "font-heading text-lg font-semibold text-secondary-100";

function Footer() {
  return (
    <footer className="border-t border-primary-200/10 px-4 pt-14 lg:px-28">
      <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Image src={ChESlogo} alt="ChES logo" className="h-auto w-40" />
          <p className="mt-5 max-w-xs font-body font-semibold leading-relaxed text-text-100">
            Sardar Vallabhbhai National Institute of Technology, Surat
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className={headingClass}>Contact us</h2>
          <ul className="mt-4 space-y-2">
            {emails.map((email) => (
              <li key={email}>
                <Link href={`mailto:${email}`} className={linkClass}>
                  {email}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-4">
            {phones.map((p) => (
              <li key={p.tel}>
                <span className="block text-sm text-text-300">{p.name}</span>
                <Link href={`tel:${p.tel}`} className={linkClass}>
                  {p.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className={headingClass}>Follow us</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-200/20 text-lg text-primary-200 transition-colors hover:border-accent-400 hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                >
                  <Icon />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-primary-200/10 py-6 text-sm text-text-400">
        © {year} AIChE ChES SVNIT
      </div>
    </footer>
  );
}

export default Footer;
