import { notFound } from 'next/navigation';
import { tools, slugifyCategory } from '@/lib/tools-config';
import { Metadata } from 'next';
import CategoryPageClient from '@/components/tools/CategoryPageClient';

export async function generateStaticParams() {
    const categories = Array.from(new Set(tools.map(t => slugifyCategory(t.category))));
    return [
        ...categories.map(slug => ({ slug })),
        { slug: 'all' },
        { slug: 'dev' },
        { slug: 'productivity' }
    ];
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const lowerSlug = slug.toLowerCase();

    const categoryTools = tools.filter(t => {
        const catSlug = slugifyCategory(t.category);
        return catSlug === lowerSlug ||
            catSlug.startsWith(lowerSlug) ||
            lowerSlug.startsWith(catSlug) ||
            (lowerSlug === 'dev' && catSlug === 'development-tools') ||
            (lowerSlug === 'productivity' && (catSlug === 'daily-tools' || catSlug === 'text-tools'));
    });

    if (categoryTools.length === 0 && slug !== 'all') {
        return { title: 'Category Not Found' };
    }

    const categoryName = categoryTools.length > 0 ? categoryTools[0].category : 'All Tools';

    // Enhanced category-specific descriptions
    const categoryDescriptions: Record<string, string> = {
        'gaming': 'Professional gaming tools including mouse sensitivity converters, CPS tests, aim trainers, reaction time tests, and keyboard testing utilities. Improve your FPS performance.',
        'gaming-utilities': 'Essential gaming utilities: DPI calculators, FOV calculators, sensitivity converters, input lag testers, and crosshair generators for competitive gaming.',
        'productivity': 'Boost your productivity with time management tools, calculators, text processors, and automation utilities. Free and easy to use.',
        'dev': 'Developer tools including JSON formatters, regex testers, code minifiers, API testing utilities, and syntax validators. Essential for web development.',
        'all': 'Browse all 170+ free online tools across gaming, development, productivity, design, finance, education, and more categories.'
    };

    const description = categoryDescriptions[lowerSlug] ||
        `Explore our collection of free online ${categoryName.toLowerCase().endsWith('tools') ? categoryName.toLowerCase() : categoryName.toLowerCase() + ' tools'}. Professional utilities for gamers, developers, and creators. ${categoryTools.length} tools available.`;

    const displayCategory = categoryName.toLowerCase().endsWith('tools') ? categoryName : `${categoryName} Tools`;

    return {
        title: `${displayCategory} - Free Online Tools | Assets Tools Hub`,
        description,
        keywords: categoryTools.flatMap(t => t.keywords || []).slice(0, 20),
        openGraph: {
            title: `${displayCategory} - Professional Free Tools`,
            description,
            type: 'website',
            url: `https://www.assetstoolshub.com/category/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: displayCategory,
            description,
        }
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const lowerSlug = slug.toLowerCase();

    const categoryTools = tools.filter(t => {
        const catSlug = slugifyCategory(t.category);
        return catSlug === lowerSlug ||
            catSlug.startsWith(lowerSlug) ||
            lowerSlug.startsWith(catSlug) ||
            (lowerSlug === 'dev' && catSlug === 'development-tools') ||
            (lowerSlug === 'productivity' && (catSlug === 'daily-tools' || catSlug === 'text-tools'));
    });

    if (categoryTools.length === 0 && slug !== 'all') {
        notFound();
    }

    const categoryName = categoryTools.length > 0 ? categoryTools[0].category : 'All Tools';
    const displayedTools = slug === 'all' ? tools : categoryTools;

    const categoryDescriptions: Record<string, string> = {
        'gaming': 'Professional gaming tools including mouse sensitivity converters, CPS tests, aim trainers, reaction time tests, and keyboard testing utilities. Improve your FPS performance.',
        'gaming-utilities': 'Essential gaming utilities: DPI calculators, FOV calculators, sensitivity converters, input lag testers, and crosshair generators for competitive gaming.',
        'productivity': 'Boost your productivity with time management tools, calculators, text processors, and automation utilities. Free and easy to use.',
        'dev': 'Developer tools including JSON formatters, regex testers, code minifiers, API testing utilities, and syntax validators. Essential for web development.',
        'all': 'Browse all 170+ free online tools across gaming, development, productivity, design, finance, education, and more categories.'
    };

    const description = categoryDescriptions[lowerSlug] ||
        `Explore our collection of free online ${categoryName.toLowerCase().endsWith('tools') ? categoryName.toLowerCase() : categoryName.toLowerCase() + ' tools'}. Professional utilities for gamers, developers, and creators. ${categoryTools.length} tools available.`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "All Tools",
                                "item": "https://www.assetstoolshub.com/explore"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": categoryName,
                                "item": `https://www.assetstoolshub.com/category/${slug}`
                            }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": `${categoryName.toLowerCase().endsWith('tools') ? categoryName : categoryName + ' Tools'} - Assets Tools Hub`,
                        "description": description,
                        "url": `https://www.assetstoolshub.com/category/${slug}`,
                        "mainEntity": {
                            "@type": "ItemList",
                            "itemListElement": displayedTools.slice(0, 10).map((tool: any, index: number) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "url": `https://www.assetstoolshub.com/tools/${tool.slug}`,
                                "name": tool.title
                            }))
                        }
                    })
                }}
            />
            <CategoryPageClient slug={slug} categoryTools={displayedTools} categoryName={categoryName} />
        </>
    );
}
