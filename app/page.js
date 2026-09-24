import { HeroSection } from "@/components/hero-section";
import { TimelineSection } from "@/components/timeline-section";
import { LocalBusinessSection } from "@/components/local-business-section";
import { QuestionSection } from "@/components/question-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TimelineSection />
      <LocalBusinessSection />
      <QuestionSection />
      <ContactSection />
    </>
  );
}
