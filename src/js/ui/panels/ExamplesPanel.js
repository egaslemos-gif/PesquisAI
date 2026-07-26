class ExamplesPanel {
    constructor() {
        this.id = 'examples';
        this.category = 'resources';
        this.title = 'Examples';
        this.icon = '💡';
        this.priority = 60;
        this.supportsOffline = true;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.examples;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        return `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 2rem; border-top: 1px solid var(--color-gray-200); padding-top: 2rem;">
                <h3 style="font-size: 1.1rem; color: var(--color-gray-800); margin-bottom: 1rem; display: flex; align-items: center; gap: 8px;">${this.icon} ${this.title}</h3>
                <p style="font-size: 0.9rem; color: var(--color-gray-500); font-style: italic;">Casos práticos documentados serão exibidos aqui.</p>
            </div>
        `;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new ExamplesPanel());
}
