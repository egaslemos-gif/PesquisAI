# 13 — Step Definitions

Definição exaustiva de cada etapa. Cada passo é completamente independente e auto-contido: qualquer programador consegue implementá-lo sem consultar outros documentos.

---

## Estrutura padrão de cada etapa

Todas as etapas seguem exatamente esta estrutura:

| Campo | Descrição |
| :--- | :--- |
| **ID** | Identificador único (`STEP-INV-XX` / `STEP-ORI-XX`) |
| **Nome** | Nome legível da etapa |
| **Descrição** | O que acontece nesta etapa |
| **Objetivo** | O que o utilizador deve alcançar |
| **Pré-requisitos** | Etapas e artefactos que devem estar concluídos |
| **Ferramentas** | Ferramentas de IA recomendadas |
| **Prompts** | IDs dos templates de prompt associados |
| **Artefacto esperado** | O que esta etapa produz |
| **Critérios de qualidade** | Como avaliar se o artefacto é bom |
| **Erros comuns** | Armadilhas frequentes a evitar |
| **Checklist** | Lista de verificação antes de avançar |
| **Próxima etapa** | Para onde o workflow avança |

---
---

## Workflow do Investigador

---

### STEP-INV-01 — Definição do Tema

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-01` |
| **Nome** | Definição do Tema |
| **Descrição** | O investigador identifica a sua área de interesse e, com apoio da IA, explora possibilidades até chegar a um tema delimitado e viável. |
| **Objetivo** | Produzir uma declaração de tema clara, específica e com potencial de investigação. |
| **Pré-requisitos** | Nenhum (etapa inicial). O utilizador deve indicar a sua área científica. |
| **Ferramentas** | ChatGPT, Gemini, Claude (exploração de ideias) |
| **Prompts** | `PT-R-001` — Explorar Temas na Área; `PT-R-002` — Delimitar Tema |
| **Artefacto esperado** | `ART-01` — Declaração do Tema (1–2 parágrafos com o tema delimitado e justificação breve da relevância). |
| **Critérios de qualidade** | O tema é específico (não genérico). O tema é investigável (pode gerar uma pergunta). O tema é relevante para a área indicada. O tema é viável no contexto do investigador. |
| **Erros comuns** | Tema demasiado amplo ("A educação em Moçambique"). Tema sem foco ("Tecnologia e aprendizagem"). Confundir tema com título. |
| **Checklist** | ☐ O tema está delimitado a um contexto específico? ☐ É possível formular uma pergunta a partir deste tema? ☐ O tema é relevante para a área científica? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-02` — Pergunta de Investigação |

---

### STEP-INV-02 — Pergunta de Investigação

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-02` |
| **Nome** | Pergunta de Investigação |
| **Descrição** | A partir do tema delimitado, o investigador formula uma pergunta de investigação clara, específica e respondível. |
| **Objetivo** | Produzir uma pergunta que guie toda a investigação. |
| **Pré-requisitos** | `STEP-INV-01` concluído. `ART-01` disponível. |
| **Ferramentas** | ChatGPT, Claude (refinamento da pergunta) |
| **Prompts** | `PT-R-003` — Formular Pergunta de Investigação |
| **Artefacto esperado** | `ART-02` — Pergunta de Investigação (pergunta principal + justificação de porque é investigável). |
| **Critérios de qualidade** | A pergunta é clara e não ambígua. A pergunta é específica (não pode ser respondida com "sim" ou "não" trivialmente). A pergunta está alinhada com o tema. A pergunta é respondível com os recursos disponíveis. |
| **Erros comuns** | Pergunta demasiado ampla. Pergunta que já tem resposta óbvia. Pergunta que não se alinha com o tema definido. Múltiplas perguntas combinadas numa só frase. |
| **Checklist** | ☐ A pergunta é clara e específica? ☐ Está alinhada com o tema (`ART-01`)? ☐ É respondível com investigação? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-03` — Definição de Objetivos |

---

