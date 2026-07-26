# 20 — MVP Testing Plan (Validation v1.0)

Este documento organiza o processo de validação do produto em três fases distintas. O objetivo já não é apenas garantir que o software funciona, mas sim validar a hipótese central do produto: **O protocolo consegue conduzir um investigador do início ao fim sem que ele se perca no processo.**

---

## FASE 1 — Build ✅

A fase de construção da arquitetura e desenvolvimento inicial do código. (Status: **COMPLETED**)

- [x] Arquitetura
- [x] Dados
- [x] Serviços
- [x] Core
- [x] UI
- [x] Integração

---

## FASE 2 — Validação Técnica (QA)

A fase para garantir que a mecânica do software funciona conforme especificado, sem bugs impeditivos. (Status: **COMPLETED**)

- [x] **Empty State**: A aplicação arranca limpa e solicita a Área Científica.
- [x] **Prompt Rendering**: As variáveis `{{VAR}}` são substituídas corretamente pelo conteúdo do Workspace.
- [x] **Clipboard**: O botão "Copiar" coloca o prompt no clipboard e mostra feedback visual.
- [x] **Save Artifact**: O conteúdo colado no artefacto é guardado no LocalStorage.
- [x] **Progress**: A barra de progresso reflete a etapa atual e mostra o nome do artefacto esperado.
- [x] **Retrocesso**: Ao recuar para uma etapa anterior e alterar o conteúdo (ex: Tema), o sistema invalida os artefactos dependentes subsequentes.
- [x] **Continuidade**: Fechar a janela do navegador e reabrir repõe exatamente a etapa onde o utilizador estava, com os dados intactos.
- [x] **Teste de Contexto**: Verificar se as variáveis fluem ao longo de todo o percurso (Tema → Pergunta → Objetivos → Palavras-chave → Prompt).
- [ ] **Checklist Persistence (Cenário F)**: Assinalar checkboxes, fazer F5, alterar Tema inicial, e confirmar invalidação dos artefactos, limpeza da checklist e estado revertido para NOT_STARTED.

> **Bloqueio:** Nenhuma validação com investigadores reais pode iniciar-se até esta checklist estar a 100%.

---

## FASE 3 — Field Validation (Validação com Investigadores)

Testes de usabilidade comportamental com utilizadores reais. Não procuramos opiniões ("Gostou?"); procuramos comportamentos ("Onde ficou bloqueado?"). (Status: **ACTIVE**)

### Checklist Comportamental (por sessão)

O sucesso da ferramenta mede-se pelos seguintes critérios observáveis:
- [ ] O investigador iniciou sem ajuda?
- [ ] Conseguiu compreender o primeiro passo?
- [ ] Copiou o prompt?
- [ ] Utilizou a IA externa com sucesso?
- [ ] Colou o resultado no artefacto?
- [ ] Percebeu o feedback/checklists?
- [ ] Conseguiu avançar autonomamente?
- [ ] Concluiu o protocolo (Passo 10)?
- [ ] Não ficou bloqueado em nenhum momento?
- [ ] Entendeu o resultado final?

### Métricas Chave a Registar

1. **Completion Rate**: Percentagem de investigadores que terminam o fluxo completo.
2. **Time per Step**: Tempo médio despendido em cada etapa.
3. **Backtracking**: Quantas vezes voltaram atrás para alterar algo.
4. **Prompt Copy Rate**: Frequência com que copiam realmente o prompt vs tentar escrever à mão.
5. **Drop-off Point**: Em que etapa exata desistiram ou bloquearam.

### Cenários de Teste Recomendados

Para garantir que a aplicação é agnóstica ao domínio, os testes devem abranger pelo menos 4 áreas distintas:
1. **Educação** (Ex: Integração de Tecnologia na Sala de Aula)
2. **Saúde** (Ex: Saúde Materna e Telemedicina)
3. **Engenharia** (Ex: IoT na Gestão de Recursos Hídricos)
4. **Economia** (Ex: Empreendedorismo Feminino)

---

## Critério de Avanço (Go/No-Go)

Antes de aprovar o desenvolvimento de qualquer funcionalidade futura (ex: Workflow do Orientador, Exportação PDF), é obrigatório responder a esta pergunta:

> **O investigador conseguiu terminar o fluxo autonomamente?**
> - **SIM** → Avançar para novas funcionalidades do Roadmap.
> - **NÃO** → Resolver o bloqueio atual. Zero código novo para funcionalidades secundárias.
