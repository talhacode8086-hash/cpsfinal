'use client';

import { motion } from 'framer-motion';
import { Scale, CheckCircle2, ChevronRight, Home, Gavel, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function TermsOfService() {
    return (
        <div className="mx-auto max-w-4xl space-y-16 py-16 px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">Terms of Service</span>
            </nav>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-glow mb-8">
                    <Gavel className="h-10 w-10" />
                </div>
                <h1 className="text-5xl font-black tracking-tight md:text-6xl text-foreground">
                    Terms of <span className="text-primary italic">Service</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    By using our tools, you agree to the following terms. We keep it simple
                    so you can get back to what matters.
                </p>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest pt-4">
                    Last Updated: January 2026
                </div>
            </motion.section>

            <div className="grid gap-12 pt-8">
                <section className="space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-primary" /> Usage Rights
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        All tools provided on this website are free for personal and commercial use.
                        You may use the outputs (images, data, etc.) for any purpose without attribution.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-orange-500" /> Limitations & Liability
                    </h2>
                    <div className="p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/10 space-y-4">
                        <p className="text-lg leading-relaxed text-foreground/80 font-medium">
                            **Disclaimer of Warranties:**
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Tools are provided 'as is' without any warranty of any kind.",
                                "We are not responsible for any data loss or errors in conversion.",
                                "Users are encouraged to verify critical outputs before production use.",
                                "We do not guarantee 100% uptime, though we strive for maximum availability."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground font-semibold">
                                    <div className="h-5 w-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="h-2 w-2 rounded-full bg-orange-500" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black">Prohibited Conduct</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        Users agree not to attempt to disrupt the website, reverse-engineer proprietary logic,
                        or use the tools for any illegal purposes. Automation of tools via scripts
                        without permission is prohibited.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black">Modification of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        We reserve the right to update these terms at any time. Continued use of the service
                        indicates acceptance of the latest terms.
                    </p>
                </section>
            </div>

            <div className="pt-16 border-t">
                <Link href="/">
                    <Button variant="outline" className="rounded-full px-8 h-12 font-bold group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Tools
                    </Button>
                </Link>
            </div>
        </div>
    );
}

function ArrowLeft(props: any) {
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    );
}
