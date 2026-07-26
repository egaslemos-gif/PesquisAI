# Guia do Investigador

## Release Candidate 1

**Versão:** v0.9.0-rc1  
**Data:** 25 Julho 2026

### Principais novidades

- **✔ Nova identidade do produto:** A plataforma assume-se como um Guia do Investigador, não como um assistente de IA genérico. A Inteligência Artificial orienta, o investigador decide.
- **✔ Biblioteca de Protocolos:** Reposicionamento conceptual de "workflows sequenciais" para um catálogo independente de protocolos (ex: RL-01).
- **✔ Biblioteca de Prompts:** Um novo recurso independente que permite utilizar prompts especializados sem obrigatoriedade de seguir um protocolo (com recurso a "Saber mais" para manter foco pedagógico).
- **✔ Knowledge Just-in-Time:** Orientação metodológica na hora e local exatos em que é necessária.
- **✔ UX simplificada:** Interface limpa focada no conteúdo, sem redundâncias, com destaque para a distinção clara entre passos metodológicos e resultados.
- **✔ Artefactos orientados a resultados:** As etapas descrevem a atividade e geram artefactos que constituem a evidência real (ex: "Tema delimitado", "Tabela de extração preenchida").
- **✔ Persistência local:** Todo o trabalho é guardado automaticamente e em tempo real no localStorage.
- **✔ Offline First:** A plataforma é executada integralmente no browser, sem dependência de base de dados externa ou backend, garantindo total privacidade do investigador.
- **✔ EventBus estabilizado:** Arquitetura central baseada num padrão pub/sub que simplifica o fluxo de dados (atualizado e fixado na v9).

### Limitações conhecidas

- Apenas o protocolo RL-01 (Revisão da Literatura) está totalmente implementado.
- Sem pesquisa global de recursos.
- Sem funcionalidade de favoritos ou "guardar para mais tarde".
- Sem autenticação de utilizador (login/registo).
- Sem sincronização cloud (dados limitados ao dispositivo atual).
- Sem Research Identity (RID) / histórico formativo.

### Roadmap imediato

- **RFC-018:** Research Identity (RID) - Base para continuidade entre sessões e recuperação de histórico.
- **RFC-019:** Learning Record - Mapeamento da aprendizagem e feedback.
- **RFC-020:** Training Analytics - Produção de evidências e indicadores para investigação da formação.
