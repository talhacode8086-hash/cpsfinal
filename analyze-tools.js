const fs = require('fs');

const toolsConfigPath = 'lib/tools-config.ts';
const pagePath = 'app/tools/[slug]/page.tsx';

try {
    const toolsConfig = fs.readFileSync(toolsConfigPath, 'utf-8');
    const pageContent = fs.readFileSync(pagePath, 'utf-8');

    // Extract defined slugs using regex
    const definedSlugs = [];
    const slugRegex = /slug:\s*'([^']+)'/g;
    let match;
    while ((match = slugRegex.exec(toolsConfig)) !== null) {
        definedSlugs.push(match[1]);
    }

    // Extract implemented keys from ToolComponents map
    const implementedKeys = [];
    // Look for the map definition
    const mapMatch = pageContent.match(/const ToolComponents: Record<string, any> = \{([\s\S]*?)\};/);
    if (mapMatch) {
        const mapContent = mapMatch[1];
        const keyRegex = /'([^']+)':/g;
        while ((match = keyRegex.exec(mapContent)) !== null) {
            implementedKeys.push(match[1]);
        }
    }

    // Add manual special cases
    if (pageContent.includes("if (slug === 'jpg-to-png')")) implementedKeys.push('jpg-to-png');
    if (pageContent.includes("if (slug === 'png-to-jpg')")) implementedKeys.push('png-to-jpg');
    if (pageContent.includes("if (slug === 'csv-to-json')")) implementedKeys.push('csv-to-json');
    if (pageContent.includes("if (slug === 'json-to-csv')")) implementedKeys.push('json-to-csv');

    const definedSet = new Set(definedSlugs);
    const implementedSet = new Set(implementedKeys);

    const missing = [...definedSet].filter(x => !implementedSet.has(x));

    console.log(`Defined Tools: ${definedSet.size}`);
    console.log(`Implemented Tools: ${implementedSet.size}`);
    console.log(`Missing Implementations: ${missing.length}`);

    if (missing.length > 0) {
        console.log('\nSample Missing Tools:');
        missing.slice(0, 10).forEach(s => console.log(s));
    }

} catch (e) {
    console.error('Error:', e.message);
}
