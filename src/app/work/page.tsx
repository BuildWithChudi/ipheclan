import type { Metadata } from "next";
import WorkHero from "@/components/sections/work/WorkHero";
import WorkIntro from "@/components/sections/work/WorkIntro";
import Services from "@/components/sections/work/Services";
import Audience from "@/components/sections/work/Audience";
import WhyWork from "@/components/sections/work/WhyWork";
import FinalCTA from "@/components/sections/work/FinalCTA";

const title = "Work With Me";
const description =
  "Partner with Iphe — a UK creator with millions watching across TikTok, Instagram, YouTube, and Snapchat. TikTok campaigns, Instagram Reels, YouTube integrations, and bespoke content.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work" },
  keywords: [
    "Iphe partnerships",
    "UK influencer marketing",
    "TikTok campaigns",
    "Instagram Reels",
    "YouTube integrations",
    "brand partnerships",
    "creator collaborations",
  ],
  openGraph: {
    title: `${title} | Iphe`,
    description,
    url: "/work",
    type: "website",
  },
  twitter: {
    title: `${title} | Iphe`,
    description,
  },
};

export default function WorkPage() {
  return (
    <main className="bg-bg">
      <WorkHero />
      <WorkIntro />
      <Services />
      <Audience />
      <WhyWork />
      <FinalCTA />
    </main>
  );
}
