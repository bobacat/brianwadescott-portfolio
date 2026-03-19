"use client";

const clients = [
  "Warner Bros",
  "Google",
  "Apple",
  "Marvel",
  "Xbox",
  "FX",
  "Sanrio",
  "Coca-Cola",
  "McDonald's",
  "Target",
  "Audi",
  "Toyota",
  "Oculus",
  "Hershey's",
  "HTC",
  "Men's Health",
  "Emoji Brand",
  "CA Lottery",
];

export default function ClientsGrid() {
  return (
    <section
      className="clients-section"
      style={{
        padding: "80px 48px 120px",
        borderTop: "1px solid var(--light-gray)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "64px",
          paddingBottom: "20px",
          borderBottom: "1px solid var(--light-gray)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Select Clients
        </span>
      </div>

      <div
        className="clients-grid-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
        }}
      >
        {clients.map((client, i) => (
          <div
            key={client}
            style={{
              padding: "32px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid var(--light-gray)",
              borderBottom: "1px solid var(--light-gray)",
              borderTop: i < 6 ? "1px solid var(--light-gray)" : "none",
              borderLeft: i % 6 === 0 ? "1px solid var(--light-gray)" : "none",
              fontFamily: "var(--font-bricolage), sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.05em",
              color: "var(--light-gray)",
              textAlign: "center",
              transition: "color 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--near-black)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "var(--light-gray)")
            }
          >
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}
