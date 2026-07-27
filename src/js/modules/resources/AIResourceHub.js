class AIResourceHub {
    constructor() {
        this.containerId = 'ai-resource-hub';
        this.resources = [];
        this.activeProfile = 'Investigador';
    }

    init() {
        this._buildUI();
        this._loadAssets();
        this._bindEvents();
    }

    
    _loadAssets() {
        this.resources = [];
        let activeWfId = Object.keys(window.WORKFLOWS || {})[0];
        if (window.rgWorkspace) {
            activeWfId = window.rgWorkspace.getData().workflowId || activeWfId;
        }
        
        // Map current workflow steps to independent resources
        if (window.WORKFLOWS && window.WORKFLOWS[activeWfId]) {
            const steps = window.WORKFLOWS[activeWfId].steps;

            steps.forEach(step => {
                const primaryPromptId = step.prompts && step.prompts[0];
                const promptData = primaryPromptId && window.PROMPTS ? window.PROMPTS[primaryPromptId] : null;
                
                const tools = (step.tools || []).map(tId => window.TOOLS ? window.TOOLS[tId] : { name: tId }).filter(Boolean);

                
                // Build knowledge snippet
                let knowledge = [];
                const kn = step.knowledgeId && window.KNOWLEDGE ? window.KNOWLEDGE[step.knowledgeId] : null;
                if (kn) {
                    if (kn.learningOutcome) knowledge.push({ title: 'O que vai aprender', content: kn.learningOutcome });
                    if (kn.bestPractices) knowledge.push({ title: 'Boas Práticas', content: kn.bestPractices });
                    if (kn.commonErrors) knowledge.push({ title: 'Erros Frequentes', content: kn.commonErrors });
                }

                this.resources.push({
                    title: step.name,
                    category: promptData ? promptData.competency : 'Geral',
                    objective: promptData ? promptData.objective : step.description,
                    whenToUse: 'Antes de validar a coerência ou iniciar esta etapa da investigação.', // Extracted conceptually
                    knowledge: knowledge,
                    tools: tools,
                    prompt: promptData,
                    example: promptData ? promptData.example : null,
                    checklist: step.checklistId && window.CHECKLISTS && window.CHECKLISTS[step.checklistId] ? window.CHECKLISTS[step.checklistId].map(c => c.label) : []
                });
            });
        }
    }

    _buildUI() {
        // Create the overlay container
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
        content.style.cssText = `
            background: white;
            width: 100%;
            max-width: 1000px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(20px);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        content.innerHTML = `
            <!-- Header -->
            <div style="background: var(--color-gray-900); padding: 1.5rem 2rem; color: white; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="margin: 0; font-size: 1.5rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; color: white;">
                        <span style="width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; color: var(--color-primary-400);">${window.SVGIcons?.brain || '🤖'}</span> Centro de Recursos IA
                    </h2>
                    <p style="margin: 0.25rem 0 0 0; color: var(--color-gray-400); font-size: 0.9rem;">Modelos, ferramentas e conhecimento para investigação</p>
                </div>
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <div style="background: rgba(255,255,255,0.1); border-radius: 6px; padding: 0.25rem;">
                        <select style="background: transparent; border: none; color: white; font-weight: 600; outline: none; cursor: pointer; padding: 0.25rem 0.5rem;">
                            <option value="ul">Universidade Licungo</option>
                            <option value="uem" disabled>UEM (Brevemente)</option>
                            <option value="up" disabled>UP (Brevemente)</option>
                        </select>
                    </div>
                    <button id="btn-close-hub" style="background: transparent; border: none; color: white; cursor: pointer; padding: 0.5rem; opacity: 0.8; transition: opacity 0.2s;">
                        <span style="width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.x || '✕'}</span>
                    </button>
                </div>
            </div>
            
            <!-- Toolbar (Tabs & Search) -->
            <div style="padding: 1rem 2rem; border-bottom: 1px solid var(--color-gray-200); display: flex; justify-content: space-between; align-items: center; background: white; flex-wrap: wrap; gap: 1rem;">
                <div style="display: flex; gap: 0.5rem;" id="hub-tabs">
                    <button class="hub-tab active" data-profile="Investigador" style="padding: 0.5rem 1rem; font-weight: 600; font-size: 0.9rem; border-radius: var(--radius-full); cursor: pointer; transition: all 0.2s; border: none; background: var(--color-primary-100); color: var(--color-primary-800);">Investigador</button>
                    <button class="hub-tab" data-profile="Supervisor" style="padding: 0.5rem 1rem; font-weight: 600; font-size: 0.9rem; border-radius: var(--radius-full); cursor: pointer; transition: all 0.2s; border: none; background: transparent; color: var(--color-gray-500);">Supervisor</button>
                    <button class="hub-tab" data-profile="Docente" style="padding: 0.5rem 1rem; font-weight: 600; font-size: 0.9rem; border-radius: var(--radius-full); cursor: pointer; transition: all 0.2s; border: none; background: transparent; color: var(--color-gray-500);">Docente</button>
                </div>
                <div style="position: relative; width: 100%; max-width: 300px;">
                    <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-gray-400); width: 16px; height: 16px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.search || '🔍'}</span>
                    <input type="text" id="hub-search" placeholder="Pesquisar recursos, prompts..." style="width: 100%; padding: 0.5rem 1rem 0.5rem 2.25rem; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); outline: none; font-size: 0.9rem;">
                </div>
            </div>

            <!-- Content Area -->
            <div id="hub-content" style="flex: 1; overflow-y: auto; padding: 2rem; background: var(--color-gray-50);">
                <!-- Resources will be injected here -->
            </div>
        `;

        overlay.appendChild(content);
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.contentContainer = overlay.querySelector('#hub-content');
    }

    _bindEvents() {
        // App header button
        const openBtn = document.getElementById('btn-resource-hub');
        if (openBtn) {
            openBtn.addEventListener('click', () => this.open());
        }

        // Close button
        const closeBtn = document.getElementById('btn-close-hub');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Close on backdrop click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // Tabs
        const tabs = this.overlay.querySelectorAll('.hub-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => {
                    t.style.background = 'transparent';
                    t.style.color = 'var(--color-gray-500)';
                });
                const clicked = e.target;
                clicked.style.background = 'var(--color-primary-100)';
                clicked.style.color = 'var(--color-primary-800)';
                this.activeProfile = clicked.dataset.profile;
                this.render();
            });
        });

        // Search
        const searchInput = document.getElementById('hub-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.render(e.target.value);
            });
        }

        // Global Event for Clipboard
        this.contentContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-copy-prompt');
            if (btn) {
                const text = decodeURIComponent(btn.dataset.promptText);
                if (window.rgClipboard) {
                    window.rgClipboard.copyText(text, btn);
                } else {
                    navigator.clipboard.writeText(text);
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<span style="width: 12px; height: 12px; display: inline-flex; align-items: center; justify-content: center;">${window.SVGIcons?.check || '✅'}</span> Copiado!`;
                    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
                }
            }
        });
    }

    open() {
        this.overlay.classList.remove('hidden');
        // Force reflow
        void this.overlay.offsetWidth;
        this.overlay.style.opacity = '1';
        this.overlay.querySelector('div').style.transform = 'translateY(0)';
        this.render();
    }

    close() {
        this.overlay.style.opacity = '0';
        this.overlay.querySelector('div').style.transform = 'translateY(20px)';
        setTimeout(() => {
            this.overlay.classList.add('hidden');
        }, 300);
    }

    render(searchQuery = '') {
        this.contentContainer.innerHTML = '';
        
        if (this.activeProfile !== 'Investigador') {
            this.contentContainer.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--color-gray-500);">
                    <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🚧</div>
                    <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-gray-900); margin-bottom: 0.5rem;">Perfil em Desenvolvimento</h3>
                    <p>Os recursos para o perfil "${this.activeProfile}" estão a ser preparados para a próxima versão.</p>
                </div>
            `;
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = this.resources.filter(r => 
            (r.title && r.title.toLowerCase().includes(query)) ||
            (r.category && r.category.toLowerCase().includes(query)) ||
            (r.objective && r.objective.toLowerCase().includes(query))
        );

        if (filtered.length === 0) {
            this.contentContainer.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem; color: var(--color-gray-500);">
                    <p>Nenhum recurso encontrado para "${searchQuery}".</p>
                </div>
            `;
            return;
        }

        const frag = document.createDocumentFragment();
        filtered.forEach(data => {
            if (window.ResourceCard) {
                const card = new window.ResourceCard(data);
                const div = document.createElement('div');
                div.innerHTML = card.render();
                frag.appendChild(div.firstElementChild);
            }
        });
        
        this.contentContainer.appendChild(frag);
    }
}

window.AIResourceHub = AIResourceHub;
