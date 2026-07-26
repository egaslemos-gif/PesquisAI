# 17 — JSON Schemas

Definição completa de todos os objetos de dados do sistema em formato JSON. Estes schemas são a base para o LocalStorage e para a renderização da interface.

---

## Project

O objeto raiz. Representa todo o estado de uma investigação.

```json
{
  "id": "proj-001",
  "title": "Meu Projeto de Investigação",
  "area": "Educação",
  "createdAt": "2026-01-15T10:30:00Z",
  "updatedAt": "2026-01-20T14:00:00Z",
  "activeWorkflow": "investigador",
  "context": {
    "area": "Educação",
    "tema": "",
    "pergunta": "",
    "objetivos": "",
    "palavrasChave": ""
  },
  "workflows": {
    "investigador": { "...ver Workflow..." },
    "orientador": { "...ver Workflow..." }
  },
  "preferences": {
    "theme": "light",
    "language": "pt"
  }
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único do projeto |
| `title` | string | Sim | Nome do projeto |
| `area` | string | Sim | Área científica |
| `createdAt` | string (ISO 8601) | Sim | Data de criação |
| `updatedAt` | string (ISO 8601) | Sim | Data da última alteração |
| `activeWorkflow` | string | Sim | `"investigador"` ou `"orientador"` |
| `context` | object | Sim | Contexto acumulado da investigação |
| `workflows` | object | Sim | Estado de cada workflow |
| `preferences` | object | Não | Preferências do utilizador |

---

## Workflow

Representa o estado de um workflow completo.

```json
{
  "id": "wf-investigador",
  "type": "investigador",
  "currentStep": "STEP-INV-01",
  "status": "in_progress",
  "startedAt": "2026-01-15T10:30:00Z",
  "completedAt": null,
  "steps": [
    { "...ver Step..." }
  ]
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único |
| `type` | string | Sim | `"investigador"` ou `"orientador"` |
| `currentStep` | string | Sim | ID da etapa ativa |
| `status` | string | Sim | `"not_started"`, `"in_progress"`, `"completed"` |
| `startedAt` | string (ISO 8601) | Não | Quando o workflow começou |
| `completedAt` | string (ISO 8601) | Não | Quando o workflow terminou |
| `steps` | array[Step] | Sim | Lista de etapas do workflow |

---

## Step

Representa uma etapa individual do workflow.

```json
{
  "id": "STEP-INV-01",
  "title": "Definição do Tema",
  "description": "Identifique a sua área de interesse e, com apoio da IA, explore possibilidades até chegar a um tema delimitado e viável.",
  "objective": "Produzir uma declaração de tema clara, específica e com potencial de investigação.",
  "status": "completed",
  "order": 1,
  "prerequisites": [],
  "tools": ["tool-chatgpt", "tool-gemini", "tool-claude"],
  "prompts": ["PT-R-001", "PT-R-002"],
  "artifact": { "...ver Artifact..." },
  "checklist": [
    {
      "id": "chk-01-01",
      "text": "O tema está delimitado a um contexto específico?",
      "checked": true
    },
    {
      "id": "chk-01-02",
      "text": "É possível formular uma pergunta a partir deste tema?",
      "checked": true
    },
    {
      "id": "chk-01-03",
      "text": "O tema é relevante para a área científica?",
      "checked": true
    },
    {
      "id": "chk-01-04",
      "text": "O artefacto foi guardado?",
      "checked": true
    }
  ],
  "errors": [
    "Tema demasiado amplo.",
    "Tema sem foco.",
    "Confundir tema com título."
  ],
  "nextStep": "STEP-INV-02"
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único da etapa |
| `title` | string | Sim | Nome legível |
| `description` | string | Sim | O que acontece nesta etapa |
| `objective` | string | Sim | O que o utilizador deve alcançar |
| `status` | string | Sim | `"locked"`, `"pending"`, `"in_progress"`, `"completed"` |
| `order` | number | Sim | Posição no workflow (1-indexed) |
| `prerequisites` | array[string] | Sim | IDs de etapas que devem estar concluídas |
| `tools` | array[string] | Sim | IDs das ferramentas recomendadas |
| `prompts` | array[string] | Sim | IDs dos templates de prompt |
| `artifact` | Artifact \| null | Sim | Artefacto produzido (null se pendente) |
| `checklist` | array[ChecklistItem] | Sim | Itens de verificação |
| `errors` | array[string] | Não | Erros comuns (informação estática) |
| `nextStep` | string \| null | Sim | ID da próxima etapa (null se última) |

---

## Artifact

Representa o output produzido numa etapa.

```json
{
  "id": "ART-01",
  "stepId": "STEP-INV-01",
  "title": "Declaração do Tema",
  "content": "O tema desta investigação é...",
  "type": "text",
  "createdAt": "2026-01-15T11:00:00Z",
  "updatedAt": "2026-01-15T11:30:00Z",
  "version": 1
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único do artefacto |
| `stepId` | string | Sim | ID da etapa que produziu este artefacto |
| `title` | string | Sim | Nome do artefacto |
| `content` | string | Sim | Conteúdo do artefacto (texto livre) |
| `type` | string | Sim | Tipo do conteúdo: `"text"`, `"list"`, `"table"` |
| `createdAt` | string (ISO 8601) | Sim | Data de criação |
| `updatedAt` | string (ISO 8601) | Sim | Data da última edição |
| `version` | number | Sim | Versão (incrementa a cada edição) |

---

## Prompt

Representa um template de prompt com variáveis.

```json
{
  "id": "PT-R-001",
  "title": "Explorar Temas na Área",
  "stepId": "STEP-INV-01",
  "template": "Sou um investigador na área de {{AREA}}.\n\nPreciso de identificar um tema de investigação...",
  "variables": [
    {
      "name": "AREA",
      "source": "context.area",
      "required": true
    }
  ],
  "expectedResult": "Lista de 5 temas com justificação e perguntas preliminares."
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único |
| `title` | string | Sim | Nome legível do prompt |
| `stepId` | string | Sim | Etapa a que pertence |
| `template` | string | Sim | Texto do prompt com variáveis `{{}}` |
| `variables` | array[Variable] | Sim | Variáveis usadas no template |
| `expectedResult` | string | Sim | Descrição do resultado esperado |

### Variable

```json
{
  "name": "AREA",
  "source": "context.area",
  "required": true
}
```

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | string | Sim | Nome da variável (sem `{{ }}`) |
| `source` | string | Sim | Caminho no objeto Project para obter o valor |
| `required` | boolean | Sim | Se é obrigatória para gerar o prompt |

---

## Tool

Representa uma ferramenta de IA recomendada.

```json
{
  "id": "tool-chatgpt",
  "name": "ChatGPT",
  "provider": "OpenAI",
  "url": "https://chat.openai.com",
  "type": "LLM",
  "purpose": "Exploração de ideias, brainstorming, geração de texto.",
  "strengths": ["Interface intuitiva", "Boa capacidade de seguir instruções"],
  "limitations": ["Pode gerar informações incorretas", "Conhecimento com data limite"],
  "tip": "Ideal para as etapas iniciais de exploração.",
  "steps": ["STEP-INV-01", "STEP-INV-02", "STEP-INV-03", "STEP-INV-04"]
}
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único |
| `name` | string | Sim | Nome da ferramenta |
| `provider` | string | Sim | Empresa/organização |
| `url` | string | Sim | URL de acesso |
| `type` | string | Sim | Tipo de ferramenta |
| `purpose` | string | Sim | Para que serve |
| `strengths` | array[string] | Sim | Pontos fortes |
| `limitations` | array[string] | Sim | Limitações |
| `tip` | string | Não | Dica para o utilizador |
| `steps` | array[string] | Sim | Etapas em que é recomendada |

---

## ChecklistItem

```json
{
  "id": "chk-01-01",
  "text": "O tema está delimitado a um contexto específico?",
  "checked": false
}
```

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | string | Sim | Identificador único |
| `text` | string | Sim | Texto do item |
| `checked` | boolean | Sim | Se está marcado |
