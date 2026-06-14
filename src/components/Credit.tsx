"use client";

import { useEffect } from "react";

/**
 * A quiet signature for the curious. Anyone who opens DevTools to see
 * "who built this" lands here. Renders nothing to the page.
 */
export default function Credit() {
  useEffect(() => {
    const label =
      "background:#EAFE07;color:#0A0A0A;font-weight:700;" +
      "padding:6px 10px;border-radius:4px;font-family:monospace;letter-spacing:0.5px;";
    const line = "color:#6B6B6B;font-family:monospace;font-size:12px;";

    // eslint-disable-next-line no-console
    console.log("%cBuilt by Greyform", label);
    // eslint-disable-next-line no-console
    console.log(
      "%cDesign & build → %chttps://www.greyform.org",
      line,
      "color:#FAFAFA;font-family:monospace;font-size:12px;"
    );
  }, []);

  return null;
}
