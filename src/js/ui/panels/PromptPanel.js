class PromptPanel {
    constructor() {
        this.id = 'prompt';
        this.category = 'core';
        this.title = 'Prompt Recomendado';
        this.icon = window.SVGIcons ? window.SVGIcons.brain : '🤖';
        this.priority = 30;
        this.supportsOffline = false;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.prompts && context.resolvedAssets.prompts.length > 0;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        const prompts = context.resolvedAssets.prompts;
        
        let html = `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px; margin-bottom: 1rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                    Prompt Recomendado
                </h3>
        `;
        
        prompts.forEach(promptId => {
            let strategy = 'balanced';
            
            if (context.preferences && context.preferences.promptStrategy) {
                strategy = context.preferences.promptStrategy;
            } else if (window.rgResearchIdentity) {
                const totalProjects = Object.keys(window.rgResearchIdentity.getData().workspaces || {}).length;
                if (totalProjects <= 2) strategy = 'guided';
                else if (totalProjects <= 5) strategy = 'balanced';
                else strategy = 'direct';
            }

            const resolvedPrompt = window.rgTemplateEngine ? window.rgTemplateEngine.resolvePrompt(promptId, null, strategy) : `[Template Engine Missing]`;
            const promptEscaped = resolvedPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            
            html += `
                <div class="prompt-card" style="border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem; max-width: 900px;">
                    <!-- Code Block -->
                    <div id="prompt-content-${promptId}" style="padding: 1.5rem; font-family: var(--font-mono, monospace); font-size: 0.85rem; background: var(--color-gray-900); color: var(--color-gray-100); white-space: pre-wrap; line-height: 1.5; border-bottom: 1px solid var(--color-gray-200);">${promptEscaped}</div>
                    
                    <!-- Actions Footer -->
                    <div style="display: flex; gap: 1rem; padding: 0.75rem 1rem; background: var(--color-white); align-items: center;">
                        <button class="btn btn-ghost" onclick="window.rgClipboard.copyText(document.getElementById('prompt-content-${promptId}').innerText, this)">
                            <span style="display: flex; align-items: center; width: 16px; height: 16px;">${window.SVGIcons ? window.SVGIcons.copy : '📋'}</span> Copiar Prompt
                        </button>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        return html;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new PromptPanel());
}
