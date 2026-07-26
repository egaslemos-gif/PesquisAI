class OutcomePanel {
    constructor() {
        this.id = 'outcome';
        this.category = 'core';
        this.title = 'Objetivo da Etapa';
        this.icon = window.SVGIcons ? window.SVGIcons.target : '🎯';
        this.priority = 10;
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
        return `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; padding-top: 1rem; width: 100%; max-width: 900px;">
                <div style="border-bottom: 1px solid var(--color-gray-200); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                    <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--color-gray-900); letter-spacing: -0.02em; margin-bottom: 1rem;">
                        ${step.name}
                    </h1>
                    
                    <div style="display: flex; gap: 2rem; align-items: baseline;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span>
                            <span style="font-weight: 600; color: var(--color-gray-900);">Ao concluir esta etapa...</span>
                        </div>
                        <div style="display: flex; gap: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.25rem; color: var(--color-gray-600); font-size: 0.9rem;">
                                <span style="font-weight: 700; color: var(--color-gray-500); text-transform: uppercase; font-size: 0.75rem;">Tempo</span>
                                <span style="font-weight: 500; color: var(--color-gray-800);">20 min</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.25rem; color: var(--color-gray-600); font-size: 0.9rem;">
                                <span style="font-weight: 700; color: var(--color-gray-500); text-transform: uppercase; font-size: 0.75rem;">Competência</span>
                                <span style="font-weight: 500; color: var(--color-gray-800);">Delimitação Metodológica</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="font-size: 1.1rem; color: var(--color-gray-700); line-height: 1.6; margin-top: 1rem;">
                        ${step.learningOutcome || step.description}
                    </div>
                </div>
            </div>
        `;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new OutcomePanel());
}
