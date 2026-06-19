# ADR 0001: Stack inicial do portfólio

## Status

Aceita.

## Contexto

O projeto precisa funcionar como portfólio profissional e também como demonstração prática da stack usada por Pedro Sales, especialmente React, Next.js, TypeScript e desenvolvimento web moderno.

## Decisão

Usar Next.js com App Router, TypeScript e Tailwind CSS.

## Consequências positivas

- Demonstra domínio de uma stack relevante para aplicações web modernas.
- Facilita SEO, performance e deploy.
- Permite evolução futura para rotas dinâmicas, API routes, blog e integrações.
- Mantém o conteúdo organizado e versionado.

## Consequências negativas

- Mais estrutura do que um HTML/CSS simples.
- Exige disciplina para não criar abstrações desnecessárias.

## Alternativas consideradas

- Astro: excelente para portfólios e sites de conteúdo, mas Next.js comunica melhor a stack que queremos demonstrar.
- Vite + React: simples e rápido, mas oferece menos recursos nativos para SEO, metadados e rotas estruturadas.
