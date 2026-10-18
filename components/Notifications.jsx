import { getNotifications } from "@/sanity/utilsSanity";
import AnnouncementsCarousel from "./AnnouncementsCarousel";

// Server component: fetches from Sanity, hands data to the client carousel.
export const Notifications = async () => {
  const notifications = await getNotifications();

  if (!notifications?.length) return null;

  return (
    <section
      aria-label="Announcements"
      className="mb-4 mt-12 w-full px-4 md:px-28"
    >
      <AnnouncementsCarousel notifications={notifications} />
    </section>
  );
};

export default Notifications;
