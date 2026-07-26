# 21 — User Journeys

Este documento não descreve funcionalidades. Descreve histórias completas — o caminho do utilizador do primeiro ao último clique, incluindo os momentos em que sai da plataforma para usar ferramentas externas.

---

## Journey 01 — Investigador (Percurso Completo)

**Persona:** Maria, estudante de Mestrado em Educação na UniLicungo.  
**Objetivo:** Completar o workflow de investigação, produzindo todos os artefactos necessários.

### Fluxo

1. Maria abre a aplicação no browser.
2. Vê o **Empty State** com mensagem de boas-vindas e botão "Começar Novo Projeto".
3. Clica em "Começar Novo Projeto".
4. Aparece o **Workflow Selector** com duas opções: "Investigador" e "Orientador".
5. Seleciona **"Investigador"**.
6. O sistema pede a **área científica** (campo de texto ou seleção).
7. Maria escreve: "Educação".
8. O sistema carrega a **Etapa 01 — Definição do Tema**.
9. Maria lê a **descrição** da etapa e o **objetivo**.
10. Vê as **ferramentas recomendadas** (ChatGPT, Gemini) com links e justificação.
11. Vê o **prompt gerado** com a sua área já inserida: *"Sou um investigador na área de Educação..."*
12. Clica em **"Copiar"** → aparece Toast ✓ *"Prompt copiado!"*
13. Abre o **ChatGPT** numa nova aba (via link na Tool Card).
14. Cola o prompt no ChatGPT e obtém sugestões de temas.
15. Escolhe um tema e volta à aplicação.
16. Cola/escreve o tema na **Artifact Card**.
17. Revê a **Checklist** e marca os itens verificados.
18. Clica em **"Guardar e Avançar"** → Toast ✓ *"Artefacto guardado"*.
19. A **Progress Bar** atualiza — etapa 1 marcada como concluída.
20. O sistema carrega a **Etapa 02 — Pergunta de Investigação**.
21. O prompt agora inclui automaticamente o tema que Maria guardou.
22. Maria repete o ciclo: **ler → copiar prompt → usar ferramenta → colar resultado → validar → avançar**.
23. Ao chegar à **Etapa 10 — Revisão Final**, o botão muda para **"Concluir Workflow"**.
24. Maria clica em "Concluir Workflow".
25. Aparece **Modal de confirmação**: *"Tem a certeza?"*
26. Confirma → vê o **ecrã de resumo** com todos os artefactos produzidos.

### Emoções esperadas
- **Início:** Curiosidade, talvez alguma incerteza.
- **Primeiras etapas:** Confiança ao ver que o sistema guia cada passo.
- **Meio do workflow:** Foco e produtividade, ritmo estabelecido.
- **Conclusão:** Satisfação e sensação de realização.

---

## Journey 02 — Orientador (Percurso Completo)

**Persona:** Professor João, orientador de mestrandos na UniLicungo.  
**Objetivo:** Avaliar o progresso de um estudante de forma estruturada.

### Fluxo

1. João abre a aplicação.
2. Vê o Empty State → clica em "Começar Novo Projeto".
3. Seleciona **"Orientador"** no Workflow Selector.
4. O sistema carrega a **Etapa 01 — Receber Proposta**.
5. João cola a proposta recebida do estudante na **Artifact Card**.
6. Avança para a **Etapa 02 — Avaliar Tema**.
7. O sistema mostra o prompt de avaliação, já com o tema extraído da proposta.
8. João copia o prompt, abre o Claude, e obtém uma análise estruturada.
9. Cola o parecer na Artifact Card.
10. Verifica a checklist: *"Parecer fundamentado? Sugestões incluídas?"*
11. Avança etapa a etapa, produzindo pareceres sobre: pergunta, objetivos, revisão, metodologia, resultados e conclusões.
12. Na **Etapa 08 — Avaliar Conclusões**, clica em "Concluir Workflow".
13. Vê o resumo de todos os pareceres emitidos.

### Emoções esperadas
- **Início:** Eficiência — o sistema estrutura algo que normalmente faz mentalmente.
- **Meio:** Rigor — cada parecer tem critérios explícitos.
- **Conclusão:** Confiança — a avaliação é documentada e consistente.

