import AboutCarousel from "./AboutCarousel";
import { getAbout } from "@/sanity/utilsSanity";

const About = async () => {
  const about = await getAbout();

  return (
    <section
      id="About"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-20 px-4 py-8 md:px-28 md:py-16"
    >
      {/* Heading: large, tight, with a quiet rule that runs to the edge */}
      <div className="flex items-center gap-5 md:gap-8">
        <h2
          id="about-heading"
          className="font-heading text-4xl font-bold leading-none tracking-tight text-secondary-100 md:text-6xl"
        >
          About Us
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-primary-200/15" />
      </div>

      {/* Content panel: one solid surface, one accent moment (the top edge) */}
      <div
        data-aos="fade-up"
        className="relative mt-10 overflow-hidden rounded-2xl border border-primary-200/10 bg-secondary-900/70 p-5 shadow-xl shadow-black/20 backdrop-blur-md md:mt-14 md:p-10"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/70 to-transparent"
        />
        <AboutCarousel about={about} />
      </div>
    </section>
  );
};

export default About;
