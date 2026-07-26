# Research Identity (RID) Storage Specification

Este documento define a convivência, limites e chaves utilizadas no `LocalStorage` pelo Guia do Investigador. O objetivo crítico da RC2 é manter o isolamento de domínio.

## Chaves Ativas (RC2)

| Chave de Armazenamento | Domínio Proprietário | Papel | Estrutura |
| :--- | :--- | :--- | :--- |
| `research.identity` | **RID Domain** | Raiz de identidade, métricas e registo de projetos. Não contém texto de pesquisa real, apenas metadados. | Objeto JSON (Ver `39_RID_DATA_MODEL.md`) |
| `rg_workspace` | **Workspace Engine** | Contém o estado e artefactos da sessão *ativa*. | Objeto JSON (MVP RC1.0.1) |
| `rg_workspace_{proj_id}` | **Workspace Engine** | *Evolução prevista:* Armazena o estado e artefactos de investigações passadas. | Objeto JSON (Idêntico ao rg_workspace) |

## Estratégia de Arquitetura "Dual Storage"

A RC2 marca o início da transição de "Single Workspace" para "Multi Workspace". Para respeitar a _Regra Zero_, o Storage Service base será evoluído com as seguintes regras de contenção:

### 1. Separação de Preocupações (Separation of Concerns)
- **`research.identity`** sabe "quais" são os projetos, "quando" foram atualizados e "onde" pararam.
- **`rg_workspace_{proj_id}`** sabe o "quê". É o detentor dos textos, das checklists e do progresso granular.

### 2. A Evolução do `storage.js`
Até à RC1.0.1, `storage.js` fazia:
```javascript
this.storage.setItem('rg_workspace', data);
```
Na RC2, para suportar a capacidade de clicar num projeto antigo no Dashboard e carregá-lo, o `storage.js` terá de suportar chaves dinâmicas baseadas no ID do Workspace.

**Migração Silenciosa:**
Quando um utilizador abre o sistema após o deploy da RC2:
1. O RID regista o ID do projeto existente no `rg_workspace` no seu Registry.
2. Qualquer salvaguarda passa a persistir tanto no `rg_workspace_{id}` quanto no `rg_workspace` (para retrocompatibilidade com UI components que possam não ter sido injetados dinamicamente ainda).
3. Ao carregar um projeto histórico, o sistema apenas precisa de forçar o `workspace.js` a povoar-se com os dados carregados do respetivo `rg_workspace_{id}`.

## Versionamento

O RID suportará um atributo `"version": "1.0"`.
Futuras migrações de dados (ex: RC3) usarão `research.identity.version` para aplicar _transformers_ automáticos no arranque da app (ex: migrar propriedades de string para arrays), sem perda de dados analíticos.
