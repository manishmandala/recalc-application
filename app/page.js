import { HeroSection } from "@/components/hero-section";
import { TimelineSection } from "@/components/timeline-section";
import { WhyThingsWorkSection } from "@/components/why-things-work-section";
import { QuestionSection } from "@/components/question-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <WhyThingsWorkSection />
      <QuestionSection />
      <ContactSection />
    </>
  );
}
