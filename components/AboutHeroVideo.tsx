"use client";

import { useLayoutEffect, useState } from "react";

interface AboutHeroVideoProps {
  heroVideo: string;
  heroVideoMp4?: string;
  heroImage?: string;
}

const ABOUT_HERO_BG = "var(--off-white)"; // Matches about page background

/**
 * Hero video background for About page.
 * iOS Safari doesn't support WebM — shows heroImage or solid fallback when no MP4.
 */
export default function AboutHeroVideo({
  heroVideo,
  heroVideoMp4,
  heroImage,
}: AboutHeroVideoProps) {
  const [useFallback, setUseFallback] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const video = document.createElement("video");
    const supportsWebM = video.canPlayType("video/webm") !== "";
    const hasMp4 = Boolean(heroVideoMp4);
    setUseFallback(!supportsWebM && !hasMp4);
  }, [heroVideoMp4]);

  // Show image or solid fallback when WebM unsupported (iOS) and no MP4
  if (useFallback === true) {
    return (
      <>
        {heroImage ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: ABOUT_HERO_BG,
              pointerEvents: "none",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 0%, ${ABOUT_HERO_BG} 85%)`,
            pointerEvents: "none",
          }}
        />
      </>
    );
  }

  // Show video (WebM or MP4)
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroImage}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      >
        {heroVideoMp4 && (
          <source src={heroVideoMp4} type="video/mp4" />
        )}
        <source src={heroVideo} type="video/webm" />
      </video>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 0%, ${ABOUT_HERO_BG} 85%)`,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
