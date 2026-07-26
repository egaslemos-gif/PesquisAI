# 07 - Prompt Engine

Explica como os prompts são construídos de forma dinâmica. Este documento define apenas a lógica de montagem do prompt, que injeta o contexto da investigação na instrução.

## Conhecimento do Sistema

O sistema armazena e conhece o estado do utilizador:
- Área
- Tema
- Pergunta
- Objetivos

## Produção Automática do Prompt

Com base nas informações do sistema, a Prompt Engine produz automaticamente a query final segundo a fórmula:

**Prompt** 
+
**Contexto** (Área, Tema, Pergunta, etc.)
+
**Instruções** (Regras específicas da etapa)
+
**Resultado esperado** (Formato do output)

=

*Prompt Finalizado pronto a ser copiado.*
