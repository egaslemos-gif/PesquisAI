class ToolsPanel {
    constructor() {
        this.id = 'tools';
        this.category = 'resources';
        this.title = 'Ferramentas';
        this.icon = window.SVGIcons ? window.SVGIcons.wrench : '🛠️';
        this.priority = 70;
        this.supportsOffline = true;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.tools && context.resolvedAssets.tools.length > 0;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        const tools = context.resolvedAssets.tools;
        let generatedPromptText = '';

        // Tenta obter o texto do prompt recomendado se existir
        if (context.resolvedAssets.prompts && context.resolvedAssets.prompts.length > 0) {
            const promptId = context.resolvedAssets.prompts[0];
            let strategy = 'balanced';
            if (context.preferences && context.preferences.promptStrategy) {
                strategy = context.preferences.promptStrategy;
            } else if (window.rgResearchIdentity) {
                const totalProjects = Object.keys(window.rgResearchIdentity.getData().workspaces || {}).length;
                if (totalProjects <= 2) strategy = 'guided';
                else if (totalProjects <= 5) strategy = 'balanced';
                else strategy = 'direct';
            }
            if (window.rgTemplateEngine) {
                generatedPromptText = window.rgTemplateEngine.resolvePrompt(promptId, null, strategy);
            }
        }

        let html = `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%; max-width: 900px;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                    Ferramentas
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;">
        `;
        tools.forEach(tool => {
            let finalUrl = tool.url;
            
            // Auto-preencher o prompt nos URLs que suportam o parâmetro "q"
            if (generatedPromptText && tool.type.includes('LLM')) {
                finalUrl += `?q=${encodeURIComponent(generatedPromptText)}`;
            }

            html += `
                <div style="border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; background: var(--color-white); box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-weight: 700; color: var(--color-gray-900); font-size: 1.1rem;">${tool.name}</div>
                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-gray-500); margin-top: 0.1rem;">${tool.type}</div>
                        </div>
                        <button class="btn-open-tool" data-url="${finalUrl}" data-raw-url="${tool.url}" style="font-size: 0.8rem; color: var(--color-white); background: var(--color-primary-600); border: none; padding: 0.4rem 0.75rem; border-radius: 4px; cursor: pointer; font-weight: 600; white-space: nowrap; transition: background 0.2s;">Abrir ↗</button>
                    </div>
                    
                    <div style="font-size: 0.9rem; color: var(--color-gray-700); line-height: 1.4; border-left: 3px solid var(--color-primary-300); padding-left: 0.75rem;">
                        <strong>O que faz:</strong> ${tool.description}
                    </div>
                    
                    <details style="font-size: 0.85rem;">
                        <summary style="cursor: pointer; font-weight: 600; color: var(--color-primary-600); margin-top: 0.25rem; outline: none; user-select: none;">Ver detalhes e recomendações</summary>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">
                            ${tool.whenToUse ? `
                            <div style="background: var(--color-gray-50); padding: 0.75rem; border-radius: var(--radius-sm);">
                                <strong style="color: var(--color-gray-800); display: block; margin-bottom: 0.25rem;">Quando usar:</strong>
                                <span style="color: var(--color-gray-600);">${tool.whenToUse}</span>
                            </div>` : ''}
                            
                            ${tool.idealFor ? `
                            <div style="background: #f0fdf4; padding: 0.75rem; border-radius: var(--radius-sm);">
                                <strong style="color: #166534; display: block; margin-bottom: 0.25rem;">Boas práticas (Ideal para):</strong>
                                <div style="color: #15803d; line-height: 1.5;">
                                    ${tool.idealFor.map(item => `<div>${item}</div>`).join('')}
                                </div>
                            </div>` : ''}
                            
                            ${tool.limitations ? `
                            <div style="background: #fff4f2; padding: 0.75rem; border-radius: var(--radius-sm);">
                                <strong style="color: #b91c1c; display: block; margin-bottom: 0.25rem;">Limitações & Cuidados:</strong>
                                <div style="color: #991b1b; margin-bottom: 0.25rem;">${tool.limitations}</div>
                                ${tool.whenNotToUse ? `<div style="color: #991b1b;"><strong>Evitar:</strong> ${tool.whenNotToUse}</div>` : ''}
                            </div>` : ''}
                        </div>
                    </details>
                </div>
            `;
        });
        html += `</div></div>`;
        return html;
    }

    attachListeners(context) {
        const panel = document.getElementById(`slo-${this.id}`);
        if (!panel) return;

        let generatedPromptText = '';
        if (context.resolvedAssets.prompts && context.resolvedAssets.prompts.length > 0) {
            const promptId = context.resolvedAssets.prompts[0];
            let strategy = 'balanced';
            if (context.preferences && context.preferences.promptStrategy) {
                strategy = context.preferences.promptStrategy;
            } else if (window.rgResearchIdentity) {
                const totalProjects = Object.keys(window.rgResearchIdentity.getData().workspaces || {}).length;
                if (totalProjects <= 2) strategy = 'guided';
                else if (totalProjects <= 5) strategy = 'balanced';
                else strategy = 'direct';
            }
            if (window.rgTemplateEngine) {
                generatedPromptText = window.rgTemplateEngine.resolvePrompt(promptId, null, strategy);
            }
        }

        const buttons = panel.querySelectorAll('.btn-open-tool');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-url');
                const rawUrl = btn.getAttribute('data-raw-url');
                
                if (generatedPromptText && window.rgClipboard) {
                    window.rgClipboard.copyText(generatedPromptText);
                    window.open(url, '_blank');
                } else {
                    window.open(url, '_blank');
                }
            });
        });
    }

    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new ToolsPanel());
}
