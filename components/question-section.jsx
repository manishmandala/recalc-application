import { Reveal } from "@/components/reveal";

export function QuestionSection() {
  return (
    <section id="question" className="container mx-auto max-w-[760px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-10 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> The Question I'm Chasing
      </Reveal>

      <Reveal>
        <p className="mb-4 text-[0.95rem] text-muted-foreground">
          Line all of this up and it's the same question wearing different clothes.
        </p>
        <blockquote className="mb-8 border-l-2 border-brand pl-5 font-display text-[clamp(1.3rem,3.2vw,1.7rem)] font-bold leading-tight text-foreground">
          What actually makes a business work?
        </blockquote>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          Not the answer you'd give to sound sharp in an interview, but the real one, the kind you only get
          to by listening long enough and testing enough small assumptions that you eventually run out of
          the wrong ones. I don't have that answer yet. I have a habit of chasing it anyway, in robots and
          restaurants and orthodontics offices and everywhere else it happens to be hiding.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          There's a more practical reason private equity pulls at me too. It puts you in a fast-paced
          environment where you run into a different business's problems every few weeks instead of just
          one, and that density of exposure is hard to manufacture any other way. I've tried building small
          businesses of my own before and I intend to again. I'd rather walk into that next attempt having
          already seen a few hundred ways a business can go sideways, not just the handful I've hit on my
          own.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
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
