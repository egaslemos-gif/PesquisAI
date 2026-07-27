window.WORKFLOW_STEPS = window.WORKFLOW_STEPS || {};
window.WORKFLOW_STEPS['WF-SUP'] = [
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-01",
        "checklistId": "CHK-STEP-SUP-01"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-02",
        "checklistId": "CHK-STEP-SUP-02"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-03",
        "checklistId": "CHK-STEP-SUP-03"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-04",
        "checklistId": "CHK-STEP-SUP-04"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-05",
        "checklistId": "CHK-STEP-SUP-05"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-06",
        "checklistId": "CHK-STEP-SUP-06"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-07",
        "checklistId": "CHK-STEP-SUP-07"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-08",
        "checklistId": "CHK-STEP-SUP-08"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-09",
        "checklistId": "CHK-STEP-SUP-09"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-10",
        "checklistId": "CHK-STEP-SUP-10"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-11",
        "checklistId": "CHK-STEP-SUP-11"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-12",
        "checklistId": "CHK-STEP-SUP-12"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-13",
        "checklistId": "CHK-STEP-SUP-13"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-14",
        "checklistId": "CHK-STEP-SUP-14"
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
        "artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\n- Afirmação: Faltam fontes.\n- Evidência: 'Muitos estudos mostram...'\n\n# FEEDBACK AO ESTUDANTE\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        },
        "knowledgeId": "KN-STEP-SUP-15",
        "checklistId": "CHK-STEP-SUP-15"
    }
];
