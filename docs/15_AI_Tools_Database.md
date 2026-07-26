# 15 — AI Tools Database

Catálogo detalhado de ferramentas de IA recomendadas. Cada ferramenta é descrita com finalidade, pontos fortes e limitações para que a interface possa mostrar ao utilizador *"Porque recomendamos esta ferramenta"*.

---

## Catálogo de Ferramentas

### TOOL-001 — ChatGPT

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-chatgpt` |
| **Nome** | ChatGPT |
| **Fornecedor** | OpenAI |
| **URL** | https://chat.openai.com |
| **Tipo** | LLM — Assistente conversacional |
| **Serve para** | Exploração de ideias, brainstorming, geração de texto, refinamento de prompts. |
| **Pontos fortes** | Interface intuitiva. Boa capacidade de seguir instruções complexas. Suporta conversas longas com contexto. Versão gratuita disponível. |
| **Limitações** | Pode gerar informações incorretas (alucinações). Não acede a bases de dados académicas em tempo real (na versão base). Conhecimento com data limite. |
| **Etapas recomendadas** | `STEP-INV-01`, `STEP-INV-02`, `STEP-INV-03`, `STEP-INV-04` |
| **Dica para o utilizador** | Ideal para as etapas iniciais de exploração. Sempre verifique as informações geradas com fontes académicas. |

---

### TOOL-002 — Claude

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-claude` |
| **Nome** | Claude |
| **Fornecedor** | Anthropic |
| **URL** | https://claude.ai |
| **Tipo** | LLM — Assistente conversacional |
| **Serve para** | Redação académica, revisão de texto, análise detalhada, síntese de informação. |
| **Pontos fortes** | Excelente na produção de texto longo e coerente. Boa compreensão de nuances. Capacidade de processar documentos extensos. Tendência a ser mais prudente e menos propenso a alucinações. |
| **Limitações** | Acesso pode ser limitado em algumas regiões. Versão gratuita com limites de uso. Não pesquisa na web em tempo real (na versão base). |
| **Etapas recomendadas** | `STEP-INV-08`, `STEP-INV-09`, `STEP-INV-10` |
| **Dica para o utilizador** | Ideal para redação e revisão. Use para produzir textos longos e refinados. |

---

### TOOL-003 — Gemini

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-gemini` |
| **Nome** | Gemini |
| **Fornecedor** | Google |
| **URL** | https://gemini.google.com |
| **Tipo** | LLM — Assistente conversacional com pesquisa |
| **Serve para** | Exploração de temas, pesquisa com acesso a informação recente, análise de documentos. |
| **Pontos fortes** | Integração com pesquisa Google. Acesso a informação atualizada. Capacidade multimodal (texto, imagem). Versão gratuita robusta. |
| **Limitações** | Respostas podem ser menos estruturadas. Menor controlo sobre o formato de saída em comparação com ChatGPT/Claude. |
| **Etapas recomendadas** | `STEP-INV-01`, `STEP-INV-04`, `STEP-INV-05` |
| **Dica para o utilizador** | Útil quando precisa de informação atualizada. Bom para validar temas e pesquisar tendências. |

---

### TOOL-004 — Consensus

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-consensus` |
| **Nome** | Consensus |
| **Fornecedor** | Consensus NLP Inc. |
| **URL** | https://consensus.app |
| **Tipo** | Motor de pesquisa de evidência científica |
| **Serve para** | Encontrar artigos científicos com base em perguntas. Obter respostas baseadas em evidência. |
| **Pontos fortes** | Pesquisa semântica sobre artigos revisados por pares. Respostas fundamentadas em estudos publicados. Indica o nível de consenso científico. Interface de pergunta natural. |
| **Limitações** | Base de dados focada em artigos em inglês. Cobertura limitada em algumas áreas (humanidades, por exemplo). Versão gratuita com limites. |
| **Etapas recomendadas** | `STEP-INV-05`, `STEP-INV-06` |
| **Dica para o utilizador** | Faça perguntas diretas (ex: "Does X affect Y?"). Excelente para validar hipóteses com evidência. |

---

### TOOL-005 — OpenAlex

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-openalex` |
| **Nome** | OpenAlex |
| **Fornecedor** | OurResearch |
| **URL** | https://openalex.org |
| **Tipo** | Base de dados bibliográfica aberta |
| **Serve para** | Pesquisa de literatura académica aberta. Exploração de redes de citação. |
| **Pontos fortes** | Totalmente gratuito e aberto. Mais de 250 milhões de registos. Inclui metadados ricos (citações, autores, instituições). API disponível para pesquisa avançada. |
| **Limitações** | Interface menos intuitiva que o Google Scholar. Requer alguma familiaridade com pesquisa avançada. Nem todos os artigos têm texto completo. |
| **Etapas recomendadas** | `STEP-INV-05` |
| **Dica para o utilizador** | Use para complementar a pesquisa do Google Scholar. Ideal para explorar quem cita quem. |

---

### TOOL-006 — Google Scholar

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-google-scholar` |
| **Nome** | Google Scholar |
| **Fornecedor** | Google |
| **URL** | https://scholar.google.com |
| **Tipo** | Motor de pesquisa académica |
| **Serve para** | Pesquisa ampla de literatura académica (artigos, teses, livros, conferências). |
| **Pontos fortes** | Cobertura abrangente. Interface familiar. Inclui contagem de citações. Ligação a versões de acesso livre. |
| **Limitações** | Sem filtragem por qualidade (inclui fontes não revisadas por pares). Ordenação por relevância nem sempre ideal. Dificuldade em pesquisas muito específicas. |
| **Etapas recomendadas** | `STEP-INV-04`, `STEP-INV-05` |
| **Dica para o utilizador** | Bom ponto de partida. Use operadores de pesquisa ("...", site:, intitle:) para refinar. |

