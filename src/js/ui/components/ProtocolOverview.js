class ProtocolOverview {
    constructor() {
        this.containerId = 'protocol-overview-container';
    }

    render(protocolData, currentStepId) {
        if (!protocolData) return '';

        const steps = protocolData.steps || [];
        const currentIndex = steps.findIndex(s => s.id === currentStepId);
        const currentStep = currentIndex !== -1 ? steps[currentIndex] : steps[0];
        
        const totalSteps = steps.length;
        const currentStepNum = currentIndex !== -1 ? currentIndex + 1 : 1;
        const progressPercent = totalSteps > 1 ? Math.round(((currentStepNum - 1) / (totalSteps - 1)) * 100) : 0;
        
        // Count resources based on SLO Manifest in workflows
        let knowledgeCount = 0;
        let promptCount = 0;
        let checklistCount = 0;
        let reviewCount = 0;
        let examplesCount = 0;
        let toolsCount = 0;
        
        steps.forEach(step => {
            if (step.assets) {
                if (step.assets.knowledge) knowledgeCount++;
                if (step.assets.prompt) promptCount++;
                if (step.assets.checklist) checklistCount++;
                if (step.assets.review) reviewCount++;
                if (step.assets.examples) examplesCount++;
                if (step.assets.tools) toolsCount++;
            }
        });

        let themeData = '';
        if (window.rgWorkspace) {
            const data = window.rgWorkspace.getData();
            let area = data.area || '';
            let tema = window.rgWorkspace.getArtifactByVariable('TEMA') || data.title || '';
            
            if (area || tema) {
                themeData = `
                <div class="theme-data-container" style="display: flex; align-items: center; gap: 2rem; border-left: 2px solid var(--color-gray-200); padding-left: 1rem; flex-grow: 1; min-width: 0;">
                    ${area ? `<div style="flex-shrink: 0;"><div style="font-size: 0.7rem; color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Área:</div><div style="font-size: 0.85rem; color: var(--color-gray-800); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px;" title="${area}">${area}</div></div>` : ''}
                    ${tema ? `<div style="flex-grow: 1; min-width: 0;"><div style="font-size: 0.7rem; color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Projeto:</div><div style="font-size: 0.9rem; color: var(--color-gray-800); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;" title="${tema.replace(/"/g, '&quot;')}">${tema}</div></div>` : ''}
                </div>`;
            }
        }

        // The layout requested: Ultra compact ribbon
        return `
            <div class="protocol-overview-ribbon" style="display: flex; flex-direction: column; gap: 0.25rem; padding: 1rem 1.5rem; background: var(--color-white); border-bottom: 1px solid var(--color-gray-200); margin-bottom: 1rem; width: 100%;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: nowrap; gap: 1rem; width: 100%;">
                    <div style="display: flex; flex-direction: column; gap: 0.15rem; flex-shrink: 0;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-gray-600); background: var(--color-gray-100); padding: 0.1rem 0.3rem; border-radius: 4px; text-transform: uppercase;">Perfil: ${protocolData.name || 'Investigador'}</span>
                        </div>
                        <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                            <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-primary-600); background: var(--color-primary-50); padding: 0.15rem 0.4rem; border-radius: 4px;">Protocolo</span>
                            <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--color-gray-900); margin: 0; white-space: nowrap;">${protocolData.title || protocolData.name}</h2>
                        </div>
                    </div>
                    ${themeData}
                </div>
                <hr style="border: 0; border-top: 1px solid var(--color-gray-200); margin: 0.25rem 0;" />
                <div style="display: flex; flex-wrap: nowrap; align-items: center; gap: 1rem; font-size: 0.8rem; color: var(--color-gray-600);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 600; color: var(--color-gray-900);">Etapa ${currentStepNum}/${totalSteps}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 600; color: var(--color-primary-600);">${progressPercent}%</span>
                    </div>
                    
                    <div style="flex: 1;"></div>
                    
                    <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;">
                        ${knowledgeCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Conhecimento: Boas práticas, conceitos e exemplos">
                            ${window.SVGIcons?.bookOpen || '📘'}
                            <div class="tooltip-content"><span class="tooltip-title">Conhecimento</span><span class="tooltip-desc">Boas práticas, conceitos e exemplos</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${knowledgeCount}</span>` : ''}
                        
                        ${promptCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Prompt IA: Prompt recomendado para esta etapa">
                            ${window.SVGIcons?.brain || '🤖'}
                            <div class="tooltip-content"><span class="tooltip-title">Prompt IA</span><span class="tooltip-desc">Prompt recomendado para esta etapa</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${promptCount}</span>` : ''}
                        
                        ${checklistCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Checklist: Critérios que devem ser cumpridos">
                            ${window.SVGIcons?.clipboardCheck || '☑'}
                            <div class="tooltip-content"><span class="tooltip-title">Checklist</span><span class="tooltip-desc">Critérios que devem ser cumpridos</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${checklistCount}</span>` : ''}
                        
                        ${reviewCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Revisão: Avaliação metodológica da etapa">
                            ${window.SVGIcons?.scale || '⚖️'}
                            <div class="tooltip-content"><span class="tooltip-title">Revisão</span><span class="tooltip-desc">Avaliação metodológica da etapa</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${reviewCount}</span>` : ''}
                        
                        ${examplesCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Exemplos: Exemplos inspiradores para a etapa">
                            ${window.SVGIcons?.lightbulb || '💡'}
                            <div class="tooltip-content"><span class="tooltip-title">Exemplos</span><span class="tooltip-desc">Exemplos inspiradores para a etapa</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${examplesCount}</span>` : ''}
                        
                        ${toolsCount > 0 ? `
                        <div class="semantic-icon" data-state="available" role="button" tabindex="0" aria-label="Ferramentas: Ferramentas recomendadas">
                            ${window.SVGIcons?.wrench || '🛠️'}
                            <div class="tooltip-content"><span class="tooltip-title">Ferramentas</span><span class="tooltip-desc">Ferramentas recomendadas</span></div>
                        </div> <span style="font-weight: 600; color: var(--color-gray-700); margin-right: 0.5rem;">${toolsCount}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

window.ProtocolOverview = new ProtocolOverview();
