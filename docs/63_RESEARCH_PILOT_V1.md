# 63 — Research Pilot v1.0

**Objetivo Estratégico:**
Após a consolidação da fundação técnica (Arquitetura, Assets, SLO, Rendering, UX, Onboarding), a evolução funcional do produto entra numa pausa planeada. O foco transita integralmente para a validação empírica.

Este documento define o **Research Pilot v1.0**, cujo propósito não é testar se o software funciona, mas sim observar se o produto responde de forma clara e intuitiva às seguintes 5 questões fundamentais para o utilizador:

1. **Como começo?**
2. **O que devo fazer agora?**
3. **Como sei que terminei?**
4. **O que acontece depois?**
5. **Onde encontro novamente as minhas investigações?**

Se todas estas respostas forem afirmativas na prática, a fundação da versão 1.0 está validada.

---

## Metodologia do Piloto

### 1. Amostra de Utilizadores
Selecionar **5 a 10 utilizadores**, distribuídos pelos seguintes perfis:
- Estudantes de Licenciatura (iniciantes na investigação)
- Estudantes de Mestrado (familiarizados com a estrutura, mas a desenvolver dissertação)
- Docentes (orientadores ou investigadores sénior)

### 2. Cenário de Observação
A observação deve abranger o **percurso completo**:
1. **Onboarding:** O utilizador entra na aplicação e cria a sua investigação no Wizard.
2. **Execução (Protocolo RL-01):** O utilizador navega e tenta completar as 9 etapas da Revisão da Literatura.
3. **Conclusão:** O utilizador finaliza o protocolo, exporta/gera o artefacto final e volta ao Dashboard (As minhas investigações).

### 3. Foco da Observação (Observação Silenciosa)
O facilitador deve intervir o mínimo possível, registando:
- Onde é que o utilizador hesita?
- Que botões tenta clicar que não funcionam ou não estão lá?
- Que termos na interface geram confusão?
- O utilizador ignora as instruções metodológicas e vai direto ao prompt?
- O utilizador percebe que tem de preencher o Artefacto para validar a etapa?

---

## Resultados Esperados (Inputs para a v1.1)

Na fase de Pilot, as melhorias de maior impacto raramente são "novas funcionalidades" complexas. São geralmente:
- **Ajustes de Fluxo:** Páginas intermédias de confirmação (como o ecrã de "Investigação criada com sucesso").
- **Ajustes de Linguagem:** Alteração de copy para termos mais familiares à academia.
- **Microinterações:** Indicadores visuais de estado que reduzem a ansiedade (spinners, toasts, feedback visual).

As observações recolhidas neste piloto tornar-se-ão a **única fonte de requisitos para a versão 1.1**. Nenhuma funcionalidade nova (ou novos protocolos) será desenhada sem antes analisar o comportamento real registado nesta fase.
