import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/content";

export const alt = `${siteConfig.name} — Chartered Accountants for Ambitious UK Businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          color: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div style={{ display: "flex", fontSize: "52px", fontWeight: 700, letterSpacing: "-2px" }}>
            MMR
          </div>
          <div style={{ display: "flex", height: "56px", width: "2px", background: "#8b6a3d" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ fontSize: "20px", letterSpacing: "8px", fontWeight: 600 }}>ACCOUNTANTS</div>
            <div style={{ fontSize: "14px", letterSpacing: "5px", color: "#8b6a3d" }}>
              TAX | ADVISORY | PAYROLL
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: "90px", height: "2px", background: "#8b6a3d", marginBottom: "28px" }} />
          <div style={{ fontSize: "66px", fontWeight: 600, lineHeight: 1.08, letterSpacing: "-2px", maxWidth: "920px" }}>
            Accountancy that moves your business forward
          </div>
          <div style={{ marginTop: "26px", fontSize: "27px", color: "#5c574e" }}>
            Chartered accountants · Fixed monthly fees · UK-wide
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px", color: "#8b6a3d", letterSpacing: "1px" }}>
          <div style={{ display: "flex", width: "10px", height: "10px", background: "#8b6a3d" }} />
          www.mmraccountants.co.uk
        </div>
      </div>
    ),
    { ...size }
  );
}
