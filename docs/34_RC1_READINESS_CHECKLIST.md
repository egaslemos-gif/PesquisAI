# 34 — RC1 Readiness Checklist

Documento oficial de acompanhamento do estado de prontidão para a **Release Candidate 1 (RC1)** do Guia do Investigador. O projeto só transita para RC1 quando todos os critérios abaixo estiverem validados.

---

## 1. Arquitetura
- [ ] Completa e documentada
- [ ] Congelada (Sem alterações estruturais)
- [ ] Princípio de separação de responsabilidades assegurado (Workspace puro, Engine decisor, UI renderizador)

## 2. Workflow Engine
- [ ] Validado estaticamente (Cenários A-E)
- [ ] Invalidação metodológica garantida

## 3. Validação Técnica (Browser QA)
- [ ] Execução dinâmica do DL-005 concluída com sucesso
- [ ] Evidências de testes recolhidas (Screenshots, Consola, DOM)
- [ ] Persistência do Workspace validada
- [ ] Persistência de Checklists Funcionais integrada e validada

## 4. Estabilização (RC Stabilization Sprint)
- [ ] Consistência de mensagens e notificações (Toasts)
- [ ] Terminologia uniformizada em toda a interface
- [ ] Revisão de empty states, mensagens de erro e confirmações
- [ ] Acessibilidade básica (teclado, foco, contraste)
- [ ] Comportamento visual validado responsivamente
- [ ] Field Validation implementada (Formato de orientação não-bloqueante)

## 5. Validação de Campo (User Validation - Fase 3)
- [ ] Teste de Usabilidade concluído (Nível 3.2)
- [ ] Validação Metodológica concluída (Nível 3.3)
- [ ] Feedback integrado e bloqueadores resolvidos

## 6. Lançamento e Documentação
- [ ] Documentação de base atualizada (Fases 1, 2 e 3)
- [ ] Known Issues revistos e mitigados
- [ ] Decision Logs pendentes fechados
- [ ] Release Notes preparadas

---

### Estado Final da RC1

**STATUS:** PREPARING FOR RC1
