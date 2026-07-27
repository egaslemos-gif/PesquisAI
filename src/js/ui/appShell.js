/**
 * AppShell: Gere as vistas de alto nível (Empty State, Main Workflow, Biblioteca de Prompts)
 */

class AppShell {
    constructor() {
        this.container = null;
        this.header = null;
    }

    init() {
        this.container = document.getElementById('main-content');
        this.header = document.getElementById('app-header');

        if (window.rgEventBus) {
            window.rgEventBus.on('engine:stateChanged', (payload) => this.render(payload.view));
            
            window.rgEventBus.on('artifact:saved', () => {
                const indicator = document.getElementById('autosave-indicator');
                if (indicator) {
                    indicator.classList.remove('hidden');
                    // Force animation reset
                    indicator.style.animation = 'none';
                    indicator.offsetHeight; /* trigger reflow */
                    indicator.style.animation = null; 
                }
            });
        }

        const resetBtn = document.getElementById('btn-reset-project');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this._showWizardModal();
            });
        }

        const homeBtn = document.getElementById('btn-go-home');
        const logoBtn = document.getElementById('app-logo');
        const handleGoHome = () => {
            const hasActiveProject = window.rgWorkspace && window.rgWorkspace.getData().id;
            
            if (hasActiveProject) {
                if (window.rgEvents && typeof window.rgEvents.handleSave === 'function') {
                    window.rgEvents.handleSave();
                }
                if (window.rgEventBus) {
                    window.rgEventBus.emit('toast:show', { message: '✓ Projeto guardado. A regressar ao Dashboard...', type: 'success' });
                }
                setTimeout(() => {
                    if (window.rgWorkspace) window.rgWorkspace.closeWorkspace();
                }, 500);
            } else {
                if (window.rgWorkspace) window.rgWorkspace.closeWorkspace();
            }
        };

        if (homeBtn) {
            homeBtn.addEventListener('click', handleGoHome);
        }
        if (logoBtn) {
            logoBtn.addEventListener('click', handleGoHome);
        }

        if (window.rgEventBus) {
            window.rgEventBus.on('navigation:home', handleGoHome);
            window.rgEventBus.on('navigation:new-project', () => {
                this._showWizardModal();
            });
        }

        this._initGlobalMenu();
    }

    _initGlobalMenu() {
        const btns = [
            document.getElementById('btn-global-menu'),
            document.getElementById('workflow-badge')
        ].filter(Boolean);
        
        const fileInput = document.getElementById('backup-file-input');
        
        if (btns.length === 0) return;

        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const existing = document.getElementById('rg-global-menu');
                if (existing) {
                    existing.remove();
                    // If we clicked a different button, we should still open the new one
                    if (existing.getAttribute('data-trigger') === btn.id) {
                        return;
                    }
                }

                const rect = btn.getBoundingClientRect();
                const menu = document.createElement('div');
                menu.id = 'rg-global-menu';
                menu.setAttribute('data-trigger', btn.id);
                
                // Keep it on screen
                let leftPos = rect.right + window.scrollX - 250;
                if (leftPos < 10) leftPos = 10;

                menu.style.cssText = `
                    position: absolute;
                    top: ${rect.bottom + window.scrollY + 8}px;
                    left: ${leftPos}px;
                    width: 250px;
                    background: white;
                    border: 1px solid var(--color-gray-200);
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    z-index: 10000;
                    padding: 8px 0;
                    font-size: 13px;
                    color: var(--color-gray-800);
                `;

                let rid = 'Desconhecido';
                if (window.rgResearchIdentity) {
                    rid = window.rgResearchIdentity.getIdentity().id || rid;
                }

                const html = `
                    <!-- Perfil -->
                    <div style="padding: 4px 16px; font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: bold;">👤 O Meu Perfil</div>
                    <div style="padding: 4px 16px 12px 16px;">
                        <div style="font-weight: 500;">RID: <span style="font-family: monospace; color: var(--color-primary);">${rid}</span></div>
                        <div style="color: var(--color-gray-600); font-size: 12px;">Universidade Licungo</div>
                    </div>
                    
                    <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                    
                    <!-- Dados -->
                    <div style="padding: 8px 16px 4px 16px; font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: bold;">📂 Dados</div>
                    <div class="menu-item" data-action="backup-export" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        ${window.SVGIcons?.download || '↓'} Exportar Backup
                    </div>
                    <div class="menu-item" data-action="backup-import" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        ${window.SVGIcons?.upload || '↑'} Importar Backup
                    </div>

                    <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                    
                    <!-- Aplicação -->
                    <div style="padding: 8px 16px 4px 16px; font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: bold;">⚙️ Aplicação</div>
                    <div class="menu-item" data-action="preferences" style="padding: 8px 16px; cursor: default; display: flex; align-items: center; gap: 8px; color: var(--color-gray-400);">
                        ${window.SVGIcons?.settings || '⚙'} Preferências
                    </div>
                    <div class="menu-item" data-action="about" style="padding: 8px 16px; cursor: default; display: flex; align-items: center; gap: 8px; color: var(--color-gray-400);">
                        ${window.SVGIcons?.info || 'i'} Sobre
                    </div>
                `;
                menu.innerHTML = html;
                document.body.appendChild(menu);

                const items = menu.querySelectorAll('.menu-item');
                items.forEach(item => {
                    if (item.getAttribute('data-action') === 'preferences' || item.getAttribute('data-action') === 'about') return;
                    
                    item.addEventListener('mouseenter', () => item.style.background = 'var(--color-gray-100)');
                    item.addEventListener('mouseleave', () => item.style.background = 'transparent');
            // Handlers
            menu.querySelector('[data-action="backup-export"]').addEventListener('click', () => {
                menu.remove();
                if (window.rgBackup) {
                    window.rgBackup.export();
                    if (window.rgEventBus) {
                        window.rgEventBus.emit('toast:show', { message: 'Backup gerado com sucesso.', type: 'success' });
                    }
                }
            });

            menu.querySelector('[data-action="backup-import"]').addEventListener('click', () => {
                menu.remove();
                if (fileInput) {
                    fileInput.click();
                }
            });

            const closeMenu = (e) => {
                if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        });

        if (fileInput) {
            fileInput.addEventListener('change', async (e) => {
                if (e.target.files.length === 0) return;
                const file = e.target.files[0];
                e.target.value = ''; // reset

                try {
                    const analysis = await window.rgBackup.analyzeFile(file);
                    this._showImportModal(analysis);
                } catch (error) {
                    if (window.rgEventBus) {
                        window.rgEventBus.emit('toast:show', { message: error.message, type: 'error' });
                    } else {
                        alert(error.message);
                    }
                }
            });
        }
    }

    _showImportModal(analysis) {
        // Modal de confirmação da importação
        const existing = document.getElementById('rg-import-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'rg-import-modal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.4); z-index: 100000;
            display: flex; align-items: center; justify-content: center;
        `;

        const dateFormatted = new Date(analysis.createdAt).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' });

        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; width: 450px; max-width: 90%; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                <h3 style="margin: 0 0 16px 0; font-size: 18px;">Restaurar Backup</h3>
                <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: var(--color-gray-700);">O ficheiro contém:</p>
                    <ul style="margin: 0 0 12px 0; padding-left: 20px; font-size: 14px; color: var(--color-gray-800);">
                        <li>✔ <strong>${analysis.stats.workspaces}</strong> Projetos/Investigações</li>
                        <li>✔ <strong>${analysis.stats.hasIdentity ? '1' : '0'}</strong> Identidade de Utilizador</li>
                        <li>✔ Backup criado em <strong>${dateFormatted}</strong></li>
                    </ul>
                    <p style="margin: 0; font-size: 12px; color: var(--color-gray-500);">Versão: ${analysis.version}</p>
                </div>

                <p style="font-size: 14px; color: var(--color-gray-700); margin-bottom: 16px;">
                    <strong>O que pretende fazer?</strong>
                </p>

                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
                    <label style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; border: 1px solid var(--color-primary); border-radius: 8px; background: #eff6ff; cursor: pointer;">
                        <input type="radio" name="import-strategy" value="replace" checked style="margin-top: 2px;">
                        <div>
                            <div style="font-weight: 500; font-size: 14px; color: var(--color-primary-dark);">Restaurar completamente</div>
                            <div style="font-size: 12px; color: var(--color-gray-600); margin-top: 4px;">Apaga os dados atuais deste dispositivo e substitui-os pelo conteúdo do backup.</div>
                        </div>
                    </label>
                    <label style="display: flex; gap: 12px; align-items: flex-start; padding: 12px; border: 1px solid var(--color-gray-200); border-radius: 8px; background: white; opacity: 0.5; cursor: not-allowed;">
                        <input type="radio" name="import-strategy" value="merge" disabled style="margin-top: 2px;">
                        <div>
                            <div style="font-weight: 500; font-size: 14px; color: var(--color-gray-800);">Substituir apenas projetos correspondentes</div>
                            <div style="font-size: 12px; color: var(--color-gray-500); margin-top: 4px;">(Brevemente) Fusão inteligente sem apagar outros projetos locais.</div>
                        </div>
                    </label>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 12px;">
                    <button class="btn btn-ghost" id="btn-import-cancel">Cancelar</button>
                    <button class="btn btn-primary" id="btn-import-confirm">Importar e Reiniciar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('#btn-import-cancel').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('#btn-import-confirm').addEventListener('click', () => {
            const success = window.rgBackup.commitImport(analysis.rawData);
            if (success) {
                modal.innerHTML = `
                    <div style="background: white; border-radius: 12px; width: 400px; max-width: 90%; padding: 32px 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                        <h3 style="margin: 0 0 16px 0; font-size: 18px;">Importação Concluída</h3>
                        <p style="font-size: 14px; color: var(--color-gray-600); margin-bottom: 24px;">Os seus dados foram restaurados com sucesso.</p>
                        <button class="btn btn-primary" style="width: 100%;" onclick="window.location.reload();">Reiniciar Aplicação</button>
                    </div>
                `;
            } else {
                if (window.rgEventBus) {
                    window.rgEventBus.emit('toast:show', { message: 'Falha ao importar backup.', type: 'error' });
                }
                modal.remove();
            }
        });
    }

    render(view) {
        this._updateWorkflowBadge();
        if (view === 'EMPTY') {
            this.renderEmptyState();
        } else if (view === 'MAIN') {
            this.renderMainWorkspace();
        }
    }

    _updateWorkflowBadge() {
        const badge = document.getElementById('workflow-badge');
        if (!badge || !window.WORKFLOWS) return;
        
        let protocolId = null;
        if (window.rgWorkspace && window.rgWorkspace.getData().id) {
            protocolId = window.rgWorkspace.getData().workflowId;
        } else if (window.rgResearchIdentity) {
            protocolId = window.rgResearchIdentity.getData().preferredProtocol;
        }
        
        if (protocolId && window.WORKFLOWS[protocolId]) {
            const protocol = window.WORKFLOWS[protocolId];
            badge.title = protocol.title;
            const textSpan = badge.querySelector('.btn-text');
            if (textSpan) textSpan.innerText = protocol.title;
            
            const iconSlot = badge.querySelector('.icon-slot');
            if (iconSlot) {
                // Change icon based on role if needed
                iconSlot.dataset.icon = protocol.role === 'supervisor' ? 'users' : 'user';
                if (window.lucide) window.lucide.createIcons({ attrs: { class: 'lucide' } });
            }
        }
    }

    renderEmptyState() {
        if (!this.projectExplorer) {
            this.projectExplorer = new ProjectExplorer(this.container);
        }
        this.projectExplorer.render();
    }

    createDropdown(wid, isArchived, targetEl) {
        // Remove dropdown antigo se existir
        const existing = document.getElementById('rg-workspace-menu');
        if (existing) existing.remove();

        const rect = targetEl.getBoundingClientRect();
        
        const menu = document.createElement('div');
        menu.id = 'rg-workspace-menu';
        menu.style.cssText = `
            position: absolute;
            top: ${rect.bottom + window.scrollY + 8}px;
            left: ${rect.right + window.scrollX - 200}px;
            width: 200px;
            background: white;
            border: 1px solid var(--color-gray-200);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            padding: 8px 0;
            font-size: 13px;
            color: var(--color-gray-800);
        `;

        let html = '';
        if (!isArchived) {
            html += `
                <div class="menu-item" data-action="open" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: var(--font-semibold);">${window.SVGIcons.folderOpen} Abrir</div>
                <div class="menu-item" data-action="rename" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.edit} Renomear</div>
                <div class="menu-item" data-action="duplicate" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.copy} Duplicar</div>
                <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                <div class="menu-item" data-action="export-word" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.fileText} Exportar Word</div>
                <div class="menu-item" data-action="backup" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.save} Backup JSON</div>
                <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                <div class="menu-item" data-action="info" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.info} Informações</div>
                <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                <div class="menu-item" data-action="archive" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.archive} Arquivar</div>
                <div class="menu-item" data-action="share" style="padding: 8px 16px; cursor: default; display: flex; align-items: center; gap: 8px; color: var(--color-gray-400); opacity: 0.7;">${window.SVGIcons.share} Partilhar</div>
            `;
        } else {
            html += `
                <div class="menu-item" data-action="unarchive" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px;">${window.SVGIcons.archive} Desarquivar</div>
                <div style="height: 1px; background: var(--color-gray-200); margin: 4px 0;"></div>
                <div class="menu-item" data-action="delete" style="padding: 8px 16px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: var(--color-error-600); font-weight: var(--font-semibold);">${window.SVGIcons.trash} Eliminar Definitivamente</div>
            `;
        }

        menu.innerHTML = html;
        document.body.appendChild(menu);

        // Hover effects
        const items = menu.querySelectorAll('.menu-item');
        items.forEach(item => {
            if (item.getAttribute('data-action') !== 'share') {
                item.addEventListener('mouseenter', () => item.style.background = 'var(--color-gray-100)');
                item.addEventListener('mouseleave', () => item.style.background = 'transparent');
            }
        });

        // Handlers
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = item.getAttribute('data-action');
                menu.remove();
                this._handleMenuAction(action, wid);
            });
        });

        // Close on click outside
        setTimeout(() => {
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 0);
    }

    renderPromptLibrary() {
        this.header.classList.add('hidden');

        // Mapear prompts aos seus protocolos/etapas
        const promptOrigins = {};
        if (window.WORKFLOWS && window.WORKFLOWS[window.rgWorkspace.getData().workflowId]) {
            window.WORKFLOWS[window.rgWorkspace.getData().workflowId].steps.forEach(step => {
                if (step.prompts) {
                    step.prompts.forEach(pid => {
                        promptOrigins[pid] = { stepName: step.name, stepId: step.id };
                    });
                }
            });
        }

        // Construir os cartões dos prompts
        let cardsHtml = '';
        if (window.PROMPTS) {
            Object.keys(window.PROMPTS).forEach(promptId => {
                const prompt = window.PROMPTS[promptId];
                const templateText = (typeof prompt === 'string' ? prompt : prompt.template || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                const origin = promptOrigins[promptId];

                // Metadados do prompt
                const objective = prompt.objective || '';
                const expectedResult = prompt.expectedResult || '';
                const example = prompt.example || '';
                const difficulty = prompt.difficulty || '';

                // Ferramentas compatíveis (IAs)
                const compatibleTools = ['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Perplexity'];

                cardsHtml += `
                    <div class="library-prompt-card card">
                        <div class="library-prompt-header">
                            <div>
                                <span class="library-prompt-id">${promptId}</span>
                                ${difficulty ? `<span class="library-prompt-difficulty">${difficulty}</span>` : ''}
                            </div>
                            <span class="library-prompt-badge">✓ Utilização independente</span>
                        </div>

                        ${objective ? `<p class="library-prompt-objective">${objective}</p>` : ''}

                        <div class="prompt-card" style="margin: 0;">
                            <div class="prompt-header">
                                <span class="prompt-label">Prompt</span>
                                <button class="btn-copy" onclick="window.rgClipboard.copyText(this.parentElement.nextElementSibling.innerText, this)">
                                    <span>📋</span> Copiar
                                </button>
                            </div>
                            <div class="prompt-content">${templateText}</div>
                        </div>

                        <details class="library-prompt-details">
                            <summary>Saber mais</summary>
                            <div class="library-prompt-details-content">
                                ${expectedResult ? `<div class="library-prompt-meta-item"><span class="knowledge-label">Resultado esperado</span>${expectedResult}</div>` : ''}
                                ${example ? `<div class="library-prompt-meta-item"><span class="knowledge-label">Exemplo</span>${example}</div>` : ''}

                                <div class="library-prompt-origin">
                                    <span class="knowledge-label">Origem</span>
                                    ${origin
                                        ? `Também disponível no <strong>Protocolo associado</strong> — Etapa: ${origin.stepName}. Pode ser utilizado isoladamente.`
                                        : `Prompt independente da Biblioteca.`
                                    }
                                </div>

                                <div class="library-prompt-how">
                                    <span class="knowledge-label">Como utilizar</span>
                                    <ol class="library-prompt-steps">
                                        <li>Copie o prompt.</li>
                                        <li>Adapte os campos <code>{{...}}</code> ao seu contexto.</li>
                                        <li>Cole na IA da sua preferência.</li>
                                        <li>Analise criticamente a resposta obtida.</li>
                                    </ol>
                                </div>

                                <p class="library-prompt-compat-line">Compatível com ChatGPT · Gemini · Claude · Copilot · Perplexity · outras IAs</p>
                            </div>
                        </details>
                    </div>
                `;
            });
        }

        this.container.innerHTML = `
            <div class="library-container">
                <div class="library-header" style="margin-bottom: 2rem;">
                    <button class="btn btn-ghost library-back-btn" id="btn-library-back">← Voltar ao início</button>
                </div>
                <div class="library-header">
                    <h1 class="library-title">📖 Biblioteca de Prompts</h1>
                    <p class="library-subtitle">
                        Coleção de prompts especializados para apoiar tarefas de investigação científica.
                        Pode utilizá-los diretamente no ChatGPT, Gemini, Claude ou outra IA, sem necessidade de seguir um protocolo completo.
                    </p>
                </div>

                <div class="library-info-block">
                    <div class="library-info-item">
                        <strong>📋 Seguir um Protocolo</strong>
                        <span>Execução guiada passo a passo.</span>
                    </div>
                    <div class="library-info-divider"></div>
                    <div class="library-info-item">
                        <strong>🤖 Utilizar apenas um Prompt</strong>
                        <span>Copiar, adaptar e utilizar imediatamente.</span>
                    </div>
                </div>

                <div class="library-grid">
                    ${cardsHtml}
                </div>

                <p style="text-align: center; margin-top: var(--space-8); font-size: var(--text-xs); color: var(--color-gray-400);">
                    Universidade Licungo · Moçambique · Capacitação 2026 <br>
                    <span style="opacity: 0.6; display: inline-block; margin-top: 4px;">v0.9.0-rc1</span>
                </p>
            </div>
        `;

        // Botão de voltar
        document.getElementById('btn-library-back').addEventListener('click', () => {
            this.renderEmptyState();
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    _handleMenuAction(action, wid) {
        if (!wid) return;

        switch (action) {
            case 'open':
                if (window.rgWorkspace && window.rgEventBus) {
                    if (window.rgWorkspace.loadWorkspaceById(wid)) {
                        window.rgEventBus.emit('engine:stateChanged', { view: 'MAIN', payload: null });
                    }
                }
                break;
            case 'rename':
                this._showRenameModal(wid);
                break;
            case 'duplicate':
                if (window.rgStorage) {
                    window.rgStorage.duplicateWorkspace(wid, null); // uses default (Cópia)
                    this.renderEmptyState();
                    if (window.rgEventBus) window.rgEventBus.emit('toast:show', { message: 'Projeto duplicado com sucesso!', type: 'success' });
                }
                break;
            case 'export-word':
                if (window.rgDocumentService) {
                    window.rgExportService.exportResearch({format: 'docx', workspaceId: wid});
                }
                break;
            case 'backup':
                if (window.rgDocumentService) {
                    window.rgDocumentService.exportBackup(wid);
                }
                break;
            case 'info':
                this._showInfoModal(wid);
                break;
            case 'archive':
            case 'unarchive':
                if (window.rgResearchIdentity) {
                    window.rgResearchIdentity.toggleArchive(wid);
                    this.renderEmptyState();
                }
                break;
            case 'delete':
                this._showDeleteModal(wid);
                break;
        }
    }
    startNewProject(workflowId) {
        this._showWizardModal(workflowId);
    }

    _showWizardModal(defaultWorkflowId = (Object.keys(window.WORKFLOWS || {})[0] || 'default')) {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'card wizard-modal';
        modal.style.cssText = `
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            background: white;
            border-radius: 12px;
            padding: var(--space-8);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            gap: var(--space-6);
            position: relative;
        `;

        modal.innerHTML = `
            <div>
                <h3 style="font-size: var(--text-xl); font-weight: 700; color: var(--color-gray-900); margin-bottom: var(--space-2);">Iniciar uma nova investigação</h3>
                <p style="color: var(--color-gray-600); font-size: var(--text-sm);">Em menos de um minuto ficará pronto para começar a trabalhar.</p>
            </div>

            <div id="wizard-form-content" style="display: flex; flex-direction: column; gap: var(--space-4);">
                <div class="form-group" style="display: flex; flex-direction: column; gap: var(--space-2);">
                    <label style="font-weight: 600; font-size: var(--text-sm); color: var(--color-gray-800);">Como se chama a sua investigação? <span style="color: var(--color-error); font-weight: bold;">*</span></label>
                    <input type="text" id="wizard-title" class="wizard-input" placeholder="Exemplo: Ética e Cidadania Digital no Ensino Superior" autocomplete="off">
                    <div id="wizard-intelligent-suggestion" style="display: none; margin-top: 4px; font-size: 13px; color: var(--color-primary-700); background: var(--color-primary-50); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--color-primary-200);"></div>
                    <p style="font-size: var(--text-xs); color: var(--color-gray-500); margin-top: 4px;">Este título pode ser alterado mais tarde.</p>
                </div>

                <hr style="border: 0; border-top: 1px solid var(--color-gray-200); margin: var(--space-2) 0;">

                <div class="form-group" style="display: flex; flex-direction: column; gap: var(--space-3);">
                    <label style="font-weight: 600; font-size: var(--text-sm); color: var(--color-gray-800);">Qual é a área científica? <span style="color: var(--color-error); font-weight: bold;">*</span></label>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;" id="area-radio-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700);">
                            <input type="radio" name="wizard-area-radio" value="Informática Educacional" checked> Informática Educacional
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700);">
                            <input type="radio" name="wizard-area-radio" value="Engenharia"> Engenharia
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700);">
                            <input type="radio" name="wizard-area-radio" value="Saúde"> Saúde
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700);">
                            <input type="radio" name="wizard-area-radio" value="Ciências Sociais"> Ciências Sociais
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700);">
                            <input type="radio" name="wizard-area-radio" value="Outra"> Outra
                        </label>
                    </div>

                    <div id="wizard-other-area-container" style="display: none; margin-top: 8px;">
                        <label style="font-weight: 500; font-size: 13px; color: var(--color-gray-700); margin-bottom: 4px; display: block;">Especifique a área científica:</label>
                        <input type="text" id="wizard-other-area" class="wizard-input" placeholder="Exemplo: Direito, Biologia, Arquitetura" autocomplete="off">
                    </div>
                </div>

                <hr style="border: 0; border-top: 1px solid var(--color-gray-200); margin: var(--space-2) 0;">

                <div class="form-group" style="display: flex; flex-direction: column; gap: var(--space-2);">
                    <label style="font-weight: 600; font-size: var(--text-sm); color: var(--color-gray-800);">Qual é o protocolo de investigação?</label>
                    <div style="display: flex; flex-direction: column; gap: 8px;" id="protocol-radio-group">
                        ${Object.keys(window.WORKFLOWS || {}).map((wfId) => `
                            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: var(--color-gray-700); padding: var(--space-3); border: 1px solid var(--color-gray-200); border-radius: 8px; background: var(--color-gray-50);">
                                <input type="radio" name="wizard-protocol-radio" value="${wfId}" ${wfId === defaultWorkflowId ? 'checked' : ''}> 
                                <div>
                                    <div style="font-weight: 600; color: var(--color-gray-900);">${window.WORKFLOWS[wfId].title || wfId}</div>
                                    <div style="font-size: 12px; color: var(--color-gray-500);">${window.WORKFLOWS[wfId].description || ''}</div>
                                </div>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div id="wizard-loading-screen" style="display: none; flex-direction: column; align-items: center; justify-content: center; padding: var(--space-8) 0; gap: var(--space-4);">
                <div class="spinner" style="width: 32px; height: 32px; border: 3px solid var(--color-gray-200); border-top-color: var(--color-primary); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <h4 style="font-size: var(--text-lg); font-weight: 600; color: var(--color-gray-900);">A preparar o ambiente de investigação...</h4>
                <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px; color: var(--color-gray-600); font-size: 14px;">
                    <div class="loading-step"><span style="color: var(--color-success);">✓</span> Criar projeto</div>
                    <div class="loading-step"><span style="color: var(--color-success);">✓</span> Inicializar protocolo</div>
                    <div class="loading-step"><span style="color: var(--color-success);">✓</span> Carregar primeira etapa</div>
                    <div class="loading-step"><span style="color: var(--color-success);">✓</span> Preparar recursos científicos</div>
                </div>
            </div>

            <style>
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .loading-step { opacity: 0; animation: fadeIn 0.3s forwards; }
                .loading-step:nth-child(1) { animation-delay: 0.1s; }
                .loading-step:nth-child(2) { animation-delay: 0.2s; }
                .loading-step:nth-child(3) { animation-delay: 0.3s; }
                .loading-step:nth-child(4) { animation-delay: 0.4s; }
                @keyframes fadeIn { to { opacity: 1; } }

                .wizard-input {
                    padding: 12px 16px;
                    border: 2px solid var(--color-gray-200);
                    border-radius: 8px;
                    font-size: 15px;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                    width: 100%;
                    box-sizing: border-box;
                    font-family: inherit;
                    color: var(--color-gray-800);
                }
                .wizard-input:focus {
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(10, 102, 194, 0.15);
                }
                .wizard-input::placeholder {
                    color: var(--color-gray-400);
                }

                .wizard-modal::-webkit-scrollbar {
                    width: 6px;
                }
                .wizard-modal::-webkit-scrollbar-track {
                    background: transparent;
                }
                .wizard-modal::-webkit-scrollbar-thumb {
                    background: var(--color-gray-300);
                    border-radius: 10px;
                }
                .wizard-modal::-webkit-scrollbar-thumb:hover {
                    background: var(--color-gray-400);
                }
            </style>

            <div id="wizard-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-4);">
                <span style="font-size: 11px; color: var(--color-gray-500);"></span>
                <div style="display: flex; gap: var(--space-3);">
                    <button id="btn-wizard-cancel" class="btn btn-secondary">Cancelar</button>
                    <button id="btn-wizard-create" class="btn btn-primary" disabled>Iniciar investigação</button>
                </div>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        const close = () => modalOverlay.remove();
        const inputTitle = modal.querySelector('#wizard-title');
        const btnCreate = modal.querySelector('#btn-wizard-create');
        const radios = modal.querySelectorAll('input[name="wizard-area-radio"]');
        const otherAreaContainer = modal.querySelector('#wizard-other-area-container');
        const inputOtherArea = modal.querySelector('#wizard-other-area');
        
        const formContent = modal.querySelector('#wizard-form-content');
        const loadingScreen = modal.querySelector('#wizard-loading-screen');
        const footer = modal.querySelector('#wizard-footer');
        const suggestionBox = modal.querySelector('#wizard-intelligent-suggestion');

        const validateForm = () => {
            const title = inputTitle.value.trim();
            const selectedRadio = Array.from(radios).find(r => r.checked)?.value;
            let isValid = title.length > 0;
            
            if (selectedRadio === 'Outra') {
                if (inputOtherArea.value.trim().length === 0) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                btnCreate.removeAttribute('disabled');
            } else {
                btnCreate.setAttribute('disabled', 'true');
            }
        };

        let debounceTimer;
        inputTitle.addEventListener('input', (e) => {
            validateForm();
            
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const val = e.target.value.trim();
                if (val.length > 3 && window.rgMethodology) {
                    // Mock context para testar as regras
                    const mockContext = {
                        research: { title: val, area: '' },
                        artifacts: {}
                    };
                    const rar = window.rgMethodology.analyze(mockContext);
                    if (rar && rar.findings) {
                        const areaSuggestion = rar.findings.find(f => f.type === 'AUTO_SUGGEST_AREA');
                        if (areaSuggestion) {
                            suggestionBox.innerHTML = `💡 <b>Área sugerida:</b> ${areaSuggestion.suggestion} <span style="opacity: 0.7; font-size: 0.85em;">(${(areaSuggestion.confidence * 100).toFixed(0)}% confiança)</span>`;
                            suggestionBox.style.display = 'block';
                        } else {
                            suggestionBox.style.display = 'none';
                        }
                    }
                } else {
                    suggestionBox.style.display = 'none';
                }
            }, 500);
        });
        inputOtherArea.addEventListener('input', validateForm);

        radios.forEach(r => {
            r.addEventListener('change', (e) => {
                if (e.target.value === 'Outra') {
                    otherAreaContainer.style.display = 'block';
                    inputOtherArea.focus();
                } else {
                    otherAreaContainer.style.display = 'none';
                }
                validateForm();
            });
        });

        // Focus delay
        setTimeout(() => inputTitle.focus(), 100);

        modal.querySelector('#btn-wizard-cancel').addEventListener('click', close);
        btnCreate.addEventListener('click', () => {
            const title = inputTitle.value.trim();
            const selectedRadio = Array.from(radios).find(r => r.checked)?.value;
            const area = selectedRadio === 'Outra' ? inputOtherArea.value.trim() : selectedRadio;
            
            const protocolRadios = modal.querySelectorAll('input[name="wizard-protocol-radio"]');
            const selectedProtocolRadio = Array.from(protocolRadios).find(r => r.checked)?.value;
            const protocol = selectedProtocolRadio || defaultWorkflowId;

            if (title.length > 0 && area.length > 0) {
                formContent.style.display = 'none';
                footer.style.display = 'none';
                loadingScreen.style.display = 'flex';
                
                setTimeout(() => {
                    if (window.rgWorkspace) {
                        window.rgWorkspace.createWorkspace({
                            title: title,
                            area: area,
                            workflowId: protocol
                        });
                    }
                    close();
                }, 500);
            }
        });
    }

    _showRenameModal(wid) {
        let currentTitle = "Projeto";
        if (window.rgResearchIdentity) {
            const data = window.rgResearchIdentity.getData();
            if (data && data.workspaces && data.workspaces[wid]) {
                currentTitle = data.workspaces[wid].title;
            }
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'card';
        modal.style.cssText = `
            width: 90%;
            max-width: 400px;
            background: white;
            border-radius: 8px;
            padding: var(--space-6);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;

        modal.innerHTML = `
            <h3 style="margin-bottom: var(--space-4); font-size: var(--text-xl);">Renomear Projeto</h3>
            <div style="margin-bottom: var(--space-4);">
                <label style="display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-gray-600); margin-bottom: 8px;">Nome atual</label>
                <div style="padding: 8px 12px; background: var(--color-gray-100); border-radius: 4px; font-size: 14px; color: var(--color-gray-500);">${currentTitle}</div>
            </div>
            <div style="margin-bottom: var(--space-6);">
                <label style="display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-gray-600); margin-bottom: 8px;">Novo nome</label>
                <input type="text" id="rename-input" value="${currentTitle}" style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-gray-300); border-radius: 4px; font-size: 14px;">
            </div>
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button id="btn-cancel-rename" class="btn btn-ghost">Cancelar</button>
                <button id="btn-save-rename" class="btn btn-primary">Guardar</button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        const input = modal.querySelector('#rename-input');
        input.focus();
        input.select();

        const close = () => modalOverlay.remove();

        modal.querySelector('#btn-cancel-rename').addEventListener('click', close);
        modal.querySelector('#btn-save-rename').addEventListener('click', () => {
            const val = input.value.trim();
            if (val && val !== currentTitle) {
                if (window.rgResearchIdentity && window.rgStorage) {
                    window.rgStorage.renameWorkspace(wid, val);
                    window.rgResearchIdentity.renameWorkspace(wid, val);
                    this.renderEmptyState();
                }
            }
            close();
        });
    }

    _showInfoModal(wid) {
        if (!window.rgResearchIdentity) return;
        const data = window.rgResearchIdentity.getData();
        const ws = data.workspaces[wid];
        if (!ws) return;

        let completedSteps = 0;
        let totalSteps = 0;
        if (window.WORKFLOWS && window.WORKFLOWS[ws.protocolId]) {
            totalSteps = window.WORKFLOWS[ws.protocolId].steps.length;
            // Carregar o workspace da storage para ver os artefactos
            const wsData = window.rgStorage ? window.rgStorage.loadWorkspace(wid) : null;
            if (wsData && wsData.artifacts) {
                completedSteps = Object.keys(wsData.artifacts).length;
            }
        }
        
        let strategyName = 'Equilibrado';
        const wsData = window.rgStorage ? window.rgStorage.loadWorkspace(wid) : null;
        if (wsData && wsData.preferences && wsData.preferences.promptStrategy) {
            const st = wsData.preferences.promptStrategy;
            if (st === 'guided') strategyName = 'Guiado';
            else if (st === 'direct') strategyName = 'Direto';
            else if (st === 'custom') strategyName = 'Personalizado';
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'card';
        modal.style.cssText = `
            width: 90%;
            max-width: 400px;
            max-height: 90vh;
            overflow-y: auto;
            background: white;
            border-radius: 8px;
            padding: var(--space-6);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;

        modal.innerHTML = `
            <h3 style="margin-bottom: var(--space-4); font-size: var(--text-xl);">Informações do Projeto</h3>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: var(--space-6);">
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">RID</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${ws.id}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">Protocolo</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${window.WORKFLOWS && window.WORKFLOWS[ws.protocolId] ? window.WORKFLOWS[ws.protocolId].title : ws.protocolId}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">Data de Criação</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${new Date(ws.createdAt).toLocaleString('pt-PT')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">Última Edição</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${new Date(ws.updatedAt).toLocaleString('pt-PT')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">Etapas Preenchidas</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${completedSteps} / ${totalSteps}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: var(--color-gray-500); font-size: 13px;">Estratégia Atual</span>
                    <span style="font-weight: 500; font-size: 13px; color: var(--color-gray-800);">${strategyName}</span>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end;">
                <button id="btn-close-info" class="btn btn-primary">Fechar</button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        const close = () => modalOverlay.remove();
        modal.querySelector('#btn-close-info').addEventListener('click', close);
        modalOverlay.addEventListener('click', (e) => { if(e.target === modalOverlay) close(); });
    }

    _showDeleteModal(wid) {
        if (!window.rgResearchIdentity) return;
        const data = window.rgResearchIdentity.getData();
        const ws = data.workspaces[wid];
        if (!ws) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const modal = document.createElement('div');
        modal.className = 'card';
        modal.style.cssText = `
            width: 90%;
            max-width: 400px;
            max-height: 90vh;
            overflow-y: auto;
            background: white;
            border-radius: 8px;
            padding: var(--space-6);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            text-align: center;
        `;

        modal.innerHTML = `
            <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
            <h3 style="margin-bottom: var(--space-2); font-size: var(--text-xl); color: var(--color-error-600);">Eliminar Projeto</h3>
            <p style="font-size: 15px; font-weight: 600; margin-bottom: var(--space-4); color: var(--color-gray-800);">${ws.title}</p>
            <p style="font-size: 14px; color: var(--color-gray-600); margin-bottom: var(--space-6); text-align: left;">
                Esta ação removerá:<br><br>
                ✓ Artefactos<br>
                ✓ Revisões Metodológicas<br>
                ✓ Histórico e Metadados<br>
                ✓ Preferências<br><br>
                <strong>Esta ação não pode ser anulada.</strong>
            </p>
            <div style="display: flex; gap: 12px; margin-top: 24px;">
                <button id="btn-cancel-del" class="btn btn-secondary" style="flex: 1;">Cancelar</button>
                <button id="btn-confirm-del" class="btn btn-primary" style="flex: 1; background: var(--color-error); border-color: var(--color-error);">Eliminar Projeto</button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        const close = () => modalOverlay.remove();
        modal.querySelector('#btn-cancel-del').addEventListener('click', close);
        modal.querySelector('#btn-confirm-del').addEventListener('click', () => {
            window.rgResearchIdentity.deleteWorkspace(wid);
            this.renderEmptyState();
            if (window.rgEventBus) {
                window.rgEventBus.emit('toast:show', { message: 'Projeto eliminado com sucesso.', type: 'success' });
            }
            close();
        });
    }

    renderMainWorkspace() {
        const protocolData = window.WORKFLOWS && window.WORKFLOWS[window.rgWorkspace.getData().workflowId] ? window.WORKFLOWS[window.rgWorkspace.getData().workflowId] : null;
        let currentStepId = 'STEP-INV-01'; // Default, progressView or stepView will update it, but let's try to get current from Workspace
        if (window.rgWorkspace) {
            currentStepId = window.rgWorkspace.getData().currentStepId || currentStepId;
        }

        let overviewHtml = '';
        if (window.ProtocolOverview && protocolData) {
            overviewHtml = window.ProtocolOverview.render(protocolData, currentStepId);
        }

        this.container.innerHTML = `
            ${overviewHtml}
            <div id="progress-container" class="progress-container"></div>
            <div id="step-container" class="step-container"></div>
        `;

        // Força os renders iniciais se já estivermos a inicializar
        if (window.rgProgressView && window.rgStepView && window.rgWorkspace) {
            const data = window.rgWorkspace.getData();
            // Atualiza RID no header se existir
            if (window.rgResearchIdentity) {
                const ridData = window.rgResearchIdentity.getData();
                if (ridData && ridData.id) {
                    const ridValueElement = document.getElementById('rid-display-value');
                    
                    if (ridValueElement) {
                        // Formato #•••92F
                        const parts = ridData.id.split('-');
                        if (parts.length > 1) {
                            const lastPart = parts[parts.length - 1];
                            ridValueElement.innerText = `#•••${lastPart.substring(lastPart.length - 3)}`;
                        } else {
                            ridValueElement.innerText = `#${ridData.id}`;
                        }
                    }

                    // Se quisermos manter o modal, podemos adicionar o listener ao contentor principal do badge
                    const ridBadgeContainer = document.querySelector('.header-rid-badge');
                    if (ridBadgeContainer && !ridBadgeContainer.dataset.modalAttached) {
                        ridBadgeContainer.dataset.modalAttached = 'true';
                        ridBadgeContainer.style.cursor = 'pointer';
                        
                        ridBadgeContainer.addEventListener('click', () => {
                            const d = new Date(ridData.createdAt);
                            const createdStr = `${d.getDate()} ${d.toLocaleString('pt-PT', { month: 'short' })} ${d.getFullYear()}`;
                            
                            const lastD = new Date(ridData.lastActivity);
                            const today = new Date();
                            const isToday = lastD.getDate() === today.getDate() && lastD.getMonth() === today.getMonth() && lastD.getFullYear() === today.getFullYear();
                            const timeOnly = lastD.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
                            const lastActivityStr = isToday ? `Hoje • ${timeOnly}` : `${lastD.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' })} • ${timeOnly}`;
                            
                            const numProjects = Object.keys(ridData.workspaces).length;
                            const numArtifacts = (ridData.learningRecord.draftArtifacts || 0) + (ridData.learningRecord.validatedArtifacts || 0);

                            if (window.rgEventBus) {
                                const modalHtml = `
                                    <div id="rid-modal-overlay" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); z-index: 1000; display:flex; justify-content:center; align-items:center;">
                                        <div style="background: white; padding: 24px; border-radius: 12px; width: 320px; max-width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.1); color: var(--color-gray-800);">
                                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                                <h3 style="margin: 0; font-size: 16px; color: var(--color-primary-800);">Research Identity</h3>
                                                <button id="rid-modal-close" style="background: none; border: none; cursor: pointer; font-size: 18px; color: var(--color-gray-400);">&times;</button>
                                            </div>
                                            
                                            <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); padding: 12px; border-radius: 8px; text-align: center; font-family: monospace; font-size: 14px; margin-bottom: 24px; color: var(--color-gray-700);">
                                                ${ridData.id}
                                            </div>
                                            
                                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                                                <div>
                                                    <div style="font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: 600;">Criado</div>
                                                    <div style="font-size: 14px; font-weight: 500;">${createdStr}</div>
                                                </div>
                                                <div>
                                                    <div style="font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: 600;">Sessões</div>
                                                    <div style="font-size: 14px; font-weight: 500;">${ridData.learningRecord.totalSessions || ridData.profile.totalSessions}</div>
                                                </div>
                                                <div>
                                                    <div style="font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: 600;">Projetos</div>
                                                    <div style="font-size: 14px; font-weight: 500;">${numProjects}</div>
                                                </div>
                                                <div>
                                                    <div style="font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: 600;">Artefactos</div>
                                                    <div style="font-size: 14px; font-weight: 500;">${numArtifacts}</div>
                                                </div>
                                            </div>
                                            
                                            <div style="border-top: 1px solid var(--color-gray-100); padding-top: 16px; margin-top: 8px;">
                                                <div style="font-size: 11px; text-transform: uppercase; color: var(--color-gray-500); font-weight: 600;">Última Atividade</div>
                                                <div style="font-size: 14px; font-weight: 500;">${lastActivityStr}</div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                
                                document.body.insertAdjacentHTML('beforeend', modalHtml);
                                
                                const overlay = document.getElementById('rid-modal-overlay');
                                const closeBtn = document.getElementById('rid-modal-close');
                                
                                const closeModal = () => overlay.remove();
                                closeBtn.addEventListener('click', closeModal);
                                overlay.addEventListener('click', (e) => {
                                    if (e.target === overlay) closeModal();
                                });
                            }
                        });
                    }
                }
            }

            window.rgProgressView.render(data.currentStepId);
            window.rgStepView.render(data.currentStepId);
        }
    }
}

const appShell = new AppShell();
window.rgAppShell = appShell;
