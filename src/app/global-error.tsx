"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && error) {
      // eslint-disable-next-line no-console
      console.error("[global-boundary]", error.digest ?? "", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#F5F5F5",
          background:
            "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 70%)",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#888",
            margin: 0,
          }}
        >
          Resetting the frame
        </p>
        <h1
          style={{
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: "1.5rem 0 0",
            fontWeight: 400,
          }}
        >
          One Moment.
        </h1>
        <p
          style={{
            maxWidth: "28rem",
            marginTop: "2rem",
            color: "#A0A0A0",
            fontSize: "1rem",
            lineHeight: 1.5,
          }}
        >
          Recalibrating the scene. Stay close — we&apos;ll have you back in a
          beat.
        </p>
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => reset()}
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "9999px",
              background: "#E8E0D0",
              color: "#0A0A0A",
              border: "none",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Continue
          </button>
          <a
            href="/"
            style={{
              padding: "0.85rem 1.75rem",
              borderRadius: "9999px",
              border: "1px solid rgba(245,245,245,0.8)",
              color: "#F5F5F5",
              textDecoration: "none",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Back to start
          </a>
        </div>
      </body>
    </html>
  );
}
