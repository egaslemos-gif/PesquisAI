# 24 — Visual Design System

Sistema de design visual completo. Define todos os tokens (cores, tipografia, espaçamento) e a aparência de cada componente. Este documento garante consistência visual em toda a aplicação.

---

## 1. Paleta de Cores

### Cores Primárias

| Token | Hex | HSL | Uso |
| :--- | :--- | :--- | :--- |
| `--color-primary-50` | `#EEF2FF` | 226, 100%, 97% | Fundos subtis |
| `--color-primary-100` | `#E0E7FF` | 226, 100%, 94% | Hover em fundos |
| `--color-primary-200` | `#C7D2FE` | 226, 97%, 89% | Bordas |
| `--color-primary-300` | `#A5B4FC` | 226, 95%, 82% | Ícones secundários |
| `--color-primary-400` | `#818CF8` | 235, 90%, 74% | Elementos interativos |
| `--color-primary-500` | `#6366F1` | 239, 84%, 67% | **Cor principal** — botões, links, destaques |
| `--color-primary-600` | `#4F46E5` | 243, 75%, 59% | Hover em botões |
| `--color-primary-700` | `#4338CA` | 243, 57%, 51% | Botões pressionados |
| `--color-primary-800` | `#3730A3` | 243, 50%, 42% | Texto sobre fundo claro |
| `--color-primary-900` | `#312E81` | 242, 47%, 34% | Texto de destaque |

### Cores Semânticas

| Token | Hex | Uso |
| :--- | :--- | :--- |
| `--color-success` | `#10B981` | Confirmações, etapas concluídas, toasts de sucesso |
| `--color-success-light` | `#D1FAE5` | Fundo de sucesso |
| `--color-warning` | `#F59E0B` | Avisos, checklists incompletas |
| `--color-warning-light` | `#FEF3C7` | Fundo de aviso |
| `--color-error` | `#EF4444` | Erros, campos obrigatórios |
| `--color-error-light` | `#FEE2E2` | Fundo de erro |
| `--color-info` | `#3B82F6` | Informação, dicas |
| `--color-info-light` | `#DBEAFE` | Fundo informativo |

### Cores Neutras

| Token | Hex | Uso |
| :--- | :--- | :--- |
| `--color-gray-50` | `#F9FAFB` | Fundo da página |
| `--color-gray-100` | `#F3F4F6` | Fundo de cards |
| `--color-gray-200` | `#E5E7EB` | Bordas e separadores |
| `--color-gray-300` | `#D1D5DB` | Bordas de inputs |
| `--color-gray-400` | `#9CA3AF` | Placeholders, texto terciário |
| `--color-gray-500` | `#6B7280` | Texto secundário |
| `--color-gray-600` | `#4B5563` | Texto body |
| `--color-gray-700` | `#374151` | Títulos de secções |
| `--color-gray-800` | `#1F2937` | Títulos principais |
| `--color-gray-900` | `#111827` | Texto de máximo contraste |
| `--color-white` | `#FFFFFF` | Fundo de cards e inputs |

---

## 2. Tipografia

**Fonte principal:** `Inter` (Google Fonts)  
**Fonte alternativa (fallback):** `system-ui, -apple-system, sans-serif`

### Escala Tipográfica

| Token | Tamanho | Peso | Line-height | Uso |
| :--- | :--- | :--- | :--- | :--- |
| `--text-xs` | 12px / 0.75rem | 400 | 1.5 | Badges, metadados |
| `--text-sm` | 14px / 0.875rem | 400 | 1.5 | Texto auxiliar, checklists |
| `--text-base` | 16px / 1rem | 400 | 1.6 | Texto corpo principal |
| `--text-lg` | 18px / 1.125rem | 500 | 1.5 | Subtítulos de secções |
| `--text-xl` | 20px / 1.25rem | 600 | 1.4 | Títulos de cards |
| `--text-2xl` | 24px / 1.5rem | 700 | 1.3 | Título da etapa |
| `--text-3xl` | 30px / 1.875rem | 700 | 1.2 | Título da página |
| `--text-4xl` | 36px / 2.25rem | 800 | 1.1 | Hero (Empty State) |

---

## 3. Espaçamento

Sistema baseado em múltiplos de 4px.

