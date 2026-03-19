"use client";

import Link from "next/link";

export default function AboutTeaser() {
  return (
    <section
      id="about"
      className="about-teaser-section"
      style={{
        padding: "140px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "120px",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid-gray)",
            marginBottom: "32px",
          }}
        >
          About
        </p>
        <h2
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(36px, 4.5vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          Creative
          <br />
          Director.
          <br />
          LA-based.
        </h2>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#4A4845",
            maxWidth: "460px",
          }}
        >
          I got into this because I love making things. My background is in
          motion — title sequences, broadcast, VFX — but what I&apos;m really
          interested in is the whole picture. The strategy behind the image. The
          system behind the moment.
        </p>
        <Link
          href="/about"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "40px",
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--near-black)",
            textDecoration: "none",
            borderBottom: "2px solid var(--near-black)",
            paddingBottom: "4px",
            transition: "gap 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.gap = "20px")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.gap = "12px")
          }
        >
          Full Story →
        </Link>
      </div>

      <div
        className="about-teaser-stats"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {[
          {
            number: "15+",
            label: "Years directing creative work",
            dark: false,
            offsetTop: 0,
          },
          {
            number: "$15M+",
            label: "Revenue impact at RECUR",
            dark: true,
            offsetTop: 32,
          },
          {
            number: "20+",
            label: "Person teams led",
            dark: false,
            offsetTop: -32,
          },
          {
            number: "ArtCenter",
            label: "BFA Illustration, Honors",
            dark: false,
            offsetTop: 0,
          },
        ].map(({ number, label, dark, offsetTop }) => (
          <div
            key={number}
            style={{
              padding: "36px",
              background: dark ? "var(--near-black)" : "var(--accent)",
              borderRadius: "4px",
              marginTop: `${offsetTop}px`,
              color: dark ? "white" : "inherit",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "8px",
                color: dark ? "white" : "var(--near-black)",
              }}
            >
              {number}
            </p>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: dark ? "rgba(255,255,255,0.4)" : "var(--mid-gray)",
                lineHeight: 1.5,
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
