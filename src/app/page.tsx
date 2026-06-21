import Image from "next/image";
import {
  ArrowUpRight,
  Braces,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  GitBranch,
  Layers3,
  MapPin,
  Rocket,
  ServerCog,
  Terminal,
  Workflow,
} from "lucide-react";
import { profile } from "@/data/profile";
import { projectPlaceholder } from "@/data/projects";
import { stackGroups } from "@/data/stack";

const socialLinks = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Instagram", href: profile.links.instagram },
];

const engineeringFlow = [
  {
    title: "Product thinking",
    description: "Entender problema, contexto e fluxo antes de abrir o editor.",
    icon: Layers3,
  },
  {
    title: "Clean implementation",
    description: "Separar dados, UI e regras para manter o codigo facil de evoluir.",
    icon: Code2,
  },
  {
    title: "Delivery discipline",
    description: "Branches, commits claros, revisao por PR, build e deploy.",
    icon: GitBranch,
  },
];

const systemLayers = [
  { label: "Interface", value: "React + Next.js", icon: Braces },
  { label: "Server side", value: "Flask + APIs", icon: ServerCog },
  { label: "Data layer", value: "PostgreSQL", icon: Database },
  { label: "Automation", value: "n8n + Make", icon: Workflow },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#f6f1e8]">
      <section className="software-grid border-b border-white/10">
        <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-[1fr_380px] md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#2c5f5d] bg-[#102725] px-3 py-2 text-sm font-medium text-[#8fe3d0]">
              <MapPin size={16} aria-hidden="true" />
              {profile.location}
            </p>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#f6f1e8] sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-5 max-w-2xl font-mono text-base leading-7 text-[#f0c86a] sm:text-lg">
              {profile.role}
            </p>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c9c2b5]">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex h-11 items-center gap-2 rounded-md border border-white/15 bg-white px-4 text-sm font-semibold text-[#111111] transition duration-200 hover:-translate-y-0.5 hover:border-[#8fe3d0] hover:bg-[#8fe3d0]"
                >
                  {label}
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
                <span className="ml-2 text-[#8d8679]">portfolio/system.ts</span>
              </div>
              <div className="mt-5 grid gap-4">
                <div className="relative aspect-square w-64 overflow-hidden rounded-md border border-white/10 bg-[#202020] sm:w-80">
                  <Image
                    src={profile.avatarUrl}
                    alt="Foto de perfil de Pedro Sales"
                    fill
                    sizes="(min-width: 768px) 320px, 256px"
                    priority
                    className="object-cover grayscale transition duration-300 hover:grayscale-0"
                  />
                </div>
                <div className="grid gap-2 font-mono text-xs text-[#c9c2b5]">
                  <p>
                    <span className="text-[#8fe3d0]">status:</span> building
                    software foundations
                  </p>
                  <p>
                    <span className="text-[#8fe3d0]">focus:</span> web,
                    automations, integrations
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
              Sobre
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#f6f1e8]">
              Engenharia antes da tela bonita.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#c9c2b5]">
            <p>
              Sou estudante de Engenharia de Software no IFPB. Gosto de
              transformar ideias em aplicacoes web conectando front-end,
              back-end, banco de dados e automacoes.
            </p>
            <p>
              Este portfolio tambem e um laboratorio profissional: estrutura de
              branches, commits descritivos, documentacao, revisao por PR e
              evolucao incremental desde o primeiro passo.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#121b1a] text-[#f6f1e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              Processo
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              Um jeito de construir que combina produto, codigo e entrega.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {engineeringFlow.map(({ title, description, icon: Icon }) => (
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
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0f1514] text-[#f6f1e8]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-12">
          <div>
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              Arquitetura
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Stack organizada por responsabilidade.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#c9c2b5]">
              A ideia e deixar claro onde cada ferramenta entra no sistema:
              interface, regra, dados, automacoes e entrega.
            </p>
          </div>

          <div className="grid gap-3">
            {systemLayers.map(({ label, value, icon: Icon }) => (
              <article
                key={label}
                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#171717] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#8fe3d0] hover:bg-[#1b2423]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#102725] text-[#8fe3d0]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase text-[#8d8679]">
                      {label}
                    </p>
                    <h3 className="font-semibold text-[#f6f1e8]">{value}</h3>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#8fe3d0] opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111111] text-[#f6f1e8]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="font-mono text-sm font-semibold uppercase text-[#8fe3d0]">
              Stack
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              Ferramentas que uso para tirar ideias do papel.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stackGroups.map((group) => (
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
              Projetos
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold">
              Projetos selecionados entram aqui quando estiverem prontos.
            </h2>
          </div>

          <div className="rounded-lg border border-dashed border-white/20 bg-[#171717] p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#8fe3d0] hover:bg-[#1b2423] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-[#102725] text-[#f0c86a]">
                  <Rocket size={22} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-[#f6f1e8]">
                  {projectPlaceholder.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[#c9c2b5]">
                  {projectPlaceholder.description}
                </p>
              </div>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 px-4 text-sm font-semibold text-[#f6f1e8] transition hover:border-[#8fe3d0] hover:bg-[#8fe3d0] hover:text-[#111111]"
              >
                Ver GitHub
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#111111] px-6 py-8 text-center font-mono text-sm text-[#8d8679]">
        <Terminal size={16} className="mr-2 inline" aria-hidden="true" />
        build, measure, improve
      </footer>
    </main>
  );
}