| Token | Valor | Uso típico |
| :--- | :--- | :--- |
| `--space-1` | 4px | Gaps mínimos |
| `--space-2` | 8px | Espaço entre ícone e texto |
| `--space-3` | 12px | Padding interno de badges |
| `--space-4` | 16px | Padding interno de botões |
| `--space-5` | 20px | Gap entre itens de lista |
| `--space-6` | 24px | Padding interno de cards |
| `--space-8` | 32px | Margem entre secções |
| `--space-10` | 40px | Margem entre blocos principais |
| `--space-12` | 48px | Margem vertical de secções |
| `--space-16` | 64px | Espaço grande (hero) |

---

## 4. Bordas e Cantos

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--radius-sm` | 6px | Badges, tooltips |
| `--radius-md` | 8px | Botões, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modais, cards grandes |
| `--radius-full` | 9999px | Pontos da progress bar, avatares |
| `--border-width` | 1px | Bordas padrão |
| `--border-color` | `var(--color-gray-200)` | Cor padrão das bordas |

---

## 5. Sombras

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Botões, badges |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.10)` | Cards em hover, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.12)` | Modais |

---

## 6. Componentes — Especificação Visual

### Botão Primário

```
┌─────────────────────────┐
│   Guardar e Avançar ▶   │
└─────────────────────────┘
```

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-primary-500` |
| Texto | `--color-white` |
| Peso do texto | 600 |
| Tamanho do texto | `--text-base` |
| Padding | `--space-3` vertical, `--space-6` horizontal |
| Border-radius | `--radius-md` |
| Sombra | `--shadow-sm` |
| Hover | Fundo → `--color-primary-600`, Sombra → `--shadow-md` |
| Active | Fundo → `--color-primary-700`, Sombra → nenhuma |
| Disabled | Opacidade 0.5, cursor `not-allowed` |
| Transição | `all 150ms ease-out` |

### Botão Secundário

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-white` |
| Texto | `--color-gray-700` |
| Borda | 1px solid `--color-gray-300` |
| Hover | Fundo → `--color-gray-50`, Borda → `--color-gray-400` |

### Botão Copiar

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-gray-100` |
| Texto | `--color-gray-600` |
| Ícone | 📋 (antes) → ✓ (depois, verde) |
| Hover | Fundo → `--color-primary-50`, Texto → `--color-primary-600` |

---

### Card (Genérico)

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-white` |
| Borda | 1px solid `--color-gray-200` |
| Border-radius | `--radius-lg` |
| Padding | `--space-6` |
| Sombra | `--shadow-md` |
| Margem inferior | `--space-6` |

### Step Card — Título

| Propriedade | Valor |
| :--- | :--- |
| Fundo do header | Gradiente: `--color-primary-500` → `--color-primary-600` |
| Texto | `--color-white` |
| Tamanho | `--text-2xl` |
| Padding | `--space-6` |
| Border-radius (topo) | `--radius-lg` |

### Tool Card

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-gray-50` |
| Borda | 1px solid `--color-gray-200` |
| Border-radius | `--radius-md` |
| Hover | Translate Y: -2px, Sombra → `--shadow-lg` |
| Link externo | `--color-primary-500`, ícone ↗ |

