"use client";

import { FormEvent, useState } from "react";
import { KeyRound, LogIn } from "lucide-react";

type VaultLoginProps = {
  configured: boolean;
};

export function VaultLogin({ configured }: VaultLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/vault/login", {
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(data.message ?? "Nao foi possivel entrar.");
        return;
      }

      window.location.reload();
    } catch {
      setError("Nao foi possivel entrar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[100dvh] w-full max-w-md items-center px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-lg border border-white/10 bg-[#171717] p-6 shadow-2xl shadow-black/30"
      >
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-[#102725] text-[#8fe3d0]">
          <KeyRound size={22} aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold text-[#f6f1e8]">Vault</h1>
        <p className="mt-2 text-sm leading-6 text-[#c9c2b5]">
          Area privada de curadoria do portfolio.
        </p>

        <label
          htmlFor="vault-password"
          className="mt-6 block text-sm font-semibold text-[#f6f1e8]"
        >
          Senha
        </label>
        <input
          id="vault-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          disabled={!configured || isSubmitting}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 h-11 w-full rounded-md border border-white/12 bg-[#111111] px-3 text-sm text-[#f6f1e8] outline-none transition placeholder:text-[#8d8679] focus:border-[#8fe3d0] focus:ring-2 focus:ring-[#8fe3d0]/30 disabled:cursor-not-allowed disabled:opacity-60"
        />

        {error ? (
          <p className="mt-3 text-sm text-[#f06a6a]" role="alert">
            {error}
          </p>
        ) : null}

        {!configured ? (
          <p className="mt-3 text-sm text-[#f0c86a]" role="alert">
            Configure PORTFOLIO_ADMIN_PASSWORD e PORTFOLIO_SESSION_SECRET.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={!configured || isSubmitting || !password}
          className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white px-4 text-sm font-semibold text-[#111111] transition hover:border-[#8fe3d0] hover:bg-[#8fe3d0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={17} aria-hidden="true" />
          {isSubmitting ? "Entrando" : "Entrar"}
        </button>
      </form>
    </section>
  );
}

