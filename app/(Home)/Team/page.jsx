import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { Himanshu2425, Archit } from "@/public/assets";

import Link from "next/link";
import Image from "next/image";
import { placeholder, teamImg2526 } from "@/public/assets";
import Dropdown from "@/components/Dropdown";

import { Developers } from "@/constants/index";
import {
  getCommittee,
  // getAdvisor,
  getStudentHeads,
  getFaculty,
} from "@/sanity/utilsSanity";
const buttonReg = {
  href: "https://drive.google.com/file/d/19U-k2iOiJSHdfogjzWwvRD2Yf33-4GT_/view?usp=sharing",
  text: "Full Committee List",
};

// Shared card style (navy gradient, faint border, yellow hover glow)
const cardClass =
  "bg-gradient-to-tl from-secondary-800 to-secondary-950 border border-primary-200/10 backdrop-filter backdrop-blur-lg shadow-lg p-4 rounded-xl hover:shadow-lg hover:shadow-accent-400/20 transition-shadow sm:w-[100%] flex items-center justify-between gap-2";

const page = async () => {
  const committees = await getCommittee();
  // const studentAdvisors = await getAdvisor();
  const studentAdvisors = [
    {
      advisoryDepartment: "Chem-E-Car Advisor",
      advisor: "Himanshu Singh",
      linkedin:
        "https://www.linkedin.com/in/himanshu-singh-319747263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ImageUrl: Himanshu2425,
    },
    {
      advisoryDepartment: "Web Development Advisor",
      advisor: "Archit Kulshrestha",
      linkedin:
        "https://www.linkedin.com/in/architkulshrestha051?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      ImageUrl: Archit,
    },
  ];
  const studentHeads = await getStudentHeads();
  const faculty = await getFaculty();
  return (
    <section className="px-4 md:px-28 pt-[75px] w-full min-h-screen mb-6">
      <div className="flex justify-between items-center mt-8">
        <h1 className="md:text-4xl text-3xl font-bold font-heading text-secondary-200 decoration-4 decoration-accent-500 underline underline-offset-8">
          Our Team
        </h1>
        <Dropdown />
      </div>

      <div className="w-full mt-8 ">
        <Image
          src={teamImg2526}
          alt="team"
          className="h-[20dvh] md:h-[55dvh] object-center rounded-md w-full  object-cover"
        />
      </div>
      <h1 className="md:text-3xl text-2xl font-bold font-heading text-secondary-200 mt-10 decoration-4  decoration-accent-500 underline underline-offset-8  ">
        Faculty Advisors
      </h1>
      <div className=" my-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {faculty.map((faculty, index) => (
          <div
            data-aos="fade-left"
            key={faculty.position}
            className={cardClass}>
            <div>
              <div className="text-base sm:text-xl font-bold font-heading text-text-200 ">
                {faculty.position}
              </div>
              <div className="text-[.9rem] text-accent-300 pb-2 font-semibold">
                {faculty.name}
              </div>
              <Link
                href={`${faculty.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedIn">
                <FaLinkedin className="text-xl text-text-200 hover:text-accent-400" />
              </Link>
            </div>
            <Image
              src={faculty.ImageUrl ? faculty.ImageUrl : placeholder}
              alt="Img"
              height={100}
              width={100}
              className="float aspect-[1/1] rounded-full"
            />
          </div>
        ))}
      </div>

      <h1 className="md:text-3xl text-2xl font-bold font-heading text-secondary-200 mt-10 decoration-4  decoration-accent-500 underline underline-offset-8  ">
        Student Heads
      </h1>
      <div className=" my-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {studentHeads.map((StudentHead, index) => (
          <div
            data-aos="fade-left"
            data-aos-delay={index * 50}
            key={StudentHead.position}
            className={cardClass}>
            <div>
              <div className="text-base sm:text-xl font-bold font-heading text-text-200 ">
                {StudentHead.position}
              </div>
              <div className="text-[.9rem] text-accent-300 pb-2 font-semibold">
                {StudentHead.name}
              </div>
              <Link
                href={`${StudentHead.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedIn">
                <FaLinkedin className="text-xl text-text-200 hover:text-accent-400" />
              </Link>
            </div>
            <Image
              src={StudentHead.ImageUrl ? StudentHead.ImageUrl : placeholder}
              alt="Img"
              height={100}
              width={100}
              className="float aspect-[1/1] rounded-full"
            />
          </div>
        ))}
      </div>

      <h1 className="md:text-3xl text-2xl font-bold font-heading text-secondary-200 mt-10 decoration-4  decoration-accent-500 underline underline-offset-8  ">
        Student Advisors
      </h1>
      <div className=" my-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {studentAdvisors.map((studentAdvisors, index) => (
          <div
            data-aos="fade-left"
            data-aos-delay={index * 50}
            key={studentAdvisors.advisoryDepartment}
            className={cardClass}>
            <div>
              <div className="text-base sm:text-xl font-bold font-heading text-text-200 ">
                {studentAdvisors.advisoryDepartment}
              </div>
              <div className="text-[.9rem] text-accent-300 pb-2 font-semibold">
                {studentAdvisors.advisor}
              </div>
              <Link
                href={`${studentAdvisors.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedIn">
                <FaLinkedin className="text-xl text-text-200 hover:text-accent-400" />
              </Link>
            </div>
            <Image
              src={studentAdvisors.ImageUrl ? studentAdvisors.ImageUrl : placeholder}
              alt="Img"
              height={100}
              width={100}
              className="float aspect-[1/1] rounded-full"
            />
          </div>
        ))}
      </div>

      <h1 className="md:text-3xl text-2xl font-bold font-heading text-secondary-200 mt-4 decoration-4  decoration-accent-500 underline underline-offset-8  ">
        Committee Heads
      </h1>
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {committees.map((committee, index) => (
          <div
            data-aos="fade-right"
            data-aos-delay={index * 50}
            key={committee.head}
            className={cardClass}>
            <div>
              <div className="text-base sm:text-xl font-bold font-heading text-text-200 ">
                {committee.committee}
              </div>
              <div className="text-[.9rem] text-accent-300 pb-2 font-semibold">
                {committee.head}
              </div>
              <Link
                href={`${committee.linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedIn">
                <FaLinkedin className="text-xl text-text-200 hover:text-accent-400" />
              </Link>
            </div>
            <Image
              src={committee.ImageUrl ? committee.ImageUrl : placeholder}
              alt="Img"
              height={100}
              width={100}
              className=" rounded-full  aspect-[1/1] object-fill "
            />
          </div>
        ))}
      </div>
      <Link
        href={buttonReg.href}
        target="_blank"
        rel="noreferrer"
        aria-label="core committee"
        className="inline-block bg-accent-400 text-background-950 font-medium py-2 px-4 rounded-md shadow-md hover:bg-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-opacity-50 transition-colors duration-200">
        {buttonReg.text}
      </Link>
      <h1 className="md:text-3xl text-2xl font-bold font-heading text-secondary-200 mt-10 decoration-4  decoration-accent-500 underline underline-offset-8  ">
        Developers
      </h1>
      <div className=" my-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {Developers.map((Developers, index) => (
          <div
            key={Developers.position}
            className={cardClass}>
            <div>
              <div className="text-base sm:text-xl font-bold font-heading text-text-200 ">
                {Developers.position}
              </div>
              <div className="text-[.9rem] text-accent-300 pb-2 font-semibold">
                {Developers.name}
              </div>
              <Link
                href={`${Developers.Linkedin}`}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedIn">
                <FaLinkedin className="text-xl text-text-200 hover:text-accent-400" />
              </Link>
            </div>
            <Image
              src={Developers.ImageUrl ? Developers.ImageUrl : placeholder}
              alt="Img"
              height={100}
              width={100}
              className="float aspect-[1/1] rounded-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;