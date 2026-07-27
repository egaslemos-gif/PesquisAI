const fs = require('fs');

// STEP 2 - PT-R-003
let p = fs.readFileSync('src/assets/WF-INV/prompts.js', 'utf8');
p = p.replace(
    /"PT-R-003": \{[\s\S]*?\}(?=,\s*"PT-R-004")/,
    `"PT-R-003": {
        "template": "És um especialista em metodologia científica.\\nA minha área é {{area}} e o meu tema delimitado é: '{{TEMA}}'.\\n\\nPreciso de formular a minha pergunta central de investigação (aquela que o estudo vai tentar responder).\\n\\nImportante: NÃO respondas à pergunta de investigação, NÃO tentes resolver o problema e NÃO proponhas metodologias ou métodos de recolha de dados agora.\\n\\nPor favor, sugere 3 perguntas de investigação principais diferentes.\\nPara cada opção, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Pergunta Formulada (A pergunta de investigação, terminada em '?')\\n2. Justificação (Por que razão esta pergunta operacionaliza bem o tema?)\\n3. Limitações (Quais os vieses ou limites na capacidade de investigar esta pergunta?)\\n4. Sugestões (O que precisaria de ser diretamente medido ou observado no mundo real?)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Criar uma pergunta central que orientará toda a investigação.",
        "expectedResult": "Três opções de pergunta mensuráveis e exequíveis estruturadas.",
        "example": "Como é que a literacia digital afeta o desempenho dos estudantes ingressantes?",
        "estimatedTime": "10-15 minutos",
        "effort": "high",
        "competency": "Formulação de Pergunta"
    }`
);
fs.writeFileSync('src/assets/WF-INV/prompts.js', p);

// KNOWLEDGE - KN-STEP-INV-02
let k = fs.readFileSync('src/assets/WF-INV/knowledge.js', 'utf8');
k = k.replace(
    /"KN-STEP-INV-02": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-03")/,
    `"KN-STEP-INV-02": {
        "id": "KN-STEP-INV-02",
        "learningOutcome": "Formular uma pergunta central única, neutra e passível de verificação empírica ou teórica, que orienta o estudo.",
        "bestPractices": "Assegure-se de que a pergunta é aberta ('Como?', 'De que forma?', 'Quais os impactos?') e que não pode ser respondida com um simples 'Sim' ou 'Não'.",
        "commonErrors": "Formular uma pergunta que já embute a resposta ou a conclusão que o investigador pretende provar (viés de confirmação)."
    }`
);
fs.writeFileSync('src/assets/WF-INV/knowledge.js', k);

// CHECKLISTS - CHK-STEP-INV-02
let c = fs.readFileSync('src/assets/WF-INV/checklists.js', 'utf8');
c = c.replace(
    /"CHK-STEP-INV-02": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-03")/,
    `"CHK-STEP-INV-02": [
        { "id": "chk-02-01", "label": "A pergunta termina com um ponto de interrogação (?) e não embute a resposta esperada?" },
        { "id": "chk-02-02", "label": "A pergunta reflete com exatidão a população e o contexto do Tema definido na etapa anterior?" },
        { "id": "chk-02-03", "label": "A resposta a esta pergunta requer recolha/análise de dados (não é apenas uma pesquisa no Google)?" }
    ]`
);
fs.writeFileSync('src/assets/WF-INV/checklists.js', c);

// STEPS - STEP-INV-02 Artifact Capture
let s = fs.readFileSync('src/assets/WF-INV/workflow/steps.js', 'utf8');
s = s.replace(
    /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/g,
    (match, offset) => {
        if (s.substring(0, offset).includes('"id": "STEP-INV-03"')) return match; // skip if we went too far
        if (s.substring(Math.max(0, offset-500), offset).includes('STEP-INV-02')) {
            return `"artifactCapture": {
            "title": "Registar Pergunta de Investigação",
            "expected": "A pergunta principal que conduzirá a sua pesquisa.",
            "copyOnly": "Copie apenas a frase interrogativa. Omitir justificações, sugestões metodológicas ou texto complementar.",
            "format": "Uma única pergunta, terminada em ponto de interrogação.",
            "example": "Quais os fatores que influenciam o uso ético da IA por estudantes de licenciatura em Moçambique?",
            "commonMistakes": [
                "Guardar mais de uma pergunta de investigação principal.",
                "Incluir a justificação do LLM."
            ],
            "validationHints": [
                "Deve terminar com '?'"
            ]
        }`;
        }
        return match;
    }
);
fs.writeFileSync('src/assets/WF-INV/workflow/steps.js', s);

console.log("Step 2 Updated.");
