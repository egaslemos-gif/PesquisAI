/**
 * Research Identity Domain (RID)
 * Responsável por centralizar a identidade local, o Workspace Registry,
 * e o Learning Record do utilizador.
 */

class ResearchIdentity {
    constructor() {
        this.data = null;
        this.storageKey = 'rg_research.identity';
    }

    init() {
        this._loadOrCreate();
        this._handleLegacyMigration();

        // Registo de sessão
        this.data.profile.lastVisit = new Date().toISOString();
        this.data.profile.totalSessions += 1;
        this.data.learningRecord.totalSessions += 1;
        this._save();

        this._setupListeners();

        // Notifica o sistema que o RID está pronto
        if (window.rgEventBus) {
            window.rgEventBus.emit('rid:loaded', this.data);
        }
    }

    _loadOrCreate() {
        if (window.localStorage) {
            try {
                const serialized = window.localStorage.getItem(this.storageKey);
                if (serialized) {
                    this.data = JSON.parse(serialized);
                    
                    // Migrações de schema na inicialização
                    if (!this.data.schemaVersion || this.data.schemaVersion < 2) {
                        this.data.schemaVersion = 2;
                        if (this.data.learningRecord && typeof this.data.learningRecord.totalArtifacts !== 'undefined') {
                            this.data.learningRecord.draftArtifacts = this.data.learningRecord.totalArtifacts;
                            this.data.learningRecord.validatedArtifacts = 0;
                            this.data.learningRecord.completedSteps = 0;
                            delete this.data.learningRecord.totalArtifacts;
                        }
                    }

                    if (!this.data.profile) this._initProfile();
                    if (!this.data.learningRecord) this._initLearningRecord();
                    if (!this.data.workspaces) this.data.workspaces = {};
                    return;
                }
            } catch (e) {
                console.error('[ResearchIdentity] Erro ao carregar RID:', e);
            }
        }
        
        // Criar de raiz
        this.data = {
            id: this._generateId(),
            schemaVersion: 2,
            createdAt: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            activeWorkspaceId: null,
            version: '1.0',
            profile: {},
            workspaces: {},
            learningRecord: {}
        };
        
        this._initProfile();
        this._initLearningRecord();
        this._save();
    }

    _initProfile() {
        this.data.profile = {
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            totalSessions: 0,
            preferredProtocol: Object.keys(window.WORKFLOWS || {})[0] || 'default',
            roles: ['investigator', 'supervisor'], // Demo mode RC1.2
            preferredAIs: [],
            totalArtifacts: 0,
            completedProtocols: 0
        };
    }

    _initLearningRecord() {
        this.data.learningRecord = {
            totalProtocolsStarted: 0,
            totalProtocolsCompleted: 0,
            draftArtifacts: 0,
            validatedArtifacts: 0,
            completedSteps: 0,
            totalPromptCopies: 0,
            totalSessions: 0,
            averageSessionTime: 0
        };
    }

