# PROTOCOL: RL-01 Gold Standard (Scientific Blueprint)

Este documento atua como a *Master Source of Truth* do Protocolo de Revisão da Literatura (RL-01). 
Qualquer alteração metodológica, de validação ou de redação de *prompts* deve ser primeiro efetuada e discutida neste documento (Sprint 2) antes de ser transcrita para o `workflows.js` (Sprint 2B).

**Nota de Implementação:** As secções "Justificação Metodológica (Interna)" destinam-se exclusivamente à equipa de desenvolvimento e engenharia pedagógica, não sendo renderizadas no Front-End.

---

## ETAPA 1: Identificação da Área de Interesse

────────────────────────
**Objetivo**
Delimitar um tópico de investigação amplo num foco de estudo exequível e relevante.

────────────────────────
**Competência**
Foco e delimitação epistemológica.

────────────────────────
**Resultado Esperado**
Uma frase concisa (máx. 300 caracteres) que represente o tema delimitado final.

────────────────────────
**Fundamentação Metodológica**
Um dos maiores riscos na investigação inicial é a falácia da abrangência. Escolher um tema como "A IA na Educação" resulta num oceano de literatura impossível de sintetizar numa única revisão. O processo de afunilamento (Tema Geral → Contexto Específico → Problema) é essencial para garantir a viabilidade temporal e a relevância académica do trabalho.

────────────────────────
**Knowledge Card**
- **Título:** Como Delimitar o Seu Tema
- **Conceito:** A delimitação exige o cruzamento do seu tópico de interesse com três variáveis de restrição: a População (quem?), o Contexto (onde?) e a Intervenção/Fenómeno (o quê?).
- **Exemplo (Correto):** "Perceções dos estudantes universitários (População) sobre o uso da IA Generativa (O quê) no ensino superior em Moçambique (Onde)."
- **Exemplo (Incorreto):** "O impacto da Inteligência Artificial na Sociedade." (Demasiado lato, indemonstrável num único estudo).
- **Erro Frequente:** Escolher um tema sobre o qual não se tem qualquer conhecimento prévio ou acesso a dados.

────────────────────────
**Checklist**
- [ ] O tema está delimitado a uma população e a um contexto específico?
- [ ] O tema é suficientemente restrito para ser exequível no tempo disponível?
- [ ] Existe literatura académica prévia (mesmo que indireta) sobre este foco?

────────────────────────
**Review**
- **PASS:** "O tema apresenta uma delimitação clara de contexto e população, sendo adequado para avançar."
- **WARNING:** "O tema possui um foco definido, mas pode carecer de literatura suficiente na interseção exata (ex: apenas 'Moçambique'). Considere manter a abertura para literatura global durante a pesquisa teórica."
- **FAIL:** "O tema apresentado é demasiado abrangente ('A Inteligência Artificial'). É imperativo afunilar o foco adicionando variáveis como População-alvo ou Contexto de aplicação para permitir a formulação de uma Pergunta de Investigação viável."

────────────────────────
**Prompt Principal**
*Atue como um orientador metodológico de ensino superior.* 
*Utilize os seguintes tópicos ou interesses genéricos introduzidos pelo investigador: {{INPUT}}.*
*A sua tarefa é ajudar a delimitar e afunilar estes interesses para um Tema de Investigação exequível.*
*Não escolha o tema pelo investigador. Forneça 3 alternativas de delimitação, utilizando cruzamento de variáveis (População + Contexto).*
*Devolva a sua resposta em Markdown, apresentando cada alternativa seguida de uma breve justificação sobre a viabilidade de cada uma.*

────────────────────────
**Estratégias**
- **Guiado:** O prompt força o LLM a fazer perguntas de volta ao utilizador ("Porque escolheu esta área? Que problema quer resolver?"), orientando a reflexão em vez de fornecer logo temas.
- **Equilibrado:** (O Prompt Principal acima). Fornece alternativas equilibradas com justificação.
- **Direto:** O prompt pede diretamente 5 recortes precisos do tema, sem explicações teóricas sobre o processo de afunilamento.

────────────────────────
**Ferramentas Recomendadas**
- ChatGPT (Para brainstorming e cruzamento rápido de conceitos interdisciplinares).
- Claude 3.5 (Para nuance académica mais apurada e redução de jargão artificial).

────────────────────────
**Erros Frequentes**
- Confundir a "Área de Interesse" com o "Título final da tese". O título apenas se fecha no final da investigação.
- Recusar opções de afunilamento pelo receio de "deixar coisas de fora". Investigar bem implica sempre excluir variáveis.

────────────────────────
**Leituras Recomendadas**
- Booth, W. C., Colomb, G. G., & Williams, J. M. (2008). *The Craft of Research*. University of Chicago press. (Capítulo: "From Topics to Questions").

────────────────────────
**Justificação Metodológica (Interna)**
Esta etapa atua como quebra-gelo. Colocá-la antes da Pergunta de Investigação serve para não intimidar o utilizador júnior com as exigências restritas da Pergunta estruturada, aproveitando a natureza "exploratória" do LLM para brainstorming. A checklist limita-se a 3 itens de verificação (dois objetivos e um reflexivo sobre a existência de literatura).

