"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Contact() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    emailjs
      .send(
        "service_ipyj85c",
        "template_pzaln2s",
        {
          from_name: data.name,
          to_name: "ChES-SVNIT",
          from_email: data.email,
          to_email: "archit499kul@gmail.com",
          message: data.message,
        },
        "s9ONT6lFbL_3bS2Vl"
      )
      .then(() => {
        alert("Message sent successfully");
        setLoading(false);

        reset();
      })
      .catch(() => {
        alert("Message failed to send");
        setLoading(false);
      });
  };

  return (
    <>
      <section className="  pt-16 min-h-screen w-full px-4 md:px-28 ">
        <div data-aos="fade-left" className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-tl from-secondary-800 to-secondary-950 border border-primary-200/10 backdrop-filter mt-6 backdrop-blur-lg p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-secondary-200 font-heading mt-4">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-center mb-8 text-text-100">
              We are here to help and answer any questions you might have. We
              look forward to hearing from you.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-4 bg-text-100 border border-primary-200/30 placeholder:text-text-500 text-text-800 rounded-md focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400"
                  {...register("name", { required: true })}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-4 bg-text-100 border border-primary-200/30 placeholder:text-text-500 text-text-800 rounded-md focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="4"
                  className="w-full p-4 bg-text-100 border border-primary-200/30 placeholder:text-text-500 text-text-800 rounded-md focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 resize-none"
                  {...register("message", { required: true })}
                  required></textarea>
              </div>
              <div>
                <button
                  aria-label="send"
                  type="submit"
                  className="w-full py-3 bg-accent-400 hover:bg-accent-300 text-background-950 font-bold rounded-md transition duration-300 disabled:opacity-60"
                  disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;