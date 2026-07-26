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
        if (!context.rar) {
            return `<div class="slo-panel">Loading Methodology Report...</div>`;
        }

        const rar = context.rar;
        let findingsHtml = '';

        if (rar.findings && rar.findings.length > 0) {
            const sortedFindings = [...rar.findings].sort((a, b) => {
                const w = { 'ERROR': 4, 'WARNING': 3, 'TIP': 2, 'INFO': 1, 'AUTO_SUGGEST_AREA': 0 };
                return w[b.severity] - w[a.severity];
            });

            findingsHtml = `<div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.25rem;">`;
            sortedFindings.forEach(f => {
                let color = 'var(--color-primary)';
                if (f.severity === 'ERROR') color = 'var(--color-error)';
                if (f.severity === 'WARNING') color = 'var(--color-warning)';
                if (f.severity === 'TIP') color = 'var(--color-success)';

                findingsHtml += `
                    <div style="border-left: 3px solid ${color}; padding-left: 1rem;">
                        <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: ${color}; margin-bottom: 0.25rem;">${f.severity}</div>
                        <p style="font-size: 0.9rem; color: var(--color-gray-800); margin: 0; font-weight: 500;">${f.message}</p>
                        <p style="font-size: 0.85rem; color: var(--color-gray-600); margin: 0; margin-top: 2px;">${f.suggestion}</p>
                    </div>
                `;
            });
            findingsHtml += `</div>`;
        } else {
            findingsHtml = `
                <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--color-success-light); padding: 1rem; border-bottom: 1px solid var(--color-gray-200);">
                    <div style="font-size: 1.25rem;">🟢</div>
                    <div style="font-weight: 700; color: var(--color-success); letter-spacing: 1px;">METODOLOGIA SÓLIDA</div>
                </div>
                <div style="padding: 1rem; background: var(--color-white);">
                    <p style="font-size: 0.95rem; color: var(--color-gray-800); margin-bottom: 0; line-height: 1.5;">Todos os critérios metodológicos fundamentais verificados não apresentam problemas estruturais.</p>
                </div>
            `;
        }

        return `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%; max-width: 900px;">
                <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px; margin-bottom: 1.25rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                    Methodology Report
                </h3>
                
                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem;">
                    <!-- Coluna Score -->
                    <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: 1.5rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="font-size: 0.9rem; text-transform: uppercase; font-weight: 700; color: var(--color-gray-500); letter-spacing: 1px; margin-bottom: 0.5rem;">Overall Score</div>
                        <div style="font-size: 3.5rem; font-weight: 800; color: ${rar.score >= 80 ? 'var(--color-success)' : (rar.score >= 50 ? 'var(--color-warning)' : 'var(--color-error)')}; line-height: 1;">${rar.score}%</div>
                        
                        <div style="width: 100%; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-gray-700);">
                                <span>Theme</span> <strong>${rar.metrics.theme}%</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-gray-700);">
                                <span>Question</span> <strong>${rar.metrics.question}%</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-gray-700);">
                                <span>Objectives</span> <strong>${rar.metrics.objectives}%</strong>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--color-gray-700);">
                                <span>Keywords</span> <strong>${rar.metrics.keywords}%</strong>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Coluna Findings -->
                    <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: 1.25rem;">
                        <h4 style="font-size: 1rem; font-weight: 700; color: var(--color-gray-800); margin-bottom: 0;">Análise Metodológica</h4>
                        ${findingsHtml}
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
