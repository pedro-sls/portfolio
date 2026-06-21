import { profile } from "@/data/profile";

export const siteConfig = {
  repositoryUrl: "https://github.com/pedro-sls/portfolio",
  openGraphImage: "/opengraph-image",
  keywords: [
    "Pedro Sales",
    "Software Engineering",
    "Portfolio",
    "Web Development",
    "Automation",
    "Integrations",
    "Python",
    "Flask",
    "React",
    "Next.js",
    "PostgreSQL",
    "AWS",
    "n8n",
    "Make",
  ],
  metadata: {
    en: {
      title: "Pedro Sales | Software Engineering Portfolio",
      description:
        "Software Engineering portfolio by Pedro Sales, focused on web development, automation, integrations, and maintainable software foundations.",
      openGraphAlt:
        "Pedro Sales software engineering portfolio social preview.",
    },
    pt: {
      title: "Pedro Sales | Portfolio de Engenharia de Software",
      description:
        "Portfolio de Engenharia de Software de Pedro Sales, com foco em desenvolvimento web, automacoes, integracoes e bases de software bem estruturadas.",
      openGraphAlt:
        "Preview social do portfolio de Engenharia de Software de Pedro Sales.",
    },
  },
} as const;

export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  return url.startsWith("http") ? url : `https://${url}`;
}

export function getSiteName() {
  return `${profile.name} Portfolio`;
}
