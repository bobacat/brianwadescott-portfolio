import HomePageClient from "@/components/HomePageClient";
import { getAllProjects } from "@/lib/mdx";

export default function HomePage() {
  const projects = getAllProjects();

  return <HomePageClient projects={projects} />;
}
