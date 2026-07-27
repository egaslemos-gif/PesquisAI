/**
 * Research Command Palette (Spotlight Search)
 * RC3 MVP: Pesquisa de Artefactos (Intra-Projeto)
 */

class CommandPalette {
    constructor() {
        this.isVisible = false;
        this.container = null;
        this.input = null;
        this.resultsList = null;
        this.overlay = null;
        this._bindEvents = this._bindEvents.bind(this);
    }

    init() {
        this._createDOM();
        this._bindEvents();
    }

    _createDOM() {
        // Criar o overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'rg-command-palette-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 9999;
            display: none;
            justify-content: center;
            align-items: flex-start;
            padding-top: 10vh;
        `;

        // Criar o modal
        this.container = document.createElement('div');
        this.container.style.cssText = `
            background: var(--color-white);
            border-radius: 8px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            overflow: hidden;
            display: flex;
            flex-direction: column;
        `;

        // Input
        const searchHeader = document.createElement('div');
        searchHeader.style.cssText = `
            padding: 16px;
            border-bottom: 1px solid var(--color-gray-200);
            display: flex;
            align-items: center;
        `;

        const icon = document.createElement('span');
        icon.innerHTML = '🔍';
        icon.style.cssText = 'margin-right: 12px; font-size: 18px; color: var(--color-gray-500);';

        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.placeholder = 'Pesquisar artefactos...';
        this.input.style.cssText = `
            width: 100%;
            border: none;
            outline: none;
            font-size: 18px;
            color: var(--color-gray-800);
            background: transparent;
        `;

        searchHeader.appendChild(icon);
        searchHeader.appendChild(this.input);

        // Resultados
        this.resultsList = document.createElement('div');
        this.resultsList.style.cssText = `
            max-height: 400px;
            overflow-y: auto;
            background: var(--color-gray-50);
        `;

        this.container.appendChild(searchHeader);
        this.container.appendChild(this.resultsList);
        this.overlay.appendChild(this.container);
        document.body.appendChild(this.overlay);
    }

    _bindEvents() {
        // Atalho Ctrl+K / Cmd+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isVisible) {
                this.close();
            }
        });

        // Fechar ao clicar fora
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Botão da UI
        const btnSearch = document.getElementById('btn-search-artifacts');
        if (btnSearch) {
            btnSearch.addEventListener('click', () => {
                this.toggle();
            });
        }

        // Procurar ao escrever
        this.input.addEventListener('input', (e) => {
            this._performSearch(e.target.value.trim());
        });
    }

    toggle() {
        if (this.isVisible) this.close();
        else this.open();
    }

    open() {
        // Só permite abrir se houver um workspace carregado e a app não estiver vazia
        if (!window.rgWorkspace || !window.rgWorkspace.getData().id) {
            if (window.rgEventBus) {
                window.rgEventBus.emit('toast:show', { message: 'A pesquisa de artefactos requer um projeto aberto.', type: 'warning' });
            }
            return;
        }

        this.isVisible = true;
        this.overlay.style.display = 'flex';
        this.input.value = '';
        this.resultsList.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--color-gray-500); font-size: 14px;">
                Escreva para pesquisar nos artefactos deste projeto.
            </div>
        `;
        this.input.focus();
    }

    close() {
        this.isVisible = false;
        this.overlay.style.display = 'none';
    }

    _performSearch(term) {
        const data = window.rgWorkspace.getData();
        if (!data) return;

        let steps = [];
        if (window.WORKFLOWS && window.WORKFLOWS[data.workflowId]) {
            steps = window.WORKFLOWS[data.workflowId].steps;
        }

        const searchTerm = (term || '').toLowerCase();
        
        // 1. Pesquisa nos artefactos
        const artifactResults = [];
        if (searchTerm && data.artifacts) {
            Object.entries(data.artifacts).forEach(([stepId, content]) => {
                if (content && typeof content === 'string' && content.toLowerCase().includes(searchTerm)) {
                    let stepName = stepId;
                    const stepConf = steps.find(s => s.id === stepId);
                    if (stepConf) stepName = stepConf.name;

                    const matchIndex = content.toLowerCase().indexOf(searchTerm);
                    const start = Math.max(0, matchIndex - 40);
                    const end = Math.min(content.length, matchIndex + searchTerm.length + 40);
                    let snippet = content.substring(start, end);
                    if (start > 0) snippet = '...' + snippet;
                    if (end < content.length) snippet = snippet + '...';

                    const regex = new RegExp(`(${term})`, 'gi');
                    snippet = snippet.replace(regex, '<strong>$1</strong>');

                    artifactResults.push({ stepId, stepName, snippet });
                }
            });
        }

        // 2. Navegação Inteligente
        const navResults = [];
        steps.forEach((step, index) => {
            if (!searchTerm || step.name.toLowerCase().includes(searchTerm)) {
                // Determinar o estado da etapa
                let stateText = 'Ainda não iniciada';
                let stateColor = 'var(--color-gray-500)';
                let icon = '⚪';
                
                if (data.artifacts && data.artifacts[step.id]) {
                    stateText = 'Em curso';
                    stateColor = 'var(--color-primary-600)';
                    icon = '📝';
                }
                
                // Sobrescrever se houver avaliação
                if (step.validation && data.reviews && data.reviews[step.id] && data.reviews[step.id].methodological) {
                    const status = data.reviews[step.id].methodological;
                    if (status === 'PASS') { stateText = 'Concluída'; stateColor = 'var(--color-success-600)'; icon = '🟢'; }
                    else if (status === 'WARNING') { stateText = 'Warning'; stateColor = 'var(--color-warning-600)'; icon = '🟠'; }
                    else if (status === 'FAIL') { stateText = 'Obrigatória'; stateColor = 'var(--color-error-600)'; icon = '🔴'; }
                }

                navResults.push({
                    stepId: step.id,
                    stepName: `Etapa ${index + 1} — ${step.name}`,
                    stateText,
                    stateColor,
                    icon
                });
            }
        });

        this._renderResults(artifactResults, navResults, term);
    }

