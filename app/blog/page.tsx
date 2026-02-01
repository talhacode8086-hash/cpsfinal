import React from 'react';
import { Metadata } from 'next';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const metadata: Metadata = {
    title: 'Expert Guides & Gaming Tips | Assets Tools Hub Blog',
    description: 'Master your tools with our expert guides. From optimizing your mouse sensitivity to understanding complex development workflows, our blog covers it all.',
};

export default function BlogListing() {
    return <BlogListingClient />;
}
