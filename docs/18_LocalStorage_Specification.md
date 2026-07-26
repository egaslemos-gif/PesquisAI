# 18 — LocalStorage Specification

Definição exata do que é guardado no LocalStorage, como está organizado, e quando é lido e escrito.

---

## Chaves do LocalStorage

Cada chave tem um prefixo `rag_` (ResearchAI Guide) para evitar conflitos com outros scripts.

| Chave | Tipo | Descrição | Quando é lida | Quando é escrita |
| :--- | :--- | :--- | :--- | :--- |
| `rag_project` | JSON (Project) | Estado completo do projeto ativo | No carregamento da página | A cada ação de "Guardar" ou "Avançar" |
| `rag_currentWorkflow` | string | Workflow ativo: `"investigador"` ou `"orientador"` | No carregamento e em cada navegação | Ao selecionar workflow |
| `rag_currentStep` | string | ID da etapa ativa (ex: `"STEP-INV-03"`) | No carregamento e em cada navegação | Ao avançar/voltar de etapa |
| `rag_artifacts` | JSON (object) | Mapa de artefactos por ID (ex: `{ "ART-01": {...}, "ART-02": {...} }`) | Ao carregar etapa (para contexto) e ao gerar prompts | Ao guardar um artefacto |
| `rag_checklists` | JSON (object) | Estado das checklists por etapa (ex: `{ "STEP-INV-01": [true, true, false, false] }`) | Ao carregar uma etapa | Ao marcar/desmarcar um item |
| `rag_history` | JSON (array) | Historial de ações do utilizador | Não usado na v1.0 (reservado para auditoria futura) | A cada ação significativa |
| `rag_preferences` | JSON (object) | Preferências do utilizador (tema, língua) | No carregamento da página | Ao alterar preferências |

---

## Estrutura Detalhada

### rag_project

Corresponde ao schema `Project` definido no documento 17. É o objeto raiz que contém todo o estado.

```json
{
  "id": "proj-001",
  "title": "Meu Projeto",
  "area": "Educação",
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-20T14:00:00Z",
  "activeWorkflow": "investigador",
  "context": {
    "area": "Educação",
    "tema": "Impacto da tecnologia na aprendizagem...",
    "pergunta": "",
    "objetivos": "",
    "palavrasChave": ""
  }
}
```

---

### rag_artifacts

Mapa indexado por ID do artefacto. Permite acesso rápido a qualquer artefacto pelo seu ID.

```json
{
  "ART-01": {
    "id": "ART-01",
    "stepId": "STEP-INV-01",
    "title": "Declaração do Tema",
    "content": "O tema desta investigação é...",
    "type": "text",
    "createdAt": "2026-01-15T11:00:00Z",
    "updatedAt": "2026-01-15T11:30:00Z",
    "version": 1
  },
  "ART-02": {
    "id": "ART-02",
    "stepId": "STEP-INV-02",
    "title": "Pergunta de Investigação",
    "content": "Qual é o impacto de...",
    "type": "text",
    "createdAt": "2026-01-16T09:00:00Z",
    "updatedAt": "2026-01-16T09:15:00Z",
    "version": 1
  }
}
```

---

### rag_checklists

Estado das checklists indexado pelo ID da etapa.

```json
{
  "STEP-INV-01": [true, true, true, true],
  "STEP-INV-02": [true, false, true, false],
  "STEP-INV-03": [false, false, false, false]
}
```

---

### rag_history (reservado para v1.1+)

Array cronológico de ações do utilizador. Não utilizado na v1.0, mas a estrutura é definida para futura auditoria.

```json
[
  {
    "timestamp": "2026-01-15T10:30:00Z",
    "action": "project_created",
    "details": { "projectId": "proj-001" }
  },
  {
    "timestamp": "2026-01-15T11:00:00Z",
    "action": "artifact_saved",
    "details": { "artifactId": "ART-01", "stepId": "STEP-INV-01" }
  },
  {
    "timestamp": "2026-01-15T11:05:00Z",
    "action": "step_completed",
    "details": { "stepId": "STEP-INV-01" }
  }
]
```

---

### rag_preferences

```json
{
  "theme": "light",
  "language": "pt"
}
```

---

## Regras de Persistência

1. **Guardar ao avançar**: Sempre que o utilizador clica em "Guardar e Avançar", o artefacto da etapa atual é guardado em `rag_artifacts`, a checklist em `rag_checklists`, e o `rag_currentStep` é atualizado.

2. **Guardar ao voltar**: Ao clicar em "Anterior", o estado atual é preservado (nada é eliminado).

3. **Guardar contexto**: Quando um artefacto é guardado, o `context` no `rag_project` é atualizado automaticamente:
   - `ART-01` guardado → `context.tema` atualizado
   - `ART-02` guardado → `context.pergunta` atualizado
   - `ART-03` guardado → `context.objetivos` atualizado
   - `ART-04` guardado → `context.palavrasChave` atualizado

4. **Inicialização**: Se `rag_project` não existe no LocalStorage, o sistema mostra o Empty State + Workflow Selector.

5. **Limite de tamanho**: O LocalStorage tem um limite típico de ~5 MB. Os artefactos são texto livre, por isso é improvável ultrapassar este limite na v1.0. Se necessário na v1.1+, implementar compressão ou exportação.

6. **Sem reset automático**: O projeto só é apagado se o utilizador explicitamente pedir (via Modal de confirmação).

---

## Diagrama de Fluxo de Dados

```
Utilizador interage com UI
        │
        ▼
  Componente atualiza estado
        │
        ▼
  Estado guardado no LocalStorage
  (rag_project, rag_artifacts, rag_checklists, rag_currentStep)
        │
        ▼
  Ao recarregar a página
        │
        ▼
  Estado lido do LocalStorage
        │
        ▼
  Interface renderizada com o estado anterior
```
