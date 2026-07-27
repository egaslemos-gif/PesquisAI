
window.PROMPTS = window.PROMPTS || {};
Object.assign(window.PROMPTS, {
    "PT-TEST-001": {
        "id": "PT-TEST-001",
        "name": "Geração de Ideias de Teste",
        "objective": "Gerar algo para testar a interface",
        "competency": "Validação de Arquitetura",
        "systemPrompt": "És um assistente de testes de software.",
        "userPromptTemplate": "Por favor, testa o conceito {{topic}} e verifica se o carregamento dinâmico funcionou.",
        "variables": [
            {
                "name": "topic",
                "label": "Tópico Fictício",
                "description": "Descreva um cenário de teste."
            }
        ]
    }
});
