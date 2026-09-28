import { FaGears, FaShop, FaBrain } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";

const LENSES = [
  {
    icon: FaGears,
    label: "Engineering",
    title: "Why machines behave",
    body: "Engineering is where I first ran into it. A motor overheating or a sensor giving bad readings is never random. There's a cause, and if you're patient enough you can find it. That taught me to treat a surprise as information instead of bad luck.",
  },
  {
    icon: FaShop,
    label: "Business",
    title: "Why businesses behave",
    body: "In DECA I noticed that two ideas could take the same effort and land in completely different places, and the difference was rarely the idea itself. It was how people reacted to it. This summer I spent time with the owners, staff, and customers of two local businesses, and the most useful thing I did was listen for why people kept coming back, or didn't.",
  },
  {
    icon: FaBrain,
    label: "The Human Brain",
    title: "Why people behave",
    body: "Underneath both is the part I find most interesting: the brain itself. Why people trust some things and not others, why habits stick, why a smart person makes a call that looks irrational from the outside. It's the layer that explains the other two, and it's the one I keep coming back to on my own.",
  },
];

export function WhyThingsWorkSection() {
  return (
    <section id="why-things-work" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-6 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> Why Things Work
      </Reveal>

      <Reveal>
        <p className="mb-12 max-w-[680px] text-[1rem] leading-relaxed text-foreground/90">
          I've always cared more about why something works than about the fact that it does. For a long
          time I assumed that was just an engineering instinct. Looking back, it's closer to psychology:
          almost every system I've gotten hooked on, whether a robot, a business, or a decision, eventually
          comes down to why something, or someone, behaves the way it does.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {LENSES.map((lens, i) => {
          const Icon = lens.icon;
          return (
            <Reveal key={lens.label} delay={0.05 + i * 0.05}>
              <div className="flex h-full flex-col border-l-2 border-brand/40 pl-5">
                <div className="mb-3 flex items-center gap-2.5">
                  <Icon className="h-5 w-5 text-brand" />
                  <span className="font-mono text-[0.68rem] font-bold tracking-[0.06em] text-brand uppercase">
                    {lens.label}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-[1.1rem] font-bold text-foreground">{lens.title}</h3>
                <p className="text-[0.92rem] leading-relaxed text-muted-foreground">{lens.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 max-w-[680px] text-[1rem] leading-relaxed text-foreground/90">
          That's a big part of what draws me to private equity. On paper it's a numbers business. In
          practice, much of what makes a company worth more or less is human: whether management makes good
          calls under pressure, why customers stay, which incentives actually change behavior. You can't
          really understand why a business works without understanding why the people inside it and around
          it act the way they do. I've been asking that kind of question since I was taking apart fan
          remotes. Private equity is the first place I've found where it's the whole job.
        </p>
      </Reveal>
    </section>
  );
}
