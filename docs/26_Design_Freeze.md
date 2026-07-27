# 26 — Design Freeze — v1.0

**Data:** 25 de Julho de 2026  
**Versão:** MVP v1.0  
**Estado:** Congelado

---

## Declaração

A documentação do ResearchAI Guide v1.0 está formalmente congelada.

A partir deste momento, qualquer alteração ao que está definido abaixo deixa de ser uma decisão informal e passa a ser tratada como uma evolução do produto (v1.1 ou superior), sujeita ao processo de governação definido no documento 25.

---

## Princípio de Escopo

> O valor do ResearchAI Guide não é medido pelo número de funcionalidades, mas pela capacidade de conduzir um investigador, com clareza e consistência, desde a definição do problema de investigação até à produção do artefacto científico final. Qualquer funcionalidade que não contribua diretamente para esse objetivo deve permanecer fora do MVP.

---

## O que está congelado

### ✅ Workflows

| ID | Workflow | Etapas | Estado |
| :--- | :--- | :--- | :--- |
| `WF-INV` | Investigador | 9 | Congelado |
| `WF-ORI` | Orientador | 8 | Congelado |

Nenhum workflow adicional na v1.0.

---

### ✅ Etapas

**Investigador:** 9 etapas (`STEP-INV-01` a `STEP-INV-09`)  
**Orientador:** 8 etapas (`STEP-ORI-01` a `STEP-ORI-08`)

Cada etapa com: descrição, objetivo, ferramentas, prompts, artefacto, checklist e erros comuns.  
Nenhuma etapa será adicionada, removida ou reordenada na v1.0.

---

### ✅ Prompts

**Investigador:** 11 prompts (`PT-R-001` a `PT-R-011`)  
**Orientador:** 7 prompts (`PT-S-001` a `PT-S-007`)

Cada prompt com template, variáveis e resultado esperado.  
Nenhum prompt será adicionado na v1.0. Correções de texto são permitidas.

---

### ✅ Ferramentas

9 ferramentas no catálogo:

| ID | Ferramenta |
| :--- | :--- |
| `tool-chatgpt` | ChatGPT |
| `tool-claude` | Claude |
| `tool-gemini` | Gemini |
| `tool-consensus` | Consensus |
| `tool-openalex` | OpenAlex |
| `tool-google-scholar` | Google Scholar |
| `tool-notebooklm` | NotebookLM |
| `tool-zotero` | Zotero |
| `tool-semantic-scholar` | Semantic Scholar |

Nenhuma ferramenta será adicionada ou removida na v1.0.

---

### ✅ Componentes de UI

12 componentes definidos no documento 16:

`workflow-selector` · `progress-bar` · `step-card` · `prompt-card` · `tool-card` · `artifact-card` · `checklist` · `nav-buttons` · `toast` · `modal` · `header` · `empty-state`

Nenhum componente será adicionado na v1.0.

---

### ✅ Modelo de Dados (JSON)

6 schemas congelados: `Project` · `Workflow` · `Step` · `Artifact` · `Prompt` · `Tool`

Nenhum campo será adicionado ou removido na v1.0.

---

### ✅ LocalStorage

7 chaves com prefixo `rag_`:

`rag_project` · `rag_currentWorkflow` · `rag_currentStep` · `rag_artifacts` · `rag_checklists` · `rag_history` · `rag_preferences`

Estrutura congelada. `rag_history` reservada para v1.1+.

---

### ✅ Regras de Navegação

15 regras (`RULE-NAV-01` a `RULE-NAV-15`). Congeladas.

---

### ✅ Microinterações

15 microinterações (`MI-001` a `MI-015`). Congeladas.

---

### ✅ Design System Visual

Paleta de cores, tipografia, espaçamento, sombras, breakpoints e especificação visual de cada componente. Congelados.

---

## MVP SCOPE (LOCKED)

**MVP 1.0 — Apenas:**
✔ Investigador
✔ Orientador
✔ Revisão da Literatura (Vertical Slice inicial)
✔ HTML
✔ CSS
✔ JavaScript
✔ LocalStorage
✔ Fluxo completo
✔ Artefactos
✔ Prompts
✔ Ferramentas
✔ Checklist

**Não entra:**
❌ APIs
❌ Login
❌ Cloud
❌ Exportação
❌ Analytics
❌ Multiutilizador
❌ IA integrada
❌ Sincronização
❌ Plugins
❌ Outros protocolos

---

## Estratégia de Implementação: Vertical Slice

O desenvolvimento não será horizontal (fazer todos os ecrãs para todas as situações). Será feito através de um **Vertical Slice**.

Começaremos por implementar uma única competência de ponta a ponta: o fluxo do **Investigador**.

**O que este Vertical Slice inclui:**
- Navegação completa do Passo 1 ao Passo 10.
- Lógica de progresso.
- Injeção dinâmica de variáveis nos Prompts.
- Exibição das ferramentas corretas.
- Edição e gravação de Artefactos.
- Validação das checklists.
- Persistência no LocalStorage.

Se este fluxo funcionar bem com investigadores reais, então o segundo protocolo (Orientador) será muito mais rápido de desenvolver.

---

## Tecnologias v1.0

| Camada | Tecnologia |
| :--- | :--- |
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (Vanilla, com custom properties do Design System) |
| Lógica | JavaScript (ES6+, Vanilla, sem frameworks) |
| Persistência | LocalStorage |
| Fontes | Google Fonts (Inter) |
| Ícones | Emojis nativos |

Nenhuma dependência externa. Nenhum framework. Nenhum build step.

---

## Documentação de Referência

| # | Documento | Camada |
| :--- | :--- | :--- |
| 00 | Product Manifesto | Filosofia |
| 01–11 | Product Vision → MVP Roadmap | Definição do Produto |
| 12–20 | Workflows Spec → Testing Plan | Especificações Técnicas |
| 21–25 | User Journeys → Content Governance | UX Blueprint |
| **26** | **Design Freeze (este documento)** | **Controlo** |

---

## Assinatura

A implementação em HTML/CSS/JavaScript (Vertical Slice) pode iniciar.

O que está documentado é o que será construído.  
Nada mais. Nada menos.
