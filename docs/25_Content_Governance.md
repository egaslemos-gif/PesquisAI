# 25 — Content Governance

Documento estratégico que define como o conteúdo do produto (prompts, ferramentas, workflows) é criado, aprovado, versionado e mantido ao longo do tempo.

---

## Porquê este documento

Este projeto vai crescer. Na versão 3.0 haverá centenas de prompts, múltiplos workflows e dezenas de ferramentas. Sem regras de governação claras desde o início, o resultado será duplicações, inconsistências e perda de qualidade.

Este documento responde a:

- Como adicionamos novos prompts?
- Quem os aprova?
- Como são versionados?
- Quem valida ferramentas?
- Como um workflow novo é criado?
- Como evitar duplicações?

---

## 1. Governação de Prompts

### 1.1. Ciclo de Vida de um Prompt

```
Proposta → Rascunho → Revisão → Teste → Aprovação → Publicação → Manutenção
```

| Fase | Responsável | Ação |
| :--- | :--- | :--- |
| **Proposta** | Qualquer colaborador | Identifica a necessidade de um novo prompt. Preenche o template de proposta. |
| **Rascunho** | Autor do prompt | Escreve o template com variáveis, seguindo o formato padrão do doc 14. |
| **Revisão** | Revisor designado | Verifica: clareza, variáveis corretas, alinhamento com o manifesto. |
| **Teste** | Autor + Revisor | Testa o prompt em pelo menos 2 ferramentas de IA. Avalia a qualidade do output. |
| **Aprovação** | Responsável do produto | Aprova a inclusão no catálogo oficial. |
| **Publicação** | Equipa técnica | Adiciona o prompt aos dados do sistema (JSON). |
| **Manutenção** | Responsável do produto | Revisão periódica (a cada 6 meses ou nova versão). |

### 1.2. Convenções de ID

Os IDs de prompt seguem o formato: `PT-{PAPEL}-{NÚMERO}`

| Prefixo | Papel | Exemplo |
| :--- | :--- | :--- |
| `PT-R-` | Researcher (Investigador) | `PT-R-001`, `PT-R-002` |
| `PT-S-` | Supervisor (Orientador) | `PT-S-001`, `PT-S-002` |
| `PT-V-` | Reviewer (Revisor) — *futuro* | `PT-V-001` |
| `PT-E-` | Editor — *futuro* | `PT-E-001` |
| `PT-T-` | Teacher (Professor) — *futuro* | `PT-T-001` |

**Regra:** Nunca reutilizar um ID, mesmo que o prompt seja removido.

### 1.3. Versionamento de Prompts

Cada prompt tem uma versão semântica simplificada:

| Versão | Significado |
| :--- | :--- |
| `1.0` | Versão inicial aprovada |
| `1.1` | Correção menor (typo, clarificação) |
| `2.0` | Reformulação significativa |

O histórico de versões é registado no metadado do prompt:

```json
{
  "id": "PT-R-001",
  "version": "1.0",
  "changelog": [
    { "version": "1.0", "date": "2026-01-15", "note": "Versão inicial" }
  ]
}
```

### 1.4. Regras para Novos Prompts

- **Não duplicar:** Antes de criar um novo prompt, verificar se já existe um que cumpra a mesma função.
- **Uma finalidade:** Cada prompt serve exatamente um objetivo.
- **Variáveis explícitas:** Todas as variáveis devem estar documentadas com `source` e `required`.
- **Testado:** Nenhum prompt é publicado sem teste em pelo menos 2 modelos de IA.
- **Alinhado com o manifesto:** O prompt deve orientar, não substituir o investigador.

---

## 2. Governação de Ferramentas

### 2.1. Critérios para Inclusão de uma Ferramenta

Uma ferramenta só entra no catálogo se satisfizer **todos** os seguintes critérios:

| Critério | Descrição |
| :--- | :--- |
| **Relevância** | Serve diretamente uma ou mais etapas do workflow. |
| **Acessibilidade** | Tem versão gratuita ou freemium. |
| **Fiabilidade** | Está ativa e mantida (não é um projeto abandonado). |
| **Privacidade** | Não exige dados sensíveis para funcionar. |
| **Documentação** | Existe documentação suficiente para o utilizador. |

### 2.2. Ciclo de Vida de uma Ferramenta

```
Identificação → Avaliação → Teste → Aprovação → Publicação → Revisão periódica
```

### 2.3. Matriz de Decisão de Ferramentas

| Tarefa | Ferramenta Principal | Alternativa | Gratuita | Requer Conta | Etapas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Exploração de ideias | ChatGPT | Gemini | Sim (limitado) | Sim | 01, 02, 03 |
| Pesquisa científica | Consensus | Semantic Scholar | Sim (limitado) | Sim | 05 |
| Pesquisa de literatura | OpenAlex | Google Scholar | Sim | Não | 05 |
| Leitura de PDFs / Síntese | NotebookLM | SciSpace | Sim | Sim | 07, 08 |
| Redação académica | Claude | ChatGPT | Sim (limitado) | Sim | 08, 09 |
| Revisão de texto | Claude | LanguageTool | Sim | Sim/Não | 10 |
| Gestão de referências | Zotero | Mendeley | Sim | Sim | 05, 06, 10 |
| Validação de palavras-chave | Google Scholar | OpenAlex | Sim | Não | 04 |

