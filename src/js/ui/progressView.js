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
        if (!container || !window.WORKFLOWS || !window.WORKFLOWS['WF-INV']) return;

        const steps = window.WORKFLOWS['WF-INV'].steps;
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
            if (step.assets) {
                if (step.assets.knowledge) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Conhecimento">${window.SVGIcons?.bookOpen || '📘'}</span>`;
                if (step.assets.prompt) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Prompt">${window.SVGIcons?.brain || '🤖'}</span>`;
                if (step.assets.checklist) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Checklist">${window.SVGIcons?.clipboardCheck || '☑'}</span>`;
                if (step.assets.review) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Revisão">${window.SVGIcons?.scale || '⚖️'}</span>`;
                if (step.assets.examples) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Exemplos">${window.SVGIcons?.lightbulb || '💡'}</span>`;
                if (step.assets.tools) assetsIcons += `<span style="display:inline-flex; width:14px; height:14px; margin:0 1px;" title="Ferramentas">${window.SVGIcons?.wrench || '🛠️'}</span>`;
            }
            if (assetsIcons) {
                assetsIcons = `<div class="semantic-step-assets" style="display: flex; gap: 2px; align-items: center; color: var(--color-gray-500);">${assetsIcons}</div>`;
            }

            const isClickable = index <= currentIndex || status === 'COMPLETED';
            
            // Usamos o nome completo se for curto, senão partimos
            let shortName = step.name;
            if (shortName.length > 12) {
                const words = step.name.split(' ');
                shortName = words[0];
                if (shortName.length < 5 && words.length > 1) {
                    shortName += ' ' + words[1];
                }
            }

            stepsHtml += `
                <div class="semantic-step-item ${stateClass}" 
                     title="${step.name}"
                     ${isClickable ? `onclick="window.rgEngine.goToStep('${step.id}')" style="cursor:pointer; flex: 1; min-width: 120px; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0.5rem; border-radius: var(--radius-md); transition: background 0.2s;"` : `style="flex: 1; min-width: 120px; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0.5rem; opacity: 0.6;"`}>
                    <div class="semantic-step-status" style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; ${stateClass === 'active' ? 'background: var(--color-primary-600); color: white;' : stateClass === 'completed' ? 'background: var(--color-success-light); color: var(--color-success);' : 'background: var(--color-gray-100); color: var(--color-gray-500);'}">${statusSymbol}</div>
                    <div class="semantic-step-name" style="font-size: 0.8rem; font-weight: ${stateClass === 'active' ? '700' : '500'}; color: ${stateClass === 'active' ? 'var(--color-primary-700)' : 'var(--color-gray-700)'}; margin-bottom: 0.25rem;">${shortName}</div>
                    ${assetsIcons}
                </div>
            `;
        });

        // O ProtocolOverview já mostra o progresso percentual e resultado esperado,
        // pelo que esta secção fica dedicada apenas à timeline semântica.
        container.innerHTML = `
            <div class="semantic-timeline-container" style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 1rem; width: 100%; border-bottom: 1px solid var(--color-gray-200); margin-bottom: 2rem;">
                ${stepsHtml}
            </div>
        `;
    }
}

const progressView = new ProgressView();
window.rgProgressView = progressView;
