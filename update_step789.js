const fs = require('fs');

let p = fs.readFileSync('src/assets/WF-INV/prompts.js', 'utf8');
p = p.replace(
    /"PT-R-007": \{[\s\S]*?\}(?=,\s*"PT-R-008")/,
    `"PT-R-007": {
        "template": "És um assistente de investigação rigoroso.\\nO meu tema é: '{{TEMA}}' e a minha pergunta é: '{{PERGUNTA}}'.\\nOs meus critérios de inclusão/exclusão são:\\n'{{CRITERIOS}}'\\n\\nAqui está o resumo (abstract) de um artigo:\\n'[COLE AQUI O RESUMO]'\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Decisão (Incluir, Excluir ou Talvez)\\n2. Justificação (Cruzamento direto entre o resumo e os critérios definidos)\\n3. Alertas de Qualidade (Há sinais metodológicos fracos visíveis no resumo?)\\n4. Próximo Passo (Ler na íntegra ou descartar definitivamente)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Decidir rapidamente se vale a pena ler o artigo completo.",
        "expectedResult": "Decisão estruturada e justificada face aos critérios.",
        "example": "Decisão: Excluir. Justificação: A amostra foca-se no ensino básico (critério de exclusão).",
        "estimatedTime": "2-5 minutos",
        "effort": "low",
        "competency": "Triagem de Literatura"
    }`
);
p = p.replace(
    /"PT-R-009": \{[\s\S]*?\}(?=,\s*"PT-R-010")/,
    `"PT-R-009": {
        "template": "És um assistente de extração de dados científicos.\\nO meu tema é: '{{TEMA}}'.\\nTenho o seguinte artigo completo (ou excertos relevantes):\\n'[COLE AQUI O TEXTO]'\\n\\nPreciso de extrair dados para a minha matriz de síntese.\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Metodologia (Qual o desenho do estudo, amostra e instrumentos?)\\n2. Resultados Principais (Que dados respondem diretamente ao meu tema?)\\n3. Lacunas e Limitações (O que os próprios autores assumem que falhou ou falta investigar?)\\n4. Citação Chave (Sugere 1 a 2 frases literais do autor que sejam brilhantes para citar)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Sistematizar a extração de dados cruciais do artigo lido.",
        "expectedResult": "Extração estruturada de Metodologia, Resultados e Limitações.",
        "example": "Metodologia: Estudo quantitativo, N=150 estudantes.",
        "estimatedTime": "5-10 minutos por artigo",
        "effort": "medium",
        "competency": "Extração de Dados"
    }`
);
p = p.replace(
    /"PT-R-010": \{[\s\S]*?\}/,
    `"PT-R-010": {
        "template": "És um especialista em redação académica.\\nA minha pergunta é: '{{PERGUNTA}}'.\\n\\nAqui está a minha matriz de extração/notas dos artigos lidos:\\n'[COLE AQUI A MATRIZ]'\\n\\nPreciso de ajuda para estruturar a minha Revisão da Literatura. NÃO quero um mero resumo autor por autor. Quero uma síntese crítica relacional.\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Eixos Temáticos (Identifica 2 a 3 grandes temas onde os autores convergem ou divergem)\\n2. Síntese Crítica (Para cada eixo, redige 1 parágrafo estruturado cruzando os autores, ex: 'Enquanto A defende X, B demonstra Y')\\n3. Identificação de Lacunas (Ensina-me a ver a lacuna: O que é que TODOS estes artigos falharam em investigar? O que testaram em adultos mas não em jovens?)\\n4. Sugestão de Fecho (Como a minha investigação vai preencher exatamente essa lacuna)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Sintetizar a literatura de forma crítica e relacional.",
        "expectedResult": "Texto estruturado que cruza autores e expõe lacunas.",
        "example": "Eixos Temáticos: 1. Adoção tecnológica; 2. Implicações éticas...",
        "estimatedTime": "15-30 minutos",
        "effort": "high",
        "competency": "Comunicação Científica"
    }`
);
fs.writeFileSync('src/assets/WF-INV/prompts.js', p);

