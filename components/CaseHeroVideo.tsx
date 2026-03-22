"use client";

import { useLayoutEffect, useState } from "react";

interface CaseHeroVideoProps {
  heroVideo: string;
  heroVideoMp4?: string;
  heroImage: string;
  bg: string;
}

/**
 * Hero video with iOS/mobile fallback.
 * iOS Safari doesn't support WebM — we show hero image or use MP4 when available.
 */
export default function CaseHeroVideo({
  heroVideo,
  heroVideoMp4,
  heroImage,
  bg,
}: CaseHeroVideoProps) {
  const [useFallback, setUseFallback] = useState<boolean | null>(null);

  // useLayoutEffect runs before paint — avoids black flash on iOS
  useLayoutEffect(() => {
    const video = document.createElement("video");
    const supportsWebM = video.canPlayType("video/webm") !== "";
    const hasMp4 = Boolean(heroVideoMp4);
    setUseFallback(!supportsWebM && !hasMp4);
  }, [heroVideoMp4]);

  // Show image fallback when WebM unsupported (iOS) and no MP4
  if (useFallback === true) {
    return (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.65,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to bottom, transparent 0%, ${bg} 85%)`,
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
          opacity: 0.65,
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
          background: `linear-gradient(to bottom, transparent 0%, ${bg} 85%)`,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
