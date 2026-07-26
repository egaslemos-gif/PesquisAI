# 16 — UI Components

Inventário de todos os componentes reutilizáveis da interface. Define o que cada componente mostra e como se comporta, sem CSS.

---

## Inventário de Componentes

---

### COMP-01 — Workflow Selector

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `workflow-selector` |
| **Finalidade** | Permitir ao utilizador escolher entre o workflow do Investigador e do Orientador. |
| **Quando aparece** | No início da aplicação, antes de entrar num workflow. |
| **Conteúdo** | Dois cartões/botões: "Investigador" e "Orientador". Cada um com uma breve descrição (1 frase) e ícone. |
| **Comportamento** | Ao clicar, carrega o workflow correspondente e avança para a primeira etapa. A escolha é registada no estado do projeto. |
| **Estado** | Nenhum workflow ativo → mostra seletor. Workflow já ativo → não aparece (acesso via menu). |

---

### COMP-02 — Progress Bar

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `progress-bar` |
| **Finalidade** | Mostrar o progresso do utilizador ao longo do workflow. |
| **Quando aparece** | Sempre visível no topo quando um workflow está ativo. |
| **Conteúdo** | Lista de etapas com indicação visual de: concluída, em curso, bloqueada. Número da etapa atual / total (ex: "3 de 10"). |
| **Comportamento** | Etapas concluídas são clicáveis (para revisão). Etapa em curso é destacada. Etapas futuras aparecem desativadas. Ao clicar numa etapa concluída, mostra o artefacto guardado. |
| **Estado** | Atualizado automaticamente quando uma etapa é concluída. |

---

### COMP-03 — Step Card

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `step-card` |
| **Finalidade** | Painel principal da etapa ativa. Mostra toda a informação e ações de uma etapa. |
| **Quando aparece** | Zona central da interface quando um workflow está ativo. |
| **Conteúdo** | Título da etapa. Descrição e objetivo. Secção de ferramentas recomendadas. Secção de prompt. Área de resultado. Checklist de validação. Botões de ação. |
| **Comportamento** | Carregado dinamicamente com base no `currentStep`. Integra os sub-componentes (Prompt Card, Tool Card, Checklist, etc.). |
| **Estado** | Reflete o estado da etapa (`pending`, `in_progress`, `completed`). |

---

### COMP-04 — Prompt Card

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `prompt-card` |
| **Finalidade** | Exibir o prompt dinâmico gerado para a etapa, pronto para ser copiado. |
| **Quando aparece** | Dentro do Step Card, na secção de prompt. |
| **Conteúdo** | Prompt completo com variáveis já substituídas pelo contexto. Indicação de quais variáveis foram usadas. Botão "Copiar". |
| **Comportamento** | Ao clicar em "Copiar", copia o prompt para a clipboard e mostra Toast de confirmação. Se variáveis em falta (ex: `{{PERGUNTA}}` sem valor), destaca a variável e mostra aviso. |
| **Estado** | Prompt gerado automaticamente a partir do template + variáveis do contexto. |

---

