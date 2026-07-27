/**
 * ProgressView: Renderiza a Semantic Timeline.
 */

class ProgressView {
    init() {
        if (window.rgEventBus) {
            window.rgEventBus.on('step:changed', (stepId) => this.render(stepId));
        }
    }

    render(currentStepId) {
        const container = document.getElementById('progress-container');
        const workflowId = window.rgWorkspace && window.rgWorkspace.getData() ? window.rgWorkspace.getData().protocolId : null;
        if (!container || !window.WORKFLOWS || !workflowId || !window.WORKFLOWS[workflowId]) return;

        const steps = window.WORKFLOWS[workflowId].steps;
        const currentIndex = steps.findIndex(s => s.id === currentStepId);
        if (currentIndex === -1) return;
        
        let stepsHtml = '';
        steps.forEach((step, index) => {
            const status = window.rgWorkspace ? window.rgWorkspace.getStepStatus(step.id) : 'NOT_STARTED';
            let stateClass = '';
            let statusSymbol = `${index + 1}`;

            if (index === currentIndex) {
                stateClass = 'active';
            } else if (status === 'COMPLETED') {
                stateClass = 'completed';
                statusSymbol = '✓';
            }

            // Ativos combinados (ex: 📘🤖☑)
            let assetsIcons = '';
            
            // Estado semântico do ícone dependendo da etapa global
            let iconState = 'available';
            if (index === currentIndex) iconState = 'active';
            else if (status === 'COMPLETED') iconState = 'completed';
            else if (index > currentIndex) iconState = 'unavailable';

            if (step.assets) {
                if (step.assets.knowledge) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Conhecimento: Boas práticas, conceitos e exemplos">
                        ${window.SVGIcons?.bookOpen || '📘'}
                        <div class="tooltip-content"><span class="tooltip-title">Conhecimento</span><span class="tooltip-desc">Boas práticas, conceitos e exemplos</span></div>
                    </div>`;
                if (step.assets.prompt) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Prompt IA: Prompt recomendado para esta etapa">
                        ${window.SVGIcons?.brain || '🤖'}
                        <div class="tooltip-content"><span class="tooltip-title">Prompt IA</span><span class="tooltip-desc">Prompt recomendado para esta etapa</span></div>
                    </div>`;
                if (step.assets.checklist) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Checklist: Critérios que devem ser cumpridos">
                        ${window.SVGIcons?.clipboardCheck || '☑'}
                        <div class="tooltip-content"><span class="tooltip-title">Checklist</span><span class="tooltip-desc">Critérios que devem ser cumpridos</span></div>
                    </div>`;
                if (step.assets.review) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Revisão: Avaliação metodológica da etapa">
                        ${window.SVGIcons?.scale || '⚖️'}
                        <div class="tooltip-content"><span class="tooltip-title">Revisão</span><span class="tooltip-desc">Avaliação metodológica da etapa</span></div>
                    </div>`;
                if (step.assets.examples) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Exemplos: Exemplos inspiradores para a etapa">
                        ${window.SVGIcons?.lightbulb || '💡'}
                        <div class="tooltip-content"><span class="tooltip-title">Exemplos</span><span class="tooltip-desc">Exemplos inspiradores para a etapa</span></div>
                    </div>`;
                if (step.assets.tools) assetsIcons += `
                    <div class="semantic-icon" data-state="${iconState}" role="button" tabindex="0" aria-label="Ferramentas: Ferramentas recomendadas">
                        ${window.SVGIcons?.wrench || '🛠️'}
                        <div class="tooltip-content"><span class="tooltip-title">Ferramentas</span><span class="tooltip-desc">Ferramentas recomendadas</span></div>
                    </div>`;
            }
            if (assetsIcons) {
                assetsIcons = `<div class="semantic-step-assets" style="display: flex; gap: 4px; align-items: center; justify-content: center; margin-top: 4px;">${assetsIcons}</div>`;
            }

            const isClickable = index <= currentIndex || status === 'COMPLETED';
            
            // Usamos o nome completo se for curto, senão partimos
            let shortName = step.name;
            if (shortName.length > 15) {
                const words = step.name.split(' ');
                shortName = words[0];
                if (shortName.length < 5 && words.length > 1) {
                    shortName += ' ' + words[1];
                }
            }

            const circleStyles = stateClass === 'active' 
                ? 'background: var(--color-primary-600); color: white; border: 2px solid var(--color-primary-600);' 
                : stateClass === 'completed' 
                    ? 'background: #e0f6f4; color: #1bb0a1; border: 2px solid #1bb0a1;' 
                    : 'background: white; color: var(--color-gray-400); border: 2px solid var(--color-gray-300);';
                    
            const connectorColor = status === 'COMPLETED' ? '#1bb0a1' : 'var(--color-gray-200)';

            stepsHtml += `
                <div class="semantic-step-item ${stateClass}" 
                     title="${step.name}"
                     ${isClickable ? `onclick="window.rgEngine.goToStep('${step.id}')" style="cursor:pointer; flex: 1; min-width: 90px; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; padding: 0.5rem 0; transition: opacity 0.2s;"` : `style="flex: 1; min-width: 90px; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; padding: 0.5rem 0; opacity: 0.6;"`}>
                    
                    ${index < steps.length - 1 ? `<div class="step-connector" style="position: absolute; top: 23px; left: 50%; width: 100%; height: 2px; background: ${connectorColor}; z-index: 0;"></div>` : ''}

                    <div class="semantic-step-status" style="position: relative; z-index: 1; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; margin-bottom: 0.5rem; ${circleStyles}">
                        ${statusSymbol}
                    </div>
                    <div class="semantic-step-name" style="font-size: 0.8rem; font-weight: ${stateClass === 'active' ? '700' : '500'}; color: ${stateClass === 'active' ? 'var(--color-primary-700)' : 'var(--color-gray-700)'}; margin-bottom: 0.25rem;">
                        ${shortName}
                    </div>
                    ${assetsIcons}
                </div>
            `;
        });

        // O ProtocolOverview já mostra o progresso percentual e resultado esperado,
        // pelo que esta secção fica dedicada apenas à timeline semântica.
        container.innerHTML = `
            <div class="semantic-timeline-container" style="display: flex; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 1rem; width: 100%; border-bottom: 1px solid var(--color-gray-200); margin-bottom: 2rem;">
                ${stepsHtml}
            </div>
        `;
    }
}

const progressView = new ProgressView();
window.rgProgressView = progressView;
