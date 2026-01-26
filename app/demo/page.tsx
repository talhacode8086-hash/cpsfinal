'use client';

import { motion } from 'framer-motion';
import { Play, Shield, Zap, Sparkles, MonitorPlay, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DemoPage() {
    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
                >
                    <MonitorPlay className="w-4 h-4" />
                    Product Demonstration
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                    See ToolsHub in <span className="text-primary italic">Action.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground text-xl max-w-3xl mx-auto"
                >
                    Watch how our precision tools can transform your workflow.
                    From elite gaming diagnostics to advanced developer utilities.
                </motion.p>
            </section>

            {/* Video Player Placeholder */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group cursor-pointer"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent group-hover:opacity-100 opacity-60 transition-opacity" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="h-10 w-10 fill-current ml-1" />
                    </div>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="space-y-1">
                        <span className="text-primary font-bold text-sm tracking-widest uppercase">Overview</span>
                        <h3 className="text-2xl font-bold text-white">Platform Walkthrough 2026</h3>
                    </div>
                    <span className="text-white/60 font-medium">4:12</span>
                </div>

                {/* Grid Background Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            </motion.div>

            {/* Key Features Section */}
            <section className="container max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight">Why Pros Choose Us?</h2>
                    <div className="space-y-6">
                        {[
                            {
                                icon: Zap,
                                title: "Instant Performance",
                                desc: "Customized algorithms for precise gaming measurements and fast executions."
                            },
                            {
                                icon: Shield,
                                title: "Full Privacy",
                                desc: "No data collection. All tools run purely in your browser for 100% security."
                            },
                            {
                                icon: Sparkles,
                                title: "Premium UI/UX",
                                desc: "Designed with focus on usability and aesthetic excellence."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-4"
                            >
                                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg">{feature.title}</h4>
                                    <p className="text-muted-foreground">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="bg-muted/50 p-8 rounded-3xl border space-y-6">
                    <h3 className="text-xl font-bold">What's included in the demo?</h3>
                    <ul className="space-y-4">
                        {[
                            "Mouse Polling Rate testing walkthrough",
                            "Advanced SEO tag generation guide",
                            "JSON & Developer suite overview",
                            "Premium theme customization setup",
                            "Exclusive Pro tools sneak peek"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <Link href="/" className="block">
                        <Button className="w-full rounded-2xl h-14 text-lg font-bold group shadow-lg shadow-primary/20">
                            Explore All Tools
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
