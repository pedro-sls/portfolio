export const siteCopy = {
  en: {
    profile: {
      role: "Software Engineering | Web Development | Automation",
      summary:
        "Software Engineering student at IFPB focused on web applications, integrations, and digital solutions that are simple to use and easy to evolve.",
      location: "Paraiba, Brazil",
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
    terminal: {
      file: "portfolio/system.ts",
      statusLabel: "status:",
      status: "building software foundations",
      focusLabel: "focus:",
      focus: "web, automation, integrations",
    },
    about: {
      eyebrow: "About",
      title: "Engineering before aesthetics.",
      paragraphs: [
        "I am a Software Engineering student at IFPB. I enjoy turning ideas into web applications by connecting front-end, back-end, databases, and automation.",
        "This portfolio is also a professional lab: branch structure, descriptive commits, documentation, pull request review, and incremental evolution from the very first step.",
      ],
    },
    process: {
      eyebrow: "Process",
      title: "A way of building that connects product, code, and delivery.",
      items: [
        {
          title: "Product thinking",
          description:
            "Understand the problem, context, and user flow before opening the editor.",
        },
        {
          title: "Clean implementation",
          description:
            "Separate data, UI, and rules to keep the codebase easy to evolve.",
        },
        {
          title: "Delivery discipline",
          description:
            "Branches, clear commits, pull requests, build checks, and deploy.",
        },
      ],
    },
    architecture: {
      eyebrow: "Architecture",
      title: "Stack organized by responsibility.",
      description:
        "The goal is to make clear where each tool fits in the system: interface, business logic, data, automation, and delivery.",
      layers: [
        { label: "Interface", value: "React + Next.js" },
        { label: "Server side", value: "Flask + APIs" },
        { label: "Data layer", value: "PostgreSQL" },
        { label: "Automation", value: "n8n + Make" },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Tools I use to move ideas from concept to software.",
      groups: [
        { title: "Back-end", items: ["Python", "Flask", "PostgreSQL"] },
        {
          title: "Front-end",
          items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
        },
        { title: "Cloud and automation", items: ["AWS", "n8n", "Make"] },
        {
          title: "Tooling",
          items: ["Git", "GitHub", "TypeScript", "Tailwind CSS"],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Selected projects will be added here when they are ready.",
      cardTitle: "Projects in curation",
      description:
        "This area is reserved for stronger case studies, including the problem, solution, stack, repository, and demo. The list will be updated when the next projects are ready to present.",
      action: "View GitHub",
    },
    footer: "build, measure, improve",
  },
  pt: {
    profile: {
      role: "Engenharia de Software | Desenvolvimento Web | Automacoes",
      summary:
        "Estudante de Engenharia de Software no IFPB, com foco em aplicacoes web, integracoes e solucoes digitais simples de usar e faceis de evoluir.",
      location: "Paraiba, Brasil",
    },
    social: {
      github: "GitHub",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    },
    terminal: {
      file: "portfolio/system.ts",
      statusLabel: "status:",
      status: "construindo bases de software",
      focusLabel: "foco:",
      focus: "web, automacoes, integracoes",
    },
    about: {
      eyebrow: "Sobre",
      title: "Engenharia antes da tela bonita.",
      paragraphs: [
        "Sou estudante de Engenharia de Software no IFPB. Gosto de transformar ideias em aplicacoes web conectando front-end, back-end, banco de dados e automacoes.",
        "Este portfolio tambem e um laboratorio profissional: estrutura de branches, commits descritivos, documentacao, revisao por PR e evolucao incremental desde o primeiro passo.",
      ],
    },
    process: {
      eyebrow: "Processo",
      title: "Um jeito de construir que combina produto, codigo e entrega.",
      items: [
        {
          title: "Product thinking",
          description: "Entender problema, contexto e fluxo antes de abrir o editor.",
        },
        {
          title: "Clean implementation",
          description:
            "Separar dados, UI e regras para manter o codigo facil de evoluir.",
        },
        {
          title: "Delivery discipline",
          description: "Branches, commits claros, revisao por PR, build e deploy.",
        },
      ],
    },
    architecture: {
      eyebrow: "Arquitetura",
      title: "Stack organizada por responsabilidade.",
      description:
        "A ideia e deixar claro onde cada ferramenta entra no sistema: interface, regra, dados, automacoes e entrega.",
      layers: [
        { label: "Interface", value: "React + Next.js" },
        { label: "Server side", value: "Flask + APIs" },
        { label: "Data layer", value: "PostgreSQL" },
        { label: "Automation", value: "n8n + Make" },
      ],
    },
    stack: {
      eyebrow: "Stack",
      title: "Ferramentas que uso para tirar ideias do papel.",
      groups: [
        { title: "Back-end", items: ["Python", "Flask", "PostgreSQL"] },
        {
          title: "Front-end",
          items: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
        },
        { title: "Cloud e automacoes", items: ["AWS", "n8n", "Make"] },
        {
          title: "Ferramentas",
          items: ["Git", "GitHub", "TypeScript", "Tailwind CSS"],
        },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Projetos selecionados entram aqui quando estiverem prontos.",
      cardTitle: "Projetos em curadoria",
      description:
        "Esta area fica reservada para cases mais fortes, com problema, solucao, stack, repositorio e demo. A lista sera atualizada quando os proximos projetos estiverem prontos para apresentacao.",
      action: "Ver GitHub",
    },
    footer: "build, measure, improve",
  },
} as const;
