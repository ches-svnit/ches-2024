"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Render <AOSProvider /> once in app/layout.jsx, and delete any other AOS.init() call.
export default function AOSProvider() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true, // reveal once, never re-animate on scroll back up
      offset: 48,
    });
  }, []);

  return null;
}
