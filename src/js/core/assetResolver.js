/**
 * AssetResolver
 * Resolve os ativos do SLO Manifest e devolve-os prontos a ser consumidos pelos painéis.
 */
class AssetResolver {
    
    /**
     * Resolve os ativos definidos no manifesto de uma etapa.
     * Atualmente converte booleanos em objetos de ativos; no futuro suportará arrays de IDs e lookups na base de dados.
     * @param {Object} step O manifesto do passo (Workflow Stage)
     * @returns {Object} Ativos resolvidos
     */
    resolve(step) {
        if (!step || !step.assets) return {};

        const resolved = {};

        // Resolver Knowledge
        if (step.assets.knowledge) {
            resolved.knowledge = {
                bestPractices: step.bestPractices || null,
                commonErrors: step.commonErrors || null,
                learningObjectives: step.learningObjectives || null
            };
        }

        // Resolver Prompt
        if (step.assets.prompt && step.prompts) {
            // No futuro: lookups complexos
            resolved.prompts = step.prompts;
        }

        // Resolver Checklist
        if (step.assets.checklist && step.checklist) {
            resolved.checklist = step.checklist;
        }

        // Resolver Review
        if (step.assets.review) {
            resolved.review = true; // Por agora, apenas indica presença
        }

        // Resolver Examples
        if (step.assets.examples) {
            resolved.examples = true; // Por agora, indicador genérico
        }

        // Resolver Tools
        if (step.assets.tools && step.tools && window.TOOLS) {
            resolved.tools = step.tools.map(toolId => window.TOOLS[toolId]).filter(t => t);
        }

        return resolved;
    }
}

// Singleton global
window.rgAssetResolver = new AssetResolver();
