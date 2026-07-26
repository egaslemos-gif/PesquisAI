# Research Identity (RID) Data Model

Este documento especifica a estrutura completa de dados do domínio `Research Identity` que será serializada e guardada no LocalStorage.

## Raiz: `ResearchIdentity`
A raiz do objeto representa o estado global e imutável da identidade.

```javascript
{
  "id": "RID-MZ-84F92A",         // Gerado via crypto.randomUUID() ou fallback UUID v4
  "createdAt": "2026-07-26T14:00:00.000Z",
  "lastActivity": "2026-07-26T16:00:00.000Z",
  "version": "1.0",
  "profile": {},
  "workspaces": {},
  "learningRecord": {}
}
```

## Nó: `profile`
Metadados evolutivos sobre o comportamento macro do utilizador na plataforma.

```javascript
{
  "firstVisit": "2026-07-26T14:00:00.000Z",
  "lastVisit": "2026-07-26T16:00:00.000Z",
  "totalSessions": 12,
  "preferredProtocol": "WF-INV",
  "preferredAIs": ["ChatGPT", "Claude"], // Reservado para uso futuro
  "totalArtifacts": 42,
  "completedProtocols": 1
}
```

## Nó: `workspaces` (Workspace Registry)
Um dicionário (ou array) que mapeia todos os projetos criados. **Importante:** Não armazena os conteúdos dos artefactos. Apenas a folha de rosto e o progresso.

```javascript
{
  "proj_1784980236876": {
    "workspaceId": "proj_1784980236876",
    "protocolId": "WF-INV",
    "title": "Ética Digital e IA na Educação",
    "createdAt": "2026-07-26T14:00:00.000Z",
    "updatedAt": "2026-07-26T16:00:00.000Z",
    "currentStep": "STEP-INV-06",
    "completed": false,
    "lastArtifact": "STEP-INV-06"
  },
  "proj_1785001111111": {
    "workspaceId": "proj_1785001111111",
    "protocolId": "WF-INV",
    "title": "Metodologia Científica Básica",
    "createdAt": "2026-07-27T09:00:00.000Z",
    "updatedAt": "2026-07-27T09:30:00.000Z",
    "currentStep": "STEP-INV-02",
    "completed": false,
    "lastArtifact": "STEP-INV-01"
  }
}
```

## Nó: `learningRecord`
Histórico de formação e aprendizagem passiva. Contadores essenciais para inferir a proficiência metodológica do utilizador.

```javascript
{
  "totalProtocolsStarted": 2,
  "totalProtocolsCompleted": 0,
  "totalArtifacts": 7,
  "totalPromptCopies": 15,
  "totalSessions": 12,
  "averageSessionTime": 0 // Em segundos (RC2 future phase)
}
```
