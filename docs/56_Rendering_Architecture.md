# Arquitetura de Rendering Declarativo Avançada (RFC-019 v2)

Este documento formaliza a arquitetura do motor de renderização da plataforma *Guia do Investigador*, introduzida na Fase 3 e refinada com a introdução do Asset Resolver e do Rendering Context. O objetivo desta arquitetura é garantir um isolamento total entre a lógica metodológica, a definição estrutural dos *Scientific Learning Objects* (SLOs) e a camada de apresentação gráfica (UI).

## O Paradigma

Até à Fase 2, a UI perguntava: *"Como renderizo esta etapa (Step)?"*
A partir da Fase 3 (v2), a arquitetura tornou-se completamente agnóstica em relação ao HTML. A UI é o último ponto de uma *Pipeline de Renderização* estritamente unidirecional.

### A Regra de Ouro
**Os painéis são consumidores de contexto, nunca produtores de estado de domínio.**
- Os painéis **podem ler** o `RenderingContext`.
- Os painéis **podem emitir eventos** para o Workflow através do `EventBus`.
- Os painéis **nunca alteram diretamente** o modelo de domínio.

## A Rendering Pipeline

O fluxo de informação na aplicação segue a seguinte hierarquia declarativa:

\`\`\`mermaid
graph TD
    A[Workflow Data] --> B[Protocol]
    B --> C[Stage]
    C --> D[SLO Manifest]
    D --> E[Asset Resolver]
    E --> F[Rendering Context]
    F --> G[Rendering Engine]
    G --> H[Panel Registry]
    H --> I[Panels Lifecycle]
    I --> J[Learning Navigator]
    J --> K[UI Orquestrada]
\`\`\`

### 1. Asset Resolver
O `AssetResolver` (`src/js/core/assetResolver.js`) é o serviço que lê o *SLO Manifest* e busca as entidades reais para os painéis. Um painel nunca vai à base de dados procurar os seus *assets*; ele recebe-os já resolvidos. No futuro, um manifesto poderá conter `knowledge: ["KC-01"]` e o Resolver converterá isso num array de objetos prontos a usar.

### 2. Rendering Context
O `RenderingEngine` constrói um objeto único, imutável do ponto de vista dos painéis, chamado `RenderingContext`. Ele contém:
- `protocolId`: O ID do protocolo ativo.
- `stageId`: O ID da etapa.
- `manifest`: O próprio SLO manifest da etapa.
- `resolvedAssets`: Os ativos resolvidos pelo Asset Resolver.
- `userProgress`: O progresso do utilizador.
- `preferences`: Preferências ativas do Workspace (ex: `promptStrategy`).

### 3. Rendering Engine
O `RenderingEngine` atua como maestro. Ele não conhece HTML. O seu papel é:
1. Criar o `RenderingContext`.
2. Pedir os painéis válidos ao `PanelRegistry`.
3. Executar o ciclo de vida inicial dos painéis (`validate`).
4. Devolver a *Pipeline* final (`context` e `activePanels`) à vista.

### 4. Panel Registry
O `PanelRegistry` gere a taxonomia global. Cada painel obedece a um contrato rígido e pertence a uma **categoria** (Core, Assessment, Resources, Output, Navigation), que define a prioridade de renderização principal.

#### Contrato do Painel
- `id`: O identificador interno (ex: `knowledge`).
- `category`: O grupo a que pertence.
- `title`: O título amigável.
- `icon`: O ícone representativo.
- `priority`: A ordem dentro da sua categoria.
- `supportsOffline`: Booleano indicando suporte offline.
- `discover()`: Invocado ao registar o painel no motor.
- `validate(context)`: Assegura que as dependências existem antes de prosseguir.
- `condition(context)`: Decide se o painel deve ser ativado neste contexto específico.
- `render(context)`: A devolução efetiva do HTML (exclusivamente baseado no contexto).
- `attachListeners(context)`: Ligação de ações dinâmicas daquele painel à interface, executado após o HTML estar no DOM.
- `destroy(context)`: *Teardown* (para limpeza de memória/eventos).

## Extensibilidade Absoluta

Esta separação rigorosa permite que:
1. Um novo painel pode ser adicionado **apenas através do seu registo** no `PanelRegistry`, sem qualquer alteração no `stepView.js`.
2. A remoção de um ativo do SLO Manifest elimina automaticamente o painel correspondente e a sua entrada no *Learning Navigator*.
3. Todo o sistema está preparado para **Adaptive Rendering** (RFC-020), pois basta que o `RenderingEngine` manipule a seleção e ordenação dos painéis consoante as preferências e experiência do investigador, sem ter de tocar numa única linha do código visual ou do workflow base.
