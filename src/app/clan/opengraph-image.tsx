import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "The Iphe Clan — more than followers, a community.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard(
    "Community · Iphe",
    "The Iphe Clan",
    "More than followers. This is a community."
  );
}