### STEP-INV-03 — Definição de Objetivos

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-03` |
| **Nome** | Definição de Objetivos |
| **Descrição** | O investigador define um objetivo geral e objetivos específicos que operacionalizam a pergunta de investigação. |
| **Objetivo** | Produzir objetivos mensuráveis e alinhados com a pergunta. |
| **Pré-requisitos** | `STEP-INV-02` concluído. `ART-01` e `ART-02` disponíveis. |
| **Ferramentas** | ChatGPT, Claude (estruturação de objetivos) |
| **Prompts** | `PT-R-004` — Definir Objetivos de Investigação |
| **Artefacto esperado** | `ART-03` — Objetivos da Investigação (1 objetivo geral + 3–5 objetivos específicos). |
| **Critérios de qualidade** | O objetivo geral responde diretamente à pergunta. Cada objetivo específico contribui para o objetivo geral. Os objetivos usam verbos de ação (analisar, comparar, identificar, avaliar). Os objetivos são mensuráveis e verificáveis. |
| **Erros comuns** | Objetivos vagos ("Estudar a educação"). Objetivos desalinhados com a pergunta. Confundir objetivos com atividades ("Ler artigos"). Demasiados ou poucos objetivos específicos. |
| **Checklist** | ☐ O objetivo geral está alinhado com a pergunta? ☐ Cada objetivo específico é mensurável? ☐ Os objetivos usam verbos de ação? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-04` — Palavras-chave |

---

### STEP-INV-04 — Palavras-chave

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-04` |
| **Nome** | Palavras-chave |
| **Objetivo** | Identificar termos de pesquisa em português e inglês para a revisão de literatura. |
| **Descrição** | O investigador, com apoio da IA, gera palavras-chave relevantes, sinónimos e termos relacionados para usar nas bases de dados académicas. |
| **Pré-requisitos** | `STEP-INV-03` concluído. `ART-01`, `ART-02`, `ART-03` disponíveis. |
| **Ferramentas** | ChatGPT, Gemini (geração de termos); Google Scholar (validação) |
| **Prompts** | `PT-R-005` — Gerar Palavras-chave |
| **Artefacto esperado** | `ART-04` — Mapa de Palavras-chave (tabela com termos PT/EN, sinónimos e operadores booleanos sugeridos). |
| **Critérios de qualidade** | Cobertura bilingue (PT/EN). Inclusão de sinónimos e variantes. Termos alinhados com a pergunta e objetivos. Operadores booleanos sugeridos (AND, OR, NOT). |
| **Erros comuns** | Termos demasiado genéricos. Usar apenas uma língua. Ignorar sinónimos importantes. Não considerar variações ortográficas (PT-BR vs PT-PT). |
| **Checklist** | ☐ Termos em português e inglês? ☐ Sinónimos incluídos? ☐ Operadores booleanos sugeridos? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-05` — Pesquisa Bibliográfica |

---

### STEP-INV-05 — Pesquisa Bibliográfica

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-05` |
| **Nome** | Pesquisa Bibliográfica |
| **Descrição** | O investigador pesquisa em bases de dados académicas utilizando as palavras-chave definidas. |
| **Objetivo** | Localizar artigos, livros e fontes relevantes. |
| **Pré-requisitos** | `STEP-INV-04` concluído. `ART-04` disponível. |
| **Ferramentas** | Consensus, OpenAlex, Google Scholar, Semantic Scholar |
| **Prompts** | `PT-R-006` — Estratégia de Pesquisa Bibliográfica |
| **Artefacto esperado** | `ART-05` — Lista de Referências (lista com título, autores, ano, fonte e link/DOI). |
| **Critérios de qualidade** | Mínimo de 15–20 referências iniciais. Fontes recentes (últimos 5–10 anos, salvo clássicos). Diversidade de tipos (artigos, livros, teses). Fontes revisadas por pares prioritárias. |
| **Erros comuns** | Pesquisar apenas numa base de dados. Aceitar os primeiros resultados sem avaliar relevância. Ignorar fontes em inglês. Não registar o DOI ou link. |
| **Checklist** | ☐ Pelo menos 15 referências encontradas? ☐ Fontes diversificadas? ☐ DOI/links registados? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-06` — Seleção de Fontes |

---

### STEP-INV-06 — Seleção de Fontes

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-06` |
| **Nome** | Seleção de Fontes |
| **Descrição** | O investigador filtra a lista de referências, selecionando as mais relevantes e justificando a escolha. |
| **Objetivo** | Reduzir a lista a fontes de qualidade comprovada e relevância direta. |
| **Pré-requisitos** | `STEP-INV-05` concluído. `ART-05` disponível. |
| **Ferramentas** | Zotero (organização); ChatGPT/Claude (avaliação de resumos) |
| **Prompts** | `PT-R-007` — Avaliar Relevância de Fontes |
| **Artefacto esperado** | `ART-06` — Fontes Selecionadas (lista reduzida com justificação de inclusão/exclusão). |
| **Critérios de qualidade** | Cada fonte selecionada tem justificação. Critérios de inclusão/exclusão explícitos. Equilíbrio entre fontes teóricas e empíricas. |
| **Erros comuns** | Selecionar por conveniência e não por relevância. Não justificar exclusões. Manter fontes irrelevantes "por precaução". |
| **Checklist** | ☐ Critérios de seleção definidos? ☐ Cada fonte tem justificação? ☐ Lista reduzida e focada? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-07` — Leitura e Análise |

