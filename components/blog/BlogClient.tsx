'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Twitter, Link as LinkIcon, ChevronRight, Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { BlogPost, blogPosts } from '@/lib/blog-config';
import { calculateReadingTime, generateTOC } from '@/lib/blog-utils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BlogClientProps {
    post: BlogPost;
}

// Animation Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 100, damping: 12 }
    },
};

const cardVariants = {
    hover: {
        y: -12,
        scale: 1.02,
        transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
    }
};

export default function BlogClient({ post }: BlogClientProps) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    const [activeHeading, setActiveHeading] = useState<string>('');
    const readingTime = useMemo(() => calculateReadingTime(post.content), [post.content]);
    const toc = useMemo(() => generateTOC(post.content), [post.content]);

    const relatedPosts = useMemo(() => {
        return blogPosts
            .filter(p => p.slug !== post.slug && (p.category === post.category || p.author === post.author))
            .slice(0, 3);
    }, [post]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0% -80% 0%' }
        );

        document.querySelectorAll('h2, h3, h4').forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, []);

    const copyLink = () => {
        navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
        toast.success('Link copied to clipboard!');
    };

    // Helper to extract text from nested React children (like links in headings)
    const getTextFromChildren = (children: any): string => {
        return React.Children.toArray(children).map(child => {
            if (typeof child === 'string' || typeof child === 'number') return child.toString();
            if (React.isValidElement(child) && (child.props as any).children) {
                return getTextFromChildren((child.props as any).children);
            }
            return '';
        }).join('');
    };

    const getHeadingId = (children: any) => {
        const text = getTextFromChildren(children);
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .trim();
    };

    return (
        <div className="relative min-h-screen bg-background pb-24 selection:bg-primary/20">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col lg:flex-row gap-16 relative">

                    {/* Left Sidebar */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="sticky top-24 space-y-12"
                        >
                            <Link href="/blog">
                                <Button variant="ghost" className="group rounded-2xl h-12 w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all">
                                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Back to Articles
                                </Button>
                            </Link>

                            {toc.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 px-2">Table of Contents</h4>
                                    <nav className="space-y-1">
                                        {toc.map((item, idx) => (
                                            <motion.a
                                                key={item.id}
                                                href={`#${item.id}`}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + idx * 0.05 }}
                                                className={cn(
                                                    "block px-3 py-2 text-sm font-bold rounded-xl transition-all border-l-2",
                                                    activeHeading === item.id
                                                        ? "bg-primary/5 text-primary border-primary translate-x-2"
                                                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/50"
                                                )}
                                                style={{ marginLeft: `${(item.level - 2) * 16}px` }}
                                            >
                                                {item.title}
                                            </motion.a>
                                        ))}
                                    </nav>
                                </div>
                            )}


                        </motion.div>
                    </aside>

                    {/* Main Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex-1 max-w-4xl space-y-12"
                    >
                        {/* Header Section */}
                        <header className="space-y-8">
                            <motion.div variants={itemVariants} className="flex items-center gap-4">
                                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground/60 tracking-widest uppercase">
                                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1.5 text-primary/80"><Clock className="h-3 w-3" /> {readingTime} MIN READ</span>
                                </div>
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] text-balance"
                            >
                                {post.title}
                            </motion.h1>

                            <motion.div
                                variants={itemVariants}
                                className="aspect-[21/9] rounded-[3.5rem] overflow-hidden bg-muted border-4 border-primary/10 shadow-inner group relative"
                            >
                                <motion.img
                                    style={{ scale: imageScale, opacity: imageOpacity }}
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40" />
                            </motion.div>
                        </header>

                        {/* Article Body */}
                        <motion.article
                            variants={itemVariants}
                            className="prose prose-zinc dark:prose-invert max-w-none prose-lg md:prose-xl prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground prose-p:leading-relaxed prose-p:text-muted-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:p-8 prose-blockquote:rounded-[2.5rem] prose-blockquote:font-bold prose-blockquote:italic prose-img:rounded-[2.5rem] prose-img:border-2 prose-img:border-primary/5"
                        >
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }: any) => (
                                        <motion.h2
                                            id={getHeadingId(props.children)}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            {...props}
                                            className="text-4xl md:text-5xl mt-20 mb-10 group flex items-center gap-4 scroll-mt-24"
                                        >
                                            <span className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">#</span>
                                            {props.children}
                                            <span className="h-0.5 flex-1 bg-gradient-to-r from-primary/20 to-transparent rounded-full" />
                                        </motion.h2>
                                    ),
                                    h3: ({ node, ...props }: any) => (
                                        <motion.h3
                                            id={getHeadingId(props.children)}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            {...props}
                                            className="text-2xl md:text-3xl mt-14 mb-8 border-l-4 border-primary pl-8 scroll-mt-24"
                                        >
                                            {props.children}
                                        </motion.h3>
                                    ),
                                    h4: ({ node, ...props }: any) => (
                                        <h4 id={getHeadingId(props.children)} {...props} className="text-xl md:text-2xl mt-12 mb-6 font-black tracking-tight text-foreground/80 scroll-mt-24">
                                            {props.children}
                                        </h4>
                                    ),
                                    p: ({ node, ...props }: any) => (
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-20px" }}
                                            className="mb-8 leading-relaxed text-muted-foreground/90"
                                            {...props}
                                        />
                                    ),
                                    img: ({ node, ...props }: any) => (
                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="block my-20"
                                        >
                                            <img
                                                {...props}
                                                className="rounded-[3rem] border-8 border-white dark:border-zinc-900 shadow-3xl mx-auto w-full object-cover aspect-video"
                                                alt={props.alt || ''}
                                            />
                                            {props.alt && (
                                                <span className="block text-center text-xs font-black uppercase tracking-[0.5em] text-muted-foreground mt-8 opacity-40">
                                                    EXPLORE — {props.alt}
                                                </span>
                                            )}
                                        </motion.span>
                                    )
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </motion.article>

                        {/* Footer & Related Posts */}
                        <footer className="mt-32 pt-32 border-t space-y-24">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                            >
                                <div className="space-y-4">
                                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none">Stay Focused</h3>
                                    <p className="text-muted-foreground font-medium max-w-md text-lg">Deep dive into curated knowledge and master your performance toolkit.</p>
                                </div>
                                <Link href="/blog">
                                    <Button variant="outline" className="rounded-full px-10 h-14 font-black uppercase text-xs tracking-widest border-2 hover:bg-primary hover:text-white transition-all">Archive Access</Button>
                                </Link>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {relatedPosts.map((rp, idx) => (
                                    <motion.div
                                        key={rp.slug}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={`/blog/${rp.slug}`} className="block space-y-6">
                                            <div className="aspect-[4/3] rounded-[3.5rem] overflow-hidden border-2 border-primary/5 shadow-lg relative group">
                                                <img src={rp.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt={rp.title} />
                                                <div className="absolute top-6 left-6">
                                                    <span className="px-4 py-1.5 bg-black/60 backdrop-blur-xl text-white rounded-full text-[9px] font-black tracking-widest uppercase">
                                                        {rp.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-3 px-4">
                                                <h4 className="text-2xl font-black tracking-tight leading-tight">{rp.title}</h4>
                                                <div className="flex items-center gap-2 text-[11px] font-black text-primary uppercase">
                                                    READ ARTICLE <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="p-10 md:p-20 bg-zinc-950 text-white rounded-[5rem] text-center space-y-10 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_100%)] opacity-20" />
                                <motion.div
                                    animate={{ rotate: [12, -12, 12], y: [0, -10, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                    className="h-20 w-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-3xl shadow-primary/40 relative z-10"
                                >
                                    <Bookmark className="h-10 w-10 text-white" />
                                </motion.div>
                                <div className="space-y-6 relative z-10">
                                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-tight">Master Every Interaction</h3>
                                    <p className="text-white/40 font-medium text-lg max-w-2xl mx-auto leading-relaxed">Boost your daily performance with our suite of 100+ professional tools. No accounts, no fees, just raw utility.</p>
                                </div>
                                <div className="relative z-10">
                                    <Link href="/category/all">
                                        <Button className="h-18 rounded-3xl px-14 font-black uppercase text-sm tracking-widest shadow-2xl bg-white text-black hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">
                                            Access Full Toolkit <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </footer>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
