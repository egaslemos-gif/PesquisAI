const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'prompts.js');
const content = fs.readFileSync(filePath, 'utf8');

// Function to decode double-encoded UTF-8
function fixEncoding(str) {
    try {
        // Convert the string (which contains UTF-8 bytes interpreted as latin1) back to bytes
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i) & 0xff;
        }
        // Decode bytes as UTF-8
        return new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
        console.error('Error decoding:', e);
        return str;
    }
}

const fixed = fixEncoding(content);
fs.writeFileSync(filePath, fixed, 'utf8');
console.log('Fixed prompts.js encoding!');
