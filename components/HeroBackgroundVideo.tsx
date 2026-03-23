"use client";

export const HERO_VIDEO_URL = "/videos/reel_hero.webm";

interface HeroBackgroundVideoProps {
  /** When true, shorter gradient falloff for compact hero (e.g. /reel 45vh) */
  compact?: boolean;
}

/**
 * Autoplay muted looping hero video + gradient overlay.
 * Reused on homepage Hero and /reel page so sources stay in sync.
 */
export default function HeroBackgroundVideo({ compact = false }: HeroBackgroundVideoProps) {
  return (
    <>
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
      <span
        style={{
          position: "absolute",
          inset: 0,
          background: compact
            ? "linear-gradient(to bottom, transparent 0%, transparent 50%, #111010 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
