# 54. Scientific Learning Object (SLO)

## 1. O Conceito de SLO
O **Scientific Learning Object (SLO)** representa a maturidade máxima da plataforma *Guia do Investigador*. 
Até agora, as etapas de um protocolo (ex: "Definir Tema") eram vistas apenas como passos num fluxo estático. Com a introdução do SLO, **cada etapa de investigação torna-se num átomo pedagógico independente, reutilizável e auto-avaliável**.

**O SLO é a unidade pedagógica mínima da plataforma e a única entidade certificável.**
Os ativos individuais (Knowledge Cards, Prompt Assets, Checklists, Reviews, Examples e Tools) são reutilizáveis, mas não possuem certificação isolada. A certificação é sempre atribuída ao SLO completo.

Um SLO não se limita a dar instruções; ele fornece o conhecimento, a ferramenta para interagir com o LLM (Prompt), uma forma do investigador se avaliar (Checklist) e uma forma da plataforma/IA avaliar metodologicamente o trabalho produzido (Review).

## 2. A Estrutura de um SLO
Qualquer SLO formal da plataforma deve agregar os seguintes componentes:

```text
SLO (Ex: "Delimitação de Tema")
├── Knowledge Assets    (Teoria, exemplos e "Como fazer")
├── Prompt Assets       (A ponte interativa para IA)
├── Checklist Assets    (Critérios de autoavaliação - "Eu fiz?")
├── Review Assets       (Critérios de validação - "O sistema aprova?")
├── Example Assets      (Casos práticos de sucesso e falha)
├── Tool Assets         (Ferramentas externas recomendadas)
├── Learning Outcome    (A competência garantida no final)
├── Assessment Rules    (Como o sistema combina Checklist e Review)
└── Version             (Gestão do ciclo de vida e maturidade)
```

## 3. O Ciclo de Vida Pedagógico
O investigador interage com o SLO seguindo um fluxo estrito que garante a qualidade académica e previne alucinações das IAs:

1. **Apreender (Knowledge)**: O investigador lê o *Knowledge Card* para interiorizar o conceito científico subjacente (ex: PICO, Taxonomia de Bloom).
2. **Operacionalizar (Prompt/Tool)**: O investigador usa um *Prompt Asset* estruturado na sua IA de eleição ou uma *Tool* recomendada.
3. **Produzir (Artefacto)**: O resultado gerado não é final. É um rascunho de trabalho.
4. **Autoavaliar (Checklist)**: O investigador confronta o seu próprio Artefacto com os critérios binários e objetivos da Checklist. Esta reflexão força a re-leitura do *Knowledge*.
5. **Validar (Review)**: O sistema (ou, futuramente, orientador e IA local) avalia o Artefacto com base num `validationPattern` e sugere vias de `remediation`.
6. **Consolidar (Learning Outcome)**: Ao passar na validação, o investigador garante ter adquirido a competência prevista.

## 4. Maturidade dos Ativos
Dentro de um SLO, todos os ativos declaram o seu estado de maturação:
- `draft`: Em construção, sujeito a alterações (uso interno).
- `reviewed`: Submetido a testes primários de coerência pedagógica.
- `approved`: Validado pelo conselho científico do projeto. Pode entrar em produção.
- `gold`: O estado da arte. Ativos que demonstraram eficácia comprovada em dezenas de investigações empíricas.

## 5. O Conceito de SLO Manifest
A introdução desta taxonomia exige a criação de um documento declarativo por etapa: o **SLO Manifest**.
O *SLO Manifest* define exatamente quais os recursos disponíveis na etapa, qual a estrutura, os resultados de aprendizagem esperados e os Quality Gates a aplicar.

Exemplo de estrutura conceptual do SLO Manifest:
```text
SLO
↓
Knowledge
↓
Prompt
↓
Checklist
↓
Review
↓
Examples
↓
Tools
↓
Outcome
↓
Quality Gate
```
Com um manifesto declarativo em cada etapa, torna-se possível:
1. Validar automaticamente se um SLO está completo.
2. Identificar ativos em falta.
3. Gerar métricas de cobertura.
4. Alimentar a interface (Learning Navigator e Semantic Timeline) sem qualquer lógica específica por protocolo, de forma totalmente genérica.

## 6. Escalabilidade e Composabilidade
A adoção do modelo SLO permite que o *Guia do Investigador* evolua de forma modular. 
- Um novo protocolo de pesquisa (ex: `PJ-01 Projeto de Investigação`) não precisará de ser escrito de raiz. 
- O autor do protocolo poderá simplesmente "compor" um novo workflow "puxando" SLOs já validados (`SLO-THEME-DELIMITATION`, `SLO-RESEARCH-QUESTION`) e injetando apenas o contexto específico da nova área.

