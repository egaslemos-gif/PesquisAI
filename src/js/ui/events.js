/**
 * Events: Handlers que interligam botões da UI à Camada Core.
 * Ouve cliques em botões e chama os módulos adequados.
 */

class EventsController {
    
    // Handler para guardar o rascunho do artefacto
    handleSave() {
        const textarea = document.getElementById('artifact-input');
        if (!textarea || !window.rgWorkspace || !window.rgEngine) return;

        const content = textarea.value.trim();
        const currentStep = window.rgEngine.getCurrentStep();
        
        if (currentStep) {
            window.rgWorkspace.saveArtifact(currentStep.id, content);
        }
    }

    // Handler para retroceder de etapa
    handleBack() {
        this.handleSave();
        
        if (window.rgEngine) {
            window.rgEngine.previousStep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Handler para avançar para a próxima etapa
    handleAdvance() {
        // Primeiro guarda o conteúdo atual
        this.handleSave();

        // Verificar as checkboxes
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
        let allChecked = true;
        checkboxes.forEach(cb => {
            if (!cb.checked) allChecked = false;
        });

        if (!allChecked && window.rgEventBus) {
            window.rgEventBus.emit('toast:show', {
                message: 'Por favor, confirme todos os pontos da checklist antes de avançar.',
                type: 'warning'
            });
            return;
        }

        // Tenta avançar via Engine, interceptando com o Review Modal se necessário
        if (window.rgEngine && window.rgReviewModal) {
            const currentStep = window.rgEngine.getCurrentStep();
            
            // Passa um callback para avançar realmente após validação
            window.rgReviewModal.requestReview(currentStep.id, currentStep, () => {
                window.rgEngine.advance();
                // Depois de avançar, scroll top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } else if (window.rgEngine) {
            // Fallback se o modal não existir
            window.rgEngine.advance();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // O EventBus notificará o fim do workflow
    init() {
        if (window.rgEventBus) {
            window.rgEventBus.on('workflow:completed', () => {
                const container = document.getElementById('step-container');
                if (container) {
                    container.innerHTML = `
                        <div class="card text-center" style="padding: var(--space-12) var(--space-6);">
                            <div style="font-size: 4rem; margin-bottom: var(--space-4);">🎉</div>
                            <h2 style="font-size: var(--text-3xl); margin-bottom: var(--space-4);">Parabéns!</h2>
                            <p style="color: var(--color-gray-600); max-width: 500px; margin: 0 auto var(--space-6);">
                                Concluiu com sucesso o protocolo de Investigação. Todos os seus artefactos estão guardados no seu dispositivo.
                            </p>
                            <button class="btn btn-primary" onclick="if(window.rgAppShell) window.rgAppShell._showCreateProjectWizard()">Iniciar Novo Projeto</button>
                        </div>
                    `;
                }
            });
        }
    }
}

const eventsController = new EventsController();
window.rgEvents = eventsController;
