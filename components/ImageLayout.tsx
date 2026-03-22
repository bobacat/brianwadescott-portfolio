"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ProjectImage } from "@/lib/mdx";
import InlineLoopVideo from "@/components/InlineLoopVideo";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

function isVideo(img: ProjectImage) {
  return (
    img.type === "video" ||
    /\.(webm|mp4|mov)(\?|$)/i.test(img.src || "")
  );
}

function MediaContent({ image, accent }: { image: ProjectImage; accent: string }) {
  if (!image.src || image.src.includes("placeholder") || image.type === "divider" || image.type === "header") {
    return <ImagePlaceholder accent={accent} caption={image.caption} />;
  }
  if (isVideo(image)) {
    const useGifLike = image.gifLike ?? false;
    if (useGifLike) {
      return (
        <InlineLoopVideo
          src={image.src}
          srcMp4={image.videoMp4}
          poster={image.poster}
          objectFit={image.objectFit === "contain" ? "contain" : "cover"}
        />
      );
    }
    return (
      <VideoPlayer
        src={image.src}
        srcMp4={image.videoMp4}
        poster={image.poster}
        title={image.caption}
        autoPlay={false}
        posterTime={0.5}
        objectFit={image.objectFit === "contain" ? "contain" : "cover"}
      />
    );
  }
  if (/\.svg$/i.test(image.src || "")) {
    return (
      <img
        src={image.src}
        alt={image.caption || "Project image"}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: image.objectFit === "contain" ? "contain" : "cover",
          objectPosition: image.objectFit === "contain" ? "center" : undefined,
        }}
      />
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.caption || "Project image"}
      fill
      style={{
        objectFit: image.objectFit === "contain" ? "contain" : "cover",
        objectPosition: image.objectFit === "contain" ? "center" : undefined,
      }}
    />
  );
}

interface ImageLayoutProps {
  images: ProjectImage[];
  accent: string;
  isDark?: boolean;
}

export default function ImageLayout({ images, accent, isDark = false }: ImageLayoutProps) {
  const rendered: React.ReactNode[] = [];
  let i = 0;

  while (i < images.length) {
    const img = images[i];
    const key = i;

    if (img.type === "divider" && img.label) {
      rendered.push(<SectionDivider key={key} label={img.label} isDark={isDark} accent={accent} />);
      i++;
      continue;
    }
    if (img.type === "header" && img.label) {
      rendered.push(<SectionHeader key={key} label={img.label} isDark={isDark} accent={accent} />);
      i++;
      continue;
    }

    if (!img.layout && img.src) {
      rendered.push(<FullImage key={key} image={{ ...img, layout: "full" }} accent={accent} isDark={isDark} />);
      i++;
    } else if (img.layout === "full") {
      rendered.push(<FullImage key={key} image={img} accent={accent} isDark={isDark} />);
      i++;
    } else if (img.layout === "half") {
      const pair: ProjectImage[] = [img];
      if (i + 1 < images.length && images[i + 1].layout === "half") {
        pair.push(images[i + 1]);
        i += 2;
      } else {
        i++;
      }
      rendered.push(<HalfImages key={key} images={pair} accent={accent} isDark={isDark} />);
    } else if (img.layout === "feature") {
      const featureSet: ProjectImage[] = [img];
      if (i + 1 < images.length) featureSet.push(images[i + 1]);
      if (i + 2 < images.length) featureSet.push(images[i + 2]);
      rendered.push(
        <FeatureImages key={key} images={featureSet} accent={accent} isDark={isDark} />
      );
      i += featureSet.length;
    } else if (img.layout === "three") {
      const trio: ProjectImage[] = [img];
      while (trio.length < 3 && i + trio.length < images.length && images[i + trio.length].layout === "three") {
        trio.push(images[i + trio.length]);
      }
      rendered.push(<ThreeImages key={key} images={trio} accent={accent} isDark={isDark} />);
      i += trio.length;
    } else {
      rendered.push(<FullImage key={key} image={img} accent={accent} isDark={isDark} />);
      i++;
    }
  }

  return <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>{rendered}</div>;
}

function sectionHeaderStyle(isDark: boolean, accent: string): React.CSSProperties {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: "48px",
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: isDark ? `1px solid ${accent}40` : "1px solid var(--light-gray)",
  };
}

function sectionHeaderTextStyle(isDark: boolean): React.CSSProperties {
  return {
    fontFamily: "var(--font-bricolage), sans-serif",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: isDark ? "rgba(255,255,255,0.9)" : "var(--near-black)",
  };
}

