import Image from "next/image";
import React from "react";
import { IoMdLink } from "react-icons/io";
// import { Achievements } from "@/constants";
import { getAchievement } from "@/sanity/utilsSanity";
const AchievementCard = ({ description, ImageUrl, index }) => {
  return (
    <div
      data-aos-delay={index * 10}
      data-aos="fade-left"
      className="bg-gradient-to-tl from-secondary-800 to-secondary-950 border border-primary-200/10 backdrop-filter backdrop-blur-lg shadow-lg p-6 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-accent-400/20 transition-shadow sm:w-[100%]">
      <Image
        width={500}
        height={500}
        className="h-56 w-56 mx-auto aspect-[1/1] object-fill object-center rounded-lg "
        src={ImageUrl}
        alt="achsd"
      />

      <p className=" text-base text-text-200 pt-4">{description}</p>
    </div>
  );
};

const Achievement = async () => {
  const AchievementsList = await getAchievement();

  return (
    <section className="px-4 md:px-28 pt-[75px] w-full min-h-screen">
      <div>
        <h1 className="md:text-4xl text-3xl font-bold font-heading text-secondary-200 mt-4 decoration-4  decoration-accent-500 underline underline-offset-8  ">
          Achievements
        </h1>
      </div>

      <p
        data-aos="fade-right"
        className="mt-1 text-justify text-text-100 text-[14px] md:text-[18px]   ">
        In our relentless pursuit of excellence, ChES has achieved significant
        milestones along its journey. These accomplishments are a testament to
        the dedication of our determined team members, the unwavering support
        from our esteemed faculty advisors, and the encouragement received from
        the college administration.
      </p>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {AchievementsList.map((Achievements, index) => (
          <AchievementCard key={index} index={index} {...Achievements} />
        ))}
      </div>
    </section>
  );
};

export default Achievement;