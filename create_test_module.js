const fs = require('fs');
const path = require('path');

const baseDir = path.join('src', 'assets', 'WF-TEST');
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
if (!fs.existsSync(path.join(baseDir, 'workflow'))) fs.mkdirSync(path.join(baseDir, 'workflow'), { recursive: true });

const manifest = {
    schemaVersion: "1.0",
    id: "WF-TEST",
    title: "Módulo de Validação",
    version: "1.0",
    role: "tester",
    status: "stable",
    minCoreVersion: "1.0",
    workflow: "workflow/",
    assets: ["knowledge", "prompts", "checklists", "examples"],
    dependencies: []
};

fs.writeFileSync(path.join(baseDir, 'module.json'), JSON.stringify(manifest, null, 4));

const metadata = `
window.WORKFLOW_METADATA = window.WORKFLOW_METADATA || {};
window.WORKFLOW_METADATA['WF-TEST'] = {
    "id": "WF-TEST",
    "name": "Validation Module",
    "description": "A module to test the decoupling capabilities of the Core Engine.",
    "role": "tester",
    "minCoreVersion": "1.0"
};
`;
fs.writeFileSync(path.join(baseDir, 'workflow', 'metadata.js'), metadata);

const steps = `
window.WORKFLOW_STEPS = window.WORKFLOW_STEPS || {};
window.WORKFLOW_STEPS['WF-TEST'] = [
    {
        "id": "STEP-TEST-01",
        "name": "Passo Inicial",
        "description": "Primeiro passo de teste.",
        "focus": "test_start",
        "knowledgeId": "KN-TEST-01",
        "checklistId": "CHK-TEST-01",
        "assets": {
            "prompt": true,
            "knowledge": true,
            "checklist": true
        },
        "prompts": [
            "PT-TEST-001"
        ],
        "tools": []
    },
    {
        "id": "STEP-TEST-02",
        "name": "Passo Final",
        "description": "Segundo passo e conclusão.",
        "focus": "test_end",
        "assets": {},
        "prompts": [],
        "tools": []
    }
];
`;
fs.writeFileSync(path.join(baseDir, 'workflow', 'steps.js'), steps);

const knowledge = `
window.KNOWLEDGE = window.KNOWLEDGE || {};
Object.assign(window.KNOWLEDGE, {
    "KN-TEST-01": {
        "id": "KN-TEST-01",
        "learningOutcome": "Compreender que o Core Engine consegue carregar módulos dinamicamente.",
        "bestPractices": "Escreva módulos sem alterar o código do core.",
        "commonErrors": "Tentar inserir lógica de negócio no Core."
    }
});
`;
fs.writeFileSync(path.join(baseDir, 'knowledge.js'), knowledge);

const prompts = `
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
`;
fs.writeFileSync(path.join(baseDir, 'prompts.js'), prompts);

const checklists = `
window.CHECKLISTS = window.CHECKLISTS || {};
Object.assign(window.CHECKLISTS, {
    "CHK-TEST-01": [
        { "id": "chk-t01-01", "label": "O módulo carregou corretamente?" },
        { "id": "chk-t01-02", "label": "Os painéis estão visíveis?" }
    ]
});
`;
fs.writeFileSync(path.join(baseDir, 'checklists.js'), checklists);

// We add an empty examples.js since assets array has it
const examples = `
window.EXAMPLES = window.EXAMPLES || {};
// No examples for test yet
`;
fs.writeFileSync(path.join(baseDir, 'examples.js'), examples);

console.log("WF-TEST module created successfully.");
