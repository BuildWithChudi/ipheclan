import type { Metadata } from "next";
import ClanHero from "@/components/sections/clan/ClanHero";
import ClanIntro from "@/components/sections/clan/ClanIntro";
import WhatIsTheClan from "@/components/sections/clan/WhatIsTheClan";
import WhyJoin from "@/components/sections/clan/WhyJoin";
import Moments from "@/components/sections/clan/Moments";
import JoinTheClan from "@/components/sections/clan/JoinTheClan";
import Closing from "@/components/sections/clan/Closing";

const title = "The Clan";
const description =
  "The Iphe Clan is more than followers — a growing community of fans, friends, and collaborators. Join on WhatsApp, Snapchat, Instagram, or YouTube.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/clan" },
  keywords: [
    "Iphe Clan",
    "creator community",
    "join Iphe",
    "WhatsApp community",
    "Snapchat community",
    "fan community",
  ],
  openGraph: {
    title: `${title} | Iphe`,
    description,
    url: "/clan",
    type: "website",
  },
  twitter: {
    title: `${title} | Iphe`,
    description,
  },
};

export default function ClanPage() {
  return (
    <main className="bg-bg">
      <ClanHero />
      <ClanIntro />
      <WhatIsTheClan />
      <WhyJoin />
      <Moments />
      <JoinTheClan />
      <Closing />
    </main>
  );
}
