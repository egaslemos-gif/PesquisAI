class ObjectiveRule {
    constructor() {
        this.category = 'objectives';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        let objectiveText = null;
        let targetStepId = 'S4';
        if (window.rgEngine && window.rgEngine.getWorkflow()) {
            const step = window.rgEngine.getWorkflow().steps.find(s => s.focus === 'objectives' || (s.evaluates && s.evaluates.includes('objectives')) || s.id === 'S4' || s.id === 'STEP-INV-04');
            if (step) targetStepId = step.id;
        }
        objectiveText = context.artifacts[targetStepId];

        if (!objectiveText || objectiveText.trim() === '') {
            if (context.stage && context.stage.currentStepId === targetStepId) {
                return {
                    severity: 'WARNING',
                    message: 'Os objetivos ainda não foram definidos.',
                    suggestion: 'Comece com verbos de ação.',
                    confidence: 1.0,
                    stepId: targetStepId
                };
            }
            return null;
        }

        const findings = [];
        const lowerText = objectiveText.toLowerCase();
        
        const weakVerbs = ['compreender', 'saber', 'aprender', 'estudar', 'conhecer', 'entender'];
        
        let foundWeak = false;
        for (const verb of weakVerbs) {
            if (lowerText.includes(verb)) {
                foundWeak = true;
                break;
            }
        }

        if (foundWeak) {
            findings.push({
                severity: 'WARNING',
                message: 'O objetivo geral utiliza um verbo pouco observável.',
                suggestion: 'Sugestão: Analisar, Avaliar, Comparar, Desenvolver.',
                confidence: 0.9,
                stepId: targetStepId
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new ObjectiveRule());
}
