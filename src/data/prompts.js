const PROMPTS = {
    "PT-R-001": {
        template: `Sou um investigador na área de {{area}}.

Preciso de identificar um tema de investigação para o meu trabalho académico.

Por favor, sugere 5 temas de investigação que sejam:
- Relevantes e atuais na área de {{area}}
- Específicos o suficiente para serem investigados num trabalho académico
- Viáveis para um investigador com acesso a recursos limitados

Para cada tema, indica:
1. O tema proposto
2. Uma breve justificação da relevância (2-3 frases)
3. Possíveis perguntas de investigação associadas

Apresenta os resultados de forma estruturada e numerada.`,
        objective: "Encontrar um tema de investigação viável e atual na sua área.",
        expectedResult: "Uma lista de 5 temas com justificações e perguntas sugeridas.",
        example: "O impacto da literacia digital no desempenho académico em cursos noturnos.",
        estimatedTime: "5-10 minutos",
        effort: "medium",
        competency: "Delimitação do problema"
    },

    "PT-R-002": {
        template: `Estou a trabalhar na área de {{area}} e tenho interesse no tema: "{{title}}".

Este tema pode ser demasiado amplo. Ajuda-me a delimitá-lo.

Por favor:
1. Identifica os problemas de delimitação atuais (se existirem)
2. Sugere 3 versões mais delimitadas do tema, cada uma focada num aspecto específico
3. Para cada versão delimitada, indica:
   - O tema reformulado
   - O contexto geográfico ou institucional sugerido
   - A população ou amostra sugerida
   - Porque esta delimitação é mais viável

Apresenta as sugestões em formato de tabela.`,
        objective: "Reduzir o escopo de um tema amplo para torná-lo investigável.",
        expectedResult: "Três opções de temas focados e bem delimitados.",
        example: "De 'Inteligência Artificial' para 'Uso de IA no 1º ano de Informática da UL'.",
        estimatedTime: "5�10 minutos",
        effort: "medium",
        competency: "Delimitação do problema"
    },

    "PT-R-003": {
        template: `A minha área é {{area}} e o meu tema delimitado é: "{{TEMA}}".

Preciso de formular a minha pergunta central de investigação (aquela que o estudo vai tentar responder).

Por favor:
1. Analisa se o meu tema permite formular uma pergunta clara (PICO, SPIDER ou outro formato apropriado)
2. Sugere 3 perguntas de investigação principais diferentes
3. Para cada sugestão, indica:
   - A pergunta formulada
   - O formato utilizado (se aplicável)
   - O que seria necessário medir ou observar para responder a esta pergunta

A pergunta deve ser exequível para um projeto académico sem grandes financiamentos.`,
        objective: "Criar uma pergunta central que orientará toda a investigação.",
        expectedResult: "Três opções de pergunta mensuráveis e exequíveis.",
        example: "Como é que a literacia digital afeta o desempenho dos estudantes ingressantes?",
        estimatedTime: "10�15 minutos",
        effort: "high",
        competency: "Formulação de Pergunta"
    },

    "PT-R-004": {
        template: `O meu tema é: "{{TEMA}}"
A minha pergunta de investigação é: "{{PERGUNTA}}"

Ajuda-me a definir os objetivos deste estudo.

Preciso de:
1. UM objetivo geral (que responda diretamente à pergunta de investigação, começando com um verbo de ação no infinitivo, ex: Analisar, Compreender, Avaliar)
2. TRÊS a CINCO objetivos específicos (passos mensuráveis e sequenciais necessários para alcançar o objetivo geral)

Para os objetivos específicos, garante que:
- Não são meras tarefas (ex: "fazer pesquisa bibliográfica")
- Representam marcos conceptuais (ex: "Identificar os fatores...", "Comparar os resultados...")
- Seguem a taxonomia de Bloom
- São independentes mas complementares

Apresenta os objetivos de forma clara e estruturada.`,
        objective: "Definir os passos metodológicos exatos para responder à pergunta.",
        expectedResult: "Um objetivo geral (macro) e 3-5 objetivos específicos.",
        example: "Objetivo Geral: Analisar o impacto da ferramenta X...",
        estimatedTime: "10�20 minutos",
        effort: "high",
        competency: "Operacionalização de Objetivos"
    },

    "PT-R-005": {
        template: `O meu tema é: "{{TEMA}}"
A minha pergunta de investigação é: "{{PERGUNTA}}"
Os meus objetivos são:
{{OBJETIVOS}}

Vou iniciar a minha pesquisa bibliográfica. Ajuda-me a criar um mapa de pesquisa.

Por favor, gera:
1. Conceitos Core (2-3 conceitos centrais da minha pesquisa)
2. Para cada conceito core, sugere 3-4 palavras-chave/sinónimos em Português
3. Para cada conceito core, sugere 3-4 palavras-chave/sinónimos em Inglês (crucial para bases de dados)
4. Sugere 3 expressões de pesquisa booleanas completas (usando AND, OR, "") em Inglês que eu possa colar diretamente na Scopus, Web of Science ou PubMed.

Apresenta os resultados primeiro em tabelas, e depois as expressões booleanas prontas a copiar.`,
        objective: "Identificar os termos corretos para procurar artigos científicos.",
        expectedResult: "Sinónimos em PT e EN, e queries booleanas complexas.",
        example: "('digital literacy' OR 'digital skills') AND ('higher education')",
        estimatedTime: "5�10 minutos",
        effort: "low",
        competency: "Estratégia de Pesquisa"
    },

    "PT-R-006": {
        template: `O meu tema é: "{{TEMA}}"
A minha pergunta de investigação é: "{{PERGUNTA}}"

As palavras-chave que estou a utilizar são:
{{PALAVRAS_CHAVE}}

Preciso de ajuda para definir critérios de inclusão e exclusão rigorosos antes de começar a procurar e selecionar os artigos, para reduzir viés e focar o estudo.

Por favor, sugere critérios divididos nas seguintes categorias:
1. População / Participantes
2. Intervenção / Fenómeno de interesse
3. Contexto (geográfico, institucional, etc.)
4. Tipo de estudo (empírico, revisão, etc.)
5. Idioma e Período de publicação

Para cada categoria, define de forma clara o que DEVE ser incluído (Critério de Inclusão) e o que DEVE ser rejeitado (Critério de Exclusão).
Apresenta o resultado numa tabela para fácil consulta.`,
        objective: "Estabelecer filtros lógicos antes de selecionar literatura.",
        expectedResult: "Tabela clara do que será incluído e excluído no estudo.",
        example: "Incluir: Estudantes Universitários. Excluir: Ensino Secundário.",
        estimatedTime: "10�15 minutos",
        effort: "medium",
        competency: "Critérios de Inclusão/Exclusão"
    },

    "PT-R-007": {
        template: `Aqui está o resumo (abstract) de um artigo que encontrei:
"""
[COLE AQUI O RESUMO DO ARTIGO]
"""

O meu tema é: "{{TEMA}}"
A minha pergunta de investigação é: "{{PERGUNTA}}"
Os meus critérios de inclusão/exclusão são:
{{CRITERIOS}}

Atua como um assistente de investigação rigoroso.
1. Analisa o resumo face aos meus critérios.
2. Este artigo parece relevante para a minha pergunta de investigação?
3. Há algum sinal de alerta de que poderá não ser um estudo de qualidade (ex: falta de metodologia clara)?
4. Recomendas que eu leia o artigo completo (Sim, Não, Talvez)? Justifica em 2 frases.

Responde de forma muito concisa.`,
        objective: "Decidir rapidamente se vale a pena ler o artigo completo.",
        expectedResult: "Classificação Rápida: Sim, Não ou Talvez, baseada nos critérios.",
        example: "Rejeitado: O estudo foca-se no ensino básico e não no superior.",
        estimatedTime: "2�5 minutos",
        effort: "low",
        competency: "Triagem de Literatura"
    },

    "PT-R-008": {
        template: `Executei a seguinte estratégia de pesquisa:
[COLE AQUI A SUA ESTRAT�0GIA / QUERY]

Base de dados:
[NOME DA BASE DE DADOS AQUI, ex: Scopus / WoS / PubMed]

Obtive:
[N�aMERO DE RESULTADOS AQUI]

O meu objetivo é encontrar estudos diretamente relacionados com:
"{{TEMA}}"

Ajude-me a analisar a estratégia utilizada e proponha melhorias para aumentar a relevância dos resultados, indicando claramente:
- o que manter;
- o que remover;
- que operadores booleanos alterar;
- novos descritores;
- sinónimos;
- filtros recomendados.`,
        objective: "Refinamento da Estratégia de Pesquisa.",
        expectedResult: "Análise crítica da query atual e sugestão de uma nova versão otimizada.",
        example: "Sugiro substituir 'university' por 'higher education' e adicionar o filtro de ano >= 2019.",
        estimatedTime: "5-10 minutos",
        effort: "medium",
        competency: "Refinamento de Pesquisa"
    },

    // --- VALIDAÇÃO (PT-V) ---
    "PT-V-001": {
        template: `Atua como um revisor científico sénior em ciências sociais e educação.
Abaixo encontra-se o Tema da investigação e a Pergunta de Investigação desenhada pelo investigador.

TEMA: "{{TEMA}}"
PERGUNTA DE INVESTIGAÇÃO: "{{PERGUNTA}}"

Analisa rigorosamente a Pergunta com base nos seguintes critérios:
1. Clareza: É clara, concisa e inequívoca?
2. Exequibilidade: É mensurável e investigável dentro de limites realistas?
3. Alinhamento: Está diretamente relacionada com o TEMA indicado?

Se cumprir todos os critérios metodológicos de forma satisfatória, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO PASS]

Se tiver falhas estruturais graves, ambiguidade profunda, ou for irremediavelmente vasta/estreita, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO FAIL]

Se a estrutura estiver correta, mas for demasiado ampla ou necessitar apenas de melhor delimitação/foco, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO WARNING]

Nas linhas seguintes (e apenas a partir da segunda linha), escreve de forma muito sucinta (máximo 3 bullets) as tuas observações e sugestões de melhoria (se existirem). Não incluas saudações nem texto adicional.`,
        objective: "Valida a consistência metodológica da pergunta de investigação.",
        expectedResult: "[VALIDAÇÃO PASS], [VALIDAÇÃO WARNING] ou [VALIDAÇÃO FAIL] seguido de 3 bullets de observação."
    },
    
    "PT-V-002": {
        template: `Atua como um revisor bibliotecário e científico.
Abaixo encontra-se a Pergunta de Investigação e as Palavras-Chave selecionadas.

PERGUNTA DE INVESTIGAÇÃO: "{{PERGUNTA}}"
PALAVRAS-CHAVE: "{{PALAVRAS_CHAVE}}"

Analisa rigorosamente as Palavras-Chave com base nos seguintes critérios:
1. Cobertura: Cobrem os conceitos centrais da Pergunta de Investigação?
2. Precisão: São termos comuns em bases de dados académicas (Scopus, Web of Science, ERIC)?
3. Quantidade: Estão num número razoável (3 a 5 palavras)?

Se cumprirem os critérios de forma satisfatória para indexação, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO PASS]

Se faltarem conceitos nucleares presentes na pergunta, ou houver erros conceituais graves, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO FAIL]

Se os conceitos principais estiverem presentes mas forem termos demasiado vagos, frases completas ou houver excesso de palavras-chave, escreve na PRIMEIRA LINHA:
[VALIDAÇÃO WARNING]

Nas linhas seguintes (e apenas a partir da segunda linha), escreve de forma muito sucinta (máximo 3 bullets) as tuas observações ou sugestões de descritores melhores. Não incluas saudações.`,
        objective: "Valida as palavras-chave contra a pergunta de investigação.",
        expectedResult: "[VALIDAÇÃO PASS], [VALIDAÇÃO WARNING] ou [VALIDAÇÃO FAIL] seguido de 3 bullets."
    }
};

window.PROMPTS = PROMPTS;
