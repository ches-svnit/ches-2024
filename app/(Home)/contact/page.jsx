"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const fieldClass =
  "w-full rounded-lg border border-primary-200/20 bg-secondary-950/60 px-4 py-3 text-text-100 placeholder:text-text-400 transition-colors duration-200 focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400 aria-[invalid=true]:border-red-400";

const Field = ({ id, label, error, children }) => (
  <div>
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-medium text-text-100"
    >
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
        {error}
      </p>
    )}
  </div>
);

function Contact() {
  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      await emailjs.send(
        "service_ipyj85c",
        "template_pzaln2s",
        {
          from_name: data.name,
          to_name: "ChES-SVNIT",
          from_email: data.email,
          to_email: "archit499kul@gmail.com",
          message: data.message,
        },
        "s9ONT6lFbL_3bS2Vl",
      );
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section className="min-h-screen w-full px-4 pb-16 pt-[75px] md:px-28">
      <SectionHeading as="h1" className="mt-10">
        Contact Us
      </SectionHeading>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        {/* Intro */}
        <div data-aos="fade-up">
          <p className="max-w-md text-base leading-relaxed text-text-100 md:text-lg">
            We are here to help and answer any questions you might have. We look
            forward to hearing from you.
          </p>
          <p className="mt-6 text-text-300">
            Prefer email? Write to{" "}
            <Link
              href="mailto:ches@svnit.ac.in"
              className="rounded text-text-100 underline decoration-primary-200/30 underline-offset-4 transition-colors hover:text-accent-300 hover:decoration-accent-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
            >
              ches@svnit.ac.in
            </Link>
          </p>
        </div>

        {/* Form */}
        <div
          data-aos="fade-up"
          data-aos-delay="80"
          className="rounded-2xl border border-primary-200/10 bg-secondary-900/70 p-5 md:p-8"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <Field id="name" label="Name" error={errors.name?.message}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={fieldClass}
                {...register("name", { required: "Please enter your name." })}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={fieldClass}
                {...register("email", {
                  required: "Please enter your email.",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "That email doesn't look right.",
                  },
                })}
              />
            </Field>

            <Field id="message" label="Message" error={errors.message?.message}>
              <textarea
                id="message"
                rows={5}
                placeholder="How can we help?"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${fieldClass} resize-none`}
                {...register("message", {
                  required: "Please write a message.",
                })}
              />
            </Field>

            <button
              type="submit"
              disabled={sending}
              aria-busy={sending}
              className="w-full rounded-full bg-accent-400 px-7 py-3 font-semibold text-background-950 transition-colors duration-200 hover:bg-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>

            {/* Announced to screen readers when it changes */}
            <div role="status" aria-live="polite" className="min-h-[1.5rem]">
              {status === "sent" && (
                <p className="text-sm text-accent-300">
                  Message sent. We'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-300">
                  Your message didn't send. Please try again, or email
                  ches@svnit.ac.in.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
