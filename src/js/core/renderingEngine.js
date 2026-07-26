/**
 * RenderingEngine
 * Orquestra a construção do contexto e o ciclo de vida dos painéis, 
 * devolvendo a pipeline completa pronta para ser desenhada pelo StepView.
 */
class RenderingEngine {
    
    /**
     * Cria a pipeline de renderização para uma etapa específica.
     * @param {string} stepId ID da etapa a renderizar
     * @returns {Object} O contexto e os painéis ativos
     */
    createPipeline(stepId) {
        if (!window.rgEngine || !window.rgPanelRegistry || !window.rgAssetResolver) {
            console.error('[RenderingEngine] Dependências não inicializadas');
            return { context: null, activePanels: [] };
        }

        const step = window.rgEngine.getStepById(stepId);
        if (!step) return { context: null, activePanels: [] };

        const protocol = window.rgEngine.getWorkflow();
        const workspaceData = window.rgWorkspace ? window.rgWorkspace.getData() : null;
        
        // 1. Resolver Ativos
        const resolvedAssets = window.rgAssetResolver.resolve(step);

        // 2. Construir o Rendering Context
        const context = {
            protocolId: protocol ? protocol.id : null,
            stageId: step.id,
            manifest: step,
            resolvedAssets: resolvedAssets,
            userProgress: workspaceData ? workspaceData.progress : null,
            preferences: workspaceData ? workspaceData.preferences : {},
            rar: window.rgMethodology ? window.rgMethodology.lastReport : null
        };

        // 3. Obter todos os painéis e validar condições
        let activePanels = window.rgPanelRegistry.getPanelsForContext(context);

        // 4. Executar lifecycle: validate
        activePanels = activePanels.filter(panel => {
            if (typeof panel.validate === 'function') {
                return panel.validate(context);
            }
            return true;
        });

        // Retorna a pipeline para a vista invocar render() e attachListeners()
        return { context, activePanels };
    }
}

// Singleton global
window.rgRenderingEngine = new RenderingEngine();
