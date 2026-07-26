# 12 — Research Workflows Specification

Especificação completa e detalhada dos dois workflows do sistema. Cada etapa é definida com entradas, saídas e dependências explícitas.

---

## Workflow A — Investigador

### Etapa 01 — Definição do Tema

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-01` |
| **Nome** | Definição do Tema |
| **Objetivo** | Produzir um tema de investigação delimitado e viável. |
| **Entrada** | Área científica do investigador. |
| **Saída** | Tema aprovado e delimitado. |
| **Artefacto** | `ART-01` — Declaração do Tema |
| **Próxima etapa** | `STEP-INV-02` — Pergunta de Investigação |

---

### Etapa 02 — Pergunta de Investigação

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-02` |
| **Nome** | Pergunta de Investigação |
| **Objetivo** | Formular uma pergunta clara, específica e investigável. |
| **Entrada** | Tema aprovado (`ART-01`). |
| **Saída** | Pergunta de investigação validada. |
| **Artefacto** | `ART-02` — Pergunta de Investigação |
| **Próxima etapa** | `STEP-INV-03` — Definição de Objetivos |

---

### Etapa 03 — Definição de Objetivos

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-03` |
| **Nome** | Definição de Objetivos |
| **Objetivo** | Definir um objetivo geral e objetivos específicos alinhados com a pergunta. |
| **Entrada** | Tema (`ART-01`) + Pergunta (`ART-02`). |
| **Saída** | Lista de objetivos validados. |
| **Artefacto** | `ART-03` — Objetivos da Investigação |
| **Próxima etapa** | `STEP-INV-04` — Palavras-chave |

---

### Etapa 04 — Palavras-chave

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-04` |
| **Nome** | Palavras-chave |
| **Objetivo** | Identificar termos de pesquisa em português e inglês para a revisão de literatura. |
| **Entrada** | Tema (`ART-01`) + Pergunta (`ART-02`) + Objetivos (`ART-03`). |
| **Saída** | Lista de palavras-chave e sinónimos. |
| **Artefacto** | `ART-04` — Mapa de Palavras-chave |
| **Próxima etapa** | `STEP-INV-05` — Pesquisa Bibliográfica |

---

### Etapa 05 — Pesquisa Bibliográfica

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-05` |
| **Nome** | Pesquisa Bibliográfica |
| **Objetivo** | Localizar artigos, livros e fontes relevantes usando as palavras-chave definidas. |
| **Entrada** | Palavras-chave (`ART-04`). |
| **Saída** | Lista de referências encontradas. |
| **Artefacto** | `ART-05` — Lista de Referências |
| **Próxima etapa** | `STEP-INV-06` — Seleção de Fontes |

---

### Etapa 06 — Seleção de Fontes

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-06` |
| **Nome** | Seleção de Fontes |
| **Objetivo** | Filtrar e selecionar as fontes mais relevantes e de qualidade. |
| **Entrada** | Lista de Referências (`ART-05`). |
| **Saída** | Fontes selecionadas com justificação. |
| **Artefacto** | `ART-06` — Fontes Selecionadas |
| **Próxima etapa** | `STEP-INV-07` — Leitura e Análise |

---

### Etapa 07 — Leitura e Análise

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-07` |
| **Nome** | Leitura e Análise |
| **Objetivo** | Ler as fontes selecionadas e extrair ideias, argumentos e dados relevantes. |
| **Entrada** | Fontes selecionadas (`ART-06`). |
| **Saída** | Notas de leitura estruturadas. |
| **Artefacto** | `ART-07` — Notas de Leitura |
| **Próxima etapa** | `STEP-INV-08` — Síntese |

---

### Etapa 08 — Síntese

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-08` |
| **Nome** | Síntese |
| **Objetivo** | Sintetizar as notas de leitura num texto coerente que integre as várias fontes. |
| **Entrada** | Notas de Leitura (`ART-07`). |
| **Saída** | Texto de síntese da revisão de literatura. |
| **Artefacto** | `ART-08` — Síntese da Revisão |
| **Próxima etapa** | `STEP-INV-09` — Redação |

---

