# 59 — Inventário de Interface (Zero Cognitive Friction)

Este documento centraliza a auditoria final da interface para a versão 1.0, garantindo o cumprimento do princípio **Zero Cognitive Friction**. Antes de congelarmos o Design System (P1.2), mapeamos os botões, ações e componentes para assegurar que apenas os elementos vitais e concluídos chegam ao utilizador.

## 1. Inventário de Botões

| Botão | Onde Existe? | Necessário? | Estado/Decisão |
| :--- | :--- | :---: | :--- |
| **Copiar Prompt** | `PromptPanel` | Sim | **Mantido** (Ação essencial do fluxo) |
| **Concluir e Avançar** | `NextStepPanel` | Sim | **Mantido** (Garante a progressão linear) |
| **Voltar** | `NextStepPanel` | Sim | **Mantido** (Navegação segura) |
| **Guardar Rascunho** | `ArtifactPanel`, `NextStepPanel` | Não | **Removido** (Substituído por AutoSave passivo) |
| **Estratégias (Guiado/etc)** | `PromptPanel` | Não | **Removido** (Complexidade prematura para v1.0) |
| **Editar** | `PromptPanel` | Não | **Removido** (Prompt é estático na plataforma) |
| **Executar IA** | `PromptPanel` | Não | **Removido** (Funcionalidade v2.0) |
| **Validar Etapa** | `NextStepPanel` | Não | **Removido** (Incompleto) |
| **Novo Projeto** | `Header` | Sim | **Em avaliação** (Pode migrar para Dashboard futuro) |

## 2. Inventário de Ações

| Ação | Tipo | Estado/Decisão |
| :--- | :--- | :--- |
| **AutoSave** | Automática | Implementada no background. Substitui necessidade de botão explícito. |
| **Navegação (ScrollSpy)** | Automática | Prevista para melhorar ergonomia sem cliques extra. |
| **Copiar para Clipboard** | Manual | Essencial. Gera feedback visual ("Copiado"). |
| **Revisão (Review)** | Automática | O painel mostrará a revisão sem necessidade de clique prévio. |
| **Progresso no Navigator** | Automática | Atualiza em tempo real com o estado da etapa atual. |

## 3. Inventário de Componentes

| Componente | Função Principal | Estado/Decisão |
| :--- | :--- | :--- |
| **Conhecimento Base** | O que preciso saber? | **Mantido** |
| **Prompt Recomendado** | O que devo perguntar? | **Mantido** |
| **Resultado da Etapa** | O que devo produzir? | **Mantido** |
| **Critérios de Sucesso** | Checklist de auto-verificação | **Mantido** |
| **Critérios de Revisão** | O sistema concorda? | **Mantido** |
| **Navegador Lateral** | Contexto e Progresso (TOC) | **Mantido** (Evoluir para Sticky + ScrollSpy) |
| **Timeline (ProtocolOverview)** | Visão Macro do Protocolo | **Mantido** (Evoluir para design mais compacto/minimalista no futuro) |

---
**Nota:** A aplicação deste inventário limpa efetivamente a interface de falsas promessas, e o próximo passo (Sprint P1.2) ditará as regras visuais apenas para os elementos classificados como "Mantidos".
