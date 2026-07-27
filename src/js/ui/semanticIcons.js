/**
 * Semantic Icons Manager
 * Lida com o Long Press no mobile e a Legenda na primeira utilização.
 */
class SemanticIconManager {
    constructor() {
        this.longPressTimer = null;
        this.longPressDuration = 600; // 600ms
        this.isLongPress = false;
        this.activeTooltip = null;
    }

    init() {
        // Event delegation no body para capturar todos os .semantic-icon
        document.body.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        document.body.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        document.body.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        document.body.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
        
        // Clicar fora fecha tooltips ativos
        document.body.addEventListener('click', (e) => {
            if (this.activeTooltip && !e.target.closest('.semantic-icon')) {
                this.closeTooltip(this.activeTooltip);
            }
        });

        this.checkLegend();
    }

    handleTouchStart(e) {
        const icon = e.target.closest('.semantic-icon');
        if (!icon) return;
        
        this.isLongPress = false;
        this.longPressTimer = setTimeout(() => {
            this.isLongPress = true;
            this.showTooltip(icon);
            // Previne vibração default ou seleção se possível
            if (navigator.vibrate) navigator.vibrate(50);
        }, this.longPressDuration);
    }

    handleTouchMove(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
    }

    handleTouchEnd(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
        
        if (this.isLongPress) {
            // Se foi long press, impede o click normal para não abrir o painel imediatamente
            e.preventDefault();
        }
    }

    handleContextMenu(e) {
        const icon = e.target.closest('.semantic-icon');
        if (icon && this.isLongPress) {
            e.preventDefault(); // Previne o menu de contexto nativo
        }
    }

    showTooltip(icon) {
        if (this.activeTooltip && this.activeTooltip !== icon) {
            this.activeTooltip.classList.remove('force-tooltip');
        }
        icon.classList.add('force-tooltip');
        this.activeTooltip = icon;
    }

    closeTooltip(icon) {
        icon.classList.remove('force-tooltip');
        if (this.activeTooltip === icon) {
            this.activeTooltip = null;
        }
    }

    checkLegend() {
        const seen = localStorage.getItem('semanticLegendSeen');
        if (!seen) {
            this.showLegend();
        }
    }

    showLegend() {
        const html = `
            <div id="semantic-legend-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6); z-index: 10000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); padding: 1rem;">
                <div style="background: white; border-radius: 12px; width: 100%; max-width: 400px; max-height: 90vh; overflow-y: auto; padding: 1.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                    <h3 style="margin-top: 0; margin-bottom: 1.5rem; font-size: 1.25rem; font-weight: 700; color: var(--color-gray-900);">Conheça os ícones</h3>
                    <p style="color: var(--color-gray-600); font-size: 0.9rem; margin-bottom: 1.5rem;">
                        O Guia do Investigador utiliza ícones semânticos para identificar recursos. No computador, passe o rato por cima; no telemóvel, prima demoradamente.
                    </p>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">📘</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Conhecimento</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">Boas práticas, conceitos e exemplos.</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">🤖</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Prompt IA</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">Prompt recomendado para esta etapa.</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">☑️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Checklist</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">Critérios que devem ser cumpridos.</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">⚖️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Revisão</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">Avaliação metodológica da etapa.</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">🛠️</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Ferramentas</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">Ferramentas recomendadas.</div>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <span style="font-size: 1.2rem;">📄</span>
                            <div>
                                <div style="font-weight: 600; font-size: 0.95rem;">Artefacto</div>
                                <div style="font-size: 0.8rem; color: var(--color-gray-500);">O que deve produzir nesta etapa.</div>
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" onclick="window.rgSemanticIconManager.closeLegend()">Entendido</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    closeLegend() {
        const modal = document.getElementById('semantic-legend-modal');
        if (modal) modal.remove();
        localStorage.setItem('semanticLegendSeen', 'true');
    }
}

window.rgSemanticIconManager = new SemanticIconManager();
// Inicializa após DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.rgSemanticIconManager.init();
});
