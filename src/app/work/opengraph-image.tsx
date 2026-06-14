import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const runtime = "edge";
export const alt = "Work with Iphe — attention that turns into impact.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard(
    "Work · Iphe",
    "Work With Iphe",
    "Partner with a creator who turns attention into impact."
  );
}
