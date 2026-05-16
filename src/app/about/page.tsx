import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import Story from "@/components/sections/about/Story";
import Different from "@/components/sections/about/Different";
import ClanTeaser from "@/components/sections/about/ClanTeaser";
import Closing from "@/components/sections/about/Closing";

const title = "About";
const description =
  "Iphe is a UK-based content creator and entertainer recognised by Meta as a Creator of Tomorrow. More than content — personality, culture, and connection.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${title} | Iphe`,
    description,
    url: "/about",
    type: "profile",
  },
  twitter: {
    title: `${title} | Iphe`,
    description,
  },
};

export default function AboutPage() {
  return (
    <main className="bg-bg">
      <AboutHero />
      <Story />
      <Different />
      <ClanTeaser />
      <Closing />
    </main>
  );
}
