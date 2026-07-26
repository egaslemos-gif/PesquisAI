# 61 — Investigation Lifecycle

Este documento define a máquina de estados explícita do ciclo de vida de uma Investigação, separando completamente o "estado da investigação" do "estado dos dados/artefactos".

O motor (Engine) não deve inferir o estado da investigação verificando campos de dados (como `area`, `title` ou `artifacts`). Deve basear-se exclusivamente nestes estados explícitos e interpretar intenções de navegação.

## 1. Estados da Investigação (Investigation States)

| Estado | Descrição |
|---|---|
| **CREATING** | A investigação está no assistente de criação. A identidade (Título, Área, Protocolo) está a ser definida. Ainda não existe um Workspace instanciado. |
| **ACTIVE** | A investigação possui identidade e está a decorrer. O Workspace está instanciado e o investigador pode navegar pelas etapas do protocolo e guardar artefactos. |
| **COMPLETED** | O protocolo foi concluído e os resultados validados. A investigação está terminada mas os artefactos ainda são acedidos para exportação. |
| **ARCHIVED** | A investigação foi arquivada pelo investigador. Fica oculta no Dashboard e passa para leitura-apenas (read-only). |

---

## 2. Intenções e Eventos (Events / Navigation Intents)

| Evento | Origem Principal | Descrição |
|---|---|---|
| **NEW_PROJECT** | Dashboard / Menu Superior | Despoleta a transição para CREATING (abre o assistente). |
| **CREATE** | Assistente de Criação (Wizard) | Grava a identidade inicial e transita a investigação para ACTIVE. |
| **OPEN_PROJECT** | Dashboard (Cartão do Projeto) | Carrega uma investigação existente e abre-a no estado ACTIVE (ou COMPLETED se já terminada). |
| **GO_HOME** | Menu de Navegação (Breadcrumb) | Intenção de fechar a investigação atual na interface e voltar ao Dashboard (HOME). Não afeta o estado da investigação. |
| **SAVE** | Editor de Artefactos | Grava o conteúdo atual no Workspace (não muda o estado principal, avança a métrica de progresso). |
| **COMPLETE** | Última etapa do Protocolo | O investigador marcou o projeto como finalizado. Transita para COMPLETED. |
| **ARCHIVE** | Dashboard (Menu de Contexto) | Transita a investigação para ARCHIVED. |
| **RESTORE** | Dashboard (Lista de Arquivo) | Transita a investigação de ARCHIVED de volta para ACTIVE. |

---

## 3. Transições (State Transitions)

| Origem | Evento | Destino | Efeito Secundário |
|---|---|---|---|
| `HOME` | `NEW_PROJECT` | `CREATING` | Mostra Assistente Modal |
| `CREATING` | `CREATE` | `ACTIVE` | Instancia Workspace, gera ID, Regista no RID, Navega para a MAIN View |
| `ACTIVE` | `OPEN_PROJECT` | `ACTIVE` | Carrega Workspace na memória, Navega para a MAIN View |
| `ACTIVE` | `COMPLETE` | `COMPLETED` | Mostra Parabéns, Bloqueia Edição, Permite Exportação |
| `ACTIVE` | `ARCHIVE` | `ARCHIVED` | Esconde projeto da lista principal, Limpa Workspace da memória |
| `ARCHIVED` | `RESTORE` | `ACTIVE` | Coloca projeto na lista principal novamente |
| `*` | `GO_HOME` | `HOME` | Retorna o UI ao Dashboard e mantém projeto guardado. |

## Resumo Arquitetural

A implementação desta máquina de estados garante que **uma investigação nunca nasce sem identidade** e que **possui um ciclo de vida independente do seu conteúdo**. A lógica de domínio fica concentrada no Lifecycle, tornando as regras de negócio previsíveis, escaláveis e o UI independente das condições de dados.
