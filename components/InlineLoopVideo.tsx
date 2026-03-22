"use client";

interface InlineLoopVideoProps {
  src: string;
  srcMp4?: string;
  poster?: string;
  objectFit?: "cover" | "contain";
}

/**
 * GIF-like video: autoplay, loop, muted, no controls.
 * Use for short looping clips alongside images in the gallery.
 */
export default function InlineLoopVideo({
  src,
  srcMp4,
  poster,
  objectFit = "cover",
}: InlineLoopVideoProps) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
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
      {srcMp4 && <source src={encodeURI(srcMp4)} type="video/mp4" />}
      <source src={encodeURI(src)} type="video/webm" />
    </video>
  );
}
