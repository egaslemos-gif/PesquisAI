# Scientific Asset Envelope Schema

Cada ativo científico (JSON) partilha a mesma estrutura de envelope (`envelope`), encapsulando os metadados de gestão e dependências, com um campo livre `content` adaptado à especificidade de cada tipo de ativo.

## Base Envelope
```json
{
  "id": "TYPE-SEMANTIC-NAME",
  "type": "knowledge|prompt|review|checklist|tool|example",
  "title": "Título humano legível",
  "version": "1.0",
  "status": "approved",
  "maturity": "draft|reviewed|approved|gold",
  "language": "pt-PT",
  "author": "Guia do Investigador",
  "reviewedBy": "Scientific Board",
  "lastUpdated": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "usedBy": ["RL-01", "PJ-01"],
  "requires": ["ASSET-ID-1"],
  "relatedAssets": ["ASSET-ID-2"],
  "content": {}
}
```

### Knowledge (Knowledge Card)
O Knowledge Card pode ser **Core** (ex: `KC-CORE-PICO`) para conceitos universais, ou **Context** (ex: `KC-RL01-THEME-SELECTION`) para aplicação específica.
```json
"content": {
  "summary": "Resumo rápido do conceito.",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedReadingTime": 4,
  "concept": "Texto do conceito teórico detalhado.",
  "whyItMatters": "Porque é que este conceito é fundamental para o sucesso científico.",
  "whenToUse": "Cenários de aplicação ideal.",
  "whenNotToUse": "Quando evitar a utilização.",
  "steps": ["Passo 1", "Passo 2"],
  "examples": [
    {
      "type": "correct",
      "text": "Exemplo válido que demonstra o conceito.",
      "explanation": "Porque é que este exemplo é correto."
    },
    {
      "type": "incorrect",
      "text": "Exemplo falho que demonstra o que evitar.",
      "explanation": "Porque é que este exemplo falha."
    }
  ],
  "commonErrors": [
    {
      "severity": "warning|error",
      "message": "Mensagem detalhada do erro ou gotcha comum."
    }
  ],
  "references": [
    {
      "title": "Título do artigo/livro",
      "url": "https://..."
    }
  ]
}
```

### Prompt (Scientific Prompt Asset)
O Prompt deixa de ser um bloco de texto e passa a ser um objeto de engenharia parametrizável. Pode ser **Core** (padrões universais como `PR-CORE-BRAINSTORMING`) ou **Context** (aplicação específica como `PR-RL01-THEME-BRAINSTORMING`).
```json
"content": {
  "promptPattern": "brainstorm|critique|refine|evaluate|summarize|decompose",
  "objective": "Qual é o objetivo deste prompt metodologicamente falando.",
  "recommendedModels": ["ChatGPT", "Claude 3.5", "Gemini 1.5"],
  "expectedInput": ["Tema preliminar", "Área científica"],
  "expectedOutput": {
    "type": "markdown",
    "format": "Lista de opções ou tabela"
  },
  "persona": "Professor Catedrático especializado em metodologia.",
  "context": "O utilizador está na fase embrionária de afunilamento de um tema geral.",
  "task": "Gerar 3 alternativas de delimitação cruzando variáveis.",
  "promptTemplate": "Atue como {{persona}}.\nContexto: {{context}}.\nTema Base: {{input_tema}}.\nTarefa: {{task}}.\nRestrições: {{constraints}}.",
  "constraints": [
    "Nunca escolha o tema pelo investigador.",
    "Nunca forneça opções binárias."
  ],
  "qualityCriteria": [
    "As opções devolvidas cobrem o cruzamento População+Contexto."
  ],
  "evaluationCriteria": [
    "A resposta não foi formatada como bloco de texto contínuo.",
    "O tom foi encorajador e académico."
  ],
  "strategies": {
    "guided": {
      "description": "Força o LLM a fazer perguntas em vez de dar respostas diretas.",
      "templateVariation": "Em vez de fornecer temas, pergunte ao utilizador 'Porque escolheu esta área?' e espere a resposta."
    },
    "balanced": {
      "description": "Fornece opções, mas exige justificação analítica.",
      "templateVariation": "Forneça 3 opções com justificação de viabilidade para cada uma."
    },
    "direct": {
      "description": "Devolve o output imediato sem lições teóricas.",
      "templateVariation": "Devolva apenas 5 recortes precisos do tema, sem explicações metodológicas."
    }
  }
}
```

### Checklist (Autoavaliação)
A Checklist reflete os critérios que o investigador deve validar de forma autónoma antes de submeter o seu artefacto à avaliação do sistema.
```json
"content": {
  "assessmentType": "self|peer|ai|system",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": 2,
  "learningOutcome": "O que o investigador aprende a fazer (obrigatório).",
  "passThreshold": 0.8,
  "items": [
    {
      "id": "CHK-001",
      "criterion": "O tema está claramente delimitado?",
      "type": "boolean|scale|text|multiple_choice",
      "mandatory": true,
      "help": "Explicação para apoiar o investigador.",
      "relatedKnowledge": ["KC-CORE-THEME-DELIMITATION"]
    }
  ]
}
```

### Review (Avaliação Sistémica/Metodológica)
O Review é responsável por validar metodologicamente o trabalho do investigador (ou avaliar estruturalmente). A avaliação pode ser executada por lógicas de sistema (`system`) ou requerer inteligência de um LLM (`ai`). O motor de validação processa os critérios e sugere `remediation` adaptativa.
```json
"content": {
  "assessmentType": "self|peer|ai|system",
  "validationPattern": "methodological|structural|reflective",
  "requiresLLM": true,
  "automatic": false,
  "learningOutcome": "O que o investigador demonstra (obrigatório).",
  "criteria": [
    {
      "severity": "fail|warning|pass",
      "confidence": "low|medium|high",
      "criterion": "O tema continua excessivamente amplo.",
      "feedback": "Feedback pedagógico justificativo.",
      "recommendation": "Ação recomendada para correção.",
      "remediation": {
        "knowledge": ["KC-CORE-PICO"],
        "prompt": ["PR-RL01-QUESTION"],
        "example": ["EX-RL01-GOOD-QUESTION"],
        "tool": ["TL-PUBMED"]
      }
    }
  ]
}
```

### Tool
```json
"content": {
  "name": "Nome Comercial da Ferramenta",
  "rating": 5,
  "idealFor": ["Brainstorming", "Síntese"],
  "averageTime": "15 min",
  "limitations": "Pode alucinar fontes científicas.",
  "url": "https://..."
}
```

### Example
```json
"content": {
  "context": "Contexto metodológico em que este exemplo ocorreu.",
  "input": "O que o investigador (ou o LLM) gerou/forneceu.",
  "output": "O resultado gerado e analisado.",
  "explanation": "Justificação pedagógica de porque é que o exemplo é útil."
}
```
