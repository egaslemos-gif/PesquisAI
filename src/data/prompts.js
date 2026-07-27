// Deprecated\n// Será removido na RC2.\nconst PROMPTS = {
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
        estimatedTime: "2-5 minutos",
        effort: "low",
        competency: "Triagem de Literatura"
    },

    "PT-R-008": {
        template: `O meu tema de investigação é: "{{TEMA}}"

Acabei de realizar uma pesquisa bibliográfica e os resultados não foram ideais (demasiados resultados, poucos resultados, ou irrelevantes).
Preciso da tua ajuda como especialista em Bibliometria para refinar e otimizar a minha pesquisa.

Aqui estão os dados do que fiz até agora:
1. Base de dados utilizada: [Substitua pelo nome da base. Ex: Scopus, Web of Science, PubMed, b-on]
2. Expressão (Query) exata que colei na base de dados: "[Cole aqui a expressão booleana que usou. Ex: (AI OR Artificial Intelligence) AND (Education)]"
3. Número total de resultados que a plataforma devolveu: [Insira o número de artigos encontrados. Ex: 3450]

Por favor, analisa a minha expressão de pesquisa face ao meu tema e diz-me:
1. Porque é que a minha query atual pode estar a falhar (muito restrita, muito ampla, termos inadequados)?
2. Escreve uma NOVA expressão booleana otimizada (apenas em Inglês) para eu copiar e colar diretamente na base de dados.
3. Indica 2 a 3 filtros rápidos que eu deva aplicar nos menus da plataforma para limpar o ruído (ex: filtro de Ano, Tipo de Artigo, Área Científica).`,
        objective: "Refinamento da Estratégia de Pesquisa.",
        expectedResult: "Análise crítica da query atual e sugestão de uma nova versão otimizada.",
        example: "Sugiro substituir 'university' por 'higher education' e adicionar o filtro de ano >= 2019.",
        estimatedTime: "5-10 minutos",
        effort: "medium",
        competency: "Refinamento de Pesquisa"
    },

    "PT-R-009": {
        template: `O meu tema é: "{{TEMA}}"

Estou na fase de leitura integral e extração de dados. Tenho o seguinte artigo:
"""
[COLE AQUI O RESUMO OU TEXTO PRINCIPAL DO ARTIGO]
"""

Por favor, extrai as seguintes informações deste artigo numa tabela estruturada (para eu colocar na minha matriz de extração):
1. Autor(es) e Ano
2. Objetivo do estudo
3. Metodologia utilizada (Amostra, Instrumentos)
4. Principais Resultados
5. Limitações apontadas

Responde de forma muito concisa e objetiva.`,
        objective: "Sistematizar a extração de dados cruciais do artigo lido.",
        expectedResult: "Uma tabela ou lista formatada com as 5 categorias de dados extraídas.",
        example: "Metodologia: Estudo quantitativo, N=150 estudantes.",
        estimatedTime: "5-10 minutos por artigo",
        effort: "low",
        competency: "Extração de Dados"
    },

    "PT-R-010": {
        template: `O meu tema é: "{{TEMA}}"
A minha pergunta de investigação é: "{{PERGUNTA}}"

Aqui está a minha matriz de extração com os dados dos artigos que li:
"""
[COLE AQUI A SUA MATRIZ DE EXTRAÇÃO OU AS NOTAS PRINCIPAIS]
"""

Com base nestes dados, ajuda-me a estruturar e redigir a Revisão da Literatura.
Regras para a redação:
- Não faças apenas um resumo individual ("O autor A diz X. O autor B diz Y"). 
- Agrupa os artigos por temas ou conclusões (ex: "Vários autores concordam que X (A, 2023; B, 2024), contudo C (2022) argumenta que Y").
- Identifica claramente concordâncias, discordâncias e a lacuna metodológica que o meu estudo pretende preencher.
- Utiliza uma linguagem académica formal.

Apresenta uma proposta de texto com títulos e subtítulos lógicos.`,
        objective: "Sintetizar a literatura de forma crítica e relacional.",
        expectedResult: "Uma proposta de texto para o referencial teórico com argumentação cruzada.",
        example: "2.1. O impacto da IA... Vários autores divergem sobre...",
        estimatedTime: "15-30 minutos",
        effort: "high",
        competency: "Redação Académica"
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

PROMPTS["PT-S-001"] = {
    "id": "PT-S-001",
    "title": "Análise Estrutural e Heurística",
    "description": "Prompt para avaliar a coerência global e identificar falhas estruturais graves antes da leitura profunda.",
    "prompt": "Atua como um avaliador académico sénior. Lê o texto fornecido (focando-te no resumo, introdução e conclusão) e identifica se o documento possui a estrutura mínima exigida (pré-textuais, textuais e pós-textuais) e se a linguagem académica e o tom estão adequados para o nível de ensino superior. Não corrijas erros ortográficos menores agora. Apresenta o resultado em formato de tópicos (bullet points) destacando as tuas primeiras impressões e as maiores fragilidades estruturais, usando os níveis [GRAVE], [MODERADO] e [LEVE]."
};
PROMPTS["PT-S-002"] = {
    "id": "PT-S-002",
    "title": "Avaliação do Tema de Pesquisa",
    "description": "Prompt para analisar a exequibilidade, delimitação e relevância do tema.",
    "prompt": "Atua como um metodólogo experiente. Lê o tema e a delimitação propostos no texto. Avalia se o tema é original, se está bem delimitado no espaço e no tempo, e se possui pertinência científica para a área do curso. Indica se o tema corre o risco de ser 'demasiado lato' ou inexequível por falta de recursos/dados. Responde num pequeno parecer dividido em: 1) Forças do Tema; 2) Riscos de Exequibilidade; 3) Recomendações de Delimitação."
};
PROMPTS["PT-S-003"] = {
    "id": "PT-S-003",
    "title": "Refinamento e Validação do Título",
    "description": "Prompt para analisar se o título capta fielmente o problema sem ser demasiado longo ou interrogativo.",
    "prompt": "Atua como um editor científico. Analisa o título sugerido para este trabalho em conjugação com o seu objetivo principal. O título deve ser claro, conciso e refletir a essência do estudo, preferencialmente não deve ser uma pergunta. Avalia se existem palavras supérfluas. Fornece um comentário crítico sobre o título atual e sugere 3 alternativas de títulos, desde os mais descritivos aos mais concisos."
};
PROMPTS["PT-S-004"] = {
    "id": "PT-S-004",
    "title": "Análise da Formulação do Problema",
    "description": "Prompt para garantir que o problema é científico, claro e responde a uma lacuna.",
    "prompt": "Atua como um arguente de dissertação. Lê a secção da formulação do problema. Avalia criticamente se o problema de investigação está claramente definido, preferencialmente formulado como uma pergunta direta. O problema reflete uma lacuna científica real ou confunde-se com um mero 'problema social' ou 'prático'? Identifica o problema central e aponta fragilidades na sua sustentação teórica."
};
PROMPTS["PT-S-005"] = {
    "id": "PT-S-005",
    "title": "Alinhamento dos Objetivos",
    "description": "Prompt para verificar a coerência entre Objetivo Geral e Específicos e os verbos utilizados.",
    "prompt": "Atua como supervisor académico metodológico. Avalia os objetivos apresentados no texto. O Objetivo Geral responde diretamente ao problema de pesquisa? Os Objetivos Específicos detalham os passos metodológicos necessários para atingir o Geral? Verifica criticamente o uso dos verbos operatórios (exigindo que sejam passíveis de ação e verificação científica, evitando 'saber' ou 'entender'). Fornece sugestões de verbos mais adequados se necessário."
};
PROMPTS["PT-S-006"] = {
    "id": "PT-S-006",
    "title": "Crítica à Justificativa",
    "description": "Prompt para validar a força dos argumentos sobre a relevância da pesquisa.",
    "prompt": "Lê a justificativa apresentada. Analisa se os argumentos convencem o leitor sobre a necessidade científica e social de realizar esta investigação. A justificativa está fundamentada na literatura ou baseia-se apenas em convicções/motivações pessoais do autor? Aponta onde o estudante deve reforçar os argumentos recorrendo a dados secundários ou a autores consagrados."
};
PROMPTS["PT-S-007"] = {
    "id": "PT-S-007",
    "title": "Avaliação da Revisão da Literatura",
    "description": "Prompt para analisar a triangulação de autores e a atualidade das referências.",
    "prompt": "Atua como revisor de revista científica. Lê o capítulo de Revisão da Literatura (Referencial Teórico). Verifica se o texto é uma construção argumentativa em que os autores dialogam entre si ou se é apenas um 'mosaico' de citações isoladas (parágrafos colados sem conexão). Identifica também se faltam conceitos nucleares para sustentar a pesquisa e se a proporção de literatura recente (últimos 5 anos) parece adequada."
};
PROMPTS["PT-S-008"] = {
    "id": "PT-S-008",
    "title": "Parecer Metodológico Rigoroso",
    "description": "Prompt para auditar as opções metodológicas e sua capacidade de responder ao problema.",
    "prompt": "Atua como auditor científico. Lê a secção de Metodologia. Avalia a coerência da abordagem escolhida (quantitativa, qualitativa, mista) face aos objetivos e ao problema delineado. O método de recolha de dados (ex: tipo de amostragem, instrumentos) está descrito com rigor e clareza suficientes para replicação? Aponta possíveis enviesamentos (biases) que o estudante não acautelou na metodologia."
};
PROMPTS["PT-S-009"] = {
    "id": "PT-S-009",
    "title": "Crítica à Apresentação de Resultados",
    "description": "Prompt para verificar se os dados estão apresentados de forma clara, imparcial e legível.",
    "prompt": "Lê a secção de Resultados. Avalia se os dados apresentados (texto, tabelas ou gráficos) respondem diretamente à pergunta de investigação. O texto limita-se a repetir os números que já estão nas tabelas/gráficos, ou faz uma verdadeira síntese e interpretação orientada aos objetivos? Verifica se a linguagem usada é objetiva e imparcial. Não cries dados, apenas avalia o que foi fornecido."
};
PROMPTS["PT-S-010"] = {
    "id": "PT-S-010",
    "title": "Avaliação da Discussão de Dados",
    "description": "Prompt para garantir que o estudante debate os resultados empíricos com a teoria inicial.",
    "prompt": "Atua como um avaliador crítico. Lê a secção da Discussão. O estudante está efetivamente a debater os seus achados (Resultados) em confronto com a teoria apresentada anteriormente (Revisão da Literatura)? Ou está apenas a repetir o que já foi dito noutras secções? Avalia se as limitações do estudo foram reconhecidas de forma madura. Fornece um parecer apontando onde o estudante deve elevar o nível do debate crítico."
};
PROMPTS["PT-S-011"] = {
    "id": "PT-S-011",
    "title": "Verificação da Conclusão",
    "description": "Prompt para assegurar que a conclusão fecha o trabalho sem incluir dados novos.",
    "prompt": "Lê a secção de Conclusão. Verifica se o autor responde de forma inequívoca à pergunta central do problema de pesquisa. A conclusão é suportada apenas pelos dados analisados ou o autor faz extrapolações indevidas? Garante que não foram introduzidos dados, citações novas ou teorias que não apareceram no corpo principal do texto. Emite sugestões de melhoria para tornar o fecho mais sólido."
};
PROMPTS["PT-S-012"] = {
    "id": "PT-S-012",
    "title": "Parecer do Resumo (Abstract)",
    "description": "Prompt para validar a condensação do trabalho no formato estruturado de Resumo.",
    "prompt": "Lê o Resumo (e o Abstract). Verifica se contém os 5 elementos essenciais obrigatórios: 1) Contexto/Tema, 2) Problema/Objetivo, 3) Metodologia principal, 4) Resultados mais relevantes e 5) Conclusão. Identifica se existem detalhes desnecessários ou se o texto é demasiado descritivo sem apresentar os resultados. Avalia a coerência das palavras-chave escolhidas."
};
PROMPTS["PT-S-013"] = {
    "id": "PT-S-013",
    "title": "Auditoria APA (7ª Edição)",
    "description": "Prompt para identificar rapidamente quebras de conformidade nas citações e lista de referências.",
    "prompt": "Atua como um especialista em normalização bibliográfica. Analisa as referências e citações no texto fornecido. Identifica os desvios às regras da norma APA (7ª Edição). Encontra erros comuns: ausência de itálicos nos títulos de revistas/livros, ordenação incorreta, nomes de autores fora do padrão, falta de DOIs. Lista os erros de formatação encontrados e mostra 2 ou 3 exemplos corrigidos."
};
PROMPTS["PT-S-014"] = {
    "id": "PT-S-014",
    "title": "Verificação de Formatação e Normas",
    "description": "Prompt para detetar inconsistências visuais e estruturais (numeração, paginação, margens).",
    "prompt": "A partir da descrição ou excerto fornecido, analisa o cumprimento das normas visuais académicas genéricas (ex: Arial 11 / Times New Roman 12, espaçamento 1.5, margens específicas). Uma vez que não consegues ver o layout exato do PDF, orienta o supervisor sobre quais os pontos específicos da formatação (Índices, legendas de figuras, numeração de tabelas, paginação inicial) deve inspecionar manualmente com mais atenção."
};
PROMPTS["PT-S-015"] = {
    "id": "PT-S-015",
    "title": "Síntese para Parecer Final (Defesa)",
    "description": "Prompt para ajudar o supervisor a redigir o seu despacho final consolidado de aprovação ou reprovação.",
    "prompt": "Tendo em conta as tuas avaliações prévias e as notas globais do trabalho fornecidas pelo supervisor, atua como um assistente de redação académica. Redige um rascunho profissional e cordato para o 'Parecer Final do Orientador'. O texto deve incluir uma apreciação global sobre a qualidade científica, o cumprimento metodológico, e terminar com a recomendação explícita de 'aprovação para apresentação em Defesa Pública' (ou necessidade de revisão profunda), apontando 2 temas que poderão ser interessantes de debater na arguência."
};

window.PROMPTS = PROMPTS;
