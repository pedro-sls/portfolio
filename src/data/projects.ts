import type { PortfolioProject } from "@/types/project";

export const githubProfile = {
  username: "pedro-sls",
};

export const defaultFeaturedProjectIds = ["GabeMarques-Intetsu/SIRA"];

export const fallbackProjects: Record<string, PortfolioProject> = {
  "GabeMarques-Intetsu/SIRA": {
    id: "GabeMarques-Intetsu/SIRA",
    fullName: "GabeMarques-Intetsu/SIRA",
    name: "SIRA",
    owner: "GabeMarques-Intetsu",
    description:
      "Sistema de Reserva de Salas e Equipamentos do IFPB, migrado para Next.js, TypeScript e Supabase.",
    htmlUrl: "https://github.com/GabeMarques-Intetsu/SIRA",
    homepageUrl: "https://sira-jet.vercel.app",
    language: "TypeScript",
    topics: ["Next.js", "TypeScript", "Supabase"],
    pushedAt: "2026-07-01T19:54:07Z",
    stargazersCount: 1,
    forksCount: 2,
    isPrivate: false,
    isFork: false,
    source: "contribution",
  },
};

