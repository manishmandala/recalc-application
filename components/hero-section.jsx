import { HeroTopo } from "@/components/hero-topo";

export function HeroSection() {
  return (
    <section
      id="home"
      className="container mx-auto max-w-[1080px] px-6 relative flex items-center overflow-hidden py-16 text-center md:min-h-[calc(100vh-68px)] md:text-left"
    >
      <div className="relative z-[1] max-w-[640px] mx-auto md:mx-0">
        <p className="mb-4 font-mono text-[0.85rem] font-semibold tracking-[0.06em] text-brand">
          RECALC FINANCE ACCELERATOR &middot; FALL 2026
        </p>
        <h1 className="mb-5 font-display text-[clamp(2.4rem,6vw,3.6rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
          Manish Mandala
        </h1>

        <p className="mx-auto mb-3 max-w-[540px] font-display text-[1.12rem] font-medium leading-snug text-muted-foreground md:mx-0">
          Mechanical engineering student at Ohio State. I like knowing why something works, and lately
          that's meant fewer screwdrivers and more spreadsheets.
        </p>
        <p className="mx-auto mb-7 max-w-[540px] text-[0.98rem] leading-relaxed text-muted-foreground/90 md:mx-0">
          This site is my application project for Recalc's Finance Accelerator, and my attempt at explaining
          how I ended up here without pretending I've already got it figured out.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          <a
            href="#timeline"
            className="rounded-lg bg-brand px-6 py-3 text-[0.95rem] font-semibold text-[#0d1a17] transition-colors hover:bg-brand-hover"
          >
            How I Got Here
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

        <div className="mt-10 flex flex-wrap justify-center gap-8 md:justify-start">
          <a href="#timeline" className="group flex flex-col">
            <span className="font-display text-[1.6rem] font-extrabold text-brand transition-transform group-hover:-translate-y-0.5">
              8
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.06em] text-muted-foreground uppercase">
              stops on the map
            </span>
          </a>
          <a href="#local-business" className="group flex flex-col">
            <span className="font-display text-[1.6rem] font-extrabold text-brand transition-transform group-hover:-translate-y-0.5">
              2
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.06em] text-muted-foreground uppercase">
              businesses this summer
            </span>
          </a>
          <a href="#question" className="group flex flex-col">
            <span className="font-display text-[1.6rem] font-extrabold text-brand transition-transform group-hover:-translate-y-0.5">
              1
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.06em] text-muted-foreground uppercase">
              question I'm chasing
            </span>
          </a>
        </div>
      </div>

      <HeroTopo />
    </section>
  );
}
