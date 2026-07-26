const WORKFLOWS = {
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
                prompts: [],
                assets: {
                    knowledge: true,
                    prompt: false,
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
                prompts: [],
                assets: {
                    knowledge: true,
                    prompt: false,
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

window.WORKFLOWS = WORKFLOWS;
