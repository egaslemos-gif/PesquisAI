# 55. Quality Gates

Os **Quality Gates** são mecanismos de validação formais que garantem a excelência dos recursos científicos (Scientific Assets), dos objetos de aprendizagem (SLOs) e dos protocolos no *Guia do Investigador*.
Eles previnem que conteúdos inacabados, pedagogicamente incorretos ou não testados cheguem à produção.

## Taxonomia de Quality Gates
O processo de controlo de qualidade está hierarquizado em quatro níveis:

### QG-001: Asset Quality
Avalia a validade de um ativo científico individual (Knowledge, Prompt, Checklist, Review, Example, Tool).
**Critérios Base:**
- Formatação correta em Markdown ou JSON.
- Semântica e estrutura de metadados completas.
- Testado num contexto isolado.

### QG-002: SLO Quality (Gold Standard Checklist)
Este é o Quality Gate mais importante da plataforma. Ocorre quando se consolida um *Scientific Learning Object* completo.
Para um SLO ser classificado como **Gold Standard**, todos os itens seguintes têm de ser obrigatoriamente preenchidos e validados:
- [ ] **Knowledge**: ✔ (A teoria está bem fundamentada e explicada).
- [ ] **Prompt**: ✔ (O Prompt tem comportamento determinístico).
- [ ] **Checklist**: ✔ (Critérios claros de autoavaliação).
- [ ] **Review**: ✔ (Critérios metodológicos estritos para avaliação).
- [ ] **Examples**: ✔ (Existem casos práticos positivos e negativos documentados).
- [ ] **Tools**: ✔ (Ferramentas mapeadas, caso se aplique).
- [ ] **Validation**: ✔ (Testado empiricamente com um LLM/humano).
- [ ] **Editorial Review**: ✔ (Revisão linguística e de acessibilidade concluída).

### QG-003: Protocol Quality
Garante que a composição de vários SLOs num Protocolo (ex: `RL-01`) faz sentido metodologicamente.
**Critérios Base:**
- Fluxo de trabalho sem ambiguidades.
- Todos os passos contêm um *SLO Manifest* válido.
- A transição entre os artefactos gerados num SLO para o seguinte é coerente (inputs e outputs batem certo).

### QG-004: Release Quality
O último nível antes da publicação na plataforma de produção.
**Critérios Base:**
- Performance UI/UX fluida.
- Regras de negócio estabilizadas (sem side-effects).
- Todos os SLOs contidos possuem `QG-002` validado.
- Aprovação do Conselho Científico.

---

*Nota: Os ativos individuais não possuem certificação académica isolada; apenas os SLOs (através do QG-002) representam a unidade pedagógica mínima certificável do Guia do Investigador.*
