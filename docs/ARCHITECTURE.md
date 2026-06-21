# Arquitetura

## Visao geral

O portfolio e uma aplicacao web construida com Next.js, priorizando
performance, acessibilidade, manutencao simples e evolucao incremental.

## Decisoes tecnicas

- Next.js com App Router para organizar paginas, layouts e metadados.
- TypeScript para reduzir erros e melhorar evolucao do codigo.
- Tailwind CSS para construir uma interface consistente sem CSS excessivo.
- Conteudo versionado em arquivos TypeScript dentro de `src/data`.
- Deteccao de idioma via `Accept-Language`, usando ingles como padrao e
  portugues para navegadores configurados em `pt`.
- Deploy planejado na Vercel pela integracao natural com Next.js.

## Estrutura atual

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    opengraph-image.tsx
    robots.ts
    sitemap.ts
  data/
    profile.ts
    site.ts
    site-copy.ts
  lib/
    locale.ts
public/
```

## Estrutura planejada

```txt
src/
  app/
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
    projects.ts
```

## Camadas

- `app`: rotas, paginas, layouts e metadados.
- `components`: componentes visuais reutilizaveis, quando a pagina crescer.
- `data`: conteudo editavel do portfolio e configuracoes do site.
- `lib`: funcoes auxiliares e integracoes externas.
- `public`: imagens e arquivos estaticos.

## SEO e compartilhamento

Os metadados ficam centralizados em `src/data/site.ts` e sao aplicados pelo
`generateMetadata` do layout principal. A URL publica usa esta prioridade:

1. `NEXT_PUBLIC_SITE_URL`, quando definida.
2. `VERCEL_URL`, quando o deploy estiver na Vercel.
3. `http://localhost:3000`, para desenvolvimento local.

O projeto tambem gera `opengraph-image`, `robots.txt` e `sitemap.xml` pelo App
Router do Next.js.

## Internacionalizacao

Nesta fase, a pagina principal escolhe o idioma com base no header
`Accept-Language`:

- `pt-*`: renderiza os textos em portugues.
- Demais idiomas: renderiza em ingles.

Essa abordagem mantem a implementacao simples para a primeira versao. Se o
portfolio precisar de SEO multilingue completo, a evolucao natural e criar
rotas dedicadas como `/en` e `/pt`.

## Qualidade

O projeto deve manter:

- componentes pequenos e com responsabilidade clara;
- dados separados da interface;
- nomes explicitos para arquivos, funcoes e props;
- acessibilidade basica em links, botoes, textos alternativos e contraste;
- validacoes de lint e build antes de merge.
