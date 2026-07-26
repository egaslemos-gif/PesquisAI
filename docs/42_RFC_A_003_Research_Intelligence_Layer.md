# RFC-A-003 — Research Intelligence Layer

## Contexto e Estado Atual (Foundation Complete)
Até à RC2, o Guia do Investigador construiu uma infraestrutura baseada numa clara separação de domínios:
`Workflow Engine` + `Workspace` + `Research Identity` + `Research Events`.

Esta fundação garante que toda a interação do investigador é capturada de forma metódica e passiva. O estado do projeto foi declarado como **"Foundation Complete"**, suspendendo-se temporariamente desenvolvimentos complexos (como a camada de Inteligência) até que exista uma necessidade funcional urgente ditada pelo valor para o utilizador final.

Este documento constitui a visão arquitetural teórica para quando a plataforma necessitar de interpretar os eventos. **Não tem implementação no código atual**.

## Missão do Domínio
Transformar eventos brutos (`Research Events`) em conhecimento metodológico acionável, sem depender de motores visuais (Dashboards) para efetuar esses cálculos. O domínio deverá atuar como um interpretador que deriva indicadores científicos (como "tempo de formulação", "índice de revisões") e alimenta o `Learning Record` do investigador.

## Fronteiras e Responsabilidades
- **Responsabilidade Exclusiva**: Escutar (ou processar periodicamente) o registo bruto de `research.events` e calcular o estado de proficiência ou os indicadores analíticos.
- **O que NÃO faz**: Não tem interface. Não gera gráficos. Não emite alertas diretos na UI.
- **Isolamento**: Funciona como um intermediário. O Dashboard consumirá apenas os resultados deste domínio.

## Fluxo de Dados Conceptual
O fluxo obedece ao princípio da cadeia de valor metodológica:
1. **Research Identity** (Quem)
2. **Workspace** (O Quê)
3. **Research Events** (Quando e Como)
4. **Research Insights** (O Significado — *Este Domínio*)
5. **Learning Record** (Consequência no Perfil)
6. **Analytics/Dashboards** (Visualização)

*Exemplo prático:*
- *Evento Raw:* `STEP_STARTED` → `STEP_COMPLETED`
- *Processamento no Insight Layer:* Calcular a diferença temporal.
- *Output Derivado:* `tempoMedio = 18m`

## Indicadores Futuros Previstos
Quando a infraestrutura de dados suportar, o *Research Intelligence Layer* procurará responder às seguintes perguntas (entre outras):
- Quanto tempo demora, em média, a formular a pergunta de partida?
- Em que etapa existe maior propensão de abandono ou estagnação?
- Quantas vezes um investigador retrocede a passos metodológicos anteriores (índice de revisões)?
- Qual a taxa de sucesso ou eficácia (ex: correlação entre prompts mais usados e completude das etapas)?
- Sessões necessárias para concluir o workflow.

## Evolução Necessária nos Eventos (Quando implementado)
Para que este domínio funcione em toda a sua plenitude, a camada inferior (`Research Events`) terá de sofrer um enriquecimento de dados no momento apropriado, introduzindo:
- `schemaVersion` (Para gestão de formato)
- `sessionId` (Agrupamento de ações da mesma janela temporal)
- `correlationId` (Cadeia de causa-efeito, ex: Prompt → Resposta → Artefacto)
- `metadata` (Informação específica extraída de cada evento)
