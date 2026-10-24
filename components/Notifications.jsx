import { getNotifications } from "@/sanity/utilsSanity";
import AnnouncementsCarousel from "./AnnouncementsCarousel";

// Server component: fetches from Sanity, hands data to the client carousel.
export const Notifications = async () => {
  const notifications = await getNotifications();

  if (!notifications?.length) return null;

  return (
    <section
      id="Announcements"
      aria-label="Announcements"
      className="w-full scroll-mt-20 px-4 py-8 md:px-28 md:py-12"
    >
      <div data-aos="fade-up">
        <AnnouncementsCarousel notifications={notifications} />
      </div>
    </section>
  );
};

export default Notifications;