---

### STEP-INV-07 — Leitura e Análise

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-07` |
| **Nome** | Leitura e Análise |
| **Descrição** | O investigador lê as fontes selecionadas e extrai ideias-chave, argumentos, dados e citações. |
| **Objetivo** | Produzir notas de leitura estruturadas que alimentem a revisão de literatura. |
| **Pré-requisitos** | `STEP-INV-06` concluído. `ART-06` disponível. |
| **Ferramentas** | NotebookLM (síntese e Q&A sobre documentos); ChatGPT/Claude (análise) |
| **Prompts** | `PT-R-008` — Extrair Ideias-chave de um Artigo |
| **Artefacto esperado** | `ART-07` — Notas de Leitura (por fonte: ideia principal, argumentos, dados relevantes, citações diretas, ligação aos objetivos). |
| **Critérios de qualidade** | Cada fonte tem uma ficha de leitura. Ideias-chave identificadas e não apenas copiadas. Ligação explícita aos objetivos da investigação. Citações com página/parágrafo indicado. |
| **Erros comuns** | Copiar resumos sem analisar. Não ligar as notas aos objetivos. Ignorar dados quantitativos relevantes. Ler apenas o resumo/abstract. |
| **Checklist** | ☐ Ficha de leitura por fonte? ☐ Ideias-chave extraídas? ☐ Ligação aos objetivos explícita? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-08` — Síntese |

---

### STEP-INV-08 — Síntese

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-08` |
| **Nome** | Síntese |
| **Descrição** | O investigador sintetiza as notas de leitura num texto coerente que integra as várias fontes por tema ou conceito. |
| **Objetivo** | Produzir um texto de revisão de literatura que dialogue entre autores. |
| **Pré-requisitos** | `STEP-INV-07` concluído. `ART-07` disponível. |
| **Ferramentas** | Claude (redação e organização); NotebookLM (verificação cruzada) |
| **Prompts** | `PT-R-009` — Sintetizar Revisão de Literatura |
| **Artefacto esperado** | `ART-08` — Síntese da Revisão de Literatura (texto organizado por temas, com citações e referências). |
| **Critérios de qualidade** | Organização temática (não lista de resumos). Diálogo entre autores (comparações, concordâncias, divergências). Citações corretas. Ligação clara com a pergunta de investigação. |
| **Erros comuns** | Fazer uma "lista de resumos" em vez de uma síntese. Não comparar autores entre si. Perder a ligação com a pergunta. Plágio involuntário por paráfrase insuficiente. |
| **Checklist** | ☐ Texto organizado por temas? ☐ Autores dialogam entre si? ☐ Citações corretas e completas? ☐ O artefacto foi guardado? |
| **Próxima etapa** | `STEP-INV-09` — Redação |

---

### STEP-INV-09 — Redação

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-INV-09` |
| **Nome** | Redação |
| **Descrição** | O investigador redige as secções do trabalho, integrando todos os artefactos anteriores numa narrativa académica coerente. |
| **Objetivo** | Produzir as secções do trabalho de investigação (Introdução, Revisão, Metodologia, etc.). |
| **Pré-requisitos** | `STEP-INV-08` concluído. Todos os artefactos anteriores (`ART-01` a `ART-08`) disponíveis. |
| **Ferramentas** | Claude (redação académica); ChatGPT (brainstorming de estrutura) |
| **Prompts** | `PT-R-010` — Redigir Secção do Trabalho |
| **Artefacto esperado** | `ART-09` — Rascunho das Secções (documento com as secções principais redigidas). |
| **Critérios de qualidade** | Estrutura académica respeitada. Coerência entre secções. Linguagem formal e clara. Referências integradas no texto. |
| **Erros comuns** | Secções desconectadas entre si. Introdução que não apresenta o problema. Metodologia vaga. Resultados sem análise. |
| **Checklist** | ☐ Todas as secções redigidas? ☐ Coerência entre secções? ☐ Referências integradas? ☐ O artefacto foi guardado? |
| **Próxima etapa** | *(Fim do workflow: A redação de outros capítulos decorrerá no módulo WF-RED)* |

