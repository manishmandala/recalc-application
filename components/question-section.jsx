import { Reveal } from "@/components/reveal";

export function QuestionSection() {
  return (
    <section id="question" className="container mx-auto max-w-[760px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-10 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> The Question I'm Chasing
      </Reveal>

      <Reveal>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          Line all of this up and it's the same question wearing different clothes: what actually makes a
          business work? Not the answer you'd give to sound sharp in an interview, but the real one, the
          kind you only get to by listening long enough and testing enough small assumptions that you
          eventually run out of the wrong ones. I don't have that answer yet. I have a habit of chasing it
          anyway, in robots and restaurants and orthodontics offices and everywhere else it happens to be
          hiding.
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="text-[1.05rem] leading-relaxed text-foreground/90">
          Curiosity and listening carefully will only take you so far. At some point you need the tools to
          actually test whether a business is worth what someone says it's worth, and I don't have those
          tools yet. Recalc's Finance Accelerator teaches accounting fundamentals, business analysis, and
          LBO modeling: the mechanics I've been circling without ever fully picking up. I'm not applying
          because I've already decided private equity is the answer. I'm applying because the qualitative
          half of this question is the half I already know how to do, and I want the other half too.
        </p>
      </Reveal>
    </section>
  );
}
