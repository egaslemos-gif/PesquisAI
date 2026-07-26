# 29 — Decision Log

Este documento regista as decisões de produto baseadas puramente em dados e evidências observadas durante a **Field Validation** (Documento 28).

**Regra de Ouro:** Nenhuma funcionalidade é alterada, adicionada ou removida baseada em opiniões ou sugestões sem contexto ("Alguém sugeriu meter um botão azul"). Toda a alteração tem de ter uma justificação comportamental comprovada ("X utilizadores ignoraram o botão principal, resultando num bloqueio na etapa Y").

---

## Registo de Decisões

### Formato Padrão

```markdown
### DL-[NÚMERO] — [Ação Realizada]
- **Data:** [DD-MM-AAAA]
- **Motivo (Evidência):** [Padrão observado na Field Validation]
- **Impacto Esperado:** [Métrica que se pretende melhorar]
```

---

*(Os registos serão adicionados após a conclusão das primeiras sessões de Field Validation)*

### Exemplos de como preencher:

```markdown
### DL-001 — Uniformizar estratégia de carregamento
- **Problema:** Estratégia de carregamento inconsistente entre módulos ES e scripts clássicos.
- **Impacto:** CRÍTICO. A aplicação não inicia (erro de sintaxe `export`).
- **Decisão:** Uniformizar toda a estratégia de carregamento adicionando `type="module"` a todos os scripts em `index.html`.
- **Estado:** OPEN

### DL-002 — Retorno aos Scripts Clássicos
- **Problema:** Mistura entre ES Modules e Globals. O Engine deixou de encontrar a definição do Workflow.
- **Impacto:** CRÍTICO. O Workflow WF-INV não é encontrado, bloqueando o avanço na app.
- **Decisão:** Uniformizar todo o carregamento através de variáveis globais estritas (`window.XXX`).
- **Motivação:** Preservar a experiência "duplo clique" no `index.html` sem necessitar de um servidor HTTP (CORS) ou bundlers adicionais, reduzindo as dependências.
- **Estado:** OPEN

### DL-003 — Falha de propagação de estado entre Workspace e UI
- **Problema:** O Workspace é atualizado ao criar um projeto, mas a UI não reage e não avança para a próxima etapa.
- **Impacto:** CRÍTICO.
- **Objetivo:** Determinar exatamente em que ponto a atualização do Workspace deixa de ser propagada até à renderização da interface.
- **Critério para encerramento:** Identificar um único ponto de falha confirmado por evidência (trace de execução), implementar a correção mínima necessária e reexecutar apenas os testes "Criar Projeto" e "Transição para a Etapa 1".
- **Estado:** CLOSED

### DL-004 — Prompt Rendering e Criação de Artefactos (Etapa 1)
- **Categoria:** Functional Validation
- **Problema/Objetivo:** Validar a renderização correta dos prompts e a criação e persistência dos artefactos associados à Etapa 1.
- **Impacto:** CRÍTICO. Sem prompts funcionais ou persistência de artefactos, o core loop metodológico falha.
- **Critério para encerramento:** Todos os sub-testes (Renderização do prompt, Cópia, Criação do artefacto, Persistência, UI consistente e Atualização de progresso) devem obter estado PASS com evidências (Screenshot, Console limpa, DOM atualizado).
- **Estado:** CLOSED

### DL-005 — Methodological Integrity Validation
- **Categoria:** Methodological
- **Problema/Objetivo:** Validar que o Workflow Engine mantém a consistência de estado independentemente da ordem de ações do utilizador (navegação linear, retrocesso, alteração estrutural, reload e stress).
- **Impacto:** CRÍTICO. Define se o produto funciona como assistente metodológico ou como um simples formulário.
- **Alterações:**
  - Criado método `resetWorkspace()` no `workspace.js` (responsabilidade única, separada de `setArea()`).
  - Adicionado botão "Nova Investigação" no header (`index.html` + `appShell.js`).
  - Acrescentados Methodological Exit Criteria ao `32_QA_EXIT_CRITERIA.md`.
- **Resultado:** PASS nos 5 cenários (A-E) por análise estática rigorosa. Validação automatizada pendente.
- **Estado:** READY FOR DYNAMIC VALIDATION
```
