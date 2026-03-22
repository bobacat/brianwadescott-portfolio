"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const darkSections = document.querySelectorAll("[data-nav='dark']");
      const navHeight = 80; // approx nav bottom edge in px
      const anyDark = Array.from(darkSections).some((section) => {
        const rect = section.getBoundingClientRect();
        // Section is behind the nav if it overlaps the nav zone
        return rect.top < navHeight && rect.bottom > 0;
      });
      setIsDark(anyDark);
    };

    // Wait for paint so data-nav attributes are guaranteed in the DOM
    const raf = requestAnimationFrame(() => {
      check();
    });

    window.addEventListener("scroll", check, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
    };
  }, [pathname]);

  const textColor = isDark ? "rgba(255,255,255,0.95)" : "var(--near-black)";
  const dimColor = isDark ? "rgba(255,255,255,0.45)" : "rgba(17,16,16,0.45)";

  const navLinks = [
    { label: "Work", href: isHome ? "#work" : "/#work" },
    { label: "Reel", href: isHome ? "#reel" : "/#reel" },
    { label: "About", href: "/about" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 48px",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: textColor,
          textDecoration: "none",
          transition: "color 0.4s ease",
        }}
      >
        BWS
      </Link>

      <ul
        className="nav-links"
        style={{
          display: "flex",
          gap: "40px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: dimColor,
                textDecoration: "none",
                transition: "color 0.4s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = textColor)
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = dimColor)
              }
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu button — visible only on small screens via CSS */}
      <button
        type="button"
        className="nav-mobile-menu"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        style={{
          background: "none",
          border: "none",
          padding: "8px",
          cursor: "pointer",
          color: textColor,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay menu — frosted glass (backup: Nav.mobile-menu-solid-backup.md) */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 16, 16, 0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 101,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 700,
                fontSize: "24px",
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.95)",
                textDecoration: "none",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
