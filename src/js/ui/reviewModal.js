/**
 * Review Modal
 * Gere o fluxo de Validação Híbrida (Estrutural e Metodológica).
 */
class ReviewModal {
    constructor() {
        this.currentStepId = null;
        this.stepConfig = null;
        this.onSuccess = null;
        this.overlay = null;
    }

    /**
     * Inicia o fluxo de revisão para uma transição de etapa.
     */
    requestReview(stepId, stepConfig, onSuccessCallback) {
        this.currentStepId = stepId;
        this.stepConfig = stepConfig;
        this.onSuccess = onSuccessCallback;

        // Se não houver config de validação, prossegue direto
        if (!stepConfig || !stepConfig.validation) {
            if (this.onSuccess) this.onSuccess();
            return;
        }

        // Se já tiver uma review PASS persistida, prossegue.
        if (window.rgWorkspace) {
            const existingReview = window.rgWorkspace.getReview(stepId);
            if (existingReview && existingReview.status === 'PASS' && existingReview.structuralValid) {
                if (this.onSuccess) this.onSuccess();
                return;
            }
        }

        const artifactContent = window.rgWorkspace ? window.rgWorkspace.getArtifact(stepId) : '';
        const structuralResult = window.rgReviewEngine ? window.rgReviewEngine.evaluateStructural(artifactContent, stepConfig) : { valid: true, errors: [] };

        this._render(structuralResult, artifactContent);
    }

