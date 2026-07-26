# 36. Plano de Lançamento da Internal Beta (Deployment Plan)

**Versão Alvo:** `v0.9.0-rc1`

## Objetivo
Disponibilizar a versão Release Candidate 1 (RC1) num ambiente acessível aos participantes da Internal Beta, preservando a estabilidade e permitindo recolher feedback estruturado num contexto real de utilização.

## Âmbito
Esta fase **não inclui**:
- Novas funcionalidades;
- Alterações arquiteturais;
- Otimizações de UX.

Esta fase **inclui apenas**:
- Publicação;
- Validação operacional em ambiente web remoto;
- Recolha de feedback com base em `35_INTERNAL_BETA_PROTOCOL.md`.

---

## Pré-Deployment Checklist

### Código
- [x] RC1 Approved
- [x] EventBus Stabilized
- [x] Sem erros críticos na consola
- [x] Assets versionados corretamente (`?v=9`)
- [x] Política de versionamento estabelecida (ex: `v0.9.0-rc1`)

### Conteúdo
- [x] Protocolos completos
- [x] Prompts validados
- [x] Ferramentas verificadas
- [x] Checklists completas

### Interface
- [ ] Chrome
- [ ] Edge
- [ ] Firefox
- [ ] Mobile (validação básica)

---

## Deploy
**Ação:** Publicar na Vercel (ou infraestrutura semelhante aprovada).

**Confirmar pós-publicação:**
- [ ] URL pública acessível e partilhável.
- [ ] Tempos de carregamento aceitáveis.
- [ ] Tráfego sobre HTTPS assegurado.
- [ ] Funcionamento correto após *Refresh* da página (`F5`).
- [ ] Inexistência de erros de *build* ou perdas de *assets* (404s).

---

## Smoke Test (Testes de Fumo)
Após o *deploy*, executar apenas cinco verificações essenciais na URL pública. Se estas operações funcionarem, a versão pode ser disponibilizada aos utilizadores:

1. **Nova Investigação**: O botão limpa o projeto e inicia um novo estado "limpo" do motor.
2. **Avançar**: A transição de etapas opera corretamente com validação de regras.
3. **Guardar Rascunho**: O botão guarda manualmente o estado atual no *Workspace*.
4. **Refresh (F5)**: A página repõe visualmente e logicamente os artefactos, etapa atual e checklist.
5. **Recuperação do Workspace**: Nenhum aviso ou erro crítico surge na consola após recuperação de dados do `localStorage`.

---

## Participantes e Feedback
- **Participantes**: Docentes, Mestrandos e Investigadores da Universidade Licungo.
- **Instrumento**: Utilizar **exclusivamente** o formulário definido no documento `35_INTERNAL_BETA_PROTOCOL.md`.
- **Regra**: Não criar novos formulários, não alongar as perguntas, não complicar o feedback.

---

## Critério de Conclusão
A Internal Beta será considerada **concluída** apenas quando:
1. Todos os participantes selecionados realizarem o protocolo (cerca de 5 minutos por utilizador).
2. O feedback estiver consolidado e estruturado.
3. Os problemas relatados estiverem devidamente classificados por nível de severidade (Alto/Médio/Baixo).

*(Só após este ponto se iniciará o planeamento e arquitetura da futura Release Candidate 2 / v0.9.1).*
