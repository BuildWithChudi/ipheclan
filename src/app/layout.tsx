import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import MotionProvider from "@/components/MotionProvider";
import Credit from "@/components/Credit";
import "./globals.css";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://ipheclan.com";
const defaultTitle = "Iphe — Creator. Entertainer. Building the Iphe Clan.";
const description =
  "UK-based content creator with 4M+ TikTok followers. Recognised by Meta as a Creator of Tomorrow. Entertainment, humour, and community.";
const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Iphe — UK creator, entertainer, building the Iphe Clan.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Iphe",
  },
  description,
  applicationName: "Iphe Clan",
  authors: [{ name: "Iphe Afolabi" }],
  creator: "Iphe Afolabi",
  publisher: "Iphe Afolabi",
  keywords: [
    "Iphe",
    "Iphe Afolabi",
    "Iphe Clan",
    "UK content creator",
    "TikTok creator",
    "Meta Creator of Tomorrow",
    "Instagram creator",
    "YouTube creator",
    "Snapchat creator",
    "British creator",
    "entertainment",
    "comedy",
    "influencer marketing UK",
    "brand partnerships",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Iphe",
    title: defaultTitle,
    description,
    locale: "en_GB",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: [ogImage.url],
    creator: "@iphe__a",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "N5jZVoxmpAM_0UAD7qTsNfTv4Lg3ELoVrw-kEAPIUbE",
  },
  category: "entertainment",
  other: {
    designer: "Greyform — https://www.greyform.org",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Iphe Afolabi",
  alternateName: ["Iphe", "Ife", "Ife Afolabi", "iphe._a"],
  givenName: "Iphe",
  familyName: "Afolabi",
  url: siteUrl,
  image: `${siteUrl}/og-image.jpg`,
  jobTitle: "Content Creator",
  description:
    "UK-based content creator and entertainer. Recognised by Meta as a Creator of Tomorrow. Building the Iphe Clan — a community of millions across TikTok, Instagram, YouTube, and Snapchat.",
  nationality: "British",
  knowsAbout: [
    "Content creation",
    "Short-form video",
    "Entertainment",
    "Brand partnerships",
    "Community building",
  ],
  sameAs: [
    "https://www.tiktok.com/@iphe._a",
    "https://www.instagram.com/iphe._a",
    "https://youtube.com/@iphe._a",
    "https://snapchat.com/t/U89klCIj",
    "https://www.facebook.com/share/1CZPkTog4v/",
    "https://x.com/iphe__a",
    "https://www.threads.com/@iphe._a",
    "https://whatsapp.com/channel/0029VaiZ0ZDEgGfKjv85gf08",
    "https://discord.gg/WDnXWpt6B",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Iphe",
  url: siteUrl,
  description,
  inLanguage: "en-GB",
  publisher: {
    "@type": "Person",
    name: "Iphe Afolabi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Warm the connection to the video CDN before the reels need it */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="bg-bg text-fg font-sans antialiased">
        <MotionProvider>
          <Loader />
          <SmoothScroll>
            <Cursor />
            <Nav />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </SmoothScroll>
        </MotionProvider>
        <Credit />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
