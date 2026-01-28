'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Tool } from '@/lib/tools-config';
import {
    Home, MousePointer2, Target, Zap, Activity, Crosshair, Keyboard, Clock,
    BarChart3, Mouse, MonitorPlay, Gamepad2, Type, KeyRound, Braces, Search,
    Globe, Scale, Ruler, FileCode, Share2, Palette, Layers, Code2, TrendingUp,
    CircleDollarSign, Box, Minimize2, Calculator, Monitor, Shuffle, LineChart,
    Flame, UnfoldHorizontal, Code, Bot, Tag, Percent, Timer, Calendar, Layout,
    QrCode, Eye, ChevronRight
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { ToolCard } from '@/components/ui/ToolCard';

const IconMap: Record<string, any> = {
    Home, MousePointer2, Target, Zap, Activity, Crosshair, Keyboard, Clock,
    BarChart3, Mouse, MonitorPlay, Gamepad2, Type, KeyRound, Braces, Search,
    Globe, Scale, Ruler, FileCode, Share2, Palette, Layers, Code2, TrendingUp,
    CircleDollarSign, Box, Minimize2, Calculator, Monitor, Shuffle, LineChart,
    Flame, UnfoldHorizontal, Code, Bot, Tag, Percent, Timer, Calendar, Layout,
    QrCode, Link: Globe, Eye
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};



interface CategoryPageClientProps {
    slug: string;
    categoryTools: Tool[];
    categoryName: string;
}

export default function CategoryPageClient({ categoryTools, categoryName }: CategoryPageClientProps) {
    return (
        <div className="mx-auto max-w-7xl space-y-8 sm:space-y-12 py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Element */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"
            />

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="space-y-6 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground/60 mb-4 sm:mb-6 bg-muted/30 w-fit px-3 py-1 sm:px-4 sm:py-1.5 rounded-full"
                >
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-primary">{categoryName}</span>
                </motion.div>

                <div className="space-y-3 sm:space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter text-foreground leading-none">
                        {categoryName} <span className="text-primary italic">Tools</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
                        Professional, high-performance {categoryName.toLowerCase()} designed to boost your efficiency.
                        Free to use, privacy-focused, and incredibly fast.
                    </p>
                </div>
            </motion.section>

            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10"
            >
                {categoryTools.map((tool, idx) => (
                    <ToolCard
                        key={tool.slug}
                        tool={tool}
                        iconMap={IconMap}
                        idx={idx}
                    />
                ))}
            </motion.section>
        </div>
    );
}
