import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "OdinCodex — Sistemas de gestión con tu marca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens (src/app/globals.css). Satori cannot read CSS variables.
const NIGHT = "#0e1a1c";
const SURFACE = "#13252a";
const PARCHMENT = "#e8e4da";
const MIST = "#a9b8b5";
const BRONZE = "#c08a4e";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/images/logo-mark.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: NIGHT,
          padding: "0 88px",
          borderBottom: `12px solid ${BRONZE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 288,
            height: 288,
            borderRadius: 40,
            backgroundColor: SURFACE,
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={232} height={232} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 64,
          }}
        >
          <div
            style={{
              fontSize: 96,
              color: PARCHMENT,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            OdinCodex
          </div>
          <div
            style={{
              fontSize: 40,
              color: BRONZE,
              marginTop: 28,
              lineHeight: 1.2,
            }}
          >
            Sistemas de gestión con tu marca
          </div>
          <div
            style={{
              fontSize: 28,
              color: MIST,
              marginTop: 36,
            }}
          >
            odincodex.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
