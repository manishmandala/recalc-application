import { FaUtensils, FaTooth, FaCheck } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const BUSINESSES = [
  {
    icon: FaTooth,
    name: "An Orthodontics Practice",
    kind: "Established",
    intro: "Owner-run, steady patient base, looking for ways to stand out in a crowded neighborhood.",
    worked: [
      "A TikTok marketing push",
      "A promotion sending part of its proceeds to a cause the patient picked",
      "Software to speed up day-to-day operations",
      "A website with a built-in chatbot",
    ],
    takeaway: "The donation promotion got a genuinely warm response. I can't point to a number, but I can tell you people noticed.",
  },
  {
    icon: FaUtensils,
    name: "A Neighborhood Steakhouse",
    kind: "New",
    intro: "Still finding its own identity, with an evening crowd that hadn't settled into a pattern yet.",
    worked: [
      "A menu review for items dragging on the kitchen",
      "Early customer feedback, watching for patterns before they hardened into habits",
      "Ideas for using the space differently by hour, including a bar night with its own atmosphere",
    ],
    takeaway: "I didn't run the restaurant. I tried to notice what it was already telling us, if anyone bothered to listen.",
  },
];

export function LocalBusinessSection() {
  return (
    <section id="local-business" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-6 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> This Summer
      </Reveal>

      <Reveal>
        <p className="mb-12 max-w-[680px] text-[1rem] leading-relaxed text-foreground/90">
          Two very different businesses let me in, and I worked directly with both owners. With both, the
          method was the same even when the businesses weren't: sit with staff to hear where the friction
          actually was, not where I assumed it would be, and gather customer feedback on what kept people
          coming back. Listening carefully turned out to be the transferable skill. What to do with what I
          heard wasn't.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {BUSINESSES.map((biz, i) => {
          const Icon = biz.icon;
          return (
            <Reveal key={biz.name} delay={0.05 + i * 0.05}>
              <TiltCard className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 hover:border-brand hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)]">
                <div className="mb-4 flex items-start justify-between">
                  <Icon className="h-6 w-6 text-brand" />
                  <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold tracking-[0.04em] text-muted-foreground uppercase">
                    {biz.kind}
                  </span>
                </div>
                <h3 className="mb-1.5 font-display text-[1.15rem] font-bold text-foreground">{biz.name}</h3>
                <p className="mb-4 text-[0.88rem] text-muted-foreground/80">{biz.intro}</p>

                <span className="mb-2 font-mono text-[0.68rem] font-bold tracking-[0.06em] text-brand uppercase">
                  What I worked on
                </span>
                <ul className="mb-5 flex flex-col gap-2">
                  {biz.worked.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.88rem] text-muted-foreground">
                      <FaCheck className="mt-1 h-2.5 w-2.5 shrink-0 text-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-auto border-t border-border pt-4 text-[0.85rem] leading-relaxed text-muted-foreground/90 italic">
                  {biz.takeaway}
                </p>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
