import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { defaultFeaturedProjectIds } from "@/data/projects";
import { fetchRepository } from "@/lib/github";
import type { PortfolioProject } from "@/types/project";

const featuredProjectsPath = path.join(process.cwd(), ".portfolio-featured.json");
const redisKey =
  process.env.PORTFOLIO_FEATURED_REDIS_KEY ?? "portfolio:featured-projects";

type FeaturedProjectsStore = {
  selected: string[];
  updatedAt?: string;
};

let redisClient: Redis | null | undefined;

function getRedisClient() {
  if (redisClient !== undefined) {
    return redisClient;
  }

  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    redisClient = null;
    return redisClient;
  }

  redisClient = Redis.fromEnv();
  return redisClient;
}

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

function readSelectedFromStore(store: unknown) {
  if (!store) {
    return [];
  }

  const parsedStore =
    typeof store === "string"
      ? (JSON.parse(store) as Partial<FeaturedProjectsStore>)
      : (store as Partial<FeaturedProjectsStore>);

  if (!Array.isArray(parsedStore.selected)) {
    return [];
  }

  return normalizeProjectIds(parsedStore.selected);
}

async function readFeaturedProjectIdsFromRedis() {
  const redis = getRedisClient();

  if (!redis) {
    return [];
  }

  try {
    const store = await redis.get<FeaturedProjectsStore | string>(redisKey);

    return readSelectedFromStore(store);
  } catch (error) {
    console.warn("Could not read featured projects from Redis.", error);
    return [];
  }
}

async function readFeaturedProjectIdsFromFile() {
  try {
    const rawStore = await fs.readFile(featuredProjectsPath, "utf8");
    const selected = readSelectedFromStore(rawStore);

    if (selected.length > 0) {
      return selected;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      console.warn("Could not read featured projects store.", error);
    }
  }

  return [];
}

export async function readFeaturedProjectIds() {
  const redisProjectIds = await readFeaturedProjectIdsFromRedis();

  if (redisProjectIds.length > 0) {
    return redisProjectIds;
  }

  const fileProjectIds = await readFeaturedProjectIdsFromFile();

  if (fileProjectIds.length > 0) {
    return fileProjectIds;
  }

  const envProjectIds = readFeaturedProjectIdsFromEnv();

  if (envProjectIds.length > 0) {
    return envProjectIds;
  }

  return [...defaultFeaturedProjectIds];
}

async function writeFeaturedProjectIdsToFile(store: FeaturedProjectsStore) {
  await fs.writeFile(
    featuredProjectsPath,
    `${JSON.stringify(store, null, 2)}\n`,
    { mode: 0o600 },
  );
}

export async function writeFeaturedProjectIds(projectIds: string[]) {
  const selected = normalizeProjectIds(projectIds);
  const store: FeaturedProjectsStore = {
    selected: selected.length > 0 ? selected : [...defaultFeaturedProjectIds],
    updatedAt: new Date().toISOString(),
  };
  const redis = getRedisClient();

  if (redis) {
    await redis.set(redisKey, store);

    return {
      selected: store.selected,
      storage: "redis" as const,
    };
  }

  await writeFeaturedProjectIdsToFile(store);

  return {
    selected: store.selected,
    storage: "file" as const,
  };
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
