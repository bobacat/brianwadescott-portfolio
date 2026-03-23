"use client";

import { useRef, useState, useCallback } from "react";
import { HERO_VIDEO_URL } from "@/components/HeroBackgroundVideo";

interface HeroProps {
  onReelClick?: () => void;
}

export default function Hero({ onReelClick }: HeroProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hasVideo = Boolean(HERO_VIDEO_URL);
  const [cursorVisible, setCursorVisible] = useState(false);

  function handleReelClick() {
    if (onReelClick) {
      onReelClick();
    } else {
      const el = document.getElementById("reel");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Update cursor position directly on the DOM — no React state, no re-renders
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cursorRef.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  return (
    <section
      className="hero-section"
      data-nav={hasVideo ? "dark" : undefined}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 48px 64px",
        position: "relative",
        overflow: "hidden",
        background: hasVideo ? "#0a0a0a" : "var(--off-white)",
      }}
    >
      {/* ── BACKGROUND VIDEO ── */}
      {hasVideo && (
        <button
          onClick={handleReelClick}
          onMouseMove={onMouseMove}
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          aria-label="Watch reel"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            padding: 0,
            background: "none",
            cursor: "none",
            zIndex: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
              pointerEvents: "none",
            }}
          >
            <source src={HERO_VIDEO_URL} type="video/webm" />
          </video>

          {/* Gradient overlay */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ── CUSTOM CURSOR ── */}
          <div
            ref={cursorRef}
            className="hero-cursor"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              // Centered on the pointer via negative margin
              width: "110px",
              height: "110px",
              marginLeft: "-55px",
              marginTop: "-55px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              pointerEvents: "none",
              opacity: cursorVisible ? 1 : 0,
              transition: "opacity 0.2s ease",
              willChange: "transform",
            }}
          >
            {/* Play triangle */}
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M0 0L14 8L0 16V0Z" fill="rgba(255,255,255,0.9)" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.8)",
                whiteSpace: "nowrap",
              }}
            >
              Watch Reel
            </span>
          </div>
        </button>
      )}

      {/* ── TEXT CONTENT ── */}
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}>
        <p
          className="hero-subhead"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: hasVideo ? "rgba(255,255,255,0.5)" : "var(--mid-gray)",
            marginBottom: "24px",
            opacity: 0,
            animation: "fadeUp 0.8s ease forwards 0.3s",
          }}
        >
          Creative Director —
          <br className="hero-subhead-br" />
          Los Angeles
        </p>

        <h1
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(72px, 10vw, 140px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: hasVideo ? "#ffffff" : "var(--near-black)",
            marginBottom: "48px",
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

        <div
          className="hero-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            opacity: 0,
            animation: "fadeUp 0.8s ease forwards 0.9s",
          }}
        >
          <p
            className="hero-manifesto"
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(18px, 2.5vw, 28px)",
              color: hasVideo ? "rgba(255,255,255,0.9)" : "var(--near-black)",
              letterSpacing: "-0.01em",
              maxWidth: "420px",
            }}
          >
            I build worlds.
            <br />
            Some of them move.
          </p>

          <div className="hero-meta" style={{ textAlign: "right" }}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: hasVideo ? "rgba(255,255,255,0.4)" : "var(--mid-gray)",
                lineHeight: 2,
              }}
            >
              15+ Years
              <br />
              Motion · Brand · VFX
              <br />
              Film · TV · Advertising
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "48px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: hasVideo ? "rgba(255,255,255,0.3)" : "var(--mid-gray)",
          opacity: 0,
          animation: "fadeUp 0.8s ease forwards 1.4s",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            width: "40px",
            height: "1px",
            background: hasVideo
              ? "rgba(255,255,255,0.3)"
              : "var(--mid-gray)",
            display: "block",
          }}
        />
        Scroll
      </div>
    </section>
  );
}
