'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home, MousePointer2, Keyboard, AlertCircle } from 'lucide-react';
import { Tool, slugifyCategory } from '@/lib/tools-config';
import AdUnit from '@/components/ads/AdUnit';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ToolPageClientProps {
    tool: Tool;
    slug: string;
    children?: React.ReactNode;
}

export default function ToolPageClient({ tool, children }: ToolPageClientProps) {
    return (
        <div className="mx-auto max-w-5xl space-y-8 py-8 px-4 sm:px-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href={`/category/${slugifyCategory(tool.category)}`} className="hover:text-primary transition-colors">
                    {tool.category}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{tool.title}</span>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">{tool.title}</h1>
                        <p className="text-lg text-muted-foreground max-w-[700px]">{tool.description}</p>
                    </div>
                    <Link href={`/category/${slugifyCategory(tool.category)}`}>
                        <motion.div whileHover={{ x: -4 }} className="hidden sm:flex items-center text-sm font-medium text-primary cursor-pointer">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {tool.category}
                        </motion.div>
                    </Link>
                </div>
            </motion.div>

            {/* Top Ad Unit */}
            <AdUnit
                publisherId="ca-pub-0000000000000000"
                slotId="0000000000"
                className="my-8 min-h-[100px] bg-muted/10 rounded-xl flex items-center justify-center border border-dashed border-muted-foreground/20"
            />

            {/* Compatibility Overlay for Touch Devices */}
            <CompatibilityMessage tool={tool} />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 bg-card rounded-2xl border shadow-sm p-1 sm:p-4 overflow-hidden relative"
            >
                {children ? (
                    <div className={tool.requires ? "hidden md:block" : ""}>
                        {children}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed p-20 text-center text-muted-foreground">
                        Tool implementation coming soon...
                    </div>
                )}

                {/* Visual placeholder for mobile users when the actual tool is hidden */}
                {tool.requires && (
                    <div className="md:hidden py-20 text-center space-y-4">
                        <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            {tool.requires.includes('mouse') ? <MousePointer2 className="h-8 w-8 text-muted-foreground" /> : <Keyboard className="h-8 w-8 text-muted-foreground" />}
                        </div>
                        <p className="text-muted-foreground font-medium px-4">This tool is optimized for desktop use.</p>
                    </div>
                )}
            </motion.div>

            {/* SEO Content Section */}
            {tool.longDescription && (
                <article className="mt-16 prose prose-slate dark:prose-invert max-w-none p-8 rounded-[2.5rem] bg-muted/20 border border-primary/5">
                    <h2 className="text-2xl font-black mb-6">About {tool.title}</h2>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                        {tool.longDescription}
                    </div>
                </article>
            )}

            {/* Bottom Ad Unit */}
            <AdUnit
                publisherId="ca-pub-0000000000000000"
                slotId="0000000000"
                className="mt-16 min-h-[250px] bg-muted/10 rounded-xl flex items-center justify-center border border-dashed border-muted-foreground/20"
            />
        </div>
    );
}

function CompatibilityMessage({ tool }: { tool: Tool }) {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    if (!isTouch || !tool.requires) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex flex-col sm:flex-row items-center gap-6"
        >
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                <AlertCircle className="h-7 w-7" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-amber-700">Desktop Recommended</h3>
                <p className="text-sm text-amber-600/80 font-medium leading-relaxed">
                    This tool requires a {tool.requires.join(' or ')} for the best experience.
                    Some features may not work correctly on touch devices.
                </p>
            </div>
            <Link href="/" className="sm:ml-auto">
                <Button variant="outline" size="sm" className="rounded-full border-amber-500/20 hover:bg-amber-500/5 text-amber-700">
                    Find Mobile Tools
                </Button>
            </Link>
        </motion.div>
    );
}
