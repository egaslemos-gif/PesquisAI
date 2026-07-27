/**
 * Backup Service: Gere a portabilidade dos dados do Guia do Investigador.
 * Implementa exportação estruturada e importação com validação.
 */

class BackupService {
    constructor() {
        this.signature = 'guia-do-investigador';
        this.version = '1.0';
    }

    /**
     * Exporta todo o estado local (chaves com prefixo rg_) para um ficheiro JSON
     */
    export() {
        const data = {};
        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key.startsWith('rg_')) {
                data[key] = window.localStorage.getItem(key);
            }
        }

        const payload = {
            signature: this.signature,
            backupVersion: this.version,
            appVersion: window.APP_VERSION || '1.0.0',
            createdAt: new Date().toISOString(),
            data: data
        };

        const jsonString = JSON.stringify(payload, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const date = new Date();
        const dateString = date.toISOString().replace(/[:.]/g, '-').slice(0, 16).replace('T', '_');
        const filename = `guia_investigador_backup_${dateString}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Valida e analisa um ficheiro de backup sem o importar ainda.
     * Retorna os metadados para apresentação ao utilizador.
     */
    async analyzeFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    
                    if (content.signature !== this.signature) {
                        return reject(new Error("Assinatura inválida. Este ficheiro não parece ser um backup do Guia do Investigador."));
                    }

                    // Count items
                    let workspaceCount = 0;
                    let hasIdentity = false;

                    if (content.data) {
                        for (const key of Object.keys(content.data)) {
                            if (key.startsWith('rg_workspace_')) workspaceCount++;
                            if (key === 'rg_identity') hasIdentity = true;
                        }
                    }

                    resolve({
                        valid: true,
                        version: content.appVersion || 'Desconhecida',
                        createdAt: content.createdAt,
                        stats: {
                            workspaces: workspaceCount,
                            hasIdentity: hasIdentity
                        },
                        rawData: content.data // Guardado para o passo de commit
                    });

                } catch (err) {
                    reject(new Error("O ficheiro não é um JSON válido."));
                }
            };
            reader.onerror = () => reject(new Error("Erro ao ler o ficheiro."));
            reader.readAsText(file);
        });
    }

    /**
     * Aplica os dados do backup ao localStorage.
     * Atualmente suporta apenas restauração completa (apaga tudo o que é rg_ e substitui).
     */
    commitImport(dataToImport) {
        if (!dataToImport) return false;

        try {
            // 1. Limpar todos os rg_ atuais
            const keysToRemove = [];
            for (let i = 0; i < window.localStorage.length; i++) {
                const key = window.localStorage.key(i);
                if (key.startsWith('rg_')) {
                    keysToRemove.push(key);
                }
            }
            keysToRemove.forEach(k => window.localStorage.removeItem(k));

            // 2. Injetar os novos
            for (const [key, value] of Object.entries(dataToImport)) {
                window.localStorage.setItem(key, value);
            }

            return true;
        } catch (error) {
            console.error('[BackupService] Erro a comitar importação:', error);
            return false;
        }
    }
}

window.rgBackup = new BackupService();
