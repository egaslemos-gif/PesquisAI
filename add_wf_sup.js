const fs = require('fs');

const wfSup = {
    id: "WF-SUP",
    name: "Supervisor",
    steps: [
        {
            id: "STEP-SUP-01",
            name: "Análise Geral",
            description: "Avaliação heurística do documento para entender a coerência global antes da análise detalhada.",
            artifactExpected: "Notas Preliminares do Supervisor",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-001"],
            assets: {
                knowledge: true,
                prompt: true,
                checklist: true,
                review: true,
                examples: false,
                tools: true
            },
            learningOutcome: "Obter uma visão panorâmica do trabalho, identificando imediatamente problemas estruturais graves.",
            bestPractices: "Faça uma leitura flutuante (skimming) do resumo, introdução e conclusão antes de entrar nos capítulos.",
            commonErrors: "Focar excessivamente em erros ortográficos na primeira leitura, perdendo a visão do todo.",
            checklist: [
                { id: "chk-sup-01-01", label: "O trabalho possui a estrutura exigida (Pré-textuais, Textuais, Pós-textuais)?" },
                { id: "chk-sup-01-02", label: "A linguagem é adequada para o nível académico exigido?" }
            ],
            artifactCapture: {
                title: "Notas do Supervisor",
                expected: "Pontos críticos e primeiras impressões.",
                copyOnly: "Não gere texto automaticamente, aponte apenas as suas observações.",
                format: "Tópicos soltos.",
                example: "- Falta folha de aprovação.\\n- Linguagem muito coloquial no capítulo 1.",
                commonMistakes: [],
                validationHints: []
            }
        },
        {
            id: "STEP-SUP-02",
            name: "Tema",
            description: "Avaliar a pertinência, originalidade e viabilidade do tema escolhido pelo estudante.",
            artifactExpected: "Parecer sobre o Tema",
            tools: ["tool-chatgpt", "tool-consensus", "tool-scite"],
            prompts: ["PT-S-002"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Validar se o tema merece investigação aprofundada.",
            bestPractices: "Certifique-se de que o tema não é demasiado lato, o que tornaria o trabalho inexequível.",
            commonErrors: "Aprovar temas que exigem recursos metodológicos ou financeiros que o estudante não possui.",
            checklist: [
                { id: "chk-sup-02-01", label: "O tema é relevante para a área científica do curso?" },
                { id: "chk-sup-02-02", label: "O tema está bem delimitado (contexto/espaço/tempo)?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "Aprovação ou ajustes sugeridos ao Tema", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-03",
            name: "Título",
            description: "Verificar se o título reflete fielmente o conteúdo e os objetivos da pesquisa.",
            artifactExpected: "Sugestões de melhoria do Título",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-003"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Garantir um título atrativo, rigoroso e sem ambiguidades.",
            bestPractices: "O título não deve ser uma pergunta, deve ser a afirmação do que foi feito.",
            commonErrors: "Títulos excessivamente longos ou com abreviaturas não explicadas.",
            checklist: [
                { id: "chk-sup-03-01", label: "O título é claro e conciso?" },
                { id: "chk-sup-03-02", label: "Reflete a essência do problema e da área de estudo?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-04",
            name: "Problema",
            description: "Analisar a formulação do problema de investigação e a clareza da lacuna científica.",
            artifactExpected: "Parecer sobre o Problema",
            tools: ["tool-chatgpt", "tool-gemini", "tool-claude"],
            prompts: ["PT-S-004"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Confirmar se o trabalho resolve um problema científico real.",
            bestPractices: "O problema deve estar preferencialmente formulado em forma de pergunta.",
            commonErrors: "Confundir um problema social ou prático com um problema científico.",
            checklist: [
                { id: "chk-sup-04-01", label: "O problema está formulado como pergunta?" },
                { id: "chk-sup-04-02", label: "É claro, investigável e alinhado ao tema?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-05",
            name: "Objetivos",
            description: "Avaliar o alinhamento entre o Objetivo Geral e os Objetivos Específicos.",
            artifactExpected: "Parecer sobre os Objetivos",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-005"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Garantir metas de pesquisa atingíveis e passíveis de verificação.",
            bestPractices: "Verificar se cada objetivo específico corresponde a uma etapa metodológica.",
            commonErrors: "Usar verbos que não traduzem ação científica (ex: 'saber', 'entender' em vez de 'analisar', 'identificar').",
            checklist: [
                { id: "chk-sup-05-01", label: "O objetivo geral responde diretamente à pergunta de partida?" },
                { id: "chk-sup-05-02", label: "Os objetivos específicos utilizam verbos operatórios e avaliáveis?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-06",
            name: "Justificativa",
            description: "Avaliar os motivos que sustentam a pesquisa (relevância teórica e social).",
            artifactExpected: "Parecer sobre Justificativa",
            tools: ["tool-chatgpt"],
            prompts: ["PT-S-006"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Garantir que a pesquisa está bem ancorada na necessidade da comunidade académica.",
            bestPractices: "A justificação deve convencer o leitor de que investir tempo na leitura do trabalho vale a pena.",
            commonErrors: "Justificativas baseadas apenas em razões pessoais do estudante.",
            checklist: [
                { id: "chk-sup-06-01", label: "A relevância científica e académica está clara?" },
                { id: "chk-sup-06-02", label: "A relevância social/prática para a comunidade está evidenciada?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-07",
            name: "Revisão da Literatura",
            description: "Verificar a profundidade do referencial teórico e uso adequado de citações.",
            artifactExpected: "Parecer sobre Revisão de Literatura",
            tools: ["tool-consensus", "tool-scopus", "tool-scite", "tool-rabbit"],
            prompts: ["PT-S-007"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Identificar falhas na triangulação de autores e atualidade das fontes.",
            bestPractices: "Incentive o aluno a dialogar com os autores e não apenas fazer um 'mosaico' de citações coladas.",
            commonErrors: "Falta de citações primárias e referências muito antigas (mais de 5 anos, exceto obras seminais).",
            checklist: [
                { id: "chk-sup-07-01", label: "A revisão inclui publicações recentes (últimos 5 anos)?" },
                { id: "chk-sup-07-02", label: "O texto estabelece um diálogo crítico entre os autores?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-08",
            name: "Metodologia",
            description: "Avaliar o rigor e a adequabilidade dos procedimentos metodológicos.",
            artifactExpected: "Parecer sobre Metodologia",
            tools: ["tool-chatgpt", "tool-claude", "tool-perplexity"],
            prompts: ["PT-S-008"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Assegurar que o método escolhido é o adequado para responder à pergunta de pesquisa.",
            bestPractices: "Verificar se a amostra, os instrumentos e o procedimento de análise de dados estão detalhados.",
            commonErrors: "Metodologia genérica copiada de manuais de investigação sem aplicação real ao estudo em causa.",
            checklist: [
                { id: "chk-sup-08-01", label: "O tipo de pesquisa e abordagem estão definidos e justificados?" },
                { id: "chk-sup-08-02", label: "Os instrumentos de recolha de dados estão validados e descritos?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-09",
            name: "Resultados",
            description: "Verificar a apresentação e tratamento dos dados recolhidos.",
            artifactExpected: "Parecer sobre Resultados",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-009"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Garantir a representação clara e imparcial dos achados da pesquisa.",
            bestPractices: "Cruzar as tabelas e gráficos apresentados com o texto: o texto deve explicar a tabela e não repetir os mesmos números.",
            commonErrors: "Apresentar gráficos redundantes ou com falhas de formatação/escala.",
            checklist: [
                { id: "chk-sup-09-01", label: "Os dados respondem diretamente aos objetivos do estudo?" },
                { id: "chk-sup-09-02", label: "As figuras e tabelas têm título e fonte (conforme normas UL)?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-10",
            name: "Discussão",
            description: "Avaliar o debate entre os resultados obtidos e a literatura consultada.",
            artifactExpected: "Parecer sobre Discussão",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-010"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Certificar-se de que o estudante produziu novo conhecimento baseado na evidência empírica.",
            bestPractices: "A discussão é o momento de brilhar do aluno. Verifique se as hipóteses iniciais foram confirmadas ou refutadas de forma madura.",
            commonErrors: "Repetir a secção de Resultados sem qualquer triangulação com a revisão de literatura.",
            checklist: [
                { id: "chk-sup-10-01", label: "Os resultados são confrontados com as teorias da revisão da literatura?" },
                { id: "chk-sup-10-02", label: "As limitações do estudo estão reconhecidas?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-11",
            name: "Conclusão",
            description: "Verificar a síntese final e resposta à pergunta de investigação.",
            artifactExpected: "Parecer sobre Conclusão",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-011"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Confirmar que a conclusão fecha o ciclo do trabalho sem introduzir novos dados.",
            bestPractices: "Verificar se a conclusão é clara, direta e se lança pistas para pesquisas futuras.",
            commonErrors: "Apresentar novos dados, citações ou teorias na conclusão.",
            checklist: [
                { id: "chk-sup-11-01", label: "A pergunta de investigação foi respondida claramente?" },
                { id: "chk-sup-11-02", label: "A conclusão é coerente com a análise e resultados (não extrapola)?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-12",
            name: "Resumo",
            description: "Analisar a precisão e estrutura do resumo e abstract.",
            artifactExpected: "Parecer sobre Resumo",
            tools: ["tool-chatgpt", "tool-claude", "tool-gemini"],
            prompts: ["PT-S-012"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Garantir a representação miniatural fiel do trabalho inteiro.",
            bestPractices: "O resumo deve conter: Tema/Problema, Objetivo Principal, Método, Principais Resultados e Conclusão. (Máximo 500 palavras segundo UL).",
            commonErrors: "Ausência de palavras-chave, formato em parágrafos separados ou falhas na tradução para a língua estrangeira.",
            checklist: [
                { id: "chk-sup-12-01", label: "Apresenta estrutura em parágrafo único e tem no máximo 500 palavras?" },
                { id: "chk-sup-12-02", label: "As palavras-chave (3 a 5) estão corretamente separadas por pontos?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-13",
            name: "Referências",
            description: "Validar o cumprimento da Norma APA 7th Edition exigida pela UniLicungo.",
            artifactExpected: "Correções na Bibliografia",
            tools: ["tool-zotero", "tool-mendeley", "tool-chatgpt"],
            prompts: ["PT-S-013"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Assegurar o rigor e ética académica na citação das fontes.",
            bestPractices: "Cruze a lista de referências final com as citações no corpo do texto (nenhuma obra citada pode faltar na lista final).",
            commonErrors: "Falta de URLs/DOIs, ordenação alfabética incorreta e mistura de vários estilos bibliográficos.",
            checklist: [
                { id: "chk-sup-13-01", label: "A lista de referências segue rigorosamente as Normas APA (7ª Edição)?" },
                { id: "chk-sup-13-02", label: "Todas as obras citadas no texto constam da lista final e vice-versa?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-14",
            name: "Formatação",
            description: "Verificar as Margens, Fonte, Alinhamento e Índices conforme as Normas UL.",
            artifactExpected: "Revisão Final de Formato",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-014"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Assegurar que o documento atende estritamente as regras de apresentação da UL.",
            bestPractices: "Exija que a numeração de páginas comece a ser impressa apenas a partir da Introdução.",
            commonErrors: "Usar fontes extravagantes, espaçamento desregulado e margens incorretas (deve ser 3cm Esquerda/Topo e 2cm Direita/Fundo).",
            checklist: [
                { id: "chk-sup-14-01", label: "As margens estão a 3cm (Sup/Esq) e 2cm (Inf/Dir)?" },
                { id: "chk-sup-14-02", label: "O tipo de letra é Arial 11 ou Times New Roman 12 com espaçamento 1.5?" },
                { id: "chk-sup-14-03", label: "A paginação aparece a partir da Introdução, mas conta a partir da Folha de Rosto?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        },
        {
            id: "STEP-SUP-15",
            name: "Validação Final",
            description: "Emitir o parecer final para marcação da defesa pública ou aprovação.",
            artifactExpected: "Parecer Global Final",
            tools: ["tool-chatgpt", "tool-claude"],
            prompts: ["PT-S-015"],
            assets: { knowledge: true, prompt: true, checklist: true, review: true, examples: false, tools: true },
            learningOutcome: "Finalizar a fase de supervisão e aprovar o trabalho para defesa.",
            bestPractices: "O parecer deve justificar de forma abrangente o mérito do trabalho e apontar áreas para debate na defesa.",
            commonErrors: "Pareceres vagos ('o trabalho está bom') sem fundamentos do mérito científico.",
            checklist: [
                { id: "chk-sup-15-01", label: "O documento cumpre todos os requisitos normativos e científicos?" },
                { id: "chk-sup-15-02", label: "O texto passou pela verificação de similaridade/plágio?" }
            ],
            artifactCapture: { title: "Notas do Supervisor", expected: "Aprovação para defesa.", copyOnly: "", format: "", example: "", commonMistakes: [], validationHints: [] }
        }
    ]
};

const wfStr = fs.readFileSync('src/data/workflows.js', 'utf8');

// The file ends with:
//     }
// };
// window.WORKFLOWS = WORKFLOWS;

// Replace the end properly
if (!wfStr.includes('"WF-SUP"')) {
    const updated = wfStr.replace(
        /window\.WORKFLOWS\s*=\s*WORKFLOWS;/,
        `WORKFLOWS["WF-SUP"] = ${JSON.stringify(wfSup, null, 4)};\n\nwindow.WORKFLOWS = WORKFLOWS;`
    );
    fs.writeFileSync('src/data/workflows.js', updated, 'utf8');
    console.log("workflows.js updated successfully.");
} else {
    console.log("WF-SUP already exists in workflows.js");
}
