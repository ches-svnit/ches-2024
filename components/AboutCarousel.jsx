"use client";
import { Carousel, IconButton } from "./Provider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CarouselCard from "./CarouselCard";

// Same outlined-circle control as the announcements carousel, on a dark backing so it stays readable over content
const arrowBtn =
  "!absolute !bottom-4 z-50 !h-10 !w-10 !rounded-full border border-primary-200/20 !bg-secondary-950/70 text-accent-400 backdrop-blur-md transition-colors hover:border-accent-400 hover:!bg-secondary-950/70 focus-visible:ring-2 focus-visible:ring-accent-400";

const AboutCarousel = ({ about }) => {
  return (
    <Carousel
      autoplay={false}
      loop={true}
      transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-1/2 z-50 flex h-10 -translate-x-1/2 items-center gap-1 rounded-full bg-secondary-950/70 px-3 backdrop-blur-md">
          {new Array(length).fill("").map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={activeIndex === i ? "true" : undefined}
              onClick={() => setActiveIndex(i)}
              className="rounded-full p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-8 bg-accent-400"
                    : "w-1.5 bg-primary-200/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          aria-label="Previous slide"
          variant="text"
          color="white"
          onClick={handlePrev}
          className={`${arrowBtn} !left-4`}
        >
          <FaChevronLeft className="text-sm" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          aria-label="Next slide"
          variant="text"
          color="white"
          onClick={handleNext}
          className={`${arrowBtn} !right-4`}
        >
          <FaChevronRight className="text-sm" />
        </IconButton>
      )}
    >
      {about.map((item) => (
        <CarouselCard key={item.title} {...item} />
      ))}
    </Carousel>
  );
};

export default AboutCarousel;
