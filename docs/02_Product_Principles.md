# 02 - Product Principles (Constitution)

Este é o documento mais importante. Define princípios que nunca deverão mudar.

## Princípios Fundamentais

1. **A IA não substitui o investigador.**
2. **A plataforma não produz investigação.**
3. **A plataforma orienta processos.**
4. **Cada etapa produz um artefacto.**
5. **Todo o fluxo é transparente.**
6. **O utilizador mantém controlo total.**
7. **A plataforma é agnóstica à IA utilizada.**
8. **Os prompts são reutilizáveis.**
9. **O contexto acompanha todo o workflow.**

> **Nota:** Este documento atua como a constituição do projeto e impede que o mesmo perca foco no futuro, garantindo que o valor principal reside na orientação do fluxo de trabalho e não na automação descontrolada.

## Princípios de Arquitetura de Software

1. **Separação Rigorosa de Responsabilidades:** O `Workspace` é a única fonte de verdade (estado puro), o `Engine` é o único decisor (regras de negócio e transições), e a `UI` é um renderizador puro sem estado próprio.