    _generateId() {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return `RID-${crypto.randomUUID().split('-')[0].toUpperCase()}`;
        }
        // Fallback genérico UUID v4
        return `RID-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }

    _save() {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(this.storageKey, JSON.stringify(this.data));
            } catch (e) {
                console.error('[ResearchIdentity] Erro ao guardar RID:', e);
            }
        }
    }

    _handleLegacyMigration() {
        if (window.rgStorage && typeof window.rgStorage.getLegacyWorkspace === 'function') {
            const legacy = window.rgStorage.getLegacyWorkspace();
            if (legacy && legacy.id) {
                // Verifica se já existe no Registry
                if (!this.data.workspaces[legacy.id]) {
                    console.log('[ResearchIdentity] Migração detetada. Migrando rg_workspace para rg_workspace_' + legacy.id);
                    
                    // 1. Grava no novo formato
                    window.rgStorage.saveWorkspace(legacy.id, legacy);
                    
                    // 2. Regista no Registry
                    this._upsertWorkspaceRegistry(legacy);
                    
                    // Regista flag de migração
                    this.data.migration = {
                        version: "2.0",
                        migratedAt: new Date().toISOString(),
                        source: "legacy"
                    };
                    this.data.activeWorkspaceId = legacy.id;
                    this._save();

                    // 3. Limpa o antigo
                    window.rgStorage.removeLegacyWorkspace();
                }
            }
        }
    }

    _setupListeners() {
        if (!window.rgEventBus) return;

        window.rgEventBus.on('workspace:loaded', (workspaceData) => {
            if (workspaceData && workspaceData.id) {
                this.data.activeWorkspaceId = workspaceData.id;
                this._save();
            }
        });

        // Quando o Workspace inicia/muda de área (novo projeto)
        window.rgEventBus.on('workspace:created', (workspaceData) => {
            this.data.activeWorkspaceId = workspaceData.id;
            this._upsertWorkspaceRegistry(workspaceData);
            this.data.learningRecord.totalProtocolsStarted += 1;
            this.data.lastActivity = new Date().toISOString();
            this._save();
        });

        // Quando a etapa do Workspace é alterada, ou atualizado genericamente
        window.rgEventBus.on('workspace:updated', (payload) => {
            if (payload && payload.workspace) {
                this._upsertWorkspaceRegistry(payload.workspace);
                this.data.lastActivity = new Date().toISOString();
                this._save();
            }
        });

        // Quando um artefacto é gravado
        window.rgEventBus.on('artifact:saved', (payload) => {
            if (window.rgWorkspace) {
                const workspaceData = window.rgWorkspace.getData();
                if (workspaceData && workspaceData.id) {
                    this._upsertWorkspaceRegistry(workspaceData);
                    this.data.lastActivity = new Date().toISOString();
                    this.data.learningRecord.draftArtifacts += 1;
                    this.data.profile.totalArtifacts += 1;
                    this._save();
                }
            }
        });

        // Quando o botão copiar é clicado (evento a disparar noutros componentes)
        window.rgEventBus.on('prompt:copied', () => {
            this.data.learningRecord.totalPromptCopies += 1;
            this._save();
        });
    }

    /**
     * Atualiza o registo de metadados do Workspace (Não guarda os artefactos).
     */
    _upsertWorkspaceRegistry(workspaceData) {
        if (!workspaceData || !workspaceData.id) return;
        
        const wId = workspaceData.id;
        
        // Se ainda não existir, cria estrutura base
        if (!this.data.workspaces[wId]) {
            this.data.workspaces[wId] = {
                id: wId,
                title: workspaceData.title || 'Investigação Sem Título',
                area: workspaceData.area || 'Área não definida',
                protocolId: workspaceData.workflowId || Object.keys(window.WORKFLOWS || {})[0] || 'default',
                status: workspaceData.status || 'ACTIVE',
                currentStep: workspaceData.currentStepId,
                createdAt: workspaceData.createdAt || new Date().toISOString(),
                updatedAt: workspaceData.updatedAt || new Date().toISOString(),
                lastOpened: new Date().toISOString(),
                lastArtifact: workspaceData.currentStepId,
                completed: false,
                favorite: false,
                visibility: 'active',
                reviewStatus: 'NONE'
            };
        }
        
        const entry = this.data.workspaces[wId];
        entry.title = workspaceData.title || entry.title;
        entry.area = workspaceData.area || entry.area;
        entry.status = workspaceData.status || entry.status;
        entry.currentStep = workspaceData.currentStepId || entry.currentStep;
        entry.updatedAt = workspaceData.updatedAt || new Date().toISOString();
        entry.lastOpened = new Date().toISOString();
        
        // Verifica o estado da revisão metodológica da etapa atual
        let rStatus = 'NONE';
        if (window.WORKFLOWS && window.WORKFLOWS[entry.protocolId]) {
            const stepConfig = window.WORKFLOWS[entry.protocolId].steps.find(s => s.id === entry.currentStep);
            if (stepConfig && stepConfig.validation) {
                const reviews = workspaceData.reviews || {};
                const stepReview = reviews[entry.currentStep];
                if (stepReview && stepReview.methodological) {
                    rStatus = stepReview.methodological;
                } else {
                    rStatus = 'PENDING';
                }
            }
        }
        entry.reviewStatus = rStatus;

        // Procura o último artefacto preenchido
        if (workspaceData.artifacts) {
            const keys = Object.keys(workspaceData.artifacts);
            if (keys.length > 0) {
                entry.lastArtifact = keys[keys.length - 1]; 
            }
        }
    }

    // --- Public API para UI ---

    clearActiveWorkspace() {
        if (this.data) {
            this.data.activeWorkspaceId = null;
            this._save();
        }
    }

    getData() {
        return this.data;
    }

    getAllWorkspaces() {
        if (!this.data || !this.data.workspaces) return [];
        return Object.values(this.data.workspaces);
    }

    getRecentWorkspaces(limit = 5) {
        if (!this.data || !this.data.workspaces) return [];
        
        const list = Object.values(this.data.workspaces).filter(w => w.visibility !== 'archived');
        list.sort((a, b) => {
            if (a.favorite && !b.favorite) return -1;
            if (!a.favorite && b.favorite) return 1;
            return new Date(b.lastOpened).getTime() - new Date(a.lastOpened).getTime();
        });
        
        return list.slice(0, limit);
    }

    getArchivedWorkspaces() {
        if (!this.data || !this.data.workspaces) return [];
        return Object.values(this.data.workspaces).filter(w => w.visibility === 'archived');
    }

    toggleFavorite(workspaceId) {
        if (this.data.workspaces[workspaceId]) {
            this.data.workspaces[workspaceId].favorite = !this.data.workspaces[workspaceId].favorite;
            this._save();
            if (window.rgEventBus) {
                window.rgEventBus.emit('rid:updated', this.data);
            }
            return this.data.workspaces[workspaceId].favorite;
        }
        return false;
    }

    /**
     * Alterna o estado de favorito de múltiplos projetos.
     * @param {Array<string>} ids Array de IDs dos projetos.
     */
    favoriteProjects(ids) {
        if (!Array.isArray(ids)) return;
        ids.forEach(id => {
            if (this.data.workspaces[id]) {
                this.data.workspaces[id].favorite = !this.data.workspaces[id].favorite;
            }
        });
        this._save();
        if (window.rgEventBus) {
            window.rgEventBus.emit('rid:updated', this.data);
        }
    }

    /**
     * Elimina múltiplos projetos do registo e do storage.
     * @param {Array<string>} ids Array de IDs dos projetos.
     */
    deleteProjects(ids) {
        if (!Array.isArray(ids)) return;
        ids.forEach(id => {
            if (this.data.workspaces[id]) {
                delete this.data.workspaces[id];
                if (this.data.activeWorkspaceId === id) {
                    this.data.activeWorkspaceId = null;
                }
                if (window.rgStorage) {
                    window.rgStorage.clearWorkspace(id);
                }
            }
        });
        this._save();
        if (window.rgEventBus) {
            window.rgEventBus.emit('rid:updated', this.data);
        }
    }

    toggleArchive(workspaceId) {
        if (this.data.workspaces[workspaceId]) {
            const isArchived = this.data.workspaces[workspaceId].visibility === 'archived';
            this.data.workspaces[workspaceId].visibility = isArchived ? 'active' : 'archived';
            this._save();
            if (window.rgEventBus) {
                window.rgEventBus.emit('rid:updated', this.data);
            }
            return this.data.workspaces[workspaceId].visibility;
        }
        return 'active';
    }

    renameWorkspace(workspaceId, newTitle) {
        if (this.data.workspaces[workspaceId]) {
            this.data.workspaces[workspaceId].title = newTitle;
            this._save();
            if (window.rgEventBus) {
                window.rgEventBus.emit('rid:updated', this.data);
            }
            return true;
        }
        return false;
    }

    deleteWorkspace(workspaceId) {
        if (this.data.workspaces[workspaceId]) {
            delete this.data.workspaces[workspaceId];
            if (this.data.activeWorkspaceId === workspaceId) {
                this.data.activeWorkspaceId = null;
            }
            this._save();
            if (window.rgStorage) {
                window.rgStorage.clearWorkspace(workspaceId);
            }
            if (window.rgEventBus) {
                window.rgEventBus.emit('rid:updated', this.data);
            }
            return true;
        }
        return false;
    }
}

const researchIdentity = new ResearchIdentity();
// Inicializa global
window.rgResearchIdentity = researchIdentity;
