import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import RecognitionMarquee from "@/components/sections/RecognitionMarquee";
import FeaturedVideo from "@/components/sections/FeaturedVideo";
import Frames from "@/components/sections/Frames";
import Intro from "@/components/sections/Intro";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="bg-bg">
      <Hero />
      <SocialProof />
      <RecognitionMarquee />
      <FeaturedVideo />
      <Frames />
      <Intro />
      <CTA />
    </main>
  );
}
