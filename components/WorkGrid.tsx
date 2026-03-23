"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";

interface WorkGridProps {
  projects: ProjectFrontmatter[];
}

const MOBILE_BREAKPOINT = 768;

const cardGridPositions = [
  { gridColumn: "1 / 8", gridRow: "1", minHeight: "520px" },
  { gridColumn: "8 / 13", gridRow: "1", minHeight: "520px" },
  { gridColumn: "1 / 5", gridRow: "2", minHeight: "380px" },
  { gridColumn: "5 / 9", gridRow: "2", minHeight: "380px" },
  { gridColumn: "9 / 13", gridRow: "2", minHeight: "380px" },
  { gridColumn: "1 / 13", gridRow: "3", minHeight: "280px" },
];

const titleSizes = [
  "clamp(40px, 4.5vw, 68px)",
  "clamp(28px, 3vw, 46px)",
  "clamp(28px, 3vw, 44px)",
  "clamp(24px, 2.5vw, 38px)",
  "clamp(24px, 2.5vw, 38px)",
  "clamp(28px, 3vw, 48px)",
];

export default function WorkGrid({ projects }: WorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const updateFocusedCard = useCallback(() => {
    if (!isMobile || !gridRef.current) return;
    const viewportCenter = window.innerHeight / 2;
    const viewportHeight = window.innerHeight;
    let closestIndex: number | null = null;
    let closestDist = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      // Only consider cards that are at least partially visible
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      const cardCenter = rect.top + rect.height / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    setFocusedIndex(closestIndex);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    updateFocusedCard();
    window.addEventListener("scroll", updateFocusedCard, { passive: true });
    window.addEventListener("resize", updateFocusedCard);
    return () => {
      window.removeEventListener("scroll", updateFocusedCard);
      window.removeEventListener("resize", updateFocusedCard);
    };
  }, [isMobile, updateFocusedCard]);

  return (
    <section
      id="work"
      className="work-section"
      style={{
        padding: "120px 48px 80px",
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
      </div>

      <div
        ref={gridRef}
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
            index={i}
            isFocused={isMobile && focusedIndex !== null && focusedIndex === i}
            cardRef={(el) => { cardRefs.current[i] = el; }}
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
  index,
  isFocused,
  cardRef,
}: {
  project: ProjectFrontmatter;
  gridStyle: React.CSSProperties;
  titleSize: string;
  index: number;
  isFocused: boolean;
  cardRef: (el: HTMLAnchorElement | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hasHoverVideo = Boolean(
    project.hoverVideo && typeof project.hoverVideo === "string"
  );
  // On mobile: play when focused (center of screen). On desktop: play on hover.
  const isVideoActive = hasHoverVideo && (isHovering || isFocused);

  // Play/pause video when isFocused changes (mobile)
  useEffect(() => {
    if (!hasHoverVideo || !videoRef.current) return;
    if (isFocused) {
      const v = videoRef.current;
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      // Load and play — browser picks MP4 or WebM from source elements
      v.load();
      v.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isFocused, hasHoverVideo]);

  const isDark =
    project.bg === "#111010" ||
    project.bg === "#1A0A0A" ||
    project.bg === "#0A0A0F" ||
    project.bg.toLowerCase() === "#111010" ||
    project.bg.toLowerCase() === "#0a0a0f";
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
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.load();
      v.play().catch(() => {});
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
      ref={cardRef}
      href={`/work/${project.slug}`}
      style={{
        ...gridStyle,
        background: project.bg,
        backgroundImage: (() => {
          const layers: string[] = [];
          if (project.heroImage) layers.push(`url(${project.heroImage})`);
          if (project.bg === "#0A0A0F") {
            layers.unshift(
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)"
            );
          }
          return layers.length ? layers.join(", ") : undefined;
        })(),
        backgroundSize: project.bg === "#0A0A0F" && project.heroImage
          ? "auto, cover"
          : "cover",
        backgroundPosition: (() => {
          const imgPos = project.cardBackgroundPosition || "center";
          if (project.bg === "#0A0A0F" && project.heroImage) {
            return `0 0, ${imgPos}`; // scan lines, then hero position
          }
          return imgPos;
        })(),
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
      {/* Hover video overlay — centered via transform to prevent load-time jump */}
      {hasHoverVideo && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: isVideoActive ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <video
            key={project.slug}
            ref={videoRef}
            preload="metadata"
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: project.cardBackgroundPosition || "center",
            }}
          >
            {project.hoverVideoMp4 && (
              <source src={project.hoverVideoMp4} type="video/mp4" />
            )}
            <source src={project.hoverVideo!} type="video/webm" />
          </video>
        </div>
      )}
      {/* Gradient overlay when video plays so text stays readable */}
      {hasHoverVideo && isVideoActive && (
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
              display: "inline-flex",
              alignItems: "center",
              transition: "transform 0.3s ease",
              color: arrowColor,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
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

    </Link>
  );
}
