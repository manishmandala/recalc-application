import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-12 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">04.</span> Contact
      </Reveal>

      <Reveal>
        <div className="mx-auto max-w-[560px] text-center">
          <p className="mb-8 text-[1.05rem] text-muted-foreground">
            Happy to talk through any of this in more depth, whichever part of it you're curious about.
          </p>
          <a
            href="mailto:manish.mandala07@gmail.com"
            className="inline-block rounded-lg bg-brand px-8 py-3.5 text-[1rem] font-semibold text-[#2a1608] transition-colors hover:bg-brand-hover"
          >
            Say Hello
          </a>
          <ul className="mt-8 flex justify-center gap-6">
            <li>
              <a
                href="https://www.linkedin.com/in/manish-mandala"
                target="_blank"
                rel="noopener"
                className="border-b border-transparent text-[0.9rem] font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://manishmandala.vercel.app"
                target="_blank"
                rel="noopener"
                className="border-b border-transparent text-[0.9rem] font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                Engineering Portfolio
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
