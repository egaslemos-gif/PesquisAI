# 60 — Component Guidelines

Este documento define as regras de utilização para os componentes principais da interface da versão 1.0, focando na consistência visual e no princípio **Zero Cognitive Friction**.

## 1. Regras Fundamentais

1. **One Primary Action:** Em qualquer ecrã ou painel, nunca deve existir mais de **um** botão primário (`BTN-PRIMARY`). Todas as restantes ações devem apoiar essa decisão e nunca competir visualmente com ela.
2. **Nenhuma Ação Incompleta:** Não mostrar botões, separadores ou ligações que não estejam 100% funcionais de ponta a ponta.
3. **Ghost para Auxiliares:** Ações secundárias que não afetam o fluxo principal (como Copiar ou Voltar) devem usar `BTN-GHOST`. Ações destrutivas precisam de diálogos de confirmação explícitos e não apenas botões soltos.

## 2. Botões (Button System)

Temos apenas três variantes oficiais:

### BTN-PRIMARY
- **Objetivo:** Ação de conversão principal do ecrã (ex: "Concluir e Avançar", "Iniciar Novo Projeto").
- **Quando utilizar:** Apenas 1 vez por vista/painel. É a resposta à pergunta "O que faço a seguir?".
- **Classe CSS:** `.btn .btn-primary`

### BTN-SECONDARY
- **Objetivo:** Ações alternativas de peso médio (ex: formulários, rever opções).
- **Quando utilizar:** Quando o utilizador precisa de tomar uma ação ativa, mas que não avança o estado principal do fluxo.
- **Classe CSS:** `.btn .btn-secondary`

### BTN-GHOST
- **Objetivo:** Ações discretas, navegações e ferramentas auxiliares.
- **Quando utilizar:** Para ações como "← Voltar", "Copiar Prompt", "Cancelar" (em diálogos). Nunca deve chamar a atenção a menos que ativamente procurado.
- **Classe CSS:** `.btn .btn-ghost`

### Estados Comuns
Todos os botões partilham o mesmo contrato de estados interativos (transição FAST de 150ms):
- **Default:** Estado base.
- **Hover:** Ligeira mudança de cor (darker/lighter) e transformação no Y (para PRIMARY).
- **Active (Pressed):** Fundo mais escuro, shadow removida, translateY(0).
- **Focus:** Outline offset (2px) na cor do tema ou cinza.
- **Disabled:** Opacity a 50%, `pointer-events: none`, `cursor: not-allowed`.

## 3. StatusLine

- **Objetivo:** Substituir frases verbosas ou botões inativos por texto indicador discreto.
- **Quando utilizar:** AutoSaves, indicações de progresso automático. Ex: `● Última gravação às 19:42`.
- **Classe CSS:** `.status-line` (e.g. `.status-line.success` para verde, `.status-line.primary` para azul).

## 4. Painéis da Metodologia

Cada painel do Workspace responde a apenas uma pergunta metodológica.

### Conhecimento Base (`KnowledgePanel`)
- **Objetivo:** O que preciso saber?
- **Restrições:** Apenas texto passivo. Sem ações permitidas.

### Prompt Recomendado (`PromptPanel`)
- **Objetivo:** O que devo perguntar?
- **Ações permitidas:** Apenas "Copiar Prompt" (`BTN-SECONDARY`).
- **Ações proibidas:** Editar, Executar IA, Selecionar Estratégias (removidos na v1.0).

### Resultado da Etapa (`ArtifactPanel`)
- **Objetivo:** O que devo produzir?
- **Comportamento:** O texto editado grava automaticamente (`AutoSave`). Usa `StatusLine` para feedback.
- **Ações proibidas:** Botão "Gravar".

### Próxima Etapa (`NextStepPanel`)
- **Objetivo:** Posso avançar?
- **Ações permitidas:** 
  - `← Voltar` (`BTN-GHOST`)
  - `Concluir e Avançar` (`BTN-PRIMARY`)
- **Ações proibidas:** Validar Etapa (incompleto), Guardar Rascunho.
