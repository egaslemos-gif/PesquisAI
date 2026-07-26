# Research Identity (RID) Sequence Diagram

Este documento mapeia os fluxos essenciais de como o domínio RID escuta, interage e se atualiza de forma não-intrusiva face à aplicação.

## 1. Primeira Abertura da Aplicação (Geração do RID)

```mermaid
sequenceDiagram
    participant Browser
    participant AppShell
    participant EventBus
    participant RID_Domain
    participant LocalStorage

    Browser->>AppShell: Abre a página (index.html)
    AppShell->>EventBus: Regista listeners
    AppShell->>RID_Domain: Inicia módulo
    RID_Domain->>LocalStorage: Ler `research.identity`
    LocalStorage-->>RID_Domain: null (Não existe)
    RID_Domain->>RID_Domain: Gera ID (crypto.randomUUID())
    RID_Domain->>RID_Domain: Cria estrutura base (profile, workspaces)
    RID_Domain->>LocalStorage: Escreve `research.identity`
    RID_Domain->>AppShell: Notifica prontidão do RID (ID: RID-MZ-...)
    AppShell->>AppShell: Atualiza Header com ID
    AppShell->>AppShell: Renderiza Dashboard / Empty State (Bem-vindo)
```

## 2. Início de uma Nova Investigação (Workspace)

```mermaid
sequenceDiagram
    participant User
    participant Workspace
    participant EventBus
    participant RID_Domain
    participant LocalStorage

    User->>Workspace: Define "Área Científica" e clica "Começar"
    Workspace->>Workspace: Gera proj_ID e guarda estado
    Workspace->>EventBus: emit('workspace:updated')
    EventBus->>RID_Domain: (Listener) Interceta atualização
    RID_Domain->>RID_Domain: Verifica se `workspaceId` existe no Registry
    RID_Domain->>RID_Domain: (Se não existir) Regista novo workspace
    RID_Domain->>RID_Domain: Incrementa `learningRecord.totalProtocolsStarted`
    RID_Domain->>LocalStorage: Escreve `research.identity`
```

## 3. Gravação de um Artefacto Científico (Atividade)

```mermaid
sequenceDiagram
    participant User
    participant Workspace
    participant EventBus
    participant RID_Domain
    participant LocalStorage

    User->>Workspace: Preenche textarea e avança (saveArtifact)
    Workspace->>LocalStorage: Escreve `rg_workspace` (dados reais)
    Workspace->>EventBus: emit('artifact:saved')
    EventBus->>RID_Domain: (Listener) Interceta gravação
    RID_Domain->>RID_Domain: Atualiza `workspaces[ID].updatedAt = now`
    RID_Domain->>RID_Domain: Atualiza `lastActivity` global
    RID_Domain->>RID_Domain: Incrementa `learningRecord.totalArtifacts`
    RID_Domain->>LocalStorage: Escreve `research.identity`
```

## 4. Reabertura e Retoma (Abertura com Histórico)

```mermaid
sequenceDiagram
    participant Browser
    participant AppShell
    participant Engine
    participant RID_Domain
    participant LocalStorage

    Browser->>AppShell: Abre a página
    AppShell->>RID_Domain: Inicia módulo
    RID_Domain->>LocalStorage: Ler `research.identity`
    LocalStorage-->>RID_Domain: Objeto RID completo
    RID_Domain->>RID_Domain: Atualiza `profile.lastVisit`, incrementa `totalSessions`
    RID_Domain->>LocalStorage: Escreve `research.identity`
    AppShell->>Engine: INIT
    Engine->>AppShell: Renderiza EMPTY view
    AppShell->>RID_Domain: Pede 5 últimos workspaces
    RID_Domain-->>AppShell: Devolve array ordenado por `updatedAt`
    AppShell->>AppShell: Renderiza "Última Atividade" / "Minha Investigação"
```
