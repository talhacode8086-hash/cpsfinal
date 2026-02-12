const { tools } = require('./lib/tools-config');

const slugs = tools.map(t => t.slug);
const uniqueSlugs = new Set(slugs);

if (slugs.length !== uniqueSlugs.size) {
    console.log('Duplicate slugs found!');
    const counts = {};
    slugs.forEach(s => counts[s] = (counts[s] || 0) + 1);
    Object.entries(counts).filter(([k, v]) => v > 1).forEach(([k, v]) => console.log(`${k}: ${v}`));
} else {
    console.log('No duplicate slugs found.');
    console.log(`Total tools: ${tools.length}`);
}

const categories = Array.from(new Set(tools.map(t => t.category)));
console.log('Categories:', categories);
