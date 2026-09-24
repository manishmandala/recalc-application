import { FaUtensils, FaTooth } from "react-icons/fa6";
import { Reveal } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

export function LocalBusinessSection() {
  return (
    <section id="local-business" className="container mx-auto max-w-[1080px] border-t border-border px-6 py-24">
      <Reveal as="h2" className="mb-6 flex items-baseline gap-2.5 font-display text-[clamp(1.6rem,4vw,2rem)] font-extrabold tracking-[-0.01em]">
        <span className="font-mono text-[1.1rem] font-semibold text-brand">02.</span> This Summer
      </Reveal>

      <Reveal>
        <p className="mb-12 max-w-[680px] text-[1rem] leading-relaxed text-foreground/90">
          Two very different businesses let me in: a neighborhood steakhouse still finding its footing, and
          an established orthodontics practice. I worked directly with both owners. With both, the method
          was the same even when the businesses weren't. I sat with staff to hear where the friction
          actually was, not where I assumed it would be, and I gathered feedback from customers about what
          kept them coming back and what didn't. Listening carefully turned out to be the transferable
          skill. What to do with what I heard wasn't.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Reveal delay={0.05}>
          <TiltCard className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 hover:border-brand hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)]">
            <FaTooth className="mb-4 h-6 w-6 text-brand" />
            <h3 className="mb-3 font-display text-[1.15rem] font-bold text-foreground">
              An Orthodontics Practice
            </h3>
            <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
              I worked on a handful of concrete ideas here: a TikTok marketing push, a promotion that sent
              part of its proceeds to a cause the customer picked, software meant to speed up day-to-day
              operations, and a website with a chatbot built in. The donation promotion got a genuinely warm
              response from patients. I can't tell you it moved a number, because I don't have one to point
              to. I can tell you people noticed.
            </p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltCard className="flex h-full flex-col rounded-lg border border-border bg-card p-7 shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-[border-color,box-shadow] duration-200 hover:border-brand hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)]">
            <FaUtensils className="mb-4 h-6 w-6 text-brand" />
            <h3 className="mb-3 font-display text-[1.15rem] font-bold text-foreground">
              A Neighborhood Steakhouse
            </h3>
            <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
              Still new enough to be figuring out its own identity, this one had me going through the menu
              looking for items that seemed to be dragging on the kitchen, collecting early customer
              feedback to catch patterns before they hardened into habits, and working on ways to use the
              space differently depending on the hour, including a bar night built around a different kind
              of evening altogether. I didn't run the restaurant. I tried to notice what the restaurant was
              already telling us, if anyone bothered to listen.
            </p>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
