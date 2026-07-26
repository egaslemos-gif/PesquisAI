/**
 * MethodologyEngine: Analisa o ResearchContext e produz o Research Analysis Report (RAR).
 * Segue o design pattern de Rules (plugins de heurísticas).
 */
class MethodologyEngine {
    constructor() {
        this.rules = [];
        this.lastReport = null;
    }

    init() {
        if (window.rgEventBus) {
            window.rgEventBus.on('research:updated', (context) => {
                const rar = this.analyze(context);
                window.rgEventBus.emit('rar:updated', { context, rar });
            });
        }
    }

    /**
     * Regista uma nova regra no motor.
     * @param {Object} rule Instância da regra (deve implementar evaluate(context))
     */
    registerRule(rule) {
        if (rule && typeof rule.evaluate === 'function') {
            this.rules.push(rule);
        } else {
            console.warn('[MethodologyEngine] Invalid rule registration attempted.');
        }
    }

    /**
     * Analisa o contexto global da investigação e emite o Research Analysis Report.
     * @param {Object} context ResearchContext
     * @returns {Object} Research Analysis Report (RAR)
     */
    analyze(context) {
        if (!context || !context.research) return null;

        const findings = [];
        const metrics = {
            theme: 100,
            question: 100,
            objectives: 100,
            keywords: 100
        };

        // Corre todas as regras
        for (const rule of this.rules) {
            try {
                const results = rule.evaluate(context);
                if (results) {
                    const ruleFindings = Array.isArray(results) ? results : [results];
                    for (const finding of ruleFindings) {
                        findings.push(finding);
                        
                        // Deduz pontuação (score) baseada na severidade, se um score explícito não for passado
                        const scoreDeduction = finding.score !== undefined ? (100 - finding.score) : this._getDeductionForSeverity(finding.severity);
                        
                        if (rule.category && metrics[rule.category] !== undefined) {
                            metrics[rule.category] = Math.max(0, metrics[rule.category] - scoreDeduction);
                        }
                    }
                }
            } catch (err) {
                console.error(`[MethodologyEngine] Rule execution failed:`, err);
            }
        }

        // Calcula score global (média pesada ou média simples das métricas ativas)
        let totalMetrics = 0;
        let sumMetrics = 0;
        for (const key in metrics) {
            // Ignorar métricas se ainda não houver artefacto e for uma regra dependente
            if (this._hasArtifactForMetric(context, key) || key === 'theme') {
                sumMetrics += metrics[key];
                totalMetrics++;
            }
        }
        
        const overallScore = totalMetrics > 0 ? Math.round(sumMetrics / totalMetrics) : 100;

        const rar = {
            score: overallScore,
            metrics: metrics,
            findings: findings,
            warnings: findings.filter(f => f.severity === 'WARNING' || f.severity === 'ERROR'),
            suggestions: findings.filter(f => f.severity === 'TIP' || f.severity === 'INFO'),
            timestamp: new Date().toISOString()
        };

        this.lastReport = rar;
        return rar;
    }

    _getDeductionForSeverity(severity) {
        switch (severity) {
            case 'ERROR': return 25;
            case 'WARNING': return 15;
            case 'TIP': return 5;
            case 'INFO': return 0;
            default: return 0;
        }
    }

    _hasArtifactForMetric(context, metricKey) {
        if (!context.artifacts) return false;
        
        // Mapeamento rudimentar entre categorias e steps IDs (depende do workflow)
        // Para uma arquitetura de produção, o Workflow deveria definir a "categoria" de cada step
        const map = {
            question: ['S2', 'S3'],
            objectives: ['S4'],
            keywords: ['S5']
        };

        const stepIds = map[metricKey];
        if (!stepIds) return false;

        return stepIds.some(id => !!context.artifacts[id]);
    }
}

window.rgMethodology = new MethodologyEngine();
