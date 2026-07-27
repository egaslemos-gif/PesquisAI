const fs = require('fs');

const files = {
    'theme.rule.js': {
        oldId: 'S2',
        newId: 'STEP-INV-02',
        focus: 'theme'
    },
    'keywords.rule.js': {
        oldId: 'S5',
        newId: 'STEP-INV-05',
        focus: 'keywords'
    }
};

for (const [filename, info] of Object.entries(files)) {
    const p = `src/js/services/methodology/rules/${filename}`;
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace old ID references
    content = content.replace(new RegExp(`context\\.artifacts\\['${info.oldId}'\\]`, 'g'), `context.artifacts[targetStepId]`);
    content = content.replace(new RegExp(`stepId: '${info.oldId}'`, 'g'), `stepId: targetStepId`);
    content = content.replace(new RegExp(`currentStepId === '${info.oldId}'`, 'g'), `currentStepId === targetStepId`);
    
    // Inject the targetStepId logic
    const injection = `
        let targetStepId = '${info.oldId}';
        if (window.rgEngine && window.rgEngine.getWorkflow()) {
            const step = window.rgEngine.getWorkflow().steps.find(s => s.focus === '${info.focus}' || (s.evaluates && s.evaluates.includes('${info.focus}')) || s.id === '${info.oldId}' || s.id === '${info.newId}');
            if (step) targetStepId = step.id;
        }
        const `;
        
    content = content.replace(/const (\w+) = context\.artifacts\[targetStepId\];/, (match, varName) => {
        return injection + match;
    });

    fs.writeFileSync(p, content);
}
console.log("Updated methodology rules.");
