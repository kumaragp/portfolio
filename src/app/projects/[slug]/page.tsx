import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/ProjectDetail";
import { getProjectBySlug, projects } from "@/data/projects";
import { siteName, siteUrl } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    const title = `Project Not Found | ${siteName}`;
    const description = "The requested project page could not be found.";

    return {
      title,
      description,
      robots: { index: false, follow: false },
      openGraph: {
        title,
        description,
        type: "article",
        siteName,
        locale: "en_US",
      },
      twitter: { card: "summary", title, description },
    };
  }

  const title = `${project.title} | ${siteName}`;
  const description = project.shortDescription;
  const canonicalUrl = siteUrl ? new URL(`/projects/${project.slug}`, siteUrl) : undefined;

  return {
    title,
    description,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    robots: { index: project.visibility === "public", follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      siteName,
      locale: "en_US",
      url: canonicalUrl,
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}