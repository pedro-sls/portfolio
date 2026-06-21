# Portfolio

Portfolio pessoal de Pedro Sales, desenvolvido para apresentar trajetoria,
stack, projetos e formas de contato com uma base tecnica bem organizada.

## Objetivo

Construir um site de portfolio profissional, responsivo e facil de evoluir,
usando boas praticas de Engenharia de Software desde o inicio do projeto.

## Stack planejada

- Framework: Next.js com App Router.
- Linguagem: TypeScript.
- Estilizacao: Tailwind CSS.
- Icones: lucide-react.
- Animacoes: framer-motion, quando agregar valor a experiencia.
- Deploy: Vercel.

## Desenvolvimento local

Instale as dependencias:

```bash
npm install
```

Copie o exemplo de ambiente se quiser validar metadados com uma URL propria:

```bash
cp .env.example .env.local
```

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Valide o projeto antes de abrir Pull Request:

```bash
npm run lint
npm run build
```

## Fluxo de branches

- `main`: versao estavel e pronta para producao.
- `develop`: integracao das proximas entregas.
- `feature/*`: desenvolvimento de novas funcionalidades.
- `fix/*`: correcoes pontuais.
- `hotfix/*`: correcoes urgentes a partir de producao.

Toda mudanca relevante deve sair de uma branch de trabalho e passar por Pull
Request antes de entrar em `develop` ou `main`.

## Padrao de commits

O projeto segue Conventional Commits:

```txt
feat: adiciona nova funcionalidade
fix: corrige comportamento existente
docs: altera documentacao
style: altera formatacao/estilo sem mudar comportamento
refactor: melhora estrutura sem alterar comportamento
test: adiciona ou ajusta testes
chore: tarefas de manutencao
ci: altera pipelines e automacoes
build: altera build, dependencias ou empacotamento
```

Exemplo:

```txt
feat: add hero section
```

## Primeiras entregas

1. Definir documentacao e governanca do projeto.
2. Criar base Next.js com TypeScript, Tailwind e ESLint.
3. Implementar layout base e identidade visual.
4. Adicionar conteudo bilingue com deteccao automatica de idioma.
5. Configurar SEO, Open Graph, robots.txt e sitemap.
6. Criar secao de projetos em destaque.
7. Configurar deploy e validacoes de qualidade.

## Links

- GitHub: https://github.com/pedro-sls
- LinkedIn: https://www.linkedin.com/in/pedro-sls/
- Instagram: https://www.instagram.com/eusales07
