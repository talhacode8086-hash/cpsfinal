'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, CheckCircle2, ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyClient() {
    return (
        <div className="mx-auto max-w-4xl space-y-16 py-16 px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors flex items-center">
                    <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">Privacy Policy</span>
            </nav>

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
            >
                <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-glow mb-8">
                    <Shield className="h-10 w-10" />
                </div>
                <h1 className="text-5xl font-black tracking-tight md:text-6xl text-foreground">
                    Privacy <span className="text-primary italic">Policy</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                    Your privacy is our top priority. We've built our tools to be
                    completely transparent and secure by default.
                </p>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest pt-4">
                    Last Updated: February 2026
                </div>
            </motion.section>

            <div className="grid gap-12 pt-8">
                <section className="space-y-4">
                    <h2 className="text-2xl font-black flex items-center gap-3">
                        <Lock className="h-6 w-6 text-primary" /> Local Processing
                    </h2>
                    <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-4">
                        <p className="text-lg leading-relaxed text-foreground/80 font-medium">
                            The most important thing to know: **We do not send your data to any server.**
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Images are processed entirely in your browser using the Canvas API.",
                                "Data conversion (JSON/CSV/XML) happens locally on your machine.",
                                "Passwords are generated using cryptographically secure browser APIs.",
                                "No files, text, or sensitive data ever leave your computer."
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 items-start text-sm text-muted-foreground font-semibold">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black">Information Collection</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        Since our tools operate locally, we do not require user accounts or personal information.
                        We use minimal, anonymized analytics to improve the user experience and detect technical bugs.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Card small title="No Accounts" content="Use all 170+ tools without ever creating an account or providing an email address." />
                        <Card small title="No Cookies" content="We don't use tracking cookies to follow your activity across other websites." />
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black">Third-Party Services</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        Our website may contain links to other sites. Please be aware that we are not responsible for the content
                        or privacy practices of such other sites. We encourage our users to be aware when they leave our site
                        and to read the privacy statements of any other site that collects personally identifiable information.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-black">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">
                        If you have any questions about this Privacy Policy, please contact us at support@assetstoolshub.com.
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

function Card({ title, content, small }: { title: string, content: string, small?: boolean }) {
    return (
        <div className={cn(
            "p-8 rounded-[2rem] bg-muted/20 border border-primary/5 space-y-2 hover:bg-muted/30 transition-colors",
            small ? "p-6" : ""
        )}>
            <h4 className="font-black uppercase tracking-widest text-xs text-primary">{title}</h4>
            <p className="text-sm font-semibold text-muted-foreground leading-relaxed">{content}</p>
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
