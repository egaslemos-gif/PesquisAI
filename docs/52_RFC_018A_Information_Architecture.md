# RFC-018A: Information Architecture (Escalabilidade e Workspace)

## 1. Contexto e Problema
O *Guia do Investigador* encontra-se num ponto de viragem: deixou de ser apenas uma ferramenta experimental para assumir o papel de **Plataforma de Trabalho** contínua. 

O paradigma visual herdado assumia poucos projetos. No entanto, num cenário real, a acumulação de dezenas de projetos transforma a página inicial numa "parede inavegável de cartões" e as páginas do protocolo num *scroll* exaustivo.

## 2. Abordagem Baseada em Componentes
A partir desta RFC, toda a plataforma transita de uma lógica orientada a "ecrãs monolíticos" (como `renderEmptyState()`) para **Workspace Components** reutilizáveis. O sistema divide-se em 3 grandes domínios de trabalho:

1. **Dashboard Workspace**
2. **Protocol Workspace**
3. **Step Workspace**

---

## 3. Fase 1: Dashboard Workspace
O ponto de entrada evolui para um verdadeiro gestor de projetos.

### Componentes Chave:
- `ProjectExplorer`: O orquestrador da página inicial.
- `ProjectCard`: Representação individual de um projeto.
- `ProjectToolbar`: Barra superior de ações comuns.

### Estrutura
- **Barra de Pesquisa Global**: Permite pesquisar por Nome, Área científica, Protocolo e Tags.
- **Navegação por Tabs**: `[Todos] [Recentes] [Favoritos] [Arquivados]`
- **Listagem de Projetos**: Os projetos são categorizados e exibidos na tab selecionada.
- **Controlos de Vista e Ordenação**: Alternância entre vistas `Grid | Lista | Compact` e ordenação por `Nome`, `Última edição`, `Data criação`, `Estado`.

---

## 4. Fase 2: Protocol Workspace
A entrada num projeto não será apenas abrir um "cartão grande", será a entrada num painel analítico.

### Componentes Chave:
- `ProtocolDashboard`: O cabeçalho e visão global.
- `ProtocolMetrics`: Apresentação compacta de contagens e progresso.
- `SemanticTimeline`: A barra de navegação cronológica das etapas.

### Estrutura do Dashboard
O `ProtocolDashboard` será dividido em três blocos de leitura rápida:
1. **Identidade**: ID, Título, Estado (🟢 Ativo) e Objetivo Principal.
2. **Estado**: Progresso (ex: `████░░░░ 11%`), Etapa atual (`1/9`), Tempo estimado e Dificuldade.
3. **Recursos**: Contagem de Knowledge Cards, Prompts, Checklists, Reviews, Ferramentas e Exemplos alocados ao protocolo.

A `SemanticTimeline` incluirá estados visuais evidentes (ex: `✓ Área`, `● Pergunta`, `○ Objetivos`).

---

## 5. Fase 3: Step Workspace
A Etapa deixa de ser uma página sequencial em formulário e passa a ser um ambiente interativo.

### Componentes Chave:
- `StepWorkspace`: Contentor principal da etapa.
- `LearningNavigator`: Menu lateral inteligente.
- `ToolCard`, `KnowledgePanel`, `PromptPanel`, `ChecklistPanel`, `ReviewPanel`: Blocos modulares.

### Estrutura
- **Cabeçalho Local**: Contém o Título da Etapa, Tempo Estimado, Competência, Resultado Esperado e Dificuldade.
- **Learning Navigator**: Navegação lateral *sticky* com uma sequência pedagógica clara: `Resumo → Knowledge → Prompt → Checklist → Review → Ferramentas → Exemplos → Artefacto → Próxima Etapa`.
- **Cartões de Ferramentas**: Destaque explícito para as finalidades da ferramenta com a secção "Ideal para" (ex: `✓ Brainstorm`, `✗ Pesquisa`).

---

## 6. UX Success Criteria & Critérios de Aceitação (Fase 2)
A implementação desta RFC será considerada concluída e bem-sucedida quando cumprir os seguintes critérios de aceitação:
1. O Dashboard suportar naturalmente dezenas de projetos sem provocar fadiga de scroll.
2. O utilizador conseguir localizar qualquer projeto em poucos segundos utilizando pesquisa, filtros ou ordenação.
3. O **Protocol Overview** responder claramente às quatro perguntas essenciais do investigador: que protocolo é, onde está, quanto falta e quais os recursos disponíveis.
4. A **Semantic Timeline** representar corretamente o estado das etapas e os ativos disponíveis, utilizando apenas metadados do protocolo (evitando lógicas específicas por protocolo).
5. O **Learning Navigator** for construído dinamicamente a partir dos ativos efetivamente presentes em cada etapa.
6. O **Step Workspace** renderizar a estrutura do SLO de forma consistente, independentemente do protocolo utilizado (via `renderSLO()`).
7. O conceito de certificação do SLO estiver refletido tanto na documentação (54 e 55) como na organização da interface.
8. Nenhuma regra de negócio, base de armazenamento ou Workflow Engine sofrer alterações fundamentais.

---

## 7. Future Ready (Roadmap Components)
*Nota: Não fazem parte desta RFC, mas o design e o código devem prever o seu enquadramento futuro.*
- `CalendarWidget`: Calendário de milestones.
- `NotificationCenter`: Alertas de revisão/submissão.
- `AgendaWidget`: Planeamento de tarefas.
- `ActivityFeed`: Registo de edições passadas e checkpoints.
