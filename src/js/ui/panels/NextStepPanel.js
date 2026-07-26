class NextStepPanel {
    constructor() {
        this.id = 'next';
        this.category = 'navigation';
        this.title = 'Próxima Etapa';
        this.icon = window.SVGIcons ? window.SVGIcons.arrowRightCircle : '➡️';
        this.priority = 90;
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
        // Obter os passos para saber se é o primeiro
        const protocol = window.rgEngine ? window.rgEngine.getWorkflow() : null;
        let isFirstStep = false;
        if (protocol && protocol.steps && protocol.steps.length > 0) {
            isFirstStep = step.id === protocol.steps[0].id;
        }

        return `
            <div id="slo-${this.id}" class="slo-panel" style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--color-gray-200); margin-bottom: 4rem; width: 100%;">
                <div>
                    ${!isFirstStep ? `<button class="btn btn-ghost" onclick="window.rgEvents.handleBack()">← Voltar</button>` : ''}
                </div>
                <div>
                    <button class="btn btn-primary" onclick="window.rgEvents.handleAdvance()">
                        Concluir e Avançar ${this.icon}
                    </button>
                </div>
            </div>
        `;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new NextStepPanel());
}
