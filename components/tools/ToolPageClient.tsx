'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home, MousePointer2, Keyboard, AlertCircle } from 'lucide-react';
import { Tool, slugifyCategory } from '@/lib/tools-config';
import AdUnit from '@/components/ads/AdUnit';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ToolFeedback from '@/components/tools/ToolFeedback';

interface ToolPageClientProps {
    tool: Tool;
    slug: string;
    children?: React.ReactNode;
}

export default function ToolPageClient({ tool, children }: ToolPageClientProps) {
    return (
        <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Link>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <Link href={`/category/${slugifyCategory(tool.category)}`} className="hover:text-primary transition-colors truncate">
                    {tool.category}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-foreground font-medium truncate">{tool.title}</span>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 sm:space-y-4"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">{tool.title}</h1>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[700px]">{tool.description}</p>
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
                className="my-6 sm:my-8 min-h-[80px] sm:min-h-[100px] bg-muted/10 rounded-xl flex items-center justify-center border border-dashed border-muted-foreground/20"
            />

            {/* Compatibility Overlay for Touch Devices */}
            <CompatibilityMessage tool={tool} />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 sm:mt-8 bg-card rounded-xl sm:rounded-2xl border shadow-sm p-3 sm:p-4 md:p-6 overflow-hidden relative"
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
                <article className="mt-16 prose prose-slate dark:prose-invert max-w-none p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-muted/20 border border-primary/5">
                    <h2 className="text-2xl sm:text-3xl font-black mb-8">About {tool.title}</h2>
                    <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg font-medium">
                        {tool.longDescription.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph.trim()}</p>
                        ))}
                    </div>
                </article>
            )}

            {/* User Feedback Mechanism */}
            <ToolFeedback toolTitle={tool.title} />

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
