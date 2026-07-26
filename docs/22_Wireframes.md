# 22 — Wireframes

Wireframes estruturais de todas as vistas da aplicação. Não é design — é estrutura e hierarquia de informação. Cada wireframe define a posição e o propósito de cada elemento.

---

## Vista 01 — Empty State (Primeiro Acesso)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│                    [LOGO]                         │
│                                                  │
│              ResearchAI Guide                    │
│                                                  │
│    Plataforma de orientação para investigação     │
│       académica assistida por IA                 │
│                                                  │
│                                                  │
│           ┌─────────────────────┐                │
│           │ Começar Novo Projeto│                │
│           └─────────────────────┘                │
│                                                  │
│                                                  │
│   "Cada etapa produz um artefacto verificável."  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Elementos:**
- Logo centrado.
- Nome da aplicação.
- Tagline descritiva (1–2 linhas).
- Botão CTA primário: "Começar Novo Projeto".
- Citação do manifesto (opcional, rotativa).

---

## Vista 02 — Workflow Selector

```
┌──────────────────────────────────────────────────┐
│  [LOGO]   ResearchAI Guide                      │
├──────────────────────────────────────────────────┤
│                                                  │
│         Escolha o seu percurso                   │
│                                                  │
│  ┌─────────────────────┐ ┌─────────────────────┐│
│  │    🔬               │ │    🎓               ││
│  │   INVESTIGADOR      │ │   ORIENTADOR        ││
│  │                     │ │                     ││
│  │   Siga um workflow  │ │   Avalie o trabalho ││
│  │   passo-a-passo     │ │   de um estudante   ││
│  │   para conduzir a   │ │   com critérios     ││
│  │   sua investigação. │ │   estruturados.     ││
│  │                     │ │                     ││
│  │   10 etapas         │ │   8 etapas          ││
│  │                     │ │                     ││
│  │   [Selecionar]      │ │   [Selecionar]      ││
│  └─────────────────────┘ └─────────────────────┘│
│                                                  │
└──────────────────────────────────────────────────┘
```

**Elementos:**
- Header com logo (fixo a partir daqui).
- Título: "Escolha o seu percurso".
- Dois cartões lado a lado (empilham em mobile).
- Cada cartão: ícone, nome, descrição breve, nº de etapas, botão.

---

## Vista 03 — Configuração Inicial (Área Científica)

