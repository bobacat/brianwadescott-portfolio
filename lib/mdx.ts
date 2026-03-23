import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectImage {
  src?: string; // Optional for divider/header
  layout?: "full" | "half" | "feature" | "three"; // Optional for divider/header
  type?: "image" | "video" | "divider" | "header";
  caption?: string;
  label?: string; // For divider and header types
  objectFit?: "cover" | "contain"; // contain = fit proportionally without cropping (default: cover)
  aspectRatio?: string; // When objectFit is contain, use this to avoid letterboxing (e.g. "3/1" for wide images)
  videoMp4?: string; // MP4 fallback for iOS (video in images gallery)
  poster?: string; // Static poster/thumbnail for video (fixes black frame on iOS)
  gifLike?: boolean; // Autoplay, loop, muted, no controls — treated like a GIF
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  tag: string;
  client: string;
  role: string;
  year: number;
  bg: string;
  accent: string;
  textColor: string;
  statement: string;
  statementHighlight?: string; // Phrase to render in accent color (e.g. "90s karate dojo parody commercial")
  brief: string;
  roleDetail: string;
  concept?: string; // When set, Brief+Concept two-column (replaces roleDetail in that section)
  production?: string; // Optional body section (e.g. AI pipeline story)
  outcome: string;
  stats: ProjectStat[];
  heroImage: string;
  cardBackgroundPosition?: string; // Bento card: "center" (default) | "top center" | etc.
  heroVideo?: string; // Optional: muted loop behind case study hero (WebM)
  heroVideoMp4?: string; // Optional: MP4 fallback for iOS Safari (no WebM support)
  heroStill?: string; // Optional: still image if no video (falls back to heroImage)
  hoverVideo?: string; // Optional: short clip (5–15s) plays muted on hover (WebM)
  hoverVideoMp4?: string; // Optional: MP4 fallback for iOS
  images: ProjectImage[];
  nextProject: string;
  order: number;
  credits?: string; // Optional: e.g. "Directed by  Name  ·  Producer  Name"
}

export interface AboutFrontmatter {
  headline: string;
  subhead: string;
  body: string;
  callouts: string[];
  experience: { role: string; company: string; years: string }[];
  education: { school: string; degree: string; year: string }[];
  heroVideo?: string; // Looping muted background (WebM)
  heroVideoMp4?: string; // MP4 fallback for iOS
  heroImage?: string; // Fallback when WebM unsupported and no MP4
}

export function getAllProjects(): ProjectFrontmatter[] {
  const workDir = path.join(contentDir, "work");
  const files = fs.readdirSync(workDir).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(workDir, file), "utf-8");
    const { data } = matter(raw);
    return data as ProjectFrontmatter;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProject(
  slug: string
): { frontmatter: ProjectFrontmatter; content: string } | null {
  const filePath = path.join(contentDir, "work", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as ProjectFrontmatter, content };
}

export function getAllProjectSlugs(): string[] {
  const workDir = path.join(contentDir, "work");
  return fs
    .readdirSync(workDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getAbout(): { frontmatter: AboutFrontmatter; content: string } {
  const filePath = path.join(contentDir, "about.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as AboutFrontmatter, content };
}
