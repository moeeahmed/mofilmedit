import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "mofilmedit - Cinematic Videographer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "longlogo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 80,
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          CINEMATIC VIDEOGRAPHER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={1040} height={99} alt="" />
          <div
            style={{
              display: "flex",
              marginTop: 44,
              fontSize: 34,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Blending creativity and storytelling into cinematic visuals.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Birmingham · London · UK-wide  |  mofilmedit.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
