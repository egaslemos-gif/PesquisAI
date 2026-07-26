# 23 — Microinteractions

Documentação de todas as microinterações da interface. Cada interação é definida com: gatilho, animação, feedback e duração. Este documento garante consistência na experiência.

---

## Formato de cada microinteração

| Campo | Descrição |
| :--- | :--- |
| **ID** | Identificador único (`MI-XXX`) |
| **Gatilho** | O que o utilizador faz |
| **Feedback Visual** | O que aparece no ecrã |
| **Tipo** | Toast / Animação / Transição / Estado |
| **Duração** | Quanto tempo dura |
| **Onde** | Em que componente ocorre |

---

## Feedback — Ações com Sucesso

### MI-001 — Copiar Prompt

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-001` |
| **Gatilho** | Clicar no botão "Copiar" na Prompt Card. |
| **Feedback Visual** | 1. Ícone do botão muda de 📋 para ✓ (verde). 2. Toast aparece: ✓ *"Prompt copiado!"* 3. Botão volta ao estado original após 2s. |
| **Tipo** | Toast + Mudança de ícone |
| **Duração** | Toast: 2 segundos. Ícone: 2 segundos. |
| **Onde** | Prompt Card |

---

### MI-002 — Guardar Artefacto

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-002` |
| **Gatilho** | Clicar em "Guardar e Avançar". |
| **Feedback Visual** | 1. Botão mostra estado de loading (spinner breve). 2. Toast aparece: ✓ *"Artefacto guardado"*. 3. Transição suave para a próxima etapa. |
| **Tipo** | Toast + Transição |
| **Duração** | Spinner: 300ms. Toast: 2 segundos. Transição: 400ms. |
| **Onde** | Navigation Buttons + Step Card |

---

### MI-003 — Etapa Concluída

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-003` |
| **Gatilho** | Etapa muda de status `in_progress` para `completed`. |
| **Feedback Visual** | 1. Na Progress Bar, o ponto da etapa anima: de ○ para ● com escala (scale up → scale down). 2. Breve flash de cor (verde) no ponto. |
| **Tipo** | Animação |
| **Duração** | 500ms |
| **Onde** | Progress Bar |

---

### MI-004 — Checklist — Marcar Item

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-004` |
| **Gatilho** | Clicar num item da checklist (☐ → ☑). |
| **Feedback Visual** | 1. Checkbox anima com tick (✓ aparece com pequeno bounce). 2. Texto ganha opacidade reduzida (riscar subtil ou cor mais suave). 3. Contagem atualiza: "2/4 verificados". |
| **Tipo** | Animação + Estado |
| **Duração** | 200ms |
| **Onde** | Checklist |

---

### MI-005 — Workflow Concluído

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-005` |
| **Gatilho** | Clicar em "Concluir Workflow" e confirmar. |
| **Feedback Visual** | 1. Transição suave para a Vista de Resumo. 2. Ícone 🎉 aparece com animação de escala. 3. Artefactos listados aparecem sequencialmente (stagger animation, 100ms entre cada). |
| **Tipo** | Transição + Animação |
| **Duração** | Transição: 500ms. Stagger: 100ms × 10 itens. |
| **Onde** | Vista de Resumo |

---

## Feedback — Avisos

### MI-006 — Avançar sem Artefacto

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-006` |
| **Gatilho** | Clicar em "Guardar e Avançar" com a Artifact Card vazia. |
| **Feedback Visual** | 1. Artifact Card pisca brevemente com borda vermelha/laranja. 2. Modal aparece: ⚠ *"A etapa não tem resultado guardado. Deseja avançar mesmo assim?"* com botões "Avançar sem guardar" / "Voltar". |
| **Tipo** | Animação + Modal |
| **Duração** | Borda: 600ms (2 pulsos). Modal: até interação do utilizador. |
| **Onde** | Artifact Card + Modal |

---

### MI-007 — Checklist Incompleta

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-007` |
| **Gatilho** | Avançar com checklist parcialmente marcada. |
| **Feedback Visual** | 1. Toast aparece: ⚠ *"Nem todos os critérios de qualidade foram verificados."* 2. Toast tem fundo amarelo/âmbar (aviso, não erro). 3. Sistema avança normalmente. |
| **Tipo** | Toast |
| **Duração** | 3 segundos |
| **Onde** | Toast area |

---

### MI-008 — Variáveis em Falta no Prompt

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-008` |
| **Gatilho** | Prompt carregado com variáveis `{{...}}` sem valor no contexto. |
| **Feedback Visual** | 1. Variável sem valor aparece destacada: fundo amarelo + texto itálico. Ex: *{{PERGUNTA — não definida}}*. 2. Nota informativa abaixo do prompt: ℹ *"Algumas variáveis dependem de etapas anteriores."* |
| **Tipo** | Estado visual |
| **Duração** | Permanente (enquanto a variável não tiver valor) |
| **Onde** | Prompt Card |

---

