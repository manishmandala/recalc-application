import { HeroPath } from "@/components/hero-path";

export function HeroSection() {
  return (
    <section
      id="home"
      className="container mx-auto grid max-w-[1080px] items-center gap-12 px-6 py-16 md:min-h-[calc(100vh-68px)] md:grid-cols-[1.05fr_0.95fr]"
    >
      <div className="text-center md:text-left">
        <p className="mb-4 font-mono text-[0.85rem] font-semibold tracking-[0.06em] text-brand">
          RECALC FINANCE ACCELERATOR &middot; FALL 2026
        </p>
        <h1 className="mb-5 font-display text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
          Manish Mandala
        </h1>
        <p className="mb-5 font-mono text-[0.75rem] tracking-[0.06em] text-muted-foreground uppercase">
          Mechanical Engineering &middot; Ohio State &middot; Dean&apos;s List
        </p>

        <p className="mx-auto mb-7 max-w-[500px] font-display text-[1.15rem] font-medium leading-snug text-muted-foreground md:mx-0">
          I&apos;ve always wanted to know{" "}
          <span className="text-foreground">why things work</span>: first machines, then businesses, then
          people. Private equity is where all three meet.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="#timeline"
            className="rounded-lg bg-brand px-6 py-3 text-[0.95rem] font-semibold text-[#2a1608] transition-colors hover:bg-brand-hover"
          >
            Take the Drive
          </a>
          <a
            href="https://www.linkedin.com/in/manish-mandala"
            target="_blank"
            rel="noopener"
            className="rounded-lg border border-border px-6 py-3 text-[0.95rem] font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            LinkedIn
          </a>
          <a
            href="mailto:manish.mandala07@gmail.com"
            className="rounded-lg border border-border px-6 py-3 text-[0.95rem] font-semibold transition-colors hover:border-brand hover:text-brand"
          >
            Email
          </a>
        </div>

        <p className="mt-6 font-mono text-[0.7rem] tracking-[0.06em] text-muted-foreground/80 uppercase">
          ~3 minute read &middot; built to be skimmed, click anything for more
        </p>
      </div>

      <HeroPath />
    </section>
  );
}
