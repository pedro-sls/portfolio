import {
  ArrowUpRight,
  Braces,
  CalendarDays,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GitFork,
  GitBranch,
  Globe2,
  Layers3,
  MapPin,
  Rocket,
  ServerCog,
  Star,
  Terminal,
  Workflow,
} from "lucide-react";
import { SecretAvatar } from "@/components/SecretAvatar";
import { profile } from "@/data/profile";
import { siteCopy } from "@/data/site-copy";
import { getFeaturedProjects } from "@/lib/featured-projects";
import { getPreferredLocale } from "@/lib/locale";
import type { PortfolioProject } from "@/types/project";

const socialLinks = [
  { key: "github", href: profile.links.github },
  { key: "linkedin", href: profile.links.linkedin },
  { key: "instagram", href: profile.links.instagram },
] as const;

const processIcons = [Layers3, Code2, GitBranch];

const architectureIcons = [Braces, ServerCog, Database, Workflow];

function getProjectBadges(project: PortfolioProject) {
  return [project.language, ...project.topics].filter(Boolean).slice(0, 4);
}

function formatProjectDate(value: string | null, locale: "en" | "pt") {
  if (!value) {
    return locale === "pt" ? "Sem data" : "No date";
  }

  return new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default async function Home() {
  const locale = await getPreferredLocale();
  const copy = siteCopy[locale];
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="min-h-[100dvh] bg-[#111111] text-[#f6f1e8]">
      <section className="software-grid border-b border-white/10">
        <div className="mx-auto grid min-h-[100svh] w-full max-w-6xl items-center gap-12 px-6 py-14 sm:py-16 md:grid-cols-[1fr_380px] md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#2c5f5d] bg-[#102725] px-3 py-2 text-sm font-medium text-[#8fe3d0]">
              <MapPin size={16} aria-hidden="true" />
              {copy.profile.location}
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[#f6f1e8] sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-2xl font-mono text-base leading-7 text-[#f0c86a] sm:text-lg">
              {copy.profile.role}
            </p>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9c2b5]">
              {copy.profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white px-4 text-sm font-semibold text-[#111111] transition duration-200 hover:-translate-y-0.5 hover:border-[#8fe3d0] hover:bg-[#8fe3d0]"
                >
                  {copy.social[key]}
                  <ArrowUpRight
                    size={18}
                    className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <aside className="justify-self-center md:justify-self-end">
            <div className="rounded-lg border border-white/12 bg-[#171717] p-4 shadow-2xl shadow-black/30">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs text-[#8fe3d0]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f06a6a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f0c86a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#8fe3d0]" />
                <span className="ml-2 text-[#8d8679]">
                  {copy.terminal.file}
                </span>
              </div>
              <div className="mt-5 grid gap-4">
                <SecretAvatar
                  src={profile.avatarUrl}
                  alt="Foto de perfil de Pedro Sales"
                />
                <div className="grid gap-2 font-mono text-xs text-[#c9c2b5]">
                  <p>
                    <span className="text-[#8fe3d0]">
                      {copy.terminal.statusLabel}
                    </span>{" "}
                    {copy.terminal.status}
                  </p>
                  <p>
                    <span className="text-[#8fe3d0]">
                      {copy.terminal.focusLabel}
                    </span>{" "}
                    {copy.terminal.focus}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#171717]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.85fr_1.15fr] md:px-10 lg:px-12">
          <div>
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              {copy.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#f6f1e8]">
              {copy.about.title}
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#c9c2b5]">
            {copy.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#121b1a] text-[#f6f1e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              {copy.process.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              {copy.process.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {copy.process.items.map(({ title, description }, index) => {
              const Icon = processIcons[index];

              return (
                <article
                  key={title}
                  className="group rounded-lg border border-white/10 bg-[#171717] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#8fe3d0] hover:bg-[#1b2423] hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#102725] text-[#8fe3d0] transition group-hover:bg-[#8fe3d0] group-hover:text-[#111111]">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#f6f1e8]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#c9c2b5]">
                    {description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0f1514] text-[#f6f1e8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              {copy.architecture.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              {copy.architecture.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#c9c2b5]">
              {copy.architecture.description}
            </p>
          </div>

          <div className="grid gap-3">
            {copy.architecture.layers.map(({ label, value }, index) => {
              const Icon = architectureIcons[index];

              return (
                <article
                  key={label}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#171717] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#8fe3d0] hover:bg-[#1b2423]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#102725] text-[#8fe3d0]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase text-[#8d8679]">
                        {label}
                      </p>
                      <h3 className="break-words font-semibold text-[#f6f1e8]">
                        {value}
                      </h3>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-[#8fe3d0] opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111111] text-[#f6f1e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              {copy.stack.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              {copy.stack.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.stack.groups.map((group) => (
              <section
                key={group.title}
                className="group rounded-lg border border-white/12 bg-white/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#8fe3d0] hover:bg-white/[0.08] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-[#f6f1e8]">
                    {group.title}
                  </h3>
                  <Cpu
                    size={18}
                    className="text-[#f0c86a] transition group-hover:rotate-12"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 bg-[#171717] px-3 py-1 text-sm font-medium text-[#c9c2b5] transition group-hover:border-[#8fe3d0]/40"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121b1a] text-[#f6f1e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              {copy.projects.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              {copy.projects.title}
            </h2>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {featuredProjects.map((project) => {
                const badges = getProjectBadges(project);

                return (
                  <article
                    key={project.fullName}
                    className="rounded-lg border border-white/10 bg-[#171717] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#8fe3d0] hover:bg-[#1b2423] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#102725] text-[#f0c86a]">
                        <Rocket size={22} aria-hidden="true" />
                      </div>
                      <span className="rounded-md border border-white/10 bg-[#111111] px-3 py-1 text-xs font-semibold uppercase text-[#8fe3d0]">
                        {project.source === "owner"
                          ? copy.projects.ownerLabel
                          : copy.projects.contributionLabel}
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold text-[#f6f1e8]">
                      {project.name}
                    </h3>
                    <p className="mt-1 break-words font-mono text-sm text-[#8d8679]">
                      {project.fullName}
                    </p>
                    <p className="mt-4 text-base leading-7 text-[#c9c2b5]">
                      {project.description}
                    </p>

                    {badges.length > 0 ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-md border border-white/10 bg-[#111111] px-3 py-1 text-sm font-medium text-[#c9c2b5]"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <dl className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm text-[#c9c2b5] sm:grid-cols-3">
                      <div>
                        <dt className="flex items-center gap-1.5 text-[#8d8679]">
                          <Star size={15} aria-hidden="true" />
                          {copy.projects.starsLabel}
                        </dt>
                        <dd className="mt-1 font-semibold text-[#f6f1e8]">
                          {project.stargazersCount}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-[#8d8679]">
                          <GitFork size={15} aria-hidden="true" />
                          {copy.projects.forksLabel}
                        </dt>
                        <dd className="mt-1 font-semibold text-[#f6f1e8]">
                          {project.forksCount}
                        </dd>
                      </div>
                      <div>
                        <dt className="flex items-center gap-1.5 text-[#8d8679]">
                          <CalendarDays size={15} aria-hidden="true" />
                          {copy.projects.updatedLabel}
                        </dt>
                        <dd className="mt-1 font-semibold text-[#f6f1e8]">
                          {formatProjectDate(project.pushedAt, locale)}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={project.htmlUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white px-4 text-sm font-semibold text-[#111111] transition hover:border-[#8fe3d0] hover:bg-[#8fe3d0]"
                      >
                        <GitBranch size={17} aria-hidden="true" />
                        {copy.projects.repositoryAction}
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                      {project.homepageUrl ? (
                        <a
                          href={project.homepageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-4 text-sm font-semibold text-[#f6f1e8] transition hover:border-[#8fe3d0] hover:bg-[#8fe3d0] hover:text-[#111111]"
                        >
                          <Globe2 size={17} aria-hidden="true" />
                          {copy.projects.demoAction}
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/20 bg-[#171717] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-[#102725] text-[#f0c86a]">
                <Rocket size={22} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-[#f6f1e8]">
                {copy.projects.emptyTitle}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#c9c2b5]">
                {copy.projects.emptyDescription}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#111111] px-6 py-8 text-center font-mono text-sm text-[#8d8679]">
        <Terminal size={16} className="mr-2 inline" aria-hidden="true" />
        {copy.footer}
      </footer>
    </main>
  );
}