### COMP-05 — Tool Card

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-card` |
| **Finalidade** | Mostrar uma ferramenta recomendada com descrição e link. |
| **Quando aparece** | Dentro do Step Card, na secção de ferramentas. Pode haver múltiplas Tool Cards por etapa. |
| **Conteúdo** | Nome da ferramenta. Breve descrição do propósito nesta etapa. Link externo (abre em nova aba). Texto de "Porque recomendamos". |
| **Comportamento** | Ao clicar no link, abre a ferramenta em nova aba. A tool card é informativa, não executa ações no sistema. |
| **Estado** | Estático por etapa (definido no JSON da etapa). |

---

### COMP-06 — Artifact Card

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `artifact-card` |
| **Finalidade** | Exibir o artefacto produzido numa etapa (entrada de texto ou visualização do artefacto guardado). |
| **Quando aparece** | Dentro do Step Card, na zona de resultado. |
| **Conteúdo** | **Modo edição**: Textarea para o utilizador colar/escrever o resultado. Rótulo de "Resultado Esperado" (guia do formato). **Modo visualização**: Texto do artefacto guardado (só leitura). Data de criação/última edição. |
| **Comportamento** | Em etapa ativa: modo edição. Em etapa concluída (revisão): modo visualização com opção de editar. Guardar automaticamente ao avançar. |
| **Estado** | Ligado ao artefacto no LocalStorage. |

---

### COMP-07 — Checklist

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `checklist` |
| **Finalidade** | Lista de verificação antes de avançar para a próxima etapa. |
| **Quando aparece** | Dentro do Step Card, após a zona de resultado. |
| **Conteúdo** | Lista de itens com checkbox. Cada item é um critério de qualidade para a etapa. |
| **Comportamento** | O utilizador marca os itens à medida que verifica. O estado da checklist é guardado. Avançar sem marcar todos: mostrar aviso (mas permitir avançar — controlo do utilizador). |
| **Estado** | Array de booleanos por etapa, guardado no LocalStorage. |

---

### COMP-08 — Navigation Buttons

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `nav-buttons` |
| **Finalidade** | Botões para avançar e voltar no workflow. |
| **Quando aparece** | No final do Step Card. |
| **Conteúdo** | Botão "Anterior" (se não é a primeira etapa). Botão "Guardar e Avançar". |
| **Comportamento** | "Anterior": navega para a etapa anterior sem perder dados. "Guardar e Avançar": guarda o artefacto + estado da checklist, avança para a próxima etapa. Na última etapa: botão muda para "Concluir Workflow". |
| **Estado** | Desativado se violaria regras de navegação (ver doc 19). |

---

### COMP-09 — Toast

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `toast` |
| **Finalidade** | Notificação breve e não-intrusiva para confirmações e avisos. |
| **Quando aparece** | Canto inferior/superior da tela, temporariamente. |
| **Conteúdo** | Mensagem curta (ex: "Prompt copiado!", "Artefacto guardado", "Checklist incompleta"). Ícone indicativo do tipo (sucesso, aviso, erro). |
| **Comportamento** | Aparece por 3 segundos e desaparece automaticamente. Não bloqueia a interface. Múltiplos toasts empilham verticalmente. |
| **Estado** | Sem estado persistente. |

---

### COMP-10 — Modal

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `modal` |
| **Finalidade** | Diálogo para confirmações importantes ou exibição de informação detalhada. |
| **Quando aparece** | Sobre a interface, com overlay escuro. |
| **Conteúdo** | Título. Conteúdo (texto, formulário, aviso). Botões de ação (ex: "Confirmar" / "Cancelar"). |
| **Comportamento** | Bloqueia interação com a interface subjacente. Fecha ao clicar em "Cancelar", no X, ou fora do modal. |
| **Usos previstos** | Confirmar reset do workflow. Exportar dados. Avisos críticos. |

---

### COMP-11 — Header

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `header` |
| **Finalidade** | Barra superior fixa com logo, nome do projeto e navegação global. |
| **Quando aparece** | Sempre visível. |
| **Conteúdo** | Logo / Nome da aplicação. Nome do workflow ativo (se aplicável). Progress Bar (integrada ou adjacente). |
| **Comportamento** | Fixa ao topo (sticky). Responsiva. |

---

### COMP-12 — Empty State

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `empty-state` |
| **Finalidade** | Estado visual quando não há dados para exibir. |
| **Quando aparece** | Quando o utilizador acede pela primeira vez ou não tem projeto ativo. |
| **Conteúdo** | Ícone ou ilustração. Mensagem explicativa. Botão de ação ("Começar Novo Projeto"). |
| **Comportamento** | Direciona o utilizador para o Workflow Selector. |

---

## Mapa de Composição

```
Header
├── Logo
├── Workflow Name
└── Progress Bar

Step Card
├── Title + Description
├── Tool Card (×N)
├── Prompt Card
│   └── Copy Button
├── Artifact Card
│   └── Textarea / Read-only view
├── Checklist
└── Navigation Buttons
    ├── Previous
    └── Save & Next

Toast (flutuante)
Modal (overlay)
```
