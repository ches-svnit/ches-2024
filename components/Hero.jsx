import Link from "next/link";

export default function Home() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-4 pt-[75px] md:px-28"
    >
      <video
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/assets/bgvidcut1.mp4" type="video/mp4" />
      </video>

      {/* Navy scrim, heavier on the text side so the video stays visible on the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-gradient-to-r from-background-950/90 via-background-950/60 to-background-950/20"
      />
      {/* Bottom fade into the next section's background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-[5] h-40 bg-gradient-to-t from-background-950 to-transparent"
      />

      {/* The one choreographed moment on the page: each piece rises in turn (delays via --d) */}
      <div className="relative z-10 w-full max-w-4xl pb-12">
        <h1 className="font-heading text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
          <span className="motion-rise block" style={{ "--d": "150ms" }}>
            Chemical
          </span>
          <span className="motion-rise block" style={{ "--d": "270ms" }}>
            Engineering
          </span>
          <span className="motion-rise block" style={{ "--d": "390ms" }}>
            Society
          </span>
        </h1>

        <p
          className="motion-rise mt-8 max-w-xl border-l-2 border-accent-400 pl-5 font-body text-lg leading-relaxed text-primary-100 md:text-2xl [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
          style={{ "--d": "620ms" }}
        >
          Fuel your passion for Chemical Engineering – where curiosity sparks
          progress
        </p>

        <Link
          href="#About"
          style={{ "--d": "800ms" }}
          className="motion-rise mt-10 inline-flex items-center rounded-full bg-accent-400 px-7 py-3 text-base font-semibold text-background-950 transition-colors duration-200 hover:bg-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-300"
        >
          Learn about us
        </Link>
      </div>
    </section>
  );
}
