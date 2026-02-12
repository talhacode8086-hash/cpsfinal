const fs = require('fs');

const definedPath = 'defined_slugs.txt';
const implementedPath = 'implemented_slugs.txt';

try {
    const definedRaw = fs.readFileSync(definedPath, 'utf-8');
    const implementedRaw = fs.readFileSync(implementedPath, 'utf-8');

    const clean = (text) => text.split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0 && !l.includes('slug:') && !l.includes('ToolComponents'));

    const definedSlugs = new Set(clean(definedRaw));
    const implementedSlugs = new Set(clean(implementedRaw));

    // Handle the special cases in page.tsx manually (jpg-to-png etc)
    const specialCases = ['jpg-to-png', 'png-to-jpg', 'csv-to-json', 'json-to-csv'];
    specialCases.forEach(s => implementedSlugs.add(s));

    const missing = [...definedSlugs].filter(s => !implementedSlugs.has(s));

    console.log(`Defined Tools: ${definedSlugs.size}`);
    console.log(`Implemented Tools: ${implementedSlugs.size}`);
    console.log(`Missing Implementations: ${missing.length}`);

    if (missing.length > 0) {
        console.log('Top 20 Missing:');
        missing.slice(0, 20).forEach(s => console.log(s));
    }

} catch (e) {
    console.error('Error reading files:', e.message);
}