```
┌──────────────────────────────────────────────────┐
│  [LOGO]   ResearchAI Guide                      │
├──────────────────────────────────────────────────┤
│                                                  │
│     Qual é a sua área científica?                │
│                                                  │
│     ┌──────────────────────────────────────┐     │
│     │  Ex: Educação, Saúde Pública, ...    │     │
│     └──────────────────────────────────────┘     │
│                                                  │
│     Pode também inserir um título para           │
│     o seu projeto (opcional):                    │
│                                                  │
│     ┌──────────────────────────────────────┐     │
│     │  Ex: Investigação sobre tecnologia   │     │
│     └──────────────────────────────────────┘     │
│                                                  │
│              ┌───────────────────┐               │
│              │    Iniciar ▶      │               │
│              └───────────────────┘               │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Elementos:**
- Campo de texto para a área científica (obrigatório).
- Campo de texto para o título do projeto (opcional).
- Botão "Iniciar" que cria o projeto e carrega a primeira etapa.

---

## Vista 04 — Etapa Ativa (Vista Principal do Workflow)

```
┌──────────────────────────────────────────────────┐
│  [LOGO]  ResearchAI Guide    [Investigador]      │
├──────────────────────────────────────────────────┤
│  ● ● ● ○ ○ ○ ○ ○ ○ ○         Etapa 3 de 10     │
│  ▲                                               │
│  Progresso                                       │
├──────────────────────────────────────────────────┤
│                                                  │
│  ╔══════════════════════════════════════════════╗ │
│  ║  ETAPA 03 — Definição de Objetivos          ║ │
│  ║                                              ║ │
│  ║  Defina um objetivo geral e objetivos        ║ │
│  ║  específicos alinhados com a pergunta        ║ │
│  ║  de investigação.                            ║ │
│  ╚══════════════════════════════════════════════╝ │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  🔧 FERRAMENTAS RECOMENDADAS                ││
│  │                                              ││
│  │  ┌──────────────┐  ┌──────────────┐         ││
│  │  │ ChatGPT      │  │ Claude       │         ││
│  │  │ Estruturação │  │ Estruturação │         ││
│  │  │ [Abrir ↗]    │  │ [Abrir ↗]    │         ││
│  │  └──────────────┘  └──────────────┘         ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  💬 PROMPT                                   ││
│  │                                              ││
│  │  Contexto da investigação:                   ││
│  │  - Área: Educação                            ││
│  │  - Tema: Impacto da tecnologia...            ││
│  │  - Pergunta: Qual é o efeito de...           ││
│  │                                              ││
│  │  Com base neste contexto, ajuda-me a         ││
│  │  definir os objetivos da investigação...     ││
│  │                                              ││
│  │              ┌──────────────┐                ││
│  │              │  📋 Copiar   │                ││
│  │              └──────────────┘                ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  📄 RESULTADO                                ││
│  │                                              ││
│  │  Resultado esperado: 1 objetivo geral +      ││
│  │  3-5 objetivos específicos com verbos de     ││
│  │  ação.                                       ││
│  │                                              ││
│  │  ┌──────────────────────────────────────┐    ││
│  │  │                                      │    ││
│  │  │  [Área de texto para colar/escrever  │    ││
│  │  │   o resultado obtido da IA]          │    ││
│  │  │                                      │    ││
│  │  │                                      │    ││
│  │  └──────────────────────────────────────┘    ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  ✅ CHECKLIST DE QUALIDADE                   ││
│  │                                              ││
│  │  ☐ O objetivo geral está alinhado com       ││
│  │    a pergunta?                               ││
│  │  ☐ Cada objetivo específico é mensurável?   ││
│  │  ☐ Os objetivos usam verbos de ação?        ││
│  │  ☐ O artefacto foi guardado?                ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────┐              ┌────────────────────┐│
│  │ ◀ Anterior│              │ Guardar e Avançar ▶││
│  └──────────┘              └────────────────────┘│
│                                                  │
└──────────────────────────────────────────────────┘
```

**Secções (de cima para baixo):**
1. **Header** — Logo, nome, workflow ativo.
2. **Progress Bar** — Indicador visual + "Etapa X de Y".
3. **Step Card** — Título, descrição e objetivo da etapa.
4. **Tool Cards** — Ferramentas com link externo.
5. **Prompt Card** — Prompt dinâmico + botão Copiar.
6. **Artifact Card** — Resultado esperado + textarea.
7. **Checklist** — Critérios de qualidade.
8. **Navigation Buttons** — Anterior + Guardar e Avançar.

---

## Vista 05 — Etapa em Modo Revisão

```
┌──────────────────────────────────────────────────┐
│  [LOGO]  ResearchAI Guide    [Investigador]      │
├──────────────────────────────────────────────────┤
│  ● ● ● ● ● ○ ○ ○ ○ ○         Etapa 1 de 10     │
│             ▲ a rever                            │
├──────────────────────────────────────────────────┤
│                                                  │
│  ╔══════════════════════════════════════════════╗ │
│  ║  ETAPA 01 — Definição do Tema    [CONCLUÍDA]║ │
│  ╚══════════════════════════════════════════════╝ │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  📄 ARTEFACTO GUARDADO                       ││
│  │                                              ││
│  │  "O tema desta investigação é o impacto      ││
│  │   da utilização de ferramentas de IA no      ││
│  │   processo de aprendizagem de estudantes     ││
│  │   do ensino superior em Moçambique."         ││
│  │                                              ││
│  │  Guardado em: 15/01/2026 11:30               ││
│  │  Versão: 1                                   ││
│  │                                              ││
│  │          ┌──────────────┐                    ││
│  │          │  ✏️ Editar    │                    ││
│  │          └──────────────┘                    ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  ✅ CHECKLIST   [4/4 verificados]            ││
│  │  ☑ O tema está delimitado...                 ││
│  │  ☑ É possível formular uma pergunta...       ││
│  │  ☑ O tema é relevante...                     ││
│  │  ☑ O artefacto foi guardado?                 ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│         ┌─────────────────────────────┐          │
│         │  ▶ Voltar à Etapa Ativa     │          │
│         └─────────────────────────────┘          │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Diferenças em relação à vista ativa:**
- Badge "CONCLUÍDA" no título.
- Artefacto em modo leitura (não editável por defeito).
- Botão "Editar" para reativar a edição.
- Checklist em modo só-leitura (itens marcados).
- Botão principal: "Voltar à Etapa Ativa" (em vez de Avançar).

