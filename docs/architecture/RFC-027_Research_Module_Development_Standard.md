# RFC-027 — Research Module Development Standard (SDK)

## 1. Visão Geral (Paradigma do Sistema Operativo)
A plataforma evoluiu de uma simples "Aplicação para Revisão da Literatura" para um verdadeiro **Sistema Operativo para Competências de Investigação**.
Neste ecossistema, o *Core Engine* (o motor principal) é único e imutável. Novos processos académicos (ex: Metodologia Científica, Análise de Dados) não exigem reengenharia da aplicação, sendo adicionados puramente como **Módulos de Configuração**.

### 1.1. Arquitetura em Estrela
                 Centro de Competências (Launcher)
                               │
            ┌──────────────────┴──────────────────┐
            │                                     │
            ▼                                     ▼
     Guia do Investigador                Guia do Supervisor
           (WF-INV)                           (WF-SUP)
            │                                     │
            └──────────────────┬──────────────────┘
                               ▼
                          Core Engine
          (Workspace, Panels, Assets, Resource Hub, 
           Export, Timeline, Prompt Engine, Validation)

## 2. Validação da Reutilização de Componentes
Qualquer módulo aprovado herda nativamente a interface (UI) e a infraestrutura de dados da plataforma:

1. **Painéis Reutilizáveis (Zero Duplicação):**
   * **NÃO** existem `SupervisorPromptPanel` ou `InvestigatorPromptPanel`.
   * Existe apenas o `PromptPanel`, que recebe o array de prompts do `Core Engine` consoante a Etapa atual do Workflow em execução. O mesmo princípio aplica-se ao `KnowledgePanel`, `ChecklistPanel` e `ArtifactPanel`.
2. **Separação de Assets (Estrutura Física):**
   * Os dados de cada workflow devem estar logicamente encapsulados no seu respetivo namespace: `WF-INV-*` ou `WF-SUP-*`.
   * No futuro, para maximizar o isolamento, a estrutura evoluirá para diretórios modulares (ex: `src/data/workflows/WF-INV/`, `src/data/workflows/WF-SUP/`).
3. **Resource Hub Dinâmico:**
   * O Hub de Recursos passa a injetar dinamicamente o contexto. Recebe um parâmetro de perfil (`profile: 'investigator' | 'supervisor'`) e renderiza apenas o que interessa a esse contexto, a partir da mesma base de dados de ferramentas e modelos.

## 3. Especificação do Módulo (O "Contrato")
Para que um novo Módulo (ex: *Projeto de Investigação*) seja aceite pelo Sistema Operativo, deve fornecer o seguinte modelo (JSON/JS) preenchido:

### 3.1. Competency Card (O Launcher)
Deve ser registado em `competencies.js`.
* `id`, `title`, `description`
* `route`: `workflow:WF-XXX` (Gatilho para o AppShell instanciar o Workflow)
* `status`: `available`

### 3.2. Workflow Definition (`workflows.js`)
* `id`: O identificador do fluxo (ex: `WF-PRJ`).
* `title` & `description`.
* `steps`: Array de Etapas (A timeline e a barra lateral são renderizadas automaticamente a partir daqui). Cada etapa exige:
  * `id`, `name`, `focus`
  * `knowledge`: Referências ao ID do módulo educacional.
  * `prompts`: Array com os IDs dos Prompts daquela etapa.
  * `checklist`: Array com os IDs dos itens de verificação.
  * `tools`: Array com os IDs das ferramentas.
  * `outcomes`: A lista de Artefactos gerados pela etapa.

### 3.3. Prompts (`prompts.js`)
* Uma lista injetável de Prompts (ex: `PT-PRJ-001`), contendo:
  * `title`, `description`, `prompt` (A instrução direta à IA).
* O `PromptPanel` consome esta estrutura de forma padronizada.

### 3.4. Checklists (`checklists.js`)
* Matriz de critérios de avaliação (`CH-PRJ-001`), contendo:
  * `category` e array de `items` booleanos.
* O `ChecklistPanel` calcula estatísticas e percentagens automaticamente.

### 3.5. Knowledge / Education Cards (`knowledge.js`)
* Cartões modulares de aprendizagem (`KN-PRJ-001`).
  * `title`, `concept` (O que vai aprender), `bestPractices` (Boas Práticas).

### 3.6. Ferramentas e Artefactos
* **Ferramentas:** Mapeadas em `tools.js` (Modelos LLM e utilitários sugeridos).
* **Artefactos:** A interface do `ArtifactPanel` possui um Editor central. O motor apenas carrega o template e a área de texto associados ao `outcome` da Etapa corrente.

## 4. Padronização Visual e de Comportamento (Standardization Sprint)
Antes de criar o próximo módulo, a consistência de UI é a Lei:
* **Prompts:** Layout imutável (Título bold, badge descritivo, botão "Copiar Prompt" primário no canto).
* **Knowledge:** Sempre com separadores de "Conceito" e "Boas Práticas" e blocos de info.
* **Checklist:** Checkboxes interativas que sincronizam com o estado global da etapa (`rgWorkspace`).
* **Exportação:** O Serviço (`ExportService.js`) deve ser agnóstico, exportando todos os `outcomes` preenchidos no `workspace` iterando as chaves.

## 5. Próximos Passos (Aprovação)
Com a aprovação desta RFC, a Plataforma encerra a fase de "prototipagem de fluxos" e entra num ciclo de "integração horizontal":
1. Trancar o Core Engine (refatoração focada em estabilidade, não em features visuais novas).
2. Garantir que as lógicas do AppShell (`startNewProject`), ProjectExplorer, Workspace e Exportação sejam 100% abstractas a qual `WF-*` está carregado.
## 6. O Módulo deve ser auto-descritivo (Regra 8)
Cada módulo deve conter um ficheiro `module.json` (ou equivalente) com os seus metadados, assets, workflow, perfil (`role`) e dependências. O Core Engine deve descobrir e carregar módulos através desse manifesto, em vez de conhecer hardcoded nomes como WF-INV ou WF-SUP. Este manifesto torna a plataforma verdadeiramente um "Sistema Operativo".
