/**
 * PanelRegistry
 * Taxonomia global e armazenamento dos painéis renderizáveis.
 * Agora com suporte a categorias (grupos de prioridade).
 */
class PanelRegistry {
    constructor() {
        this.panels = new Map();
        
        // Categorias base e a sua ordem de prioridade (menor número = aparece primeiro)
        this.categories = {
            'core': 100,
            'assessment': 200,
            'resources': 300,
            'output': 400,
            'navigation': 500
        };
    }

    /**
     * Regista um novo painel.
     * @param {Object} panel Contrato do painel: id, category, title, icon, priority, condition, validate, render, attachListeners, destroy.
     */
    register(panel) {
        if (!panel.id || !panel.category || typeof panel.render !== 'function') {
            console.error('[PanelRegistry] Painel inválido (falta id, category ou render):', panel);
            return;
        }
        if (!this.categories[panel.category]) {
            console.warn(`[PanelRegistry] Categoria desconhecida '${panel.category}' para o painel '${panel.id}'. Será colocada no fim.`);
            this.categories[panel.category] = 999;
        }
        
        this.panels.set(panel.id, panel);
        if (typeof panel.discover === 'function') {
            panel.discover(); // Lifecycle: discover
        }
    }

    /**
     * Desregista um painel pelo ID.
     */
    unregister(id) {
        this.panels.delete(id);
    }

    /**
     * Obtém um painel específico.
     */
    getPanel(id) {
        return this.panels.get(id);
    }

    /**
     * Verifica se um painel existe.
     */
    has(id) {
        return this.panels.has(id);
    }

    /**
     * Retorna todos os painéis registados em array.
     */
    getPanels() {
        return Array.from(this.panels.values());
    }

    /**
     * Retorna a lista de painéis autorizados para o RenderingContext atual, 
     * ordenados por Categoria -> Prioridade do Painel.
     * @param {Object} context O Rendering Context.
     * @returns {Array} Lista de painéis autorizados.
     */
    getPanelsForContext(context) {
        const validPanels = this.getPanels().filter(panel => {
            if (typeof panel.condition === 'function') {
                return panel.condition(context);
            }
            return true;
        });

        // Ordenar primeiro por categoria, depois por prioridade interna do painel
        validPanels.sort((a, b) => {
            const catA = this.categories[a.category] || 999;
            const catB = this.categories[b.category] || 999;
            if (catA !== catB) {
                return catA - catB;
            }
            const prioA = a.priority || 0;
            const prioB = b.priority || 0;
            return prioA - prioB;
        });

        return validPanels;
    }
}

// Singleton global
window.rgPanelRegistry = new PanelRegistry();
