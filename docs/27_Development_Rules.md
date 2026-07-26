# 27 — Development Rules

Este documento funciona como a Constituição Técnica para o desenvolvimento do ResearchAI Guide. Qualquer código escrito para este projeto deve respeitar rigorosamente estas regras. O objetivo é garantir que o produto se mantém simples, escalável e fiel ao seu manifesto.

---

## 1. Tamanho dos Ficheiros
**Nenhum ficheiro pode ultrapassar 300 linhas.**  
Se um ficheiro estiver a atingir este limite, significa que tem demasiadas responsabilidades e deve ser dividido.

## 2. Responsabilidade Única
**Uma responsabilidade por módulo.**  
- O *Engine* não altera dados (apenas orquestra).  
- O *Workspace* é a única fonte da verdade e o único a alterar dados.  
- A *UI* apenas reage a eventos e desenha o ecrã.  

## 3. Código Limpo
**Sem código duplicado.**  
Se um bloco de lógica for usado duas vezes, deve ser extraído para uma função utilitária ou para um serviço.

## 4. Stack Tecnológica
**Sem frameworks.**  
Nada de React, Vue, Svelte, Angular, Vite, Tailwind, etc. Apenas Vanilla HTML5, CSS3 e JavaScript (ES6+).

## 5. Dependências
**Sem dependências externas.**  
O projeto deve funcionar num browser sem necessidade de instalar pacotes NPM ou fazer pedidos a CDNs. Se o utilizador abrir o `index.html` diretamente do disco (`file://`), tudo tem de funcionar.

## 6. Documentação
**Todo o comportamento deve estar documentado.**  
O código deve ser claro por si mesmo, mas lógica complexa, estrutura de dados e decisões de arquitetura devem estar sempre comentadas e refletidas nos documentos de especificação.

## 7. Desacoplamento
**Todo o componente deve poder ser removido sem quebrar os restantes.**  
Os módulos não se conhecem diretamente. A comunicação é feita exclusivamente através do Event Bus. Se a vista da barra de progresso for apagada, o resto da aplicação continua a funcionar.

## 8. Foco no MVP
**Se uma funcionalidade exigir mais de um dia de implementação e não contribuir diretamente para completar o protocolo, ela sai do MVP.**  
A perfeição técnica não pode atrasar a validação do produto com investigadores reais.

## 9. Prioridade da Experiência
**A experiência do investigador tem prioridade sobre a elegância técnica.**  
Se para tornar a experiência mais clara for preciso escrever código ligeiramente menos "elegante" (desde que cumpra as regras acima), a clareza vence.

## 10. A Pergunta Fundamental
Antes de adicionar qualquer linha de código, componente ou funcionalidade, pergunte sempre:  
> **"Isto ajuda o investigador a concluir a investigação?"**

Se a resposta não for um "Sim" absoluto e imediato, a funcionalidade não pertence a este produto.

## 11. Knowledge, not Complexity (Conhecimento Just-in-Time)
Todas as propostas de evolução da plataforma devem respeitar o princípio "Knowledge, not Complexity". 
Sempre que possível, reutilizar páginas, componentes e fluxos existentes. O conhecimento deve ser contextual, apresentado no momento exato em que o investigador dele necessita (através de blocos expansíveis como `<details>`), evitando criar novas secções, menus ou funcionalidades independentes. Antes de aprovar funcionalidades, validar a métrica **Valor para o investigador vs Complexidade adicionada**. O objetivo é que qualquer investigador consiga utilizar o Guia do Investigador de forma intuitiva, sem necessidade de formação prévia ou apoio externo.

## 12. Princípio da Carga Cognitiva Mínima
O Guia do Investigador deve apresentar apenas a informação necessária para a decisão atual do investigador. Todo o conhecimento adicional deve ser opcional, contextual e progressivamente revelado ("progressive disclosure"), permitindo que investigadores iniciantes recebam orientação quando necessário, enquanto utilizadores experientes mantêm um fluxo de trabalho rápido e sem distrações.
