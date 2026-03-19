"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <section
      id="contact"
      className="footer-section"
      data-nav="dark"
      style={{
        padding: "120px 48px",
        background: "var(--near-black)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ghost text */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-20px",
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(100px, 18vw, 260px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          letterSpacing: "-0.04em",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        LET&apos;S BUILD
      </span>

      <div
        className="footer-content"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: "24px",
            }}
          >
            Currently available for select projects
          </p>
          <h2
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "white",
              marginBottom: "48px",
            }}
          >
            Let&apos;s build
            <br />
            something.
          </h2>
          <a
            href="mailto:BrianWadeScott@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(14px, 1.5vw, 20px)",
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.02em",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "8px",
              transition: "border-color 0.3s ease, gap 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "white";
              el.style.gap = "24px";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.gap = "16px";
            }}
          >
            BrianWadeScott@gmail.com →
          </a>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              lineHeight: 2.4,
            }}
          >
            Los Angeles, CA
            <br />
            <Link
              href="https://linkedin.com/in/BrianWadeScott"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.25)")
              }
            >
              LinkedIn
            </Link>
            <br />
            <Link
              href="https://brianwadescott.com"
              style={{
                color: "rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.7)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.25)")
              }
            >
              BrianWadeScott.com
            </Link>
            <br />
            <br />© {new Date().getFullYear()} Brian Wade Scott
          </p>
        </div>
      </div>
    </section>
  );
}
