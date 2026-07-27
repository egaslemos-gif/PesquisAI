window.WORKFLOW_STEPS = window.WORKFLOW_STEPS || {};
window.WORKFLOW_STEPS['WF-INV'] = [
    {
        "id": "STEP-INV-01",
        "name": "Definição do Tema",
        "description": "O investigador identifica a sua área de interesse e, com apoio da IA, explora possibilidades até chegar a um tema delimitado e viável.",
        "artifactExpected": "Tema delimitado",
        "tools": [
            "tool-chatgpt",
            "tool-gemini",
            "tool-claude"
        ],
        "prompts": [
            "PT-R-001",
            "PT-R-002"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Tema",
            "expected": "O seu tema final, perfeitamente delimitado.",
            "copyOnly": "Copie apenas a frase do tema. Não inclua a justificação nem as limitações geradas pela IA.",
            "format": "Uma frase única e concisa.",
            "example": "Perceções dos docentes do ensino secundário em Moçambique sobre o uso do ChatGPT no ano letivo 2025.",
            "commonMistakes": [
                "Guardar mais do que um tema.",
                "Incluir a justificação metodológica."
            ],
            "validationHints": [
                "Deve ter menos de 300 caracteres."
            ]
        },
        "knowledgeId": "KN-STEP-INV-01",
        "checklistId": "CHK-STEP-INV-01"
    },
    {
        "id": "STEP-INV-02",
        "name": "Pergunta de Investigação",
        "description": "A partir do tema delimitado, o investigador formula uma pergunta de investigação clara, específica e respondível.",
        "artifactExpected": "Pergunta de investigação formulada",
        "tools": [
            "tool-chatgpt",
            "tool-claude"
        ],
        "prompts": [
            "PT-R-003"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Artefacto a guardar",
            "expected": "A pergunta principal de investigação.",
            "copyOnly": "Copie apenas a pergunta de investigação final selecionada.",
            "format": "Uma única pergunta interrogativa.",
            "example": "Quais os fatores que influenciam a utilização ética da Inteligência Artificial Generativa pelos estudantes universitários numa universidade moçambicana?",
            "commonMistakes": [
                "Copiar as três alternativas geradas.",
                "Incluir a análise metodológica da IA.",
                "Copiar todo o texto em vez da pergunta."
            ],
            "validationHints": [
                "Deve terminar com ponto de interrogação."
            ]
        },
        "validation": [
            {
                "level": "structural",
                "blocking": true,
                "checks": [
                    {
                        "type": "notEmpty",
                        "message": "O artefacto não pode estar vazio."
                    },
                    {
                        "type": "minLength",
                        "value": 10,
                        "message": "A pergunta de investigação parece demasiado curta."
                    },
                    {
                        "type": "hasQuestionMark",
                        "message": "A pergunta de investigação deve terminar com um ponto de interrogação (?)."
                    }
                ]
            },
            {
                "level": "methodological",
                "blocking": false,
                "promptId": "PT-V-001"
            }
        ],
        "knowledgeId": "KN-STEP-INV-02",
        "checklistId": "CHK-STEP-INV-02"
    },
    {
        "id": "STEP-INV-03",
        "name": "Definição de Objetivos",
        "description": "O investigador define um objetivo geral e objetivos específicos que operacionalizam a pergunta de investigação.",
        "artifactExpected": "Objetivos definidos",
        "tools": [
            "tool-chatgpt",
            "tool-claude"
        ],
        "prompts": [
            "PT-R-004"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Objetivos",
            "expected": "Os objetivos de investigação (Geral e Específicos).",
            "copyOnly": "Copie apenas a versão final dos objetivos.",
            "format": "Lista estruturada (Objetivo Geral + 3 a 5 Específicos).",
            "example": "Objetivo Geral: Analisar...\nObjetivos Específicos:\n1. Identificar...\n2. Avaliar...",
            "commonMistakes": [
                "Copiar justificações metodológicas.",
                "Copiar explicações sobre o porquê de cada verbo de ação.",
                "Incluir opções alternativas não utilizadas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-03",
        "checklistId": "CHK-STEP-INV-03"
    },
    {
        "id": "STEP-INV-04",
        "name": "Palavras-chave",
        "description": "O investigador, com apoio da IA, gera palavras-chave relevantes, sinónimos e termos relacionados para usar nas bases de dados académicas.",
        "artifactExpected": "Expressões de pesquisa documentadas",
        "tools": [
            "tool-chatgpt",
            "tool-gemini",
            "tool-google-scholar"
        ],
        "prompts": [
            "PT-R-005"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Expressões de Pesquisa",
            "expected": "As equações booleanas finais para utilizar nas bases de dados.",
            "copyOnly": "Copie apenas a Equação de Pesquisa principal pronta a usar (Inglês e/ou Português).",
            "format": "Texto com operadores lógicos (AND, OR, NOT).",
            "example": "(Artificial Intelligence OR Generative AI) AND (Higher Education OR University) AND (Ethics OR Academic Integrity)",
            "commonMistakes": [
                "Guardar tabelas enormes com todos os sinónimos.",
                "Guardar texto explicativo sobre o que é um operador booleano."
            ],
            "validationHints": [
                "Deve conter operadores em maiúsculas (AND/OR)"
            ]
        },
        "validation": [
            {
                "level": "structural",
                "blocking": true,
                "checks": [
                    {
                        "type": "notEmpty",
                        "message": "O artefacto não pode estar vazio."
                    },
                    {
                        "type": "minLength",
                        "value": 5,
                        "message": "A estratégia de pesquisa parece demasiado curta."
                    }
                ]
            },
            {
                "level": "methodological",
                "blocking": false,
                "promptId": "PT-V-002"
            }
        ],
        "knowledgeId": "KN-STEP-INV-04",
        "checklistId": "CHK-STEP-INV-04"
    },
    {
        "id": "STEP-INV-05",
        "name": "Critérios de Seleção",
        "description": "Definição rigorosa do que será incluído e excluído da revisão bibliográfica.",
        "artifactExpected": "Critérios definidos",
        "tools": [
            "tool-claude",
            "tool-chatgpt"
        ],
        "prompts": [
            "PT-R-006"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Critérios de Seleção",
            "expected": "A lista final e justificada de critérios de Inclusão e Exclusão.",
            "copyOnly": "Copie apenas a lista com os critérios e as respetivas justificações.",
            "format": "Lista em tópicos ou Tabela.",
            "example": "INCLUSÃO:\n- Publicados após 2020 (Justificação: Tecnologia em rápida mudança)\nEXCLUSÃO:\n- Estudos teóricos sem recolha empírica (Justificação: O nosso foco é aplicado)",
            "commonMistakes": [
                "Incluir introduções como 'Aqui estão os critérios propostos...'"
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-05",
        "checklistId": "CHK-STEP-INV-05"
    },
    {
        "id": "STEP-INV-06",
        "name": "Pesquisa em Bases",
        "description": "O investigador aplica as expressões booleanas em bases de dados científicas reais (Scopus, Web of Science, PubMed).",
        "artifactExpected": "Estratégia documentada",
        "tools": [
            "tool-openalex",
            "tool-consensus",
            "tool-semantic-scholar",
            "tool-google-scholar"
        ],
        "prompts": [
            "PT-R-008"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Pesquisa Efetiva",
            "expected": "O registo das equações finais usadas nas bases de dados e o número de resultados.",
            "copyOnly": "Copie a base de dados, a equação usada e o número total de resultados. Só isso.",
            "format": "Lista de Bases (ex: Base | Equação | Nº Resultados).",
            "example": "Scopus | (AI OR Generative) AND Education | 145 artigos",
            "commonMistakes": [
                "Copiar as explicações do LLM sobre como pesquisar.",
                "Esquecer de apontar o número de resultados."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-06",
        "checklistId": "CHK-STEP-INV-06"
    },
    {
        "id": "STEP-INV-07",
        "name": "Triagem de Artigos",
        "description": "Análise dos títulos e resumos face aos critérios de seleção estabelecidos.",
        "artifactExpected": "Conjunto de artigos selecionados",
        "tools": [
            "tool-zotero",
            "tool-claude",
            "tool-chatgpt"
        ],
        "prompts": [
            "PT-R-007"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Triagem",
            "expected": "Um registo das decisões de inclusão e exclusão.",
            "copyOnly": "Copie apenas a tabela final de decisão (Título | Decisão | Justificação).",
            "format": "Tabela ou Lista estruturada.",
            "example": "Artigo A | Excluído | Amostra no ensino básico (critério excluído)",
            "commonMistakes": [
                "Copiar resumos inteiros."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-07",
        "checklistId": "CHK-STEP-INV-07"
    },
    {
        "id": "STEP-INV-08",
        "name": "Leitura Integral",
        "description": "Leitura completa dos artigos selecionados para extração de dados e síntese.",
        "artifactExpected": "Tabela de extração preenchida",
        "tools": [
            "tool-notebooklm",
            "tool-claude"
        ],
        "prompts": [
            "PT-R-009"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Extração",
            "expected": "Os dados cruciais extraídos dos artigos lidos.",
            "copyOnly": "Copie apenas a matriz (Metodologia, Resultados, Limitações).",
            "format": "Tabela, Bullet points ou JSON estruturado.",
            "example": "Autor: Silva (2024)\nMetodologia: N=100...\nResultados: IA aumenta eficiência...\nLimitações: Amostra só em engenharias.",
            "commonMistakes": [
                "Copiar parágrafos inteiros do artigo original."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-08",
        "checklistId": "CHK-STEP-INV-08"
    },
    {
        "id": "STEP-INV-09",
        "name": "Redação da Revisão",
        "description": "Redação formal da revisão de literatura, comparando autores e identificando lacunas.",
        "artifactExpected": "Revisão da literatura estruturada",
        "tools": [
            "tool-claude",
            "tool-chatgpt"
        ],
        "prompts": [
            "PT-R-010"
        ],
        "assets": {
            "knowledge": true,
            "prompt": true,
            "checklist": true,
            "review": true,
            "examples": false,
            "tools": true
        },
        "artifactCapture": {
            "title": "Registar Revisão (Síntese)",
            "expected": "O texto final da revisão da literatura com identificação de lacunas.",
            "copyOnly": "Copie apenas o texto redigido (Eixos, Síntese e Lacuna).",
            "format": "Texto estruturado em parágrafos e secções.",
            "example": "2.1 Adoção de IA no Ensino\nVários estudos demonstram que... (Silva, 2024; Costa, 2023). Contudo, a lacuna reside na...",
            "commonMistakes": [
                "Copiar o prompt inicial.",
                "Não incluir referências cruzadas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-INV-09",
        "checklistId": "CHK-STEP-INV-09"
    }
];
