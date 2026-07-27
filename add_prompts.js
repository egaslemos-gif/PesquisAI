const fs = require('fs');

const supPrompts = {
    "PT-S-001": {
        id: "PT-S-001",
        title: "Análise Estrutural e Heurística",
        description: "Prompt para avaliar a coerência global e identificar falhas estruturais graves antes da leitura profunda.",
        prompt: "Atua como um avaliador académico sénior. Lê o texto fornecido (focando-te no resumo, introdução e conclusão) e identifica se o documento possui a estrutura mínima exigida (pré-textuais, textuais e pós-textuais) e se a linguagem académica e o tom estão adequados para o nível de ensino superior. Não corrijas erros ortográficos menores agora. Apresenta o resultado em formato de tópicos (bullet points) destacando as tuas primeiras impressões e as maiores fragilidades estruturais, usando os níveis [GRAVE], [MODERADO] e [LEVE]."
    },
    "PT-S-002": {
        id: "PT-S-002",
        title: "Avaliação do Tema de Pesquisa",
        description: "Prompt para analisar a exequibilidade, delimitação e relevância do tema.",
        prompt: "Atua como um metodólogo experiente. Lê o tema e a delimitação propostos no texto. Avalia se o tema é original, se está bem delimitado no espaço e no tempo, e se possui pertinência científica para a área do curso. Indica se o tema corre o risco de ser 'demasiado lato' ou inexequível por falta de recursos/dados. Responde num pequeno parecer dividido em: 1) Forças do Tema; 2) Riscos de Exequibilidade; 3) Recomendações de Delimitação."
    },
    "PT-S-003": {
        id: "PT-S-003",
        title: "Refinamento e Validação do Título",
        description: "Prompt para analisar se o título capta fielmente o problema sem ser demasiado longo ou interrogativo.",
        prompt: "Atua como um editor científico. Analisa o título sugerido para este trabalho em conjugação com o seu objetivo principal. O título deve ser claro, conciso e refletir a essência do estudo, preferencialmente não deve ser uma pergunta. Avalia se existem palavras supérfluas. Fornece um comentário crítico sobre o título atual e sugere 3 alternativas de títulos, desde os mais descritivos aos mais concisos."
    },
    "PT-S-004": {
        id: "PT-S-004",
        title: "Análise da Formulação do Problema",
        description: "Prompt para garantir que o problema é científico, claro e responde a uma lacuna.",
        prompt: "Atua como um arguente de dissertação. Lê a secção da formulação do problema. Avalia criticamente se o problema de investigação está claramente definido, preferencialmente formulado como uma pergunta direta. O problema reflete uma lacuna científica real ou confunde-se com um mero 'problema social' ou 'prático'? Identifica o problema central e aponta fragilidades na sua sustentação teórica."
    },
    "PT-S-005": {
        id: "PT-S-005",
        title: "Alinhamento dos Objetivos",
        description: "Prompt para verificar a coerência entre Objetivo Geral e Específicos e os verbos utilizados.",
        prompt: "Atua como supervisor académico metodológico. Avalia os objetivos apresentados no texto. O Objetivo Geral responde diretamente ao problema de pesquisa? Os Objetivos Específicos detalham os passos metodológicos necessários para atingir o Geral? Verifica criticamente o uso dos verbos operatórios (exigindo que sejam passíveis de ação e verificação científica, evitando 'saber' ou 'entender'). Fornece sugestões de verbos mais adequados se necessário."
    },
    "PT-S-006": {
        id: "PT-S-006",
        title: "Crítica à Justificativa",
        description: "Prompt para validar a força dos argumentos sobre a relevância da pesquisa.",
        prompt: "Lê a justificativa apresentada. Analisa se os argumentos convencem o leitor sobre a necessidade científica e social de realizar esta investigação. A justificativa está fundamentada na literatura ou baseia-se apenas em convicções/motivações pessoais do autor? Aponta onde o estudante deve reforçar os argumentos recorrendo a dados secundários ou a autores consagrados."
    },
    "PT-S-007": {
        id: "PT-S-007",
        title: "Avaliação da Revisão da Literatura",
        description: "Prompt para analisar a triangulação de autores e a atualidade das referências.",
        prompt: "Atua como revisor de revista científica. Lê o capítulo de Revisão da Literatura (Referencial Teórico). Verifica se o texto é uma construção argumentativa em que os autores dialogam entre si ou se é apenas um 'mosaico' de citações isoladas (parágrafos colados sem conexão). Identifica também se faltam conceitos nucleares para sustentar a pesquisa e se a proporção de literatura recente (últimos 5 anos) parece adequada."
    },
    "PT-S-008": {
        id: "PT-S-008",
        title: "Parecer Metodológico Rigoroso",
        description: "Prompt para auditar as opções metodológicas e sua capacidade de responder ao problema.",
        prompt: "Atua como auditor científico. Lê a secção de Metodologia. Avalia a coerência da abordagem escolhida (quantitativa, qualitativa, mista) face aos objetivos e ao problema delineado. O método de recolha de dados (ex: tipo de amostragem, instrumentos) está descrito com rigor e clareza suficientes para replicação? Aponta possíveis enviesamentos (biases) que o estudante não acautelou na metodologia."
    },
    "PT-S-009": {
        id: "PT-S-009",
        title: "Crítica à Apresentação de Resultados",
        description: "Prompt para verificar se os dados estão apresentados de forma clara, imparcial e legível.",
        prompt: "Lê a secção de Resultados. Avalia se os dados apresentados (texto, tabelas ou gráficos) respondem diretamente à pergunta de investigação. O texto limita-se a repetir os números que já estão nas tabelas/gráficos, ou faz uma verdadeira síntese e interpretação orientada aos objetivos? Verifica se a linguagem usada é objetiva e imparcial. Não cries dados, apenas avalia o que foi fornecido."
    },
    "PT-S-010": {
        id: "PT-S-010",
        title: "Avaliação da Discussão de Dados",
        description: "Prompt para garantir que o estudante debate os resultados empíricos com a teoria inicial.",
        prompt: "Atua como um avaliador crítico. Lê a secção da Discussão. O estudante está efetivamente a debater os seus achados (Resultados) em confronto com a teoria apresentada anteriormente (Revisão da Literatura)? Ou está apenas a repetir o que já foi dito noutras secções? Avalia se as limitações do estudo foram reconhecidas de forma madura. Fornece um parecer apontando onde o estudante deve elevar o nível do debate crítico."
    },
    "PT-S-011": {
        id: "PT-S-011",
        title: "Verificação da Conclusão",
        description: "Prompt para assegurar que a conclusão fecha o trabalho sem incluir dados novos.",
        prompt: "Lê a secção de Conclusão. Verifica se o autor responde de forma inequívoca à pergunta central do problema de pesquisa. A conclusão é suportada apenas pelos dados analisados ou o autor faz extrapolações indevidas? Garante que não foram introduzidos dados, citações novas ou teorias que não apareceram no corpo principal do texto. Emite sugestões de melhoria para tornar o fecho mais sólido."
    },
    "PT-S-012": {
        id: "PT-S-012",
        title: "Parecer do Resumo (Abstract)",
        description: "Prompt para validar a condensação do trabalho no formato estruturado de Resumo.",
        prompt: "Lê o Resumo (e o Abstract). Verifica se contém os 5 elementos essenciais obrigatórios: 1) Contexto/Tema, 2) Problema/Objetivo, 3) Metodologia principal, 4) Resultados mais relevantes e 5) Conclusão. Identifica se existem detalhes desnecessários ou se o texto é demasiado descritivo sem apresentar os resultados. Avalia a coerência das palavras-chave escolhidas."
    },
    "PT-S-013": {
        id: "PT-S-013",
        title: "Auditoria APA (7ª Edição)",
        description: "Prompt para identificar rapidamente quebras de conformidade nas citações e lista de referências.",
        prompt: "Atua como um especialista em normalização bibliográfica. Analisa as referências e citações no texto fornecido. Identifica os desvios às regras da norma APA (7ª Edição). Encontra erros comuns: ausência de itálicos nos títulos de revistas/livros, ordenação incorreta, nomes de autores fora do padrão, falta de DOIs. Lista os erros de formatação encontrados e mostra 2 ou 3 exemplos corrigidos."
    },
    "PT-S-014": {
        id: "PT-S-014",
        title: "Verificação de Formatação e Normas",
        description: "Prompt para detetar inconsistências visuais e estruturais (numeração, paginação, margens).",
        prompt: "A partir da descrição ou excerto fornecido, analisa o cumprimento das normas visuais académicas genéricas (ex: Arial 11 / Times New Roman 12, espaçamento 1.5, margens específicas). Uma vez que não consegues ver o layout exato do PDF, orienta o supervisor sobre quais os pontos específicos da formatação (Índices, legendas de figuras, numeração de tabelas, paginação inicial) deve inspecionar manualmente com mais atenção."
    },
    "PT-S-015": {
        id: "PT-S-015",
        title: "Síntese para Parecer Final (Defesa)",
        description: "Prompt para ajudar o supervisor a redigir o seu despacho final consolidado de aprovação ou reprovação.",
        prompt: "Tendo em conta as tuas avaliações prévias e as notas globais do trabalho fornecidas pelo supervisor, atua como um assistente de redação académica. Redige um rascunho profissional e cordato para o 'Parecer Final do Orientador'. O texto deve incluir uma apreciação global sobre a qualidade científica, o cumprimento metodológico, e terminar com a recomendação explícita de 'aprovação para apresentação em Defesa Pública' (ou necessidade de revisão profunda), apontando 2 temas que poderão ser interessantes de debater na arguência."
    }
};

const str = fs.readFileSync('src/data/prompts.js', 'utf8');
if (!str.includes('"PT-S-001"')) {
    let toAppend = "";
    for (const [key, val] of Object.entries(supPrompts)) {
        toAppend += `PROMPTS["${key}"] = ${JSON.stringify(val, null, 4)};\n`;
    }
    const updated = str.replace(
        /window\.PROMPTS\s*=\s*PROMPTS;/,
        `${toAppend}\nwindow.PROMPTS = PROMPTS;`
    );
    fs.writeFileSync('src/data/prompts.js', updated, 'utf8');
    console.log("prompts.js updated successfully.");
} else {
    console.log("Prompts already exist.");
}
