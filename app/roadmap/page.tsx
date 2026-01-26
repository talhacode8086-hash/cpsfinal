'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, CheckCircle2, Circle, Clock,
    ChevronRight, ThumbsUp, MessageSquare,
    Sparkles, PlusCircle, ArrowRight, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoadmapItem {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned' | 'backlog';
    votes: number;
    category: string;
    quarter: string;
}

const initialRoadmap: RoadmapItem[] = [
    {
        id: 1,
        title: "SEO Suite Expansion",
        description: "Adding Sitemap generator, Schema markup tool, and Keyword density analyzer.",
        status: 'completed',
        votes: 342,
        category: 'SEO',
        quarter: 'Q4 2025'
    },
    {
        id: 2,
        title: "AI Math Solver",
        description: "Advanced AI-powered step-by-step problem solver for complex equations.",
        status: 'in-progress',
        votes: 856,
        category: 'Productivity',
        quarter: 'Q1 2026'
    },
    {
        id: 3,
        title: "Screen Recorder & Editor",
        description: "Lightweight browser-based screen recording with basic trimming and export.",
        status: 'planned',
        votes: 1240,
        category: 'Utilities',
        quarter: 'Q1 2026'
    },
    {
        id: 4,
        title: "System Latency Tester",
        description: "Hardware-level input lag measurement for competitive gamers.",
        status: 'backlog',
        votes: 567,
        category: 'Gaming',
        quarter: 'Q2 2026'
    },
    {
        id: 5,
        title: "Collaborative JSON Editor",
        description: "Real-time JSON editing with peer-to-peer sharing and version control.",
        status: 'backlog',
        votes: 211,
        category: 'Developer',
        quarter: 'Q2 2026'
    }
];

export default function RoadmapPage() {
    const [items, setItems] = useState<RoadmapItem[]>(initialRoadmap);
    const [votedItems, setVotedItems] = useState<number[]>([]);

    const handleVote = (id: number) => {
        if (votedItems.includes(id)) return;

        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, votes: item.votes + 1 } : item
        ));
        setVotedItems(prev => [...prev, id]);
    };

    const statusConfig = {
        completed: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Completed' },
        'in-progress': { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'In Progress' },
        planned: { icon: Circle, color: 'text-primary', bg: 'bg-primary/10', label: 'Planned' },
        backlog: { icon: Circle, color: 'text-muted-foreground', bg: 'bg-muted/10', label: 'Backlog' }
    };

    return (
        <div className="space-y-12 pb-20 overflow-hidden">
            {/* Header */}
            <section className="text-center space-y-4 pt-10 relative">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full scale-150" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
                >
                    <Star className="w-3 h-3 fill-current" />
                    Interactive Roadmap
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
                >
                    Building the <span className="text-primary">Future</span> of Tools.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg max-w-2xl mx-auto"
                >
                    We're constantly evolving. See what’s coming next, vote for your
                    favorite features, and help us shape the platform.
                </motion.p>
            </section>

            {/* Timeline Sections */}
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Active Projects */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Active & Planned</h2>
                            <p className="text-sm text-muted-foreground">What we're currently working on.</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative">
                        <div className="absolute left-6 top-8 bottom-8 w-px bg-border -z-10" />
                        {items.filter(i => i.status !== 'backlog').map((item, index) => {
                            const StatusIcon = statusConfig[item.status].icon;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative pl-14"
                                >
                                    <div className={`absolute left-0 top-1 p-3 rounded-full border bg-background z-10 ${statusConfig[item.status].color}`}>
                                        <StatusIcon className="h-4 w-4" />
                                    </div>
                                    <Card className="hover:shadow-md transition-shadow">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <Badge variant="secondary" className={`${statusConfig[item.status].bg} ${statusConfig[item.status].color} border-none`}>
                                                    {statusConfig[item.status].label}
                                                </Badge>
                                                <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded bg-muted">
                                                    {item.quarter}
                                                </span>
                                            </div>
                                            <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                                            <CardDescription>{item.description}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="pt-0 flex justify-between items-center text-sm font-medium">
                                            <span className="text-primary">{item.category}</span>
                                            <div className="flex gap-4 text-muted-foreground">
                                                <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {item.votes}</span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Voting Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <ThumbsUp className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Vote for Next Tools</h2>
                            <p className="text-sm text-muted-foreground">Help us prioritize our backlog.</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {items.filter(i => i.status === 'backlog').map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Card className="group transition-all hover:bg-muted/30">
                                    <div className="p-6 flex items-center gap-6">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg">{item.title}</h3>
                                                <Badge variant="outline" className="text-[10px] h-4">{item.category}</Badge>
                                            </div>
                                            <p className="text-muted-foreground text-sm">{item.description}</p>
                                        </div>

                                        <Button
                                            onClick={() => handleVote(item.id)}
                                            disabled={votedItems.includes(item.id)}
                                            className={`rounded-xl h-14 flex flex-col items-center justify-center px-4 min-w-[80px] transition-all group-active:scale-95 ${votedItems.includes(item.id)
                                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                                }`}
                                            variant="outline"
                                        >
                                            <span className="text-lg font-bold">{item.votes}</span>
                                            <span className="text-[10px] uppercase font-bold">Votes</span>
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}

                        {/* Drop a Suggestion */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-8 p-8 rounded-3xl bg-neutral-900 text-white border border-white/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 bg-primary/20 blur-[60px] -z-10" />
                            <div className="relative z-10 space-y-6">
                                <div className="space-y-2 text-center md:text-left">
                                    <h3 className="text-2xl font-bold">Got a Tool Idea?</h3>
                                    <p className="text-neutral-400">If you don't see what you need, suggest it here!</p>
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="e.g. Bulk URL Shortener"
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-1 outline-none focus:border-primary transition-colors text-sm"
                                    />
                                    <Button className="bg-white text-black hover:bg-neutral-200 font-bold rounded-xl px-6">
                                        Suggest Tool
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Zap(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 14.71 12 2.13a.35.35 0 0 1 .62.24v9.63l7.38-2.71a.35.35 0 0 1 .47.45l-8.47 12.13a.35.35 0 0 1-.62-.24v-9.63l-7.38 2.71a.35.35 0 0 1-.47-.45z" />
        </svg>
    )
}
