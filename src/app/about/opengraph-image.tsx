import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "About Iphe — personality, culture, and connection.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard(
    "About · Iphe",
    "About Iphe",
    "More than content — personality, culture, and connection."
  );
}
