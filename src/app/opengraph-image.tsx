import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "Iphe — Creator. Entertainer. Building the Iphe Clan.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard(
    "Iphe · Official",
    "Iphe",
    "Creator. Entertainer. Building the Iphe Clan."
  );
}
