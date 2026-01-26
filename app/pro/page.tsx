'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ShieldCheck, Zap, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/layout/ScrollReveal';

export default function ProPage() {
    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-neutral-950 text-white">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-0 left-0"
                >
                    <Link href="/">
                        <Button variant="ghost" className="text-neutral-400 hover:text-white transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold tracking-widest uppercase text-neutral-300">VIP Ultimate Experience</span>
                </motion.div>

                {/* Main Heading with Animation */}
                <div className="relative mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
                    >
                        ToolsHub <span className="text-primary italic">PRO</span>
                    </motion.h1>

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                        className="absolute -top-6 -right-12 hidden md:block"
                    >
                        <div className="relative">
                            <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                            <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
                        </div>
                    </motion.div>
                </div>

                {/* Animated Coming Soon Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-4 mb-12"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/20" />
                        <motion.span
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [0.98, 1, 0.98]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-white"
                        >
                            Coming Soon
                        </motion.span>
                        <span className="h-px w-8 bg-white/20" />
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-2xl text-neutral-400 text-lg md:text-xl leading-relaxed mb-12"
                >
                    We're building the most powerful toolkit ecosystem for professionals.
                    Get ready for exclusive features, zero ads, and ultra-fast performance.
                </motion.p>

                {/* Features Preview */}
                <ScrollReveal
                    delay={0.8}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
                >
                    {[
                        { icon: Zap, title: "Elite Speed", desc: "No delays, no limits." },
                        { icon: ShieldCheck, title: "Privacy First", desc: "Encrypted & secure." },
                        { icon: Star, title: "Pro Tools", desc: "Exclusive utilities." }
                    ].map((feature, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group hover:bg-white/[0.08] transition-all hover:border-primary/50">
                            <feature.icon className="w-8 h-8 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                            <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                            <p className="text-neutral-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </ScrollReveal>

                {/* Waitlist Form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full max-w-md bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-2xl flex"
                >
                    <input
                        type="email"
                        placeholder="Enter your email for early access"
                        className="bg-transparent border-none focus:ring-0 text-white placeholder:text-neutral-500 flex-1 px-6 outline-none"
                    />
                    <Button className="rounded-xl px-8 bg-white text-black hover:bg-neutral-200 transition-colors font-bold whitespace-nowrap">
                        Notify Me
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 text-sm text-neutral-500"
                >
                    Join 1,200+ pros on the waitlist. 🚀
                </motion.p>
            </div>
        </div>
    );
}
