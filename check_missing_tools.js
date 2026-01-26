
const fs = require('fs');
const path = require('path');

const toolsConfigPath = 'f:/cps/lib/tools-config.ts';
const componentsDir = 'f:/cps/components/tools';

const content = fs.readFileSync(toolsConfigPath, 'utf8');
const slugsMatch = content.match(/slug:\s*'([^']+)'/g);
const slugs = slugsMatch.map(m => m.match(/'([^']+)'/)[1]);

const allComponentFiles = [];
const getFiles = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
        } else {
            allComponentFiles.push(file.toLowerCase());
        }
    }
};

getFiles(componentsDir);

console.log(`Total slugs in config: ${slugs.length}`);
console.log(`Total component files: ${allComponentFiles.length}`);

const missing = [];
slugs.forEach(slug => {
    const expectedFileName = slug.replace(/-/g, '').toLowerCase() + '.tsx';
    // Some manual mapping might be needed if names differ
    const found = allComponentFiles.some(f => f.includes(slug.replace(/-/g, '').toLowerCase()));
    if (!found) {
        missing.push(slug);
    }
});

console.log('Missing tools (approximate):');
console.log(missing);
