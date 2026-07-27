const fs = require('fs');

let content = fs.readFileSync('src/js/ui/appShell.js', 'utf8');

// Replace `window.WORKFLOWS['WF-INV']` with dynamic checks
content = content.replace(/window\.WORKFLOWS\['WF-INV'\]/g, "window.WORKFLOWS[window.rgWorkspace.getData().workflowId]");

// For the `defaultWorkflowId` we can just get the first one available
content = content.replace(/defaultWorkflowId = 'WF-INV'/g, "defaultWorkflowId = (Object.keys(window.WORKFLOWS || {})[0] || 'WF-INV')");

// Fix `window.WORKFLOWS && window.WORKFLOWS['WF-INV'] ? window.WORKFLOWS['WF-INV'] : null`
// This became `... window.WORKFLOWS[window.rgWorkspace...`
// Wait, I replaced `window.WORKFLOWS['WF-INV']` globally above.
// Let's just review what that does to `const protocolData = window.WORKFLOWS && window.WORKFLOWS['WF-INV'] ? window.WORKFLOWS['WF-INV'] : null;`
// It will become:
// `const protocolData = window.WORKFLOWS && window.WORKFLOWS[window.rgWorkspace.getData().workflowId] ? window.WORKFLOWS[window.rgWorkspace.getData().workflowId] : null;`
// Which is EXACTLY what it should be!

fs.writeFileSync('src/js/ui/appShell.js', content);
console.log("Updated appShell.js");
