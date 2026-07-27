class ProjectExplorer {
    constructor(container) {
        this.container = container;
        this.state = {
            searchQuery: '',
            currentTab: 'recent', // 'all', 'recent', 'favorites', 'archived'
            currentView: 'grid', // 'grid', 'list', 'compact'
            sortBy: 'updated', // 'updated', 'created', 'name', 'status'
            isSelectionMode: false,
            selectedIds: new Set()
        };
        
        // Listeners
        this.boundHandleEvent = this.handleEvent.bind(this);
        
        // Ouça atualizações para renderizar novamente
        if (window.rgEventBus) {
            window.rgEventBus.on('rid:updated', () => {
                if (this.container && this.container.innerHTML) {
                    this.render();
                }
            });
        }
    }

    render() {
        let allWorkspaces = [];
        if (window.rgResearchIdentity) {
            allWorkspaces = window.rgResearchIdentity.getAllWorkspaces() || [];
        }

        // Apply filters
        let filtered = allWorkspaces.filter(ws => {
            if (this.state.currentTab === 'favorites' && !ws.favorite) return false;
            if (this.state.currentTab === 'archived' && ws.visibility !== 'archived') return false;
            if (this.state.currentTab !== 'archived' && ws.visibility === 'archived') return false;
            
            // Search filter
            if (this.state.searchQuery) {
                const q = this.state.searchQuery.toLowerCase();
                const matchName = ws.title && ws.title.toLowerCase().includes(q);
                const matchProtocol = ws.protocolId && ws.protocolId.toLowerCase().includes(q);
                // Assume tags are not fully implemented yet but prepare for it
                return matchName || matchProtocol;
            }
            return true;
        });

        // Recent limit
        if (this.state.currentTab === 'recent' && !this.state.searchQuery) {
            // Sort by updated first
            filtered.sort((a, b) => b.updatedAt - a.updatedAt);
            filtered = filtered.slice(0, 8); // top 8 recent
        } else {
            // General Sort
            filtered.sort((a, b) => {
                if (this.state.sortBy === 'updated') return b.updatedAt - a.updatedAt;
                if (this.state.sortBy === 'created') return b.createdAt - a.createdAt;
                if (this.state.sortBy === 'name') return (a.title || '').localeCompare(b.title || '');
                if (this.state.sortBy === 'status') return (a.reviewStatus || '').localeCompare(b.reviewStatus || '');
                return 0;
            });
        }
        
        this.currentFiltered = filtered; // Guardamos para o "Selecionar resultados"

        const stats = this._computeStats(allWorkspaces);

        this.container.innerHTML = `
            <div class="workspace-explorer">
                <div class="explorer-header">
                    <h2>Workspace</h2>
                    <div class="explorer-search">
                        <span class="icon-slot">${window.SVGIcons?.search || '🔍'}</span>
                        <input type="text" id="explorer-search-input" placeholder="Pesquisar projetos..." value="${this.state.searchQuery}">
                    </div>
                    <div class="explorer-tabs">
                        <button class="tab-btn ${this.state.currentTab === 'all' ? 'active' : ''}" data-tab="all">Todos</button>
                        <button class="tab-btn ${this.state.currentTab === 'recent' ? 'active' : ''}" data-tab="recent">Recentes</button>
                        <button class="tab-btn ${this.state.currentTab === 'favorites' ? 'active' : ''}" data-tab="favorites">Favoritos</button>
                        <button class="tab-btn ${this.state.currentTab === 'archived' ? 'active' : ''}" data-tab="archived">Arquivados</button>
                    </div>
                </div>

                <div class="explorer-toolbar">
                    <div class="toolbar-title">
                        <h3>${this._getTabTitle()} (${filtered.length})</h3>
                    </div>
                    <div class="toolbar-actions">
                        <select id="explorer-sort" class="select-sort">
                            <option value="updated" ${this.state.sortBy === 'updated' ? 'selected' : ''}>Última edição</option>
                            <option value="created" ${this.state.sortBy === 'created' ? 'selected' : ''}>Data criação</option>
                            <option value="name" ${this.state.sortBy === 'name' ? 'selected' : ''}>Nome</option>
                            <option value="status" ${this.state.sortBy === 'status' ? 'selected' : ''}>Estado</option>
                        </select>
                        <div class="view-toggles">
                            <button class="view-btn ${this.state.currentView === 'grid' ? 'active' : ''}" data-view="grid" title="Grid View">Grid</button>
                            <button class="view-btn ${this.state.currentView === 'list' ? 'active' : ''}" data-view="list" title="List View">Lista</button>
                            <button class="view-btn ${this.state.currentView === 'compact' ? 'active' : ''}" data-view="compact" title="Compact View">Compact</button>
                        </div>
                    </div>
                </div>

                <div class="explorer-content view-${this.state.currentView}">
                    ${filtered.length > 0 
                        ? filtered.map(ws => this._renderProjectCard(ws)).join('') 
                        : '<div class="empty-results">Nenhum projeto encontrado.</div>'}
                </div>
            </div>
        `;

        this.attachEvents();
    }

    _computeStats(workspaces) {
        let countOk = 0;
        let countProgress = 0;
        let countFail = 0;
        workspaces.forEach(ws => {
            if (ws.visibility !== 'archived') {
                if (ws.status === 'completed' || ws.reviewStatus === 'PASS') countOk++;
                else if (ws.reviewStatus === 'FAIL') countFail++;
                else countProgress++;
            }
        });
        return { countOk, countProgress, countFail };
    }

    _getTabTitle() {
        const titles = {
            'all': 'Todos os Projetos',
            'recent': 'Recentes',
            'favorites': 'Favoritos',
            'archived': 'Arquivados'
        };
        return titles[this.state.currentTab] || 'Projetos';
    }

    _renderProjectCard(ws) {
        const d = new Date(ws.updatedAt);
        const today = new Date();
        const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        const timeOnly = d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
        const timeStr = isToday ? `Hoje • ${timeOnly}` : `${d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' })} • ${timeOnly}`;
        
        let stepIndex = 0;
        let totalSteps = 0;
        if (window.WORKFLOWS && window.WORKFLOWS[ws.protocolId]) {
            const steps = window.WORKFLOWS[ws.protocolId].steps;
            totalSteps = steps.length;
            const sIdx = steps.findIndex(s => s.id === ws.currentStep);
            if (sIdx !== -1) stepIndex = sIdx + 1;
        }

        let reviewBadge = '';
        let statusClass = 'status-progress';
        let statusText = 'Em progresso';
        
        if (ws.status === 'completed') {
            statusClass = 'status-ok';
            statusText = 'Concluído';
        } else if (ws.reviewStatus === 'PASS') {
            statusClass = 'status-ok';
            statusText = 'Concluído';
        } else if (ws.reviewStatus === 'FAIL') {
            statusClass = 'status-fail';
            statusText = 'Revisão';
        }

        reviewBadge = `<span class="badge ${statusClass}">● ${statusText}</span>`;
        const favoriteIcon = ws.favorite ? '★' : '☆';
        const favoriteClass = ws.favorite ? 'favorite-active' : '';
        const protocolName = ws.protocolId === 'WF-INV' ? 'Revisão da Literatura' : ws.protocolId;
        
        const isSelected = this.state.selectedIds.has(ws.id);
        const selectedClass = isSelected ? 'selected-card' : '';
        const selectionIcon = isSelected ? '◉' : '○';
        const selectionStyle = isSelected ? 'color: var(--color-primary); font-size: 18px;' : 'color: var(--color-gray-300); font-size: 18px;';
        
        const cardHeaderAction = this.state.isSelectionMode 
            ? `<div class="card-selection" style="cursor: pointer; ${selectionStyle}">${selectionIcon}</div>`
            : `<div class="card-actions">
                 <button class="btn-favorite ${favoriteClass}" data-id="${ws.id}">${favoriteIcon}</button>
                 <button class="btn-menu" data-id="${ws.id}">⋮</button>
               </div>`;

        // Differing HTML based on view
        if (this.state.currentView === 'compact') {
            return `
                <div class="project-card compact-card ${selectedClass}" data-id="${ws.id}" style="${isSelected ? 'background: #f0f7ff; border-color: #bbd8fa;' : ''}">
                    <div class="compact-main">
                        <span class="card-icon ${ws.protocolId.toLowerCase()}">${window.SVGIcons?.folder || '📁'}</span>
                        <div style="display: flex; flex-direction: column;">
                            <span class="card-title">${ws.title || 'Tema Provisório'}</span>
                            <span style="font-size: 11px; color: var(--color-gray-500);">${ws.area || 'Área não definida'}</span>
                        </div>
                    </div>
                    <div class="compact-meta">
                        <span class="meta-tag">${protocolName}</span>
                        ${reviewBadge}
                        <span class="meta-date">${timeStr}</span>
                    </div>
                    <div class="compact-actions">
                        ${cardHeaderAction}
                    </div>
                </div>
            `;
        } else if (this.state.currentView === 'list') {
            return `
                <div class="project-card list-card ${selectedClass}" data-id="${ws.id}" style="${isSelected ? 'background: #f0f7ff; border-color: #bbd8fa;' : ''}">
                    <div class="list-col-main" style="display: flex; flex-direction: column; justify-content: center;">
                        <h3 class="card-title">${ws.title || 'Tema Provisório'}</h3>
                        <span style="font-size: 11px; color: var(--color-gray-500);">${ws.area || 'Área não definida'}</span>
                    </div>
                    <div class="list-col-step">
                        <span class="meta-tag">${protocolName}</span>
                        <span style="font-size: 12px; margin-left: 8px;">Etapa ${stepIndex}/${totalSteps}</span>
                    </div>
                    <div class="list-col-status">${reviewBadge}</div>
                    <div class="list-col-date">${timeStr}</div>
                    <div class="list-col-actions">
                        ${cardHeaderAction}
                    </div>
                </div>
            `;
        } else {
            // GRID view
            return `
                <div class="project-card grid-card border-${statusClass} ${selectedClass}" data-id="${ws.id}" style="${isSelected ? 'background: #f0f7ff; border-color: #bbd8fa;' : ''}">
                    <div class="card-header" style="align-items: flex-start;">
                        <div style="flex: 1;">
                            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-gray-500); letter-spacing: 0.5px;">${ws.area || 'Área não definida'}</span>
                            <h3 class="card-title" style="margin-top: 4px;">${ws.title || 'Tema Provisório'}</h3>
                        </div>
                        ${cardHeaderAction}
                    </div>
                    <div class="card-body">
                        <span class="meta-tag">${protocolName}</span>
                        <span class="meta-step">${stepIndex === 1 && statusText !== 'Concluído' ? 'Em definição' : `Etapa ${stepIndex} de ${totalSteps}`}</span>
                    </div>
                    <div class="card-footer">
                        ${reviewBadge}
                        <span class="meta-date">${timeStr}</span>
                    </div>
                </div>
            `;
        }
    }

    attachEvents() {
        // Search
        const searchInput = this.container.querySelector('#explorer-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.state.searchQuery = e.target.value;
                this.render();
                // Focus back on input after render
                const newSearch = this.container.querySelector('#explorer-search-input');
                if (newSearch) {
                    newSearch.focus();
                    const len = newSearch.value.length;
                    newSearch.setSelectionRange(len, len);
                }
            });
        }

        // Tabs
        this.container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.currentTab = e.target.dataset.tab;
                this.render();
            });
        });

        // View Toggles
        this.container.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.currentView = e.target.dataset.view;
                this.render();
            });
        });

        // Sort
        const sortSelect = this.container.querySelector('#explorer-sort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.state.sortBy = e.target.value;
                this.render();
            });
        }

        // Project Card Clicks
        this.container.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Ignore if clicked on favorite or menu
                if (e.target.closest('.btn-favorite') || e.target.closest('.btn-menu')) return;
                
                const wid = card.getAttribute('data-id');

                if (this.state.isSelectionMode) {
                    if (this.state.selectedIds.has(wid)) {
                        this.state.selectedIds.delete(wid);
                    } else {
                        this.state.selectedIds.add(wid);
                    }
                    this.render();
                    return;
                }
                
                if (window.rgWorkspace && window.rgEventBus) {
                    if (window.rgWorkspace.loadWorkspaceById(wid)) {
                        window.rgEventBus.emit('engine:stateChanged', { view: 'MAIN', payload: null });
                    }
                }
            });
        });

        // Favorite Clicks
        this.container.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wid = btn.getAttribute('data-id');
                if (window.rgResearchIdentity) {
                    window.rgResearchIdentity.toggleFavorite(wid);
                    this.render();
                }
            });
        });

        // Menu Clicks (Delegate to AppShell's existing menu logic for now)
        this.container.querySelectorAll('.btn-menu').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wid = btn.getAttribute('data-id');
                const isArchived = this.state.currentTab === 'archived';
                
                // Assuming AppShell is globally accessible or we dispatch an event
                // To keep it simple, we can emit an event or call global if exposed
                if (window.rgAppShell) {
                    window.rgAppShell.createDropdown(wid, isArchived, btn);
                }
            });
        });

        this._bindSelectionEvents();
    }

    _bindSelectionEvents() {
        const btnEnter = document.getElementById('btn-enter-selection-mode');
        const btnExit = document.getElementById('btn-exit-selection-mode');
        const btnSelectAll = document.getElementById('btn-select-all-results');
        const btnBulkFavorite = document.getElementById('btn-bulk-favorite');
        const btnBulkDelete = document.getElementById('btn-bulk-delete');
        
        const zoneNav = document.getElementById('header-zone-nav');
        const zoneSelection = document.getElementById('header-zone-selection');
        const zoneUser = document.getElementById('header-zone-user');
        const counter = document.getElementById('selection-counter');

        const allWorkspaces = window.rgResearchIdentity ? window.rgResearchIdentity.getAllWorkspaces() : [];
        
        if (btnEnter) {
            // Só mostra o botão se houver mais que 1 projeto
            if (allWorkspaces.length > 1 && !this.state.isSelectionMode) {
                btnEnter.classList.remove('hidden');
            } else {
                btnEnter.classList.add('hidden');
            }
            
            // Remove antigos listeners copiando o node (truque simples) se necessário, ou usamos onclick
            btnEnter.onclick = () => {
                this.state.isSelectionMode = true;
                this.state.selectedIds.clear();
                this.render();
            };
        }

        if (this.state.isSelectionMode) {
            if (zoneNav) zoneNav.classList.add('hidden');
            if (zoneUser) zoneUser.classList.add('hidden');
            if (zoneSelection) {
                zoneSelection.style.transition = 'opacity 150ms ease';
                zoneSelection.classList.remove('hidden');
                // Trigger reflow
                void zoneSelection.offsetWidth;
                zoneSelection.style.opacity = '1';
            }
            if (counter) {
                const num = this.state.selectedIds.size;
                counter.innerText = num === 1 ? '1 investigação selecionada' : `${num} investigações selecionadas`;
            }
        } else {
            if (zoneNav) zoneNav.classList.remove('hidden');
            if (zoneUser) zoneUser.classList.remove('hidden');
            if (zoneSelection) {
                zoneSelection.style.transition = 'opacity 150ms ease';
                zoneSelection.style.opacity = '0';
                setTimeout(() => {
                    if (!this.state.isSelectionMode) zoneSelection.classList.add('hidden');
                }, 150);
            }
        }

        if (btnExit) {
            btnExit.onclick = () => {
                this.state.isSelectionMode = false;
                this.state.selectedIds.clear();
                this.render();
            };
        }

        if (btnSelectAll) {
            btnSelectAll.onclick = () => {
                if (this.currentFiltered) {
                    if (this.state.selectedIds.size === this.currentFiltered.length) {
                        this.state.selectedIds.clear(); // Toggle deselect all
                    } else {
                        this.currentFiltered.forEach(ws => this.state.selectedIds.add(ws.id));
                    }
                    this.render();
                }
            };
        }

        if (btnBulkFavorite) {
            btnBulkFavorite.onclick = () => {
                if (this.state.selectedIds.size > 0 && window.rgResearchIdentity) {
                    window.rgResearchIdentity.favoriteProjects(Array.from(this.state.selectedIds));
                    this.state.isSelectionMode = false;
                    this.state.selectedIds.clear();
                    this.render();
                }
            };
        }

        if (btnBulkDelete) {
            btnBulkDelete.onclick = () => {
                if (this.state.selectedIds.size > 0 && window.rgResearchIdentity) {
                    const num = this.state.selectedIds.size;
                    const msg = num === 1 ? 'Eliminar 1 investigação?' : `Eliminar ${num} investigações?`;
                    if (confirm(`${msg}\n\nEsta operação não pode ser desfeita.`)) {
                        window.rgResearchIdentity.deleteProjects(Array.from(this.state.selectedIds));
                        this.state.isSelectionMode = false;
                        this.state.selectedIds.clear();
                        this.render();
                    }
                }
            };
        }
    }

    handleEvent(e) {
        // Handle external events if needed
    }
}

window.ProjectExplorer = ProjectExplorer;
