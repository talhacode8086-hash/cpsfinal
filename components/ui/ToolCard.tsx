'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Braces } from 'lucide-react';

interface ToolCardProps {
    tool: {
        slug: string;
        title: string;
        description: string;
        category: string;
        iconName: string;
        requires?: string[];
    };
    iconMap: Record<string, any>;
    idx?: number;
}

export function ToolCard({ tool, iconMap, idx = 0 }: ToolCardProps) {
    const Icon = iconMap[tool.iconName] || Braces;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{
                delay: idx * 0.05,
                duration: 0.4,
                ease: 'easeOut',
                scale: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }
            }}
            className="h-full block"
        >
            <Link href={`/tools/${tool.slug}`} className="block h-full group">
                <Card className="h-full border-border/40 bg-background/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-colors duration-300 overflow-hidden relative">
                    <CardHeader className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                <Icon className="h-7 w-7" />
                            </div>
                            {tool.requires && tool.requires.length > 0 && (
                                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                                    Pro
                                </Badge>
                            )}
                        </div>

                        <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {tool.title}
                        </CardTitle>
                        <CardDescription className="text-xs font-semibold tracking-wider uppercase opacity-70">
                            {tool.category}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-8 pb-8">
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {tool.description}
                        </p>
                    </CardContent>

                    {/* Hover Line Animation */}
                    <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </Card>
            </Link>
        </motion.div>
    );
}
