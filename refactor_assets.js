const fs = require('fs');
const path = require('path');

// Simulate browser environment to load files
const globalScope = {};
global.window = globalScope;

// Load old data files
const srcData = 'src/data';
eval(fs.readFileSync(path.join(srcData, 'workflows.js'), 'utf8'));
eval(fs.readFileSync(path.join(srcData, 'prompts.js'), 'utf8'));

const workflows = globalScope.WORKFLOWS;
const prompts = globalScope.PROMPTS;

function processWorkflow(wfId) {
    const wf = workflows[wfId];
    if (!wf) return;

    const baseDir = `src/assets/${wfId}`;
    const workflowDir = `${baseDir}/workflow`;

    // 1. Extract Prompts
    const wfPrompts = {};
    const ptKeys = Object.keys(prompts);
    let promptPrefix = wfId === 'WF-INV' ? 'PT-R' : 'PT-S';
    // PT-INV vs PT-SUP actually? WF-INV prompts start with PT-R, WF-SUP with PT-S.
    ptKeys.forEach(k => {
        if (k.startsWith(promptPrefix)) {
            wfPrompts[k] = prompts[k];
        }
    });
    fs.writeFileSync(`${baseDir}/prompts.js`, `window.PROMPTS = window.PROMPTS || {};\nObject.assign(window.PROMPTS, ${JSON.stringify(wfPrompts, null, 4)});\n`);

    // 2. Extract Knowledge and Checklists from steps
    const wfKnowledge = {};
    const wfChecklists = {};
    const wfSteps = [];

    wf.steps.forEach((step, idx) => {
        const stepId = step.id;
        
        // Knowledge
        const knId = `KN-${stepId}`;
        wfKnowledge[knId] = {
            id: knId,
            learningOutcome: step.learningOutcome || null,
            bestPractices: step.bestPractices || null,
            commonErrors: step.commonErrors || null
        };
        
        // Checklist
        const chkId = `CHK-${stepId}`;
        wfChecklists[chkId] = step.checklist || [];

        // Modify step to reference IDs instead of inline
        const newStep = { ...step };
        delete newStep.learningOutcome;
        delete newStep.bestPractices;
        delete newStep.commonErrors;
        delete newStep.checklist;

        newStep.knowledgeId = knId;
        newStep.checklistId = chkId;
        
        wfSteps.push(newStep);
    });

    fs.writeFileSync(`${baseDir}/knowledge.js`, `window.KNOWLEDGE = window.KNOWLEDGE || {};\nObject.assign(window.KNOWLEDGE, ${JSON.stringify(wfKnowledge, null, 4)});\n`);
    fs.writeFileSync(`${baseDir}/checklists.js`, `window.CHECKLISTS = window.CHECKLISTS || {};\nObject.assign(window.CHECKLISTS, ${JSON.stringify(wfChecklists, null, 4)});\n`);

    // 3. Workflow file (metadata + steps)
    const wfMetadata = { ...wf };
    delete wfMetadata.steps;
    fs.writeFileSync(`${workflowDir}/metadata.js`, `window.WORKFLOW_METADATA = window.WORKFLOW_METADATA || {};\nwindow.WORKFLOW_METADATA['${wfId}'] = ${JSON.stringify(wfMetadata, null, 4)};\n`);
    fs.writeFileSync(`${workflowDir}/steps.js`, `window.WORKFLOW_STEPS = window.WORKFLOW_STEPS || {};\nwindow.WORKFLOW_STEPS['${wfId}'] = ${JSON.stringify(wfSteps, null, 4)};\n`);

    // 4. module.json
    const moduleJson = {
        id: wfId,
        title: wfMetadata.name,
        version: "1.0",
        role: wfId === 'WF-INV' ? 'investigator' : 'supervisor',
        institution: "generic",
        workflow: "workflow/",
        assets: [
            "knowledge",
            "prompts",
            "checklists",
            "examples"
        ]
    };
    fs.writeFileSync(`${baseDir}/module.json`, JSON.stringify(moduleJson, null, 4) + '\n');
}

processWorkflow('WF-INV');
processWorkflow('WF-SUP');

console.log("Refactoring complete.");
