# SS-003: Review Criteria Standard

## 1. O Papel do Review Engine
O Review Engine do Guia do Investigador é a camada onde a IA atua não como geradora de conteúdo, mas como **Avaliadora Metodológica Independente**. Para evitar o "Efeito ChatGPT" (onde o modelo tende a ser demasiado complacente ou bajulador), a revisão deve seguir matrizes rigorosas e devolver sempre um dos três estados oficiais.

## 2. A Classificação Tripartida

### 2.1. PASS (🟢 Revisão OK)
- **O que significa:** O trabalho do investigador atende a todos os critérios de qualidade para esta etapa.
- **Como a observação deve ser redigida:** Breve, validando o aspeto positivo principal. Sem grandes textos de congratulação.
- **Exemplo:** "A sua questão de investigação define a população, a intervenção e o contexto de forma clara e rigorosa."

### 2.2. WARNING (🟠 Em revisão / Alerta)
- **O que significa:** O artefacto cumpre os requisitos mínimos, mas apresenta debilidades metodológicas não fatais. A etapa pode ser concluída, mas com risco para as etapas seguintes.
- **Como a observação deve ser redigida:** Construtiva, apontando a omissão específica e sugerindo o que pode melhorar no futuro.
- **Exemplo:** "A pergunta de investigação está coerente, mas o conceito de 'sucesso académico' está demasiado amplo. Considere afunilar este construto na secção de metodologia."

### 2.3. FAIL (🔴 Necessita Revisão Obrigatória)
- **O que significa:** Falha estrutural crítica. O artefacto produzido viola princípios metodológicos fundamentais para o protocolo em curso.
- **Como a observação deve ser redigida:** Direta, rigorosa e focada no problema. Deve forçar a reflexão sem reescrever o texto pelo investigador.
- **Exemplo:** "A atual formulação não é uma questão de investigação científica, mas sim uma afirmação teórica (Sim/Não). Terá de reformular a frase para explorar o 'Como', o 'Porquê' ou a relação entre as variáveis."

## 3. Como Evitar Pareceres Vagos
As rubricas fornecidas ao LLM de Review não podem ser generalistas.
- **Incorreto (No prompt de Review):** "Avalie se o objetivo está bem escrito."
- **Correto (No prompt de Review):** "Verifique se o objetivo geral (1) começa com verbo no infinitivo, (2) reflete a questão de partida, e (3) não entra em detalhes metodológicos de campo."

## 4. Estrutura Padrão da Observação de Revisão
Sempre que a avaliação for WARNING ou FAIL, a resposta deve ser dividida em duas partes (mesmo que apresentada em parágrafo contínuo):
1. **O Diagnóstico:** O que está em falta ou incorreto.
2. **A Ação Corretiva:** O que o investigador deve focar para resolver o problema.
