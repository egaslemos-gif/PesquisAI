# RFC-028 — Product Release Checklist

Este documento define a grelha de validação rigorosa (Quality Assurance) que qualquer Release Candidate (RC) deve passar antes de ser considerada estável e pronta para produção. O objetivo não é validar funcionalidades individuais, mas sim a integridade e maturidade arquitetural do Sistema Operativo para Investigação.

## 1. Desacoplamento e Arquitetura (Core)
- [ ] **Core Desacoplado:** O Core Engine (Workspace, EventBus, Rendering, Export) funciona independentemente do Módulo.
- [ ] **Sem Hardcoding:** Nenhuma instrução do tipo `if (workflow === 'WF-INV')` existe no Core Engine ou componentes de UI genéricos.
- [ ] **Componentes Reutilizados:** Todos os painéis (Prompt, Knowledge, Checklist, Artifact) são injetados dinamicamente e não existem painéis duplicados (ex: `SupervisorPromptPanel`).
- [ ] **Assets Separados:** Os dados dos workflows estão organizados e isolados nos seus próprios diretórios/namespaces (ex: `assets/WF-INV`, `assets/WF-SUP`).

## 2. Consistência Visual (UI/UX)
- [ ] **Consistência Visual (Componentes):** Layout, tipografia, cores e espaçamentos dos botões e painéis são imutáveis e consistentes em todos os módulos.
- [ ] **Estados da UI:** Comportamento consistente para estados como *hover*, *disabled* e *loading* transversal a toda a aplicação.
- [ ] **Acessibilidade Mínima:** Contraste adequado (ex: títulos em modais) e legibilidade garantida nos vários dispositivos.
- [ ] **Desktop Validado:** A disposição (Grid, sidebars) funciona sem quebras visuais em ecrãs largos.
- [ ] **Mobile Validado:** O layout em telemóveis oculta adequadamente a barra lateral, exibe menus condensados e garante que nenhum texto transborda o ecrã.

## 3. Integridade dos Fluxos (Fim-a-Fim)
- [ ] **Centro de Competências Validado:** O botão "Explorar" de qualquer módulo transitável inicia com sucesso a criação de projeto com a metodologia respetiva pré-selecionada.
- [ ] **Workflow Validado:** O carregamento da *timeline*, a renderização dinâmica dos ecrãs de etapa e a progressão funcionam sem erros.
- [ ] **Resource Hub Validado:** O painel de Ferramentas de IA é capaz de filtrar e apresentar modelos/recursos com base no perfil do projeto atual (ex: investigador vs. supervisor).
- [ ] **Exportação Validada:** O ExportService agrupa todos os artefactos produzidos e compila o documento final (`.docx`) com formatação correta sem necessitar de conhecer antecipadamente o Workflow ID.

## 4. Performance e Fiabilidade
- [ ] **Performance Validada:** Tempo de abertura da aplicação, tempo de transição entre etapas e tempo de criação de projeto medidos e dentro do standard (< 1 segundo).
- [ ] **Gestão de Estado (Workspace):** Persistência de dados assegurada no LocalStorage sem corrupção quando se alternam projetos de workflows diferentes.
- [ ] **Documentação Atualizada:** Todos os RFCs e Manuais Internos (ex: *Research Module Development Standard*) refletem a arquitetura atualizada em produção.
