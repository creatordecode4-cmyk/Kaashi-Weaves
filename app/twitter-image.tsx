import { ImageResponse } from "next/og";

export const alt = "Kaashi Weaves — Festive Edit 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#faf6ef",
          background:
            "radial-gradient(80% 90% at 85% 15%, rgba(176,141,87,0.55) 0%, transparent 60%), linear-gradient(140deg, #3d0f1c 0%, #5a1a2b 60%, #7a2e42 100%)",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 8, color: "#d4bc8f", textTransform: "uppercase" }}>
          Varanasi · Est. 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1 }}>Kaashi Weaves</div>
          <div style={{ marginTop: 24, fontSize: 40, color: "#d4bc8f", fontStyle: "italic" }}>Festive Edit 2026</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(250,246,239,0.7)" }}>
          <span>Banarasi ethnic &amp; modern fusion</span>
          <span>Concept design project</span>
        </div>
      </div>
    ),
    size,
  );
}
