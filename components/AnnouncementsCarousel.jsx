"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const AUTOPLAY_MS = 5000;

const controlBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-primary-200/20 text-primary-200 transition-colors hover:border-accent-400 hover:text-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400";

const AnnouncementsCarousel = ({ notifications }) => {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = notifications.length;
  const multiple = count > 1;

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

  // Autoplay: pauses on mouse hover / keyboard focus, or when the user presses pause
  useEffect(() => {
    if (!multiple || !playing || paused) return;
    const id = setInterval(goNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [multiple, playing, paused, goNext]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      // Mouse only: on touch screens a tap would otherwise leave autoplay stuck on "paused"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      // Keyboard focus only, for the same reason
      onFocus={(e) => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* Header: same treatment as the About heading, controls on the right */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <h2 className="font-heading text-4xl font-bold leading-none tracking-tight text-secondary-100 md:text-6xl">
          Announcements
        </h2>
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-primary-200/15 sm:block"
        />

        {multiple && (
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <span
              className="mr-auto text-sm tabular-nums text-text-300 sm:mr-3"
              aria-live={playing ? "off" : "polite"}
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
        )}
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
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-md pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 md:mt-10 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {notifications.map((notification, i) => {
          const card = (
            <Image
              src={notification.ImageUrl}
              width={800}
              height={320}
              sizes="(min-width: 768px) 30rem, (min-width: 640px) 26rem, 85vw"
              alt={`Announcement ${i + 1}`}
              className={`h-auto w-full rounded-xl border border-primary-200/10 transition-colors duration-300 ${
                notification.link ? "group-hover:border-accent-400/60" : ""
              }`}
            />
          );
          return (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              className="group w-[85%] flex-none snap-start sm:w-[26rem] md:w-[30rem]"
            >
              {notification.link ? (
                <Link
                  href={notification.link}
                  target={
                    notification.link.startsWith("/") ? "_self" : "_blank"
                  }
                  rel="noopener noreferrer"
                  className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
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

      {/* Position dots, left-aligned with the rest of the section */}
      {multiple && (
        <div className="mt-3 flex items-center gap-1">
          {notifications.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to announcement ${i + 1}`}
              aria-current={index === i ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className="group/dot rounded-full p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === i
                    ? "w-8 bg-accent-400"
                    : "w-1.5 bg-primary-200/30 group-hover/dot:bg-primary-200/60"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsCarousel;
