import AboutCarousel from "./AboutCarousel";
import { getAbout } from "@/sanity/utilsSanity";
const About = async () => {
  const about = await getAbout();

  return (
    <section id="About" className="px-4 md:px-28 pb-4 pt-8 w-full min-h-screen">
      <h2 className="md:text-4xl text-3xl font-bold font-heading text-secondary-200 mt-4 decoration-4  decoration-accent-500 underline underline-offset-8">
        About Us
      </h2>
      <div
        data-aos="fade-right"
        className="my-8 p-4 md:p-8 bg-gradient-to-tl from-secondary-800 to-secondary-950 border border-primary-200/10 backdrop-filter mt-6 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-lg hover:shadow-accent-400/20 transition-shadow"
      >
        <AboutCarousel about={about} />
      </div>
    </section>
  );
};

export default About;
