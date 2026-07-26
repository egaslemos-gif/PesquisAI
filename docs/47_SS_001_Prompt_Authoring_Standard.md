# SS-001: Prompt Authoring Standard

## 1. O que é um Prompt no Guia?
No Guia do Investigador, um *prompt* não é apenas um texto a ser copiado. É um **objeto pedagógico e metodológico**. É uma instrução estruturada que ensina indiretamente o investigador a organizar o seu pensamento, forçando-o a fornecer contexto académico relevante antes de pedir resultados a um Modelo de Linguagem.

## 2. Como deve ser escrito?
- O prompt deve possuir um papel claro (Persona).
- Deve definir estritamente as restrições da tarefa (Constraints).
- Deve instruir o LLM a NÃO inventar dados (No-hallucination clause).
- Deve exigir fundamentação ou estruturação académica no formato de saída (Output format).

## 3. Estrutura Obrigatória
Todo o prompt nuclear (Principal) deve ser redigido seguindo a estrutura:
1. **[Atuação/Persona]:** "Atue como um orientador metodológico especializado em..."
2. **[Contexto Fornecido]:** "Utilize exclusivamente as seguintes variáveis fornecidas pelo investigador..."
3. **[Ação Requerida]:** "Realize a seguinte tarefa metodológica..."
4. **[Restrições]:** "Não escreva a tese pelo investigador. Forneça apenas opções, quadros comparativos ou alertas."
5. **[Formato de Saída]:** "Devolva a resposta em Markdown, utilizando a seguinte estrutura de tópicos..."

## 4. Adaptação às Estratégias
O Guia permite modificar o Prompt Principal consoante a Estratégia selecionada pelo utilizador. Os autores de prompts devem prever como a instrução muda:

- **Estratégia Guiada (Para investigadores juniores ou início de fase):**
  - *Modificador:* O prompt deve forçar o LLM a explicar o *porquê* da sua resposta, decompondo os passos lógicos e sugerindo questões para reflexão do investigador.

- **Estratégia Equilibrada (O padrão ouro):**
  - *Modificador:* O prompt foca-se na revisão do trabalho e devolução de melhorias diretas, com uma breve justificação científica.

- **Estratégia Direta (Para utilizadores experientes ou iterações rápidas):**
  - *Modificador:* O prompt omite explicações teóricas. O LLM devolve apenas quadros de síntese, outputs brutos ou correções técnicas imediatas.

## 5. Linguagem a Utilizar
- Precisa, inequívoca e impositiva (ex: "Apresente", "Devolva", "Analise").
- Evitar verbos passivos ou instruções vagas (ex: "Se puder, fale sobre...").

## 6. Erros que devem ser evitados
- **Over-prompting:** Tornar a instrução tão complexa e restritiva que o modelo perde criatividade analítica.
- **Autorização implícita para gerar factos:** Não incluir a cláusula que obriga o modelo a avisar caso não encontre evidência nos dados fornecidos.
- **Falta de variáveis de entrada:** Um prompt sem *placeholders* (ex: `{{Variavel_X}}`) para o contexto do investigador será inútil, resultando em respostas genéricas.