---

## ETAPA 2: Pergunta de Investigação (Ancora do Protocolo)

────────────────────────
**Objetivo**
Transformar o tema delimitado numa única questão central que a revisão irá responder de forma empírica ou teórica.

────────────────────────
**Competência**
Formulação de Problema e Operacionalização de Variáveis.

────────────────────────
**Resultado Esperado**
Uma frase interrogativa única que balize toda a pesquisa documental.

────────────────────────
**Fundamentação Metodológica**
A pergunta de investigação é a coluna vertebral de toda a revisão. Ela ditará diretamente as palavras-chave (Etapa 4) e os Critérios de Inclusão (Etapa 5). Uma pergunta mal formulada ou binária (sim/não) aniquila a profundidade analítica do estudo.

────────────────────────
**Knowledge Card**
- **Título:** A Arte de Formular a Pergunta
- **Conceito:** Uma boa pergunta foca-se em relações entre conceitos. Na área da saúde/clínica pode usar o formato PICO (População, Intervenção, Comparador, *Outcome*). Nas ciências sociais pode usar PICo (População, Fenómeno de Interesse, Contexto) ou SPIDER.
- **Exemplo (Correto):** "Quais são os principais fatores (Outcome) que influenciam a adoção da Inteligência Artificial (Fenómeno) por parte dos docentes (População) no ensino superior universitário (Contexto)?"
- **Exemplo (Incorreto):** "Os docentes usam Inteligência Artificial?" (Binária. Resposta: "Sim". Fim do estudo).
- **Erro Frequente:** Fazer várias perguntas complexas seguidas na mesma frase. Deve existir apenas UMA pergunta central.

────────────────────────
**Checklist**
- [ ] A formulação é uma pergunta direta e termina com ponto de interrogação?
- [ ] A pergunta identifica claramente o fenómeno a estudar e a população-alvo?
- [ ] A pergunta é aberta (não pode ser respondida com Sim ou Não)?
- [ ] É metodologicamente possível responder a esta pergunta apenas lendo literatura existente?

────────────────────────
**Review**
- **PASS:** "A pergunta de investigação obedece aos critérios de clareza, abertura e delimitação, estando alinhada com o tema central."
- **WARNING:** "A pergunta está estruturada corretamente mas é muito genérica, correndo o risco de não poder ser respondida conclusivamente sem trabalho de campo primário. Considere torná-la mais focada em 'literatura existente sobre...'."
- **FAIL:** "A sua proposta assume o formato de uma afirmação teórica ou de uma pergunta binária (Sim/Não). Terá de a reformular para indagar sobre 'Como', 'Quais' ou 'De que forma', garantindo a necessidade de exploração bibliográfica profunda."

────────────────────────
**Prompt Principal**
*Atue como um Professor Catedrático especializado em metodologia de investigação.*
*Utilize o Tema Delimitado fornecido: {{STEP-INV-01}}.*
*A sua tarefa é gerar 3 propostas de Perguntas de Investigação (Formato PICO ou SPIDER) que sirvam de âncora para uma Revisão de Literatura robusta.*
*Restrições: Nunca gere perguntas de 'Sim ou Não'. As perguntas devem iniciar-se por "Como", "De que forma", "Qual o impacto", ou "Quais os fatores".*
*Devolva a resposta em Markdown, explicando brevemente a matriz metodológica de cada sugestão (Qual é a População, Qual é o Fenómeno, etc).*

────────────────────────
**Estratégias**
- **Guiado:** Ensina ativamente os formatos PICO/SPIDER antes de pedir ao utilizador que tente redigir a sua.
- **Equilibrado:** (O Prompt Principal). Avalia o tema, oferece opções PICO, decompõe a resposta.
- **Direto:** Devolve apenas a formulação de 3 perguntas perfeitas gramaticalmente e cientificamente, sem lição teórica.

────────────────────────
**Ferramentas Recomendadas**
- Claude 3.5 Sonnet (Maior compreensão semântica das restrições de formulação PICO).

────────────────────────
**Erros Frequentes**
- Criar perguntas que só podem ser respondidas fazendo inquéritos. Lembre-se que este é um protocolo de Revisão da Literatura.

────────────────────────
**Leituras Recomendadas**
- Araújo, C. G. (2003). *Detalhando a escrita científica: como formular as perguntas*. Arquivos Brasileiros de Cardiologia.

────────────────────────
**Justificação Metodológica (Interna)**
Esta é a etapa crítica (âncora) do protocolo. Se a etapa 2 falhar, a pesquisa nas bases de dados devolverá lixo (GIGO). O Review Engine aqui é programado com tolerância zero para falhas sintáticas (ausência de `?`) ou para perguntas fechadas. A checklist foca-se intensamente em características estruturais da gramática científica (abertura e clareza).

---

## ETAPA 3: Definição de Objetivos

