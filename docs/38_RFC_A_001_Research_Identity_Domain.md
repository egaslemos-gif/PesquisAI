# RFC-A-001 — Research Identity Domain

## Contexto
Até à RC1.0.1, o Guia do Investigador consolidou um ambiente funcional e metodológico, estabilizando o uso de Protocolos, Bibliotecas de Prompts, Workspaces e Captura de Artefactos. Contudo, o contexto da aplicação esteve sempre circunscrito ao _Workspace atual_.

A partir da RC2, introduzimos um novo domínio raiz: o **Research Identity (RID)**.

## Missão
O RID **não** é um sistema de autenticação, perfil de utilizador logado ou serviço de backend. Representa a **identidade local e persistente** de um investigador dentro do navegador, agindo como a raiz da qual brotam todos os workspaces e métricas de aprendizagem.

## Visão Arquitectural
A transição arquitetural inverte a hierarquia de posse da sessão:

**ANTES:**
`Workspace` → `Protocolo` → `Artefactos`

**DEPOIS (RC2):**
`Research Identity` → `Research Profile` → `Workspace Registry` → `Protocol Registry` → `Artifact Registry` → `Learning Record` → `Future Cloud Sync`

## Princípios (Regra Zero)
**Regra Zero:**
Não alterar os motores existentes (`Engine`, `Workflow Engine`, `Protocolos`, `Prompt Engine`, `EventBus`, `StepView`, `ProgressView`, `Biblioteca`). Toda a implementação decorre num domínio novo (`src/js/core/researchIdentity.js`) que interage por observação (eventos).

- **Offline First**: A base continua 100% focada no armazenamento em navegador.
- **Privacy First / No Login / No Cookies / No Backend**: Os dados pertencem ao investigador e residem apenas no LocalStorage.
- **Preparação de Futuro**: A arquitetura prevê pontos de acoplamento limpos para futuras extensões (Google Drive, Sheets, Analytics).

## Critérios de Aceitação Base
- RID gerado automaticamente (ex: `RID-MZ-84A92F`) e persistente.
- Utilizador recebido no Dashboard com a última atividade e histórico de Workspaces.
- Learning Record alimentado em background.
- Componentes base RC1.0.1 não quebram.
