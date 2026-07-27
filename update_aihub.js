const fs = require('fs');

let content = fs.readFileSync('src/js/modules/resources/AIResourceHub.js', 'utf8');

// Replace WF-INV hardcode
content = content.replace(/window\.WORKFLOWS\["WF-INV"\]/g, "window.WORKFLOWS[activeWfId]");

const injection = `
    _loadAssets() {
        this.resources = [];
        let activeWfId = Object.keys(window.WORKFLOWS || {})[0];
        if (window.rgWorkspace) {
            activeWfId = window.rgWorkspace.getData().workflowId || activeWfId;
        }
        
        // Map current workflow steps to independent resources
        if (window.WORKFLOWS && window.WORKFLOWS[activeWfId]) {
            const steps = window.WORKFLOWS[activeWfId].steps;
`;

// we need to replace the start of _loadAssets()
content = content.replace(/_loadAssets\(\) \{\s*this\.resources = \[\];\s*\/\/[^\n]*\n\s*if \(window\.WORKFLOWS && window\.WORKFLOWS\[activeWfId\]\) \{\s*const steps = window\.WORKFLOWS\[activeWfId\]\.steps;/m, injection);
content = content.replace(/_loadAssets\(\) \{\s*this\.resources = \[\];\s*\/\/[^\n]*\n\s*if \(window\.WORKFLOWS && window\.WORKFLOWS\["WF-INV"\]\) \{\s*const steps = window\.WORKFLOWS\["WF-INV"\]\.steps;/m, injection);

// Fix knowledge snippet generation since we separated knowledge:
// Knowledge is now in window.KNOWLEDGE[step.knowledgeId]
const newKnowledgeLogic = `
                // Build knowledge snippet
                let knowledge = [];
                const kn = step.knowledgeId && window.KNOWLEDGE ? window.KNOWLEDGE[step.knowledgeId] : null;
                if (kn) {
                    if (kn.learningOutcome) knowledge.push({ title: 'O que vai aprender', content: kn.learningOutcome });
                    if (kn.bestPractices) knowledge.push({ title: 'Boas Práticas', content: kn.bestPractices });
                    if (kn.commonErrors) knowledge.push({ title: 'Erros Frequentes', content: kn.commonErrors });
                }
`;

content = content.replace(/\/\/\s*Build knowledge snippet[\s\S]*?(?=this\.resources\.push)/m, newKnowledgeLogic + '\n                ');

// Fix checklist generation since it's separated:
content = content.replace(/checklist:\s*step\.checklist \? step\.checklist\.map\(c => c\.label\) : \[\]/g, "checklist: step.checklistId && window.CHECKLISTS && window.CHECKLISTS[step.checklistId] ? window.CHECKLISTS[step.checklistId].map(c => c.label) : []");

fs.writeFileSync('src/js/modules/resources/AIResourceHub.js', content);
console.log("Updated AIResourceHub.js");
