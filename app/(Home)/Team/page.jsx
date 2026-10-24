import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/Dropdown";
import SectionHeading from "@/components/SectionHeading";
import PersonCard from "@/components/PersonCard";
import { Himanshu2425, Archit, teamImg2627 } from "@/public/assets";
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

// A titled group of people cards
const TeamGroup = ({ title, children }) => (
  <div className="mt-14 md:mt-20">
    <SectionHeading level="sub">{title}</SectionHeading>
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
      {children}
    </div>
  </div>
);

const page = async () => {
  // Fetch everything in parallel instead of one after another
  const [committees, studentHeads, faculty] = await Promise.all([
    getCommittee(),
    getStudentHeads(),
    getFaculty(),
  ]);

  const sortedCommittees = [...committees].sort((a, b) =>
    a.committee.localeCompare(b.committee, undefined, { sensitivity: "base" }),
  );

  return (
    <section className="min-h-screen w-full px-4 pb-16 pt-[75px] md:px-28">
      <div className="mt-10 flex items-center gap-4 md:gap-8">
        <SectionHeading as="h1" level="page" className="flex-1">
          Our Team
        </SectionHeading>
        <Dropdown />
      </div>

      <div className="mt-10">
        <Image
          priority
          src={teamImg2627}
          alt="The ChES team"
          sizes="100vw"
          className="h-[20dvh] w-full rounded-2xl object-cover object-center md:h-[55dvh]"
        />
      </div>

      <TeamGroup title="Faculty Advisors">
        {faculty.map((person, i) => (
          <PersonCard
            key={`${person.position}-${i}`}
            index={i}
            name={person.name}
            role={person.position}
            linkedin={person.linkedin}
            image={person.ImageUrl}
          />
        ))}
      </TeamGroup>

      <TeamGroup title="Student Heads">
        {studentHeads.map((person, i) => (
          <PersonCard
            key={`${person.position}-${i}`}
            index={i}
            name={person.name}
            role={person.position}
            linkedin={person.linkedin}
            image={person.ImageUrl}
          />
        ))}
      </TeamGroup>

      <TeamGroup title="Student Advisors">
        {studentAdvisors.map((person, i) => (
          <PersonCard
            key={person.advisoryDepartment}
            index={i}
            name={person.advisor}
            role={person.advisoryDepartment}
            linkedin={person.linkedin}
            image={person.ImageUrl}
          />
        ))}
      </TeamGroup>

      <TeamGroup title="Committee Heads">
        {sortedCommittees.map((person, i) => (
          <PersonCard
            key={`${person.committee}-${i}`}
            index={i}
            name={person.head}
            role={person.committee}
            linkedin={person.linkedin}
            image={person.ImageUrl}
          />
        ))}
      </TeamGroup>

      <Link
        href={buttonReg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center rounded-full bg-accent-400 px-7 py-3 text-base font-semibold text-background-950 transition-colors duration-200 hover:bg-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-300"
      >
        {buttonReg.text}
      </Link>

      <TeamGroup title="Developers">
        {Developers.map((person, i) => (
          <PersonCard
            key={`${person.position}-${i}`}
            index={i}
            name={person.name}
            role={person.position}
            linkedin={person.Linkedin}
            image={person.ImageUrl}
          />
        ))}
      </TeamGroup>
    </section>
  );
};

export default page;
