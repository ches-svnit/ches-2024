"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const AUTOPLAY_MS = 5000;

const controlBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-primary-200/20 bg-secondary-800 text-accent-400 transition-colors hover:bg-secondary-700 hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400";

const AnnouncementsCarousel = ({ notifications }) => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = notifications.length;

  // Respect "reduce motion": start paused and use instant scrolling
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) setPlaying(false);
  }, []);

  const behavior = reduceMotion ? "auto" : "smooth";

  // Distance between the start of one card and the next
  const getStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const scrollToIndex = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: i * getStep(), behavior });
    },
    [getStep, behavior],
  );

  const goNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 2) {
      track.scrollTo({ left: 0, behavior });
    } else {
      track.scrollBy({ left: getStep(), behavior });
    }
  }, [getStep, behavior]);

  const goPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 2) {
      track.scrollTo({ left: max, behavior });
    } else {
      track.scrollBy({ left: -getStep(), behavior });
    }
  }, [getStep, behavior]);

  // Keep the active dot in sync with swipes, trackpad and buttons
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    const step = getStep();
    if (!track || !step) return;
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 2) {
      setIndex(count - 1);
    } else {
      setIndex(Math.min(count - 1, Math.round(track.scrollLeft / step)));
    }
  }, [count, getStep]);

  // Autoplay: pauses on hover/focus, or when the user presses pause
  useEffect(() => {
    if (!playing || hovered) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, hovered, goNext]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Header: title on the left, controls on the right */}
      <div className="my-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="md:text-4xl text-3xl font-bold font-heading text-secondary-200 decoration-4 decoration-accent-500 underline underline-offset-8">
          Announcements
        </h2>

        <div className="flex items-center gap-2">
          <span
            className="mr-auto text-sm tabular-nums text-text-300 sm:mr-2"
            aria-live="polite"
          >
            {index + 1} / {count}
          </span>
          <button
            type="button"
            aria-label={playing ? "Pause autoplay" : "Start autoplay"}
            onClick={() => setPlaying((p) => !p)}
            className={controlBtn}
          >
            {playing ? (
              <FaPause className="text-xs" />
            ) : (
              <FaPlay className="text-xs" />
            )}
          </button>
          <button
            type="button"
            aria-label="Previous announcement"
            onClick={goPrev}
            className={controlBtn}
          >
            <FaChevronLeft className="text-sm" />
          </button>
          <button
            type="button"
            aria-label="Next announcement"
            onClick={goNext}
            className={controlBtn}
          >
            <FaChevronRight className="text-sm" />
          </button>
        </div>
      </div>

      {/* Scrollable, swipeable track with snap points */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goNext();
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goPrev();
          }
        }}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {notifications.map((notification, i) => {
          const card = (
            <Image
              src={notification.ImageUrl}
              width={800}
              height={320}
              alt={`Announcement ${i + 1}`}
              className="h-auto w-full rounded-xl border border-primary-200/10 transition duration-300 group-hover:shadow-lg group-hover:shadow-accent-400/20"
            />
          );
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="group w-[85%] flex-none snap-start sm:w-[26rem]"
            >
              {notification.link ? (
                <Link
                  href={notification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-xl"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {notifications.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to announcement ${i + 1}`}
            aria-current={index === i}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-2xl transition-all ${
              index === i ? "w-8 bg-accent-500" : "w-4 bg-accent-300/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsCarousel;