---
---

## Workflow do Orientador

*(As definições do workflow do Orientador seguem a mesma estrutura. Cada etapa `STEP-ORI-XX` recebe como entrada o artefacto do investigador e produz um parecer como artefacto de saída.)*

---

### STEP-ORI-01 — Receber Proposta

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-01` |
| **Nome** | Receber Proposta |
| **Descrição** | O orientador regista a proposta de investigação recebida do estudante. |
| **Objetivo** | Ter a proposta disponível para avaliação estruturada. |
| **Pré-requisitos** | Nenhum (etapa inicial do workflow do orientador). |
| **Ferramentas** | — |
| **Prompts** | — |
| **Artefacto esperado** | `ART-ORI-01` — Proposta Recebida (registo da proposta completa). |
| **Critérios de qualidade** | A proposta contém tema, pergunta e objetivos. |
| **Erros comuns** | Aceitar propostas incompletas sem solicitar informação. |
| **Checklist** | ☐ Proposta contém tema? ☐ Proposta contém pergunta? ☐ Proposta contém objetivos? |
| **Próxima etapa** | `STEP-ORI-02` — Avaliar Tema |

---

### STEP-ORI-02 — Avaliar Tema

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-02` |
| **Nome** | Avaliar Tema |
| **Descrição** | O orientador avalia a viabilidade, relevância e delimitação do tema. |
| **Objetivo** | Produzir um parecer fundamentado sobre o tema. |
| **Pré-requisitos** | `STEP-ORI-01` concluído. |
| **Ferramentas** | ChatGPT/Claude (análise de viabilidade) |
| **Prompts** | `PT-S-001` — Avaliar Viabilidade do Tema |
| **Artefacto esperado** | `ART-ORI-02` — Parecer sobre o Tema (aprovado / necessita revisão, com fundamentação). |
| **Critérios de qualidade** | Parecer fundamentado com critérios explícitos. Sugestões construtivas se necessita revisão. |
| **Erros comuns** | Parecer sem justificação. Rejeitar sem sugestão de melhoria. |
| **Checklist** | ☐ Parecer emitido? ☐ Fundamentação incluída? ☐ Sugestões de melhoria (se aplicável)? |
| **Próxima etapa** | `STEP-ORI-03` — Avaliar Pergunta |

---

### STEP-ORI-03 — Avaliar Pergunta

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-03` |
| **Nome** | Avaliar Pergunta |
| **Descrição** | O orientador verifica a clareza, especificidade e investigabilidade da pergunta. |
| **Objetivo** | Garantir que a pergunta orienta a investigação de forma eficaz. |
| **Pré-requisitos** | `STEP-ORI-02` concluído. |
| **Ferramentas** | ChatGPT/Claude (análise) |
| **Prompts** | `PT-S-002` — Avaliar Pergunta de Investigação |
| **Artefacto esperado** | `ART-ORI-03` — Parecer sobre a Pergunta. |
| **Critérios de qualidade** | Avaliação contra critérios de clareza, especificidade e viabilidade. |
| **Erros comuns** | Aprovar perguntas demasiado amplas por conveniência. |
| **Checklist** | ☐ Pergunta é clara? ☐ Pergunta é específica? ☐ Pergunta é investigável? |
| **Próxima etapa** | `STEP-ORI-04` — Avaliar Objetivos |

---

### STEP-ORI-04 — Avaliar Objetivos

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-04` |
| **Nome** | Avaliar Objetivos |
| **Descrição** | O orientador verifica o alinhamento e mensurabilidade dos objetivos. |
| **Objetivo** | Garantir que os objetivos operacionalizam corretamente a pergunta. |
| **Pré-requisitos** | `STEP-ORI-03` concluído. |
| **Ferramentas** | ChatGPT/Claude |
| **Prompts** | `PT-S-003` — Avaliar Objetivos |
| **Artefacto esperado** | `ART-ORI-04` — Parecer sobre os Objetivos. |
| **Critérios de qualidade** | Objetivos mensuráveis e alinhados com a pergunta. |
| **Erros comuns** | Aceitar objetivos vagos ou desalinhados. |
| **Checklist** | ☐ Objetivo geral alinhado com a pergunta? ☐ Objetivos específicos são mensuráveis? ☐ Verbos de ação utilizados? |
| **Próxima etapa** | `STEP-ORI-05` — Avaliar Revisão de Literatura |