    _render(structuralResult, artifactContent) {
        if (this.overlay) {
            this.overlay.remove();
        }

        const methodoConfig = window.rgReviewEngine.getMethodologicalConfig(this.stepConfig);
        const hasMethodo = !!methodoConfig;
        
        let contentHtml = '';

        if (!structuralResult.valid) {
            // Falha Crítica Estrutural
            const errorsHtml = structuralResult.errors.map(err => `<li style="margin-bottom: 8px;">${err}</li>`).join('');
            contentHtml = `
                <div style="padding: 16px; background: var(--color-error-50); border: 1px solid var(--color-error-200); border-radius: 8px; margin-bottom: 24px;">
                    <h4 style="color: var(--color-error-800); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.2em;">⚠️</span> Erros Estruturais Críticos
                    </h4>
                    <ul style="color: var(--color-error-700); padding-left: 20px; margin: 0; font-size: 14px;">
                        ${errorsHtml}
                    </ul>
                </div>
                <div style="text-align: right;">
                    <button id="rm-btn-rever" class="btn btn-primary">Rever Artefacto</button>
                </div>
            `;
        } else {
            // Sucesso estrutural
            let methodoHtml = '';
            
            if (hasMethodo) {
                methodoHtml = `
                    <div style="padding: 16px; border: 1px solid var(--color-gray-200); border-radius: 8px; margin-bottom: 24px;">
                        <h4 style="color: var(--color-gray-800); margin-bottom: 8px;">Revisão Metodológica</h4>
                        <p style="font-size: 14px; color: var(--color-gray-600); margin-bottom: 16px;">
                            Este critério exige interpretação científica. Copie o prompt de validação e cole a resposta do Assistente abaixo.
                        </p>
                        
                        <button id="rm-btn-copy-prompt" class="btn btn-ghost" style="width: 100%; margin-bottom: 16px; border: 1px solid var(--color-gray-200);">
                            📋 Copiar Prompt de Validação
                        </button>

                        <label style="display: block; font-size: 12px; font-weight: 600; color: var(--color-gray-700); margin-bottom: 8px;">
                            Parecer do Assistente
                        </label>
                        <textarea id="rm-methodo-input" rows="3" placeholder="Cole a resposta estruturada aqui (ex: [VALIDAÇÃO PASS]...)" style="width: 100%; padding: 12px; border: 1px solid var(--color-gray-300); border-radius: 6px; font-family: inherit; font-size: 14px; resize: vertical; margin-bottom: 8px;"></textarea>
                        
                        <div id="rm-methodo-status" style="font-size: 13px; font-weight: 600; min-height: 20px;"></div>
                    </div>
                `;
            }

            contentHtml = `
                <div style="padding: 12px; background: var(--color-success-50); border: 1px solid var(--color-success-200); border-radius: 8px; margin-bottom: 16px;">
                    <span style="color: var(--color-success-700); font-size: 14px; font-weight: 600;">✓ Verificação estrutural passou.</span>
                </div>
                ${methodoHtml}
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
                    <button id="rm-btn-rever" class="btn btn-ghost">Voltar / Rever</button>
                    <button id="rm-btn-continuar" class="btn btn-primary">Continuar assim mesmo</button>
                </div>
            `;
        }

        const modalHtml = `
            <div id="review-modal-overlay" style="position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); z-index: 9999; display:flex; justify-content:center; align-items:center;">
                <div style="background: white; padding: 32px; border-radius: 12px; width: 600px; max-width: 95%; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 25px rgba(0,0,0,0.15);">
                    <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 20px; color: var(--color-gray-900);">Assistente de Revisão</h3>
                    <p style="color: var(--color-gray-500); font-size: 14px; margin-bottom: 24px;">Verificação da Etapa: ${this.stepConfig.name}</p>
                    
                    ${contentHtml}
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        this.overlay = document.getElementById('review-modal-overlay');

        this._bindEvents(structuralResult, methodoConfig, artifactContent);
    }

    _bindEvents(structuralResult, methodoConfig, artifactContent) {
        const btnRever = document.getElementById('rm-btn-rever');
        if (btnRever) {
            btnRever.addEventListener('click', () => {
                this._close();
            });
        }

        const btnCopy = document.getElementById('rm-btn-copy-prompt');
        if (btnCopy && methodoConfig) {
            btnCopy.addEventListener('click', () => {
                const promptData = window.PROMPTS ? window.PROMPTS[methodoConfig.promptId] : null;
                if (promptData && promptData.template) {
                    // Preenche o template com os dados do workspace
                    let text = promptData.template;
                    text = text.replace(/\{\{artifactContent\}\}/g, artifactContent);
                    text = text.replace(/\{\{PERGUNTA\}\}/g, artifactContent);
                    text = text.replace(/\{\{PALAVRAS_CHAVE\}\}/g, artifactContent);
                    
                    if (window.rgWorkspace) {
                        const wsData = window.rgWorkspace.getData();
                        const area = wsData.area || '';
                        // Tem que puxar o TEMA real usando o novo mapeamento
                        const tema = window.rgWorkspace.getArtifactByVariable('TEMA') || area;
                        text = text.replace(/\{\{TEMA\}\}/g, tema);
                        
                        // Se formos validar palavras-chave, precisamos injetar a Pergunta real
                        const pergunta = window.rgWorkspace.getArtifactByVariable('PERGUNTA') || '';
                        text = text.replace(/\{\{perguntaInvestigacao\}\}/g, pergunta);
                    }
                    
                    if (window.rgClipboard) {
                        window.rgClipboard.copyText(text);
                        const originalText = btnCopy.innerHTML;
                        btnCopy.innerHTML = "✓ Prompt Copiado!";
                        btnCopy.style.background = "var(--color-success-500)";
                        btnCopy.style.color = "white";
                        setTimeout(() => {
                            btnCopy.innerHTML = originalText;
                            btnCopy.style.background = "";
                            btnCopy.style.color = "";
                        }, 2000);
                    }
                }
            });
        }

        const inputArea = document.getElementById('rm-methodo-input');
        const statusArea = document.getElementById('rm-methodo-status');
        const btnContinuar = document.getElementById('rm-btn-continuar');
        let currentStatus = 'PENDING';

        if (inputArea && statusArea) {
            inputArea.addEventListener('input', (e) => {
                const val = e.target.value.trim().toUpperCase();
                // Separa o texto pelo fim de linha para extrair o resumo
                const lines = e.target.value.trim().split('\n');
                let rawObservations = lines.length > 1 ? lines.slice(1).join('\n').trim() : '';
                
                // Formatação simples do resumo para HTML
                const formatObservations = (text) => {
                    if (!text) return '';
                    return '<div style="margin-top: 12px; padding: 12px; background: rgba(255,255,255,0.6); border-radius: 6px; font-size: 13px; color: var(--color-gray-800); border-left: 3px solid currentColor;">' + 
                           '<strong style="display: block; margin-bottom: 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Resumo:</strong>' +
                           text.replace(/\n/g, '<br>') + 
                           '</div>';
                };

                if (val.includes('[VALIDAÇÃO PASS]')) {
                    statusArea.innerHTML = '<span style="color: var(--color-success-600); display: block;">✓ Parecer Favorável. Pode avançar com segurança.</span>' + formatObservations(rawObservations);
                    currentStatus = 'PASS';
                    if(btnContinuar) btnContinuar.innerText = "Continuar";
                } else if (val.includes('[VALIDAÇÃO WARNING]')) {
                    statusArea.innerHTML = '<span style="color: var(--color-warning-600); display: block;">⚠ O Assistente sugere melhorias, embora a estrutura seja válida.</span>' + formatObservations(rawObservations);
                    currentStatus = 'WARNING';
                    if(btnContinuar) btnContinuar.innerText = "Continuar assim mesmo";
                } else if (val.includes('[VALIDAÇÃO FAIL]')) {
                    statusArea.innerHTML = '<span style="color: var(--color-error-600); display: block;">❌ O Assistente detetou problemas estruturais graves.</span>' + formatObservations(rawObservations);
                    currentStatus = 'FAIL';
                    if(btnContinuar) btnContinuar.innerText = "Continuar assim mesmo";
                } else if (val === '') {
                    statusArea.innerHTML = '';
                    currentStatus = 'PENDING';
                }
            });
        }

        if (btnContinuar) {
            btnContinuar.addEventListener('click', () => {
                // Guarda o estado se for PASS ou FAIL
                if (window.rgWorkspace) {
                    window.rgWorkspace.saveReview(this.currentStepId, {
                        structuralValid: structuralResult.valid,
                        status: currentStatus,
                        observations: inputArea ? inputArea.value : ''
                    });
                }
                
                this._close();
                if (this.onSuccess) this.onSuccess();
            });
        }
    }

    _close() {
        if (this.overlay) {
            this.overlay.remove();
            this.overlay = null;
        }
    }
}

const reviewModal = new ReviewModal();
window.rgReviewModal = reviewModal;
