import Image from "next/image";
import { Hero } from "../public/assets/index.js";
import Link from "next/link";

export default function Home() {
  return (
    <section
      id="hero"
      className="relative pt-[75px] min-h-screen w-full px-4 md:px-28 flex justify-center items-center overflow-hidden">
      <video
        className="absolute inset-0 min-h-full w-full -z-10 object-cover"
        poster="/assets/bgvidCutcomp2.gif"
        autoPlay
        muted
        playsInline
        loop>
        <source src="/assets/bgvidcut1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Navy scrim: keeps the video's blue, calms the bright lights */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5] bg-[radial-gradient(ellipse_at_center,rgba(10,17,41,0.78)_0%,rgba(10,17,41,0.55)_45%,rgba(10,17,41,0.35)_100%)]"
      />
      {/* Bottom fade into the next section's navy background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 -z-[5] bg-gradient-to-t from-background-950 to-transparent"
      />

      <div className="relative z-10 flex items-center justify-center py-8">
        <div className="text-center sm:w-[70%] w-full mt-[-50px]">
          {/* White title with a warm yellow glow (replaces the green) */}
          <h1
            className="md:text-7xl text-4xl font-bold font-heading py-2 leading-tight
                       text-white
                       [text-shadow:0_0_28px_rgba(255,209,31,0.45),0_2px_12px_rgba(0,0,0,0.9)]">
            Chemical Engineering Society
          </h1>

          {/* Yellow-to-blue divider */}
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-accent-400 via-accent-300 to-primary-400" />

          <p
            className="md:text-3xl text-xl font-body font-normal text-white mt-6 leading-relaxed
                       [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]
                       animate-fade-in">
            Fuel your passion for Chemical Engineering –{" "}
            <span className="text-accent-300 font-medium">
              where curiosity sparks progress
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}