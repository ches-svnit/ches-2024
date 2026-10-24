import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getGallery } from "@/sanity/utilsSanity";

async function Gallery() {
  const Images = await getGallery();

  return (
    <section className="w-full px-4 py-8 md:px-28 md:py-12">
      <SectionHeading>Gallery</SectionHeading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3">
        {Images.map(({ ImageUrl }, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={(index % 3) * 80}
            className="group overflow-hidden rounded-xl"
          >
            <Image
              quality={85}
              width={600}
              height={400}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[3/2] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              src={ImageUrl}
              alt={`Gallery photo ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
