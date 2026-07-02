import { promises as fs } from "fs";
import path from "path";
import { defaultFeaturedProjectIds } from "@/data/projects";
import { fetchRepository } from "@/lib/github";
import type { PortfolioProject } from "@/types/project";

const featuredProjectsPath = path.join(process.cwd(), ".portfolio-featured.json");

type FeaturedProjectsStore = {
  selected: string[];
  updatedAt?: string;
};

function normalizeProjectIds(projectIds: string[]) {
  return [
    ...new Set(
      projectIds
        .map((projectId) => projectId.trim())
        .filter((projectId) => /^[\w.-]+\/[\w.-]+$/.test(projectId)),
    ),
  ];
}

function readFeaturedProjectIdsFromEnv() {
  const rawProjectIds = process.env.PORTFOLIO_FEATURED_PROJECTS;

  if (!rawProjectIds) {
    return [];
  }

  return normalizeProjectIds(rawProjectIds.split(/[,\n]/));
}

export async function readFeaturedProjectIds() {
  try {
    const rawStore = await fs.readFile(featuredProjectsPath, "utf8");
    const store = JSON.parse(rawStore) as Partial<FeaturedProjectsStore>;

    if (Array.isArray(store.selected)) {
      const selected = normalizeProjectIds(store.selected);

      if (selected.length > 0) {
        return selected;
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Could not read featured projects store.", error);
    }
  }

  const envProjectIds = readFeaturedProjectIdsFromEnv();

  if (envProjectIds.length > 0) {
    return envProjectIds;
  }

  return [...defaultFeaturedProjectIds];
}

export async function writeFeaturedProjectIds(projectIds: string[]) {
  const selected = normalizeProjectIds(projectIds);
  const store: FeaturedProjectsStore = {
    selected: selected.length > 0 ? selected : [...defaultFeaturedProjectIds],
    updatedAt: new Date().toISOString(),
  };

  await fs.writeFile(
    featuredProjectsPath,
    `${JSON.stringify(store, null, 2)}\n`,
    { mode: 0o600 },
  );

  return store.selected;
}

export async function getFeaturedProjects(): Promise<PortfolioProject[]> {
  const projectIds = await readFeaturedProjectIds();
  const projects = await Promise.all(
    projectIds.map((projectId) =>
      fetchRepository(projectId, {
        revalidate: 60 * 30,
      }),
    ),
  );

  return projects.filter((project): project is PortfolioProject =>
    Boolean(project),
  );
}
