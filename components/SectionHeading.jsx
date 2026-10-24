// components/SectionHeading.jsx
// One heading style for every section: big tight title + a quiet rule that runs to the edge.
// level="page" for the main title of a page/section, level="sub" for groups inside it.
export default function SectionHeading({
  as: Tag = "h2",
  level = "page",
  id,
  className = "",
  children,
}) {
  const size =
    level === "page" ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl";

  return (
    <div
      data-aos="fade-up"
      className={`flex min-w-0 items-center gap-5 md:gap-8 ${className}`}
    >
      <Tag
        id={id}
        className={`font-heading font-bold leading-none tracking-tight text-secondary-100 ${size}`}
      >
        {children}
      </Tag>
      <span aria-hidden="true" className="h-px flex-1 bg-primary-200/15" />
    </div>
  );
}