function SectionDivider({ label, isDark = false, accent }: { label: string; isDark?: boolean; accent: string }) {
  return (
    <div className="work-header" style={sectionHeaderStyle(isDark, accent)}>
      <span style={sectionHeaderTextStyle(isDark)}>{label}</span>
    </div>
  );
}

function SectionHeader({ label, isDark = false, accent }: { label: string; isDark?: boolean; accent: string }) {
  return (
    <div className="work-header" style={sectionHeaderStyle(isDark, accent)}>
      <span style={sectionHeaderTextStyle(isDark)}>{label}</span>
    </div>
  );
}

function ImagePlaceholder({ accent, caption }: { accent: string; caption?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
        background: `${accent}18`,
        border: `1px solid ${accent}30`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="1" y="1" width="38" height="38" rx="2" stroke={accent} strokeOpacity="0.3" strokeWidth="1" />
        <path d="M8 32L16 20L22 28L28 20L32 32H8Z" fill={accent} fillOpacity="0.15" />
        <circle cx="27" cy="14" r="4" fill={accent} fillOpacity="0.2" />
      </svg>
      {caption && (
        <p style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: `${accent}60`,
          textAlign: "center",
          padding: "0 24px",
        }}>
          {caption}
        </p>
      )}
    </div>
  );
}

function FullImage({ image, accent, isDark = false }: { image: ProjectImage; accent: string; isDark?: boolean }) {
  const ratio = image.aspectRatio || "16/9";
  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          width: "100%",
          aspectRatio: ratio,
          overflow: "hidden",
          position: "relative",
          borderRadius: "4px",
        }}
      >
        <MediaContent image={image} accent={accent} />
      </div>
      {image.caption && (
        <figcaption
          style={{
            marginTop: "12px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
          }}
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function HalfImages({ images, accent, isDark = false }: { images: ProjectImage[]; accent: string; isDark?: boolean }) {
  return (
    <div className="image-layout-half" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {images.map((img, i) => {
        const ratio = img.aspectRatio || "4/3";
        return (
        <figure key={i} style={{ margin: 0 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: ratio,
              overflow: "hidden",
              position: "relative",
              borderRadius: "4px",
            }}
          >
            <MediaContent image={img} accent={accent} />
          </div>
          {img.caption && (
            <figcaption
              style={{
                marginTop: "12px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontStyle: "italic",
                color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)",
              }}
            >
            {img.caption}
          </figcaption>
        )}
      </figure>
        );
      })}
    </div>
  );
}

function FeatureImages({ images, accent, isDark = false }: { images: ProjectImage[]; accent: string; isDark?: boolean }) {
  const [main, ...stacked] = images;
  const mainRatio = main.aspectRatio || "3/2";
  return (
    <div className="image-layout-feature" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
      <figure style={{ margin: 0 }}>
        <div
          style={{
            width: "100%",
            aspectRatio: mainRatio,
            overflow: "hidden",
            position: "relative",
            borderRadius: "4px",
          }}
        >
          <MediaContent image={main} accent={accent} />
        </div>
        {main.caption && (
          <figcaption style={{ marginTop: "12px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontStyle: "italic", color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)" }}>
            {main.caption}
          </figcaption>
        )}
      </figure>
      <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "16px", minHeight: 0, alignContent: "stretch" }}>
        {stacked.map((img, i) => (
          <figure key={i} style={{ margin: 0, minHeight: 0, display: "flex" }}>
            <div
              style={{
                width: "100%",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
                position: "relative",
                borderRadius: "4px",
              }}
            >
              <MediaContent image={img} accent={accent} />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ThreeImages({ images, accent, isDark = false }: { images: ProjectImage[]; accent: string; isDark?: boolean }) {
  return (
    <div className="image-layout-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {images.map((img, i) => {
        const ratio = img.aspectRatio || "1/1";
        return (
        <figure key={i} style={{ margin: 0 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: ratio,
              overflow: "hidden",
              position: "relative",
              borderRadius: "4px",
            }}
          >
            <MediaContent image={img} accent={accent} />
          </div>
          {img.caption && (
            <figcaption style={{ marginTop: "12px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontStyle: "italic", color: isDark ? "rgba(255,255,255,0.55)" : "var(--mid-gray)" }}>
              {img.caption}
            </figcaption>
          )}
        </figure>
        );
      })}
    </div>
  );
}
