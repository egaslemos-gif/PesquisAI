/**
 * Workspace: A Única Fonte de Verdade da aplicação.
 * Apenas o Workspace modifica os dados. Os outros módulos consultam-no.
 */

class Workspace {
    constructor() {
        // Estado por defeito
        this.data = {
            id: null,
            workflowId: null,
            currentStepId: null,
            area: '',
            artifacts: {
                // Mapeamento: stepId -> conteúdo do artefacto
            },
            checklists: {
                // Mapeamento: stepId -> { completed: ['id1', 'id2'], updatedAt: timestamp, version: 1 }
            },
            preferences: {},
            history: []
        };
    }

    /**
     * Inicializa o workspace a partir do armazenamento local ou cria novo
     */
    init(storageData = null) {
        if (storageData) {
            this.data = { ...this.data, ...storageData };
        } else {
            // Tenta carregar através do storage se tiver um ID atual
            // Mas nesta RC, o engine vai sempre dar INIT e se vier do "Continuar" passará os dados.
            this.data.id = 'proj_' + Date.now();
            this.data.title = '';
            this.data.area = ''; 
        }
        
        if (window.rgEventBus) {
            window.rgEventBus.emit('workspace:loaded', this.data);
        }
    }

    /**
     * Carrega diretamente um workspace pelo ID
     */
    loadWorkspaceById(workspaceId) {
        if (!workspaceId) return false;
        if (window.rgStorage) {
            const data = window.rgStorage.loadWorkspace(workspaceId);
            if (data) {
                this.data = { ...this.data, ...data };
                if (window.rgEventBus) {
                    window.rgEventBus.emit('workspace:loaded', this.data);
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Devolve os dados completos
     */
    getData() {
        return this.data;
    }

    /**
     * Define a área de investigação (início do projeto)
     */
    setArea(areaStr) {
        this.data.area = areaStr;
        this._notifyAndSave('AREA_CHANGED');
        if (window.rgEventBus) {
            window.rgEventBus.emit('workspace:created', this.data);
        }
        this._save();
    }

    /**
     * Guarda uma preferência do utilizador para o workspace
     */
    savePreference(key, value) {
        if (!this.data.preferences) {
            this.data.preferences = {};
        }
        this.data.preferences[key] = value;
        this._save();
    }

    /**
     * Atualiza a etapa atual
     */
    setCurrentStep(stepId) {
        if (this.data.currentStepId !== stepId) {
            this.data.currentStepId = stepId;
            if (!this.data.history.includes(stepId)) {
                this.data.history.push(stepId);
            }
            this._notifyAndSave('STEP_CHANGED');
            
            if (window.rgEventBus) {
                window.rgEventBus.emit('step:changed', stepId);
            }
        }
    }

    /**
     * Marca o workspace como concluído (todas as etapas foram finalizadas)
     */
    markAsCompleted() {
        this.data.status = 'completed';
        this._notifyAndSave('WORKSPACE_COMPLETED');
    }

    /**
     * Guarda um artefacto para a etapa correspondente.
     * Se um artefacto anterior for modificado, os seguintes são invalidados.
     */
    saveArtifact(stepId, content) {
        let isSignificantUpdate = false;
        
        // Verifica se já existia um artefacto e extrai o seu conteúdo
        const existingData = this.data.artifacts[stepId];
        let oldContent = '';
        
        if (existingData !== undefined) {
            if (typeof existingData === 'object' && existingData.content !== undefined) {
                oldContent = existingData.content;
            } else {
                oldContent = existingData; // Formato legacy (string simples)
            }
            
            // Comparação semântica (evita apagar etapas seguintes por espaços a mais/menos)
            const normalizedOld = oldContent.trim();
            const normalizedNew = content.trim();
            
            if (normalizedOld !== normalizedNew) {
                isSignificantUpdate = true;
            }
        }
        
        // Atualiza a nova estrutura preparando para RC2 e RID
        this.data.artifacts[stepId] = {
            content: content,
            updatedAt: new Date().toISOString(),
            version: (existingData && existingData.version) ? existingData.version + 1 : 1
        };
        
        // Invalida a revisão existente se houver
        if (this.data.reviews && this.data.reviews[stepId]) {
            delete this.data.reviews[stepId];
        }

        if (isSignificantUpdate) {
            this._invalidateSubsequentArtifacts(stepId);
        }
        
        this._notifyAndSave('ARTIFACT_SAVED');
        
        if (window.rgEventBus) {
            window.rgEventBus.emit('artifact:saved', { stepId, content });
        }
    }

    /**
     * Devolve o artefacto associado a uma etapa
     */
    getArtifact(stepId) {
        const artifactData = this.data.artifacts[stepId];
        if (!artifactData) return '';
        
        // Retro-compatibilidade com strings guardadas
        if (typeof artifactData === 'object' && artifactData.content !== undefined) {
            return artifactData.content;
        }
        
        return artifactData;
    }

    /**
     * Guarda os itens validados da checklist para uma etapa
     */
    saveChecklist(stepId, checkedItemIds) {
        if (!this.data.checklists) {
            this.data.checklists = {};
        }
        
        this.data.checklists[stepId] = {
            completed: checkedItemIds,
            updatedAt: new Date().toISOString(),
            version: 1
        };
        
        this._notifyAndSave('CHECKLIST_SAVED');
    }

    /**
     * Devolve os dados da checklist para uma etapa
     */
    getChecklist(stepId) {
        if (this.data.checklists && this.data.checklists[stepId]) {
            return this.data.checklists[stepId];
        }
        return { completed: [], updatedAt: null, version: 1 };
    }

    /**
     * Guarda uma revisão para uma etapa
     */
    saveReview(stepId, reviewData) {
        if (!this.data.reviews) {
            this.data.reviews = {};
        }
        
        this.data.reviews[stepId] = {
            ...reviewData,
            updatedAt: new Date().toISOString()
        };
        this._notifyAndSave('REVIEW_SAVED');
    }

    /**
     * Devolve a revisão para uma etapa
     */
    getReview(stepId) {
        if (this.data.reviews && this.data.reviews[stepId]) {
            return this.data.reviews[stepId];
        }
        return null;
    }

    /**
     * Determina o status lógico de uma etapa com base no estado do Workspace
     * Retorna: 'NOT_STARTED', 'IN_PROGRESS', ou 'COMPLETED'
     */
    getStepStatus(stepId) {
        const artifact = this.getArtifact(stepId);
        const checklist = this.getChecklist(stepId).completed;
        
        const hasArtifact = artifact.trim().length > 0;
        const hasChecklist = checklist.length > 0;

        // Se a etapa tiver artefacto preenchido e pelo menos um item da checklist validado, consideramos 'COMPLETED'
        // (No futuro, pode-se verificar se TODOS os itens da checklist obrigatórios estão validados)
        if (hasArtifact && hasChecklist) {
            return 'COMPLETED';
        }
        
        if (hasArtifact || hasChecklist) {
            return 'IN_PROGRESS';
        }
        
        return 'NOT_STARTED';
    }

    /**
     * Devolve o artefacto pelo seu "nome" interno, mapeando os passos para as chaves reais.
     * Necessário para o TemplateEngine saber que {{TEMA}} vem do STEP-INV-01.
     */
    getArtifactByVariable(varName) {
        const mapping = {
            'TEMA': 'STEP-INV-01',
            'PERGUNTA': 'STEP-INV-02',
            'OBJETIVOS': 'STEP-INV-03',
            'PALAVRAS_CHAVE': 'STEP-INV-04',
            'REFERENCIAS': 'STEP-INV-05',
            'FONTES_SELECIONADAS': 'STEP-INV-06',
            'NOTAS_LEITURA': 'STEP-INV-07',
            'SINTESE': 'STEP-INV-08',
            'RASCUNHO': 'STEP-INV-09'
        };
        
        const stepId = mapping[varName];
        if (stepId) {
            return this.getArtifact(stepId);
        }
        return '';
    }

    /**
     * Método interno: se alterar a etapa 2, os dados das etapas 3 para a frente ficam obsoletos
     * (Teste de Retrocesso).
     */
    _invalidateSubsequentArtifacts(changedStepId) {
        // Encontra o índice da etapa alterada no workflow (assumindo a ordem)
        // Por simplificação no MVP, vamos buscar ao WORKFLOWS global.
        if (!window.WORKFLOWS) return;
        
        const steps = window.WORKFLOWS[this.data.workflowId].steps;
        const changedIndex = steps.findIndex(s => s.id === changedStepId);
        
        if (changedIndex === -1) return;
        
        // Remove artefactos das etapas subsequentes
        let invalidatedCount = 0;
        for (let i = changedIndex + 1; i < steps.length; i++) {
            const stepId = steps[i].id;
            if (this.data.artifacts[stepId]) {
                delete this.data.artifacts[stepId];
                invalidatedCount++;
                
                // Remove do histórico para obrigar a passar por elas novamente
                this.data.history = this.data.history.filter(id => id !== stepId);
            }
            if (this.data.checklists && this.data.checklists[stepId]) {
                delete this.data.checklists[stepId];
                invalidatedCount++;
            }
        }
        
        if (invalidatedCount > 0 && window.rgEventBus) {
            window.rgEventBus.emit('toast:show', {
                message: 'Alterou uma etapa anterior da investigação. As etapas seguintes foram marcadas para revisão, de forma a preservar a consistência metodológica.',
                type: 'warning'
            });
        }
    }

    /**
     * Pede ao StorageService para persistir os dados
     */
    _notifyAndSave(actionType = 'UPDATED') {
        if (window.rgStorage) {
            window.rgStorage.saveWorkspace(this.data.id, this.data);
        }
        if (window.rgEventBus) {
            window.rgEventBus.emit('research:updated', this.buildResearchContext());
            window.rgEventBus.emit('workspace:updated', { type: actionType, workspace: this.data });
        }
    }

    /**
     * Constrói o contexto global da investigação consumido pelo Methodology Engine e UI.
     * @returns {object} Contexto consolidado
     */
    buildResearchContext() {
        const protocol = window.WORKFLOWS ? window.WORKFLOWS[this.data.workflowId] : null;
        return {
            research: {
                id: this.data.id,
                title: this.data.title || '',
                area: this.data.area || '',
                workflow: this.data.workflowId,
                status: this.data.status || 'draft',
                createdAt: this.data.createdAt,
                updatedAt: this.data.updatedAt
            },
            stage: {
                currentStepId: this.data.currentStepId
            },
            protocol: protocol,
            artifacts: Object.keys(this.data.artifacts || {}).reduce((acc, key) => {
                const val = this.data.artifacts[key];
                acc[key] = (typeof val === 'object' && val.content !== undefined) ? val.content : val;
                return acc;
            }, {}),
            progress: {
                completedSteps: Object.keys(this.data.artifacts || {}).length,
                totalSteps: protocol ? protocol.steps.length : 0
            },
            user: {}
        };
    }

    /**
     * Cria uma nova investigação com identidade definida (Ciclo de Vida: CREATING -> ACTIVE)
     */
    createWorkspace(metadata = {}) {
        const now = new Date().toISOString();
        this.data = {
            id: 'proj_' + Date.now(),
            title: metadata.title || 'Investigação Sem Título',
            area: metadata.area || 'Área não definida',
            workflowId: metadata.workflowId || (Object.keys(window.WORKFLOWS || {})[0] || 'default'),
            status: 'ACTIVE',
            createdAt: now,
            updatedAt: now,
            currentStepId: window.WORKFLOWS && window.WORKFLOWS[metadata.workflowId || (Object.keys(window.WORKFLOWS || {})[0] || 'default')] ? window.WORKFLOWS[metadata.workflowId || (Object.keys(window.WORKFLOWS || {})[0] || 'default')].steps[0].id : 'STEP-INV-01',
            artifacts: {},
            checklists: {},
            preferences: {},
            history: []
        };
        
        // Regista no Identity se existir
        if (window.rgResearchIdentity) {
            window.rgResearchIdentity._upsertWorkspaceRegistry(this.data);
        }
        
        this._notifyAndSave('CREATE_PROJECT');
    }

    /**
     * Repõe o estado da investigação (elimina todo o projeto atual)
     */
    resetWorkspace(actionType = 'WORKSPACE_RESET') {
        this.data = {
            id: 'proj_' + Date.now(),
            workflowId: (Object.keys(window.WORKFLOWS || {})[0] || 'default'),
            currentStepId: window.WORKFLOWS && window.WORKFLOWS[Object.keys(window.WORKFLOWS)[0]] ? window.WORKFLOWS[Object.keys(window.WORKFLOWS)[0]].steps[0].id : 'STEP-INV-01',
            title: '',
            area: '',
            status: 'ACTIVE',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            artifacts: {},
            checklists: {},
            preferences: {},
            history: []
        };
        this._notifyAndSave(actionType);
    }

    /**
     * Fecha o workspace atual sem guardar um novo projeto vazio.
     * Usado ao regressar à Home.
     */
    closeWorkspace() {
        this.data = {
            id: null,
            workflowId: (Object.keys(window.WORKFLOWS || {})[0] || 'default'),
            currentStepId: window.WORKFLOWS && window.WORKFLOWS[Object.keys(window.WORKFLOWS)[0]] ? window.WORKFLOWS[Object.keys(window.WORKFLOWS)[0]].steps[0].id : 'STEP-INV-01',
            title: '',
            area: '',
            status: 'draft',
            artifacts: {},
            checklists: {},
            preferences: {},
            history: []
        };
        if (window.rgResearchIdentity) {
            window.rgResearchIdentity.clearActiveWorkspace();
        }
        if (window.rgEventBus) {
            window.rgEventBus.emit('workspace:updated', { type: 'GO_HOME', workspace: this.data });
        }
    }
}

const workspace = new Workspace();
window.rgWorkspace = workspace;
