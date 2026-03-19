import type { Metadata } from "next";
import { getAbout } from "@/lib/mdx";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Creative Director based in Los Angeles. 15+ years across film, broadcast, brand identity, and motion graphics.",
};

export default function AboutPage() {
  const { frontmatter: fm, content } = getAbout();

  // Split content at callout markers to interleave callouts
  const paragraphs = content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // We'll interleave callouts after paragraphs 2, 4, 6
  const calloutPositions = [1, 3, 5];

  return (
    <main>
      {/* HERO */}
      <section
        className="about-hero"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "120px 48px 80px",
          borderBottom: "1px solid var(--light-gray)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid-gray)",
            marginBottom: "32px",
            opacity: 0,
            animation: "fadeUp 0.8s ease forwards 0.2s",
          }}
        >
          About
        </p>
        <h1
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(48px, 7vw, 100px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--near-black)",
            marginBottom: "40px",
            opacity: 0,
            animation: "fadeUp 1s ease forwards 0.4s",
          }}
        >
          {fm.headline}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(18px, 2vw, 24px)",
            letterSpacing: "-0.01em",
            color: "var(--mid-gray)",
            opacity: 0,
            animation: "fadeUp 0.8s ease forwards 0.7s",
          }}
        >
          {fm.subhead}
        </p>
      </section>

      {/* BODY WITH CALLOUTS */}
      <section
        className="about-body"
        style={{
          padding: "120px 48px",
          maxWidth: "1100px",
        }}
      >
        {paragraphs.map((para, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "19px",
                lineHeight: 1.75,
                color: "#4A4845",
                marginBottom: "32px",
                maxWidth: "680px",
              }}
            >
              {para}
            </p>

            {calloutPositions.includes(i) &&
              fm.callouts[calloutPositions.indexOf(i)] && (
                <blockquote
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(24px, 3.5vw, 48px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--near-black)",
                    margin: "80px 0",
                    padding: "0",
                    borderLeft: "none",
                    maxWidth: "900px",
                  }}
                >
                  &ldquo;{fm.callouts[calloutPositions.indexOf(i)]}&rdquo;
                </blockquote>
              )}
          </div>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section
        className="about-experience"
        style={{
          padding: "0 48px 120px",
          borderTop: "1px solid var(--light-gray)",
          paddingTop: "80px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "48px",
          }}
        >
          Experience
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {fm.experience.map(({ role, company, years }) => (
            <div
              key={company}
              className="about-experience-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "28px 0",
                borderBottom: "1px solid var(--light-gray)",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2vw, 24px)",
                    letterSpacing: "-0.01em",
                    color: "var(--near-black)",
                    marginBottom: "4px",
                  }}
                >
                  {role}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--mid-gray)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {company}
                </p>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  color: "var(--mid-gray)",
                }}
              >
                {years}
              </p>
            </div>
          ))}
        </div>

        {/* EDUCATION */}
        <p
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "80px",
            marginBottom: "48px",
          }}
        >
          Education
        </p>
        {fm.education.map(({ school, degree, year }) => (
          <div
            key={school}
            className="about-experience-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "28px 0",
              borderBottom: "1px solid var(--light-gray)",
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-bricolage), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  letterSpacing: "-0.01em",
                  color: "var(--near-black)",
                  marginBottom: "4px",
                }}
              >
                {school}
              </p>
              <p style={{ fontSize: "13px", color: "var(--mid-gray)" }}>
                {degree}
              </p>
            </div>
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: "var(--mid-gray)",
              }}
            >
              {year}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div style={{ marginTop: "120px" }}>
          <p
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "var(--near-black)",
              marginBottom: "32px",
            }}
          >
            Let&apos;s build something.
          </p>
          <a
            href="mailto:BrianWadeScott@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "var(--near-black)",
              textDecoration: "none",
              borderBottom: "2px solid var(--near-black)",
              paddingBottom: "4px",
            }}
          >
            BrianWadeScott@gmail.com →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