### MI-009 — Editar Artefacto Anterior — Aviso de Contexto

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-009` |
| **Gatilho** | Utilizador edita e guarda um artefacto de uma etapa anterior já concluída. |
| **Feedback Visual** | 1. Toast: ℹ *"Nota: o contexto de etapas seguintes pode ficar desatualizado."* 2. Toast com fundo azul (informativo). |
| **Tipo** | Toast |
| **Duração** | 4 segundos |
| **Onde** | Toast area |

---

## Feedback — Navegação

### MI-010 — Transição entre Etapas

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-010` |
| **Gatilho** | Navegar para a etapa seguinte ou anterior. |
| **Feedback Visual** | 1. Step Card actual faz fade-out (opacidade 1→0). 2. Novo Step Card faz fade-in (opacidade 0→1). 3. Scroll automático para o topo da página. |
| **Tipo** | Transição |
| **Duração** | fade-out: 200ms, fade-in: 300ms |
| **Onde** | Step Card |

---

### MI-011 — Clicar Etapa na Progress Bar

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-011` |
| **Gatilho** | Clicar numa etapa concluída na Progress Bar. |
| **Feedback Visual** | 1. Ponto clicado faz escala breve (pulse). 2. Step Card transiciona para o conteúdo da etapa clicada. |
| **Tipo** | Animação + Transição |
| **Duração** | Pulse: 200ms. Transição: 400ms. |
| **Onde** | Progress Bar + Step Card |

---

### MI-012 — Clicar Etapa Bloqueada

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-012` |
| **Gatilho** | Clicar numa etapa futura (locked) na Progress Bar. |
| **Feedback Visual** | 1. Cursor: `not-allowed`. 2. Ponto faz breve shake horizontal (wiggle). 3. Tooltip: *"Complete as etapas anteriores primeiro."* |
| **Tipo** | Animação + Tooltip |
| **Duração** | Shake: 300ms. Tooltip: 2 segundos. |
| **Onde** | Progress Bar |

---

## Feedback — Interface Global

### MI-013 — Hover em Botões

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-013` |
| **Gatilho** | Cursor passa sobre qualquer botão interativo. |
| **Feedback Visual** | 1. Botão primário: fundo escurece ligeiramente + sombra aumenta. 2. Botão secundário: fundo ganha cor de highlight suave. 3. Tool Card: elevação sutil (translateY -2px + sombra). |
| **Tipo** | Transição CSS |
| **Duração** | 150ms (ease-out) |
| **Onde** | Todos os botões e cartões clicáveis |

---

### MI-014 — Loading da Página (Restaurar Estado)

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-014` |
| **Gatilho** | Abrir/recarregar a página com projeto existente no LocalStorage. |
| **Feedback Visual** | 1. Skeleton loading breve (placeholders cinza onde o conteúdo vai aparecer). 2. Conteúdo faz fade-in quando carregado. |
| **Tipo** | Transição |
| **Duração** | Skeleton: até dados carregados (máx 500ms). Fade-in: 300ms. |
| **Onde** | Toda a página |

---

### MI-015 — Modal — Abrir e Fechar

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `MI-015` |
| **Gatilho** | Abrir: ação que requer confirmação. Fechar: clicar em "Cancelar", X, ou fora do modal. |
| **Feedback Visual** | 1. Overlay: fade-in (opacidade 0→0.5, fundo escuro). 2. Modal: scale-in (0.95→1) + fade-in. 3. Fechar: animação inversa. |
| **Tipo** | Transição |
| **Duração** | Abrir: 250ms. Fechar: 200ms. |
| **Onde** | Modal + Overlay |

---

## Tabela Resumo

| ID | Gatilho | Feedback | Tipo | Duração |
| :--- | :--- | :--- | :--- | :--- |
| MI-001 | Copiar prompt | ✓ "Prompt copiado!" | Toast | 2s |
| MI-002 | Guardar artefacto | ✓ "Artefacto guardado" | Toast + Transição | 2s |
| MI-003 | Etapa concluída | Ponto anima na Progress Bar | Animação | 500ms |
| MI-004 | Marcar checklist | Tick + contagem atualiza | Animação | 200ms |
| MI-005 | Concluir workflow | 🎉 + lista staggered | Transição | ~1.5s |
| MI-006 | Avançar sem artefacto | Borda + Modal | Modal | User |
| MI-007 | Checklist incompleta | ⚠ Toast amarelo | Toast | 3s |
| MI-008 | Variável em falta | Highlight amarelo no prompt | Estado | Permanente |
| MI-009 | Editar artefacto anterior | ℹ Toast azul | Toast | 4s |
| MI-010 | Mudar de etapa | Fade-out / fade-in | Transição | 500ms |
| MI-011 | Clicar etapa concluída | Pulse + transição | Animação | 600ms |
| MI-012 | Clicar etapa bloqueada | Shake + tooltip | Animação | 300ms |
| MI-013 | Hover em botões | Sombra + elevação | CSS | 150ms |
| MI-014 | Carregar página | Skeleton → fade-in | Transição | ~800ms |
| MI-015 | Modal abrir/fechar | Scale + fade overlay | Transição | 250ms |