---

### TOOL-007 — NotebookLM

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-notebooklm` |
| **Nome** | NotebookLM |
| **Fornecedor** | Google |
| **URL** | https://notebooklm.google.com |
| **Tipo** | Assistente de documentos com IA |
| **Serve para** | Síntese e análise de documentos carregados. Perguntas e respostas sobre fontes próprias. |
| **Pontos fortes** | Trabalha apenas com as fontes que o utilizador carrega (reduz alucinações). Excelente para síntese de múltiplos documentos. Gera resumos e citações com referência à fonte. Gratuito. |
| **Limitações** | Requer que o utilizador carregue os documentos. Limite de fontes por notebook. Disponibilidade geográfica pode variar. |
| **Etapas recomendadas** | `STEP-INV-07`, `STEP-INV-08` |
| **Dica para o utilizador** | Carregue os PDFs das fontes selecionadas. Faça perguntas específicas sobre o conteúdo. Ideal para criar fichas de leitura. |

---

### TOOL-008 — Zotero

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-zotero` |
| **Nome** | Zotero |
| **Fornecedor** | Corporation for Digital Scholarship |
| **URL** | https://www.zotero.org |
| **Tipo** | Gestor de referências bibliográficas |
| **Serve para** | Organizar, guardar e formatar referências bibliográficas. |
| **Pontos fortes** | Gratuito e open-source. Extensão para o browser que captura referências automaticamente. Suporta múltiplos estilos de citação (APA, ABNT, etc.). Integração com Word e Google Docs. Sincronização entre dispositivos. |
| **Limitações** | Curva de aprendizagem inicial. Armazenamento cloud gratuito limitado (300 MB). |
| **Etapas recomendadas** | `STEP-INV-05`, `STEP-INV-06`, `STEP-INV-10` |
| **Dica para o utilizador** | Instale a extensão do browser desde o início. Organize as referências por pastas/tags. Use para gerar a bibliografia automaticamente. |

---

### TOOL-009 — Semantic Scholar

| Campo | Conteúdo |
| :--- | :--- |
| **ID** | `tool-semantic-scholar` |
| **Nome** | Semantic Scholar |
| **Fornecedor** | Allen Institute for AI |
| **URL** | https://www.semanticscholar.org |
| **Tipo** | Motor de pesquisa académica com IA |
| **Serve para** | Pesquisa de artigos com resumos gerados por IA. Exploração de citações e artigos influentes. |
| **Pontos fortes** | Resumos gerados por IA (TLDR). Grafo de citações interativo. Identificação de artigos mais influentes. Alertas de pesquisa. |
| **Limitações** | Cobertura pode ser menor que Google Scholar em algumas áreas. Foco maior em ciências da computação e biomedicina. |
| **Etapas recomendadas** | `STEP-INV-05` |
| **Dica para o utilizador** | Use os resumos TLDR para triagem rápida. Explore o grafo de citações para encontrar artigos relacionados. |

---

## Tabela Resumo

| ID | Ferramenta | Tipo | Custo | Etapas |
| :--- | :--- | :--- | :--- | :--- |
| `tool-chatgpt` | ChatGPT | LLM | Gratuito / Pago | 01, 02, 03, 04 |
| `tool-claude` | Claude | LLM | Gratuito / Pago | 08, 09, 10 |
| `tool-gemini` | Gemini | LLM + Pesquisa | Gratuito | 01, 04, 05 |
| `tool-consensus` | Consensus | Evidência | Gratuito / Pago | 05, 06 |
| `tool-openalex` | OpenAlex | Base de dados | Gratuito | 05 |
| `tool-google-scholar` | Google Scholar | Pesquisa | Gratuito | 04, 05 |
| `tool-notebooklm` | NotebookLM | Documentos | Gratuito | 07, 08 |
| `tool-zotero` | Zotero | Referências | Gratuito | 05, 06, 10 |
| `tool-semantic-scholar` | Semantic Scholar | Pesquisa + IA | Gratuito | 05 |

---

## Matriz de Decisão por Tarefa

Esta matriz permite à interface recomendar ferramentas com base na tarefa, mostrando alternativas e condições de acesso.

| Tarefa | Ferramenta Principal | Alternativa | Gratuita | Requer Conta | Etapas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Exploração de ideias | ChatGPT | Gemini | Sim (limitado) | Sim | 01, 02, 03 |
| Estruturação de objetivos | ChatGPT | Claude | Sim (limitado) | Sim | 03, 04 |
| Pesquisa científica baseada em evidência | Consensus | Semantic Scholar | Sim (limitado) | Sim | 05 |
| Pesquisa de literatura aberta | OpenAlex | Google Scholar | Sim | Não (OpenAlex) / Não (GS) | 05 |
| Validação de palavras-chave | Google Scholar | OpenAlex | Sim | Não | 04 |
| Avaliação de relevância de fontes | ChatGPT | Claude | Sim (limitado) | Sim | 06 |
| Leitura e síntese de PDFs | NotebookLM | SciSpace | Sim | Sim | 07, 08 |
| Redação académica | Claude | ChatGPT | Sim (limitado) | Sim | 08, 09 |
| Revisão de texto e estilo | Claude | LanguageTool | Sim (limitado) | Sim / Não | 10 |
| Gestão de referências bibliográficas | Zotero | Mendeley | Sim | Sim | 05, 06, 10 |

> **Nota:** A interface lê esta matriz. Quando uma ferramenta for removida ou substituída, basta atualizar aqui.
