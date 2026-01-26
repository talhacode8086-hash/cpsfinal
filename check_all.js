
const fs = require('fs');
const path = require('path');

const configPath = 'f:/cps/lib/tools-config.ts';
const componentsBaseDir = 'f:/cps/components/tools';
const pagePath = 'f:/cps/app/tools/[slug]/page.tsx';

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

const pageContent = fs.readFileSync(pagePath, 'utf8');

const missingFile = [];
const missingInMap = [];

slugs.forEach(slug => {
    const fileName = slug.replace(/-/g, '').toLowerCase() + '.tsx';
    let foundFile = false;
    for (const f of componentFiles) {
        if (f.includes(slug.replace(/-/g, '').toLowerCase())) {
            foundFile = true;
            break;
        }
    }
    if (!foundFile) missingFile.push(slug);

    if (!pageContent.includes(`'${slug}':`)) {
        missingInMap.push(slug);
    }
});

console.log(`Total Slugs: ${slugs.length}`);
console.log('Missing Component File:', missingFile);
console.log('Missing in Page Map:', missingInMap);
