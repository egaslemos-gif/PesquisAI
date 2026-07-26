const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Remove 'export '
            content = content.replace(/^export\s+/gm, '');
            
            // Fix data files that don't export to window explicitly
            if (fullPath.includes('workflows.js') && !content.includes('window.WORKFLOWS')) {
                content += '\nwindow.WORKFLOWS = WORKFLOWS;\n';
            }
            if (fullPath.includes('prompts.js') && !content.includes('window.PROMPTS')) {
                content += '\nwindow.PROMPTS = PROMPTS;\n';
            }
            if (fullPath.includes('tools.js') && !content.includes('window.TOOLS')) {
                content += '\nwindow.TOOLS = TOOLS;\n';
            }
            
            fs.writeFileSync(fullPath, content);
            console.log('Fixed', fullPath);
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('All exports removed.');
