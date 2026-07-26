# 19 — Navigation Rules

Este documento define todas as regras de navegação do sistema. Serve para evitar bugs e garantir a integridade dos dados.

---

## Princípio Geral

> O utilizador mantém sempre o controlo. O sistema avisa, mas não bloqueia de forma absoluta.

---

## Regras de Avanço (Avançar para a etapa seguinte)

### RULE-NAV-01 — Avançar guarda o artefacto

**Regra:** Ao clicar em "Guardar e Avançar", o sistema guarda automaticamente:
- O conteúdo da Artifact Card no `rag_artifacts`
- O estado da Checklist no `rag_checklists`
- Atualiza o `rag_currentStep` para a próxima etapa
- Atualiza o `context` no `rag_project` (se aplicável)

**Razão:** Nenhum dado deve ser perdido ao navegar.

---

### RULE-NAV-02 — Avançar sem artefacto mostra aviso

**Regra:** Se o utilizador tenta avançar com a Artifact Card vazia:
- Mostrar Toast de aviso: "A etapa não tem resultado guardado. Deseja avançar mesmo assim?"
- Mostrar Modal de confirmação com "Avançar sem guardar" / "Voltar"
- Se confirmar: avança mas a etapa fica com status `"in_progress"` (não `"completed"`)

**Razão:** Respeitar o princípio de controlo do utilizador, mas informar que há risco.

---

### RULE-NAV-03 — Avançar com checklist incompleta mostra aviso

**Regra:** Se a checklist não está totalmente marcada:
- Mostrar Toast de aviso: "Nem todos os critérios de qualidade foram verificados."
- Permitir avançar (o sistema avisa, mas não bloqueia)
- A etapa é marcada como `"completed"` se o artefacto existe, independentemente da checklist

**Razão:** A checklist é uma ferramenta de orientação, não uma barreira.

---

### RULE-NAV-04 — Última etapa mostra "Concluir"

**Regra:** Na última etapa do workflow:
- O botão muda de "Guardar e Avançar" para "Concluir Workflow"
- Ao clicar, mostra Modal de confirmação: "Tem a certeza de que deseja concluir o workflow?"
- Se confirmar: workflow status muda para `"completed"`, mostra ecrã de resumo

**Razão:** A conclusão é uma ação irreversível que merece confirmação.

---

## Regras de Retrocesso (Voltar para a etapa anterior)

### RULE-NAV-05 — Voltar preserva dados

**Regra:** Ao clicar em "Anterior":
- O conteúdo atual da Artifact Card é guardado automaticamente (auto-save)
- O sistema navega para a etapa anterior
- A etapa anterior é carregada com o seu artefacto e checklist anteriores

**Razão:** Voltar nunca deve causar perda de dados.

---

### RULE-NAV-06 — Voltar não elimina artefactos

**Regra:** Ao voltar a uma etapa concluída:
- O artefacto existente é mostrado (modo visualização)
- O utilizador pode optar por editar
- Se editar e guardar: `version` do artefacto incrementa, `updatedAt` atualiza

**Razão:** Os artefactos são o produto do trabalho do investigador e devem ser preservados.

---

### RULE-NAV-07 — Primeira etapa esconde botão "Anterior"

**Regra:** Na primeira etapa do workflow (`STEP-INV-01` ou `STEP-ORI-01`):
- O botão "Anterior" não é renderizado
- Apenas o botão "Guardar e Avançar" está visível

**Razão:** Não há para onde voltar.

---

## Regras de Acesso Direto (via Progress Bar)

### RULE-NAV-08 — Etapas concluídas são acessíveis

**Regra:** Na Progress Bar:
- Etapas com status `"completed"` são clicáveis
- Ao clicar, navega para essa etapa em modo de revisão (Artifact Card em modo visualização)

**Razão:** O investigador deve poder rever o seu trabalho a qualquer momento.

---

### RULE-NAV-09 — Etapas futuras são bloqueadas

**Regra:** Na Progress Bar:
- Etapas com status `"locked"` ou `"pending"` não são clicáveis
- Aparecem visualmente desativadas (opacidade reduzida, cursor não clicável)

**Razão:** Manter a sequência lógica do workflow.

---

### RULE-NAV-10 — A etapa ativa é sempre acessível

**Regra:** Na Progress Bar:
- A etapa com status `"in_progress"` é clicável e destacada visualmente
- Se o utilizador está a rever uma etapa anterior, pode clicar na etapa ativa para regressar

**Razão:** O utilizador deve poder voltar ao ponto onde estava a trabalhar.

---

## Regras de Estado

### RULE-NAV-11 — Transições de estado permitidas

| De | Para | Condição |
| :--- | :--- | :--- |
| `locked` | `pending` | Etapa anterior concluída (pré-requisitos satisfeitos) |
| `pending` | `in_progress` | Utilizador acede à etapa |
| `in_progress` | `completed` | Artefacto guardado + utilizador avança |
| `completed` | `in_progress` | Utilizador edita artefacto numa etapa concluída |

**Transições proibidas:**
- `locked` → `in_progress` (deve passar por `pending`)
- `completed` → `locked` (uma etapa concluída nunca volta a ficar bloqueada)
- `locked` → `completed` (não se pode completar sem passar pela etapa)

---

### RULE-NAV-12 — Editar artefacto anterior não invalida etapas seguintes

**Regra:** Se o utilizador volta e edita o artefacto de uma etapa anterior:
- As etapas seguintes **não** são invalidadas automaticamente na v1.0
- O sistema mostra um aviso (Toast): "Nota: o contexto de etapas seguintes pode ficar desatualizado."
- Na v1.1, poderá ser adicionada uma funcionalidade para regenerar prompts afetados

**Razão:** Na v1.0, manter a simplicidade. Não forçar o investigador a refazer todo o trabalho.

---

## Regras de Sessão

### RULE-NAV-13 — Recarregar a página preserva estado

**Regra:** Ao recarregar o browser (F5, fechar/abrir):
- O sistema lê `rag_currentStep` do LocalStorage
- Navega diretamente para a etapa onde o utilizador estava
- Todos os artefactos e checklists são restaurados

**Razão:** Essencial para uma boa experiência de utilizador.

---

### RULE-NAV-14 — Sem projeto mostra Empty State

**Regra:** Se `rag_project` não existe no LocalStorage:
- Mostrar o componente Empty State
- Com botão "Começar Novo Projeto" que leva ao Workflow Selector

**Razão:** O utilizador novo precisa de uma introdução clara.

---

### RULE-NAV-15 — Reset do projeto requer confirmação

**Regra:** Se o utilizador quer começar de novo:
- Deve existir uma opção no menu ou botão (não acidentalmente acessível)
- Ao clicar, mostra Modal: "Tem a certeza? Todos os dados serão apagados."
- Se confirmar: limpa todo o LocalStorage com prefixo `rag_` e mostra Empty State

**Razão:** Prevenir perda acidental de dados.
