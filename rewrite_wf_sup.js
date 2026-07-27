const fs = require('fs');

const PROMPT_RULE = `O objetivo desta análise não é encontrar erros por encontrar. É identificar oportunidades concretas para aumentar o rigor científico do trabalho. Evite elogios genéricos e críticas vagas (ex: proíbido dizer "O trabalho está bom" ou "A metodologia parece adequada"). Todas as observações devem ser justificadas com evidências extraídas do texto analisado. Quando não existir evidência suficiente, indique explicitamente que não é possível concluir. Não reescreva o trabalho do estudante; forneça orientação para que o autor possa melhorá-lo.

Apresenta obrigatoriamente a resposta com a seguinte estrutura:

# RELATÓRIO TÉCNICO (Para o Supervisor)
Para cada ponto crítico encontrado, usa o formato:
- Afirmação: [A tua avaliação]
- Justificação: [Porquê]
- Evidências: "[Cita o excerto exato do texto]"
- Recomendação: [Como corrigir]

# FEEDBACK AO ESTUDANTE
[Mensagem construtiva, curta e respeitosa, orientando o aluno para as correções sem lhe dar a resposta feita.]`;

let p = fs.readFileSync('src/assets/WF-SUP/prompts.js', 'utf8');

const customInstructions = {
  "PT-S-007": `Para a Revisão da Literatura, avalia obrigatoriamente (classificando o nível de evidência encontrada como Crítico, Moderado ou Aceitável):
1. Atualidade das referências
2. Coerência temática
3. Organização
4. Profundidade crítica
5. Existência de síntese
6. Existência de comparação entre estudos
7. Existência de lacunas identificadas`,
  "PT-S-008": `Para a Metodologia, avalia obrigatoriamente a CADEIA DE COERÊNCIA: Problema -> Objetivos -> Pergunta -> Método -> Instrumentos -> Análise. Identifica quebras nesta cadeia lógica.`,
  "PT-S-009": `Para os Resultados, avalia rigorosamente: Existe interpretação prematura antes da apresentação dos resultados? (SIM/NÃO e porquê). Os resultados não devem conter discussão teórica.`,
  "PT-S-011": `Para a Conclusão, verifica rigorosamente: Cada conclusão apresentada está suportada por evidências dos resultados? O aluno introduziu ideias novas que não foram discutidas antes? (Isto é proibido).`,
  "PT-S-013": `Para as Referências, verifica: Atualidade, Consistência da Norma APA, Duplicados, e Correspondência entre as citações no texto e a lista bibliográfica final.`
};

