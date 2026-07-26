# RC1 — Lições Aprendidas (Post-Mortem)

## O que funcionou?
- **Protocolos Guiados:** A divisão do processo científico em etapas validadas.
- **Biblioteca de Prompts:** O acesso rápido a instruções otimizadas.
- **Knowledge Just-in-Time:** A contextualização imediata das ferramentas (quando e porquê utilizar).
- **Artifact Capture:** O conceito de curadoria metodológica e o foco nos resultados estruturados em vez do histórico de conversas.
- **Workspace (Local Storage):** Persistência contínua, garantindo uma abordagem *offline-first* robusta e veloz.

## O que aprendemos?
- A distinção entre a Biblioteca (recursos gerais) e o Protocolo (percurso guiado) precisava de ser mais explícita visual e funcionalmente.
- O instinto natural do investigador ao interagir com IA é colar as respostas completas (incluindo justificações e alternativas), sendo essencial **orientar ativamente a captura do artefacto**.
- A evolução do produto não passou por introduzir IA nativa no Guia, mas sim em posicionar o Guia como o **curador metodológico** entre o utilizador e os grandes LLMs (ChatGPT, Gemini, etc.).

## Decisões adiadas (Para RC2 e seguintes)
- **Research Identity (RID):** Gestão de perfis e histórico científico do investigador.
- **Learning Record / Analytics:** Métricas de adoção e dificuldades por etapa do protocolo.
- **Validação Inteligente Contextual:** Avisos reativos ("Colou demasiado texto. Tem a certeza que é o artefacto final?").
- **Cloud Sync:** Sincronização e backup de investigações num backend remoto.
- **Feedback & Fóruns:** Mecanismos de suporte e partilha entre a comunidade.

## O Momento Zero da RC2
A evolução futura deixará de ser puramente conceptual e passará a ser orientada por dados recolhidos durante a fase de *Internal Beta*.
- Se há perda de dados = Prioridade no **RID e Sincronização**.
- Se há falhas numa etapa específica = Refinamento do **Protocolo**.
- Se a qualidade dos outputs é fraca = Melhoria dos **Prompts**.

## A Grande Mudança
No início do projeto o foco era a *ferramenta* (ChatGPT, Gemini, Prompts). No final da RC1, o foco passou a ser o *processo* (Protocolos, Artefactos, Metodologia, Evidências). A IA tornou-se apenas um meio para um fim maior.

---

> *"A Inteligência Artificial produz respostas. O Guia do Investigador ajuda a transformá-las em conhecimento científico estruturado."*
