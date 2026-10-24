import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
// import { Achievements } from "@/constants";
import { getAchievement } from "@/sanity/utilsSanity";

const AchievementCard = ({ description, ImageUrl, index }) => {
  return (
    // AOS on the wrapper so it doesn't fight the card's own transitions
    <div data-aos="fade-up" data-aos-delay={(index % 3) * 80}>
      <article className="h-full rounded-2xl border border-primary-200/10 bg-secondary-900/70 p-3">
        <Image
          width={600}
          height={450}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="aspect-[4/3] w-full rounded-xl object-cover object-center"
          src={ImageUrl}
          alt={`Achievement ${index + 1}`}
        />
        <p className="px-2 pb-3 pt-4 text-base leading-relaxed text-text-100">
          {description}
        </p>
      </article>
    </div>
  );
};

const Achievement = async () => {
  const AchievementsList = await getAchievement();

  return (
    <section className="min-h-screen w-full px-4 pb-16 pt-[75px] md:px-28">
      <SectionHeading as="h1" className="mt-10">
        Achievements
      </SectionHeading>

      <p
        data-aos="fade-up"
        className="mt-6 max-w-3xl text-base leading-relaxed text-text-100 md:text-lg"
      >
        In our relentless pursuit of excellence, ChES has achieved significant
        milestones along its journey. These accomplishments are a testament to
        the dedication of our determined team members, the unwavering support
        from our esteemed faculty advisors, and the encouragement received from
        the college administration.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {AchievementsList.map((achievement, index) => (
          <AchievementCard key={index} index={index} {...achievement} />
        ))}
      </div>
    </section>
  );
};

export default Achievement;
