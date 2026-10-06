import { ImageResponse } from "next/og";

export const alt = "NEXORA AI SECURITY";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0a0f1c",
          color: "#e6edf7",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>
          NEXORA AI SECURITY
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#4f8cff",
            marginTop: 24,
            display: "flex",
          }}
        >
          BUILD. SECURE. AUTOMATE.
        </div>
      </div>
    ),
    size
  );
}