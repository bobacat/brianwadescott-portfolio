"use client";

export default function ProcessTicker() {
  const items = ["Brand", "Story", "System", "Motion"];

  // Duplicate to create seamless loop
  const tickerItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className="process-ticker"
      style={{
        padding: "80px 0",
        borderTop: "1px solid var(--light-gray)",
        borderBottom: "1px solid var(--light-gray)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "80px",
          whiteSpace: "nowrap",
          animation: "ticker 20s linear infinite",
          width: "max-content",
        }}
      >
        {tickerItems.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "-0.02em",
              color: "var(--near-black)",
              opacity:
                i % 4 === 0
                  ? 0.5
                  : i % 4 === 1
                    ? 0.18
                    : i % 4 === 2
                      ? 0.28
                      : 0.18,
              flexShrink: 0,
              transition: "opacity 0.3s ease",
              cursor: "default",
              display: "inline-flex",
              alignItems: "center",
              gap: "80px",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
            onMouseLeave={(e) => {
              const idx = i % 4;
              const op =
                idx === 0 ? "0.5" : idx === 1 ? "0.18" : idx === 2 ? "0.28" : "0.18";
              (e.currentTarget as HTMLElement).style.opacity = op;
            }}
          >
            {item}
            <span
              style={{
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 72px)",
                opacity: 0.12,
                lineHeight: 1,
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
