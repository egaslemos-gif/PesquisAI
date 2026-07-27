class CompetencyCard {
    static render(moduleData, isRecommended = false) {
        // Status config
        const statusConfig = {
            available: { color: 'var(--color-success)', bg: 'rgba(16, 185, 129, 0.1)', label: 'Disponível', icon: 'checkCircle' },
            development: { color: 'var(--color-warning)', bg: 'rgba(245, 158, 11, 0.1)', label: 'Em Desenvolvimento', icon: 'settings' },
            planned: { color: 'var(--color-gray-500)', bg: 'var(--color-gray-100)', label: 'Planeado', icon: 'clock' },
            future: { color: 'var(--color-gray-400)', bg: 'var(--color-gray-50)', label: 'Futuro', icon: 'lock' }
        };
        const st = statusConfig[moduleData.status] || statusConfig.future;

        const includesHTML = (moduleData.includes || []).map(inc => 
            `<span style="display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--color-gray-600);"><span style="color: var(--color-primary-400); font-weight: bold;">✓</span> ${inc}</span>`
        ).join('');

        const isActionable = moduleData.status === 'available';
        const actionBtnLabel = isActionable ? 'Explorar' : 'Detalhes';
        const actionBtnClass = isActionable ? 'btn-primary' : 'btn-secondary';

        const recommendedBadge = isRecommended ? 
            `<div style="position: absolute; top: -10px; right: 20px; background: var(--color-warning); color: white; font-size: 0.65rem; font-weight: bold; padding: 2px 8px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">⭐ RECOMENDADO PARA SI</div>` : '';

        return `
            <div class="competency-card" data-id="${moduleData.id}" style="
                background: white; 
                border: 1px solid ${isRecommended ? 'var(--color-warning)' : 'var(--color-gray-200)'}; 
                border-radius: 12px; 
                padding: 1.5rem; 
                display: flex; 
                flex-direction: column; 
                gap: 1rem;
                position: relative;
                box-shadow: ${isRecommended ? '0 4px 12px rgba(245, 158, 11, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)'};
                transition: transform 0.2s, box-shadow 0.2s;
                cursor: pointer;
                height: 100%;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 15px -3px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='${isRecommended ? '0 4px 12px rgba(245, 158, 11, 0.15)' : '0 1px 3px rgba(0,0,0,0.05)'}';">
                
                ${recommendedBadge}

                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--color-primary-50); color: var(--color-primary-600); display: flex; justify-content: center; align-items: center;">
                            ${window.SVGIcons ? (window.SVGIcons[moduleData.icon] || '📁') : '📁'}
                        </div>
                        <div>
                            <h3 style="margin: 0; font-size: 1.1rem; color: var(--color-gray-900);">${moduleData.title}</h3>
                            <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: ${st.bg}; color: ${st.color}; margin-top: 4px;">
                                ${st.label}
                            </span>
                        </div>
                    </div>
                </div>

                <p style="margin: 0; font-size: 0.85rem; color: var(--color-gray-700); line-height: 1.4; flex-grow: 1;">
                    ${moduleData.description}
                </p>
                
                <div style="display: flex; gap: 1rem; padding: 0.75rem 0; border-top: 1px solid var(--color-gray-100); border-bottom: 1px solid var(--color-gray-100);">
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-gray-500); font-weight: 600;">Tempo Estimado</span>
                        <span style="font-size: 0.8rem; color: var(--color-gray-800);">${moduleData.estimatedDuration || '--'}</span>
                    </div>
                    <div style="width: 1px; background: var(--color-gray-200);"></div>
                    <div style="display: flex; flex-direction: column; gap: 2px;">
                        <span style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-gray-500); font-weight: 600;">Nível</span>
                        <span style="font-size: 0.8rem; color: var(--color-gray-800);">${moduleData.difficulty || '--'}</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-gray-800);">Inclui:</span>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.25rem;">
                        ${includesHTML}
                    </div>
                </div>

                <div style="margin-top: auto; padding-top: 1rem;">
                    <button class="btn ${actionBtnClass}" style="width: 100%; justify-content: center;" onclick="window.researchCompetencyHubInstance.handleCardAction('${moduleData.id}', event)">
                        ${actionBtnLabel}
                    </button>
                </div>
            </div>
        `;
    }
}
window.CompetencyCard = CompetencyCard;
