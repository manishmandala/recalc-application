import { Reveal } from "@/components/reveal";

export function QuestionSection() {
  return (
    <section id="question" className="container mx-auto max-w-[760px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-10 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">03.</span> Why PE, VC, and Recalc
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
          The mindset I bring to that question started somewhere unlikely: rebuilding teams in FIFA's
          manager mode, deciding where a limited budget would do the most good and finding out a season
          later whether I was right. I took it onto the soccer field, then into DECA, then into engineering
          and into how people think and make decisions. The subject kept changing. The habit didn't: look at
          the whole system, find what's really driving it, and put resources where they matter most.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          That's close to a literal description of private equity. You take a business that could be doing
          better, figure out what's working and what isn't, and back the changes with real capital and a
          real deadline. It also puts you in front of a different business's problems every few weeks
          instead of just one, and that kind of exposure is hard to get any other way. I've tried building
          small businesses of my own before and I intend to again, and I'd rather go into that next attempt
          having already seen a few hundred ways a business can go sideways.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          Venture capital is the other half of the same game. Instead of fixing something that already
          exists, you're betting on something before it's proven, which means judging people and markets
          as much as numbers. That's where the psychology side pulls at me most: why a founder makes the
          calls they make, and why customers will or won't show up for something new.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <p className="mb-6 text-[1.05rem] leading-relaxed text-foreground/90">
          What I don't have yet are the tools to test whether a business is actually worth what someone says
          it's worth. Recalc's Finance Accelerator teaches accounting fundamentals, business analysis, and
          LBO modeling: the mechanics I've been circling without ever fully picking up. The qualitative half
          of this question is the half I've begun to learn. I want to start on the other half too.
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="text-[1.05rem] leading-relaxed text-foreground/90">
          I also want to be a good member of the community, not just a student in it. Phi Chi Theta taught me
          that I learn fastest in a room of sharp people who ask questions out loud, and I try to be one of
          them. I'd bring an engineer's habit of asking why a model says what it says, a willingness to be
          wrong in front of people if it gets us to the right answer faster, and a real interest in how
          everyone else in the cohort got to the same place from a completely different starting point.
        </p>
      </Reveal>
    </section>
  );
}
