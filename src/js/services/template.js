/**
 * Template Engine: Responsável por injetar variáveis de contexto (Workspace)
 * nos templates dos Prompts.
 */

class TemplateEngine {
    constructor() {
        this.workspace = null;
    }

    init() {
        this.workspace = window.rgWorkspace;
    }

    /**
     * Resolve um prompt template substituindo todas as {{VAR}}
     * @param {string} promptId ID do prompt (ex: PT-R-001)
     * @param {object} context Rendering context
     * @returns {string} Prompt com as variáveis substituídas
     */
    resolvePrompt(promptId, context, strategy = 'balanced') {
        if (!window.PROMPTS || !window.PROMPTS[promptId]) {
            return `[Erro: Prompt ${promptId} não encontrado]`;
        }

        let promptData = window.PROMPTS[promptId];
        let text = typeof promptData === 'string' ? promptData : promptData.template;
        
        if (!context) {
            if (!context && window.rgWorkspace) {
                context = window.rgWorkspace.buildResearchContext();
            } else {
                return text;
            }
        }

        // Encontrar todas as tags únicas {{VARIAVEL}}
        const regex = /\{\{([^}]+)\}\}/g;
        let match;
        const variables = new Set();
        
        while ((match = regex.exec(text)) !== null) {
            variables.add(match[1]);
        }

        // Substituir cada variável encontrada
        for (const varName of variables) {
            let value = '';
            
            // 1. Procura na raiz da investigação (title, area, workflow)
            if (context.research && context.research[varName] !== undefined) {
                value = context.research[varName];
            } 
            // 2. Procura nos artefactos pelo ID direto (caso o varName seja o ID da etapa)
            else if (context.artifacts && context.artifacts[varName]) {
                const art = context.artifacts[varName];
                value = typeof art === 'object' ? (art.content || '') : art;
            }
            // 3. Procura no mapeamento semântico de artefactos (ex: TEMA -> STEP-INV-01)
            else if (window.rgWorkspace && typeof window.rgWorkspace.getArtifactByVariable === 'function') {
                const mappedValue = window.rgWorkspace.getArtifactByVariable(varName);
                if (mappedValue) {
                    value = mappedValue;
                }
            }
            
            // Substitui todas as instâncias da variável (se não houver valor, limpa a tag)
            text = text.replace(new RegExp(`\\{\\{${varName}\\}\\}`, 'g'), value || '');
        }

        // Aplicar a estratégia
        if (strategy === 'guided') {
            text += `\n\n[Nota: Adote um papel de orientador metodológico. Explique o raciocínio passo a passo. Sempre que introduzir um conceito metodológico, faça uma breve explicação. Estruture a resposta em etapas claramente identificadas.]`;
        } else if (strategy === 'direct') {
            text += `\n\n[Nota: Assuma que o investigador conhece metodologia científica. Evite introduções e definições elementares. Concentre-se na análise, precisão e objetividade. Utilize linguagem técnica quando apropriado.]`;
        }
        // 'balanced' ou 'custom' não alteram o texto original

        return text;
    }
}

const templateEngine = new TemplateEngine();
window.rgTemplateEngine = templateEngine;
