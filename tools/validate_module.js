const fs = require('fs');
const path = require('path');

class ModuleValidator {
    constructor(moduleId) {
        this.moduleId = moduleId;
        this.baseDir = path.join(__dirname, '..', 'src', 'assets', moduleId);
        this.report = {
            errors: 0,
            warnings: 0,
            infos: 0,
            logs: []
        };
    }

    _log(level, msg) {
        this.report.logs.push({ level, msg });
        if (level === 'ERROR') this.report.errors++;
        if (level === 'WARNING') this.report.warnings++;
        if (level === 'INFO') this.report.infos++;
        
        const prefix = `[${level}]`;
        if (level === 'ERROR') console.error(`\x1b[31m${prefix}\x1b[0m ${msg}`);
        else if (level === 'WARNING') console.warn(`\x1b[33m${prefix}\x1b[0m ${msg}`);
        else console.info(`\x1b[34m${prefix}\x1b[0m ${msg}`);
    }

    validate() {
        console.log(`\n\x1b[1mValidação do Módulo: ${this.moduleId}\x1b[0m`);
        console.log(`Caminho: ${this.baseDir}\n`);

        if (!fs.existsSync(this.baseDir)) {
            this._log('ERROR', `Diretório do módulo não encontrado: ${this.baseDir}`);
            return this._printReport();
        }

        const manifestPath = path.join(this.baseDir, 'module.json');
        if (!fs.existsSync(manifestPath)) {
            this._log('ERROR', `module.json inexistente`);
            return this._printReport();
        }

        let manifest;
        try {
            manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        } catch (e) {
            this._log('ERROR', `module.json não é um JSON válido: ${e.message}`);
            return this._printReport();
        }

        // 1. Validação do schemaVersion
        if (!manifest.schemaVersion) {
            this._log('ERROR', 'schemaVersion em falta');
        } else if (manifest.schemaVersion !== "1.0") {
            this._log('ERROR', `schemaVersion inválida: ${manifest.schemaVersion} (esperado: 1.0)`);
        } else {
            this._log('INFO', 'schemaVersion válido');
        }

        // 2. Outros campos obrigatórios
        const req = ['id', 'title', 'version', 'role', 'status', 'minCoreVersion', 'workflow', 'assets'];
        req.forEach(f => {
            if (!manifest[f]) this._log('ERROR', `Campo obrigatório em falta: ${f}`);
        });
        
        if (!manifest.title) {
            this._log('WARNING', 'Descrição (title) vazia');
        }

        if (!manifest.assets || !Array.isArray(manifest.assets)) {
            this._log('ERROR', 'assets deve ser um array');
            return this._printReport(); // Impossível continuar a validação profunda
        }

        // 3. Verifica ficheiros do workflow
        let stepsContent = '';
        if (manifest.workflow) {
            const workflowDir = path.join(this.baseDir, manifest.workflow);
            if (!fs.existsSync(workflowDir)) {
                this._log('ERROR', `Diretório do workflow inexistente: ${workflowDir}`);
            } else {
                const metaPath = path.join(workflowDir, 'metadata.js');
                const stepsPath = path.join(workflowDir, 'steps.js');
                
                if (!fs.existsSync(metaPath)) this._log('WARNING', 'metadata.js inexistente');
                
                if (!fs.existsSync(stepsPath)) {
                    this._log('ERROR', 'steps.js inexistente');
                } else {
                    stepsContent = fs.readFileSync(stepsPath, 'utf8');
                    if (stepsContent.trim() === '') {
                        this._log('ERROR', 'steps.js vazio');
                    } else {
                        // Tenta extrair a estrutura steps usando eval (em ambiente controlado)
                        // Para simplificar a validação, procuramos por propriedades-chave
                        if (!stepsContent.includes('id:') && !stepsContent.includes('"id":')) {
                             this._log('ERROR', 'O ficheiro steps.js não parece conter passos válidos');
                        }
                    }
                }
            }
        }

        // 4. Verificação de assets e consistência
        const hasAsset = (name) => manifest.assets.includes(name) && fs.existsSync(path.join(this.baseDir, `${name}.js`));
        
        manifest.assets.forEach(asset => {
            const p = path.join(this.baseDir, `${asset}.js`);
            if (!fs.existsSync(p)) {
                if (asset === 'examples') {
                    this._log('WARNING', `Asset opcional ausente: ${asset}.js`);
                } else {
                    this._log('ERROR', `Asset declarado mas inexistente: ${asset}.js`);
                }
            } else {
                const content = fs.readFileSync(p, 'utf8');
                if (content.trim() === '') {
                    this._log('WARNING', `Ficheiro de asset vazio: ${asset}.js`);
                }
            }
        });

        // 5. Consistência Relacional (Regex-based para evitar AST complexo)
        // Check prompts
        if (hasAsset('prompts')) {
            const pContent = fs.readFileSync(path.join(this.baseDir, 'prompts.js'), 'utf8');
            
            // Extract all prompt IDs referenced in steps
            const ptMatches = stepsContent.match(/"(PT-[^"]+)"/g) || stepsContent.match(/'(PT-[^']+)'/g) || [];
            ptMatches.forEach(pt => {
                const id = pt.replace(/['"]/g, '');
                if (!pContent.includes(`"${id}"`) && !pContent.includes(`'${id}'`)) {
                    this._log('ERROR', `promptId inexistente em prompts.js: ${id}`);
                }
            });
            this._log('INFO', `${ptMatches.length} referências a prompts verificadas`);
        }

        // Check knowledge
        if (hasAsset('knowledge')) {
            const kContent = fs.readFileSync(path.join(this.baseDir, 'knowledge.js'), 'utf8');
            const knMatches = stepsContent.match(/(KN-[A-Z0-9-]+)/g) || [];
            knMatches.forEach(kn => {
                if (!kContent.includes(kn)) {
                    this._log('ERROR', `knowledgeId inexistente em knowledge.js: ${kn}`);
                }
            });
            this._log('INFO', `${knMatches.length} referências a knowledge verificadas`);
        }

        // Check checklists
        if (hasAsset('checklists')) {
            const cContent = fs.readFileSync(path.join(this.baseDir, 'checklists.js'), 'utf8');
            const chkMatches = stepsContent.match(/(CHK-[A-Z0-9-]+)/g) || [];
            chkMatches.forEach(chk => {
                if (!cContent.includes(chk)) {
                    this._log('ERROR', `checklistId inexistente em checklists.js: ${chk}`);
                }
            });
            this._log('INFO', `${chkMatches.length} referências a checklists verificadas`);
        }
        
        return this._printReport();
    }

    _printReport() {
        console.log('\n========================================');
        console.log('\x1b[1mResumo da Validação\x1b[0m');
        console.log(`Erros: \x1b[31m${this.report.errors}\x1b[0m`);
        console.log(`Avisos: \x1b[33m${this.report.warnings}\x1b[0m`);
        console.log(`Infos: \x1b[34m${this.report.infos}\x1b[0m`);
        
        if (this.report.errors > 0) {
            console.log('\n\x1b[41m\x1b[37m ✗ MÓDULO REJEITADO \x1b[0m');
            return false;
        } else {
            console.log('\n\x1b[42m\x1b[30m ✓ MÓDULO CERTIFICADO \x1b[0m');
            return true;
        }
    }
}

// Execução a partir de CLI
const moduleId = process.argv[2];
if (!moduleId) {
    console.error("Por favor providencie o ID do módulo. Exemplo: node validate_module.js WF-INV");
    process.exit(1);
}

const validator = new ModuleValidator(moduleId);
const isValid = validator.validate();
if (!isValid) process.exit(1);