    _renderResults(artifactResults, navResults, term) {
        let html = '';

        if (artifactResults.length === 0 && navResults.length === 0) {
            this.resultsList.innerHTML = `
                <div style="padding: 24px; text-align: center; color: var(--color-gray-600); font-size: 14px;">
                    Nenhum resultado para <br><br>
                    <span style="font-weight: 600; font-size: 16px;">"${term}"</span> <br><br>
                    Experimente outro termo.
                </div>
            `;
            return;
        }

        if (artifactResults.length > 0) {
            html += `<div style="padding: 12px 16px 4px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--color-gray-500); letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200);">Artefactos</div>`;
            artifactResults.forEach(res => {
                html += `
                    <div class="palette-result-item" data-step="${res.stepId}" style="padding: 16px; border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background 0.2s;">
                        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                            <div style="font-weight: 600; color: var(--color-primary-700); font-size: 14px;">${res.stepName}</div>
                            <div style="font-size: 11px; color: var(--color-gray-500); text-transform: uppercase;">${res.stepId}</div>
                        </div>
                        <div style="font-size: 13px; color: var(--color-gray-700); line-height: 1.4;">
                            ${res.snippet}
                        </div>
                    </div>
                `;
            });
        }

        if (navResults.length > 0) {
            html += `<div style="padding: 12px 16px 4px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--color-gray-500); letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200);">Navegação Inteligente</div>`;
            navResults.forEach(res => {
                html += `
                    <div class="palette-result-item" data-step="${res.stepId}" style="padding: 12px 16px; border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background 0.2s; display: flex; justify-content: space-between; align-items: center;">
                        <div style="font-weight: 500; color: var(--color-gray-800); font-size: 14px;">
                            ${res.stepName}
                        </div>
                        <div style="font-size: 12px; font-weight: 600; color: ${res.stateColor}; display: flex; align-items: center; gap: 6px;">
                            <span>${res.icon}</span> ${res.stateText}
                        </div>
                    </div>
                `;
            });
        }

        // 3. Ações do Projeto
        if (!term || 'exportar'.includes(term) || 'word'.includes(term) || 'backup'.includes(term) || 'arquivar'.includes(term)) {
            html += `<div style="padding: 12px 16px 4px; font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--color-gray-500); letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200);">Ações do Projeto</div>`;
            
            if (!term || 'exportar'.includes(term) || 'word'.includes(term)) {
                html += `
                    <div class="palette-action-item" data-action="export-word" style="padding: 12px 16px; border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background 0.2s; display: flex; justify-content: flex-start; align-items: center; gap: 12px;">
                        <div style="font-size: 16px;">📄</div>
                        <div style="font-weight: 500; color: var(--color-gray-800); font-size: 14px;">Exportar Investigação (Word)</div>
                    </div>
                `;
            }
            if (!term || 'backup'.includes(term)) {
                html += `
                    <div class="palette-action-item" data-action="backup" style="padding: 12px 16px; border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background 0.2s; display: flex; justify-content: flex-start; align-items: center; gap: 12px;">
                        <div style="font-size: 16px;">💾</div>
                        <div style="font-weight: 500; color: var(--color-gray-800); font-size: 14px;">Fazer Backup (JSON)</div>
                    </div>
                `;
            }
            if (!term || 'arquivar'.includes(term)) {
                html += `
                    <div class="palette-action-item" data-action="archive" style="padding: 12px 16px; border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background 0.2s; display: flex; justify-content: flex-start; align-items: center; gap: 12px;">
                        <div style="font-size: 16px;">📦</div>
                        <div style="font-weight: 500; color: var(--color-gray-800); font-size: 14px;">Arquivar Projeto</div>
                    </div>
                `;
            }
        }

        this.resultsList.innerHTML = html;

        // Adicionar eventos de clique e hover para navegação
        const items = this.resultsList.querySelectorAll('.palette-result-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.background = 'var(--color-primary-50)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.background = 'transparent';
            });
            item.addEventListener('click', () => {
                const stepId = item.getAttribute('data-step');
                if (window.rgEngine) {
                    window.rgEngine.goToStep(stepId);
                    this.close();
                }
            });
        });

        // Adicionar eventos de clique para Ações
        const actions = this.resultsList.querySelectorAll('.palette-action-item');
        actions.forEach(action => {
            action.addEventListener('mouseenter', () => {
                action.style.background = 'var(--color-primary-50)';
            });
            action.addEventListener('mouseleave', () => {
                action.style.background = 'transparent';
            });
            action.addEventListener('click', () => {
                const actionType = action.getAttribute('data-action');
                const workspaceId = window.rgWorkspace.getData().id;
                if (!workspaceId) return;

                if (actionType === 'export-word' && window.rgDocumentService) {
                    window.rgExportService.exportResearch({format: 'docx', workspaceId: workspaceId});
                } else if (actionType === 'backup' && window.rgDocumentService) {
                    window.rgDocumentService.exportBackup(workspaceId);
                } else if (actionType === 'archive' && window.rgResearchIdentity) {
                    window.rgResearchIdentity.toggleArchive(workspaceId);
                    if (window.rgEventBus) window.rgEventBus.emit('toast:show', { message: 'Projeto arquivado.', type: 'success' });
                    // Go to home
                    setTimeout(() => {
                        window.location.href = window.location.pathname;
                    }, 500);
                }
                this.close();
            });
        });
    }
}

const commandPalette = new CommandPalette();
window.rgCommandPalette = commandPalette;
