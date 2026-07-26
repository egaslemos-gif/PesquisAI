# RFC-R-001 — RC3 Milestone Review
### Domain Architecture Specification
### Guia do Investigador
### Version: RC3 Foundation
### Status: COMPLETED

---

## 1. Contexto Estratégico

A Release Candidate 3 (RC3) marca um ponto de viragem no desenvolvimento do *Guia do Investigador*. 
Até à RC2, o foco esteve estritamente no desenvolvimento da infraestrutura de base (Workflow Engine, LocalStorage, Workspace, Research Identity). Na RC3, iniciou-se o primeiro grande ciclo orientado à **Research Productivity**. 

O projeto conseguiu adicionar capacidades avançadas ao seu núcleo sem comprometer o *Design Freeze* (independência de APIs de IA externas) e sem introduzir excesso de domínios arquiteturais, provando a robustez das suas fundações.

---

## 2. Funcionalidades Concluídas (Core Cycle Complete)

O ciclo de trabalho end-to-end do investigador está agora validado:
`Landing -> Workspace -> Produção -> Revisão -> Persistência -> Pesquisa -> Continuação`

1. **Review Engine (Assistente Metodológico)**
   - Avaliação local de integridade estrutural.
   - Avaliação metodológica assistida via IA externa com 3 estados precisos de modelação do processo científico: `PASS`, `WARNING`, `FAIL`.
2. **Favoritos e Duplicação (Produtividade)**
   - Integração direta no Workspace Registry, permitindo clonar testes metodológicos (`duplicateWorkspace`) e destacar projetos ativos (`favorite`).
3. **Research Command Palette (Pesquisa)**
   - Interface Spotlight-like (Ctrl+K) com pesquisa intra-projeto imediata em memória (RAM), capaz de indexar os artefactos de investigação para acesso e salto rápido na árvore de protocolos.

---

## 3. Decisões Arquiteturais Consolidadas

1. **Congelamento da Arquitetura**
   - Confirmou-se que não é necessário a criação de um sexto domínio na aplicação para resolver problemas de produtividade. Todos os componentes (incluindo Favoritos, Duplicação, Revisões) foram contidos de forma harmoniosa no:
     - `Workflow`
     - `Workspace`
     - `Review Engine`
     - `Research Identity`
     - `Research Events`
2. **Abordagem Stateless para a UI de Pesquisa**
   - Decidiu-se não instanciar complexos motores de indexação. A leitura `Object.entries()` cruzada com o `Workspace Data` manteve o projeto rápido, simples e suficiente para a RC3.

---

## 4. Funcionalidades Adiadas e Limitações Assumidas

- **Research Intelligence / Dashboards**: Embora formalmente delineado, o motor de analítica e recolha de insights não é ainda bloqueante para a produtividade primária do Investigador e foi adiado para pós-RC3.
- **Validação Automática (API LLM)**: Para preservar a soberania sobre o produto, mantém-se a obrigatoriedade do modelo Híbrido, exigindo interação e validação por *copy-paste* na plataforma terceira.
- **Pesquisa Global**: A pesquisa foi circunscrita propositadamente a um escopo `intra-projeto`. Evitou-se o processamento e serialização paralela de múltiplos *workspaces* neste momento.

---

## 5. Indicadores de Sucesso (Sprint 2 - Exportação e Segurança)

O próximo ciclo orientar-se-á aos requisitos de tangibilidade e segurança de dados do investigador:

1. **Exportação de Artefactos (Word/PDF)**
   - Sucesso se: O Investigador conseguir transpor as reflexões modulares do Guia para um documento contínuo, pronto a submeter ou arquivar fisicamente.
2. **Backup Local**
   - Sucesso se: O Investigador conseguir descarregar a sua totalidade criptografada/json e recuperar as investigações entre navegadores diferentes sem perda de metadados (`Research Identity` unificada).
3. **Arquivo de Projetos**
   - Sucesso se: Projetos concluídos (ou não prioritários) puderem transitar da vista "Em Curso", desocupando a carga visual da plataforma sem se perder o seu histórico.
