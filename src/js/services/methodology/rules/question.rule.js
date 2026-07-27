class QuestionRule {
    constructor() {
        this.category = 'question';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        let questionText = null;
        let targetStepId = 'S3';
        if (window.rgEngine && window.rgEngine.getWorkflow()) {
            const step = window.rgEngine.getWorkflow().steps.find(s => s.focus === 'question' || (s.evaluates && s.evaluates.includes('question')) || s.id === 'S3' || s.id === 'STEP-INV-03');
            if (step) targetStepId = step.id;
        }
        questionText = context.artifacts[targetStepId];

        if (!questionText || questionText.trim() === '') {
            if (context.stage && context.stage.currentStepId === targetStepId) {
                return {
                    severity: 'ERROR',
                    message: 'Não foi definida qualquer pergunta de investigação.',
                    suggestion: 'A pergunta é o motor da sua investigação.',
                    confidence: 1.0,
                    stepId: targetStepId
                };
            }
            return null;
        }

        const findings = [];
        const lowerQuestion = questionText.toLowerCase();
        
        // Deteta conectores que indicam múltiplas variáveis não controladas
        if (lowerQuestion.includes(' e ') || lowerQuestion.includes(' ou ')) {
            findings.push({
                severity: 'WARNING',
                message: 'A pergunta contém conectores lógicos ("e" / "ou").',
                suggestion: 'A pergunta contém duas variáveis. Considere simplificar para manter o foco.',
                confidence: 0.88,
                stepId: targetStepId
            });
        }

        if (!lowerQuestion.includes('?')) {
            findings.push({
                severity: 'ERROR',
                message: 'A formulação não parece ser uma pergunta.',
                suggestion: 'Termine com um ponto de interrogação (?).',
                confidence: 0.95,
                stepId: targetStepId
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new QuestionRule());
}
