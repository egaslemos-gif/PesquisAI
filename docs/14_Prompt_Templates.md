# 14 — Prompt Templates

Catálogo completo de templates de prompt. Cada prompt recebe variáveis dinâmicas (entre `{{ }}`) que são injetadas pelo Prompt Engine com base no contexto da investigação.

---

## Convenções

- **ID**: Identificador único (`PT-R-XXX` para investigador (Researcher), `PT-S-XXX` para orientador (Supervisor)).
- **Variáveis**: Usam a sintaxe `{{VARIAVEL}}`. São substituídas automaticamente pelo sistema.
- **Formato**: Cada template inclui o prompt completo, as variáveis necessárias e o resultado esperado.

---

## Variáveis Globais Disponíveis

| Variável | Descrição | Origem |
| :--- | :--- | :--- |
| `{{AREA}}` | Área científica do investigador | Configuração do projeto |
| `{{TEMA}}` | Tema delimitado | `ART-01` |
| `{{PERGUNTA}}` | Pergunta de investigação | `ART-02` |
| `{{OBJETIVOS}}` | Objetivos (geral + específicos) | `ART-03` |
| `{{PALAVRAS_CHAVE}}` | Palavras-chave PT/EN | `ART-04` |
| `{{REFERENCIAS}}` | Lista de referências encontradas | `ART-05` |
| `{{FONTES_SELECIONADAS}}` | Fontes selecionadas | `ART-06` |
| `{{NOTAS_LEITURA}}` | Notas de leitura | `ART-07` |
| `{{SINTESE}}` | Síntese da revisão | `ART-08` |
| `{{RASCUNHO}}` | Rascunho das secções | `ART-09` |

---
---

## Prompts do Investigador

---

### PT-R-001 — Explorar Temas na Área

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-001` |
| **Etapa** | `STEP-INV-01` — Definição do Tema |
| **Objetivo** | Gerar sugestões de temas de investigação dentro da área do investigador. |
| **Variáveis** | `{{AREA}}` |

**Template:**

```
Sou um investigador na área de {{AREA}}.

Preciso de identificar um tema de investigação para o meu trabalho académico.

Por favor, sugere 5 temas de investigação que sejam:
- Relevantes e atuais na área de {{AREA}}
- Específicos o suficiente para serem investigados num trabalho académico
- Viáveis para um investigador com acesso a recursos limitados

Para cada tema, indica:
1. O tema proposto
2. Uma breve justificação da relevância (2-3 frases)
3. Possíveis perguntas de investigação associadas

Apresenta os resultados de forma estruturada e numerada.
```

**Resultado esperado:** Lista de 5 temas com justificação e perguntas preliminares.

---

### PT-R-002 — Delimitar Tema

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-002` |
| **Etapa** | `STEP-INV-01` — Definição do Tema |
| **Objetivo** | Ajudar a delimitar um tema amplo num tema específico e investigável. |
| **Variáveis** | `{{AREA}}`, `{{TEMA}}` |

**Template:**

```
Estou a trabalhar na área de {{AREA}} e tenho interesse no tema: "{{TEMA}}".

Este tema pode ser demasiado amplo. Ajuda-me a delimitá-lo.

Por favor:
1. Identifica os problemas de delimitação atuais (se existirem)
2. Sugere 3 versões mais delimitadas do tema, cada uma focada num aspecto específico
3. Para cada versão delimitada, indica:
   - O tema reformulado
   - O contexto geográfico ou institucional sugerido
   - A população ou amostra sugerida
   - Porque esta delimitação é mais viável

Apresenta o resultado de forma clara e estruturada.
```

**Resultado esperado:** 3 versões delimitadas do tema com justificação.

---

### PT-R-003 — Formular Pergunta de Investigação

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-003` |
| **Etapa** | `STEP-INV-02` — Pergunta de Investigação |
| **Objetivo** | Formular uma pergunta de investigação clara e investigável. |
| **Variáveis** | `{{AREA}}`, `{{TEMA}}` |

**Template:**

```
Contexto:
- Área: {{AREA}}
- Tema delimitado: {{TEMA}}

