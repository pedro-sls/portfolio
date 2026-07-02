import { NextResponse } from "next/server";
import { clearVaultSessionCookie } from "@/lib/vault-auth";

export const runtime = "nodejs";

export async function POST() {
  await clearVaultSessionCookie();

  return NextResponse.json({ ok: true });
}

