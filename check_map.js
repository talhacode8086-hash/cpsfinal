
const fs = require('fs');
const path = require('path');

const configPath = 'f:/cps/lib/tools-config.ts';
const componentsBaseDir = 'f:/cps/components/tools';

const configContent = fs.readFileSync(configPath, 'utf8');
const slugs = [];
const slugRegex = /slug:\s*'([^']+)'/g;
let match;
while ((match = slugRegex.exec(configContent)) !== null) {
    slugs.push(match[1]);
}

const componentFiles = new Set();
const walk = (dir) => {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
        } else if (file.endsWith('.tsx')) {
            componentFiles.add(file.toLowerCase());
        }
    });
};

walk(componentsBaseDir);

const missing = [];
const appPageContent = fs.readFileSync('f:/cps/app/tools/[slug]/page.tsx', 'utf8');

slugs.forEach(slug => {
    const inMap = appPageContent.includes(`'${slug}':`);
    if (!inMap) {
        missing.push(slug);
    }
});

console.log(`Total slugs: ${slugs.length}`);
console.log('Missing from ToolComponents map in app/tools/[slug]/page.tsx:');
console.log(JSON.stringify(missing, null, 2));
