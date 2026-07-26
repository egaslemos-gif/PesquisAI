/**
 * Validation Engine: Validações estruturais e metodológicas antes de avançar de etapa.
 */

class ValidationEngine {
    constructor() {
        this.workspace = null;
    }

    init() {
        this.workspace = window.rgWorkspace;
    }

    /**
     * Valida se uma etapa pode ser concluída
     * @param {string} stepId 
     * @returns {Object} { isValid: boolean, message: string }
     */
    validateStep(stepId) {
        if (!this.workspace) this.init();
        if (!this.workspace) return { isValid: false, message: 'Workspace não inicializado' };

        const content = this.workspace.getArtifact(stepId);
        
        // 1. Validação Estrutural: Tem texto?
        if (!content || content.trim() === '') {
            return { isValid: false, message: 'Precisa de gerar e guardar o artefacto antes de avançar.' };
        }

        if (content.length < 20) {
            return { isValid: false, message: 'O conteúdo do artefacto parece demasiado curto.' };
        }

        // Validação das Checklists (são guardadas indiretamente se não implementadas, 
        // no MVP validamos apenas se o artefacto tem conteúdo, 
        // mas idealmente leríamos o estado dos checkboxes do DOM)
        // Para garantir desacoplamento, a UI deve não permitir o clique no botão "Avançar" 
        // se a checklist não estiver completa, ou o Validation Engine valida via evento.
        // Como o Engine consulta o ValidationEngine, vamos confiar na UI para bloquear checkboxes,
        // ou validar aqui se passarmos o estado da checklist.
        // Por simplicidade no MVP, a UI passará o estado ou validará a checklist internamente.

        // 2. Validação Metodológica (TODO)
        // Exemplo futuro: testar se a Pergunta termina num ponto de interrogação.
        /*
        if (stepId === 'STEP-INV-02' && !content.includes('?')) {
            return { isValid: false, message: 'A pergunta de investigação deve terminar com "?"' };
        }
        */

        return { isValid: true };
    }
}

const validationEngine = new ValidationEngine();
window.rgValidation = validationEngine;
