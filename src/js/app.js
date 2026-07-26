/**
 * App.js: Ponto de entrada da aplicação.
 * Responsável por orquestrar a inicialização de todos os módulos.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] Inicializando ResearchAI Guide...');

    // 1. Inicializar Serviços Transversais
    if (window.rgToast) window.rgToast.init();
    if (window.rgTemplateEngine) window.rgTemplateEngine.init();
    if (window.rgValidation) window.rgValidation.init();
    if (window.rgMethodology) window.rgMethodology.init();

    // 2. Inicializar Eventos da UI
    if (window.rgEvents) window.rgEvents.init();
    
    // 3. Inicializar Views
    if (window.rgAppShell) window.rgAppShell.init();
    if (window.rgProgressView) window.rgProgressView.init();
    if (window.rgStepView) window.rgStepView.init();
    if (window.rgCommandPalette) window.rgCommandPalette.init();

    // 4. Carregar Estado
    if (window.rgResearchIdentity) {
        window.rgResearchIdentity.init();
    }
    
    if (window.rgResearchEvents) {
        window.rgResearchEvents.init();
    }

    if (window.rgStorage && window.rgWorkspace) {
        let savedData = null;
        if (window.rgResearchIdentity) {
            const activeId = window.rgResearchIdentity.getData().activeWorkspaceId;
            if (activeId) {
                savedData = window.rgStorage.loadWorkspace(activeId);
            }
        }
        
        // If not found or no active ID, don't crash, init empty (it goes to landing page)
        window.rgWorkspace.init(savedData);
    }

    // 5. Inicializar o Engine do Workflow
    if (window.rgEngine) {
        window.rgEngine.init();
    }
});
