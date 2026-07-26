# 61 — Research Journey Audit (Protocolo WF-INV / RL-01)

Este documento transpõe a análise de interface para a análise de jornada empírica e pedagógica. O objetivo é auditar passo a passo se um investigador consegue percorrer de forma autónoma as 9 etapas sem qualquer atrito cognitivo.

**Avaliação a preencher durante os testes:**
- **Dificuldade:** (Baixa | Média | Alta)
- **Problemas:** (Onde hesita, lê demasiado, procura cliques inexistentes)

---

## Etapa 1: Definição do Tema
- **Objetivo:** Transformar uma área de interesse genérica num tópico de investigação focado.
- **Inputs:** Interesse inicial do investigador e contexto local.
- **Ações:** Conversar com IA nas ferramentas, refinar ideia, copiar o tema final.
- **Outputs:** Tema delimitado e exequível (ex: menos de 300 caracteres).
- **Critérios (Checklist):** Tema delimitado? Permite pergunta? Relevante?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 2: Pergunta de Investigação
- **Objetivo:** Sintetizar o problema numa única pergunta que o estudo irá responder.
- **Inputs:** O Tema delimitado (da Etapa 1).
- **Ações:** Formular a pergunta usando as regras (ex: PICO), testar com o prompt, colar a versão refinada.
- **Outputs:** Pergunta central interrogativa (termina com ?).
- **Critérios (Checklist):** Clara e específica? Alinhada? Respondível?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 3: Definição de Objetivos
- **Objetivo:** Desdobrar a pergunta principal em ações metodológicas (Geral e Específicos).
- **Inputs:** Pergunta de Investigação.
- **Ações:** Utilizar IA para propor objetivos alinhados, selecionar os melhores (verbos de ação).
- **Outputs:** Lista estruturada (1 Geral + 3-5 Específicos).
- **Critérios (Checklist):** Geral alinhado? Específicos mensuráveis? Verbos de ação?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 4: Palavras-chave
- **Objetivo:** Identificar terminologia exata e estruturar expressões booleanas.
- **Inputs:** Tema, Pergunta e Objetivos.
- **Ações:** Extrair conceitos principais, traduzir para Inglês, aplicar operadores (AND/OR).
- **Outputs:** String booleana pronta a pesquisar.
- **Critérios (Checklist):** 2-3 conceitos centrais? Sinónimos em Inglês? Expressão booleana?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 5: Critérios de Seleção
- **Objetivo:** Criar barreira metodológica garantindo literatura relevante (Inclusão/Exclusão).
- **Inputs:** Pergunta e Expressão de Pesquisa.
- **Ações:** Definir limites temporais, linguísticos, populacionais e metodológicos.
- **Outputs:** Tabela/lista final de Inclusão e Exclusão.
- **Critérios (Checklist):** Claros? Não redundantes? Alinhados com a pergunta?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 6: Pesquisa em Bases
- **Objetivo:** Executar expressões e exportar resultados em bloco.
- **Inputs:** Expressão Booleana (Etapa 4) e acesso a Scopus/WoS/PubMed.
- **Ações:** Realizar as pesquisas nas plataformas, registar números iniciais (PRISMA).
- **Outputs:** Registo quantitativo das bases de dados.
- **Critérios (Checklist):** 2+ bases? Registou n.º de resultados? Exportou RIS/BibTeX?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 7: Triagem de Artigos
- **Objetivo:** Analisar abstracts face aos critérios estabelecidos.
- **Inputs:** Bases exportadas (Zotero/Mendeley) e Critérios de Seleção (Etapa 5).
- **Ações:** Remover duplicados, ler abstracts, decidir incluir/excluir.
- **Outputs:** Números de triagem do PRISMA e lista de referências finais.
- **Critérios (Checklist):** Aplicou critérios aos abstracts? Removeu duplicados? Tem lista final?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 8: Leitura Integral
- **Objetivo:** Extrair sistematicamente dados metodológicos, resultados e limitações.
- **Inputs:** Artigos aprovados em PDF.
- **Ações:** Ler criticamente, preencher matriz de extração (NotebookLM/Claude auxiliar).
- **Outputs:** Matriz de extração de dados preenchida.
- **Critérios (Checklist):** Leu na íntegra? Matriz preenchida? Lacunas identificadas?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

## Etapa 9: Redação da Revisão
- **Objetivo:** Escrever síntese crítica cruzando autores e identificando lacunas.
- **Inputs:** Matriz de extração.
- **Ações:** Estruturar tematicamente o texto, redigir comparações e conclusões.
- **Outputs:** Revisão da literatura formal.
- **Critérios (Checklist):** Estrutura temática? Cruza autores? Lacuna explícita?
- **Dificuldade:** [A preencher]
- **Problemas:** [A preencher]

---

**Nota Final:** Durante os testes (P1.6 Usability Testing), o foco **NÃO é** "O investigador gosta da cor?" mas sim "O investigador hesitou na Etapa 4 porque não sabia onde testar a String Booleana?". Se a resposta a qualquer bloqueio não for instintiva na interface, a UI falhou e precisa ser simplificada.