Com base neste tema, ajuda-me a formular uma pergunta de investigação.

A pergunta deve ser:
- Clara e sem ambiguidade
- Específica (não pode ser respondida com "sim" ou "não")
- Investigável com métodos científicos
- Relevante para a área

Por favor:
1. Sugere 3 perguntas de investigação possíveis
2. Para cada uma, indica:
   - A pergunta
   - O tipo de investigação que implica (exploratória, descritiva, explicativa, correlacional)
   - Porque é uma boa pergunta
3. Recomenda qual das 3 é mais adequada e porquê

Apresenta de forma estruturada.
```

**Resultado esperado:** 3 perguntas com análise e recomendação.

---

### PT-R-004 — Definir Objetivos de Investigação

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-004` |
| **Etapa** | `STEP-INV-03` — Definição de Objetivos |
| **Objetivo** | Definir objetivo geral e objetivos específicos. |
| **Variáveis** | `{{AREA}}`, `{{TEMA}}`, `{{PERGUNTA}}` |

**Template:**

```
Contexto da investigação:
- Área: {{AREA}}
- Tema: {{TEMA}}
- Pergunta de investigação: {{PERGUNTA}}

Com base neste contexto, ajuda-me a definir os objetivos da investigação.

Regras:
- O objetivo geral deve responder diretamente à pergunta de investigação
- Os objetivos específicos devem decompor o objetivo geral em ações concretas
- Todos os objetivos devem usar verbos de ação (analisar, identificar, comparar, avaliar, descrever, etc.)
- Cada objetivo deve ser mensurável e verificável

Por favor, produz:
1. Um objetivo geral
2. Entre 3 a 5 objetivos específicos
3. Para cada objetivo específico, indica o verbo de ação usado e como pode ser verificado

Apresenta de forma estruturada e numerada.
```

**Resultado esperado:** 1 objetivo geral + 3–5 objetivos específicos com verbos de ação.

---

### PT-R-005 — Gerar Palavras-chave

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-005` |
| **Etapa** | `STEP-INV-04` — Palavras-chave |
| **Objetivo** | Gerar palavras-chave bilingues para pesquisa bibliográfica. |
| **Variáveis** | `{{AREA}}`, `{{TEMA}}`, `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto da investigação:
- Área: {{AREA}}
- Tema: {{TEMA}}
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

Preciso de palavras-chave para pesquisar em bases de dados académicas.

Por favor, produz:
1. Uma tabela com 8-12 palavras-chave, incluindo:
   - Termo em Português
   - Tradução em Inglês
   - Sinónimos em ambas as línguas
2. Sugere 3 strings de pesquisa usando operadores booleanos (AND, OR, NOT)
3. Indica quais bases de dados são mais adequadas para estes termos

Apresenta numa tabela clara e organizada.
```

**Resultado esperado:** Tabela de palavras-chave PT/EN com sinónimos e strings booleanas.

---

### PT-R-006 — Estratégia de Pesquisa Bibliográfica

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-006` |
| **Etapa** | `STEP-INV-05` — Pesquisa Bibliográfica |
| **Objetivo** | Orientar a pesquisa em bases de dados académicas. |
| **Variáveis** | `{{TEMA}}`, `{{PERGUNTA}}`, `{{PALAVRAS_CHAVE}}` |

**Template:**

```
Contexto:
- Tema: {{TEMA}}
- Pergunta: {{PERGUNTA}}
- Palavras-chave: {{PALAVRAS_CHAVE}}

Preciso de uma estratégia de pesquisa bibliográfica.

Por favor:
1. Sugere as bases de dados mais relevantes para este tema (Google Scholar, Scopus, PubMed, ERIC, etc.)
2. Para cada base de dados, indica a string de pesquisa recomendada
3. Sugere critérios de inclusão e exclusão para filtrar resultados:
   - Período temporal
   - Tipo de publicação
   - Idiomas
   - Critérios de qualidade
4. Indica quantas referências seriam razoáveis encontrar inicialmente

Apresenta de forma estruturada.
```

