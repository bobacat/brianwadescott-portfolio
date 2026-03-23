"use client";

interface InlineLoopVideoProps {
  src: string;
  poster?: string;
  objectFit?: "cover" | "contain";
}

/**
 * GIF-like video: autoplay, loop, muted, no controls.
 * Use for short looping clips alongside images in the gallery.
 */
export default function InlineLoopVideo({
  src,
  poster,
  objectFit = "cover",
}: InlineLoopVideoProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster ? encodeURI(poster) : undefined}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit,
        objectPosition: objectFit === "contain" ? "center" : undefined,
      }}
    >
      <source src={encodeURI(src)} type="video/webm" />
    </video>
  );
}
