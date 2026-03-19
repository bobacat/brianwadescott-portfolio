import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Brian Wade Scott — Creative Director",
    template: "%s — Brian Wade Scott",
  },
  description:
    "Creative Director based in Los Angeles. 15+ years across film, broadcast, brand identity, and motion graphics. Clients include Warner Bros, Google, Apple, Sanrio, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://brianwadescott.com",
    siteName: "Brian Wade Scott",
    title: "Brian Wade Scott — Creative Director",
    description:
      "Creative Director based in Los Angeles. 15+ years across film, broadcast, brand identity, and motion graphics.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brian Wade Scott — Creative Director",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Wade Scott — Creative Director",
    description:
      "Creative Director based in Los Angeles. 15+ years across film, broadcast, brand identity, and motion graphics.",
  },
  metadataBase: new URL("https://brianwadescott.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
