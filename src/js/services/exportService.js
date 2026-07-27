/**
 * ExportService
 * Responsável por coordenar a exportação do Research Context para múltiplos formatos.
 */
class ExportService {
    async exportResearch({ format = 'docx', workspaceId = null }) {
        let context = null;

        if (workspaceId && window.rgStorage) {
            const data = window.rgStorage.loadWorkspace(workspaceId);
            if (!data) {
                window.rgToast?.show('Erro: Projeto não encontrado.', 'error');
                return;
            }
            const protocol = window.WORKFLOWS ? window.WORKFLOWS[data.workflowId] : null;
            context = {
                research: {
                    id: data.id,
                    title: data.title || '',
                    area: data.area || '',
                    workflow: data.workflowId,
                    status: data.status || 'draft',
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                },
                protocol: protocol,
                artifacts: data.artifacts || {},
                progress: {
                    completedSteps: Object.keys(data.artifacts || {}).length,
                    totalSteps: protocol ? protocol.steps.length : 0
                }
            };
        } else if (window.rgWorkspace) {
            context = window.rgWorkspace.buildResearchContext();
        } else {
            window.rgToast?.show('Erro: Workspace não disponível.', 'error');
            return;
        }
        
        // Obter RAR
        if (window.rgMethodology) {
            context.rar = window.rgMethodology.analyze(context);
        }

        const container = document.getElementById('export-status-container');
        const list = document.getElementById('export-status-list');
        
        const updateStatus = (msg) => {
            if (list) {
                const li = document.createElement('li');
                li.innerHTML = `✓ ${msg}`;
                list.appendChild(li);
            }
        };

        if (container) {
            container.style.display = 'block';
            if (list) list.innerHTML = '';
        }

        try {
            updateStatus('Recolher artefactos');
            // Simular pequeno delay para percepção do utilizador
            await new Promise(r => setTimeout(r, 400));
            
            updateStatus('Gerar estrutura');
            await new Promise(r => setTimeout(r, 400));

            if (format === 'docx') {
                if (!window.rgExportWord) {
                    throw new Error('Serviço ExportWord não está disponível.');
                }
                
                updateStatus('Construir Word');
                const blob = await window.rgExportWord.generate(context);
                
                updateStatus('Preparar download');
                await new Promise(r => setTimeout(r, 300));
                
                if (window.saveAs) {
                    const title = context.research.title || context.research.area || 'Investigacao';
                    const safeName = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    window.saveAs(blob, `${safeName}.docx`);
                    window.rgToast?.show('Documento criado com sucesso!', 'success');
                } else {
                    throw new Error('FileSaver não está disponível.');
                }
            } else {
                throw new Error(`Formato ${format} ainda não suportado.`);
            }

        } catch (error) {
            console.error('[ExportService] Falha na exportação:', error);
            window.rgToast?.show('Erro na exportação: ' + error.message, 'error');
        } finally {
            if (container) {
                setTimeout(() => {
                    container.style.display = 'none';
                }, 3000);
            }
        }
    }
}

window.rgExportService = new ExportService();
