import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
// import EventRegistration from "@/components/EventRegistration";
// import { events } from "@/constants";
import { getEvent } from "@/sanity/utilsSanity";

export async function Event() {
  const events = await getEvent();

  return (
    <section className="min-h-screen w-full px-4 pb-16 pt-[75px] md:px-28">
      <SectionHeading as="h1" className="mt-10">
        Events
      </SectionHeading>

      <p
        data-aos="fade-up"
        className="mt-6 max-w-3xl text-base leading-relaxed text-text-100 md:text-lg"
      >
        At ChES, we are proud to curate a diverse calendar of events that ignite
        the enthusiasm for chemical engineering and nurture an innovative
        spirit. Annually, our society organizes a variety of engaging
        activities, with flagship events such as SIPHON, ALCHEMY, and EUREKA
        taking center stage. The remaining year is filled with workshops,
        industrial visits, Chem-E-Car Competitions, and numerous K-12
        activities.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={index} index={index} {...event} />
        ))}
      </div>
      {/* <EventRegistration /> */}
    </section>
  );
}
export default Event;
