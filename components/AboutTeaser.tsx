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
        alignItems: "start",
      }}
    >
      <div style={{ order: 0 }}>
        <div
          className="about-header"
          style={{
            marginBottom: "64px",
            paddingBottom: "20px",
            borderBottom: "1px solid var(--light-gray)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--near-black)",
            }}
          >
            About
          </p>
        </div>
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
        className="about-teaser-bento"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "20px",
          minHeight: "340px",
          order: 1,
        }}
      >
        <div
          className="bento-card bento-card-tall"
          style={{
            gridRow: "1 / -1",
            padding: "32px",
            background: "var(--accent)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 22px)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "var(--near-black)",
            }}
          >
            Film/Television
          </h3>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "#4A4845",
            }}
          >
            Title sequences, motion graphics, and visual effects for features and
            broadcast. From indie documentaries to studio releases.
          </p>
          <div
            style={{
              marginTop: "20px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#4A4845",
              opacity: 0.9,
            }}
          >
            <p style={{ marginBottom: "8px" }}>
              <strong>Credits include:</strong>
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: 0,
                listStyle: "none",
              }}
            >
              {["It Chapter 2", "Avengers: Age of Ultron", "FastX", "Balance", "Arrow", "The Flash"].map(
                (title) => (
                  <li
                    key={title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--near-black)",
                        fontSize: "10px",
                        opacity: 0.6,
                      }}
                    >
                      ›
                    </span>
                    <span>{title}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div
          className="bento-card"
          style={{
            padding: "32px",
            background: "var(--near-black)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 22px)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
            }}
          >
            Advertising
          </h3>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Broadcast campaigns, Super Bowl spots, Times Square, and brand
            launches for some of the most recognizable names in the world.
          </p>
        </div>
        <div
          className="bento-card"
          style={{
            padding: "32px",
            background: "var(--accent)",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(18px, 2vw, 22px)",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "var(--near-black)",
            }}
          >
            Brand Storytelling
          </h3>
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: "#4A4845",
            }}
          >
            Visual identity systems and brand worlds built to move across
            digital, broadcast, and physical environments.
          </p>
        </div>
      </div>
    </section>
  );
}
