"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NavLinks } from "@/constants";
import React from "react";
import Link from "next/link";
// import { motion } from "framer-motion";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { ChesLogo, CHESweb } from "@/public/assets";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  // Transparent over the hero, solid navy once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed px-4 lg:px-28 z-50 w-full h-[75px] flex justify-between items-center transition-colors duration-300 ${
        scrolled
          ? "bg-background-950/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(148,163,205,0.12)]"
          : "bg-gradient-to-b from-background-950/90 via-background-950/50 to-transparent"
      }`}>
      <Link href={"/"} className="text-accent-500  ">
        <Image
          priority
          src={ChesLogo}
          className="hover:scale-105 transition-all duration-[300ms] ease-in-out  w-[8rem] py-2 "
          alt="CHES"
        />
      </Link>
      <ul className="hidden md:flex h-full flex-row gap-x-6 items-center">
        {NavLinks.map((link) => (
          <li
            className="  text-primary-200 hover:text-accent-300  hover:scale-105 transition-all duration-200 ease-in-out "
            key={link.title}>
            <Link
              scroll={true}
              onClick={() => setActive(link.title)}
              className={`${
                active === link.title ? "text-accent-400 font-semibold " : ""
              } text-base font-normal uppercase hover:font-semibold transition-all duration-100 ease-in-out`}
              href={`${link.id}`}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <button
        aria-label="ham-menu"
        className="flex md:hidden text-primary-200 text-2xl cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? <IoMdClose /> : <HiMenuAlt1 />}
      </button>
      {showMenu && (
        <div className="absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl backdrop-blur bg-gradient-to-r from-secondary-700/90 to-secondary-950 flex flex-col p-5 items-end md:hidden z-40">
          <ul className="flex flex-col gap-4 items-end">
            {NavLinks.map((link) => (
              <li
                onClick={() => {
                  setActive(link.title), setShowMenu(false);
                }}
                className=" hover:scale-105 text-primary-200 hover:text-accent-300 transition-all duration-200 "
                key={link.title}>
                <Link
                  scroll={true}
                  className={`${
                    active === link.title ? "text-accent-400 font-semibold" : ""
                  } text-base font-normal uppercase hover:font-semibold transition-all duration-200 ease-in-out`}
                  href={`${link.id}`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;