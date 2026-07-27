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

    // Initialize AI Resource Hub
    if (window.AIResourceHub) {
        window.rgAIResourceHub = new window.AIResourceHub();
        window.rgAIResourceHub.init();
    }

    // Initialize Research Competency Hub
    if (window.ResearchCompetencyHub) {
        window.researchCompetencyHubInstance = new window.ResearchCompetencyHub();
        window.researchCompetencyHubInstance.init();
    }

    // 5. Load Modules and Initialize Engine
    if (window.rgModuleLoader) {
        window.rgModuleLoader.initAll().then(() => {
            if (window.rgEngine) {
                window.rgEngine.init();
            }
        });
    } else {
        if (window.rgEngine) {
            window.rgEngine.init();
        }
    }

    // Mobile Menu Toggle Logic
    const btnMobileMenu = document.getElementById('btn-mobile-menu');
    const navDropdown = document.getElementById('nav-dropdown');
    if (btnMobileMenu && navDropdown) {
        btnMobileMenu.addEventListener('click', (e) => {
            navDropdown.classList.toggle('active');
            e.stopPropagation();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navDropdown.classList.contains('active') && !navDropdown.contains(e.target) && e.target !== btnMobileMenu) {
                navDropdown.classList.remove('active');
            }
        });
        
        // Close menu when a link inside is clicked
        navDropdown.addEventListener('click', (e) => {
            if (e.target.closest('button')) {
                navDropdown.classList.remove('active');
            }
        });
    }
});
