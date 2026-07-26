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
            
            if (tema.length > 80) tema = tema.substring(0, 80) + '...';

            if (area || tema) {
                themeData = `
                <div style="display: flex; flex-direction: column; gap: 4px; margin-left: auto; border-left: 2px solid var(--color-gray-200); padding-left: 1rem; max-width: 50%;">
                    ${area ? `<div style="font-size: 0.7rem; color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Área: ${area}</div>` : ''}
                    ${tema ? `<div style="font-size: 0.9rem; color: var(--color-gray-800); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${tema.replace(/"/g, '&quot;')}">${tema}</div>` : ''}
                </div>`;
            }
        }

        // The layout requested: Ultra compact ribbon
        return `
            <div class="protocol-overview-ribbon" style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1.5rem; background: var(--color-white); border-bottom: 1px solid var(--color-gray-200); margin-bottom: 1.5rem; width: 100%;">
                <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div style="display: flex; align-items: baseline; gap: 0.75rem;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-primary-600); background: var(--color-primary-50); padding: 0.2rem 0.5rem; border-radius: 4px;">${protocolData.id}</span>
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); margin: 0;">${protocolData.name}</h2>
                    </div>
                    ${themeData}
                </div>
                <hr style="border: 0; border-top: 1px solid var(--color-gray-200); margin: 0.5rem 0;" />
                <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem; font-size: 0.85rem; color: var(--color-gray-600);">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 600; color: var(--color-gray-900);">Etapa ${currentStepNum}/${totalSteps}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-weight: 600; color: var(--color-primary-600);">${progressPercent}%</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span>⏱️ ${protocolData.estimatedTime || 'N/A'}</span>
                    </div>
                    
                    <div style="flex: 1;"></div>
                    
                    <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.8rem;">
                        ${knowledgeCount > 0 ? `<span title="Conhecimento" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.bookOpen : '📘'} ${knowledgeCount}</span>` : ''}
                        ${promptCount > 0 ? `<span title="Prompts" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.brain : '🤖'} ${promptCount}</span>` : ''}
                        ${checklistCount > 0 ? `<span title="Checklists" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.clipboardCheck : '☑'} ${checklistCount}</span>` : ''}
                        ${reviewCount > 0 ? `<span title="Revisão" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.scale : '⚖️'} ${reviewCount}</span>` : ''}
                        ${examplesCount > 0 ? `<span title="Exemplos" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.lightbulb : '💡'} ${examplesCount}</span>` : ''}
                        ${toolsCount > 0 ? `<span title="Ferramentas" style="display: flex; align-items: center; gap: 4px;">${window.SVGIcons ? window.SVGIcons.wrench : '🛠️'} ${toolsCount}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

window.ProtocolOverview = new ProtocolOverview();
