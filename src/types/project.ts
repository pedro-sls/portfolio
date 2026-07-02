export type ProjectSource = "owner" | "contribution" | "fallback";

export type PortfolioProject = {
  id: string;
  fullName: string;
  name: string;
  owner: string;
  description: string;
  htmlUrl: string;
  homepageUrl: string | null;
  language: string | null;
  topics: string[];
  pushedAt: string | null;
  stargazersCount: number;
  forksCount: number;
  isPrivate: boolean;
  isFork: boolean;
  source: ProjectSource;
};

