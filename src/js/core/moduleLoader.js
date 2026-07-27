class ModuleLoader {
    constructor() {
        this.modules = new Map();
        window.WORKFLOWS = window.WORKFLOWS || {};
        window.PROMPTS = window.PROMPTS || {};
        window.KNOWLEDGE = window.KNOWLEDGE || {};
        window.CHECKLISTS = window.CHECKLISTS || {};
        
        // Relatório de diagnóstico
        this.report = {
            total: 0,
            success: 0,
            errors: 0,
            warnings: 0,
            logs: []
        };
    }

    _log(level, moduleId, message) {
        const logEntry = { level, moduleId, message };
        this.report.logs.push(logEntry);
        
        const prefix = `[ModuleLoader][${moduleId}]`;
        if (level === 'ERROR') {
            console.error(`${prefix} ${message}`);
            this.report.errors++;
        } else if (level === 'WARNING') {
            console.warn(`${prefix} ${message}`);
            this.report.warnings++;
        } else {
            console.info(`${prefix} ${message}`);
        }
    }

    /**
     * Valida o contrato (schema) do module.json
     */
    validateManifest(manifest) {
        const requiredFields = ['schemaVersion', 'id', 'title', 'version', 'role', 'workflow', 'assets'];
        for (const field of requiredFields) {
            if (!manifest[field]) {
                return { valid: false, reason: `Campo obrigatório em falta: ${field}` };
            }
        }
        
        if (!Array.isArray(manifest.assets)) {
            return { valid: false, reason: `'assets' deve ser um array` };
        }
        
        return { valid: true };
    }

    /**
     * Carrega um módulo individual pelo ID
     */
    async loadModule(moduleId) {
        try {
            this._log('INFO', moduleId, 'A iniciar carregamento...');
            
            const response = await fetch(`./src/assets/${moduleId}/module.json?v=${Date.now()}`);
            if (!response.ok) {
                this._log('ERROR', moduleId, `module.json não encontrado ou inacessível (HTTP ${response.status})`);
                return false;
            }
            
            let manifest;
            try {
                manifest = await response.json();
            } catch (e) {
                this._log('ERROR', moduleId, `module.json inválido ou corrompido: ${e.message}`);
                return false;
            }

            const validation = this.validateManifest(manifest);
            if (!validation.valid) {
                this._log('ERROR', moduleId, `Manifesto inválido - ${validation.reason}`);
                return false;
            }

            this.modules.set(moduleId, manifest);

            // Carregar Scripts do Workflow
            if (manifest.workflow) {
                const metaSuccess = await this._loadScript(`./src/assets/${moduleId}/${manifest.workflow}metadata.js`);
                if (!metaSuccess) this._log('WARNING', moduleId, 'metadata.js não encontrado (pode causar falhas visuais)');

                const stepsSuccess = await this._loadScript(`./src/assets/${moduleId}/${manifest.workflow}steps.js`);
                if (!stepsSuccess) {
                    this._log('ERROR', moduleId, 'steps.js não encontrado. O módulo é inútil sem passos.');
                    return false;
                }
                
                if (window.WORKFLOW_METADATA && window.WORKFLOW_METADATA[moduleId] && window.WORKFLOW_STEPS && window.WORKFLOW_STEPS[moduleId]) {
                    window.WORKFLOWS[moduleId] = {
                        ...window.WORKFLOW_METADATA[moduleId],
                        steps: window.WORKFLOW_STEPS[moduleId]
                    };
                } else {
                    this._log('ERROR', moduleId, 'Os scripts do workflow não declararam as variáveis globais corretamente.');
                    return false;
                }
            }

            // Carregar Assets
            for (const asset of manifest.assets) {
                const assetSuccess = await this._loadScript(`./src/assets/${moduleId}/${asset}.js`);
                if (!assetSuccess) {
                    if (asset === 'examples') {
                        this._log('INFO', moduleId, `Asset opcional ausente: ${asset}.js`);
                    } else {
                        this._log('WARNING', moduleId, `Asset não carregado: ${asset}.js (pode causar falhas de UI)`);
                    }
                }
            }

            this._log('INFO', moduleId, 'Carregamento concluído com sucesso ✓');
            this.report.success++;
            return true;
        } catch (error) {
            this._log('ERROR', moduleId, `Falha inesperada durante o carregamento: ${error.message}`);
            return false;
        }
    }

    _loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => {
                resolve(false); 
            };
            document.head.appendChild(script);
        });
    }

    /**
     * Imprime o relatório final
     */
    _printReport() {
        console.groupCollapsed('%c[ModuleLoader] %cRelatório de Inicialização', 'color: #3b82f6; font-weight: bold;', 'color: inherit;');
        console.log(`Total de Módulos: ${this.report.total}`);
        console.log(`%c✓ Sucesso: ${this.report.success}`, 'color: #10b981;');
        if (this.report.warnings > 0) console.log(`%c⚠ Avisos: ${this.report.warnings}`, 'color: #f59e0b;');
        if (this.report.errors > 0) console.log(`%c✗ Erros: ${this.report.errors}`, 'color: #ef4444;');
        
        console.groupCollapsed('Detalhes dos Logs');
        this.report.logs.forEach(log => {
            const color = log.level === 'ERROR' ? '#ef4444' : log.level === 'WARNING' ? '#f59e0b' : '#6b7280';
            console.log(`%c[${log.moduleId}] [${log.level}] ${log.message}`, `color: ${color};`);
        });
        console.groupEnd();
        console.groupEnd();
    }

    /**
     * Inicializa todos os módulos através do modules_registry.json
     */
    async initAll() {
        try {
            console.log('[ModuleLoader] A procurar modules_registry.json...');
            const registryResponse = await fetch('./src/assets/modules_registry.json?v=' + Date.now());
            
            if (!registryResponse.ok) {
                throw new Error('modules_registry.json não encontrado. Abortando inicialização modular.');
            }
            
            const registry = await registryResponse.json();
            const modules = registry.modules || [];
            this.report.total = modules.length;
            
            for (const mod of modules) {
                await this.loadModule(mod);
            }
            
            this._printReport();
            
        } catch (err) {
            console.error('[ModuleLoader] Falha crítica ao inicializar registry:', err);
        }
    }
}

window.rgModuleLoader = new ModuleLoader();
