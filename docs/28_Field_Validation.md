# 28 — Field Validation Log

Este documento é o repositório central de dados observacionais recolhidos durante as sessões de teste presenciais com investigadores (Phase 3: Field Validation). 

**Regra de Ouro:** Não registamos opiniões ("O botão é feio"). Registamos comportamentos observáveis ("O utilizador não encontrou o botão durante 20 segundos").

---

## Estrutura do Registo

Sempre que um investigador testar a plataforma, deve ser gerado um bloco com o seguinte formato:

```markdown
### Investigador [NÚMERO]

- **Área Científica:** [Área]
- **Tema Escolhido:** [Tema breve]
- **Tempo Total:** [Minutos]
- **Concluiu o fluxo?** [SIM/NÃO]

#### Principais Métricas
- **Backtracking:** [Quantas vezes voltou atrás]
- **Prompt Copy Rate:** [Copiou os prompts ou escreveu à mão?]
- **Drop-off Point:** [Em que etapa desistiu, se aplicável]

#### Bloqueios Observados
- **Etapa mais difícil:** [Nome/ID da etapa]
- **Motivo do bloqueio:** [Porquê (ex: não percebeu o prompt, não sabia o que fazer a seguir)]

#### Observações Livres
- [Anotação sobre comportamento inesperado 1]
- [Anotação sobre comportamento inesperado 2]
```

---

## Registos de Sessões

*(Os registos das sessões serão anexados aqui à medida que os testes presenciais forem sendo conduzidos. Recomendado realizar pelo menos 4 testes em áreas diferentes: Educação, Saúde, Engenharia, Economia.)*

### Investigador 01
*(Pendente)*

### Investigador 02
*(Pendente)*

### Investigador 03
*(Pendente)*

### Investigador 04
*(Pendente)*

---

## Análise de Padrões

*(A preencher após a conclusão de pelo menos 5-10 sessões)*

Após a realização dos testes, procurar padrões de comportamento. Exemplo:
- **Passo X:** N pessoas bloquearam porque [motivo].
- **Passo Y:** N pessoas ignoraram a recomendação da ferramenta porque [motivo].

As decisões resultantes desta análise devem ser documentadas no `29_Decision_Log.md`.
