class ThemeRule {
    constructor() {
        this.category = 'theme';
    }

    evaluate(context) {
        const title = context.research.title;
        if (!title || title.trim() === '' || title === 'Projeto') return null;

        const findings = [];
        const words = title.trim().split(/\s+/);
        
        // Regra 1: Tema demasiado curto/amplo
        if (words.length < 5) {
            findings.push({
                severity: 'TIP',
                message: 'O tema parece demasiado amplo.',
                suggestion: 'Delimite o contexto geográfico, institucional ou temporal.',
                confidence: 0.85,
                stepId: 'S1'
            });
        }

        // Regra 2: Sugestão automática de área científica
        const lowerTitle = title.toLowerCase();
        let suggestedArea = null;
        let areaConfidence = 0;

        if (lowerTitle.includes('educação') || lowerTitle.includes('ensino') || lowerTitle.includes('escola')) {
            suggestedArea = 'Ciências da Educação';
            areaConfidence = 0.80;
            if (lowerTitle.includes('digital') || lowerTitle.includes('tecnologia') || lowerTitle.includes('ia ') || lowerTitle.includes('software')) {
                suggestedArea = 'Informática Educacional';
                areaConfidence = 0.95;
            }
        } else if (lowerTitle.includes('doença') || lowerTitle.includes('paciente') || lowerTitle.includes('saúde') || lowerTitle.includes('clínica')) {
            suggestedArea = 'Saúde';
            areaConfidence = 0.90;
        } else if (lowerTitle.includes('construção') || lowerTitle.includes('materiais') || lowerTitle.includes('ponte') || lowerTitle.includes('engenharia')) {
            suggestedArea = 'Engenharia';
            areaConfidence = 0.85;
        }

        if (suggestedArea) {
            findings.push({
                severity: 'INFO',
                message: `Área sugerida: ${suggestedArea}`,
                suggestion: suggestedArea,
                confidence: areaConfidence,
                stepId: 'S1',
                type: 'AUTO_SUGGEST_AREA'
            });
        }

        return findings;
    }
}

if (window.rgMethodology) {
    window.rgMethodology.registerRule(new ThemeRule());
}
