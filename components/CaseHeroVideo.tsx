"use client";

import { useRef, useEffect, useState } from "react";

interface CaseHeroVideoProps {
  heroVideo: string;
  heroImage: string;
  bg: string;
}

/**
 * Hero background video. Uses WebM.
 * Mobile: tap-to-play overlay (autoplay often blocked without user gesture).
 */
export default function CaseHeroVideo({
  heroVideo,
  heroImage,
  bg,
}: CaseHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [userActivated, setUserActivated] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const attemptPlay = () => {
      video.muted = true;
      video.play().then(() => setUserActivated(true)).catch(() => setHasError(true));
    };

    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    video.addEventListener("canplaythrough", attemptPlay);
    video.addEventListener("error", () => setHasError(true));

    if (video.readyState >= 2) attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) attemptPlay();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("canplaythrough", attemptPlay);
      observer.disconnect();
    };
  }, [hasError]);

  const handleTapToPlay = () => {
    const video = videoRef.current;
    if (!video || hasError) return;
    video.muted = true;
    video.play().then(() => setUserActivated(true)).catch(() => setHasError(true));
  };

  if (hasError) {
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

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
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
        <source src={heroVideo} type="video/webm" />
      </video>
      {/* Tap-to-play overlay for mobile (autoplay blocked without user gesture) */}
      {!userActivated && (
        <button
          type="button"
          onClick={handleTapToPlay}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTapToPlay();
          }}
          aria-label="Play video"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 0%, ${bg} 85%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </>
  );
}
