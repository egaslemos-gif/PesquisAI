/**
 * DocumentService
 * Responsável por gerar documentos (Word) e gerir Backups (JSON).
 */

class DocumentService {
    
    /**
     * Exporta o projeto atual para um documento MS Word (.docx)
     * @param {string} workspaceId 
     */
    async exportToWord(workspaceId) {
        if (!window.docx) {
            console.error('[DocumentService] Biblioteca docx não está carregada.');
            window.rgToast.show('Erro: Biblioteca de exportação em falta', 'error');
            return;
        }

        const storageData = window.rgStorage ? window.rgStorage.loadWorkspace(workspaceId) : null;
        if (!storageData) {
            window.rgToast.show('Erro: Projeto não encontrado.', 'error');
            return;
        }

        const rid = window.rgResearchIdentity ? window.rgResearchIdentity.getData().id : 'Desconhecido';
        const area = storageData.title || storageData.area || 'Projeto sem título';
        const protocolId = storageData.workflowId || 'Desconhecido';
        const dateStr = new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });

        const { Document, Packer, Paragraph, TextRun, HeadingLevel } = window.docx;

        const children = [];

        // 1. Cabeçalho Principal e Metadados
        children.push(new Paragraph({ text: area, heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }));
        
        children.push(new Paragraph({
            children: [
                new TextRun({ text: "RID: ", bold: true }),
                new TextRun(rid),
            ],
            spacing: { after: 100 }
        }));
        children.push(new Paragraph({
            children: [
                new TextRun({ text: "Protocolo: ", bold: true }),
                new TextRun(protocolId),
            ],
            spacing: { after: 100 }
        }));
        children.push(new Paragraph({
            children: [
                new TextRun({ text: "Exportado a: ", bold: true }),
                new TextRun(dateStr),
            ],
            spacing: { after: 400 }
        }));

        // 2. Etapas e Artefactos
        const workflow = window.WORKFLOWS[protocolId];
        if (workflow && workflow.steps) {
            workflow.steps.forEach(step => {
                const artifactContent = storageData.artifacts ? storageData.artifacts[step.id] : null;
                
                // Só exporta etapas que têm artefacto
                if (artifactContent && artifactContent.trim() !== '') {
                    // Título da Etapa
                    children.push(new Paragraph({ 
                        text: step.title, 
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    }));

                    // Estratégia utilizada (opcional, se gravado no passo... neste momento não guardamos por passo, mas sim global, ou poderíamos listar)
                    // Conteúdo do Artefacto (podemos ter parágrafos se houver \n)
                    const lines = artifactContent.split('\n');
                    lines.forEach(line => {
                        children.push(new Paragraph({
                            text: line,
                            spacing: { after: 120 }
                        }));
                    });

                    // Revisão Metodológica
                    const review = storageData.reviews ? storageData.reviews[step.id] : null;
                    if (review) {
                        children.push(new Paragraph({
                            children: [
                                new TextRun({ text: "Revisão Metodológica: ", bold: true }),
                                new TextRun({ text: review.status, bold: true, color: review.status === 'PASS' ? '166534' : (review.status === 'WARNING' ? '9A3412' : '991B1B') })
                            ],
                            spacing: { before: 200, after: 100 }
                        }));

                        if (review.feedback) {
                            const fLines = review.feedback.split('\n');
                            fLines.forEach(fLine => {
                                children.push(new Paragraph({
                                    text: fLine,
                                    italics: true
                                }));
                            });
                        }
                    }
                }
            });
        }

        const doc = new Document({
            creator: "Guia do Investigador",
            title: area,
            description: "Documento exportado do Guia do Investigador",
            sections: [{
                properties: {},
                children: children
            }]
        });

        try {
            const blob = await Packer.toBlob(doc);
            if (window.saveAs) {
                // Remove caracteres especiais para o nome do ficheiro
                const safeName = area.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                window.saveAs(blob, `guia_${safeName}.docx`);
                window.rgToast.show('Documento exportado com sucesso!', 'success');
            } else {
                console.error('[DocumentService] FileSaver não está disponível.');
                window.rgToast.show('Erro: Funcionalidade de download em falta.', 'error');
            }
        } catch (e) {
            console.error('[DocumentService] Erro ao exportar:', e);
            window.rgToast.show('Erro ao gerar o documento Word.', 'error');
        }
    }

    /**
     * Exporta o backup do projeto para um ficheiro JSON
     * @param {string} workspaceId 
     */
    exportBackup(workspaceId) {
        if (!window.saveAs) {
            window.rgToast.show('Erro: Funcionalidade de download em falta.', 'error');
            return;
        }

        const storageData = window.rgStorage ? window.rgStorage.loadWorkspace(workspaceId) : null;
        if (!storageData) {
            window.rgToast.show('Erro: Projeto não encontrado.', 'error');
            return;
        }

        const backupData = {
            schemaVersion: 2,
            applicationVersion: '1.0.0', // Versão da aplicação
            exportedAt: new Date().toISOString(),
            workspace: storageData
        };

        const jsonStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
        
        const area = storageData.area || 'projeto';
        const safeName = area.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        
        window.saveAs(blob, `backup_${safeName}_${Date.now()}.json`);
        window.rgToast.show('Backup gerado com sucesso!', 'success');
    }

    /**
     * Aciona o processo de restauro pedindo um ficheiro
     */
    triggerRestore() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.style.display = 'none';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    this.showRestoreConfirmation(data);
                } catch (err) {
                    console.error('[DocumentService] Ficheiro inválido:', err);
                    window.rgToast.show('Ficheiro de backup inválido ou corrompido.', 'error');
                }
            };
            reader.readAsText(file);
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }

    /**
     * Mostra o modal de confirmação antes de restaurar
     */
    showRestoreConfirmation(data) {
        if (!data || !data.workspace) {
            window.rgToast.show('Formato de backup não suportado.', 'error');
            return;
        }

        const area = data.workspace.area || 'Sem Nome';
        const version = data.applicationVersion || '1.0';
        const exportedAt = new Date(data.exportedAt).toLocaleDateString('pt-PT');
        const step = data.workspace.currentStepId || 'Desconhecida';

        // Remover modal se existir
        const existing = document.getElementById('restore-modal');
        if (existing) existing.remove();

        const html = `
            <div id="restore-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 9999;">
                <div style="background: white; padding: 24px; border-radius: 8px; width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                    <h3 style="margin-top: 0; margin-bottom: 16px;">Restaurar Backup</h3>
                    
                    <div style="background: #f8fafc; padding: 12px; border-radius: 4px; margin-bottom: 24px; font-size: 14px;">
                        <div style="margin-bottom: 8px;"><strong>Nome:</strong> ${area}</div>
                        <div style="margin-bottom: 8px;"><strong>Exportado a:</strong> ${exportedAt}</div>
                        <div style="margin-bottom: 8px;"><strong>Versão:</strong> ${version}</div>
                        <div><strong>Etapa atual:</strong> ${step}</div>
                    </div>
                    
                    <div style="display: flex; justify-content: flex-end; gap: 12px;">
                        <button onclick="document.getElementById('restore-modal').remove()" style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;">Cancelar</button>
                        <button id="btn-confirm-restore" style="padding: 8px 16px; border: none; background: var(--color-primary-600); color: white; border-radius: 4px; cursor: pointer;">Importar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        document.getElementById('btn-confirm-restore').addEventListener('click', () => {
            this.processRestore(data.workspace);
            document.getElementById('restore-modal').remove();
        });
    }

    /**
     * Efetiva a importação do workspace
     */
    processRestore(workspaceData) {
        if (!workspaceData.id) {
            workspaceData.id = 'proj_' + Date.now();
        }

        // Grava na storage
        if (window.rgStorage) {
            window.rgStorage.saveWorkspace(workspaceData.id, workspaceData);
        }

        // Adiciona à identidade se não existir
        if (window.rgResearchIdentity) {
            const ridData = window.rgResearchIdentity.getData();
            if (!ridData.workspaces[workspaceData.id]) {
                ridData.workspaces[workspaceData.id] = {
                    createdAt: new Date().toISOString(),
                    lastAccess: new Date().toISOString()
                };
            }
            ridData.workspaces[workspaceData.id].name = workspaceData.area;
            ridData.workspaces[workspaceData.id].workflowId = workspaceData.workflowId;
            ridData.workspaces[workspaceData.id].currentStepId = workspaceData.currentStepId;
            ridData.activeWorkspaceId = workspaceData.id;
            window.rgResearchIdentity._save();
        }

        window.rgToast.show('Projeto restaurado com sucesso!', 'success');
        
        // Força reload no engine
        setTimeout(() => {
            window.location.href = window.location.pathname; // Reload limpo
        }, 1000);
    }
}

const documentService = new DocumentService();
window.rgDocumentService = documentService;
