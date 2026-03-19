import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectImage {
  src: string;
  layout: "full" | "half" | "feature" | "three";
  type?: "image" | "video";
  caption?: string;
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
  brief: string;
  roleDetail: string;
  outcome: string;
  stats: ProjectStat[];
  heroImage: string;
  heroVideo?: string; // Optional: muted loop behind case study hero (like homepage)
  heroStill?: string; // Optional: still image if no video (falls back to heroImage)
  hoverVideo?: string; // Optional: short clip (5–15s) plays muted on hover
  images: ProjectImage[];
  nextProject: string;
  order: number;
}

export interface AboutFrontmatter {
  headline: string;
  subhead: string;
  body: string;
  callouts: string[];
  experience: { role: string; company: string; years: string }[];
  education: { school: string; degree: string; year: string }[];
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