**Resultado esperado:** Estratégia de pesquisa com bases de dados, strings e critérios de filtragem.

---

### PT-R-007 — Avaliar Relevância de Fontes

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-007` |
| **Etapa** | `STEP-INV-06` — Seleção de Fontes |
| **Objetivo** | Avaliar e selecionar fontes com critérios explícitos. |
| **Variáveis** | `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto da investigação:
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

Vou colar abaixo o título e resumo de um artigo que encontrei na minha pesquisa.

[COLAR TÍTULO E RESUMO AQUI]

Por favor, avalia esta fonte:
1. Relevância para a minha pergunta de investigação (alta/média/baixa)
2. Relevância para os meus objetivos (indicar quais objetivos apoia)
3. Pontos fortes da fonte
4. Limitações potenciais
5. Recomendação: incluir ou excluir (com justificação)

Apresenta de forma estruturada.
```

**Resultado esperado:** Avaliação da relevância com recomendação de inclusão/exclusão.

---

### PT-R-008 — Extrair Ideias-chave de um Artigo

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-008` |
| **Etapa** | `STEP-INV-07` — Leitura e Análise |
| **Objetivo** | Extrair ideias-chave de uma fonte para as notas de leitura. |
| **Variáveis** | `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto da investigação:
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

Vou partilhar o conteúdo (ou partes) de um artigo. Ajuda-me a criar uma ficha de leitura estruturada.

[COLAR CONTEÚDO DO ARTIGO AQUI]

Produz uma ficha de leitura com:
1. Referência bibliográfica completa
2. Objetivo do estudo
3. Metodologia utilizada
4. Principais resultados
5. Conclusões do autor
6. Ideias-chave relevantes para a minha investigação
7. Citações diretas úteis (com indicação da página/secção)
8. Ligação aos meus objetivos específicos
9. Notas e reflexões pessoais (sugestões)

Apresenta de forma estruturada como uma ficha de leitura.
```

**Resultado esperado:** Ficha de leitura estruturada com ideias-chave e citações.

---

### PT-R-009 — Sintetizar Revisão de Literatura

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-009` |
| **Etapa** | `STEP-INV-08` — Síntese |
| **Objetivo** | Organizar as notas de leitura numa síntese temática coerente. |
| **Variáveis** | `{{TEMA}}`, `{{PERGUNTA}}`, `{{OBJETIVOS}}`, `{{NOTAS_LEITURA}}` |

**Template:**

```
Contexto:
- Tema: {{TEMA}}
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

Tenho as seguintes notas de leitura de várias fontes:
{{NOTAS_LEITURA}}

Ajuda-me a sintetizar estas notas num texto de revisão de literatura.

Regras:
1. Organiza por temas/conceitos, NÃO por autor (evitar "lista de resumos")
2. Faz os autores dialogarem entre si (concordâncias, divergências, complementaridades)
3. Mantém a ligação com a minha pergunta de investigação
4. Inclui citações no formato (Autor, Ano)
5. Identifica lacunas na literatura que justifiquem a minha investigação

Produz um texto académico de revisão de literatura organizado por secções temáticas.
```

**Resultado esperado:** Texto de revisão de literatura organizado tematicamente.

---

### PT-R-010 — Redigir Secção do Trabalho

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-010` |
| **Etapa** | `STEP-INV-09` — Redação |
| **Objetivo** | Redigir uma secção específica do trabalho académico. |
| **Variáveis** | `{{TEMA}}`, `{{PERGUNTA}}`, `{{OBJETIVOS}}`, `{{SINTESE}}` |

**Template:**

