/**
 * ExportWord
 * Responsável por gerar o documento Microsoft Word (.docx) baseado estritamente
 * no ResearchContext, isolado da DOM/UI.
 */
class ExportWord {
    
    /**
     * @param {Object} context O ResearchContext (incluindo .rar)
     * @returns {Promise<Blob>} Blob do documento DOCX gerado
     */
    async generate(context) {
        if (!window.docx) {
            throw new Error('A biblioteca docx não está disponível.');
        }

        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = window.docx;
        const children = [];

        const title = context.research.title || context.research.area || 'Investigação';
        const dateStr = new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
        
        // --- 1. CAPA / CABEÇALHO ACADÉMICO ---
        children.push(new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        }));
        
        children.push(new Paragraph({
            children: [
                new TextRun({ text: "Autor: ", bold: true }),
                new TextRun("Investigador"),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 }
        }));

        children.push(new Paragraph({
            children: [
                new TextRun({ text: "Área Científica: ", bold: true }),
                new TextRun(context.research.area || "N/A"),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 }
        }));

        children.push(new Paragraph({
            children: [
                new TextRun({ text: "Data: ", bold: true }),
                new TextRun(dateStr),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 }
        }));

        // --- 2. ETAPAS (ARTEFACTOS) ---
        if (context.protocol && context.protocol.steps) {
            context.protocol.steps.forEach((step, index) => {
                const artifactObj = context.artifacts[step.id];
                const content = (typeof artifactObj === 'object' && artifactObj !== null) ? artifactObj.content : artifactObj;
                
                if (content && content.trim() !== '') {
                    // Título da etapa (ex: "1. Tema")
                    children.push(new Paragraph({
                        text: `${index + 1}. ${step.name}`,
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 }
                    }));

                    // Conteúdo do artefacto
                    const lines = content.split('\n');
                    lines.forEach(line => {
                        children.push(new Paragraph({
                            text: line,
                            spacing: { after: 120 }
                        }));
                    });
                    
                    children.push(new Paragraph({
                        text: "──────────────────────────────────────────────",
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 200, after: 200 }
                    }));
                }
            });
        }

        // --- 3. APÊNDICE: AVALIAÇÃO METODOLÓGICA ---
        if (context.rar) {
            children.push(new Paragraph({
                text: "Apêndice",
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 800, after: 400 }
            }));

            children.push(new Paragraph({
                text: "Avaliação Metodológica",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 200 }
            }));

            children.push(new Paragraph({
                children: [
                    new TextRun({ text: "Pontuação Global: ", bold: true }),
                    new TextRun(`${context.rar.score}%`),
                ],
                spacing: { after: 200 }
            }));

            // Mostrar métricas específicas (Tema, Pergunta, etc)
            if (context.rar.metrics) {
                for (const [key, value] of Object.entries(context.rar.metrics)) {
                    let displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                    if (key === 'question') displayKey = 'Pergunta';
                    if (key === 'objectives') displayKey = 'Objetivos';
                    
                    const stars = this._generateStars(value);
                    children.push(new Paragraph({
                        text: `${displayKey}: ${stars}`,
                        spacing: { after: 100 }
                    }));
                }
            }
            
            // Recomendações / Findings
            if (context.rar.findings && context.rar.findings.length > 0) {
                children.push(new Paragraph({
                    text: "Recomendações",
                    heading: HeadingLevel.HEADING_3,
                    spacing: { before: 200, after: 100 }
                }));

                context.rar.findings.forEach(f => {
                    children.push(new Paragraph({
                        text: `• [${f.severity}] ${f.message}`,
                        spacing: { after: 80 }
                    }));
                });
            }
        }
        
        // --- 4. METADADOS FINAIS ---
        children.push(new Paragraph({
            text: "──────────────────────────────────────────────",
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 }
        }));
        children.push(new Paragraph({
            text: `Data de criação do documento: ${new Date().toISOString()}`,
            spacing: { after: 100 }
        }));
        children.push(new Paragraph({
            text: `Protocolo: ${context.research.workflow || 'Desconhecido'}`,
            spacing: { after: 100 }
        }));

        const doc = new Document({
            creator: "Guia do Investigador",
            title: title,
            description: "Documento exportado pelo módulo ExportWord",
            sections: [{
                properties: {},
                children: children
            }]
        });

        return await Packer.toBlob(doc);
    }
    
    _generateStars(score) {
        if (score >= 95) return '★★★★★';
        if (score >= 80) return '★★★★☆';
        if (score >= 60) return '★★★☆☆';
        if (score >= 40) return '★★☆☆☆';
        if (score >= 20) return '★☆☆☆☆';
        return '☆☆☆☆☆';
    }
}

window.rgExportWord = new ExportWord();
