# Contribuindo

Este projeto segue um fluxo simples, previsível e orientado a qualidade.

## Fluxo de trabalho

1. Atualize sua branch base.
2. Crie uma branch com nome descritivo.
3. Faça commits pequenos e claros.
4. Execute as validações disponíveis antes de abrir Pull Request.
5. Abra PR para revisão.

## Nomenclatura de branches

Use nomes curtos e objetivos:

```txt
feature/bootstrap-nextjs
feature/hero-section
feature/projects-section
fix/mobile-navigation
chore/update-dependencies
```

## Commits

Use Conventional Commits:

```txt
tipo: descrição curta no imperativo
```

Tipos aceitos:

- `feat`: nova funcionalidade.
- `fix`: correção de bug.
- `docs`: documentação.
- `style`: formatação ou estilo sem mudança de lógica.
- `refactor`: refatoração sem mudança de comportamento.
- `test`: testes.
- `chore`: manutenção.
- `ci`: integração contínua.
- `build`: build ou dependências.

## Pull Requests

Todo PR deve conter:

- resumo claro do que mudou;
- evidências de validação;
- riscos ou limitações conhecidos;
- prints quando alterar interface.

## Definition of Done

Uma tarefa só é considerada concluída quando:

- o código está versionado em uma branch adequada;
- os commits são descritivos;
- lint e build passam;
- a interface foi conferida em desktop e mobile, quando aplicável;
- não há credenciais, tokens ou dados sensíveis no código;
- a documentação foi atualizada quando necessário.
