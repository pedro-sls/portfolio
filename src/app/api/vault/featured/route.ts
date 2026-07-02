import { NextResponse } from "next/server";
import {
  readFeaturedProjectIds,
  writeFeaturedProjectIds,
} from "@/lib/featured-projects";
import { isVaultSessionValid } from "@/lib/vault-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function unauthorized() {
  return NextResponse.json({ message: "Nao autorizado." }, { status: 401 });
}

export async function GET() {
  if (!(await isVaultSessionValid())) {
    return unauthorized();
  }

  const selected = await readFeaturedProjectIds();

  return NextResponse.json({ selected });
}

export async function PUT(request: Request) {
  if (!(await isVaultSessionValid())) {
    return unauthorized();
  }

  const body = (await request.json().catch(() => null)) as {
    selected?: unknown;
  } | null;

  if (!Array.isArray(body?.selected)) {
    return NextResponse.json(
      { message: "Lista de projetos invalida." },
      { status: 400 },
    );
  }

  try {
    const selected = await writeFeaturedProjectIds(
      body.selected.filter(
        (projectId): projectId is string => typeof projectId === "string",
      ),
    );

    return NextResponse.json({ selected });
  } catch {
    return NextResponse.json(
      { message: "Nao foi possivel salvar os destaques neste ambiente." },
      { status: 500 },
    );
  }
}
