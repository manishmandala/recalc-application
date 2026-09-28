import { HeroSection } from "@/components/hero-section";
import { TimelineSection } from "@/components/timeline-section";
import { WhyThingsWorkSection } from "@/components/why-things-work-section";
import { LongGameSection } from "@/components/long-game-section";
import { LearningSection } from "@/components/learning-section";
import { QuestionSection } from "@/components/question-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <WhyThingsWorkSection />
      <LongGameSection />
      <LearningSection />
      <QuestionSection />
      <ContactSection />
    </>
  );
}
