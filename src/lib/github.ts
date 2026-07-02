import { fallbackProjects } from "@/data/projects";
import type { PortfolioProject, ProjectSource } from "@/types/project";

const githubApiUrl = "https://api.github.com";
const userAgent = "pedro-sales-portfolio";

type GitHubRepositoryResponse = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  private: boolean;
  fork: boolean;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  pushed_at: string | null;
  stargazers_count: number;
  forks_count: number;
};

type GitHubIssueSearchResponse = {
  items: Array<{
    repository_url: string;
  }>;
};

type GitHubFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

function getGitHubHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": userAgent,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function requestGitHub<T>(
  pathOrUrl: string,
  options: GitHubFetchOptions = {},
): Promise<T> {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `${githubApiUrl}${pathOrUrl}`;

  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    cache: options.cache,
    next:
      typeof options.revalidate === "number"
        ? { revalidate: options.revalidate }
        : undefined,
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${url}`);
  }

  return response.json() as Promise<T>;
}

function toPortfolioProject(
  repository: GitHubRepositoryResponse,
  source: ProjectSource,
): PortfolioProject {
  return {
    id: repository.full_name,
    fullName: repository.full_name,
    name: repository.name,
    owner: repository.owner.login,
    description: repository.description ?? "Repositorio sem descricao publica.",
    htmlUrl: repository.html_url,
    homepageUrl: repository.homepage || null,
    language: repository.language,
    topics: repository.topics ?? [],
    pushedAt: repository.pushed_at,
    stargazersCount: repository.stargazers_count,
    forksCount: repository.forks_count,
    isPrivate: repository.private,
    isFork: repository.fork,
    source,
  };
}

export async function fetchRepository(
  fullName: string,
  options: GitHubFetchOptions = {},
): Promise<PortfolioProject | null> {
  const [owner, repo] = fullName.split("/");

  if (!owner || !repo) {
    return fallbackProjects[fullName] ?? null;
  }

  try {
    const repository = await requestGitHub<GitHubRepositoryResponse>(
      `/repos/${owner}/${repo}`,
      options,
    );

    return toPortfolioProject(
      repository,
      owner.toLowerCase() === "pedro-sls" ? "owner" : "contribution",
    );
  } catch {
    return fallbackProjects[fullName] ?? null;
  }
}

async function fetchOwnedRepositories(username: string) {
  const repositories = await requestGitHub<GitHubRepositoryResponse[]>(
    `/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    { cache: "no-store" },
  );

  return repositories.map((repository) =>
    toPortfolioProject(repository, "owner"),
  );
}

async function fetchContributionRepositories(username: string) {
  const query = encodeURIComponent(`author:${username} type:pr`);
  const search = await requestGitHub<GitHubIssueSearchResponse>(
    `/search/issues?q=${query}&per_page=100&sort=updated&order=desc`,
    { cache: "no-store" },
  );

  const repositoryUrls = [...new Set(search.items.map((item) => item.repository_url))]
    .filter((url) => {
      const repositoryPath = url.split("/repos/")[1];
      const owner = repositoryPath?.split("/")[0];

      return owner?.toLowerCase() !== username.toLowerCase();
    })
    .slice(0, 50);

  const repositories = await Promise.all(
    repositoryUrls.map(async (url) => {
      try {
        const repository = await requestGitHub<GitHubRepositoryResponse>(url, {
          cache: "no-store",
        });

        return toPortfolioProject(repository, "contribution");
      } catch {
        return null;
      }
    }),
  );

  return repositories.filter((repository): repository is PortfolioProject =>
    Boolean(repository),
  );
}

export async function listPortfolioRepositories(username: string) {
  const repositories = new Map<string, PortfolioProject>();
  const results = await Promise.allSettled([
    fetchOwnedRepositories(username),
    fetchContributionRepositories(username),
  ]);

  for (const result of results) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const repository of result.value) {
      repositories.set(repository.fullName, repository);
    }
  }

  for (const fallbackProject of Object.values(fallbackProjects)) {
    if (!repositories.has(fallbackProject.fullName)) {
      repositories.set(fallbackProject.fullName, fallbackProject);
    }
  }

  return [...repositories.values()].sort((a, b) => {
    const aTime = a.pushedAt ? new Date(a.pushedAt).getTime() : 0;
    const bTime = b.pushedAt ? new Date(b.pushedAt).getTime() : 0;

    return bTime - aTime;
  });
}
