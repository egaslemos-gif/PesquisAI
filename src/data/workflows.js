// Deprecated\n// Será removido na RC2.\nconst WORKFLOWS = {
    "WF-INV": {
        id: "WF-INV",
        name: "Investigador",
        steps: [
            {
                id: "STEP-INV-01",
                name: "Definição do Tema",
                description: "O investigador identifica a sua área de interesse e, com apoio da IA, explora possibilidades até chegar a um tema delimitado e viável.",
                artifactExpected: "Tema delimitado",
                tools: ["tool-chatgpt", "tool-gemini", "tool-claude"],
                prompts: ["PT-R-001", "PT-R-002"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Transformar uma área de interesse genérica num tópico de investigação exequível e focado.",
                bestPractices: "Escolha um tema sobre o qual tenha genuíno interesse e algum conhecimento prévio.",
                commonErrors: "Escolher um tema tão vasto que exigiria uma vida inteira para investigar (ex: 'O impacto da Internet na Sociedade').",
                checklist: [
                    { id: "chk-01-01", label: "O tema está delimitado a um contexto específico?" },
                    { id: "chk-01-02", label: "É possível formular uma pergunta a partir deste tema?" },
                    { id: "chk-01-03", label: "O tema é relevante para a área científica?" }
                ],
                artifactCapture: {
                    title: "Artefacto a guardar",
                    expected: "O tema delimitado final.",
                    copyOnly: "Copie apenas a versão final aprovada.",
                    format: "Uma frase concisa.",
                    example: "Perceções dos estudantes universitários sobre o uso responsável da Inteligência Artificial Generativa no contexto académico: estudo numa universidade moçambicana.",
                    commonMistakes: [
                        "Copiar justificações ou explicações da IA.",
                        "Guardar as várias alternativas sugeridas.",
                        "Copiar a conversa completa do ChatGPT."
                    ],
                    validationHints: ["Deve ter menos de 300 caracteres."]
                }
            },
            {
                id: "STEP-INV-02",
                name: "Pergunta de Investigação",
                description: "A partir do tema delimitado, o investigador formula uma pergunta de investigação clara, específica e respondível.",
                artifactExpected: "Pergunta de investigação formulada",
                tools: ["tool-chatgpt", "tool-claude"],
                prompts: ["PT-R-003"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Sintetizar o problema numa única pergunta que o estudo irá responder de forma empírica ou teórica.",
                bestPractices: "Utilize o formato PICO ou SPIDER se o estudo for aplicável. Mantenha a pergunta aberta (evite perguntas de Sim/Não).",
                commonErrors: "Formular várias perguntas complexas em vez de uma pergunta central que guia o projeto.",
                checklist: [
                    { id: "chk-02-01", label: "A pergunta é clara e específica?" },
                    { id: "chk-02-02", label: "Está alinhada com o tema?" },
                    { id: "chk-02-03", label: "É respondível com investigação?" }
                ],
                artifactCapture: {
                    title: "Artefacto a guardar",
                    expected: "A pergunta principal de investigação.",
                    copyOnly: "Copie apenas a pergunta de investigação final selecionada.",
                    format: "Uma única pergunta interrogativa.",
                    example: "Quais os fatores que influenciam a utilização ética da Inteligência Artificial Generativa pelos estudantes universitários numa universidade moçambicana?",
                    commonMistakes: [
                        "Copiar as três alternativas geradas.",
                        "Incluir a análise metodológica da IA.",
                        "Copiar todo o texto em vez da pergunta."
                    ],
                    validationHints: ["Deve terminar com ponto de interrogação."]
                },
                validation: [
                    {
                        level: "structural",
                        blocking: true,
                        checks: [
                            { type: "notEmpty", message: "O artefacto não pode estar vazio." },
                            { type: "minLength", value: 10, message: "A pergunta de investigação parece demasiado curta." },
                            { type: "hasQuestionMark", message: "A pergunta de investigação deve terminar com um ponto de interrogação (?)." }
                        ]
                    },
                    {
                        level: "methodological",
                        blocking: false,
                        promptId: "PT-V-001"
                    }
                ]
            },
            {
                id: "STEP-INV-03",
                name: "Definição de Objetivos",
                description: "O investigador define um objetivo geral e objetivos específicos que operacionalizam a pergunta de investigação.",
                artifactExpected: "Objetivos definidos",
                tools: ["tool-chatgpt", "tool-claude"],
                prompts: ["PT-R-004"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Desdobrar a pergunta principal em ações metodológicas (Objetivo Geral e Específicos).",
                bestPractices: "Os objetivos específicos devem seguir uma ordem cronológica ou lógica da investigação.",
                commonErrors: "Confundir objetivos (ex: 'Analisar dados') com tarefas ('Fazer questionário').",
                checklist: [
                    { id: "chk-03-01", label: "O objetivo geral está alinhado com a pergunta?" },
                    { id: "chk-03-02", label: "Cada objetivo específico é mensurável?" },
                    { id: "chk-03-03", label: "Os objetivos usam verbos de ação?" }
                ],
                artifactCapture: {
                    title: "Artefacto a guardar",
                    expected: "Os objetivos de investigação (Geral e Específicos).",
                    copyOnly: "Copie apenas a versão final dos objetivos.",
                    format: "Lista estruturada (Objetivo Geral + 3 a 5 Específicos).",
                    example: "Objetivo Geral: Analisar...\\nObjetivos Específicos:\\n1. Identificar...\\n2. Avaliar...",
                    commonMistakes: [
                        "Copiar justificações metodológicas.",
                        "Copiar explicações sobre o porquê de cada verbo de ação.",
                        "Incluir opções alternativas não utilizadas."
                    ],
                    validationHints: []
                }
            },
            {
                id: "STEP-INV-04",
                name: "Palavras-chave",
                description: "O investigador, com apoio da IA, gera palavras-chave relevantes, sinónimos e termos relacionados para usar nas bases de dados académicas.",
                artifactExpected: "Expressões de pesquisa documentadas",
                tools: ["tool-chatgpt", "tool-gemini", "tool-google-scholar"],
                prompts: ["PT-R-005"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Identificar a terminologia exata e estruturar expressões booleanas para maximizar resultados nas bases de dados.",
                bestPractices: "Pesquise sempre em Inglês nas grandes bases de dados, mesmo que o estudo seja sobre uma realidade local.",
                commonErrors: "Usar frases completas como palavras-chave em vez de conceitos isolados.",
                checklist: [
                    { id: "chk-04-01", label: "Identificou os 2-3 conceitos centrais?" },
                    { id: "chk-04-02", label: "Existem sinónimos em Inglês?" },
                    { id: "chk-04-03", label: "Construiu pelo menos uma expressão booleana?" }
                ],
                artifactCapture: {
                    title: "Artefacto a guardar",
                    expected: "Estratégia final de pesquisa.",
                    copyOnly: "Copie apenas a fórmula de pesquisa pronta a ser utilizada nas bases.",
                    format: "String booleana ou consulta estruturada.",
                    example: "(artificial intelligence OR AI) AND (higher education OR university students) AND (ethics OR responsible use)",
                    commonMistakes: [
                        "Copiar o dicionário de sinónimos inteiro.",
                        "Guardar a explicação dos operadores booleanos.",
                        "Copiar as instruções dadas pela IA."
                    ],
                    validationHints: []
                },
                validation: [
                    {
                        level: "structural",
                        blocking: true,
                        checks: [
                            { type: "notEmpty", message: "O artefacto não pode estar vazio." },
                            { type: "minLength", value: 5, message: "A estratégia de pesquisa parece demasiado curta." }
                        ]
                    },
                    {
                        level: "methodological",
                        blocking: false,
                        promptId: "PT-V-002"
                    }
                ]
            },
            {
                id: "STEP-INV-05",
                name: "Critérios de Seleção",
                description: "Definição rigorosa do que será incluído e excluído da revisão bibliográfica.",
                artifactExpected: "Critérios definidos",
                tools: ["tool-claude", "tool-chatgpt"],
                prompts: ["PT-R-006"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Criar uma barreira metodológica para garantir que apenas literatura relevante é analisada.",
                bestPractices: "Um critério de exclusão não é apenas o oposto do critério de inclusão (ex: Inclusão: Adultos. Exclusão: Animais. Incorreto: Excluir crianças).",
                commonErrors: "Ter critérios demasiado flexíveis que levam à inclusão de milhares de artigos.",
                checklist: [
                    { id: "chk-05-01", label: "Critérios de inclusão são claros?" },
                    { id: "chk-05-02", label: "Critérios de exclusão são claros e não redundantes?" },
                    { id: "chk-05-03", label: "Critérios estão alinhados com a pergunta de investigação?" }
                ],
                artifactCapture: {
                    title: "Artefacto a guardar",
                    expected: "A tabela ou lista de Critérios de Seleção.",
                    copyOnly: "Copie apenas a lista final dos critérios de Inclusão e Exclusão.",
                    format: "Lista categorizada ou Tabela.",
                    example: "INCLUSÃO: Artigos originais; Publicados entre 2019 e 2024; Em Inglês ou Português. EXCLUSÃO: Livros; Estudos fora do Ensino Superior.",
                    commonMistakes: [
                        "Copiar as justificações de cada critério dadas pela IA.",
                        "Incluir introduções como 'Aqui estão os critérios propostos...'",
                        "Guardar critérios não validados por si."
                    ],
                    validationHints: []
                }
            },
            {
                id: "STEP-INV-06",
                name: "Pesquisa em Bases",
                description: "O investigador aplica as expressões booleanas em bases de dados científicas reais (Scopus, Web of Science, PubMed).",
                artifactExpected: "Estratégia documentada",
                tools: ["tool-openalex", "tool-consensus", "tool-semantic-scholar", "tool-google-scholar"],
                prompts: ["PT-R-008"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Executar as expressões criadas e exportar os resultados em bloco.",
                bestPractices: "Guarde sempre um registo do número de resultados de cada base de dados na data da pesquisa para reportar no PRISMA.",
                commonErrors: "Pesquisar apenas no Google Scholar ignorando bases de dados indexadas de maior rigor.",
                checklist: [
                    { id: "chk-06-01", label: "Pesquisou em pelo menos 2 bases de dados distintas?" },
                    { id: "chk-06-02", label: "Registou o número de resultados iniciais?" },
                    { id: "chk-06-03", label: "Exportou os resultados para o formato RIS/BibTeX?" }
                ],
                artifactCapture: {
                    title: "O que guardar nesta etapa",
                    expected: "Registo da pesquisa executada e a Versão refinada da estratégia de pesquisa.",
                    copyOnly: "Copie apenas os dados factuais da pesquisa (Bases, data, total de artigos) e a estratégia final utilizada.",
                    format: "Resumo numérico por base de dados + Estratégia refinada.",
                    example: "Estratégia Final: ('digital literacy' OR 'digital skills') AND ('higher education').\\nData: 2024-03-15.\\nScopus: 145 resultados.\\nWeb of Science: 92 resultados.\\nTotal Bruto: 237.",
                    commonMistakes: [
                        "Colar aqui os ficheiros RIS (não é possível).",
                        "Copiar listas de referências (isso será feito no software de gestão bibliográfica).",
                        "Deixar este campo em branco, perdendo o registo para o PRISMA."
                    ],
                    validationHints: []
                }
            },
            {
                id: "STEP-INV-07",
                name: "Triagem de Artigos",
                description: "Análise dos títulos e resumos face aos critérios de seleção estabelecidos.",
                artifactExpected: "Conjunto de artigos selecionados",
                tools: ["tool-zotero", "tool-claude", "tool-chatgpt"],
                prompts: ["PT-R-007"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Aprender a ler abstracts de forma crítica e tomar decisões de inclusão rápidas e justificadas.",
                bestPractices: "Se um abstract não deixar claro se o artigo cumpre os critérios, inclua-o para leitura integral por precaução.",
                commonErrors: "Começar a ler o artigo completo durante a fase de triagem (perda de tempo enorme).",
                checklist: [
                    { id: "chk-07-01", label: "Aplicou os critérios de inclusão/exclusão a todos os abstracts?" },
                    { id: "chk-07-02", label: "Removeu duplicados?" },
                    { id: "chk-07-03", label: "Tem o número final de artigos selecionados para leitura integral?" }
                ],
                artifactCapture: {
                    title: "O que guardar nesta etapa",
                    expected: "O número final e a lista dos artigos aprovados.",
                    copyOnly: "Copie os resultados numéricos do PRISMA (duplicados, excluídos) e as referências finais.",
                    format: "Registo de triagem e/ou Lista de referências.",
                    example: "Duplicados removidos: 45. Excluídos pelo título/abstract: 180. Aprovados para leitura: 46.\\nArtigos:\\n1. Smith et al. (2023)...",
                    commonMistakes: [
                        "Copiar a análise detalhada que a IA fez de cada abstract individualmente.",
                        "Colar resumos dos artigos (guarde os resumos no Zotero/Mendeley).",
                        "Omitir os números da triagem."
                    ],
                    validationHints: []
                }
            },
            {
                id: "STEP-INV-08",
                name: "Leitura Integral",
                description: "Leitura completa dos artigos selecionados para extração de dados e síntese.",
                artifactExpected: "Tabela de extração preenchida",
                tools: ["tool-notebooklm", "tool-claude"],
                prompts: ["PT-R-009"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Extrair os dados relevantes (metodologia, resultados, limitações) de forma sistemática.",
                bestPractices: "Use uma tabela de extração (Excel ou Notion) com colunas para: Autor, Ano, Objetivo, Metodologia, Resultados, Limitações.",
                commonErrors: "Ler sem tirar notas estruturadas, obrigando a reler tudo mais tarde.",
                checklist: [
                    { id: "chk-08-01", label: "Leu os artigos na íntegra?" },
                    { id: "chk-08-02", label: "Extraiu os dados para uma matriz?" },
                    { id: "chk-08-03", label: "Identificou lacunas na literatura analisada?" }
                ],
                artifactCapture: {
                    title: "O que guardar nesta etapa",
                    expected: "Matriz de extração de dados sintetizada.",
                    copyOnly: "Copie apenas a matriz consolidada com a informação dos artigos lidos.",
                    format: "Tabela Markdown ou Texto Delimitado.",
                    example: "| Autor (Ano) | Metodologia | Principais Resultados | Limitações |\\n|-------------|-------------|-----------------------|------------|\\n| Lima (2024) | Qualitativa | Falta de políticas... | Amostra... |",
                    commonMistakes: [
                        "Colar os textos integrais dos artigos.",
                        "Colar resumos individuais longos em vez de uma matriz comparativa.",
                        "Copiar a conversa não estruturada da IA."
                    ],
                    validationHints: []
                }
            },
            {
                id: "STEP-INV-09",
                name: "Redação da Revisão",
                description: "Redação formal da revisão de literatura, comparando autores e identificando lacunas.",
                artifactExpected: "Revisão da literatura estruturada",
                tools: ["tool-claude", "tool-chatgpt"],
                prompts: ["PT-R-010"],
                assets: {
                    knowledge: true,
                    prompt: true,
                    checklist: true,
                    review: true,
                    examples: false,
                    tools: true
                },
                learningOutcome: "Escrever de forma sintética e crítica, e não apenas um resumo sequencial de artigos.",
                bestPractices: "Agrupe os artigos por temas ou conclusões (ex: 'Vários autores concordam que X, mas divergem em Y').",
                commonErrors: "Escrever de forma descritiva ('Autor A disse X. Autor B disse Y.'), sem cruzar as ideias.",
                checklist: [
                    { id: "chk-09-01", label: "A revisão está estruturada tematicamente?" },
                    { id: "chk-09-02", label: "Cruza conclusões de diferentes autores?" },
                    { id: "chk-09-03", label: "Identifica claramente a lacuna que o seu estudo vai preencher?" }
                ],
                artifactCapture: {
                    title: "O que guardar nesta etapa",
                    expected: "O texto da revisão de literatura.",
                    copyOnly: "Copie apenas o corpo de texto final devidamente redigido e estruturado.",
                    format: "Texto corrido com títulos e referências.",
                    example: "2. Revisão da Literatura\\n2.1. O impacto da IA no ensino...\\nVários autores (Smith, 2023; Lima, 2024) indicam que...",
                    commonMistakes: [
                        "Copiar os elogios ou comentários da IA ('Aqui está uma excelente revisão...').",
                        "Guardar várias versões do mesmo texto (guarde apenas a final).",
                        "Deixar secções incompletas com [inserir texto aqui]."
                    ],
                    validationHints: []
                }
            }
        ]
    }
};

WORKFLOWS["WF-SUP"] = {
    "id": "WF-SUP",
    "name": "Supervisor",
    "steps": [
        {
            "id": "STEP-SUP-01",
            "name": "Análise Geral",
            "description": "Avaliação heurística do documento para entender a coerência global antes da análise detalhada.",
            "artifactExpected": "Notas Preliminares do Supervisor",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-001"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Obter uma visão panorâmica do trabalho, identificando imediatamente problemas estruturais graves.",
            "bestPractices": "Faça uma leitura flutuante (skimming) do resumo, introdução e conclusão antes de entrar nos capítulos.",
            "commonErrors": "Focar excessivamente em erros ortográficos na primeira leitura, perdendo a visão do todo.",
            "checklist": [
                {
                    "id": "chk-sup-01-01",
                    "label": "O trabalho possui a estrutura exigida (Pré-textuais, Textuais, Pós-textuais)?"
                },
                {
                    "id": "chk-sup-01-02",
                    "label": "A linguagem é adequada para o nível académico exigido?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "Pontos críticos e primeiras impressões.",
                "copyOnly": "Não gere texto automaticamente, aponte apenas as suas observações.",
                "format": "Tópicos soltos.",
                "example": "- Falta folha de aprovação.\\n- Linguagem muito coloquial no capítulo 1.",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-02",
            "name": "Tema",
            "description": "Avaliar a pertinência, originalidade e viabilidade do tema escolhido pelo estudante.",
            "artifactExpected": "Parecer sobre o Tema",
            "tools": [
                "tool-chatgpt",
                "tool-consensus",
                "tool-scite"
            ],
            "prompts": [
                "PT-S-002"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Validar se o tema merece investigação aprofundada.",
            "bestPractices": "Certifique-se de que o tema não é demasiado lato, o que tornaria o trabalho inexequível.",
            "commonErrors": "Aprovar temas que exigem recursos metodológicos ou financeiros que o estudante não possui.",
            "checklist": [
                {
                    "id": "chk-sup-02-01",
                    "label": "O tema é relevante para a área científica do curso?"
                },
                {
                    "id": "chk-sup-02-02",
                    "label": "O tema está bem delimitado (contexto/espaço/tempo)?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "Aprovação ou ajustes sugeridos ao Tema",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-03",
            "name": "Título",
            "description": "Verificar se o título reflete fielmente o conteúdo e os objetivos da pesquisa.",
            "artifactExpected": "Sugestões de melhoria do Título",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-003"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Garantir um título atrativo, rigoroso e sem ambiguidades.",
            "bestPractices": "O título não deve ser uma pergunta, deve ser a afirmação do que foi feito.",
            "commonErrors": "Títulos excessivamente longos ou com abreviaturas não explicadas.",
            "checklist": [
                {
                    "id": "chk-sup-03-01",
                    "label": "O título é claro e conciso?"
                },
                {
                    "id": "chk-sup-03-02",
                    "label": "Reflete a essência do problema e da área de estudo?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-04",
            "name": "Problema",
            "description": "Analisar a formulação do problema de investigação e a clareza da lacuna científica.",
            "artifactExpected": "Parecer sobre o Problema",
            "tools": [
                "tool-chatgpt",
                "tool-gemini",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-004"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Confirmar se o trabalho resolve um problema científico real.",
            "bestPractices": "O problema deve estar preferencialmente formulado em forma de pergunta.",
            "commonErrors": "Confundir um problema social ou prático com um problema científico.",
            "checklist": [
                {
                    "id": "chk-sup-04-01",
                    "label": "O problema está formulado como pergunta?"
                },
                {
                    "id": "chk-sup-04-02",
                    "label": "É claro, investigável e alinhado ao tema?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-05",
            "name": "Objetivos",
            "description": "Avaliar o alinhamento entre o Objetivo Geral e os Objetivos Específicos.",
            "artifactExpected": "Parecer sobre os Objetivos",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-005"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Garantir metas de pesquisa atingíveis e passíveis de verificação.",
            "bestPractices": "Verificar se cada objetivo específico corresponde a uma etapa metodológica.",
            "commonErrors": "Usar verbos que não traduzem ação científica (ex: 'saber', 'entender' em vez de 'analisar', 'identificar').",
            "checklist": [
                {
                    "id": "chk-sup-05-01",
                    "label": "O objetivo geral responde diretamente à pergunta de partida?"
                },
                {
                    "id": "chk-sup-05-02",
                    "label": "Os objetivos específicos utilizam verbos operatórios e avaliáveis?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-06",
            "name": "Justificativa",
            "description": "Avaliar os motivos que sustentam a pesquisa (relevância teórica e social).",
            "artifactExpected": "Parecer sobre Justificativa",
            "tools": [
                "tool-chatgpt"
            ],
            "prompts": [
                "PT-S-006"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Garantir que a pesquisa está bem ancorada na necessidade da comunidade académica.",
            "bestPractices": "A justificação deve convencer o leitor de que investir tempo na leitura do trabalho vale a pena.",
            "commonErrors": "Justificativas baseadas apenas em razões pessoais do estudante.",
            "checklist": [
                {
                    "id": "chk-sup-06-01",
                    "label": "A relevância científica e académica está clara?"
                },
                {
                    "id": "chk-sup-06-02",
                    "label": "A relevância social/prática para a comunidade está evidenciada?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-07",
            "name": "Revisão da Literatura",
            "description": "Verificar a profundidade do referencial teórico e uso adequado de citações.",
            "artifactExpected": "Parecer sobre Revisão de Literatura",
            "tools": [
                "tool-consensus",
                "tool-scopus",
                "tool-scite",
                "tool-rabbit"
            ],
            "prompts": [
                "PT-S-007"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Identificar falhas na triangulação de autores e atualidade das fontes.",
            "bestPractices": "Incentive o aluno a dialogar com os autores e não apenas fazer um 'mosaico' de citações coladas.",
            "commonErrors": "Falta de citações primárias e referências muito antigas (mais de 5 anos, exceto obras seminais).",
            "checklist": [
                {
                    "id": "chk-sup-07-01",
                    "label": "A revisão inclui publicações recentes (últimos 5 anos)?"
                },
                {
                    "id": "chk-sup-07-02",
                    "label": "O texto estabelece um diálogo crítico entre os autores?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-08",
            "name": "Metodologia",
            "description": "Avaliar o rigor e a adequabilidade dos procedimentos metodológicos.",
            "artifactExpected": "Parecer sobre Metodologia",
            "tools": [
                "tool-chatgpt",
                "tool-claude",
                "tool-perplexity"
            ],
            "prompts": [
                "PT-S-008"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Assegurar que o método escolhido é o adequado para responder à pergunta de pesquisa.",
            "bestPractices": "Verificar se a amostra, os instrumentos e o procedimento de análise de dados estão detalhados.",
            "commonErrors": "Metodologia genérica copiada de manuais de investigação sem aplicação real ao estudo em causa.",
            "checklist": [
                {
                    "id": "chk-sup-08-01",
                    "label": "O tipo de pesquisa e abordagem estão definidos e justificados?"
                },
                {
                    "id": "chk-sup-08-02",
                    "label": "Os instrumentos de recolha de dados estão validados e descritos?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-09",
            "name": "Resultados",
            "description": "Verificar a apresentação e tratamento dos dados recolhidos.",
            "artifactExpected": "Parecer sobre Resultados",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-009"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Garantir a representação clara e imparcial dos achados da pesquisa.",
            "bestPractices": "Cruzar as tabelas e gráficos apresentados com o texto: o texto deve explicar a tabela e não repetir os mesmos números.",
            "commonErrors": "Apresentar gráficos redundantes ou com falhas de formatação/escala.",
            "checklist": [
                {
                    "id": "chk-sup-09-01",
                    "label": "Os dados respondem diretamente aos objetivos do estudo?"
                },
                {
                    "id": "chk-sup-09-02",
                    "label": "As figuras e tabelas têm título e fonte (conforme normas UL)?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-10",
            "name": "Discussão",
            "description": "Avaliar o debate entre os resultados obtidos e a literatura consultada.",
            "artifactExpected": "Parecer sobre Discussão",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-010"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Certificar-se de que o estudante produziu novo conhecimento baseado na evidência empírica.",
            "bestPractices": "A discussão é o momento de brilhar do aluno. Verifique se as hipóteses iniciais foram confirmadas ou refutadas de forma madura.",
            "commonErrors": "Repetir a secção de Resultados sem qualquer triangulação com a revisão de literatura.",
            "checklist": [
                {
                    "id": "chk-sup-10-01",
                    "label": "Os resultados são confrontados com as teorias da revisão da literatura?"
                },
                {
                    "id": "chk-sup-10-02",
                    "label": "As limitações do estudo estão reconhecidas?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-11",
            "name": "Conclusão",
            "description": "Verificar a síntese final e resposta à pergunta de investigação.",
            "artifactExpected": "Parecer sobre Conclusão",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-011"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Confirmar que a conclusão fecha o ciclo do trabalho sem introduzir novos dados.",
            "bestPractices": "Verificar se a conclusão é clara, direta e se lança pistas para pesquisas futuras.",
            "commonErrors": "Apresentar novos dados, citações ou teorias na conclusão.",
            "checklist": [
                {
                    "id": "chk-sup-11-01",
                    "label": "A pergunta de investigação foi respondida claramente?"
                },
                {
                    "id": "chk-sup-11-02",
                    "label": "A conclusão é coerente com a análise e resultados (não extrapola)?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-12",
            "name": "Resumo",
            "description": "Analisar a precisão e estrutura do resumo e abstract.",
            "artifactExpected": "Parecer sobre Resumo",
            "tools": [
                "tool-chatgpt",
                "tool-claude",
                "tool-gemini"
            ],
            "prompts": [
                "PT-S-012"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Garantir a representação miniatural fiel do trabalho inteiro.",
            "bestPractices": "O resumo deve conter: Tema/Problema, Objetivo Principal, Método, Principais Resultados e Conclusão. (Máximo 500 palavras segundo UL).",
            "commonErrors": "Ausência de palavras-chave, formato em parágrafos separados ou falhas na tradução para a língua estrangeira.",
            "checklist": [
                {
                    "id": "chk-sup-12-01",
                    "label": "Apresenta estrutura em parágrafo único e tem no máximo 500 palavras?"
                },
                {
                    "id": "chk-sup-12-02",
                    "label": "As palavras-chave (3 a 5) estão corretamente separadas por pontos?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-13",
            "name": "Referências",
            "description": "Validar o cumprimento da Norma APA 7th Edition exigida pela UniLicungo.",
            "artifactExpected": "Correções na Bibliografia",
            "tools": [
                "tool-zotero",
                "tool-mendeley",
                "tool-chatgpt"
            ],
            "prompts": [
                "PT-S-013"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Assegurar o rigor e ética académica na citação das fontes.",
            "bestPractices": "Cruze a lista de referências final com as citações no corpo do texto (nenhuma obra citada pode faltar na lista final).",
            "commonErrors": "Falta de URLs/DOIs, ordenação alfabética incorreta e mistura de vários estilos bibliográficos.",
            "checklist": [
                {
                    "id": "chk-sup-13-01",
                    "label": "A lista de referências segue rigorosamente as Normas APA (7ª Edição)?"
                },
                {
                    "id": "chk-sup-13-02",
                    "label": "Todas as obras citadas no texto constam da lista final e vice-versa?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-14",
            "name": "Formatação",
            "description": "Verificar as Margens, Fonte, Alinhamento e Índices conforme as Normas UL.",
            "artifactExpected": "Revisão Final de Formato",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-014"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Assegurar que o documento atende estritamente as regras de apresentação da UL.",
            "bestPractices": "Exija que a numeração de páginas comece a ser impressa apenas a partir da Introdução.",
            "commonErrors": "Usar fontes extravagantes, espaçamento desregulado e margens incorretas (deve ser 3cm Esquerda/Topo e 2cm Direita/Fundo).",
            "checklist": [
                {
                    "id": "chk-sup-14-01",
                    "label": "As margens estão a 3cm (Sup/Esq) e 2cm (Inf/Dir)?"
                },
                {
                    "id": "chk-sup-14-02",
                    "label": "O tipo de letra é Arial 11 ou Times New Roman 12 com espaçamento 1.5?"
                },
                {
                    "id": "chk-sup-14-03",
                    "label": "A paginação aparece a partir da Introdução, mas conta a partir da Folha de Rosto?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        },
        {
            "id": "STEP-SUP-15",
            "name": "Validação Final",
            "description": "Emitir o parecer final para marcação da defesa pública ou aprovação.",
            "artifactExpected": "Parecer Global Final",
            "tools": [
                "tool-chatgpt",
                "tool-claude"
            ],
            "prompts": [
                "PT-S-015"
            ],
            "assets": {
                "knowledge": true,
                "prompt": true,
                "checklist": true,
                "review": true,
                "examples": false,
                "tools": true
            },
            "learningOutcome": "Finalizar a fase de supervisão e aprovar o trabalho para defesa.",
            "bestPractices": "O parecer deve justificar de forma abrangente o mérito do trabalho e apontar áreas para debate na defesa.",
            "commonErrors": "Pareceres vagos ('o trabalho está bom') sem fundamentos do mérito científico.",
            "checklist": [
                {
                    "id": "chk-sup-15-01",
                    "label": "O documento cumpre todos os requisitos normativos e científicos?"
                },
                {
                    "id": "chk-sup-15-02",
                    "label": "O texto passou pela verificação de similaridade/plágio?"
                }
            ],
            "artifactCapture": {
                "title": "Notas do Supervisor",
                "expected": "Aprovação para defesa.",
                "copyOnly": "",
                "format": "",
                "example": "",
                "commonMistakes": [],
                "validationHints": []
            }
        }
    ]
};

window.WORKFLOWS = WORKFLOWS;
