"use client";

import { useState, useCallback } from "react";
import Hero from "@/components/Hero";
import ProcessTicker from "@/components/ProcessTicker";
import WorkGrid from "@/components/WorkGrid";
import ReelSection from "@/components/ReelSection";
import AboutTeaser from "@/components/AboutTeaser";
import ClientsGrid from "@/components/ClientsGrid";
import Footer from "@/components/Footer";
import { ProjectFrontmatter } from "@/lib/mdx";

interface HomePageClientProps {
  projects: ProjectFrontmatter[];
}

export default function HomePageClient({ projects }: HomePageClientProps) {
  const [reelAutoPlay, setReelAutoPlay] = useState(false);

  const handleReelClick = useCallback(() => {
    setReelAutoPlay(true);
    const el = document.getElementById("reel");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main>
      <Hero onReelClick={handleReelClick} />
      <ProcessTicker />
      <WorkGrid projects={projects} />
      <ReelSection
        reelAutoPlay={reelAutoPlay}
        onReelAutoPlayConsumed={() => setReelAutoPlay(false)}
      />
      <AboutTeaser />
      <ClientsGrid />
      <Footer />
    </main>
  );
}
