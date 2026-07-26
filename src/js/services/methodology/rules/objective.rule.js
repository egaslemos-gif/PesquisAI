class ObjectiveRule {
    constructor() {
        this.category = 'objectives';
    }

    evaluate(context) {
        if (!context.artifacts) return null;
        
        // Em WF-INV, S4 são os Objetivos
        const objText = context.artifacts['S4'];
        if (!objText || objText.trim() === '') return null;

        const findings = [];
        const lowerText = objText.toLowerCase();
        
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
                confidence: 0.92,
                stepId: 'S4'
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new ObjectiveRule());
}
