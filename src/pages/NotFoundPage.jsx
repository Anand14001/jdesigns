import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="py-[calc(var(--section)*2)]">
      <div className="wrap max-w-3xl">
        <p className="mb-2 text-sm font-extrabold text-violet">404</p>
        <h1 className="mb-4 text-[2.25rem] font-light md:text-5xl">
          <b className="font-extrabold">Page</b> not found
        </h1>
        <p className="mb-8 text-lg text-muted">This page doesn't exist. It may have moved, or the link may be mistyped.</p>
        <div className="flex flex-wrap gap-3">
          <Button to="/">Go to Home</Button>
          <Button to="/courses/" variant="outlineDark">View Courses</Button>
        </div>
      </div>
    </section>
  );
}
