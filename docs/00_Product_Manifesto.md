# 00 — Product Manifesto

## ResearchAI Guide — Manifesto do Produto

Este não é um documento técnico.  
É a filosofia que orienta todas as decisões deste projeto.

---

## Acreditamos que:

### 1. A metodologia científica vem antes da tecnologia.
A investigação científica tem um método. A tecnologia existe para servir esse método, não para o substituir. Nenhuma funcionalidade será adicionada se não respeitar o processo metodológico.

### 2. A IA apoia o raciocínio do investigador; não o substitui.
A Inteligência Artificial é uma ferramenta de apoio. O pensamento crítico, a análise e a decisão pertencem ao investigador. A plataforma nunca deve criar a ilusão de que a IA "fez a investigação".

### 3. Cada etapa deve produzir um artefacto verificável.
Progresso sem evidência não é progresso. Cada passo do workflow produz um resultado concreto, revisável e auditável — um artefacto. Sem artefacto, a etapa não está concluída.

### 4. O contexto deve acompanhar toda a investigação.
O tema, a pergunta, os objetivos e os resultados anteriores devem estar disponíveis em cada momento. A investigação é um processo cumulativo; a plataforma deve refletir isso.

### 5. As recomendações devem ser explicáveis e transparentes.
Quando o sistema sugere uma ferramenta, um prompt ou uma abordagem, o utilizador deve compreender o porquê. Nunca haverá "caixas negras" neste produto.

### 6. O sistema deve permanecer agnóstico em relação ao modelo de IA utilizado.
A plataforma não depende de nenhum fornecedor específico de IA. ChatGPT, Claude, Gemini, Copilot — o investigador escolhe. Os prompts e os fluxos são universais.

### 7. O utilizador mantém sempre o controlo sobre as decisões metodológicas.
A plataforma orienta, sugere e facilita. Mas nunca decide pelo investigador. O controlo é sempre humano.

### 8. O valor do produto mede-se pela clareza do percurso, não pelo número de funcionalidades.
O ResearchAI Guide não é medido pelo número de funcionalidades, mas pela capacidade de conduzir um investigador, com clareza e consistência, desde a definição do problema de investigação até à produção do artefacto científico final. Qualquer funcionalidade que não contribua diretamente para esse objetivo deve permanecer fora do produto.

### 9. O utilizador nunca deve precisar de decidir o próximo passo da investigação.
O protocolo decide a sequência. O utilizador decide apenas o conteúdo científico. Se existir qualquer momento em que o investigador pense *"E agora?"*, o workflow falhou.

### 10. Se uma funcionalidade precisa de mais de cinco minutos para ser explicada, não pertence ao MVP.
Este produto pretende orientar, não ensinar a utilizar a própria aplicação. A simplicidade é uma funcionalidade.

### 11. Princípio "Research First UX" (Ocultação de Capacidade)
A arquitetura pode ser poderosa, mas a interface deve transmitir extrema simplicidade. A experiência segue as seguintes regras de ouro:
1. **Uma ação principal por ecrã:** O utilizador nunca deve hesitar sobre qual é o próximo passo.
2. **Ocultar funcionalidades incompletas:** Não usar botões, separadores ou controlos apenas para "mostrar o futuro". A funcionalidade não entra se não gerar valor de ponta a ponta.
3. **Reduzir a carga cognitiva:** Cada secção deve responder a uma única pergunta metodológica (Conhecimento → "O que preciso saber?", Prompt → "O que devo perguntar?", Resultado → "O que devo produzir?", Revisão → "O sistema concorda?").
4. **Progressão linear:** O investigador deve conseguir iniciar e concluir um protocolo sem precisar de aprender a interface.
5. **Complexidade progressiva:** Funcionalidades avançadas só aparecem quando realmente acrescentarem valor e estiverem completas.

### 12. Princípio "Zero Cognitive Friction"
Cada elemento visível deve responder a uma pergunta do investigador. Se não responder, deve ser removido.
Se uma ação puder ser automática (ex: AutoSave), ela não deve ser um botão. A interface deve ser um ambiente onde é *impossível perder-se*.

### 13. Princípio "One Primary Action"
Cada ecrã ou vista deve ter apenas uma ação dominante. Todas as restantes ações devem apoiar essa decisão, nunca competir com ela. A simplicidade passa pela ausência de escolhas não essenciais.

### 14. Princípio "Identity First"
Nenhuma investigação pode existir sem identidade mínima. Toda investigação deve possuir, no momento da criação:
- um título provisório ou definitivo
- uma área científica
- um protocolo metodológico

---

## Como usar este manifesto

Sempre que surgir uma nova funcionalidade, a pergunta não é:

> *"É interessante?"*

A pergunta é:

> **"Está alinhada com os princípios do produto?"**

Se a resposta for não, a funcionalidade não entra.

### Cláusula inegociável de desenvolvimento

> Nenhuma nova funcionalidade entra no produto sem que exista evidência de que melhora a capacidade de um investigador concluir uma investigação utilizando o protocolo.

Este manifesto existe para impedir que, ao longo da evolução, o projeto se transforme apenas numa coleção de prompts ou numa interface para modelos de IA — perdendo o seu objetivo principal: **orientar o processo de investigação científica**.

---

*ResearchAI Guide — Capacitação UniLicungo 2026*

