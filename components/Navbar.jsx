"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NavLinks } from "@/constants";
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ChesLogo } from "@/public/assets";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero, solid once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!showMenu) return;
    const onKey = (e) => e.key === "Escape" && setShowMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMenu]);

  const solid = scrolled || showMenu;

  return (
    <nav
      className={`motion-fade fixed z-50 flex h-[75px] w-full items-center justify-between px-4 transition-colors duration-300 lg:px-28 ${
        solid
          ? "bg-background-950/95 shadow-[0_1px_0_0_rgba(148,163,205,0.12)] backdrop-blur-md"
          : "bg-gradient-to-b from-background-950/90 via-background-950/50 to-transparent"
      }`}
    >
      <Link
        href="/"
        onClick={() => setShowMenu(false)}
        className="flex h-full items-center rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400"
      >
        {/* translate-y nudges the logo down to match the link baseline; tweak 3px to taste */}
        <Image
          priority
          src={ChesLogo}
          className="block h-auto w-32 translate-y-[3px]"
          alt="CHES"
        />
      </Link>

      {/* Desktop links */}
      <ul className="hidden h-full items-center gap-x-9 md:flex">
        {NavLinks.map((link) => {
          const isActive = active === link.title;
          return (
            <li key={link.title}>
              <Link
                scroll={true}
                onClick={() => setActive(link.title)}
                href={`${link.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-[0.95rem] font-medium tracking-wide transition-colors duration-200
                  after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-accent-400 after:transition-transform after:duration-300 after:ease-out
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400
                  ${
                    isActive
                      ? "text-accent-300 after:scale-x-100"
                      : "text-primary-200 after:scale-x-0 hover:text-primary-50 hover:after:scale-x-100"
                  }`}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Mobile toggle */}
      <button
        aria-label={showMenu ? "Close menu" : "Open menu"}
        aria-expanded={showMenu}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-primary-200 transition-colors duration-200 hover:bg-primary-200/10 hover:text-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 md:hidden"
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? <IoMdClose /> : <HiMenuAlt1 />}
      </button>

      {/* Mobile menu: always mounted so it can ease in and out */}
      <div
        id="mobile-menu"
        aria-hidden={!showMenu}
        className={`absolute inset-x-0 top-full border-t border-primary-200/10 bg-background-950/95 px-4 pb-4 pt-2 shadow-xl shadow-black/30 backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ease-out md:hidden ${
          showMenu
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col">
          {NavLinks.map((link) => {
            const isActive = active === link.title;
            return (
              <li
                key={link.title}
                className="border-b border-primary-200/10 last:border-b-0"
              >
                <Link
                  scroll={true}
                  href={`${link.id}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActive(link.title);
                    setShowMenu(false);
                  }}
                  className={`block border-l-2 py-3.5 pl-4 text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-accent-400 text-accent-300"
                      : "border-transparent text-primary-200 hover:text-primary-50"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