---

### STEP-ORI-05 — Avaliar Revisão de Literatura

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-05` |
| **Nome** | Avaliar Revisão de Literatura |
| **Descrição** | O orientador avalia a qualidade, abrangência e coerência da revisão. |
| **Objetivo** | Verificar que a revisão fundamenta a investigação adequadamente. |
| **Pré-requisitos** | `STEP-ORI-04` concluído. |
| **Ferramentas** | Claude/ChatGPT (análise de texto) |
| **Prompts** | `PT-S-004` — Avaliar Revisão de Literatura |
| **Artefacto esperado** | `ART-ORI-05` — Parecer sobre a Revisão. |
| **Critérios de qualidade** | Síntese temática (não lista). Fontes atuais e relevantes. Diálogo entre autores. |
| **Erros comuns** | Aceitar "listas de resumos" como revisão. |
| **Checklist** | ☐ Organização temática? ☐ Fontes atuais? ☐ Autores dialogam? |
| **Próxima etapa** | `STEP-ORI-06` — Avaliar Metodologia |

---

### STEP-ORI-06 — Avaliar Metodologia

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-06` |
| **Nome** | Avaliar Metodologia |
| **Descrição** | O orientador avalia a adequação da metodologia ao problema e aos objetivos. |
| **Objetivo** | Garantir coerência metodológica. |
| **Pré-requisitos** | `STEP-ORI-05` concluído. |
| **Ferramentas** | Claude/ChatGPT |
| **Prompts** | `PT-S-005` — Avaliar Metodologia |
| **Artefacto esperado** | `ART-ORI-06` — Parecer sobre a Metodologia. |
| **Critérios de qualidade** | Método adequado ao tipo de investigação. Instrumentos descritos. População/amostra justificada. |
| **Erros comuns** | Metodologia desalinhada com os objetivos. Amostra não justificada. |
| **Checklist** | ☐ Método coerente com objetivos? ☐ Instrumentos descritos? ☐ Amostra justificada? |
| **Próxima etapa** | `STEP-ORI-07` — Avaliar Resultados |

---

### STEP-ORI-07 — Avaliar Resultados

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-07` |
| **Nome** | Avaliar Resultados |
| **Descrição** | O orientador avalia a apresentação, análise e interpretação dos resultados. |
| **Objetivo** | Verificar que os resultados são apresentados com rigor e analisados adequadamente. |
| **Pré-requisitos** | `STEP-ORI-06` concluído. |
| **Ferramentas** | Claude/ChatGPT |
| **Prompts** | `PT-S-006` — Avaliar Resultados |
| **Artefacto esperado** | `ART-ORI-07` — Parecer sobre os Resultados. |
| **Critérios de qualidade** | Dados apresentados de forma clara. Análise fundamentada. Interpretação ligada aos objetivos. |
| **Erros comuns** | Resultados sem análise. Interpretação sem base nos dados. |
| **Checklist** | ☐ Dados claros? ☐ Análise fundamentada? ☐ Interpretação ligada aos objetivos? |
| **Próxima etapa** | `STEP-ORI-08` — Avaliar Conclusões |

---

### STEP-ORI-08 — Avaliar Conclusões

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `STEP-ORI-08` |
| **Nome** | Avaliar Conclusões |
| **Descrição** | O orientador verifica se as conclusões respondem à pergunta e estão sustentadas nos resultados. |
| **Objetivo** | Garantir coerência global e fecho adequado da investigação. |
| **Pré-requisitos** | `STEP-ORI-07` concluído. |
| **Ferramentas** | Claude/ChatGPT |
| **Prompts** | `PT-S-007` — Avaliar Conclusões |
| **Artefacto esperado** | `ART-ORI-08` — Parecer Final. |
| **Critérios de qualidade** | Conclusões respondem à pergunta. Sustentadas nos resultados. Limitações reconhecidas. Sugestões para investigação futura. |
| **Erros comuns** | Conclusões que introduzem novos dados. Conclusões que não respondem à pergunta. Ausência de limitações. |
| **Checklist** | ☐ Respondem à pergunta? ☐ Sustentadas nos resultados? ☐ Limitações indicadas? ☐ Sugestões para futuro? |
| **Próxima etapa** | *(Fim do workflow)* |
