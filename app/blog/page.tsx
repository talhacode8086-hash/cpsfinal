'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { blogPosts } from '@/lib/blog-config';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Rss } from 'lucide-react';

export default function BlogListing() {
    return (
        <div className="space-y-12 pb-20">
            <section className="text-center space-y-4 py-12 border-b">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                    <Rss className="h-3 w-3" />
                    Our Blog
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">Latest <span className="text-primary italic">Guides & Tips.</span></h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Expert advice on gaming, productivity, and technical optimization to help you get the most out of our tools.
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/blog/${post.slug}`}>
                            <Card className="group h-full flex flex-col overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-all hover:shadow-2xl hover:-translate-y-2">
                                <div className="aspect-video relative overflow-hidden bg-zinc-200">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <CardHeader className="flex-1">
                                    <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-3 w-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <User className="h-3 w-3" />
                                            {post.author}
                                        </div>
                                    </div>
                                    <CardTitle className="group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 text-sm mt-2">
                                        {post.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center text-sm font-bold text-primary gap-2 group-hover:gap-4 transition-all">
                                        Read Article
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
