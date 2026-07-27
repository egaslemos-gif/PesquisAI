const fs = require('fs');

// STEP 1 - PT-R-001
let p = fs.readFileSync('src/assets/WF-INV/prompts.js', 'utf8');
p = p.replace(
    /"PT-R-001": \{[\s\S]*?\}(?=,\s*"PT-R-002")/,
    `"PT-R-001": {
        "template": "És um especialista em metodologia de investigação científica.\\nAtuo na área de {{area}}.\\nPreciso de identificar um tema de investigação delimitado e exequível.\\n\\nPor favor, sugere 3 temas de investigação que cruzem a minha área com tendências atuais.\\nPara cada tema, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Tema Proposto (Uma frase clara e concisa)\\n2. Justificação (Por que razão é cientificamente e socialmente relevante?)\\n3. Limitações (Quais os maiores obstáculos práticos?)\\n4. Sugestões de Delimitação (Como focar num contexto geográfico/populacional)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Encontrar um tema de investigação viável e atual na sua área.",
        "expectedResult": "Uma lista de 3 temas estruturados (Tema, Justificação, Limitações, Sugestões).",
        "example": "Uso de IA generativa no ensino secundário.",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Ideação"
    }`
);

// STEP 1 - PT-R-002
p = p.replace(
    /"PT-R-002": \{[\s\S]*?\}(?=,\s*"PT-R-003")/,
    `"PT-R-002": {
        "template": "És um especialista em metodologia de investigação científica.\\nAtuo na área de {{area}} e tenho interesse no tema amplo: '{{title}}'.\\n\\nO meu tema atual é demasiado vago. Ajuda-me a delimitá-lo para que seja exequível num projeto académico com recursos limitados.\\n\\nPor favor, sugere 3 versões delimitadas do meu tema e apresenta a resposta estritamente com a seguinte estrutura para cada versão:\\n\\n1. Resultado Final (O novo tema perfeitamente delimitado numa única frase)\\n2. Justificação (O que foi cortado e porquê)\\n3. Limitações (O que esta delimitação impede de ser estudado)\\n4. Sugestões (Variáveis populacionais ou contextuais adicionais que eu poderia incluir)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Reduzir o escopo de um tema amplo para torná-lo investigável.",
        "expectedResult": "Três opções de temas focados e bem delimitados.",
        "example": "De 'Inteligência Artificial' para 'Uso de IA no 1º ano de Informática da UL'.",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Delimitação do problema"
    }`
);
fs.writeFileSync('src/assets/WF-INV/prompts.js', p);

// KNOWLEDGE - KN-STEP-INV-01
let k = fs.readFileSync('src/assets/WF-INV/knowledge.js', 'utf8');
k = k.replace(
    /"KN-STEP-INV-01": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-02")/,
    `"KN-STEP-INV-01": {
        "id": "KN-STEP-INV-01",
        "learningOutcome": "Saber delimitar um tópico genérico para torná-lo investigável, especificando fenómeno, população e contexto.",
        "bestPractices": "Escolha um tema sobre o qual tenha curiosidade intelectual, mas delimite-o de forma a caber no tempo e recursos disponíveis.",
        "commonErrors": "Escolher 'Inteligência Artificial na Educação' (demasiado vasto) em vez de 'Uso de IA generativa por estudantes do 1º ano de Informática da Instituição X' (delimitado)."
    }`
);
fs.writeFileSync('src/assets/WF-INV/knowledge.js', k);

// CHECKLISTS - CHK-STEP-INV-01
let c = fs.readFileSync('src/assets/WF-INV/checklists.js', 'utf8');
c = c.replace(
    /"CHK-STEP-INV-01": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-02")/,
    `"CHK-STEP-INV-01": [
        { "id": "chk-01-01", "label": "O tema identifica claramente o fenómeno a estudar?" },
        { "id": "chk-01-02", "label": "O tema especifica a população ou amostra alvo?" },
        { "id": "chk-01-03", "label": "O tema delimita o contexto espacial/temporal?" }
    ]`
);
fs.writeFileSync('src/assets/WF-INV/checklists.js', c);

// STEPS - STEP-INV-01 Artifact Capture and description
let s = fs.readFileSync('src/assets/WF-INV/workflow/steps.js', 'utf8');
s = s.replace(
    /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    `"artifactCapture": {
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
        }`
);
fs.writeFileSync('src/assets/WF-INV/workflow/steps.js', s);

console.log("Step 1 Updated.");
