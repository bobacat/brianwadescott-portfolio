"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";

interface WorkGridProps {
  projects: ProjectFrontmatter[];
}

const cardGridPositions = [
  { gridColumn: "1 / 8", gridRow: "1", minHeight: "520px" },
  { gridColumn: "8 / 13", gridRow: "1", minHeight: "520px" },
  { gridColumn: "1 / 5", gridRow: "2", minHeight: "380px" },
  { gridColumn: "5 / 9", gridRow: "2", minHeight: "380px" },
  { gridColumn: "9 / 13", gridRow: "2", minHeight: "380px" },
];

const titleSizes = [
  "clamp(40px, 4.5vw, 68px)",
  "clamp(28px, 3vw, 46px)",
  "clamp(28px, 3vw, 44px)",
  "clamp(24px, 2.5vw, 38px)",
  "clamp(24px, 2.5vw, 38px)",
];

export default function WorkGrid({ projects }: WorkGridProps) {
  return (
    <section
      id="work"
      className="work-section"
      style={{
        padding: "120px 48px",
      }}
    >
      <div
        className="work-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "64px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--light-gray)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Selected Work
        </span>
        <span
          style={{
            fontSize: "12px",
            color: "var(--mid-gray)",
            letterSpacing: "0.1em",
          }}
        >
          0{projects.length} Projects
        </span>
      </div>

      <div
        className="work-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "16px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug || `project-${i}`}
            project={project}
            gridStyle={cardGridPositions[i] || cardGridPositions[0]}
            titleSize={titleSizes[i] || titleSizes[0]}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  gridStyle,
  titleSize,
}: {
  project: ProjectFrontmatter;
  gridStyle: React.CSSProperties;
  titleSize: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hasHoverVideo = Boolean(
    project.hoverVideo && typeof project.hoverVideo === "string"
  );

  const isDark =
    project.bg === "#111010" ||
    project.bg === "#1A0A0A" ||
    project.bg.toLowerCase() === "#111010";
  const tagBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const tagColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";
  const arrowColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)";
  const clientColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  function handleMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
    const arrow = e.currentTarget.querySelector(".card-arrow") as HTMLElement;
    if (arrow) arrow.style.transform = "translate(4px, -4px)";
    setIsHovering(true);
    if (hasHoverVideo && videoRef.current) {
      const v = videoRef.current;
      if (!v.src || v.src.endsWith("undefined")) {
        v.src = project.hoverVideo!;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.play().catch(() => {});
      } else {
        v.play().catch(() => {});
      }
    }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    const arrow = e.currentTarget.querySelector(".card-arrow") as HTMLElement;
    if (arrow) arrow.style.transform = "translate(0, 0)";
    setIsHovering(false);
    if (hasHoverVideo && videoRef.current) {
      videoRef.current.pause();
    }
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        ...gridStyle,
        background: project.bg,
        backgroundImage: project.heroImage
          ? `url(${project.heroImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "4px",
        cursor: "pointer",
        textDecoration: "none",
        display: "block",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover video overlay — loads only on first hover */}
      {hasHoverVideo && (
        <video
          ref={videoRef}
          preload="none"
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      {/* Gradient overlay when video plays so text stays readable */}
      {hasHoverVideo && isHovering && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
            zIndex: 0.5,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          padding: "36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "inherit",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "6px 12px",
              borderRadius: "20px",
              fontWeight: 500,
              background: tagBg,
              color: tagColor,
            }}
          >
            {project.tag}
          </span>
          <span
            className="card-arrow"
            style={{
              fontSize: "20px",
              transition: "transform 0.3s ease",
              lineHeight: 1,
              color: arrowColor,
            }}
          >
            ↗
          </span>
        </div>

        <div>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "10px",
              fontWeight: 400,
              color: clientColor,
            }}
          >
            {project.client}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 800,
              fontSize: titleSize,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: project.textColor,
            }}
          >
            {project.title}
          </h2>
        </div>
      </div>

      {/* Year badge for dark cards */}
      {isDark && (
        <span
          style={{
            position: "absolute",
            top: "36px",
            right: "36px",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.2)",
            fontWeight: 400,
            zIndex: 1,
          }}
        >
          {project.year}
        </span>
      )}
    </Link>
  );
}
