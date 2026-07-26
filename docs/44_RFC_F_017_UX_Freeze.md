# RFC-F-017: UX Freeze & Design Tokens

## 1. Objetivo do Marco (UX Freeze)
Este documento formaliza o congelamento da interface de utilizador (UX/UI) do **Guia do Investigador** a partir da Release Candidate 3 (RC3).
O produto atingiu uma maturidade estrutural que contempla todos os fluxos de trabalho do investigador (Dashboard, Espaço de Trabalho, Workflow, Engine de Revisões, Gestão de Projetos, Arquivo, etc.).

A partir desta RFC, **nenhuma alteração estrutural na UX ou Layout deve ser introduzida** sem uma justificação funcional e metodológica robusta. O foco de desenvolvimento e de produto muda da "plataforma" para o **"conteúdo"** (Estratégias de Prompts, Protocolos Científicos adicionais e qualidade das orientações da IA).

## 2. Design Tokens (Identidade Visual Formal)

Para assegurar a coerência sem adicionar dependências, a aplicação adota os seguintes tokens de design implementados em variáveis CSS nativas:

### 2.1. Colors (Cores)
O esquema de cores deve manter o sentimento académico, confiável e limpo, sem recorrer a cores padrão genéricas, mas adotando escalas HSL (ou Hex customizado) harmoniosas:
- **Primary (Azul/Índigo - Foco & Ação):**
  - `--color-primary-50`: `#eff6ff` (Backgrounds ligeiros)
  - `--color-primary-500`: `#3b82f6` (Ativos principais)
  - `--color-primary-600`: `#2563eb` (Hovers de botões)
  - `--color-primary-800`: `#1e40af` (Textos escuros)
- **Grays (Neutros - Estrutura & Tipografia):**
  - `--color-gray-50` a `--color-gray-900`: Escala de cinzentos frios.
  - `--color-gray-800`: `#1f2937` (Cor principal de texto).
- **Semânticas (Review Engine & Status):**
  - `--color-success-600`: `#059669` (Verde - PASS)
  - `--color-warning-600`: `#d97706` (Laranja - WARNING)
  - `--color-error-600`: `#dc2626` (Vermelho - FAIL)

### 2.2. Typography (Tipografia)
A tipografia eleva a interface, distinguindo-a das configurações nativas do browser.
- **Font-Family:** `Inter`, sans-serif.
- **Font-Sizes:**
  - `--text-xs`: `0.75rem` (12px) - Metadados e badges
  - `--text-sm`: `0.875rem` (14px) - Labels secundários
  - `--text-base`: `1rem` (16px) - Texto normal e inputs
  - `--text-lg`: `1.125rem` (18px) - Títulos de cartões
  - `--text-xl`: `1.25rem` (20px) - Subtítulos
  - `--text-2xl` a `--text-4xl`: Cabeçalhos e Títulos Principais.

### 2.3. Spacing (Espaçamento)
A hierarquia é construída através de um sistema de espaçamento de múltiplos de 4px:
- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-6`: `24px`
- `--space-8`: `32px`

### 2.4. Components & States
- **Cartões (Cards):** Utilizam bordas suaves, fundo branco, padding regular (`--space-4` ou `--space-6`) e uma sombra subtil (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`). O limite lateral (border-left) indica o status do projeto.
- **Botões (Buttons):** Arredondados (`border-radius: 6px` ou `8px`), com estados de foco/hover explícitos. Não devem ser usados contornos nativos de inputs em foco, sendo substituídos por delineados a cor primária (`focus:ring`).
- **Modais:** Sobreposição fixa sobre fundo escurecido com blur (`backdrop-filter: blur(4px)`). Elevada sombra (`0 10px 25px rgba(0,0,0,0.2)`) e sempre centrados vertical e horizontalmente.

## 3. Comportamento e Estrutura Congelada (UX Freeze)

Qualquer alteração a estas estruturas implica um levantamento e quebra do UX Freeze, requerendo aprovação.

### 3.1. App Bar
- **Fixa e Persistente:** Sempre presente no topo.
- **Estrutura:** Logo à esquerda | Ações à direita.
- **Comandos Mínimos:** Botão `🏠 Projetos` (regresso contínuo), Barra/Botão de Pesquisa (Spotlight), e `Novo Projeto`.

### 3.2. Dashboard (Projetos)
- Dividido logicamente em:
  - **Projetos Ativos:** Uma lista visual que sumariza o estado atual do projeto (Protocolo, Etapa X de Y, Última Modificação, e Badge do Review Engine).
  - **Projetos Arquivados:** Seção inferior encapsulada (e.g. accordion HTML nativo `<details>`).
- O sumário quantitativo de estados metodológicos (ex: 🟢 X concluídos, 🔴 Y necessita revisão) está integrado no cabeçalho dos Projetos Ativos.

### 3.3. Menu Contextual (⋮)
- Ações globais dos projetos (Renomear, Duplicar, Exportar, Arquivar, Backup, Informações) agrupam-se **obrigatoriamente** num menu suspenso do tipo Dropdown.
- Botões não devem espalhar-se isoladamente pela face dos cartões (excetuando atalhos rápidos contextuais como Favoritos).
- A **eliminação absoluta** existe unicamente na lista de Projetos Arquivados e requer um Modal intermédio crítico.

## 4. Indicadores de Qualidade da Navegação (KPIs)

Nesta fase de maturidade, o produto passa a otimizar as métricas de tempo/clique:
- **Iniciar projeto:** < 2 cliques.
- **Continuar projeto:** 1 clique a partir do Dashboard.
- **Exportar artefactos:** 2 cliques (⋮ -> Exportar).
- **Pesquisar:** 1 atalho (Ctrl+K).

## Conclusão Estratégica
Com o congelamento da UX, a equipa compromete-se a não iterar em elementos cosméticos e de transição de domínios. A evolução recairá sobre o aumento dos Protocolos (ex: Protocolo de Metodologias Qualitativas, Revisões Sistemáticas) e refinamento do Review Engine.
