import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjectSlugs, getProject, getAllProjects } from "@/lib/mdx";
import ImageLayout from "@/components/ImageLayout";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";
import CaseHeroVideo from "@/components/CaseHeroVideo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = getProject(slug);
  if (!result) return {};
  const { frontmatter: fm } = result;
  return {
    title: `${fm.title} — Brian Wade Scott`,
    description: fm.brief,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const result = getProject(slug);
  if (!result) notFound();

  const { frontmatter: fm } = result;
  const allProjects = getAllProjects();
  const nextProject = allProjects.find((p) => p.slug === fm.nextProject);

  const isDark =
    fm.bg === "#111010" ||
    fm.bg === "#1A0A0A" ||
    fm.bg === "#0A0A0F" ||
    fm.textColor === "#ffffff";

  return (
    <main>
      {/* ── A. HERO ── */}
      <section
        className="case-hero"
        data-nav={isDark ? "dark" : undefined}
        style={{
          minHeight: "100vh",
          background: fm.bg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "120px 48px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Optional: video or still background — per-project (iOS fallback for WebM) */}
        {fm.heroVideo && (
          <CaseHeroVideo
            heroVideo={fm.heroVideo}
            heroVideoMp4={fm.heroVideoMp4}
            heroImage={fm.heroImage}
            bg={fm.bg}
          />
        )}
        {!fm.heroVideo && fm.heroStill && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${fm.heroStill})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, transparent 0%, ${fm.bg} 85%)`,
                pointerEvents: "none",
              }}
            />
          </>
        )}
        {!fm.heroVideo && !fm.heroStill && fm.heroImage && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${fm.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, transparent 0%, ${fm.bg} 85%)`,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        <Link
          href="/#work"
          className="case-hero-back"
          style={{
            position: "absolute",
            top: "120px",
            left: "48px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Work
        </Link>

        <span
          className="case-hero-tag"
          style={{
            position: "absolute",
            top: "120px",
            right: "48px",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: 500,
            background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
          }}
        >
          {fm.tag}
        </span>

        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-10px",
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(80px, 14vw, 200px)",
            color: "transparent",
            WebkitTextStroke: `1px ${fm.accent}20`,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {fm.title.toUpperCase().split("&")[0].trim()}
        </span>

        <h1
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(52px, 8vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: fm.textColor,
            position: "relative",
            zIndex: 1,
            opacity: 0,
            animation: "fadeUp 1s ease forwards 0.3s",
          }}
        >
          {fm.title}
        </h1>

        <p
          style={{
            marginTop: "24px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
            opacity: 0,
            animation: "fadeUp 0.8s ease forwards 0.6s",
          }}
        >
          {fm.client} · {fm.year}
        </p>
      </section>

      {/* ── B. POSITION STATEMENT ── */}
      <section
        className="case-statement"
        data-nav={isDark ? "dark" : undefined}
        style={{
          padding: "120px 48px",
          background: fm.bg,
          borderTop: `1px solid ${fm.accent}20`,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(22px, 3.5vw, 48px)",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            color: fm.textColor,
            maxWidth: "900px",
            opacity: 0.85,
          }}
        >
          {fm.statementHighlight ? (
            <>
              {fm.statement.split(fm.statementHighlight)[0]}
              <span style={{ color: fm.accent }}>{fm.statementHighlight}</span>
              {fm.statement.split(fm.statementHighlight)[1]}
            </>
          ) : (
            fm.statement
          )}
        </p>
      </section>

      {/* ── C. INFO BAR ── */}
      <section
        className="info-bar"
        style={{
          padding: "32px 48px",
          background: isDark ? fm.bg : "var(--off-white)",
          borderTop: `1px solid ${isDark ? `${fm.accent}20` : "var(--light-gray)"}`,
          borderBottom: `1px solid ${isDark ? `${fm.accent}20` : "var(--light-gray)"}`,
          display: "flex",
          gap: "0",
        }}
      >
        {[
          { label: "Client", value: fm.client },
          { label: "Role", value: fm.role },
          { label: "Year", value: String(fm.year) },
          { label: "Category", value: fm.tag },
        ].map(({ label, value }, i, arr) => (
          <div
            key={label}
            style={{
              flex: 1,
              padding: "0 32px",
              borderRight:
                i < arr.length - 1
                  ? `1px solid ${isDark ? `${fm.accent}20` : "var(--light-gray)"}`
                  : "none",
              paddingLeft: i === 0 ? 0 : "32px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
                marginBottom: "6px",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: isDark ? fm.textColor : "var(--near-black)",
                lineHeight: 1.4,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </section>

      {/* ── D. VISUALS (before brief for mobile-friendly flow) ── */}
      <section
        className="case-images-section"
        style={{
          padding: "80px 48px 48px",
          background: isDark ? fm.bg : undefined,
        }}
      >
        <ImageLayout images={fm.images} accent={fm.accent} isDark={isDark} />
        {/* Divider: matches work-header style, no margin (padding above creates gap) */}
        <div
          className="work-header case-brief-divider"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginTop: "48px",
            marginBottom: 0,
            paddingBottom: "20px",
            borderBottom: isDark ? `1px solid ${fm.accent}40` : "1px solid var(--light-gray)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.9)" : "var(--near-black)",
            }}
          >
            About
          </span>
        </div>
      </section>

      {/* ── E. BRIEF + ROLE (or CONCEPT) ── */}
      <section
        className="brief-role-section"
        style={{
          padding: "0 48px 120px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          background: isDark ? fm.bg : undefined,
        }}
      >
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
              marginBottom: "24px",
            }}
          >
            The Brief
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              lineHeight: 1.7,
              color: isDark ? "rgba(255,255,255,0.85)" : "#4A4845",
            }}
          >
            {fm.brief}
          </p>
        </div>
        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
              marginBottom: "24px",
            }}
          >
            {fm.concept ? "The Concept" : "My Role"}
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              lineHeight: 1.7,
              color: isDark ? "rgba(255,255,255,0.85)" : "#4A4845",
            }}
          >
            {fm.concept || fm.roleDetail}
          </p>
        </div>
      </section>

      {/* ── E2. PRODUCTION (optional) ── */}
      {fm.production && (
        <section
          className="production-section"
          data-nav={isDark ? "dark" : undefined}
          style={{
            padding: "120px 48px",
            background: fm.bg,
            borderTop: `1px solid ${fm.accent}20`,
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
              marginBottom: "24px",
            }}
          >
            The Production
          </p>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "17px",
              lineHeight: 1.7,
              color: isDark ? "rgba(255,255,255,0.85)" : "#4A4845",
              maxWidth: "720px",
            }}
          >
            {fm.production}
          </p>
        </section>
      )}

      {/* ── F. OUTCOME ── */}
      <section
        className="case-outcome"
        data-nav={isDark ? "dark" : undefined}
        style={{
          padding: "120px 48px",
          background: fm.bg,
          borderTop: `1px solid ${fm.accent}20`,
        }}
      >
        {fm.stats && fm.stats.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${fm.stats.length}, 1fr)`,
              gap: "48px",
              marginBottom: "80px",
            }}
          >
            {fm.stats.map(({ value, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "var(--font-bricolage), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(36px, 4vw, 56px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: "8px",
                    color: fm.textColor,
                  }}
                >
                  {value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: isDark
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.4)",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        )}

        <p
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(20px, 2.5vw, 32px)",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: fm.textColor,
            maxWidth: "600px",
            opacity: 0.75,
          }}
        >
          {fm.outcome}
        </p>
      </section>

      {/* ── G. NEXT PROJECT ── */}
      {nextProject && <NextProjectLink project={nextProject} />}

      <Footer />
    </main>
  );
}
