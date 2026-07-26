# 06 - Workflow Engine

Este documento descreve o "cérebro" do workflow. Define o motor de estados sem abordar a programação, apenas as regras.

## Fluxo Lógico do Motor (Step Cycle)

1. **Estado actual**
   ↓
2. **Carregar etapa**
   ↓
3. **Mostrar ferramentas**
   ↓
4. **Gerar prompt**
   ↓
5. **Esperar resposta**
   ↓
6. **Guardar artefacto**
   ↓
7. **Avançar**
