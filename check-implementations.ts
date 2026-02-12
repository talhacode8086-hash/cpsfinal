import { tools } from './lib/tools-config';
import fs from 'fs';

const pageContent = fs.readFileSync('./app/tools/[slug]/page.tsx', 'utf-8');
const match = pageContent.match(/const ToolComponents: Record<string, any> = \{([\s\S]*?)\};/);

if (!match) {
    console.log('Could not find ToolComponents map');
    process.exit(1);
}

const componentMapContent = match[1];
const implementedSlugs = new Set();
const lines = componentMapContent.split('\n');
lines.forEach(line => {
    const m = line.match(/'([^']+)':/);
    if (m) {
        implementedSlugs.add(m[1]);
    }
});

const definedSlugs = tools.map(t => t.slug);
const missing implementation = definedSlugs.filter(s => !implementedSlugs.has(s));

console.log(`Total defined tools: ${definedSlugs.length}`);
console.log(`Total implemented tools: ${implementedSlugs.size}`);
console.log(`Missing implementations: ${missing implementation.length}`);

if (missing implementation.length > 0) {
    console.log('Examples of missing tools:', missing implementation.slice(0, 10));
}