────────────────────────
**Objetivo**
Operacionalizar a pergunta de investigação num objetivo geral e numa cascata de objetivos específicos.

────────────────────────
**Competência**
Decomposição analítica e planeamento acionável.

────────────────────────
**Resultado Esperado**
Um Objetivo Geral e 3 a 5 Objetivos Específicos sequenciais.

────────────────────────
**Fundamentação Metodológica**
O Objetivo Geral é, essencialmente, a Pergunta de Investigação reescrita sob a forma de uma ação afirmativa. Os Objetivos Específicos são a desconstrução tática (passo a passo) do que precisa de ser feito para atingir o Geral. Não são tarefas de rotina (ex: "Ir à biblioteca não é um objetivo específico"), são marcos de conhecimento ("Sintetizar as teorias existentes sobre...").

────────────────────────
**Knowledge Card**
- **Título:** Verbos de Ação na Investigação
- **Conceito:** O uso correto dos verbos no infinitivo dita a complexidade do objetivo. Utilize a Taxonomia de Bloom: verbos como "Identificar" ou "Descrever" são iniciais/básicos; verbos como "Analisar", "Avaliar" ou "Sintetizar" denotam profundidade científica avançada.
- **Exemplo (Correto):** 
  *Geral:* Analisar as perceções dos alunos... 
  *Específicos:* 1) Identificar na literatura... 2) Comparar... 3) Sintetizar...
- **Exemplo (Incorreto):** *Específico:* "Elaborar um questionário." (Isso é uma tarefa metodológica, não um objetivo cognitivo/científico).
- **Erro Frequente:** Ter objetivos específicos desconexos que, quando somados, não cobrem a totalidade do objetivo geral.

────────────────────────
**Checklist**
- [ ] O Objetivo Geral começa com um verbo no infinitivo?
- [ ] O Objetivo Geral responde diretamente à Pergunta de Investigação?
- [ ] Foram definidos entre 3 e 5 objetivos específicos?
- [ ] Os objetivos específicos representam marcos de conhecimento e NÃO meras tarefas logísticas (ex: "Ler artigos")?

────────────────────────
**Review**
- **PASS:** "Os objetivos utilizam corretamente verbos de ação adequados e estão perfeitamente alinhados com o escopo da Pergunta de Investigação."
- **WARNING:** "Os objetivos são aceitáveis, mas alguns dos objetivos específicos assemelham-se a passos logísticos da pesquisa (ex: 'Pesquisar bases de dados'). Procure focar os verbos nos resultados teóricos a atingir (ex: 'Mapear evidências na literatura')."
- **FAIL:** "Os objetivos não estão alinhados com a Pergunta de Investigação ou carecem da estrutura obrigatória que inicie por um verbo no infinitivo de ação (ex: Analisar, Compreender, Identificar). Reveja o seu alinhamento heurístico."

────────────────────────
**Prompt Principal**
*Atue como revisor científico experiente.*
*Utilize a seguinte Pergunta de Investigação: {{STEP-INV-02}}.*
*A sua tarefa é desdobrar esta Pergunta num Objetivo Geral (Verbo analítico) e em 3 ou 4 Objetivos Específicos progressivos (Taxonomia de Bloom: do descritivo para o analítico).*
*Restrições: Não inclua tarefas metodológicas logísticas (e.g. desenhar questionários, pesquisar artigos) como objetivos específicos.*
*Devolva a resposta estruturada em Markdown com a justificação da taxonomia verbal usada para os específicos.*

────────────────────────
**Estratégias**
- **Guiado:** Propõe verbos de ação adequados para o tema e pede ao utilizador que construa as frases completas.
- **Equilibrado:** (O Prompt Principal). Devolve a estrutura pronta com justificação baseada na taxonomia de Bloom.
- **Direto:** Sem justificações. Devolve apenas as balas de texto: Objetivo Geral, e lista numerada de 3 Objetivos Específicos.

────────────────────────
**Ferramentas Recomendadas**
- ChatGPT (Excelente a mapear a hierarquia verbal via Taxonomia de Bloom).

────────────────────────
**Erros Frequentes**
- Confundir "Compreender" (que é difícil de medir) com "Identificar" ou "Analisar" (que são mensuráveis no texto).
- Os objetivos específicos não cumprirem o princípio MECE (Mutuamente Exclusivos e Coletivamente Exaustivos).

────────────────────────
**Leituras Recomendadas**
- Krathwohl, D. R. (2002). *A revision of Bloom's taxonomy: An overview*. Theory into practice.

────────────────────────
**Justificação Metodológica (Interna)**
Esta etapa complementa o afunilamento inicial. Se a pergunta é a bússola, os objetivos são o mapa do tesouro. O review é treinado rigorosamente para detetar "tarefas logísticas" que os estudantes frequentemente inserem (ex: "Aplicar SPSS"), devolvendo um WARNING pedagógico que ensina a diferença entre objetivo epistemológico vs tarefa logística. O prompt de IA recorre ao truque técnico de exigir alinhamento pela Taxonomia de Bloom para evitar sugestões medíocres da IA.
