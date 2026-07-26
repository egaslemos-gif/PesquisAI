/**
 * Review Engine
 * Responsável por executar a Validação Estrutural (Offline) dos artefactos.
 */
class ReviewEngine {
    constructor() {
        this.validators = {
            notEmpty: (content) => {
                if (!content || content.trim() === '') {
                    return false;
                }
                return true;
            },
            minLength: (content, value) => {
                if (!content) return false;
                return content.trim().length >= value;
            },
            hasQuestionMark: (content) => {
                if (!content) return false;
                return content.trim().endsWith('?');
            }
            // Expansível no futuro (ex: maxWords, noDuplicates, etc)
        };
    }

    /**
     * Analisa o conteúdo de um artefacto contra as regras estruturais de uma etapa.
     * @param {string} content O texto do artefacto
     * @param {object} stepConfig O objeto da etapa (que contém validation)
     * @returns {object} Resultado { valid: boolean, errors: array }
     */
    evaluateStructural(content, stepConfig) {
        const result = {
            valid: true,
            errors: []
        };

        if (!stepConfig || !stepConfig.validation) {
            return result; // Sem validações, passa.
        }

        const structuralConfig = stepConfig.validation.find(v => v.level === 'structural');
        
        if (!structuralConfig || !structuralConfig.checks) {
            return result;
        }

        structuralConfig.checks.forEach(check => {
            const validatorFn = this.validators[check.type];
            if (validatorFn) {
                const passed = validatorFn(content, check.value);
                if (!passed) {
                    result.valid = false;
                    result.errors.push(check.message);
                }
            }
        });

        return result;
    }

    /**
     * Extrai a configuração metodológica (PT-V) se existir para a etapa.
     */
    getMethodologicalConfig(stepConfig) {
        if (!stepConfig || !stepConfig.validation) return null;
        return stepConfig.validation.find(v => v.level === 'methodological') || null;
    }
}

const reviewEngine = new ReviewEngine();
window.rgReviewEngine = reviewEngine;
