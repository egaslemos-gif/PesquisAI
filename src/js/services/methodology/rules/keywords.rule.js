class KeywordsRule {
    constructor() {
        this.category = 'keywords';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        // Em WF-INV, S5 são as Palavras-chave
        const kwText = context.artifacts['S5'];
        if (!kwText || kwText.trim() === '') return null;

        const findings = [];
        const count = kwText.split(',').filter(k => k.trim().length > 0).length;

        if (count > 0 && count < 5) {
            findings.push({
                severity: 'WARNING',
                message: `Existem apenas ${count} palavra(s)-chave.`,
                suggestion: 'Recomendado: 5 a 7 palavras-chave para uma indexação adequada.',
                confidence: 0.98,
                stepId: 'S5'
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new KeywordsRule());
}
