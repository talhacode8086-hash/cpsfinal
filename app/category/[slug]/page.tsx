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
        `Explore our collection of free online ${categoryName.toLowerCase()} tools. Professional utilities for gamers, developers, and creators. ${categoryTools.length} tools available.`;

    return {
        title: `${categoryName} - Free Online Tools | Assets Tools Hub`,
        description,
        keywords: categoryTools.flatMap(t => t.keywords || []).slice(0, 20),
        openGraph: {
            title: `${categoryName} - Professional Free Tools`,
            description,
            type: 'website',
            url: `https://assetstoolshub.com/category/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${categoryName} Tools`,
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

    return <CategoryPageClient slug={slug} categoryTools={displayedTools} categoryName={categoryName} />;
}
