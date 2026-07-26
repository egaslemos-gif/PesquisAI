/**
 * Research Event Domain
 * Atua como o historiador passivo da plataforma.
 * Captura todos os eventos metodológicos ocorridos nos projetos.
 */

class ResearchEvents {
    constructor() {
        this.data = null;
        this.storageKey = 'rg_research.events';
    }

    init() {
        this._loadOrCreate();
        this._setupListeners();
        
        if (window.rgEventBus) {
            window.rgEventBus.emit('researchEvents:loaded', this.data);
        }
    }

    _loadOrCreate() {
        if (window.localStorage) {
            try {
                const serialized = window.localStorage.getItem(this.storageKey);
                if (serialized) {
                    this.data = JSON.parse(serialized);
                    return;
                }
            } catch (e) {
                console.error('[ResearchEvents] Erro ao carregar eventos:', e);
            }
        }
        
        // Criar estrutura base
        this.data = {};
        this._save();
    }

    _save() {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            } catch (e) {
                console.error('[ResearchEvents] Erro ao guardar eventos:', e);
            }
        }
    }

    /**
     * Regista um evento cronológico.
     * @param {string} eventName - Tipo de evento (ex: WORKSPACE_CREATED)
     * @param {string} entityType - Entidade (ex: workspace, step, artifact)
     * @param {string} entityId - ID único da entidade
     */
    _logEvent(eventName, entityType, entityId) {
        if (!window.rgResearchIdentity) return;
        
        const ridData = window.rgResearchIdentity.getData();
        if (!ridData || !ridData.id) return;
        
        const rid = ridData.id;
        
        if (!this.data[rid]) {
            this.data[rid] = [];
        }
        
        this.data[rid].push({
            event: eventName,
            entity: entityType,
            entityId: entityId,
            timestamp: new Date().toISOString()
        });
        
        this._save();
    }

    _setupListeners() {
        if (!window.rgEventBus) return;

        window.rgEventBus.on('workspace:created', (payload) => {
            if (payload && payload.id) {
                this._logEvent('WORKSPACE_CREATED', 'workspace', payload.id);
            }
        });

        window.rgEventBus.on('step:changed', (stepId) => {
            if (stepId) {
                this._logEvent('STEP_STARTED', 'step', stepId);
            }
        });

        window.rgEventBus.on('artifact:saved', (payload) => {
            if (payload && payload.stepId) {
                this._logEvent('ARTIFACT_SAVED', 'artifact', payload.stepId);
            }
        });

        window.rgEventBus.on('prompt:copied', (payload) => {
            if (window.rgWorkspace) {
                const wsData = window.rgWorkspace.getData();
                if (wsData && wsData.currentStepId) {
                    this._logEvent('PROMPT_COPIED', 'step', wsData.currentStepId);
                }
            }
        });
    }

    // --- API Pública ---
    
    getEvents(rid) {
        if (!rid) {
            if (window.rgResearchIdentity) {
                rid = window.rgResearchIdentity.getData().id;
            }
        }
        return this.data[rid] || [];
    }
}

const researchEvents = new ResearchEvents();
window.rgResearchEvents = researchEvents;
