class ArtifactPanel {
    constructor() {
        this.id = 'artifact';
        this.category = 'output';
        this.title = 'Artefacto';
        this.icon = window.SVGIcons ? window.SVGIcons.fileText : '📝';
        this.priority = 80;
        this.supportsOffline = true;
    }

    discover() {}
    
    validate(context) {
        return !!context.manifest;
    }

    condition(context) {
        return true; // Sempre visível
    }

    render(context) {
        const step = context.manifest;
        const currentArtifactContent = window.rgWorkspace ? window.rgWorkspace.getArtifact(step.id) : '';
        let html = `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                        Resultado da Etapa
                    </h3>
                    <div class="status-line success" title="Gravar Rascunho">
                        Última gravação --:--
                    </div>
                </div>
        `;
        
        if (step.artifactCapture || step.artifactExpected) {
            const expected = step.artifactCapture?.expected || step.artifactExpected;
            const format = step.artifactCapture?.format || '';
            html += `
                <div style="background: var(--color-primary-50); border: 1px solid var(--color-primary-200); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem; font-size: 0.9rem;">
                    <strong style="color: var(--color-primary-800); display: block; margin-bottom: 0.25rem;">O que registar nesta etapa:</strong> 
                    <span style="color: var(--color-primary-900);">${expected}</span>
                    ${format ? `<div style="color: var(--color-primary-700); font-style: italic; margin-top: 0.25rem; font-size: 0.85rem;">${format}</div>` : ''}
                </div>
            `;
        }

        html += `
                <div style="position: relative;">
                    <textarea id="artifact-input" style="width: 100%; min-height: 40vh; padding: 1.5rem; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-family: inherit; font-size: 1rem; line-height: 1.6; color: var(--color-gray-900); resize: vertical; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); transition: border-color 0.2s;" placeholder="Redija o seu conteúdo final aqui...">${currentArtifactContent}</textarea>
                </div>
        `;

        if (context.rar && context.rar.findings) {
            const stepFindings = context.rar.findings.filter(f => f.stepId === step.id);
            if (stepFindings.length > 0) {
                html += `<div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--color-gray-600); text-transform: uppercase; letter-spacing: 0.5px;">💡 Assistente Metodológico</h4>
                `;
                
                stepFindings.forEach(f => {
                    let bg = 'var(--color-primary-50)';
                    let border = 'var(--color-primary-200)';
                    let color = 'var(--color-primary-800)';
                    let icon = '💡';
                    
                    if (f.severity === 'WARNING') {
                        bg = 'var(--color-warning-light)';
                        border = 'var(--color-warning)';
                        color = 'var(--color-warning-dark)';
                        icon = '⚠️';
                    } else if (f.severity === 'ERROR') {
                        bg = 'var(--color-error-light)';
                        border = 'var(--color-error)';
                        color = 'var(--color-error-dark)';
                        icon = '🚨';
                    }
                    
                    html += `
                        <div style="background: ${bg}; border-left: 3px solid ${border}; padding: 0.75rem 1rem; border-radius: 0 4px 4px 0; font-size: 0.9rem;">
                            <div style="font-weight: 600; color: ${color}; margin-bottom: 0.25rem;">${icon} ${f.message}</div>
                            <div style="color: var(--color-gray-700);">${f.suggestion} <span style="opacity:0.6; font-size:0.85em; margin-left:8px;">(Confiança: ${(f.confidence * 100).toFixed(0)}%)</span></div>
                        </div>
                    `;
                });
                html += `</div>`;
            }
        }

        html += `
            </div>
        `;
        return html;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new ArtifactPanel());
}
