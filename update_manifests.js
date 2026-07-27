const fs = require('fs');
const path = require('path');

const modules = ['WF-INV', 'WF-SUP'];

for (const mod of modules) {
    const p = path.join('src', 'assets', mod, 'module.json');
    let manifest = JSON.parse(fs.readFileSync(p, 'utf8'));
    
    // Create new ordered and schema-compliant manifest
    const newManifest = {
        schemaVersion: "1.0",
        id: manifest.id,
        title: manifest.title,
        version: manifest.version || "1.0",
        role: manifest.role,
        status: "stable",
        minCoreVersion: "1.0",
        workflow: manifest.workflow,
        assets: manifest.assets,
        dependencies: []
    };
    
    fs.writeFileSync(p, JSON.stringify(newManifest, null, 4));
}
console.log("Updated module.jsons");
