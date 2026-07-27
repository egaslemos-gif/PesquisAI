class KeywordsRule {
    constructor() {
        this.category = 'keywords';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        // Em WF-INV, S5 são as Palavras-chave
        
        let targetStepId = 'S5';
        if (window.rgEngine && window.rgEngine.getWorkflow()) {
            const step = window.rgEngine.getWorkflow().steps.find(s => s.focus === 'keywords' || (s.evaluates && s.evaluates.includes('keywords')) || s.id === 'S5' || s.id === 'STEP-INV-05');
            if (step) targetStepId = step.id;
        }
        const kwText = context.artifacts[targetStepId];
        if (!kwText || kwText.trim() === '') return null;

        const findings = [];
        const count = kwText.split(',').filter(k => k.trim().length > 0).length;

        if (count > 0 && count < 5) {
            findings.push({
                severity: 'WARNING',
                message: `Existem apenas ${count} palavra(s)-chave.`,
                suggestion: 'Recomendado: 5 a 7 palavras-chave para uma indexação adequada.',
                confidence: 0.98,
                stepId: targetStepId
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new KeywordsRule());
}
