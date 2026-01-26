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

    return {
        title: `${categoryName} - Assets Tools Hub`,
        description: `Explore our collection of free online ${categoryName.toLowerCase()}. Professional tools for gamers, developers, and designers.`,
        openGraph: {
            title: `${categoryName} Portfolio`,
            description: `Best ${categoryName.toLowerCase()} available for free.`,
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
