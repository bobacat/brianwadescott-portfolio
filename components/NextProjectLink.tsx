"use client";

import Link from "next/link";
import { ProjectFrontmatter } from "@/lib/mdx";

export default function NextProjectLink({
  project,
}: {
  project: ProjectFrontmatter;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="next-project-link"
      style={{
        display: "block",
        padding: "80px 48px",
        background: project.bg,
        textDecoration: "none",
        transition: "opacity 0.3s ease",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.opacity = "0.85")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.opacity = "1")
      }
    >
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color:
            project.textColor === "#ffffff"
              ? "rgba(255,255,255,0.35)"
              : "rgba(0,0,0,0.35)",
          marginBottom: "16px",
        }}
      >
        Next Project
      </p>
      <p
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(32px, 5vw, 72px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: project.textColor,
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {project.title}
        <span style={{ display: "inline-flex", alignItems: "center", opacity: 0.5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      </p>
    </Link>
  );
}
