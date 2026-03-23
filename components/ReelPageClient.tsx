"use client";

import ReelSection from "@/components/ReelSection";
import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";
import Link from "next/link";

export default function ReelPageClient() {
  return (
    <main style={{ background: "#111010" }}>
      {/* Compressed hero — 45vh, matches homepage hero typography/animation */}
      <section
        className="hero-section reel-hero-section"
        data-nav="dark"
        style={{
          minHeight: "45vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "var(--nav-height) 48px 48px",
          position: "relative",
          overflow: "hidden",
          background: "#111010",
        }}
      >
        {/* Background video — same source as homepage, shorter falloff for 45vh */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <HeroBackgroundVideo compact />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: "16px",
              opacity: 0,
              animation: "fadeUp 0.8s ease forwards 0.3s",
            }}
          >
            Creative Director — Los Angeles
          </p>

          <h1
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "24px",
              opacity: 0,
              animation: "fadeUp 1s ease forwards 0.5s",
            }}
          >
            Brian
            <br />
            Wade
            <br />
            Scott
          </h1>

          <p
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(16px, 2vw, 24px)",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.01em",
              opacity: 0,
              animation: "fadeUp 0.8s ease forwards 0.9s",
            }}
          >
            I build worlds.
            <br />
            Some of them move.
          </p>
        </div>
      </section>

      <ReelSection standalone />

      {/* Email — footer treatment */}
      <div
        data-nav="dark"
        className="reel-page-email"
        style={{
          padding: "80px 48px 120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#111010",
        }}
      >
        <Link
          href="mailto:brianwadescott@gmail.com"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
          }}
        >
          brianwadescott@gmail.com
        </Link>
      </div>
    </main>
  );
}
