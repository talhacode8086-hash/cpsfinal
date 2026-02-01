import { MetadataRoute } from 'next';
export const dynamic = 'force-static';
import { tools, Tool, slugifyCategory } from '@/lib/tools-config';
import { blogPosts } from '@/lib/blog-config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.assetstoolshub.com';

    // Static pages
    const routes = [
        '',
        '/explore',
        '/blog',
        '/pro',  // Premium Page
        '/about',
        '/contact',
        '/privacy-policy',
        '/terms-of-service',
        '/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Tool pages
    const toolPages = tools.map((tool: Tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Blog pages
    const blogPageUrls = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date().toISOString(), // In a real app, use post.updatedAt
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Category pages
    const categories = Array.from(new Set(tools.map(t => t.category)));
    const categoryPages = categories.map((category) => {
        const categorySlug = slugifyCategory(category);
        return {
            url: `${baseUrl}/category/${categorySlug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        };
    });

    // Add "all" category
    categoryPages.push({
        url: `${baseUrl}/category/all`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    });

    return [...routes, ...toolPages, ...blogPageUrls, ...categoryPages];
}
