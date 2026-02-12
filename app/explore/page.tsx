import { tools } from '@/lib/tools-config';
import CategoryPageClient from '@/components/tools/CategoryPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Explore 300+ Free Online Tools | Assets Tools Hub',
    description: 'Browse our complete collection of 300+ professional tools for gaming, development, productivity, and SEO. Find exactly what you need in seconds.',
};

export default function ExplorePage() {
    return (
        <CategoryPageClient
            slug="all"
            categoryTools={tools}
            categoryName="All"
        />
    );
}
