# SS-005: Scientific Asset Naming Convention

Este documento estabelece as convenções de nomenclatura, IDs, versionamento e categorização dos *Scientific Assets* no Guia do Investigador. O seu objetivo é garantir escalabilidade e consistência, evitando conflitos ou dependência de nomes genéricos como `kc_001`.

## 1. Prefixos de Tipologia (Type Prefixes)
Todos os IDs de ativos e ficheiros correspondentes devem iniciar-se pelo prefixo correspondente ao tipo de conteúdo:
- **KC**: Knowledge Card
- **PR**: Prompt
- **CHK**: Checklist
- **REV**: Review
- **TOOL**: Tool
- **EX**: Example

## 2. Níveis de Âmbito (Scope Levels)
Existem dois níveis de escopo que ditam a reutilização do ativo:
- **CORE**: Ativos metodológicos universais, aplicáveis transversalmente a qualquer protocolo.
  - *Exemplo*: `KC-CORE-PICO` (Explica a estrutura PICO genérica).
- **CONTEXTUAL**: Ativos acoplados à execução específica de um protocolo. Identificados pelo ID do protocolo (ex: `RL01`, `PJ01`).
  - *Exemplo*: `KC-RL01-THEME-SELECTION` (Explica o contexto da seleção temática especificamente para Revisões da Literatura).

## 3. Convenção de Identificadores (IDs)
O `id` no JSON do ativo deve seguir o formato:
`[PREFIXO]-[ESCOPO]-[NOME-SEMÂNTICO]`

**Regras para o `NOME-SEMÂNTICO`:**
- Todo em letras MAIÚSCULAS.
- Palavras separadas por hífens (`-`).
- Em inglês (para standardização interna da infraestrutura), ou português claro, mas o inglês é preferido para os IDs técnicos.
- Curto, focado no tópico central.

**Exemplos Válidos:**
- `KC-CORE-THEME-DELIMITATION`
- `KC-CORE-SPIDER`
- `PR-RL01-BRAINSTORMING`
- `CHK-CORE-LITERATURE-QUALITY`
- `REV-PJ01-METHODOLOGY`

## 4. Convenção de Nomes de Ficheiro
Os nomes de ficheiros (`.json`) devem derivar diretamente do ID, em minúsculas, mantendo os hífens. O ficheiro deve residir na pasta do seu respetivo tipo.

**Exemplos:**
- `assets/knowledge/kc-core-theme-delimitation.json`
- `assets/prompt/pr-rl01-brainstorming.json`

## 5. Versionamento
O campo `version` segue Semantic Versioning simplificado:
- `1.0`: Versão estável inicial aprovada.
- `1.1`, `1.2`: Pequenas correções ortográficas, atualizações em *examples* ou pequenas edições no conteúdo sem alterar o objetivo do ativo.
- `2.0`: Alteração profunda na fundação conceptual do ativo (e.g., uma mudança radical de como ensinamos PICO, ou reconstrução integral de um *Prompt*).

## 6. Nomenclatura de Tags (Taxonomy)
As `tags` são utilizadas para filtrar e sugerir *assets*.
- Devem estar em português, minúsculas, usando kebab-case para espaços (ex: `pergunta-investigacao`).
- Todos os *Context Assets* devem incluir obrigatoriamente a tag do protocolo de origem (ex: `rl-01`).
- Devem representar conceitos-chave e **não** os nomes das etapas.
