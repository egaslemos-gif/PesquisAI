# 10 - Data Model

Define o modelo de dados utilizado na aplicação. Mesmo sem base de dados complexa na v1.0, o sistema define uma hierarquia clara de objetos. Tudo será manipulado em formato **JSON**.

## Objetos Principais

- `Project`
- `Workflow`
- `Step`
- `Artifact`
- `Prompt`
- `Tool`

## Workspace (Domain State)

O **Workspace** atua como a única fonte de verdade (Single Source of Truth) para o progresso do utilizador num projeto. Apenas o Workspace pode modificar estes dados.

- **Area**: A área científica escolhida (ex: Educação, Saúde).
- **Current Step**: O ID da etapa em que o investigador se encontra.
- **Artifacts**: Um mapa (chave-valor) dos conteúdos guardados, associando o ID da etapa ao texto do artefacto gerado.
- **Checklists**: Estado de validação de cada etapa, persistindo quais os critérios assinalados (ex: `completed: ["id1", "id2"], updatedAt: "..."`).
- **Step Status**: Estado derivado de cada etapa (ex: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`).
- **History**: O percurso de etapas já visitadas, permitindo recuperar a posição anterior ou rastrear a navegação.
