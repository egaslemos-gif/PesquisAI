/**
 * Engine: Orquestrador minimalista do Workflow.
 * Responsabilidades: Carrega workflow, determina próxima etapa, avança.
 * NÃO modifica os dados (isso é feito pelo Workspace).
 */

class Engine {
    constructor() {
        this.workspace = null;
        this.workflowDefinition = null;
    }

    init() {
        this.workspace = window.rgWorkspace;
        if (!this.workspace) {
            console.error('[Engine] Workspace não encontrado!');
            return;
        }

        const data = this.workspace.getData();
        const wfId = data.workflowId;
        
        // Verifica se WORKFLOWS global foi carregado
        if (wfId && window.WORKFLOWS && window.WORKFLOWS[wfId]) {
            this.workflowDefinition = window.WORKFLOWS[wfId];
        } else if (wfId) {
            console.warn(`[Engine] Workflow ${wfId} não encontrado. A usar o modo por defeito.`);
        }

        if (window.rgEventBus) {
            window.rgEventBus.on('workspace:loaded', () => this.evaluate({ type: 'INIT' }));
            window.rgEventBus.on('workspace:updated', (payload) => this.evaluate(payload));
        }

        // Dispara a avaliação inicial do estado assim que o Engine arranca
        this.evaluate({ type: 'INIT' });
    }

    evaluate(payload) {
        const data = this.workspace.getData();
        const wfId = data.workflowId && data.workflowId !== 'default' ? data.workflowId : 'WF-INV';
        
        // Sincronizar dinamicamente o protocolo atual sempre que houver avaliação de estado
        if (window.WORKFLOWS && window.WORKFLOWS[wfId]) {
            this.workflowDefinition = window.WORKFLOWS[wfId];
        } else if (window.WORKFLOWS && window.WORKFLOWS['WF-INV']) {
            this.workflowDefinition = window.WORKFLOWS['WF-INV'];
        }

        if (window.rgEventBus) {
            // Em vez de redirecionar automaticamente para MAIN no INIT,
            // abrimos no MAIN se houver um projeto ativo (refresh), caso contrário mostramos o Dashboard (EMPTY view).
            if (payload && payload.type === 'INIT') {
                if (data && (data.title || data.area) && data.id) {
                    window.rgEventBus.emit('engine:stateChanged', { view: 'MAIN', payload });
                } else {
                    window.rgEventBus.emit('engine:stateChanged', { view: 'EMPTY', payload });
                }
            } else if (payload && (payload.type === 'GO_HOME' || payload.type === 'DASHBOARD')) {
                window.rgEventBus.emit('engine:stateChanged', { view: 'EMPTY', payload });
            } else {
                // Para qualquer outro evento (novo projeto, gravar artefacto, etc), o utilizador deve continuar na MAIN view.
                window.rgEventBus.emit('engine:stateChanged', { view: 'MAIN', payload });
            }
        }
    }

    getWorkflow() {
        return this.workflowDefinition;
    }

    getCurrentStep() {
        if (!this.workflowDefinition || !this.workspace) return null;
        
        const currentStepId = this.workspace.getData().currentStepId;
        return this.workflowDefinition.steps.find(s => s.id === currentStepId);
    }

    getStepById(stepId) {
        if (!this.workflowDefinition) return null;
        return this.workflowDefinition.steps.find(s => s.id === stepId);
    }

    advance() {
        if (!this.workflowDefinition || !this.workspace) return;

        const currentStep = this.getCurrentStep();
        if (!currentStep) return;

        // Verifica validação antes de avançar
        if (window.rgValidation) {
            const validation = window.rgValidation.validateStep(currentStep.id);
            if (!validation.isValid) {
                if (window.rgEventBus) {
                    window.rgEventBus.emit('toast:show', {
                        message: validation.message || 'Preencha todos os requisitos antes de avançar.',
                        type: 'warning'
                    });
                }
                return false;
            }
        }

        const steps = this.workflowDefinition.steps;
        const currentIndex = steps.findIndex(s => s.id === currentStep.id);

        if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];
            // O Workspace trata de gravar e notificar
            this.workspace.setCurrentStep(nextStep.id);
            return true;
        } else {
            // Workflow concluído
            this.workspace.markAsCompleted();
            if (window.rgEventBus) {
                window.rgEventBus.emit('workflow:completed', this.workspace.getData());
            }
            return true;
        }
    }

    goToStep(stepId) {
        // Permitir retrocesso
        const targetStep = this.getStepById(stepId);
        if (targetStep) {
            this.workspace.setCurrentStep(stepId);
        }
    }

    previousStep() {
        if (!this.workflowDefinition || !this.workspace) return;
        
        const currentStep = this.getCurrentStep();
        if (!currentStep) return;
        
        const steps = this.workflowDefinition.steps;
        const currentIndex = steps.findIndex(s => s.id === currentStep.id);
        
        if (currentIndex > 0) {
            const prevStep = steps[currentIndex - 1];
            this.workspace.setCurrentStep(prevStep.id);
            return true;
        }
        return false;
    }
}

const engine = new Engine();
window.rgEngine = engine;
