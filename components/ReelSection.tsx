"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

// ─── REEL VIDEO URL ────────────────────────────────────────────────────────────
// Host your reel MP4 on Cloudflare R2 (free: 10 GB storage, no egress fees)
// or any other CDN/hosting. Then replace this URL.
// Steps:
//   1. Create a free Cloudflare account → R2 → create bucket
//   2. Upload your reel.mp4
//   3. Enable public access on the bucket
//   4. Paste the public URL below
const REEL_URL = "/videos/moreShinyReel2026.webm";
// Poster: frame at this timestamp (seconds). Uses a still from the video — no separate image needed.
const REEL_POSTER_TIME = 35;
// ─────────────────────────────────────────────────────────────────────────────

interface ReelSectionProps {
  reelAutoPlay?: boolean;
  onReelAutoPlayConsumed?: () => void;
}

export default function ReelSection({
  reelAutoPlay = false,
  onReelAutoPlayConsumed,
}: ReelSectionProps) {
  const [playing, setPlaying] = useState(false);

  // When user clicked hero, skip poster and auto-play immediately
  useEffect(() => {
    if (reelAutoPlay && !playing) {
      setPlaying(true);
      onReelAutoPlayConsumed?.();
    }
  }, [reelAutoPlay, playing, onReelAutoPlayConsumed]);

  return (
    <section
      id="reel"
      data-nav="dark"
      style={{
        background: "var(--near-black)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!playing ? (
        <PlayPoster
          onPlay={() => setPlaying(true)}
          videoSrc={REEL_URL}
          posterTime={REEL_POSTER_TIME}
        />
      ) : (
        <div style={{ width: "100%", aspectRatio: "16/9" }}>
          {REEL_URL ? (
            <VideoPlayer src={REEL_URL} autoPlay />
          ) : (
            <ReelPlaceholder />
          )}
        </div>
      )}
    </section>
  );
}

function PlayPoster({
  onPlay,
  videoSrc,
  posterTime,
}: {
  onPlay: () => void;
  videoSrc: string;
  posterTime: number;
}) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const seekToFrame = () => {
      const target = video.duration >= posterTime ? posterTime : video.duration * 0.5;
      video.currentTime = target;
    };

    const onSeeked = () => {
      try {
        if (video.videoWidth === 0) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          setPosterUrl(canvas.toDataURL("image/jpeg", 0.85));
        }
      } catch {
        // Canvas blocked
      }
    };

    video.addEventListener("loadeddata", seekToFrame);
    video.addEventListener("seeked", onSeeked);
    video.src = videoSrc;

    return () => {
      video.removeEventListener("loadeddata", seekToFrame);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [videoSrc, posterTime]);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        cursor: "pointer",
        background: posterUrl
          ? `url(${posterUrl}) center/cover`
          : "var(--near-black)",
        position: "relative",
        transition: "background 0.3s ease",
      }}
      onClick={onPlay}
      role="button"
      aria-label="Play reel"
    >
      {/* Dark overlay so play button stands out */}
      {posterUrl && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />
      )}

      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Selected Work · 2008–2025
      </p>

      {/* Play button */}
      <div
        className="reel-play-btn"
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.3s ease, transform 0.3s ease",
          position: "relative",
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.9)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(255,255,255,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        {/* Triangle */}
        <svg
          width="22"
          height="26"
          viewBox="0 0 22 26"
          fill="none"
          style={{ marginLeft: "3px" }}
        >
          <path d="M0 0L22 13L0 26V0Z" fill="rgba(255,255,255,0.8)" />
        </svg>
      </div>
    </div>
  );
}

function ReelPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "#0a0a0a",
        padding: "48px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          color: "rgba(255,255,255,0.4)",
          textAlign: "center",
        }}
      >
        Reel Coming Soon
      </p>
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "13px",
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.2)",
          textAlign: "center",
          maxWidth: "400px",
          lineHeight: 1.6,
        }}
      >
        Add your reel MP4 URL to{" "}
        <code
          style={{
            fontFamily: "monospace",
            fontSize: "12px",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          components/ReelSection.tsx
        </code>
      </p>
    </div>
  );
}
