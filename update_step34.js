const fs = require('fs');

let p = fs.readFileSync('src/assets/WF-INV/prompts.js', 'utf8');
p = p.replace(
    /"PT-R-004": \{[\s\S]*?\}(?=,\s*"PT-R-005")/,
    `"PT-R-004": {
        "template": "És um especialista em metodologia científica.\\nA minha área é {{area}}, o tema é '{{TEMA}}' e a pergunta central é: '{{PERGUNTA}}'.\\n\\nPreciso de formular os objetivos da minha investigação.\\n\\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Objetivo Geral (Um único objetivo amplo que responda diretamente à pergunta central, começando por um verbo no infinitivo)\\n2. Objetivos Específicos (3 a 5 objetivos operacionais que, no seu conjunto, permitam atingir o objetivo geral)\\n3. Justificação (Por que razão estes objetivos são mensuráveis e adequados?)\\n4. Limitações (Quais os desafios em atingir estes objetivos específicos?)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Traduzir a pergunta numa meta geral e passos metodológicos específicos.",
        "expectedResult": "Lista estruturada com 1 Geral e 3-5 Específicos.",
        "example": "Objetivo Geral: Analisar...\\nObjetivos Específicos: 1. Identificar...",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Formulação de Objetivos"
    }`
);
p = p.replace(
    /"PT-R-005": \{[\s\S]*?\}(?=,\s*"PT-R-006")/,
    `"PT-R-005": {
        "template": "És um especialista em biblioteconomia e pesquisa documental.\\nA minha pergunta de investigação é: '{{PERGUNTA}}' e os objetivos são: '{{OBJETIVOS}}'.\\n\\nPreciso de definir os termos de pesquisa (palavras-chave) para as bases de dados.\\nImportante: Foca-te em conceitos, sinónimos, descritores (como MeSH ou DeCS) e operadores booleanos.\\n\\nApresenta a resposta estritamente com a seguinte estrutura:\\n\\n1. Conceitos Principais (Os 3-4 eixos centrais do estudo)\\n2. Sinónimos e Variantes (Termos equivalentes em Português e Inglês para cada eixo)\\n3. Equações de Pesquisa Sugeridas (2 a 3 expressões booleanas prontas a copiar, ex: (Term A OR Term B) AND Term C)\\n4. Limitações (Que termos podem gerar falsos positivos ou 'ruído' na pesquisa?)\\n\\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Definir termos para extrair literatura relevante.",
        "expectedResult": "Lista de conceitos, sinónimos e strings booleanas.",
        "example": "(Artificial Intelligence OR Machine Learning) AND (Higher Education)",
        "estimatedTime": "10 minutos",
        "effort": "medium",
        "competency": "Pesquisa Documental"
    }`
);
fs.writeFileSync('src/assets/WF-INV/prompts.js', p);

let k = fs.readFileSync('src/assets/WF-INV/knowledge.js', 'utf8');
k = k.replace(
    /"KN-STEP-INV-03": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-04")/,
    `"KN-STEP-INV-03": {
        "id": "KN-STEP-INV-03",
        "learningOutcome": "Desdobrar a Pergunta de Investigação num Objetivo Geral e numa sequência lógica de Objetivos Específicos (passos operacionais).",
        "bestPractices": "Use verbos no infinitivo (ex: Analisar, Comparar, Identificar, Avaliar). O Objetivo Geral é o espelho exato da Pergunta Central.",
        "commonErrors": "Confundir objetivos de investigação com metas do investigador (ex: 'Escrever um artigo' ou 'Melhorar as notas dos alunos')."
    }`
);
k = k.replace(
    /"KN-STEP-INV-04": \{[\s\S]*?\}(?=,\s*"KN-STEP-INV-05")/,
    `"KN-STEP-INV-04": {
        "id": "KN-STEP-INV-04",
        "learningOutcome": "Traduzir a pergunta de investigação em vocabulário controlado e expressões booleanas prontas a usar em motores de busca científicos.",
        "bestPractices": "Identifique apenas 2 a 4 conceitos centrais. Procure os termos correspondentes em Inglês, pois a maioria da literatura de alto impacto encontra-se nesse idioma.",
        "commonErrors": "Usar palavras de ligação (como, qual, impacto) nas pesquisas, em vez de focar apenas nos substantivos conceptuais."
    }`
);
fs.writeFileSync('src/assets/WF-INV/knowledge.js', k);

let c = fs.readFileSync('src/assets/WF-INV/checklists.js', 'utf8');
c = c.replace(
    /"CHK-STEP-INV-03": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-04")/,
    `"CHK-STEP-INV-03": [
        { "id": "chk-03-01", "label": "O Objetivo Geral reflete exatamente a Pergunta Central?" },
        { "id": "chk-03-02", "label": "Os Objetivos Específicos são ações operacionais (ex: Medir, Identificar) e não metas finais?" },
        { "id": "chk-03-03", "label": "Todos os objetivos começam com verbos no infinitivo?" }
    ]`
);
c = c.replace(
    /"CHK-STEP-INV-04": \[\s*\{[\s\S]*?\}\s*\](?=,\s*"CHK-STEP-INV-05")/,
    `"CHK-STEP-INV-04": [
        { "id": "chk-04-01", "label": "Foram identificados sinónimos em Inglês para os conceitos centrais?" },
        { "id": "chk-04-02", "label": "As equações utilizam corretamente os operadores AND e OR?" },
        { "id": "chk-04-03", "label": "Foram removidos termos genéricos (ex: 'vantagens', 'impacto')?" }
    ]`
);
fs.writeFileSync('src/assets/WF-INV/checklists.js', c);

// UPDATE ARTIFACT CAPTURE FOR STEP 3 AND 4
let s = fs.readFileSync('src/assets/WF-INV/workflow/steps.js', 'utf8');
s = s.replace(
    /"id": "STEP-INV-03"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
            "title": "Registar Objetivos",
            "expected": "Os objetivos de investigação (Geral e Específicos).",
            "copyOnly": "Copie apenas a versão final dos objetivos.",
            "format": "Lista estruturada (Objetivo Geral + 3 a 5 Específicos).",
            "example": "Objetivo Geral: Analisar...\\nObjetivos Específicos:\\n1. Identificar...\\n2. Avaliar...",
            "commonMistakes": [
                "Copiar justificações metodológicas.",
                "Copiar explicações sobre o porquê de cada verbo de ação.",
                "Incluir opções alternativas não utilizadas."
            ],
            "validationHints": []
        }`
    )
);

s = s.replace(
    /"id": "STEP-INV-04"[\s\S]*?"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
    (match) => match.replace(
        /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
        `"artifactCapture": {
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
        }`
    )
);
fs.writeFileSync('src/assets/WF-INV/workflow/steps.js', s);

console.log("Steps 3 and 4 Updated.");
