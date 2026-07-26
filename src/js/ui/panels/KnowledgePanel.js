class KnowledgePanel {
    constructor() {
        this.id = 'knowledge';
        this.category = 'core';
        this.title = 'Conhecimento';
        this.icon = window.SVGIcons ? window.SVGIcons.bookOpen : '📘';
        this.priority = 20;
        this.supportsOffline = true;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.knowledge;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        const knowledge = context.resolvedAssets.knowledge;
        return `
            <div id="slo-${this.id}" class="slo-panel workspace-readable" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%; max-width: 900px;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                    Conhecimento Base
                </h3>
                
                <div class="knowledge-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; font-size: 0.95rem; color: var(--color-gray-700); line-height: 1.6;">
                    ${knowledge.bestPractices ? `<div style="background: var(--color-gray-50); padding: 1.25rem; border-radius: var(--radius-md); height: 100%;"><strong style="color:var(--color-primary-700); display: block; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Boas Práticas</strong> ${knowledge.bestPractices}</div>` : ''}
                    ${knowledge.commonErrors ? `<div style="background: var(--color-error-light); color: var(--color-error); padding: 1.25rem; border-radius: var(--radius-md); height: 100%;"><strong style="display: block; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">Erros Frequentes</strong> ${knowledge.commonErrors}</div>` : ''}
                </div>
            </div>
        `;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new KnowledgePanel());
}
