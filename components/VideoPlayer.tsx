"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  posterTime?: number; // Seconds, or 0.5 = 50% through (generates poster from video)
  autoPlay?: boolean;
  title?: string; // Subtle overlay when paused (e.g. clip name)
  objectFit?: "cover" | "contain"; // contain = fit proportionally without cropping (default: cover)
  defaultMuted?: boolean; // When false, start with sound (e.g. reel after user clicks play)
}

export default function VideoPlayer({
  src,
  poster,
  posterTime,
  autoPlay = false,
  title,
  objectFit = "cover",
  defaultMuted = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(defaultMuted);
  const [showControls, setShowControls] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const h = () => setIsMobile(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Generate poster from video at posterTime (e.g. 0.5 = 50% through)
  useEffect(() => {
    if (!posterTime || poster || generatedPoster) return;
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const seekToFrame = () => {
      const target =
        posterTime < 1 && posterTime > 0
          ? video.duration * posterTime
          : video.duration >= posterTime
            ? posterTime
            : video.duration * 0.5;
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
          setGeneratedPoster(canvas.toDataURL("image/jpeg", 0.85));
        }
      } catch {
        /* canvas blocked */
      }
    };
    video.addEventListener("loadeddata", seekToFrame);
    video.addEventListener("seeked", onSeeked);
    video.src = src;
    return () => {
      video.removeEventListener("loadeddata", seekToFrame);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [src, posterTime, poster, generatedPoster]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    }

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration((d) => (d === 0 ? video.duration : d)); // WebM sometimes reports duration late
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onPlay = () => {
      setPlaying(true);
      setShowControls(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowControls(false), 2500);
    };
    const onPause = () => setPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("loadeddata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("loadeddata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [autoPlay]);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true; // Ensure muted before play — required for mobile
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    setMuted((prev) => !prev);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  }

  function requestFullscreen() {
    const video = videoRef.current;
    if (!video) return;
    // iOS Safari uses webkitEnterFullScreen for video elements
    if (typeof (video as HTMLVideoElement & { webkitEnterFullScreen?: () => void }).webkitEnterFullScreen === "function") {
      (video as HTMLVideoElement & { webkitEnterFullScreen: () => void }).webkitEnterFullScreen();
    } else if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  }

  function formatTime(s: number) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  function handleInteraction() {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000",
        position: "relative",
        cursor: showControls ? "default" : "none",
      }}
      onMouseMove={handleInteraction}
      onMouseLeave={() => playing && setShowControls(false)}
      onTouchStart={handleInteraction}
    >
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          objectFit,
          objectPosition: objectFit === "contain" ? "center" : undefined,
        }}
        playsInline
        muted={muted}
        preload="auto"
        poster={poster || generatedPoster || undefined}
        onClick={togglePlay}
      >
        <source src={src} type="video/webm" />
      </video>

      {/* Centered play overlay when paused — smaller on mobile */}
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "16px" : "32px",
            cursor: "pointer",
            background: "rgba(0,0,0,0.25)",
            pointerEvents: "all",
          }}
          onClick={togglePlay}
          onTouchEnd={(e) => {
            e.preventDefault();
            togglePlay();
          }}
          role="button"
          aria-label="Play video"
        >
          {title && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: isMobile ? "10px" : "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: 0,
              }}
            >
              {title}
            </p>
          )}
          <div
            style={{
              width: isMobile ? "48px" : "80px",
              height: isMobile ? "48px" : "80px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.3s ease, transform 0.3s ease",
            }}
          >
            <svg
              width={isMobile ? 14 : 22}
              height={isMobile ? 16 : 26}
              viewBox="0 0 22 26"
              fill="none"
              style={{ marginLeft: "3px" }}
            >
              <path
                d="M0 0L22 13L0 26V0Z"
                fill="rgba(255,255,255,0.85)"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Custom controls — hidden by default on mobile, show on tap */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: isMobile ? "24px 20px 16px" : "40px 28px 24px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? "12px" : "16px",
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: showControls ? "all" : "none",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "2px",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={seek}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "rgba(255,255,255,0.9)",
              borderRadius: "1px",
              transition: "width 0.1s linear",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Play/pause */}
            <button
              onClick={togglePlay}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="2" width="5" height="14" rx="1" fill="rgba(255,255,255,0.9)" />
                  <rect x="11" y="2" width="5" height="14" rx="1" fill="rgba(255,255,255,0.9)" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2L15 9L3 16V2Z" fill="rgba(255,255,255,0.9)" />
                </svg>
              )}
            </button>

            {/* Time */}
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "11px",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
                userSelect: "none",
              }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Mute */}
            <button
              onClick={toggleMute}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M2 6H6L11 2V16L6 12H2V6Z" fill="rgba(255,255,255,0.5)" />
                  <line x1="14" y1="6" x2="18" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <line x1="18" y1="6" x2="14" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M2 6H6L11 2V16L6 12H2V6Z" fill="rgba(255,255,255,0.9)" />
                  <path d="M13 6C14.5 7 14.5 11 13 12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M15 4C17.5 6 17.5 12 15 14" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={requestFullscreen}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
              aria-label="Fullscreen"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M2 6V2H6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 6V2H12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12V16H6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 12V16H12" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
