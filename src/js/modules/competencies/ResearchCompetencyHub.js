class ResearchCompetencyHub {
    constructor() {
        this.containerId = 'research-competency-hub';
        this.modules = window.RESEARCH_MODULES || [];
        this.activeFilter = 'all'; // all, available, planned
        this.searchQuery = '';
        this.activeProfile = null; // 'Estudante', 'Investigador', 'Supervisor', 'Docente'
        
        // Define recommendations by profile
        this.profileRecommendations = {
            'Estudante': 'RL',
            'Investigador': 'PI',
            'Supervisor': 'SUP',
            'Docente': 'MC'
        };
    }

    init() {
        this._buildUI();
        this._bindEvents();
        this.render();
    }

    _buildUI() {
        if (document.getElementById(this.containerId)) return;

        const overlay = document.createElement('div');
        overlay.id = this.containerId;
        overlay.className = 'hidden';
        overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: stretch;
            padding: var(--space-4);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = document.createElement('div');
        content.id = 'rch-content-box';
        content.style.cssText = `
            background: var(--color-gray-50);
            width: 100%;
            max-width: 1200px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        // Calculate counts
        const totalModules = this.modules.length;
        const availableModules = this.modules.filter(m => m.status === 'available').length;

        content.innerHTML = `
            <!-- Header -->
            <div style="background: var(--color-primary-900); padding: 1.5rem 2rem; color: white; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <span style="width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center; color: white; background: rgba(255,255,255,0.15); border-radius: 8px;">
                            ${window.SVGIcons?.layers || '📚'}
                        </span>
                        <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; color: white;">Centro de Competências em Investigação</h2>
                    </div>
                    <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 0.95rem; max-width: 600px;">Desenvolva competências ao longo de todo o ciclo de vida da investigação científica. O ResearchAI Hub atua como o seu Sistema Operativo de Investigação.</p>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;">
                    <button id="btn-close-competencies" style="background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; padding: 0.5rem; border-radius: 50%; opacity: 0.8; transition: opacity 0.2s; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;" title="Fechar">
                        ${window.SVGIcons?.x || '✕'}
                    </button>
                    <div style="background: rgba(0,0,0,0.2); padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: bold; border: 1px solid rgba(255,255,255,0.1);">
                        ${availableModules} / ${totalModules} DISPONÍVEIS
                    </div>
                </div>
            </div>

            <!-- Toolbar (Percurso + Search + Filters) -->
            <div style="background: white; padding: 1rem 2rem; border-bottom: 1px solid var(--color-gray-200); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
                
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-gray-700);">Onde pretende começar?</span>
                    <div class="rch-profile-filters" style="display: flex; gap: 0.5rem; background: var(--color-gray-100); padding: 2px; border-radius: 20px;">
                        ${['Estudante', 'Investigador', 'Supervisor', 'Docente'].map(p => `
                            <button class="rch-profile-btn" data-profile="${p}" style="border: none; background: transparent; padding: 0.25rem 0.75rem; border-radius: 18px; font-size: 0.75rem; font-weight: 600; color: var(--color-gray-600); cursor: pointer; transition: all 0.2s;">
                                ${p}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="position: relative; width: 250px;">
                        <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--color-gray-400); width: 16px; height: 16px;">
                            ${window.SVGIcons?.search || '🔍'}
                        </span>
                        <input type="text" id="rch-search" placeholder="Pesquisar módulo..." style="width: 100%; padding: 0.5rem 0.5rem 0.5rem 2rem; border: 1px solid var(--color-gray-300); border-radius: 8px; font-size: 0.85rem;">
                    </div>
                </div>
            </div>

            <!-- Body (Modules Grid) -->
            <div id="rch-body" style="flex: 1; overflow-y: auto; padding: 2rem; display: flex; flex-direction: column; gap: 3rem;">
                <!-- Content will be injected here -->
            </div>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        // Details Modal HTML
        const modal = document.createElement('div');
        modal.id = 'rch-modal';
        modal.className = 'hidden';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5); z-index: 10000;
            display: flex; justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.2s; padding: 1rem;
        `;
        modal.innerHTML = `
            <div id="rch-modal-content" style="background: white; width: 100%; max-width: 500px; border-radius: 12px; padding: 2rem; transform: scale(0.95); transition: transform 0.2s; position: relative;">
                <button id="rch-modal-close" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; cursor: pointer; color: var(--color-gray-500);">${window.SVGIcons?.x || '✕'}</button>
                <div id="rch-modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    _bindEvents() {
        document.getElementById('btn-close-competencies')?.addEventListener('click', () => this.close());
        document.getElementById('btn-competency-hub')?.addEventListener('click', () => this.open());
        
        // Profile filters
        const profileBtns = document.querySelectorAll('.rch-profile-btn');
        profileBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const p = e.target.getAttribute('data-profile');
                if (this.activeProfile === p) {
                    this.activeProfile = null; // toggle off
                } else {
                    this.activeProfile = p;
                }
                this._updateProfileButtons();
                this.render();
            });
        });

        // Search
        document.getElementById('rch-search')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Modal Close
        document.getElementById('rch-modal-close')?.addEventListener('click', () => this.closeModal());
        document.getElementById('rch-modal')?.addEventListener('click', (e) => {
            if(e.target.id === 'rch-modal') this.closeModal();
        });
    }

    _updateProfileButtons() {
        const btns = document.querySelectorAll('.rch-profile-btn');
        btns.forEach(btn => {
            if (btn.getAttribute('data-profile') === this.activeProfile) {
                btn.style.background = 'white';
                btn.style.color = 'var(--color-primary-600)';
                btn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            } else {
                btn.style.background = 'transparent';
                btn.style.color = 'var(--color-gray-600)';
                btn.style.boxShadow = 'none';
            }
        });
    }

    open() {
        this.init();
        const el = document.getElementById(this.containerId);
        const box = document.getElementById('rch-content-box');
        if (!el) return;
        el.classList.remove('hidden');
        // Trigger reflow
        void el.offsetWidth;
        el.style.opacity = '1';
        box.style.transform = 'translateY(0)';
    }

    close() {
        const el = document.getElementById(this.containerId);
        const box = document.getElementById('rch-content-box');
        if (!el) return;
        el.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        setTimeout(() => el.classList.add('hidden'), 300);
    }

    handleCardAction(id, event) {
        const mod = this.modules.find(m => m.id === id);
        if (!mod) return;

        if (mod.status === 'available') {
            this.close();
            // Try to open workflow or resource hub
            if (mod.route && mod.route.startsWith('workflow:')) {
                const wfId = mod.route.split(':')[1];
                if (window.appShell && window.appShell.startNewProject) {
                    window.appShell.startNewProject(wfId);
                } else {
                    if (window.toast) window.toast.error(`Não foi possível iniciar o fluxo de trabalho.`);
                }
            } else {
                if (window.toast) window.toast.info(`Iniciando o módulo ${mod.title}...`);
            }
        } else {
            this.showDetailsModal(mod);
        }
    }

    showDetailsModal(mod) {
        const modal = document.getElementById('rch-modal');
        const body = document.getElementById('rch-modal-body');
        const content = document.getElementById('rch-modal-content');
        
        let enablesHTML = (mod.whatItEnables || []).map(item => `<li style="margin-bottom: 4px; color: var(--color-gray-700);">${item}</li>`).join('');
        let skillsHTML = (mod.skillsDeveloped || []).map(skill => `<span style="display: inline-block; padding: 2px 8px; background: var(--color-gray-100); border-radius: 4px; font-size: 0.75rem; margin-right: 4px; margin-bottom: 4px; border: 1px solid var(--color-gray-200);">${skill}</span>`).join('');
        let toolsHTML = (mod.aiTools || []).map(tool => `<span style="font-weight: 600; font-size: 0.8rem; color: var(--color-primary-600); margin-right: 12px; display: inline-flex; align-items: center; gap: 4px;"><span style="width: 14px; height: 14px;">${window.SVGIcons?.brain || '🤖'}</span> ${tool}</span>`).join('');

        body.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: var(--color-primary-50); color: var(--color-primary-600); display: flex; justify-content: center; align-items: center; font-size: 1.25rem;">
                    ${window.SVGIcons ? (window.SVGIcons[mod.icon] || '📁') : '📁'}
                </div>
                <div>
                    <h3 style="margin: 0; font-size: 1.25rem; color: var(--color-gray-900);">${mod.title}</h3>
                    <span style="display: inline-block; padding: 2px 8px; font-size: 0.75rem; font-weight: 600; background: var(--color-gray-100); border-radius: 12px; margin-top: 4px;">ROADMAP: ${mod.version || 'Futuro'}</span>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--color-gray-800); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200); padding-bottom: 4px;">O que irá permitir</h4>
                <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem;">
                    ${enablesHTML}
                </ul>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--color-gray-800); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200); padding-bottom: 4px;">Competências Desenvolvidas</h4>
                <div style="margin-top: 8px;">${skillsHTML}</div>
            </div>

            <div style="margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--color-gray-800); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--color-gray-200); padding-bottom: 4px;">Ferramentas IA Previstas</h4>
                <div style="margin-top: 8px; display: flex; flex-wrap: wrap;">${toolsHTML}</div>
            </div>
            
            <div style="margin-top: 2rem; display: flex; justify-content: flex-end;">
                <button class="btn btn-primary" onclick="window.researchCompetencyHubInstance.closeModal()">Compreendi</button>
            </div>
        `;

        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }

    closeModal() {
        const modal = document.getElementById('rch-modal');
        const content = document.getElementById('rch-modal-content');
        if (!modal) return;
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.95)';
        setTimeout(() => modal.classList.add('hidden'), 200);
    }

    render() {
        const body = document.getElementById('rch-body');
        if (!body) return;
        
        body.innerHTML = '';

        let filtered = this.modules;
        if (this.searchQuery) {
            filtered = filtered.filter(m => m.title.toLowerCase().includes(this.searchQuery) || m.description.toLowerCase().includes(this.searchQuery));
        }

        const phases = ['PLANEAMENTO', 'EXECUÇÃO', 'DISSEMINAÇÃO', 'SUPERVISÃO'];

        let recommendedId = null;
        if (this.activeProfile && this.profileRecommendations[this.activeProfile]) {
            recommendedId = this.profileRecommendations[this.activeProfile];
        }

        phases.forEach(phase => {
            const phaseMods = filtered.filter(m => m.category === phase);
            if (phaseMods.length === 0) return;

            // Sort so recommended is first in its section (or we could extract it to a top section)
            phaseMods.sort((a, b) => {
                if (a.id === recommendedId) return -1;
                if (b.id === recommendedId) return 1;
                return 0;
            });

            const section = document.createElement('div');
            
            const header = document.createElement('div');
            header.style.cssText = `
                display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;
            `;
            header.innerHTML = `
                <h3 style="margin: 0; font-size: 1rem; color: var(--color-gray-800); font-weight: 700; letter-spacing: 0.1em; border-bottom: 2px solid var(--color-gray-300); padding-bottom: 4px;">
                    Fase: ${phase}
                </h3>
                <div style="flex: 1; height: 1px; background: var(--color-gray-200);"></div>
            `;
            
            const grid = document.createElement('div');
            grid.style.cssText = `
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.5rem;
            `;

            phaseMods.forEach(mod => {
                const isRec = mod.id === recommendedId;
                grid.innerHTML += window.CompetencyCard.render(mod, isRec);
            });

            section.appendChild(header);
            section.appendChild(grid);
            body.appendChild(section);
        });

        if (filtered.length === 0) {
            body.innerHTML = `<div style="text-align: center; padding: 4rem; color: var(--color-gray-500);">Nenhum módulo encontrado.</div>`;
        }
    }
}

window.ResearchCompetencyHub = ResearchCompetencyHub;
