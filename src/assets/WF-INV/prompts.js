window.PROMPTS = window.PROMPTS || {};
Object.assign(window.PROMPTS, {
    "PT-R-001": {
        "template": "És um especialista em metodologia de investigação científica.\nAtuo na área de {{area}}.\nPreciso de identificar um tema de investigação delimitado e exequível.\n\nPor favor, sugere 3 temas de investigação que cruzem a minha área com tendências atuais.\nPara cada tema, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Tema Proposto (Uma frase clara e concisa)\n2. Justificação (Por que razão é cientificamente e socialmente relevante?)\n3. Limitações (Quais os maiores obstáculos práticos?)\n4. Sugestões de Delimitação (Como focar num contexto geográfico/populacional)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Encontrar um tema de investigação viável e atual na sua área.",
        "expectedResult": "Uma lista de 3 temas estruturados (Tema, Justificação, Limitações, Sugestões).",
        "example": "Uso de IA generativa no ensino secundário.",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Ideação"
    },
    "PT-R-002": {
        "template": "És um especialista em metodologia de investigação científica.\nAtuo na área de {{area}} e tenho interesse no tema amplo: '{{title}}'.\n\nO meu tema atual é demasiado vago. Ajuda-me a delimitá-lo para que seja exequível num projeto académico com recursos limitados.\n\nPor favor, sugere 3 versões delimitadas do meu tema e apresenta a resposta estritamente com a seguinte estrutura para cada versão:\n\n1. Resultado Final (O novo tema perfeitamente delimitado numa única frase)\n2. Justificação (O que foi cortado e porquê)\n3. Limitações (O que esta delimitação impede de ser estudado)\n4. Sugestões (Variáveis populacionais ou contextuais adicionais que eu poderia incluir)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Reduzir o escopo de um tema amplo para torná-lo investigável.",
        "expectedResult": "Três opções de temas focados e bem delimitados.",
        "example": "De 'Inteligência Artificial' para 'Uso de IA no 1º ano de Informática da UL'.",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Delimitação do problema"
    },
    "PT-R-003": {
        "template": "És um especialista em metodologia científica.\nA minha área é {{area}} e o meu tema delimitado é: '{{TEMA}}'.\n\nPreciso de formular a minha pergunta central de investigação (aquela que o estudo vai tentar responder).\n\nImportante: NÃO respondas à pergunta de investigação, NÃO tentes resolver o problema e NÃO proponhas metodologias ou métodos de recolha de dados agora.\n\nPor favor, sugere 3 perguntas de investigação principais diferentes.\nPara cada opção, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Pergunta Formulada (A pergunta de investigação, terminada em '?')\n2. Justificação (Por que razão esta pergunta operacionaliza bem o tema?)\n3. Limitações (Quais os vieses ou limites na capacidade de investigar esta pergunta?)\n4. Sugestões (O que precisaria de ser diretamente medido ou observado no mundo real?)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Criar uma pergunta central que orientará toda a investigação.",
        "expectedResult": "Três opções de pergunta mensuráveis e exequíveis estruturadas.",
        "example": "Como é que a literacia digital afeta o desempenho dos estudantes ingressantes?",
        "estimatedTime": "10-15 minutos",
        "effort": "high",
        "competency": "Formulação de Pergunta"
    },
    "PT-R-004": {
        "template": "És um especialista em metodologia científica.\nA minha área é {{area}}, o tema é '{{TEMA}}' e a pergunta central é: '{{PERGUNTA}}'.\n\nPreciso de formular os objetivos da minha investigação.\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Objetivo Geral (Um único objetivo amplo que responda diretamente à pergunta central, começando por um verbo no infinitivo)\n2. Objetivos Específicos (3 a 5 objetivos operacionais que, no seu conjunto, permitam atingir o objetivo geral)\n3. Justificação (Por que razão estes objetivos são mensuráveis e adequados?)\n4. Limitações (Quais os desafios em atingir estes objetivos específicos?)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Traduzir a pergunta numa meta geral e passos metodológicos específicos.",
        "expectedResult": "Lista estruturada com 1 Geral e 3-5 Específicos.",
        "example": "Objetivo Geral: Analisar...\nObjetivos Específicos: 1. Identificar...",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Formulação de Objetivos"
    },
    "PT-R-005": {
        "template": "És um especialista em biblioteconomia e pesquisa documental.\nA minha pergunta de investigação é: '{{PERGUNTA}}' e os objetivos são: '{{OBJETIVOS}}'.\n\nPreciso de definir os termos de pesquisa (palavras-chave) para as bases de dados.\nImportante: Foca-te em conceitos, sinónimos, descritores (como MeSH ou DeCS) e operadores booleanos.\n\nApresenta a resposta estritamente com a seguinte estrutura:\n\n1. Conceitos Principais (Os 3-4 eixos centrais do estudo)\n2. Sinónimos e Variantes (Termos equivalentes em Português e Inglês para cada eixo)\n3. Equações de Pesquisa Sugeridas (2 a 3 expressões booleanas prontas a copiar, ex: (Term A OR Term B) AND Term C)\n4. Limitações (Que termos podem gerar falsos positivos ou 'ruído' na pesquisa?)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Definir termos para extrair literatura relevante.",
        "expectedResult": "Lista de conceitos, sinónimos e strings booleanas.",
        "example": "(Artificial Intelligence OR Machine Learning) AND (Higher Education)",
        "estimatedTime": "10 minutos",
        "effort": "medium",
        "competency": "Pesquisa Documental"
    },
    "PT-R-006": {
        "template": "És um especialista em metodologia científica.\nA minha pergunta de investigação é: '{{PERGUNTA}}'.\nAs minhas palavras-chave são: '{{PALAVRAS_CHAVE}}'.\n\nPreciso de definir os Critérios de Inclusão e Exclusão para selecionar os artigos.\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Critérios de Inclusão (Lista de 3 a 5 critérios rígidos que um artigo TEM de cumprir. Justifica obrigatoriamente a razão metodológica de cada um)\n2. Critérios de Exclusão (Lista de 3 a 5 critérios que levam à rejeição imediata do artigo. Justifica obrigatoriamente cada um)\n3. Limitações (Que tipo de literatura de qualidade poderei estar a perder com estas restrições?)\n4. Sugestões (Filtros de data ou idioma que seriam adequados para este tema específico)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Estabelecer filtros lógicos antes de selecionar literatura.",
        "expectedResult": "Lista justificada de critérios rigorosos de Inclusão e Exclusão.",
        "example": "Inclusão: Estudantes do Ensino Superior (Foca a população exata do estudo). Exclusão: Ensino Secundário.",
        "estimatedTime": "10-15 minutos",
        "effort": "medium",
        "competency": "Critérios de Inclusão/Exclusão"
    },
    "PT-R-007": {
        "template": "És um assistente de investigação rigoroso.\nO meu tema é: '{{TEMA}}' e a minha pergunta é: '{{PERGUNTA}}'.\nOs meus critérios de inclusão/exclusão são:\n'{{CRITERIOS}}'\n\nAqui está o resumo (abstract) de um artigo:\n'[COLE AQUI O RESUMO]'\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Decisão (Incluir, Excluir ou Talvez)\n2. Justificação (Cruzamento direto entre o resumo e os critérios definidos)\n3. Alertas de Qualidade (Há sinais metodológicos fracos visíveis no resumo?)\n4. Próximo Passo (Ler na íntegra ou descartar definitivamente)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Decidir rapidamente se vale a pena ler o artigo completo.",
        "expectedResult": "Decisão estruturada e justificada face aos critérios.",
        "example": "Decisão: Excluir. Justificação: A amostra foca-se no ensino básico (critério de exclusão).",
        "estimatedTime": "2-5 minutos",
        "effort": "low",
        "competency": "Triagem de Literatura"
    },
    "PT-R-008": {
        "template": "És um especialista em Bibliometria.\nO meu tema de investigação é: '{{TEMA}}' e a minha equação de pesquisa foi: '[COLE AQUI A EQUAÇÃO USADA]' na base '[NOME DA BASE]'. Obtive '[NÚMERO]' resultados.\n\nPreciso de otimizar a minha pesquisa.\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Diagnóstico (Porque é que a pesquisa falhou: muito restrita, ampla, termos inadequados?)\n2. Equação Otimizada (Uma NOVA expressão booleana, em Inglês, pronta a copiar)\n3. Limitações (O que esta nova equação pode ainda falhar em captar?)\n4. Sugestões (Filtros extra a usar na interface da base de dados, ex: Ano, Tipo de Documento)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Refinamento da Estratégia de Pesquisa.",
        "expectedResult": "Análise crítica e sugestão de nova equação otimizada.",
        "example": "Diagnóstico: Faltam sinónimos. Nova Equação: (AI OR Artificial Intelligence) AND...",
        "estimatedTime": "5-10 minutos",
        "effort": "medium",
        "competency": "Refinamento de Pesquisa"
    },
    "PT-R-009": {
        "template": "És um assistente de extração de dados científicos.\nO meu tema é: '{{TEMA}}'.\nTenho o seguinte artigo completo (ou excertos relevantes):\n'[COLE AQUI O TEXTO]'\n\nPreciso de extrair dados para a minha matriz de síntese.\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Metodologia (Qual o desenho do estudo, amostra e instrumentos?)\n2. Resultados Principais (Que dados respondem diretamente ao meu tema?)\n3. Lacunas e Limitações (O que os próprios autores assumem que falhou ou falta investigar?)\n4. Citação Chave (Sugere 1 a 2 frases literais do autor que sejam brilhantes para citar)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Sistematizar a extração de dados cruciais do artigo lido.",
        "expectedResult": "Extração estruturada de Metodologia, Resultados e Limitações.",
        "example": "Metodologia: Estudo quantitativo, N=150 estudantes.",
        "estimatedTime": "5-10 minutos por artigo",
        "effort": "medium",
        "competency": "Extração de Dados"
    },
    "PT-R-010": {
        "template": "És um especialista em redação académica.\nA minha pergunta é: '{{PERGUNTA}}'.\n\nAqui está a minha matriz de extração/notas dos artigos lidos:\n'[COLE AQUI A MATRIZ]'\n\nPreciso de ajuda para estruturar a minha Revisão da Literatura. NÃO quero um mero resumo autor por autor. Quero uma síntese crítica relacional.\n\nPor favor, apresenta a resposta estritamente com a seguinte estrutura:\n\n1. Eixos Temáticos (Identifica 2 a 3 grandes temas onde os autores convergem ou divergem)\n2. Síntese Crítica (Para cada eixo, redige 1 parágrafo estruturado cruzando os autores, ex: 'Enquanto A defende X, B demonstra Y')\n3. Identificação de Lacunas (Ensina-me a ver a lacuna: O que é que TODOS estes artigos falharam em investigar? O que testaram em adultos mas não em jovens?)\n4. Sugestão de Fecho (Como a minha investigação vai preencher exatamente essa lacuna)\n\nSuprime qualquer texto introdutório ou conclusivo.",
        "objective": "Sintetizar a literatura de forma crítica e relacional.",
        "expectedResult": "Texto estruturado que cruza autores e expõe lacunas.",
        "example": "Eixos Temáticos: 1. Adoção tecnológica; 2. Implicações éticas...",
        "estimatedTime": "15-30 minutos",
        "effort": "high",
        "competency": "Comunicação Científica"
    },
    "PT-V-001": {
        "template": "Valida a formulação.",
        "objective": "Validation",
        "expectedResult": "Validation",
        "example": "Exemplo",
        "estimatedTime": "1min",
        "effort": "low",
        "competency": "Validação"
    },
    "PT-V-002": {
        "template": "Valida os objetivos.",
        "objective": "Validation",
        "expectedResult": "Validation",
        "example": "Exemplo",
        "estimatedTime": "1min",
        "effort": "low",
        "competency": "Validação"
    }
});
