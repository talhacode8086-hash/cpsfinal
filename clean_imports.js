
const fs = require('fs');
const path = require('path');

const componentsDir = 'f:/cps/components/tools';

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            walk(filepath, callback);
        } else if (stats.isFile() && file.endsWith('.tsx')) {
            callback(filepath);
        }
    });
}

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');

    // Find lucide-react imports
    const lucideImportRegex = /import\s+{([^}]+)}\s+from\s+['"]lucide-react['"];/;
    const match = content.match(lucideImportRegex);

    if (match) {
        const imports = match[1].split(',').map(s => s.trim());
        const originalImports = [...imports];

        // Check usage for each import
        const usedImports = imports.filter(imp => {
            // Simple check: is the import name used elsewhere in the file?
            // We strip the import line to avoid self-match
            const contentWithoutImport = content.replace(lucideImportRegex, '');
            // Regex to find whole word usage
            const usageRegex = new RegExp(`\\b${imp}\\b`);
            return usageRegex.test(contentWithoutImport);
        });

        if (usedImports.length < originalImports.length) {
            console.log(`Cleaning ${filepath}: Removing [${originalImports.filter(x => !usedImports.includes(x)).join(', ')}]`);

            if (usedImports.length === 0) {
                // Remove entire import line
                content = content.replace(lucideImportRegex, '');
            } else {
                // Update import line
                const newImportLine = `import { ${usedImports.join(', ')} } from 'lucide-react';`;
                content = content.replace(lucideImportRegex, newImportLine);
            }

            fs.writeFileSync(filepath, content, 'utf8');
        }
    }
}

walk(componentsDir, processFile);
