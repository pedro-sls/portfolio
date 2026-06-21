import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.metadata.en.openGraphAlt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const stack = ["Next.js", "React", "Python", "Flask", "PostgreSQL", "AWS"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: 48,
          backgroundColor: "#111111",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          color: "#f6f1e8",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 8,
            background: "rgba(23,23,23,0.92)",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                color: "#8fe3d0",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "#8fe3d0",
                }}
              />
              Software Engineering Portfolio
            </div>
            <div
              style={{
                display: "flex",
                color: "#8d8679",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              pedro-sls
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "#f0c86a",
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              Web Development | Automation | Integrations
            </div>
            <h1
              style={{
                margin: 0,
                color: "#f6f1e8",
                fontSize: 92,
                lineHeight: 1,
                letterSpacing: 0,
                fontWeight: 800,
              }}
            >
              {profile.name}
            </h1>
            <p
              style={{
                display: "flex",
                maxWidth: 780,
                margin: "28px 0 0",
                color: "#c9c2b5",
                fontSize: 31,
                lineHeight: 1.35,
                fontWeight: 500,
              }}
            >
              Building clean web experiences with product thinking, backend
              foundations, and delivery discipline.
            </p>
          </div>

          <div style={{ display: "flex", gap: 14 }}>
            {stack.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(143,227,208,0.36)",
                  borderRadius: 8,
                  background: "#102725",
                  color: "#8fe3d0",
                  padding: "12px 18px",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
