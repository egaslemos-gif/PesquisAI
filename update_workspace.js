const fs = require('fs');

let content = fs.readFileSync('src/js/core/workspace.js', 'utf8');

// Replace standard fallbacks to default to the first available workflow
content = content.replace(/'WF-INV'/g, "(Object.keys(window.WORKFLOWS || {})[0] || 'WF-INV')");

// Fix the line that reads steps specifically from WF-INV
// It was: const steps = window.WORKFLOWS['WF-INV'].steps;
content = content.replace(/window\.WORKFLOWS\['WF-INV'\]\.steps/g, "window.WORKFLOWS[this.data.workflowId].steps");

// Wait, the previous replace replaced 'WF-INV' globally.
// So window.WORKFLOWS['WF-INV'].steps became window.WORKFLOWS[(Object.keys(...)].steps.
// I will just reset the whole file and do it more carefully.

content = fs.readFileSync('src/js/core/workspace.js', 'utf8');

// The specific steps replacement:
content = content.replace(/window\.WORKFLOWS\['WF-INV'\]\.steps/g, "window.WORKFLOWS[this.data.workflowId].steps");

// The fallback replacements (e.g. `workflowId: 'WF-INV'`)
content = content.replace(/workflowId:\s*'WF-INV'/g, "workflowId: (Object.keys(window.WORKFLOWS || {})[0] || 'WF-INV')");
content = content.replace(/workflowId:\s*metadata\.workflowId\s*\|\|\s*'WF-INV'/g, "workflowId: metadata.workflowId || (Object.keys(window.WORKFLOWS || {})[0] || 'WF-INV')");

fs.writeFileSync('src/js/core/workspace.js', content);
console.log("Updated workspace.js");
