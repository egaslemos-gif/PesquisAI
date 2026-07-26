const fs = require('fs');
const path = require('path');

const icons = [
    'target',
    'book-open',
    'brain',
    'clipboard-check',
    'scale',
    'wrench',
    'file-text',
    'arrow-right-circle'
];

async function run() {
    for (const name of icons) {
        const filePath = path.join(__dirname, 'node_modules', 'lucide-static', 'icons', `${name}.svg`);
        const data = fs.readFileSync(filePath, 'utf-8');
        const inner = data.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim();
        console.log(`    ${name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())}: baseSvg('${inner}'),`);
    }
}
run();