**Regra:** A interface lê esta matriz. Quando uma ferramenta for removida ou substituída, basta atualizar a matriz.

### 2.4. Revisão Periódica

A cada 6 meses ou a cada nova versão do produto:
- Verificar se a ferramenta ainda está ativa.
- Verificar se o modelo de preços mudou.
- Verificar se há alternativas melhores.
- Atualizar a matriz de decisão.

---

## 3. Governação de Workflows

### 3.1. Como Criar um Novo Workflow

Um novo workflow é uma funcionalidade significativa. Deve ser tratado como uma proposta de produto.

| Fase | Ação |
| :--- | :--- |
| **Proposta** | Descrever: público-alvo, objetivo, número de etapas estimado. |
| **Validação** | Verificar alinhamento com o manifesto (doc 00). |
| **Desenho** | Definir as etapas seguindo a estrutura do doc 13. |
| **Prompts** | Criar prompts para cada etapa, seguindo as convenções de ID. |
| **Ferramentas** | Mapear ferramentas por etapa usando a matriz. |
| **Artefactos** | Definir o artefacto de cada etapa. |
| **Revisão** | Revisão completa por pelo menos 2 pessoas. |
| **Teste** | Testar o workflow end-to-end com um utilizador real. |
| **Aprovação** | Aprovação do responsável do produto. |
| **Implementação** | Adicionar ao sistema. |

### 3.2. Workflows Previstos para o Futuro

| ID | Nome | Versão Prevista | Público |
| :--- | :--- | :--- | :--- |
| `WF-INV` | Investigador | v1.0 ✅ | Estudante/Investigador |
| `WF-ORI` | Orientador | v1.0 ✅ | Orientador académico |
| `WF-RSL` | Revisão Sistemática de Literatura | v2.0 | Investigador |
| `WF-IAC` | Investigação-Ação | v2.0 | Investigador |
| `WF-EST` | Estudo de Caso | v2.0 | Investigador |
| `WF-REV` | Revisão por Pares | v2.0 | Revisor |

---

## 4. Regras de Anti-Duplicação

### 4.1. Prompts

Antes de criar um novo prompt:
1. Pesquisar no catálogo por palavras-chave.
2. Verificar se algum prompt existente pode ser adaptado (via variáveis).
3. Se similar a um existente: enriquecer o existente em vez de criar novo.

### 4.2. Ferramentas

Antes de adicionar uma nova ferramenta:
1. Verificar se já existe na matriz de decisão.
2. Se é alternativa a uma existente: adicionar na coluna "Alternativa".
3. Só adicionar como "Principal" se for significativamente superior.

### 4.3. Etapas

Antes de adicionar uma nova etapa:
1. Verificar se o objetivo pode ser coberto por uma etapa existente.
2. Se a etapa serve apenas um tipo de investigação: pertence a um workflow específico, não ao genérico.

---

## 5. Versionamento do Produto

### 5.1. Design Freeze

Antes de cada implementação, declarar formalmente:

- ☐ Workflows congelados
- ☐ Componentes congelados
- ☐ Estrutura dos JSON congelada
- ☐ Prompts congelados (versão inicial)
- ☐ Arquitetura da interface congelada

A partir do Design Freeze, qualquer alteração é tratada como **evolução do produto** (v1.1, v1.2, etc.).

### 5.2. Versionamento Semântico do Produto

| Versão | Tipo de mudança |
| :--- | :--- |
| v1.0.X | Correção de bugs, typos em prompts |
| v1.X.0 | Novas funcionalidades retrocompatíveis (checklists, exportação) |
| vX.0.0 | Mudanças estruturais (novos workflows, novo modelo de dados) |

### 5.3. Changelog

Manter um ficheiro `CHANGELOG.md` na raiz do projeto com todas as alterações por versão.

---

## 6. Responsabilidades

| Papel | Responsabilidades |
| :--- | :--- |
| **Responsável do Produto** | Aprovar workflows, prompts e ferramentas. Declarar Design Freeze. Manter a visão alinhada com o manifesto. |
| **Autor de Conteúdo** | Redigir prompts e descrições de etapas. Testar com ferramentas de IA. |
| **Revisor** | Verificar qualidade, consistência e alinhamento. |
| **Equipa Técnica** | Implementar no sistema. Manter os JSON e a interface. |

---

## Resumo: A Pergunta-Guia

Sempre que surgir uma proposta de novo conteúdo (prompt, ferramenta, workflow, etapa), a pergunta não é:

> *"É interessante?"*

A pergunta é:

> **"Está alinhada com os princípios do produto e segue o processo de governação?"**