```
Contexto da investigação:
- Tema: {{TEMA}}
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}
- Revisão de Literatura: {{SINTESE}}

Ajuda-me a redigir a secção de [INTRODUÇÃO / METODOLOGIA / RESULTADOS / CONCLUSÕES] do meu trabalho.

Regras:
1. Linguagem académica formal
2. Estrutura lógica e coerente
3. Referências integradas no texto (formato Autor, Ano)
4. Parágrafos com ideias claras e conectadas
5. Transições suaves entre parágrafos

Para a secção indicada, segue a estrutura esperada:
- Introdução: contextualização → problema → pergunta → objetivos → estrutura do trabalho
- Metodologia: tipo de investigação → população/amostra → instrumentos → procedimentos → análise
- Resultados: apresentação dos dados → análise → interpretação
- Conclusões: resposta à pergunta → contribuições → limitações → sugestões futuras

Produz um texto académico pronto para revisão.
```

**Resultado esperado:** Secção redigida em linguagem académica formal.

---

### PT-R-011 — Revisão Académica Final

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-R-011` |
| **Etapa** | `STEP-INV-10` — Revisão Final |
| **Objetivo** | Revisar o texto final quanto a coerência, estilo e normas. |
| **Variáveis** | `{{RASCUNHO}}` |

**Template:**

```
Vou partilhar o rascunho do meu trabalho de investigação.

{{RASCUNHO}}

Por favor, faz uma revisão académica focada em:

1. **Coerência global**: As secções estão logicamente conectadas?
2. **Estilo académico**: A linguagem é formal e adequada?
3. **Citações**: Todas as afirmações importantes estão referenciadas?
4. **Estrutura**: Cada secção cumpre o seu papel?
5. **Gramática e ortografia**: Existem erros?
6. **Formatação**: O texto segue as normas académicas?

Para cada problema encontrado:
- Indica a localização (secção/parágrafo)
- Descreve o problema
- Sugere a correção

No final, dá uma avaliação geral (1 a 10) e identifica os 3 pontos mais urgentes a corrigir.
```

**Resultado esperado:** Relatório de revisão com problemas, sugestões e avaliação global.

---
---

## Prompts do Orientador

---

### PT-S-001 — Avaliar Viabilidade do Tema

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-001` |
| **Etapa** | `STEP-ORI-02` — Avaliar Tema |
| **Variáveis** | `{{TEMA}}`, `{{AREA}}` |

**Template:**

```
Um estudante propôs o seguinte tema de investigação:
- Área: {{AREA}}
- Tema: {{TEMA}}

Como orientador, preciso de avaliar este tema.

Analisa os seguintes critérios:
1. Relevância para a área
2. Delimitação adequada
3. Viabilidade (recursos, tempo, acesso a dados)
4. Originalidade / contribuição potencial
5. Clareza da formulação

Para cada critério, atribui uma classificação (Adequado / Necessita Revisão / Inadequado) e justifica.

No final, emite um parecer geral: Aprovado / Aprovado com Reservas / Necessita Reformulação.
Se necessita reformulação, sugere melhorias específicas.
```

**Resultado esperado:** Parecer estruturado sobre o tema com classificação por critério.

---

### PT-S-002 — Avaliar Pergunta de Investigação

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-002` |
| **Etapa** | `STEP-ORI-03` — Avaliar Pergunta |
| **Variáveis** | `{{TEMA}}`, `{{PERGUNTA}}` |

**Template:**

```
Contexto:
- Tema: {{TEMA}}
- Pergunta de investigação proposta: {{PERGUNTA}}

Avalia esta pergunta considerando:
1. Clareza (é compreensível sem ambiguidade?)
2. Especificidade (é suficientemente delimitada?)
3. Investigabilidade (pode ser respondida com métodos científicos?)
4. Alinhamento com o tema
5. Tipo de investigação implícita