---

## Vista 06 — Resumo do Workflow (Conclusão)

```
┌──────────────────────────────────────────────────┐
│  [LOGO]  ResearchAI Guide                       │
├──────────────────────────────────────────────────┤
│                                                  │
│           🎉 Workflow Concluído!                 │
│                                                  │
│     Parabéns! Produziu 10 artefactos ao longo   │
│     do seu percurso de investigação.             │
│                                                  │
│  ┌──────────────────────────────────────────────┐│
│  │  ARTEFACTOS PRODUZIDOS                       ││
│  │                                              ││
│  │  ✅ ART-01  Declaração do Tema               ││
│  │  ✅ ART-02  Pergunta de Investigação          ││
│  │  ✅ ART-03  Objetivos da Investigação         ││
│  │  ✅ ART-04  Mapa de Palavras-chave            ││
│  │  ✅ ART-05  Lista de Referências              ││
│  │  ✅ ART-06  Fontes Selecionadas               ││
│  │  ✅ ART-07  Notas de Leitura                  ││
│  │  ✅ ART-08  Síntese da Revisão                ││
│  │  ✅ ART-09  Rascunho das Secções              ││
│  │  ✅ ART-10  Documento Final Revisto           ││
│  │                                              ││
│  │  Cada artefacto é clicável para revisão.     ││
│  └──────────────────────────────────────────────┘│
│                                                  │
│  ┌────────────────┐   ┌─────────────────────┐   │
│  │ 📥 Exportar    │   │ 🔄 Novo Projeto     │   │
│  └────────────────┘   └─────────────────────┘   │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Vista 07 — Mobile (375px)

```
┌─────────────────────┐
│ [LOGO] ResearchAI   │
│ Investigador         │
├─────────────────────┤
│ ●●●○○○○○○○  3/10   │
├─────────────────────┤
│                     │
│ ETAPA 03            │
│ Definição de        │
│ Objetivos           │
│                     │
│ [descrição]         │
│                     │
├─────────────────────┤
│ 🔧 FERRAMENTAS      │
│ ┌─────────────────┐ │
│ │ ChatGPT  [↗]    │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Claude   [↗]    │ │
│ └─────────────────┘ │
├─────────────────────┤
│ 💬 PROMPT           │
│                     │
│ [prompt text...]    │
│                     │
│ ┌─────────────────┐ │
│ │   📋 Copiar     │ │
│ └─────────────────┘ │
├─────────────────────┤
│ 📄 RESULTADO        │
│ ┌─────────────────┐ │
│ │                 │ │
│ │ [textarea]      │ │
│ │                 │ │
│ └─────────────────┘ │
├─────────────────────┤
│ ✅ CHECKLIST         │
│ ☐ Item 1            │
│ ☐ Item 2            │
│ ☐ Item 3            │
├─────────────────────┤
│ ┌───────┐┌────────┐│
│ │◀ Ant. ││Avançar▶││
│ └───────┘└────────┘│
└─────────────────────┘
```

**Regras de adaptação mobile:**
- Tool Cards empilham verticalmente (1 por linha).
- Workflow Selector: cartões empilham verticalmente.
- Botões de navegação lado a lado na largura total.
- Progress Bar simplificada (pontos + fração).
- Textos e paddings reduzidos, mas legíveis.
