const fs = require('fs');

let p = fs.readFileSync('src/assets/WF-INV/prompts.js', 'utf8');
p = p.replace(
    /"PT-R-006": \{[\s\S]*?\}(?=,\s*"PT-R-007")/,
    `"PT-R-006": {
        "template": "És um especialista em metodologia científica.\\nA minha pergunta de investigação é: '{{PERGUNTA}}'.\\nAs minhas palavras-chave são: '{{PALAVRAS_CHAVE}}'.\\n\\nPreciso de definir os Critérios de Inclusão e Exclusão para selecionar os artigos.\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Critérios de Inclusão (Lista de 3 a 5 critérios rígidos que um artigo TEM de cumprir. Justifica obrigatoriamente a razão metodológica de cada um)\\n2. Critérios de Exclusão (Lista de 3 a 5 critérios que levam à rejeição imediata do artigo. Justifica obrigatoriamente cada um)\\n3. Limitações (Que tipo de literatura de qualidade poderei estar a perder com estas restrições?)\\n4. Sugestões (Filtros de data ou idioma que seriam adequados para este tema específico)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Estabelecer filtros lógicos antes de selecionar literatura.",
        "expectedResult": "Lista justificada de critérios rigorosos de Inclusão e Exclusão.",
        "example": "Inclusão: Estudantes do Ensino Superior (Foca a população exata do estudo). Exclusão: Ensino Secundário.",
        "estimatedTime": "10-15 minutos",
        "effort": "medium",
        "competency": "Critérios de Inclusão/Exclusão"
    }`
);
p = p.replace(
    /"PT-R-008": \{[\s\S]*?\}(?=,\s*"PT-R-009")/,
    `"PT-R-008": {
        "template": "És um especialista em Bibliometria.\\nO meu tema de investigação é: '{{TEMA}}' e a minha equação de pesquisa foi: '[COLE AQUI A EQUAÇÃO USADA]' na base '[NOME DA BASE]'. Obtive '[NÚMERO]' resultados.\\n\\nPreciso de otimizar a minha pesquisa.\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Diagnóstico (Porque é que a pesquisa falhou: muito restrita, ampla, termos inadequados?)\\n2. Equação Otimizada (Uma NOVA expressão booleana, em Inglês, pronta a copiar)\\n3. Limitações (O que esta nova equação pode ainda falhar em captar?)\\n4. Sugestões (Filtros extra a usar na interface da base de dados, ex: Ano, Tipo de Documento)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Refinamento da Estratégia de Pesquisa.",
        "expectedResult": "Análise crítica e sugestão de nova equação otimizada.",
        "example": "Diagnóstico: Faltam sinónimos. Nova Equação: (AI OR Artificial Intelligence) AND...",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Refinamento de Pesquisa"
    }`
);
fs.writeFileSync('src/assets/WF-INV/prompts.js', p);

let k = fs.readFileSync('src/assets/WF-INV/knowledge.js', 'utf8');
k = k.replace(
    /"KN-STEP-INV-05": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-06")/,
    `"KN-STEP-INV-05": {
        "id": "KN-STEP-INV-05",
        "learningOutcome": "Estabelecer regras de triagem objetivas para garantir que apenas os estudos mais relevantes para a pergunta são incluídos.",
        "bestPractices": "Os critérios devem ser tão claros que dois investigadores independentes, ao lerem um resumo, tomariam a mesma decisão (incluir ou excluir). O critério de exclusão não deve ser apenas o reverso do critério de inclusão.",
        "commonErrors": "Usar critérios vagos como 'artigos bons' ou 'artigos recentes' sem especificar os parâmetros temporais ou qualitativos."
    }`
);
k = k.replace(
    /"KN-STEP-INV-06": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-07")/,
    `"KN-STEP-INV-06": {
        "id": "KN-STEP-INV-06",
        "learningOutcome": "Recolher um volume adequado e pertinente de publicações nas bases de dados científicas usando equações de pesquisa validadas.",
        "bestPractices": "Adapte a equação à sintaxe de cada base (ex: Scopus usa TITLE-ABS-KEY, PubMed usa [Title/Abstract]). Registre sempre a data da pesquisa e o número de resultados iniciais.",
        "commonErrors": "Pesquisar por frases inteiras em vez de conceitos Booleanos (AND/OR)."
    }`
);
fs.writeFileSync('src/assets/WF-INV/knowledge.js', k);

let c = fs.readFileSync('src/assets/WF-INV/checklists.js', 'utf8');
c = c.replace(
    /"CHK-STEP-INV-05": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-06")/,
    `"CHK-STEP-INV-05": [
        { "id": "chk-05-01", "label": "Cada critério (inclusão e exclusão) possui uma justificação metodológica clara?" },
        { "id": "chk-05-02", "label": "Os critérios de exclusão não são apenas o oposto óbvio dos de inclusão (ex: Inclusão: Adultos. Exclusão: Não-Adultos)?" },
        { "id": "chk-05-03", "label": "Dois leitores diferentes chegariam à mesma conclusão sobre incluir/excluir um artigo com base nestas regras?" }
    ]`
);
c = c.replace(
    /"CHK-STEP-INV-06": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-07")/,
    `"CHK-STEP-INV-06": [
        { "id": "chk-06-01", "label": "A equação booleana retornou um número de resultados viável para o meu estudo (nem 10, nem 10.000)?" },
        { "id": "chk-06-02", "label": "Registei a data da pesquisa e o número total de resultados (essencial para a secção de Metodologia)?" }
    ]`
);
fs.writeFileSync('src/assets/WF-INV/checklists.js', c);

// UPDATE ARTIFACT CAPTURE FOR STEP 5 AND 6
let s = fs.readFileSync('src/assets/WF-INV/workflow/steps.js', 'utf8');
s = s.replace(
    /"id": "STEP-INV-05"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
            "title": "Registar Critérios de Seleção",
            "expected": "A lista final e justificada de critérios de Inclusão e Exclusão.",
            "copyOnly": "Copie apenas a lista com os critérios e as respetivas justificações.",
            "format": "Lista em tópicos ou Tabela.",
            "example": "INCLUSÃO:\\n- Publicados após 2020 (Justificação: Tecnologia em rápida mudança)\\nEXCLUSÃO:\\n- Estudos teóricos sem recolha empírica (Justificação: O nosso foco é aplicado)",
            "commonMistakes": [
                "Incluir introduções como 'Aqui estão os critérios propostos...'"
            ],
            "validationHints": []
        }`
    )
);
s = s.replace(
    /"id": "STEP-INV-06"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
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
        }`
    )
);
fs.writeFileSync('src/assets/WF-INV/workflow/steps.js', s);

console.log("Steps 5 and 6 Updated.");
