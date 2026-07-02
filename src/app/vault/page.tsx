import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VaultDashboard } from "@/components/VaultDashboard";
import { VaultLogin } from "@/components/VaultLogin";
import { isVaultConfigured, isVaultSessionValid } from "@/lib/vault-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Entrar",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function VaultPage() {
  const configured = isVaultConfigured();

  if (!configured) {
    notFound();
  }

  const authorized = await isVaultSessionValid();

  return authorized ? <VaultDashboard /> : <VaultLogin />;
}
