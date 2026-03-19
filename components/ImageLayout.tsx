"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ProjectImage } from "@/lib/mdx";

const VideoPlayer = dynamic(() => import("@/components/VideoPlayer"), {
  ssr: false,
});

interface ImageLayoutProps {
  images: ProjectImage[];
  accent: string;
}

export default function ImageLayout({ images, accent }: ImageLayoutProps) {
  const rendered: React.ReactNode[] = [];
  let i = 0;

  while (i < images.length) {
    const img = images[i];
    const key = i;

    if (img.layout === "full") {
      rendered.push(<FullImage key={key} image={img} accent={accent} />);
      i++;
    } else if (img.layout === "half") {
      const pair: ProjectImage[] = [img];
      if (i + 1 < images.length && images[i + 1].layout === "half") {
        pair.push(images[i + 1]);
        i += 2;
      } else {
        i++;
      }
      rendered.push(<HalfImages key={key} images={pair} accent={accent} />);
    } else if (img.layout === "feature") {
      const featureSet: ProjectImage[] = [img];
      if (i + 1 < images.length) featureSet.push(images[i + 1]);
      if (i + 2 < images.length) featureSet.push(images[i + 2]);
      rendered.push(
        <FeatureImages key={key} images={featureSet} accent={accent} />
      );
      i += featureSet.length;
    } else if (img.layout === "three") {
      const trio: ProjectImage[] = [img];
      while (trio.length < 3 && i + trio.length < images.length && images[i + trio.length].layout === "three") {
        trio.push(images[i + trio.length]);
      }
      rendered.push(<ThreeImages key={key} images={trio} accent={accent} />);
      i += trio.length;
    } else {
      rendered.push(<FullImage key={key} image={img} accent={accent} />);
      i++;
    }
  }

  return <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>{rendered}</div>;
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

function FullImage({ image, accent }: { image: ProjectImage; accent: string }) {
  const isVideo =
    image.type === "video" ||
    /\.(webm|mp4|mov)(\?|$)/i.test(image.src || "");

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          position: "relative",
          borderRadius: "4px",
        }}
      >
        {image.src && !image.src.includes("placeholder") ? (
          isVideo ? (
            <VideoPlayer
              src={image.src}
              title={image.caption}
              autoPlay={false}
            />
          ) : (
            <Image
              src={image.src}
              alt={image.caption || "Project image"}
              fill
              style={{ objectFit: "cover" }}
            />
          )
        ) : (
          <ImagePlaceholder accent={accent} caption={image.caption} />
        )}
      </div>
      {image.caption && (
        <figcaption
          style={{
            marginTop: "12px",
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: "var(--mid-gray)",
          }}
        >
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function HalfImages({ images, accent }: { images: ProjectImage[]; accent: string }) {
  return (
    <div className="image-layout-half" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {images.map((img, i) => (
        <figure key={i} style={{ margin: 0 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "4/3",
              overflow: "hidden",
              position: "relative",
              borderRadius: "4px",
            }}
          >
            {img.src && !img.src.includes("placeholder") ? (
              <Image
                src={img.src}
                alt={img.caption || "Project image"}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <ImagePlaceholder accent={accent} caption={img.caption} />
            )}
          </div>
          {img.caption && (
            <figcaption
              style={{
                marginTop: "12px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontStyle: "italic",
                color: "var(--mid-gray)",
              }}
            >
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function FeatureImages({ images, accent }: { images: ProjectImage[]; accent: string }) {
  const [main, ...stacked] = images;
  return (
    <div className="image-layout-feature" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
      <figure style={{ margin: 0 }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "3/2",
            overflow: "hidden",
            position: "relative",
            borderRadius: "4px",
          }}
        >
          {main.src && !main.src.includes("placeholder") ? (
            <Image
              src={main.src}
              alt={main.caption || "Project image"}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <ImagePlaceholder accent={accent} caption={main.caption} />
          )}
        </div>
        {main.caption && (
          <figcaption style={{ marginTop: "12px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontStyle: "italic", color: "var(--mid-gray)" }}>
            {main.caption}
          </figcaption>
        )}
      </figure>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {stacked.map((img, i) => (
          <figure key={i} style={{ margin: 0, flex: 1 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1/1",
                overflow: "hidden",
                position: "relative",
                borderRadius: "4px",
              }}
            >
              {img.src && !img.src.includes("placeholder") ? (
                <Image
                  src={img.src}
                  alt={img.caption || "Project image"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <ImagePlaceholder accent={accent} caption={img.caption} />
              )}
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

function ThreeImages({ images, accent }: { images: ProjectImage[]; accent: string }) {
  return (
    <div className="image-layout-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {images.map((img, i) => (
        <figure key={i} style={{ margin: 0 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "1/1",
              overflow: "hidden",
              position: "relative",
              borderRadius: "4px",
            }}
          >
            {img.src && !img.src.includes("placeholder") ? (
              <Image
                src={img.src}
                alt={img.caption || "Project image"}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <ImagePlaceholder accent={accent} caption={img.caption} />
            )}
          </div>
          {img.caption && (
            <figcaption style={{ marginTop: "12px", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "13px", fontStyle: "italic", color: "var(--mid-gray)" }}>
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
