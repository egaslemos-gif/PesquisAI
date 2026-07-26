# 32 — QA Exit Criteria

Este documento define os critérios de aceitação estritos para encerrar uma fase de **Technical Validation** antes de declarar uma versão (BUILD) como pronta para **Field Validation** com investigadores reais.

---

## Critérios de Saída (Exit Criteria)

Para que o selo **COMPLETED** seja atribuído à fase de Validação Técnica, a bateria de testes definida no documento *20_MVP_Testing_Plan* deve cumprir as seguintes condições sem exceção:

- [ ] **Nenhum BUG crítico.** (Funcionalidades nucleares operam sem falhas que bloqueiem o utilizador).
- [ ] **Nenhum BUG alto.** (Aplica-se a anomalias de UI que, embora contornáveis, degradem severamente a experiência).
- [ ] **Todos os testes com estado PASS.**
- [ ] **Zero erros JS.** (A consola do navegador tem de estar completamente limpa durante toda a jornada).
- [ ] **Zero exceções não tratadas.**
- [ ] **Zero regressões.** (As melhorias introduzidas num Hotfix não podem estragar funcionalidades previamente validadas).

---

## Methodological Exit Criteria

Para que a integridade metodológica seja comprovada, a aplicação deve respeitar estas garantias durante a simulação dos cenários de stress:

- [ ] **Contexto consistente.**
- [ ] **Prompts recalculados.**
- [ ] **Artefactos dependentes invalidados.**
- [ ] **Sem resíduos de contexto.**
- [ ] **Workflow coerente.**
- [ ] **Persistência consistente.**

---

## Processo de Promoção

Quando as condições acima são verificadas:

1. O estado da FASE 2 do `20_MVP_Testing_Plan.md` passa automaticamente para **COMPLETED**.
2. A FASE 3 (*Field Validation*) passa para estado **ACTIVE**.
3. O código é congelado na respetiva versão. O desenvolvimento é interrompido.
4. Qualquer problema detetado a partir deste ponto não é classificado como "bug", mas como "feedback de campo", gerando um registo no *28_Field_Validation.md*.
