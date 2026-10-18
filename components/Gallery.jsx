import Image from "next/image";
import { getGallery } from "@/sanity/utilsSanity";

async function Gallery() {
  const Images = await getGallery();

  return (
    <section className=" mb-16 w-full px-4 md:px-28">
      <h2 className="md:text-4xl text-3xl font-bold font-heading text-secondary-200 mt-4 decoration-4  decoration-accent-500 underline underline-offset-8">
        Gallery
      </h2>

      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-3 mt-8">
        {Images.map(({ ImageUrl }, index) => (
          <div
            data-aos="fade-left"
            data-aos-delay={index * 100 + 10}
            key={index}
            className="hover:scale-110 ease-in-out duration-300 relative overflow-hidden rounded-lg   cursor-pointer "
          >
            <Image
              quality={90}
              height={200}
              width={200}
              className="hover:scale-110 ease-in-out duration-300 w-full aspect-[3/2] max-w-full rounded-lg object-cover object-center "
              src={ImageUrl}
              alt="gallery-photo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
export default Gallery;
