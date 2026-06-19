# Arquitetura

## Visão geral

O portfólio será uma aplicação web estática/semidinâmica construída com Next.js, priorizando performance, SEO, acessibilidade e manutenção simples.

## Decisões técnicas

- Next.js com App Router para organizar páginas, layouts e metadados.
- TypeScript para reduzir erros e melhorar evolução do código.
- Tailwind CSS para construir uma interface consistente sem criar CSS excessivo.
- Conteúdo inicial versionado em arquivos TypeScript dentro de `src/data`.
- Deploy na Vercel pela integração natural com Next.js.

## Estrutura planejada

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    projetos/
      [slug]/
        page.tsx
  components/
    Hero.tsx
    SocialLinks.tsx
    TechStack.tsx
    ProjectCard.tsx
    ContactSection.tsx
  data/
    profile.ts
    projects.ts
    stack.ts
  lib/
    github.ts
public/
  images/
```

## Camadas

- `app`: rotas, páginas, layouts e metadados.
- `components`: componentes visuais reutilizáveis.
- `data`: conteúdo editável do portfólio.
- `lib`: funções auxiliares e integrações externas.
- `public`: imagens e arquivos estáticos.

## Qualidade

O projeto deve manter:

- componentes pequenos e com responsabilidade clara;
- dados separados da interface;
- nomes explícitos para arquivos, funções e props;
- acessibilidade básica em links, botões, textos alternativos e contraste;
- validações de lint e build antes de merge.
