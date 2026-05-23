import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const size = Number(req.nextUrl.searchParams.get("size") ?? "192");
  const clampedSize = [192, 512].includes(size) ? size : 192;

  const fontSize = Math.round(clampedSize * 0.38);
  const letterSpacing = Math.round(clampedSize * -0.02);

  return new ImageResponse(
    (
      <div
        style={{
          width: clampedSize,
          height: clampedSize,
          background: "#0058bc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: clampedSize * 0.22,
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize,
            fontWeight: 700,
            letterSpacing,
            fontFamily: "sans-serif",
          }}
        >
          W
        </span>
      </div>
    ),
    { width: clampedSize, height: clampedSize }
  );
}
