const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    let content = fs.readFileSync(envPath, 'utf8');
    // Find the GEMINI_API_KEY value and join fragmented parts
    const lines = content.split('\n');
    let newKey = '';
    let found = false;
    for (let line of lines) {
        if (line.includes('GEMINI_API_KEY=')) {
            newKey += line.split('=')[1].trim();
            found = true;
        } else if (found && line.trim() !== '' && !line.includes('=')) {
            newKey += line.trim();
        } else if (found && line.includes('=')) {
            break;
        }
    }

    if (newKey) {
        // Clean up the key from any non-alphanumeric chars if necessary
        newKey = newKey.replace(/\s/g, '');
        console.log("Reconstructed Key (Partial):", newKey.substring(0, 10) + "...");
        fs.writeFileSync(envPath, `GEMINI_API_KEY=${newKey}\n`);
        console.log("Fixed .env file.");
    } else {
        console.log("Could not find GEMINI_API_KEY");
    }
}
