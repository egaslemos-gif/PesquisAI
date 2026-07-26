# Design System v1.0

Este documento atua como o Single Source of Truth (SSOT) para toda a interface do **Guia do Investigador**. Todas as adições à plataforma devem seguir rigorosamente estes padrões, para evitar entropia visual.

## 1. Design Tokens

### 1.1 Paleta de Cores (Colors)
Devemos usar apenas estas variáveis CSS, sem hardcodes no código:
- **Primary**: `var(--color-primary-600)` (Principal), `var(--color-primary-50)` (Fundo)
- **Secondary**: `var(--color-gray-600)`, `var(--color-gray-50)`
- **Success**: `var(--color-success)` (Verde), `var(--color-success-light)` (Fundo)
- **Error / Danger**: `var(--color-error-600)` (Vermelho), `var(--color-error-50)` (Fundo)
- **Warning**: `var(--color-warning)` (Amarelo/Laranja)
- **Info**: `var(--color-info)` (Azul claro de sistema)
- **Surface**: `var(--color-white)` e `var(--color-gray-50)`
- **Border**: `var(--color-gray-200)`

### 1.2 Espaçamento (Spacing)
- **XS**: `0.25rem` (4px)
- **SM**: `0.5rem` (8px)
- **MD**: `1rem` (16px) - *Espaçamento padrão entre secções internas de um painel*
- **LG**: `1.5rem` (24px)
- **XL**: `2rem` (32px) - *Margem padrão entre painéis (reduzido para 1rem no UI Polish)*

### 1.3 Tipografia
- **Font-Family**: Sans-serif principal do sistema (`Inter`, `system-ui`). Para blocos de código/prompt usar estritamente `monospace`.
- **Hierarquia**:
  - `H1`: 2rem (Títulos de página/Workflow)
  - `H2`: 1.5rem (Títulos de secção principais)
  - `H3`: 1.25rem (Títulos dos painéis)
  - `Body`: 1rem (Texto geral de leitura)
  - `Small`: 0.85rem (Metadados, contadores, *timestamps*)

### 1.4 Sombras & Radius
- **Radius**: `var(--radius-md)` (padrão) e `var(--radius-lg)` (painéis principais).
- **Shadow**: `var(--shadow-sm)` para *hover states*, sem sombras agressivas nos componentes estruturais (`box-shadow: none` em áreas de leitura fluidas).

## 2. Component Library Oficial

Qualquer funcionalidade nova só pode ser construída usando blocos já definidos aqui:

### 2.1 Botões (Buttons)
Apenas 4 variantes existem:
1. `BTN-PRIMARY`: Fundo sólido (Primary-600), texto branco. Ação principal.
2. `BTN-SECONDARY`: Fundo branco, borda cinza, texto cinza escuro. Ação alternativa ou "Voltar".
3. `BTN-GHOST`: Sem fundo, sem borda, revela um fundo leve no *hover*.
4. `BTN-DISABLED`: Opacidade 0.5, cursor *not-allowed*. Fundo e cor acinzentados.

### 2.2 Badges & Status
Badges devem ser curtos, estilo GitHub:
- `[Disponível]`: Verde/Success
- `[Em breve]`: Cinzento claro (Secondary)
- `[Experimental]`: Amarelo (Warning)

### 2.3 Painéis (Panels)
Elementos estruturais. Devem ter um `header` (com ícone Lucide SVG + título) e o corpo.
- **Reading Panels**: `max-width: 900px`
- **Production Panels**: `width: 100%`

### 2.4 Inputs & Textareas
- **Textarea de Produção (Artefacto)**: Deve prever uma `min-height: 40vh` para garantir presença.
- **Bordas**: `1px solid var(--color-gray-300)`, passando a `var(--color-primary-500)` no estado `:focus`.

### 2.5 Tooltips & Toasts
- **Toasts**: Notificações temporárias (3-5 segundos) não bloqueantes no canto da janela (ex: *✓ Rascunho guardado*).
- **Tooltips**: Surgem no *hover* após 300ms. Utilizados extensamente em elementos `Disabled` para justificar a inação.

### 2.6 Outros Componentes Específicos
- **Timeline**: Variante visual de passos com estados de progresso (`✓`, `●`, `○`).
- **Navigator**: Sidebar estilo "TOC" fixo (`280px`), com indicador visual animado para o *step* ativo.
- **Empty States**: Ilustração simples (ou ícone), com título explicativo curto e descrição construtiva (nunca apenas "0").
- **Skeletons**: Formas cinzentas (`background-color: var(--color-gray-100)`) animadas em *pulse* para carregar informação pesada.

## 3. Estados Globais
Todos os componentes que dependem de estado, rede ou progresso humano devem mapear pelo menos estes modos:
- `EMPTY`: Nenhum dado. Exibir *Empty State*.
- `LOADING`: A processar. Exibir *Skeleton* ou spinner sutil.
- `SUCCESS`: Concluído.
- `ERROR`: Ação falhou. Exibir mensagem em `var(--color-error-600)`.
- `WARNING`: Atenção necessária.
- `DISABLED`: Interação bloqueada momentaneamente.
- `COMING SOON`: Previsto no roadmap, desativado no momento.

*Nota: Todas as interações devem ter suporte total para navegação por teclado (Tab) e leitores de ecrã básicos (ARIA).*