---

## Journey 03 — Novo Utilizador (Primeira Visita)

**Persona:** Ana, curiosa sobre a plataforma, nunca a usou.  
**Objetivo:** Entender o que a plataforma faz e começar.

### Fluxo

1. Ana acede à URL da aplicação.
2. Vê o **Empty State** com:
   - Logo e nome da aplicação.
   - Breve descrição: *"Plataforma de orientação para investigação académica assistida por IA."*
   - Botão: **"Começar Novo Projeto"**.
3. Clica no botão.
4. Vê o **Workflow Selector** com descrições claras de cada opção.
5. Hesita — lê as descrições.
6. Seleciona "Investigador".
7. O sistema pede a área científica.
8. Ana escreve "Saúde Pública" e avança.
9. Vê a primeira etapa com tudo estruturado: descrição, ferramentas, prompt, área de resultado.
10. Sente-se orientada — sabe exatamente o que fazer.

### Momento crítico
- **Se Ana não entender o que fazer nos primeiros 10 segundos, abandona.**
- O Empty State e a primeira etapa devem ser autoexplicativos.

---

## Journey 04 — Utilizador que Retoma uma Investigação

**Persona:** Carlos, que começou o workflow há 3 dias e está na etapa 5.  
**Objetivo:** Continuar de onde parou.

### Fluxo

1. Carlos abre a aplicação no browser.
2. O sistema lê o `rag_currentStep` do LocalStorage.
3. Carrega automaticamente a **Etapa 05 — Pesquisa Bibliográfica**.
4. Progress Bar mostra 4 etapas concluídas, a 5ª em curso.
5. O artefacto em progresso (se guardado parcialmente) aparece na Artifact Card.
6. Carlos retoma o trabalho sem perder nenhum dado.
7. Pode clicar em etapas anteriores na Progress Bar para rever artefactos.

### Momento crítico
- **Se Carlos perder os dados ao reabrir, perde confiança na plataforma.**
- A persistência via LocalStorage é essencial.

---

## Journey 05 — Utilizador que Muda de Workflow

**Persona:** Diana, que começou como Investigadora mas quer ver o workflow do Orientador.  
**Objetivo:** Trocar de workflow sem perder o progresso anterior.

### Fluxo

1. Diana está na Etapa 03 do workflow Investigador.
2. Quer explorar o workflow do Orientador.
3. Acede ao menu/opção de trocar workflow.
4. O sistema mostra **Modal de confirmação**: *"O progresso do workflow atual será preservado. Deseja mudar para o workflow do Orientador?"*
5. Diana confirma.
6. O sistema guarda o estado do workflow Investigador.
7. Carrega o workflow Orientador (a partir da Etapa 01 se nunca foi iniciado, ou retomando onde parou).
8. Diana pode voltar ao workflow Investigador a qualquer momento, retomando onde estava.

### Nota para v1.0
- Na v1.0, suportar apenas 1 workflow ativo por vez é aceitável.
- O estado do workflow anterior é preservado no `rag_project.workflows`.

---

## Mapa Visual dos Journeys

```
                    ┌─────────────────┐
                    │  Abrir Página   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Tem rag_project │
                    │   no Storage?   │
                    └────────┬────────┘
                      │             │
                     Não           Sim
                      │             │
             ┌────────▼────────┐  ┌─▼──────────────┐
             │   Empty State   │  │ Carregar etapa  │
             │  + Boas-vindas  │  │    ativa        │
             └────────┬────────┘  │  (Journey 04)   │
                      │           └─────────────────┘
             ┌────────▼────────┐
             │   Workflow      │
             │   Selector      │
             └────────┬────────┘
               │             │
          Investigador   Orientador
               │             │
          Journey 01    Journey 02
               │             │
          ┌────▼─────────────▼────┐
          │   Ciclo por etapa:    │
          │   Ler → Copiar →     │
          │   Usar IA → Colar →  │
          │   Validar → Avançar  │
          └───────────┬───────────┘
                      │
             ┌────────▼────────┐
             │   Concluir      │
             │   Workflow      │
             └─────────────────┘
```
