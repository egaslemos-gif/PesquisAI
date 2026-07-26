class QuestionRule {
    constructor() {
        this.category = 'question';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        // Em WF-INV, S3 é a Pergunta de Investigação
        const questionText = context.artifacts['S3'];
        if (!questionText || questionText.trim() === '') {
            if (context.stage && context.stage.currentStepId === 'S3') {
                return {
                    severity: 'ERROR',
                    message: 'Não foi definida qualquer pergunta de investigação.',
                    suggestion: 'A pergunta é o motor da sua investigação.',
                    confidence: 1.0,
                    stepId: 'S3'
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
                stepId: 'S3'
            });
        }

        if (!lowerQuestion.includes('?')) {
            findings.push({
                severity: 'ERROR',
                message: 'A formulação não parece ser uma pergunta.',
                suggestion: 'Termine com um ponto de interrogação (?).',
                confidence: 0.95,
                stepId: 'S3'
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new QuestionRule());
}
