# RFC-S-018: Scientific Content Standard (Phase II)

## 1. Contexto Estratégico (PHASE II: Scientific Knowledge Layer)
Com a consolidação da arquitetura e o congelamento da interface (UX Freeze), o "Guia do Investigador" transita de uma "aplicação de tarefas" para um **Sistema Operativo para Investigação Científica**. 

A **Phase II** foca-se em enriquecer o núcleo de valor do produto: o **Conteúdo Científico e Metodológico**. Para garantir que a qualidade pedagógica acompanha a excelência técnica alcançada, estabelecemos um padrão ouro universal para todo o conteúdo do Guia.

## 2. A Nova Taxonomia de Documentação: Scientific Specifications (SS)
Até à data, as RFC (Request for Comments) focaram-se na arquitetura (`RFC-A`), fluxos (`RFC-F`) e revisões (`RFC-R`). 

A partir de agora, as normas metodológicas, estruturais e científicas serão formalizadas numa nova série de documentos:
**SS (Scientific Specifications)**.
- **Objetivo:** Definir as "regras do jogo" para quem escreve conteúdo para a plataforma (e não código).
- **Exemplos futuros:** `SS-001: Como escrever Prompts`, `SS-002: Elaboração de Checklists Metodológicas`, `SS-003: Avaliação Padrão para Revisões Metodológicas`.

## 3. O Padrão Universal para Protocolos (Research Protocol Excellence)
Cada Protocolo Científico do Guia (e.g., RL-01, PJ-01) deixa de ser apenas um "workflow" de formulários e passa a ser encarado como um **produto pedagógico** autónomo e de excelência. 

**Toda e qualquer Etapa** de um Protocolo tem obrigatoriamente de incluir a seguinte matriz (estruturada internamente no motor JSON e projetada na UI):

1. **Objetivo:** O que o investigador vai atingir nesta etapa.
2. **Competência:** O skill académico exigido ou treinado.
3. **Resultado Esperado:** O output claro que deve figurar no Artefacto final.
4. **Fundamentação Metodológica:** O "Porquê?" científico desta etapa ("Saiba mais").
5. **Prompt Principal:** A instrução nuclear e otimizada a fornecer à IA.
6. **Estratégias de Prompt:** Modificadores e alternativas (Equilibrado, Guiado, Direto).
7. **Ferramentas Recomendadas:** Que plataformas (e.g. Elicit, Perplexity, Zotero) usar.
8. **Erros Frequentes:** O que investigadores menos experientes costumam falhar.
9. **Checklist:** Itens acionáveis para validação.
10. **Revisão Metodológica:** A rubrica/critério pelo qual o *Review Engine* vai classificar (PASS, WARNING, FAIL).
11. **Leituras Recomendadas:** Literatura académica de apoio sobre esta fase específica.
12. **Recursos Complementares:** Templates, exemplos de preenchimento, e hiperligações para normativas.

*Nota: Esta estrutura orientará a refatorização do protocolo RL-01 para se tornar o "Gold Standard" do sistema.*

## 4. O Padrão Universal para a Biblioteca de Prompts (Prompt Library v2)
A Biblioteca não será uma lista crua de texto, mas um repositório pedagógico que ensina *como comunicar com a IA* em contextos académicos.

Todo o Prompt individual na Biblioteca deve possuir:

1. **Categoria:** (Ex: Triagem, Extração de Dados, Revisão de Texto).
2. **Quando utilizar:** O cenário específico ideal.
3. **Quando NÃO utilizar:** Contraindicações e limitações epistemológicas.
4. **Exemplo de Entrada (Input):** O que o utilizador tem de fornecer ("Contexto").
5. **Exemplo de Saída (Output):** O que se deve esperar como resposta de qualidade.
6. **Erros Frequentes:** Falhas comuns na construção de contexto que causam "alucinações" ou viés.
7. **Ferramentas Recomendadas:** Qual o melhor LLM/agente para aquele prompt específico (e.g., Claude para nuance narrativa; GPT-4 para estruturação lógica densa).

## 5. Próximos Passos (Roadmap Phase II)
O desenvolvimento nos próximos sprints deverá adotar, estritamente e por esta ordem, os seguintes marcos:

1. **RFC-S-018 (Status: CONCLUÍDO)** — Formalização do Padrão.
2. **SS-001, SS-002 (Status: PENDENTE)** — Manuais de redação de conteúdo.
3. **Refactoring do RL-01 (Gold Standard) (Status: PENDENTE)** — Adaptar as 9 etapas existentes do protocolo RL-01 para preencher todos os 12 campos obrigatórios do novo padrão e ajustar o Frontend (Knowledge Base Modal / Side-panel) para apresentar este conteúdo extra.
4. **Biblioteca de Prompts v2 (Status: PENDENTE)** — Atualizar a coleção e implementar a interface da ficha pedagógica.
5. **Novos Protocolos (Status: FUTURO)** — Avançar para PJ-01, MC-01 sob as novas fundações.