let k = fs.readFileSync('src/assets/WF-INV/knowledge.js', 'utf8');
k = k.replace(
    /"KN-STEP-INV-07": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-08")/,
    `"KN-STEP-INV-07": {
        "id": "KN-STEP-INV-07",
        "learningOutcome": "Aplicar os critérios de seleção de forma sistemática à leitura de resumos (abstracts) para descartar o ruído rapidamente.",
        "bestPractices": "Na dúvida ('Talvez'), inclua o artigo para leitura integral. É preferível ler o texto completo do que perder um artigo chave por um resumo mal redigido.",
        "commonErrors": "Tentar ler o artigo completo nesta fase em vez de tomar decisões rápidas baseadas apenas no título e resumo."
    }`
);
k = k.replace(
    /"KN-STEP-INV-08": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-09")/,
    `"KN-STEP-INV-08": {
        "id": "KN-STEP-INV-08",
        "learningOutcome": "Extrair sistematicamente metodologias, resultados e limitações dos artigos incluídos, alimentando uma matriz de síntese.",
        "bestPractices": "Não leia de forma passiva. Leia à procura de dados específicos para preencher a sua matriz. Foco na secção de Resultados e Discussão.",
        "commonErrors": "Ler o artigo inteiro do início ao fim sem tirar notas estruturadas, perdendo horas preciosas."
    }`
);
k = k.replace(
    /"KN-STEP-INV-09": \{[\s\S]*?\}/,
    `"KN-STEP-INV-09": {
        "id": "KN-STEP-INV-09",
        "learningOutcome": "Redigir uma síntese crítica que não apenas resume, mas cruza autores (concordâncias, discordâncias) e justifica a necessidade do seu próprio estudo (a lacuna).",
        "bestPractices": "Uma lacuna reconhece-se quando múltiplos estudos sugerem algo como 'trabalhos futuros', ou quando aplicam teorias a um contexto (ex: Europa) mas não ao seu (ex: Moçambique).",
        "commonErrors": "Fazer uma 'lista de lavandaria' (O autor A diz X. O autor B diz Y. O autor C diz Z) sem os relacionar."
    }`
);
fs.writeFileSync('src/assets/WF-INV/knowledge.js', k);

let c = fs.readFileSync('src/assets/WF-INV/checklists.js', 'utf8');
c = c.replace(
    /"CHK-STEP-INV-07": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-08")/,
    `"CHK-STEP-INV-07": [
        { "id": "chk-07-01", "label": "A decisão de inclusão/exclusão baseou-se estritamente nos critérios definidos na etapa 5?" },
        { "id": "chk-07-02", "label": "Registou os motivos de exclusão (fundamental para relatar o processo)?" }
    ]`
);
c = c.replace(
    /"CHK-STEP-INV-08": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-09")/,
    `"CHK-STEP-INV-08": [
        { "id": "chk-08-01", "label": "Extraiu a amostra, metodologia e resultados principais de forma esquemática?" },
        { "id": "chk-08-02", "label": "Identificou as limitações apontadas pelos próprios autores do artigo lido?" }
    ]`
);
c = c.replace(
    /"CHK-STEP-INV-09": \[\s*\{[\s\S]*?\}\s*\]/,
    `"CHK-STEP-INV-09": [
        { "id": "chk-09-01", "label": "O texto cruza vários autores no mesmo parágrafo para debater uma ideia?" },
        { "id": "chk-09-02", "label": "Identificou explicitamente o que a literatura NÃO resolveu (a lacuna)?" },
        { "id": "chk-09-03", "label": "A revisão conclui justificando a pertinência da sua própria Pergunta de Investigação?" }
    ]`
);
fs.writeFileSync('src/assets/WF-INV/checklists.js', c);

// UPDATE ARTIFACT CAPTURE FOR STEP 7, 8, 9
let s = fs.readFileSync('src/assets/WF-INV/workflow/steps.js', 'utf8');
s = s.replace(
    /"id": "STEP-INV-07"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
            "title": "Registar Triagem",
            "expected": "Um registo das decisões de inclusão e exclusão.",
            "copyOnly": "Copie apenas a tabela final de decisão (Título | Decisão | Justificação).",
            "format": "Tabela ou Lista estruturada.",
            "example": "Artigo A | Excluído | Amostra no ensino básico (critério excluído)",
            "commonMistakes": [
                "Copiar resumos inteiros."
            ],
            "validationHints": []
        }`
    )
);
s = s.replace(
    /"id": "STEP-INV-08"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
            "title": "Registar Extração",
            "expected": "Os dados cruciais extraídos dos artigos lidos.",
            "copyOnly": "Copie apenas a matriz (Metodologia, Resultados, Limitações).",
            "format": "Tabela, Bullet points ou JSON estruturado.",
            "example": "Autor: Silva (2024)\\nMetodologia: N=100...\\nResultados: IA aumenta eficiência...\\nLimitações: Amostra só em engenharias.",
            "commonMistakes": [
                "Copiar parágrafos inteiros do artigo original."
            ],
            "validationHints": []
        }`
    )
);
s = s.replace(
    /"id": "STEP-INV-09"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
            "title": "Registar Revisão (Síntese)",
            "expected": "O texto final da revisão da literatura com identificação de lacunas.",
            "copyOnly": "Copie apenas o texto redigido (Eixos, Síntese e Lacuna).",
            "format": "Texto estruturado em parágrafos e secções.",
            "example": "2.1 Adoção de IA no Ensino\\nVários estudos demonstram que... (Silva, 2024; Costa, 2023). Contudo, a lacuna reside na...",
            "commonMistakes": [
                "Copiar o prompt inicial.",
                "Não incluir referências cruzadas."
            ],
            "validationHints": []
        }`
    )
);
fs.writeFileSync('src/assets/WF-INV/workflow/steps.js', s);

console.log("Steps 7, 8, and 9 Updated.");
