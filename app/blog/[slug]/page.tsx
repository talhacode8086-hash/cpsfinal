import React from 'react';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-config';
import { Metadata } from 'next';
import BlogClient from '@/components/blog/BlogClient';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

interface Params {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    return {
        title: `${post.title} - Assets Tools Blog`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: [post.image],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({ params }: Params) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    return <BlogClient post={post} />;
}
