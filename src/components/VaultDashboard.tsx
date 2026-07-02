"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ExternalLink,
  GitBranch,
  Loader2,
  LogOut,
  RefreshCw,
  Save,
  Search,
  Star,
} from "lucide-react";
import type { PortfolioProject } from "@/types/project";

type RepositoriesResponse = {
  repositories: PortfolioProject[];
  selected: string[];
  tokenConfigured: boolean;
};

export function VaultDashboard() {
  const [repositories, setRepositories] = useState<PortfolioProject[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tokenConfigured, setTokenConfigured] = useState(false);

  async function fetchRepositoriesData() {
    const response = await fetch("/api/github/repositories", {
      cache: "no-store",
    });
    const data = (await response.json()) as Partial<RepositoriesResponse> & {
      message?: string;
    };

    if (!response.ok || !data.repositories || !data.selected) {
      throw new Error(data.message ?? "Nao foi possivel carregar repositorios.");
    }

    return {
      repositories: data.repositories,
      selected: data.selected,
      tokenConfigured: Boolean(data.tokenConfigured),
    };
  }

  function applyRepositoriesData(data: RepositoriesResponse) {
    setRepositories(data.repositories);
    setSelectedIds(data.selected);
    setTokenConfigured(data.tokenConfigured);
  }

  async function loadRepositories() {
    setIsLoading(true);
    setMessage(null);

    try {
      applyRepositoriesData(await fetchRepositoriesData());
    } catch (error) {
      setMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function loadInitialRepositories() {
      try {
        const data = await fetchRepositoriesData();

        if (active) {
          applyRepositoriesData(data);
        }
      } catch (error) {
        if (active) {
          setMessage((error as Error).message);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialRepositories();

    return () => {
      active = false;
    };
  }, []);

  const filteredRepositories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return repositories;
    }

    return repositories.filter((repository) => {
      const searchableText = [
        repository.fullName,
        repository.description,
        repository.language,
        repository.topics.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query, repositories]);

  function toggleProject(projectId: string) {
    setSelectedIds((currentSelectedIds) =>
      currentSelectedIds.includes(projectId)
        ? currentSelectedIds.filter((selectedId) => selectedId !== projectId)
        : [...currentSelectedIds, projectId],
    );
  }

  async function saveFeaturedProjects() {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/vault/featured", {
        body: JSON.stringify({ selected: selectedIds }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
      const data = (await response.json()) as {
        message?: string;
        selected?: string[];
      };

      if (!response.ok || !data.selected) {
        setMessage(data.message ?? "Nao foi possivel salvar.");
        return;
      }

      setSelectedIds(data.selected);
      setMessage("Destaques atualizados.");
    } catch {
      setMessage("Nao foi possivel salvar.");
    } finally {
      setIsSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/vault/logout", { method: "POST" });
    window.location.assign("/");
  }

  return (
    <main className="min-h-[100dvh] bg-[#111111] px-6 py-8 text-[#f6f1e8] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              Portfolio vault
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Projetos em destaque
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#c9c2b5]">
              {selectedIds.length} selecionado
              {selectedIds.length === 1 ? "" : "s"}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={loadRepositories}
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 px-3 text-sm font-semibold text-[#f6f1e8] transition hover:border-[#8fe3d0] hover:bg-[#102725] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={16} aria-hidden="true" />
              Atualizar
            </button>
            <button
              type="button"
              onClick={saveFeaturedProjects}
              disabled={isSaving}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white px-3 text-sm font-semibold text-[#111111] transition hover:border-[#8fe3d0] hover:bg-[#8fe3d0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} aria-hidden="true" />
              {isSaving ? "Salvando" : "Salvar"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 px-3 text-sm font-semibold text-[#f6f1e8] transition hover:border-[#f06a6a] hover:bg-[#2b1515]"
            >
              <LogOut size={16} aria-hidden="true" />
              Sair
            </button>
          </div>
        </header>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block w-full md:max-w-md">
            <span className="sr-only">Buscar repositorios</span>
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d8679]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, stack ou descricao"
              className="h-11 w-full rounded-md border border-white/12 bg-[#171717] pl-10 pr-3 text-sm text-[#f6f1e8] outline-none transition placeholder:text-[#8d8679] focus:border-[#8fe3d0] focus:ring-2 focus:ring-[#8fe3d0]/30"
            />
          </label>

          <p className="text-sm text-[#8d8679]">
            {tokenConfigured
              ? "GitHub token ativo."
              : "Sem token: apenas dados publicos."}
          </p>
        </div>

        {message ? (
          <p className="mt-4 rounded-md border border-white/10 bg-[#171717] px-4 py-3 text-sm text-[#f0c86a]">
            {message}
          </p>
        ) : null}

        {isLoading ? (
          <div className="mt-10 flex items-center gap-3 text-[#c9c2b5]">
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Carregando repositorios
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredRepositories.map((repository) => {
              const selected = selectedIds.includes(repository.fullName);
              const badges = [
                repository.language,
                ...repository.topics.slice(0, 3),
              ].filter(Boolean);

              return (
                <article
                  key={repository.fullName}
                  className="rounded-lg border border-white/10 bg-[#171717] p-5 transition hover:border-[#8fe3d0] hover:bg-[#1b2423]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <label className="flex min-w-0 items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleProject(repository.fullName)}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-[#111111] accent-[#8fe3d0]"
                      />
                      <span className="min-w-0">
                        <span className="block break-words font-semibold text-[#f6f1e8]">
                          {repository.fullName}
                        </span>
                        <span className="mt-1 block text-xs uppercase tracking-normal text-[#8d8679]">
                          {repository.source === "owner"
                            ? "Repositorio proprio"
                            : "Contribuicao"}
                        </span>
                      </span>
                    </label>

                    {selected ? (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#102725] text-[#8fe3d0]">
                        <Check size={17} aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#c9c2b5]">
                    {repository.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {badges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded-md border border-white/10 bg-[#111111] px-2.5 py-1 text-xs text-[#c9c2b5]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-sm text-[#8d8679]">
                    <span className="inline-flex items-center gap-1.5">
                      <Star size={15} aria-hidden="true" />
                      {repository.stargazersCount}
                    </span>
                    <a
                      href={repository.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#8fe3d0] transition hover:text-[#f6f1e8]"
                    >
                      <GitBranch size={16} aria-hidden="true" />
                      GitHub
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
