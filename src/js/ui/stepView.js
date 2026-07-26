/**
 * StepView: Vista final hospedeira do Rendering Engine (Fase 3 - Advanced).
 * Não detém qualquer lógica de decisão visual ou condicional.
 */

class StepView {
    init() {
        if (window.rgEventBus) {
            window.rgEventBus.on('step:changed', (stepId) => this.render(stepId));
        }
    }

    render(stepId) {
        const container = document.getElementById('step-container');
        if (!container || !window.rgRenderingEngine) return;

        // 1. O Motor cria a pipeline (Orquestração)
        const pipeline = window.rgRenderingEngine.createPipeline(stepId);
        if (!pipeline.context || pipeline.activePanels.length === 0) {
            container.innerHTML = '';
            return;
        }

        // 2. A Vista constrói as áreas vazias
        container.innerHTML = '';
        const workspace = document.createElement('div');
        workspace.className = 'slo-workspace';
        workspace.style.display = 'flex';
        workspace.style.gap = '2rem';
        workspace.style.marginTop = '2rem';

        // 3. Renderizar Learning Navigator apenas para os Active Panels
        workspace.innerHTML = `
            ${this.renderLearningNavigator(pipeline.activePanels)}
            <div class="slo-content" style="flex: 1; min-width: 0; padding-bottom: 4rem;">
                <!-- Semantic Document Layout sem .card -->
                ${pipeline.activePanels.map(panel => panel.render(pipeline.context)).join('')}
            </div>
        `;
        
        container.appendChild(workspace);

        // 4. Ligar eventos no ciclo de vida attachListeners
        pipeline.activePanels.forEach(panel => {
            if (typeof panel.attachListeners === 'function') {
                panel.attachListeners(pipeline.context);
            }
        });
        
        this.attachGlobalListeners();
    }

    renderLearningNavigator(activePanels) {
        let navHtml = `<div class="learning-navigator" style="position: sticky; top: 6rem; display: flex; flex-direction: column; gap: 0.25rem; border-right: 1px solid var(--color-gray-200); padding-right: 1rem; height: calc(100vh - 8rem); overflow-y: auto; width: 280px; flex-shrink: 0;">`;
        navHtml += `<h4 style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-500); margin-bottom: 0.75rem; padding-left: 1.25rem; letter-spacing: 0.05em;">Etapa</h4>`;
        
        const navItem = (id, icon, title) => `
            <a href="#slo-${id}" data-nav-id="${id}" class="nav-item" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.4rem 0.5rem 0.4rem 1.25rem; border-radius: var(--radius-md); color: var(--color-gray-600); text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: all 0.2s; position: relative;">
                <div class="nav-indicator" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 0; background: var(--color-primary-500); border-radius: 4px; transition: height 0.2s;"></div>
                <span>${icon}</span> <span>${title}</span>
            </a>
        `;

        activePanels.forEach(panel => {
            // Utiliza .title em vez do antigo .label
            navHtml += navItem(panel.id, panel.icon, panel.title);
        });

        navHtml += `</div>`;
        return navHtml;
    }

    attachGlobalListeners() {
        const navItems = document.querySelectorAll('.learning-navigator .nav-item');
        
        // Hover effects
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.background = 'var(--color-gray-50)';
                    item.style.color = 'var(--color-gray-900)';
                }
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.background = 'transparent';
                    item.style.color = 'var(--color-gray-600)';
                }
            });
        });

        // Scroll Spy
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id.replace('slo-', '');
                    
                    // Reset all
                    navItems.forEach(nav => {
                        nav.classList.remove('active');
                        nav.style.background = 'transparent';
                        nav.style.color = 'var(--color-gray-600)';
                        nav.style.fontWeight = '500';
                        const ind = nav.querySelector('.nav-indicator');
                        if(ind) ind.style.height = '0';
                    });

                    // Set active
                    const activeNav = document.querySelector(`.nav-item[data-nav-id="${id}"]`);
                    if (activeNav) {
                        activeNav.classList.add('active');
                        activeNav.style.background = 'var(--color-primary-50)';
                        activeNav.style.color = 'var(--color-primary-700)';
                        activeNav.style.fontWeight = '600';
                        const ind = activeNav.querySelector('.nav-indicator');
                        if(ind) ind.style.height = '60%';
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        document.querySelectorAll('.slo-panel').forEach(panel => observer.observe(panel));
    }

    updateStrategy(strategy, promptId) {
        if (window.rgWorkspace) {
            window.rgWorkspace.savePreference('promptStrategy', strategy);
        }
        
        const contentDiv = document.getElementById(`prompt-content-${promptId}`);
        if (contentDiv && window.rgTemplateEngine) {
            if (strategy === 'custom') return; 
            
            const resolvedPrompt = window.rgTemplateEngine.resolvePrompt(promptId, null, strategy);
            const promptEscaped = resolvedPrompt.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            contentDiv.innerHTML = promptEscaped;
        }

        const toast = document.getElementById(`strategy-toast-${promptId}`);
        if (toast) {
            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 1500);
        }
    }
}

const stepView = new StepView();
window.rgStepView = stepView;