### Etapa 09 — Redação

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-09` |
| **Nome** | Redação |
| **Objetivo** | Redigir as secções do trabalho com base nos artefactos acumulados. |
| **Entrada** | Todos os artefactos anteriores (`ART-01` a `ART-08`). |
| **Saída** | Secções redigidas do trabalho de investigação. |
| **Artefacto** | `ART-09` — Rascunho das Secções |
| **Próxima etapa** | `STEP-INV-10` — Revisão Final |

---

### Etapa 10 — Revisão Final

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-INV-10` |
| **Nome** | Revisão Final |
| **Objetivo** | Rever, corrigir e polir o trabalho completo antes da entrega. |
| **Entrada** | Rascunho das Secções (`ART-09`). |
| **Saída** | Trabalho revisto e finalizado. |
| **Artefacto** | `ART-10` — Documento Final Revisto |
| **Próxima etapa** | *(Fim do workflow)* |

---
---

## Workflow B — Orientador

### Etapa 01 — Receber Proposta

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-01` |
| **Nome** | Receber Proposta |
| **Objetivo** | Receber e registar a proposta de investigação do estudante. |
| **Entrada** | Proposta submetida pelo investigador. |
| **Saída** | Proposta registada no sistema. |
| **Artefacto** | `ART-ORI-01` — Proposta Recebida |
| **Próxima etapa** | `STEP-ORI-02` — Avaliar Tema |

---

### Etapa 02 — Avaliar Tema

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-02` |
| **Nome** | Avaliar Tema |
| **Objetivo** | Avaliar a viabilidade, relevância e delimitação do tema proposto. |
| **Entrada** | Proposta Recebida (`ART-ORI-01`). |
| **Saída** | Parecer sobre o tema (aprovado / necessita revisão). |
| **Artefacto** | `ART-ORI-02` — Parecer sobre o Tema |
| **Próxima etapa** | `STEP-ORI-03` — Avaliar Pergunta |

---

### Etapa 03 — Avaliar Pergunta

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-03` |
| **Nome** | Avaliar Pergunta |
| **Objetivo** | Verificar se a pergunta é clara, específica e investigável. |
| **Entrada** | Pergunta de investigação do estudante. |
| **Saída** | Parecer sobre a pergunta. |
| **Artefacto** | `ART-ORI-03` — Parecer sobre a Pergunta |
| **Próxima etapa** | `STEP-ORI-04` — Avaliar Objetivos |

---

### Etapa 04 — Avaliar Objetivos

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-04` |
| **Nome** | Avaliar Objetivos |
| **Objetivo** | Verificar alinhamento dos objetivos com a pergunta e a viabilidade. |
| **Entrada** | Objetivos do estudante. |
| **Saída** | Parecer sobre os objetivos. |
| **Artefacto** | `ART-ORI-04` — Parecer sobre os Objetivos |
| **Próxima etapa** | `STEP-ORI-05` — Avaliar Revisão de Literatura |

---

### Etapa 05 — Avaliar Revisão de Literatura

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-05` |
| **Nome** | Avaliar Revisão de Literatura |
| **Objetivo** | Avaliar a qualidade, abrangência e coerência da revisão de literatura. |
| **Entrada** | Síntese da revisão do estudante. |
| **Saída** | Parecer sobre a revisão. |
| **Artefacto** | `ART-ORI-05` — Parecer sobre a Revisão |
| **Próxima etapa** | `STEP-ORI-06` — Avaliar Metodologia |

---

### Etapa 06 — Avaliar Metodologia

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-06` |
| **Nome** | Avaliar Metodologia |
| **Objetivo** | Avaliar a adequação da metodologia proposta ao problema e aos objetivos. |
| **Entrada** | Descrição metodológica do estudante. |
| **Saída** | Parecer sobre a metodologia. |
| **Artefacto** | `ART-ORI-06` — Parecer sobre a Metodologia |
| **Próxima etapa** | `STEP-ORI-07` — Avaliar Resultados |

---

### Etapa 07 — Avaliar Resultados

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-07` |
| **Nome** | Avaliar Resultados |
| **Objetivo** | Avaliar a apresentação, análise e interpretação dos resultados. |
| **Entrada** | Secção de resultados do estudante. |
| **Saída** | Parecer sobre os resultados. |
| **Artefacto** | `ART-ORI-07` — Parecer sobre os Resultados |
| **Próxima etapa** | `STEP-ORI-08` — Avaliar Conclusões |

---

### Etapa 08 — Avaliar Conclusões

| Campo | Valor |
| :--- | :--- |
| **ID** | `STEP-ORI-08` |
| **Nome** | Avaliar Conclusões |
| **Objetivo** | Avaliar se as conclusões respondem à pergunta e estão sustentadas nos resultados. |
| **Entrada** | Secção de conclusões do estudante. |
| **Saída** | Parecer final. |
| **Artefacto** | `ART-ORI-08` — Parecer Final |
| **Próxima etapa** | *(Fim do workflow)* |
