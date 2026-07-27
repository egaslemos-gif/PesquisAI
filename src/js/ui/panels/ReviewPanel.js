class ReviewPanel {
    constructor() {
        this.id = 'review';
        this.category = 'assessment';
        this.title = 'Revisão';
        this.icon = window.SVGIcons ? window.SVGIcons.scale : '⚖️';
        this.priority = 50;
        this.supportsOffline = false;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.review;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        return `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%; max-width: 900px;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                    Revisão Assistida por IA
                </h3>
                
                <div style="background: var(--color-gray-50); border: 1px dashed var(--color-gray-300); border-radius: var(--radius-md); padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                    <div style="font-size: 3rem; opacity: 0.8;">🚧</div>
                    <div>
                        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--color-gray-800); margin-bottom: 0.5rem;">Análise Automática em Breve</h4>
                        <p style="font-size: 0.95rem; color: var(--color-gray-600); max-width: 500px; margin: 0 auto; line-height: 1.5;">
                            A integração nativa para a análise automática da coerência metodológica será disponibilizada numa próxima versão.
                        </p>
                    </div>
                    <div style="background: white; border: 1px solid var(--color-primary-200); border-radius: var(--radius-md); padding: 1rem; max-width: 600px; margin-top: 0.5rem; text-align: left; display: flex; gap: 1rem; align-items: flex-start;">
                        <span style="font-size: 1.5rem;">💡</span>
                        <div>
                            <strong style="display: block; color: var(--color-primary-800); margin-bottom: 0.25rem;">Dica para o Investigador:</strong>
                            <span style="color: var(--color-gray-700); font-size: 0.9rem;">Por enquanto, utilize o <strong>Centro de Recursos IA</strong> (no topo direito) para copiar os Prompts validados e conduzir a sua revisão metodológica interagindo diretamente com o ChatGPT ou o Claude.</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachListeners(context) {}
    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new ReviewPanel());
}
