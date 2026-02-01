import { tools } from '@/lib/tools-config';
import CategoryPageClient from '@/components/tools/CategoryPageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Tools - Professional Online Toolkit | Assets Tools Hub',
    description: 'Browse our complete collection of 170+ free professional online tools for gamers, developers, and creators.',
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
