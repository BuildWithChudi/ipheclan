import { ImageResponse } from "next/og";

// Shared generator for the dynamic social share cards (1200x630).
// No external font fetch — uses next/og's built-in font so the card can
// never fail to render at request time (launch-safe). Brand palette only.

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogCard(label: string, title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6B6B6B",
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          <span>{label}</span>
          <div style={{ display: "flex", width: 26, height: 26, backgroundColor: "#EAFE07" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              color: "#FAFAFA",
              textTransform: "uppercase",
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "#9B9B9B",
              maxWidth: 920,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#FAFAFA" }}>ipheclan.com</span>
          <span style={{ color: "#6B6B6B" }}>4M+ across platforms</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