for (let i = 1; i <= 15; i++) {
    let id = "PT-S-" + i.toString().padStart(3, '0');
    let custom = customInstructions[id] || "Analisa a qualidade e o rigor científico desta secção.";
    
    let regex = new RegExp(`"${id}": \\{[\\s\\S]*?\\}(?=,\\s*"PT-S-)`);
    if(i === 15) {
       regex = new RegExp(`"${id}": \\{[\\s\\S]*?\\}`); 
    }
    
    // We need to escape newlines for the JSON string
    let ruleJSON = PROMPT_RULE.replace(/\n/g, '\\n').replace(/"/g, '\\"');
    let customJSON = custom.replace(/\n/g, '\\n').replace(/"/g, '\\"');

    p = p.replace(regex, 
`"${id}": {
        "template": "És um assistente sénior de revisão científica. Vais apoiar a revisão do seguinte excerto.\\n\\nExcerto do Estudante:\\n'[COLE AQUI O TEXTO]'\\n\\nInstruções Específicas: ${customJSON}\\n\\n${ruleJSON}",
        "objective": "Fornecer um parecer fundamentado baseado em evidências.",
        "expectedResult": "Relatório Técnico detalhado e Feedback para o aluno.",
        "example": "# RELATÓRIO TÉCNICO... # FEEDBACK AO ESTUDANTE...",
        "estimatedTime": "5-10 minutos",
        "effort": "high",
        "competency": "Revisão Científica"
    }`);
}
fs.writeFileSync('src/assets/WF-SUP/prompts.js', p);

let k = fs.readFileSync('src/assets/WF-SUP/knowledge.js', 'utf8');
for (let i = 1; i <= 15; i++) {
    let id = "KN-STEP-SUP-" + i.toString().padStart(2, '0');
    let regex = new RegExp(`"${id}": \\{[\\s\\S]*?\\}(?=,\\s*"KN-STEP-SUP-)`);
    if(i === 15) regex = new RegExp(`"${id}": \\{[\\s\\S]*?\\}`);
    
    k = k.replace(regex, 
`"${id}": {
        "id": "${id}",
        "learningOutcome": "Avaliar criticamente a qualidade do conhecimento apresentado pelo estudante, sustentando as críticas com evidências do próprio texto.",
        "bestPractices": "Não forneça as respostas ao estudante. Indique as falhas e oriente-o metodologicamente para que ele próprio corrija o trabalho.",
        "commonErrors": "Aprovar textos genericamente dizendo 'parece adequado' sem apontar onde está a evidência empírica."
    }`);
}
fs.writeFileSync('src/assets/WF-SUP/knowledge.js', k);

let c = fs.readFileSync('src/assets/WF-SUP/checklists.js', 'utf8');
for (let i = 1; i <= 15; i++) {
    let id = "CHK-STEP-SUP-" + i.toString().padStart(2, '0');
    let chkPrefix = "chk-" + i.toString().padStart(2, '0');
    let regex = new RegExp(`"${id}": \\[[\\s\\S]*?\\](?=,\\s*"CHK-STEP-SUP-)`);
    if (i === 15) regex = new RegExp(`"${id}": \\[[\\s\\S]*?\\]`);
    
    c = c.replace(regex, 
`"${id}": [
        { "id": "${chkPrefix}-01", "label": "O Relatório Técnico contém justificações suportadas por citações diretas (evidências) do texto do aluno?" },
        { "id": "${chkPrefix}-02", "label": "O Feedback ao Estudante é construtivo e não reescreve o trabalho por ele?" },
        { "id": "${chkPrefix}-03", "label": "As críticas vagas (ex: 'Está bom') foram eliminadas?" }
    ]`);
}
fs.writeFileSync('src/assets/WF-SUP/checklists.js', c);

let s = fs.readFileSync('src/assets/WF-SUP/workflow/steps.js', 'utf8');
for (let i = 1; i <= 15; i++) {
    let stepId = "STEP-SUP-" + i.toString().padStart(2, '0');
    let regex = new RegExp(`"id": "${stepId}"[\\s\\S]*?"artifactCapture": \\{[\\s\\S]*?"validationHints": \\[[\\s\\S]*?\\]\\s*\\}`);
    s = s.replace(regex, (match) => {
        return match.replace(
            /"artifactCapture": \{[\s\S]*?"validationHints": \[[\s\S]*?\]\s*\}/,
            `"artifactCapture": {
            "title": "Registar Parecer",
            "expected": "O Relatório Técnico interno e o Feedback a enviar ao estudante.",
            "copyOnly": "Copie o parecer completo gerado pela IA (Relatório Técnico e Feedback ao Estudante).",
            "format": "Texto estruturado em duas secções.",
            "example": "# RELATÓRIO TÉCNICO\\n- Afirmação: Faltam fontes.\\n- Evidência: 'Muitos estudos mostram...'\\n\\n# FEEDBACK AO ESTUDANTE\\nCaro aluno, por favor suporte a sua afirmação com autores recentes.",
            "commonMistakes": [
                "Copiar o texto original do aluno.",
                "Copiar apenas críticas vagas."
            ],
            "validationHints": []
        }`
        );
    });
}
fs.writeFileSync('src/assets/WF-SUP/workflow/steps.js', s);

console.log("All 15 Steps Updated for WF-SUP.");
