class ChecklistPanel {
    constructor() {
        this.id = 'checklist';
        this.category = 'assessment';
        this.title = 'Checklist';
        this.icon = window.SVGIcons ? window.SVGIcons.clipboardCheck : '☑️';
        this.priority = 40;
        this.supportsOffline = true;
    }

    discover() {}
    
    validate(context) {
        return !!context.resolvedAssets?.checklist && context.resolvedAssets.checklist.length > 0;
    }

    condition(context) {
        return this.validate(context);
    }

    render(context) {
        const checklist = context.resolvedAssets.checklist;
        const savedChecklistData = window.rgWorkspace ? window.rgWorkspace.getChecklist(context.stageId) : { completed: [] };
        const checkedIds = savedChecklistData.completed || [];
        const total = checklist.length;
        const checkedCount = checkedIds.length;
        
        let html = `
            <div id="slo-${this.id}" class="slo-panel" style="margin-bottom: 1rem; border-top: 1px solid var(--color-gray-100); padding-top: 1.5rem; width: 100%; max-width: 900px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900); display: flex; align-items: center; gap: 8px;">
                        <span style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; color: var(--color-primary-600);">${this.icon}</span> 
                        Critérios de Sucesso
                    </h3>
                    <div style="text-align: right;">
                        <div id="checklist-progress-text" style="font-size: 0.85rem; font-weight: 700; color: var(--color-gray-600); margin-bottom: 0.25rem;">${checkedCount} / ${total} concluídos</div>
                        <div id="checklist-progress-bar" style="font-family: monospace; font-size: 0.8rem; color: var(--color-primary-500); letter-spacing: 1px;">
                            ${this.generateProgressString(checkedCount, total)}
                        </div>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        `;
        checklist.forEach(chk => {
            const isChecked = checkedIds.includes(chk.id);
            html += `
                <label class="checklist-label ${isChecked ? 'completed' : ''}" style="display: flex; align-items: flex-start; gap: 0.75rem; cursor: pointer; font-size: 0.95rem; color: ${isChecked ? 'var(--color-gray-500)' : 'var(--color-gray-800)'}; transition: color 0.2s;">
                    <input type="checkbox" class="checklist-checkbox" data-step-id="${context.stageId}" id="${chk.id}" ${isChecked ? 'checked' : ''} style="margin-top: 0.35rem; width: 1.1rem; height: 1.1rem; accent-color: var(--color-primary-600);">
                    <span style="${isChecked ? 'text-decoration: line-through;' : ''}">${chk.label}</span>
                </label>
            `;
        });
        html += `</div></div>`;
        return html;
    }

    generateProgressString(checked, total) {
        const blocksCount = 10;
        const filled = Math.round((checked / total) * blocksCount);
        return '█'.repeat(filled) + '░'.repeat(blocksCount - filled);
    }

    attachListeners(context) {
        document.querySelectorAll(`.checklist-checkbox[data-step-id="${context.stageId}"]`).forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (window.rgWorkspace) {
                    const allCheckboxes = Array.from(document.querySelectorAll(`.checklist-checkbox[data-step-id="${context.stageId}"]`));
                    const checkedIds = allCheckboxes.filter(chk => chk.checked).map(chk => chk.id);
                    window.rgWorkspace.saveChecklist(context.stageId, checkedIds);
                    
                    // Update visual progress
                    const textEl = document.getElementById('checklist-progress-text');
                    const barEl = document.getElementById('checklist-progress-bar');
                    if (textEl && barEl) {
                        textEl.innerText = `${checkedIds.length} / ${allCheckboxes.length} concluídos`;
                        barEl.innerText = this.generateProgressString(checkedIds.length, allCheckboxes.length);
                    }
                    
                    // Update label style
                    const label = cb.closest('.checklist-label');
                    const span = label.querySelector('span');
                    if (cb.checked) {
                        label.style.color = 'var(--color-gray-500)';
                        span.style.textDecoration = 'line-through';
                    } else {
                        label.style.color = 'var(--color-gray-800)';
                        span.style.textDecoration = 'none';
                    }
                }
            });
        });
    }

    destroy(context) {}
}

if (window.rgPanelRegistry) {
    window.rgPanelRegistry.register(new ChecklistPanel());
}
