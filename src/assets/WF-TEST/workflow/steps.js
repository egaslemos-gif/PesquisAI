
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