### Prompt Card

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-gray-900` (tema escuro para contraste) |
| Texto | `--color-gray-100` |
| Fonte do prompt | `monospace` (ou `JetBrains Mono`), `--text-sm` |
| Border-radius | `--radius-lg` |
| Padding | `--space-6` |
| Variáveis `{{}}` | Cor `--color-primary-300`, peso 600 |

### Artifact Card (Modo Edição)

| Propriedade | Valor |
| :--- | :--- |
| Textarea — Fundo | `--color-white` |
| Textarea — Borda | 2px solid `--color-gray-300` |
| Textarea — Focus | Borda → `--color-primary-400`, Sombra → `0 0 0 3px var(--color-primary-100)` |
| Textarea — Min-height | 200px |
| Textarea — Font | `--text-base`, line-height 1.6 |
| Label "Resultado Esperado" | `--text-sm`, `--color-gray-500`, itálico |

### Artifact Card (Modo Leitura)

| Propriedade | Valor |
| :--- | :--- |
| Fundo | `--color-gray-50` |
| Borda | 1px solid `--color-gray-200` |
| Texto | `--color-gray-700` |
| Badge "Guardado" | `--color-success-light` fundo, `--color-success` texto |

---

### Progress Bar

| Propriedade | Valor |
| :--- | :--- |
| Fundo da barra | `--color-gray-200` |
| Ponto — Locked | `--color-gray-300`, 12px diâmetro |
| Ponto — Pending | `--color-gray-400`, 12px |
| Ponto — In Progress | `--color-primary-500`, 14px, pulso suave (animação) |
| Ponto — Completed | `--color-success`, 12px, ícone ✓ interno |
| Linha entre pontos | 2px, cor muda com estado |
| Cursor em Completed | `pointer` |
| Cursor em Locked | `not-allowed` |

---

### Checklist

| Propriedade | Valor |
| :--- | :--- |
| Checkbox unchecked | Borda `--color-gray-300`, fundo `--color-white` |
| Checkbox checked | Fundo `--color-primary-500`, ✓ branco |
| Texto unchecked | `--color-gray-700` |
| Texto checked | `--color-gray-400`, ligeiro riscado ou opacidade reduzida |
| Contagem | `--text-sm`, `--color-gray-500` |

---

### Toast

| Propriedade | Sucesso | Aviso | Informação |
| :--- | :--- | :--- | :--- |
| Fundo | `--color-success-light` | `--color-warning-light` | `--color-info-light` |
| Borda esquerda | 4px `--color-success` | 4px `--color-warning` | 4px `--color-info` |
| Ícone | ✓ | ⚠ | ℹ |
| Texto | `--color-gray-800` | `--color-gray-800` | `--color-gray-800` |
| Posição | Canto inferior direito | Idem | Idem |
| Border-radius | `--radius-md` | Idem | Idem |
| Sombra | `--shadow-lg` | Idem | Idem |

---

### Modal

| Propriedade | Valor |
| :--- | :--- |
| Overlay | `rgba(0,0,0,0.5)` |
| Fundo do modal | `--color-white` |
| Border-radius | `--radius-xl` |
| Sombra | `--shadow-xl` |
| Largura máxima | 480px |
| Padding | `--space-8` |
| Título | `--text-xl`, `--color-gray-800` |
| Botão primário | Mesmo que Botão Primário |
| Botão cancelar | Mesmo que Botão Secundário |

---

### Badges de Estado

| Estado | Fundo | Texto | Border-radius |
| :--- | :--- | :--- | :--- |
| Concluída | `--color-success-light` | `--color-success` | `--radius-full` |
| Em curso | `--color-primary-50` | `--color-primary-600` | `--radius-full` |
| Pendente | `--color-gray-100` | `--color-gray-500` | `--radius-full` |
| Bloqueada | `--color-gray-100` | `--color-gray-400` | `--radius-full` |

---

## 7. Breakpoints (Responsividade)

| Token | Valor | Alvo |
| :--- | :--- | :--- |
| `--bp-mobile` | 375px | Smartphones |
| `--bp-tablet` | 768px | Tablets |
| `--bp-desktop` | 1024px | Desktop |
| `--bp-wide` | 1280px | Desktop largo |

### Regras de adaptação

| Breakpoint | Comportamento |
| :--- | :--- |
| < 768px | Layout single-column. Tool Cards empilham. Botões full-width. Progress Bar simplificada. |
| 768px–1024px | Layout com margens laterais. Cards mantêm max-width. |
| > 1024px | Layout centrado com max-width de 800px. Espaçamento completo. |

---

## 8. Animações e Transições (Tokens)

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--transition-fast` | `150ms ease-out` | Hover em botões |
| `--transition-normal` | `250ms ease-out` | Transições gerais |
| `--transition-slow` | `400ms ease-out` | Transições entre etapas |
| `--animation-pulse` | `2s ease-in-out infinite` | Ponto ativo na progress bar |

---

## 9. Ícones

A aplicação utiliza emojis nativos como ícones para simplicidade na v1.0:

| Contexto | Ícone |
| :--- | :--- |
| Investigador | 🔬 |
| Orientador | 🎓 |
| Ferramentas | 🔧 |
| Prompt | 💬 |
| Resultado | 📄 |
| Checklist | ✅ |
| Copiar | 📋 |
| Sucesso | ✓ |
| Aviso | ⚠ |
| Info | ℹ |
| Concluído | 🎉 |
| Exportar | 📥 |
| Editar | ✏️ |
| Link externo | ↗ |

> **Nota para v1.1+:** Migrar para uma biblioteca de ícones (ex: Lucide, Heroicons) para consistência e escalabilidade.
