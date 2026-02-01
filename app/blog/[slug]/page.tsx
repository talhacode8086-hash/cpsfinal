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

    const title = `${post.title} | Assets Tools Blog`;
    const description = post.description || `Read about ${post.title} on the Assets Tools Hub blog. Expert insights and guides for gaming, dev, and more.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [post.image],
            type: 'article',
            siteName: 'Assets Tools Hub',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
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
                                "name": "Blog",
                                "item": "https://www.assetstoolshub.com/blog"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": post.title,
                                "item": `https://www.assetstoolshub.com/blog/${post.slug}`
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
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.description,
                        "image": post.image,
                        "author": {
                            "@type": "Organization",
                            "name": "Assets Tools Hub"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Assets Tools Hub",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.assetstoolshub.com/logo.png"
                            }
                        },
                        "datePublished": "2024-01-20T08:00:00+08:00", // Placeholder, ideally should be in post data
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.assetstoolshub.com/blog/${post.slug}`
                        }
                    })
                }}
            />
            <BlogClient post={post} />
        </>
    );
}
