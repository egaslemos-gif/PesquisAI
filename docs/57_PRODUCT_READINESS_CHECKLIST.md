# Product Readiness Checklist (v1.0 Release Gate)

Este documento centraliza todos os critérios de maturidade exigidos para declarar a versão 1.0 do **Guia do Investigador** pronta para produção e testes reais. Está estruturado em 6 *Sprints* de refinamento ("Product Polish Sprints") e no estabelecimento de um *Design System*.

## Sprint P1 — Consistência Visual ⭐⭐⭐⭐⭐
- [ ] **Ícones Lucide**: Substituição de emojis por ícones SVG (Lucide) em toda a interface.
- [ ] **Sistema de Botões**: Restrição a 4 variantes oficiais (`PRIMARY`, `SECONDARY`, `GHOST`, `DISABLED`).
- [ ] **Paleta de Cores**: Congelamento da paleta e eliminação de cores *hardcoded*.
- [ ] **Microinterações**: Adição de efeito *hover* sutil (transição de 150ms) nos painéis e componentes.
- [ ] **Terminologia AO90**: Adoção do Português Internacional.
  - Workspace → **Área de Trabalho**
  - Outcome → **Objetivo da Etapa** (ou Resultado de Aprendizagem)
  - Knowledge → **Conhecimento**
  - Review → **Revisão**
  - Artifact → **Artefacto**
  - Learning Navigator → **Navegação da Etapa** (ou Guia da Etapa)
  - Prompt / Checklist → Mantidos

## Sprint P2 — Estados do Sistema ⭐⭐⭐⭐⭐
- [ ] **Estados Globais de Componentes**: Criação e documentação de `EMPTY`, `LOADING`, `SUCCESS`, `ERROR`, `WARNING`, `DISABLED`, `COMING SOON`.
- [ ] **Badges de Funcionalidade**: Uso de `[Disponível]`, `[Em breve]`, `[Experimental]`.
- [ ] **Estados Vazios de Assets**: Exibição de *Empty States* claros (ex: "Conhecimento - Ainda não disponível").

## Sprint P3 — Feedback ⭐⭐⭐⭐☆
- [ ] **Toasts Notification**: Feedback não bloqueante para ações (ex: "✓ Prompt copiado", "✓ Rascunho guardado", "⚠ Ainda não disponível").
- [ ] **Autosave Contextual**: Ciclo "A guardar..." → "Gravado agora mesmo" → "Última gravação 19:42".
- [ ] **Modais de Confirmação**: *Dialogs* para ações destrutivas (ex: Eliminar Projeto).

## Sprint P4 — Ergonomia ⭐⭐⭐⭐☆
- [ ] **Contadores do Prompt**: Caracteres e palavras (ex: "540 caracteres | 102 palavras").
- [ ] **Metadados do Artefacto**: Data da última edição e contador de palavras.
- [ ] **Resumo da Checklist**: Visibilidade de progresso (ex: "3/5 | 60% | Faltam 2 critérios").
- [ ] **Review (Revisão)**: Separação clara entre a avaliação geral ("PASS") e as "Sugestões".

## Sprint P5 — Navegação ⭐⭐⭐☆
- [ ] **Breadcrumbs**: Caminho de navegação (ex: Projetos > Informática Educacional > RL-01 > Etapa 1).
- [ ] **Header**: Reorganização (Projeto | Workflow | RID | Estado).
- [ ] **Timeline**: Símbolos de estado intuitivos (✓, ●, ○).
- [ ] **Navegação (Navigator)**: Animação suave para seleção de etapa.

## Sprint P6 — Qualidade (Performance e Acessibilidade) ⭐⭐⭐⭐⭐
- [ ] **Acessibilidade (A11y)**: *Focus ring*, contrastes validados, navegação por teclado e *aria-labels*.
- [ ] **Performance**: *Lazy render*, *debounce* de pesquisa, *Skeleton loading*, caching de interface.
- [ ] **Prevenção de Erros**: Garantir ausência total de `undefined`, `null` ou `NaN` na UI.

---

## 8. Design Tokens & Component Library
Os seguintes componentes e tokens estão formalizados no [58_DESIGN_SYSTEM.md](58_DESIGN_SYSTEM.md):
- Botões, Badges, Cards, Panels, Inputs, Textareas, Tooltips, Toasts, Timelines, Navigators, Modals, Empty States, Skeletons, Status Badges.

---

## 🚀 Release Gate v1.0
Para a versão ser declarada oficialmente **v1.0 (Ready for Release)**, as seguintes dimensões têm de estar 100% "verdes":

- [ ] Consistência Visual (Sprint P1)
- [ ] Estados do Sistema (Sprint P2)
- [ ] Feedback Contínuo (Sprint P3)
- [ ] Ergonomia (Sprint P4)
- [ ] Navegação Expandida (Sprint P5)
- [ ] Qualidade de Produto (Sprint P6)
- [ ] Design System Congelado
- [ ] Estabilidade Geral de Fluxo