Emite parecer: Aprovada / Necessita Revisão.
Se necessita revisão, sugere reformulações.
```

**Resultado esperado:** Parecer sobre a pergunta com sugestões de melhoria.

---

### PT-S-003 — Avaliar Objetivos

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-003` |
| **Etapa** | `STEP-ORI-04` — Avaliar Objetivos |
| **Variáveis** | `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto:
- Pergunta: {{PERGUNTA}}
- Objetivos propostos: {{OBJETIVOS}}

Avalia os objetivos considerando:
1. O objetivo geral responde à pergunta?
2. Os objetivos específicos decompõem o geral?
3. Usam verbos de ação adequados?
4. São mensuráveis e verificáveis?
5. O número é adequado (3–5 específicos)?

Emite parecer para cada objetivo e um parecer global.
```

**Resultado esperado:** Parecer por objetivo com avaliação global.

---

### PT-S-004 — Avaliar Revisão de Literatura

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-004` |
| **Etapa** | `STEP-ORI-05` — Avaliar Revisão de Literatura |
| **Variáveis** | `{{PERGUNTA}}`, `{{SINTESE}}` |

**Template:**

```
Contexto:
- Pergunta: {{PERGUNTA}}
- Revisão de literatura submetida: {{SINTESE}}

Avalia esta revisão de literatura:
1. Está organizada por temas (não por autor)?
2. Os autores dialogam entre si?
3. As fontes são atuais e relevantes?
4. Existe ligação clara com a pergunta?
5. As citações estão corretas?
6. As lacunas na literatura são identificadas?

Emite parecer: Aprovada / Necessita Revisão.
Indica os pontos específicos a melhorar.
```

**Resultado esperado:** Parecer sobre a revisão com pontos de melhoria.

---

### PT-S-005 — Avaliar Metodologia

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-005` |
| **Etapa** | `STEP-ORI-06` — Avaliar Metodologia |
| **Variáveis** | `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto:
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

O estudante propôs a seguinte metodologia:
[COLAR DESCRIÇÃO METODOLÓGICA]

Avalia:
1. Tipo de investigação adequado à pergunta?
2. População e amostra justificadas?
3. Instrumentos de recolha de dados descritos?
4. Procedimentos claros e replicáveis?
5. Método de análise adequado?
6. Questões éticas consideradas?

Emite parecer com sugestões de melhoria.
```

**Resultado esperado:** Parecer metodológico com sugestões.

---

### PT-S-006 — Avaliar Resultados

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-006` |
| **Etapa** | `STEP-ORI-07` — Avaliar Resultados |
| **Variáveis** | `{{OBJETIVOS}}` |

**Template:**

```
Objetivos da investigação: {{OBJETIVOS}}

O estudante apresentou os seguintes resultados:
[COLAR SECÇÃO DE RESULTADOS]

Avalia:
1. Os dados são apresentados de forma clara?
2. A análise é adequada ao tipo de dados?
3. A interpretação está fundamentada nos dados?
4. Os resultados respondem aos objetivos?
5. Tabelas/gráficos são claros e necessários?

Emite parecer com sugestões.
```

**Resultado esperado:** Parecer sobre resultados com sugestões.

---

### PT-S-007 — Avaliar Conclusões

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `PT-S-007` |
| **Etapa** | `STEP-ORI-08` — Avaliar Conclusões |
| **Variáveis** | `{{PERGUNTA}}`, `{{OBJETIVOS}}` |

**Template:**

```
Contexto:
- Pergunta: {{PERGUNTA}}
- Objetivos: {{OBJETIVOS}}

O estudante redigiu as seguintes conclusões:
[COLAR SECÇÃO DE CONCLUSÕES]

Avalia:
1. As conclusões respondem à pergunta de investigação?
2. Estão sustentadas nos resultados apresentados?
3. Introduzem novos dados (erro)?
4. Reconhecem limitações do estudo?
5. Apresentam sugestões para investigação futura?
6. A linguagem é adequada (afirmações proporcionais à evidência)?

Emite parecer final.
```

**Resultado esperado:** Parecer final sobre as conclusões.
