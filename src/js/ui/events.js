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
                    let rarScore = 0;
                    let context = null;
                    if (window.rgWorkspace && window.rgMethodology) {
                        context = window.rgWorkspace.buildResearchContext();
                        const rar = window.rgMethodology.analyze(context);
                        if (rar) {
                            rarScore = rar.score;
                        }
                    }

                    const title = context?.research?.title || 'Projeto sem título';
                    const area = context?.research?.area || 'Sem área';
                    const numSteps = context?.progress?.completedSteps || 0;
                    const dateStr = new Date().toLocaleDateString('pt-PT');

                    container.innerHTML = `
                        <div class="completion-workspace" style="padding: 2rem; background: white; border-radius: 8px; border: 1px solid var(--color-gray-200); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                            <div style="text-align: center; margin-bottom: 2rem;">
                                <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
                                <h2 style="font-size: 1.75rem; font-weight: 700; color: var(--color-gray-900); margin-bottom: 0.5rem;">Investigação concluída</h2>
                                <p style="color: var(--color-gray-600);">O protocolo foi concluído com sucesso. Todos os artefactos foram guardados.</p>
                            </div>

                            <div style="border: 1px solid var(--color-gray-200); border-radius: 8px; overflow: hidden; margin-bottom: 2rem;">
                                <div style="background: var(--color-gray-50); padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-gray-200); font-weight: 600;">Resumo</div>
                                <div style="padding: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                                    <div>
                                        <div style="font-size: 0.85rem; color: var(--color-gray-500); margin-bottom: 0.25rem;">Título</div>
                                        <div style="font-weight: 500;">${title}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.85rem; color: var(--color-gray-500); margin-bottom: 0.25rem;">Área científica</div>
                                        <div style="font-weight: 500;">${area}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.85rem; color: var(--color-gray-500); margin-bottom: 0.25rem;">Data</div>
                                        <div style="font-weight: 500;">${dateStr}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.85rem; color: var(--color-gray-500); margin-bottom: 0.25rem;">Etapas Concluídas</div>
                                        <div style="font-weight: 500;">${numSteps}</div>
                                    </div>
                                    <div>
                                        <div style="font-size: 0.85rem; color: var(--color-gray-500); margin-bottom: 0.25rem;">Pontuação Metodológica</div>
                                        <div style="font-weight: 700; color: ${rarScore >= 80 ? 'var(--color-success)' : 'var(--color-warning)'};">${rarScore}%</div>
                                    </div>
                                </div>
                            </div>

                            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                                <button class="btn btn-primary" onclick="if(window.rgExportService) window.rgExportService.exportResearch({format: 'docx'})">
                                    <span style="margin-right: 0.5rem;">📄</span> Exportar Word
                                </button>
                                <button class="btn btn-secondary" onclick="if(window.rgDocumentService && window.rgWorkspace) window.rgDocumentService.exportBackup(window.rgWorkspace.getData().id)">
                                    <span style="margin-right: 0.5rem;">💾</span> Guardar Backup
                                </button>
                                <button class="btn btn-secondary" onclick="if(window.rgEventBus) window.rgEventBus.emit('navigation:home')">
                                    <span style="margin-right: 0.5rem;">🏠</span> Voltar ao Dashboard
                                </button>
                            </div>

                            <div id="export-status-container" style="display: none; margin-top: 2rem; padding: 1.5rem; background: var(--color-primary-50); border-radius: 8px; border: 1px solid var(--color-primary-100);">
                                <h4 style="color: var(--color-primary-700); margin-top: 0; margin-bottom: 1rem;">A preparar o documento...</h4>
                                <ul id="export-status-list" style="list-style: none; padding: 0; margin: 0; color: var(--color-gray-700); font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem;">
                                </ul>
                            </div>
                        </div>
                    `;
                }
            });
        }
    }
}

const eventsController = new EventsController();
window.rgEvents = eventsController;
