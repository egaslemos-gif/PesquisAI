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
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
        `;
        tools.forEach(tool => {
            let finalUrl = tool.url;
            
            // Auto-preencher o prompt nos URLs que suportam o parâmetro "q"
            if (generatedPromptText && (tool.id === 'tool-chatgpt' || tool.id === 'tool-gemini' || tool.id === 'tool-claude')) {
                // ChatGPT suporta nativamente "?q=". Gemini e Claude podem requerer extensões, mas passamos na mesma para máxima compatibilidade.
                finalUrl += `?q=${encodeURIComponent(generatedPromptText)}`;
            }

            html += `
                <div style="border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: 1rem;">
                    <div style="font-weight: 600; color: var(--color-gray-900);">${tool.name}</div>
                    <div style="font-size: 0.8rem; color: var(--color-gray-500); margin-bottom: 0.5rem;">${tool.type}</div>
                    <button class="btn-open-tool" data-url="${finalUrl}" data-raw-url="${tool.url}" style="font-size: 0.85rem; color: var(--color-primary-600); background: none; border: none; padding: 0; cursor: pointer; text-decoration: none; font-weight: 500;">Abrir ferramenta ↗</button>
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
                    // Use the original url (without ?q=) for Gemini/Claude so it doesn't break, ChatGPT works with ?q=
                    const isChatGPT = url.includes('chatgpt.com');
                    const targetUrl = isChatGPT ? url : rawUrl;
                    window.open(targetUrl, '_blank');
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
