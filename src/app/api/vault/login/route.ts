import { NextResponse } from "next/server";
import {
  isVaultConfigured,
  setVaultSessionCookie,
  verifyVaultPassword,
} from "@/lib/vault-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isVaultConfigured()) {
    return NextResponse.json(
      { message: "Nao disponivel." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!verifyVaultPassword(body?.password ?? "")) {
    return NextResponse.json({ message: "Senha invalida." }, { status: 401 });
  }

  const sessionCreated = await setVaultSessionCookie();

  if (!sessionCreated) {
    return NextResponse.json(
      { message: "Nao foi possivel criar sessao." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
