import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { stackGroups } from "@/data/stack";

const socialLinks = [
  { label: "GitHub", href: profile.links.github },
  { label: "LinkedIn", href: profile.links.linkedin },
  { label: "Instagram", href: profile.links.instagram },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#171717]">
      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-6 py-12 md:grid-cols-[1fr_360px] md:px-10 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-[#d8d0c2] bg-white/70 px-3 py-2 text-sm font-medium text-[#5f5a50]">
            <MapPin size={16} aria-hidden="true" />
            {profile.location}
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-[#171717] sm:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-5 text-xl font-medium text-[#255c4a]">
            {profile.role}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4c4740]">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-[#171717] bg-[#171717] px-4 text-sm font-semibold text-white transition hover:bg-[#255c4a]"
              >
                {label}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="justify-self-center md:justify-self-end">
          <div className="relative aspect-square w-64 overflow-hidden rounded-lg border border-[#d8d0c2] bg-white shadow-sm sm:w-80">
            <Image
              src={profile.avatarUrl}
              alt="Foto de perfil de Pedro Sales"
              fill
              sizes="(min-width: 768px) 320px, 256px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8d0c2] bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[0.8fr_1.2fr] md:px-10 lg:px-12">
          <div>
            <p className="text-sm font-semibold uppercase text-[#8d5b2d]">
              Sobre
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#171717]">
              Construindo base full stack com projetos reais.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-[#4c4740]">
            <p>
              Sou estudante de Engenharia de Software no IFPB. Gosto de
              transformar ideias em aplicacoes web conectando front-end,
              back-end, banco de dados e automacoes.
            </p>
            <p>
              Este portfolio nasce como um projeto de Engenharia de Software:
              com branches, commits descritivos, documentacao, revisao por PR e
              evolucao incremental.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase text-[#8d5b2d]">
            Stack
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#171717]">
            Ferramentas que uso para tirar ideias do papel.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <section
              key={group.title}
              className="rounded-lg border border-[#d8d0c2] bg-white p-5"
            >
              <h3 className="font-semibold text-[#171717]">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-[#eef4ef] px-3 py-1 text-sm font-medium text-[#255c4a]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="bg-[#171717] text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 lg:px-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase text-[#f4c430]">
              Projetos
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Primeiros destaques do GitHub.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-white/15 bg-white/5 p-5 transition hover:border-[#f4c430]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/75">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium text-white/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
