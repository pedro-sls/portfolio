import type { Metadata } from "next";
import { VaultDashboard } from "@/components/VaultDashboard";
import { VaultLogin } from "@/components/VaultLogin";
import { isVaultConfigured, isVaultSessionValid } from "@/lib/vault-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Vault",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function VaultPage() {
  const configured = isVaultConfigured();
  const authorized = configured ? await isVaultSessionValid() : false;

  return authorized ? <VaultDashboard /> : <VaultLogin configured={configured} />;
}

