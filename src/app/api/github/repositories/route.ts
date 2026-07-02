import { NextResponse } from "next/server";
import { githubProfile } from "@/data/projects";
import { readFeaturedProjectIds } from "@/lib/featured-projects";
import { listPortfolioRepositories } from "@/lib/github";
import { isVaultSessionValid } from "@/lib/vault-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!(await isVaultSessionValid())) {
    return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
  }

  const [repositories, selected] = await Promise.all([
    listPortfolioRepositories(githubProfile.username),
    readFeaturedProjectIds(),
  ]);

  return NextResponse.json({
    repositories,
    selected,
    tokenConfigured: Boolean(process.env.GITHUB_TOKEN),
  });
}

