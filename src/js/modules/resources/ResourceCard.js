class ResourceCard {
    /**
     * @param {Object} data - Resource asset data (prompt, tools, etc.)
     */
    constructor(data) {
        this.data = data;
    }

    render() {
        let toolsHtml = '';
        if (this.data.tools && this.data.tools.length > 0) {
            toolsHtml = `
            <div style="margin-bottom: 1rem;">
                <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-primary-700); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.wrench || '🛠️'}</span> Ferramentas IA Recomendadas
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    ${this.data.tools.map(t => `<span style="background: var(--color-gray-100); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--color-gray-700); border: 1px solid var(--color-gray-200);">${t.name}</span>`).join('')}
                </div>
            </div>`;
        }

        let promptHtml = '';
        if (this.data.prompt) {
            let promptText = this.data.prompt.template || this.data.prompt;
            if (Array.isArray(promptText)) {
                promptText = promptText.join('\n');
            } else if (typeof promptText !== 'string') {
                promptText = String(promptText);
            }
            // The user requested that we use [TEMA] instead of {{TEMA}} to signify it's a placeholder to fill manually
            promptText = promptText.replace(/{{TEMA}}/g, '[TEMA]')
                                   .replace(/{{area}}/g, '[AREA]')
                                   .replace(/{{title}}/g, '[TEMA]');
                                   
            const promptEscaped = promptText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            promptHtml = `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1rem;">
                <div style="background: #f1f5f9; padding: 0.5rem 1rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-gray-700); display: flex; align-items: center; gap: 0.5rem;">
                        <span style="width: 16px; height: 16px; color: var(--color-primary-600); display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.brain || '🤖'}</span> Prompt Base
                    </div>
                    <button class="btn-copy-prompt" data-prompt-text="${encodeURIComponent(promptText)}" style="background: white; border: 1px solid #cbd5e1; border-radius: 4px; padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 600; color: var(--color-gray-700); cursor: pointer; display: flex; align-items: center; gap: 0.25rem; transition: all 0.2s;">
                        <span style="width: 12px; height: 12px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.copy || '📋'}</span> Copiar
                    </button>
                </div>
                <div style="padding: 1rem; font-family: monospace; font-size: 0.85rem; color: var(--color-gray-800); white-space: pre-wrap; max-height: 200px; overflow-y: auto;">${promptEscaped}</div>
                <div style="background: #f1f5f9; padding: 0.5rem 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: var(--color-gray-600);">
                    <i>💡 Nota: Substitua <b>[TEMA]</b> pelos dados reais da sua investigação antes de usar no ChatGPT.</i>
                </div>
            </div>`;
        }

        let exampleHtml = '';
        if (this.data.example) {
            exampleHtml = `
            <div style="margin-bottom: 1rem; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1rem; border-radius: var(--radius-md);">
                <div style="font-weight: 600; font-size: 0.85rem; color: #166534; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.lightbulb || '💡'}</span> Exemplo Prático
                </div>
                <div style="font-size: 0.85rem; color: #15803d; line-height: 1.5;">${this.data.example}</div>
            </div>`;
        }
        
        let checklistHtml = '';
        if (this.data.checklist && this.data.checklist.length > 0) {
            checklistHtml = `
            <div style="margin-bottom: 1rem;">
                <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-gray-700); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.clipboardCheck || '☑️'}</span> Checklist (Boas Práticas)
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                    ${this.data.checklist.map(item => `
                        <div style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: var(--color-gray-700);">
                            <span style="color: var(--color-primary-500); font-weight: bold;">•</span>
                            <span>${item.text || item}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }
        
        let knowledgeHtml = '';
        if (this.data.knowledge && this.data.knowledge.length > 0) {
            knowledgeHtml = `
            <div style="margin-bottom: 1rem;">
                <div style="font-weight: 600; font-size: 0.85rem; color: var(--color-gray-700); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.bookOpen || '📘'}</span> Conhecimento Chave
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${this.data.knowledge.map(k => `
                        <div style="font-size: 0.85rem; background: var(--color-gray-50); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--color-gray-200);">
                            <strong style="color: var(--color-gray-900); display: block; margin-bottom: 0.25rem;">${k.title}</strong>
                            <span style="color: var(--color-gray-600);">${k.content}</span>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        }

        return `
        <div class="resource-card" data-category="${this.data.category || ''}" style="background: white; border: 1px solid var(--color-gray-200); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 1.5rem;">
            <!-- Header -->
            <div style="background: var(--color-gray-50); padding: 1.25rem; border-bottom: 1px solid var(--color-gray-200);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900);">${this.data.title}</h3>
                    <span style="background: var(--color-primary-100); color: var(--color-primary-800); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.5rem; border-radius: var(--radius-full);">${this.data.category || 'Geral'}</span>
                </div>
                ${this.data.objective ? `<p style="margin: 0; font-size: 0.9rem; color: var(--color-gray-600); line-height: 1.5;"><strong>🎯 Objetivo:</strong> ${this.data.objective}</p>` : ''}
            </div>
            
            <!-- Content Grid -->
            <div style="padding: 1.25rem; flex: 1;">
                ${this.data.whenToUse ? `
                <div style="margin-bottom: 1.25rem; font-size: 0.9rem; color: var(--color-gray-700); border-left: 3px solid var(--color-primary-400); padding-left: 0.75rem; line-height: 1.5;">
                    <strong>Quando usar IA:</strong> ${this.data.whenToUse}
                </div>` : ''}

                ${knowledgeHtml}
                ${toolsHtml}
                ${promptHtml}
                ${exampleHtml}
                ${checklistHtml}
            </div>
        </div>
        `;
    }
}

window.ResourceCard = ResourceCard;
