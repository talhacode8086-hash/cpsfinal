"use client"
import { motion } from 'framer-motion';
import { tools } from '@/lib/tools-config';
import { blogPosts } from '@/lib/blog-config';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Zap, Activity,
    Search as SearchIcon, Rocket,
    ArrowRight, Users, Globe2,
    Shield, Sparkles, Monitor,
    Shuffle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomeClient() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [randomTool, setRandomTool] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setRandomTool(tools[Math.floor(Math.random() * tools.length)]);
        setIsLoaded(true);
    }, []);

    const handleRandomTool = () => {
        if (randomTool) {
            router.push(`/tools/${randomTool.slug}`);
        }
    };

    const titleText = "Explore Our Powerful Toolkit";
    const titleWords = titleText.split(" ");

    const stats = [
        { label: "Active Tools", value: "170+", icon: Rocket },
        { label: "Daily Users", value: "50k+", icon: Users },
        { label: "Uptime", value: "99.9%", icon: Activity },
        { label: "Countries", value: "120+", icon: Globe2 },
    ];

    const features = [
        {
            title: "Blazing Fast",
            description: "Optimized for speed. No waiting, no loading screens. Just tools.",
            icon: Zap,
        },
        {
            title: "No Signup Required",
            description: "Jump straight into any tool without creating an account.",
            icon: Shield,
        },
        {
            title: "Premium Design",
            description: "Beautifully crafted interface for a seamless user experience.",
            icon: Sparkles,
        },
        {
            title: "Mobile Ready",
            description: "Full functionality on any device, from desktop to mobile.",
            icon: Monitor,
        },
    ];

    const faqs = [
        {
            question: "Are these tools really free?",
            answer: "Yes, all our tools are 100% free to use. No hidden costs or subscriptions required."
        },
        {
            question: "Do I need to create an account?",
            answer: "No, you can use any of our 170+ tools instantly without any sign-up or registration."
        },
        {
            question: "Can I use these tools on my phone?",
            answer: "Absolutely! Our platform is fully responsive and works perfectly on mobile, tablet, and desktop."
        },
        {
            question: "How often do you add new tools?",
            answer: "We are constantly expanding our toolkit. New tools are typically added every week based on user requests."
        }
    ];

    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative text-center space-y-8 pt-20 pb-10 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10"
                />

                <div className="space-y-4 relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] flex flex-wrap justify-center gap-x-4">
                        {titleWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className={cn(
                                    "inline-block",
                                    word === "Powerful" || word === "Toolkit" ? "text-primary italic" : ""
                                )}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Discover over 170+ professional tools designed to enhance your gaming performance,
                        boost productivity, and streamline development.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="relative max-w-2xl mx-auto px-4 mt-12"
                >
                    <div className="relative max-w-2xl mx-auto mb-12">
                        <Input
                            type="text"
                            placeholder="Search for tools (e.g., CPS, JSON, Meta Tags...)"
                            className="w-full h-16 pl-14 pr-6 rounded-2xl bg-background/50 backdrop-blur-xl border-primary/20 focus:border-primary focus:ring-primary/20 transition-all text-lg shadow-2xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <Button
                                variant="default"
                                size="lg"
                                className="rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-all bg-primary"
                                asChild
                            >
                                <Link href="/explore">Explore All Tools</Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleRandomTool}
                                className="rounded-full px-8 h-14 text-lg font-bold border-2 hover:bg-primary/5 hover:scale-105 transition-all"
                            >
                                <Shuffle className="mr-2 h-5 w-5" /> Try a Random Tool
                            </Button>
                        </div>

                        {/* Category Badges */}
                        <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-4xl mx-auto">
                            {[
                                'Mouse Skills', 'Keyboard Skills', 'Aim & Reflex', 'Gaming Utilities',
                                'Text Tools', 'Unit Converters', 'Development Tools', 'SEO & Web',
                                'Design & UI', 'Finance', 'Daily Tools', 'Image Tools', 'Education', 'Mathematics Tools', 'Advanced Scholar Tools', 'Productivity', 'Chemistry'
                            ].map((category, idx) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.4 + idx * 0.05, duration: 0.4 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}
                                    >
                                        <Badge
                                            variant="secondary"
                                            className="px-5 py-2.5 rounded-2xl cursor-pointer bg-secondary/40 backdrop-blur-md border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-lg shadow-black/5"
                                        >
                                            {category}
                                        </Badge>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 max-w-6xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-secondary/30 backdrop-blur-md border border-primary/10 text-center space-y-2 group"
                        >
                            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <stat.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="text-4xl font-black tracking-tight">{stat.value}</div>
                            <div className="text-muted-foreground font-bold uppercase tracking-wider text-xs">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </ScrollReveal>

            {/* Popular Tools Section */}
            <ScrollReveal className="max-w-7xl mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <Badge className="px-4 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary border-none uppercase tracking-widest">Trending Now</Badge>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Most Popular Tools</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">The most used tools by our community to boost their performance and productivity.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.slice(0, 6).map((tool, i) => (
                        <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="h-full p-8 rounded-[2.5rem] bg-secondary/20 border border-primary/5 hover:border-primary/20 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Monitor className="w-24 h-24 rotate-12" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Rocket className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold tracking-tight">{tool.title}</h3>
                                    <p className="text-muted-foreground line-clamp-2">{tool.description}</p>
                                    <div className="pt-4 flex items-center text-primary font-bold group-hover:translate-x-2 transition-transform">
                                        Try Now <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button variant="ghost" className="rounded-full px-8 text-lg font-bold hover:bg-primary/5" asChild>
                        <Link href="/explore">View All 170+ Tools <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                </div>
            </ScrollReveal>

            {/* How It Works Section */}
            <ScrollReveal className="bg-primary/5 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center space-y-4 mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Simplify Your Workflow</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Three simple steps to mastery with Assets Tools Hub.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Find Your Tool", desc: "Search through our extensive library of 170+ specialized tools across 14 categories." },
                            { step: "02", title: "Input Your Data", desc: "Enter your values, paste your text, or start the test with our easy-to-use interface." },
                            { step: "03", title: "Get Instant Results", desc: "Receive professional-grade calculations, transformations, or performance metrics instantly." }
                        ].map((item, i) => (
                            <div key={i} className="relative p-10 rounded-[3rem] bg-background border border-border/40 space-y-6">
                                <div className="text-6xl font-black text-primary/10 absolute top-8 right-8">{item.step}</div>
                                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="h-7 w-7 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Features/Benefits Section */}
            <ScrollReveal className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center space-y-4 mb-16">
                    <Badge className="px-4 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary border-none uppercase tracking-widest">Why Us?</Badge>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Built for Performance</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Experience a toolkit designed with the modern user in mind. High-quality tools, zero compromises.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="space-y-4 p-6 rounded-3xl border border-border/40 hover:border-primary/50 transition-colors bg-gradient-to-b from-secondary/50 to-transparent">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <feature.icon className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            <ScrollReveal className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center space-y-4 mb-20">
                    <Badge className="px-4 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary border-none uppercase tracking-widest">Feedback</Badge>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">Loved by Thousands</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Join the community of gamers and devs who rely on us every day.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Alex Rivers", role: "Pro FPS Player", quote: "The sensitivity converter is the most accurate I've used. It's now a staple in my routine when switching games.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" },
                        { name: "Sarah Chen", role: "Full Stack Dev", quote: "I use the JSON formatter and unit converters daily. The UI is clean, fast, and stays out of the way. Truly premium.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
                        { name: "Marcus Thorne", role: "UI Designer", quote: "The design of these tools is incredible. It feels like using a high-end application rather than a website.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" }
                    ].map((t, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-secondary/10 border border-primary/5 relative italic">
                            <Sparkles className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
                            <p className="text-xl mb-8 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-4 not-italic">
                                <div className="w-14 h-14 bg-primary/20 rounded-2xl overflow-hidden border border-primary/10">
                                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{t.name}</div>
                                    <div className="text-primary text-sm font-medium">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollReveal>

            {/* Trusted By Section */}
            <ScrollReveal className="py-24 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-4 overflow-hidden">
                    <p className="text-center text-muted-foreground font-bold uppercase tracking-[0.3em] text-xs mb-10">Trusted by teams at</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:opacity-100 transition-opacity">
                        {['Vercel', 'Next.js', 'GitHub', 'Tailwind', 'Framer', 'Radix'].map((brand) => (
                            <span key={brand} className="text-2xl md:text-3xl font-black tracking-tighter">{brand}</span>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Blog Section */}
            <ScrollReveal className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tight">Latest from the Blog</h2>
                        <p className="text-muted-foreground text-lg">Stay updated with the latest gaming and dev tips.</p>
                    </div>
                    <Button variant="outline" className="rounded-full px-8 group" asChild>
                        <Link href="/blog">
                            View All Posts <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.slice(0, 3).map((blog, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="group overflow-hidden rounded-3xl border border-border/40 bg-secondary/20 flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col space-y-4">
                                <div className="text-xs font-bold text-primary uppercase tracking-widest">{blog.date}</div>
                                <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">{blog.title}</h3>
                                <p className="text-muted-foreground line-clamp-2">{blog.description}</p>
                                <div className="pt-4 mt-auto">
                                    <Link href={`/blog/${blog.slug}`} className="inline-flex items-center text-sm font-bold hover:underline decoration-2 underline-offset-4 decoration-primary">
                                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </ScrollReveal>

            {/* FAQ Section */}
            <ScrollReveal className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-black tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground text-lg">Everything you need to know about Assets Tools Hub.</p>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border rounded-3xl px-8 bg-secondary/10 border-border/40 overflow-hidden">
                            <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollReveal>

            {/* Newsletter Section */}
            <ScrollReveal className="max-w-5xl mx-auto px-4 py-24">
                <div className="relative rounded-[3rem] overflow-hidden bg-secondary/30 p-12 md:p-20 border border-primary/10">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"
                    />
                    <div className="relative z-10 grid lg:grid-cols-2 lg:items-center gap-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Stay ahead of the curve.</h2>
                            <p className="text-muted-foreground text-xl">Get notified when we release new tools and professional tips. No spam, ever.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                                placeholder="Enter your email"
                                className="h-16 rounded-2xl bg-background border-primary/20 px-6 text-lg"
                            />
                            <Button size="lg" className="h-16 rounded-2xl px-10 font-bold text-lg">Subscribe</Button>
                        </div>
                    </div>
                </div>
            </ScrollReveal>

            {/* Final CTA Section */}
            <ScrollReveal className="px-4 py-12">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-center space-y-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48"
                    />

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black text-primary-foreground tracking-tighter">Ready to optimize your workflow?</h2>
                        <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto font-medium">Join thousands of users using our 170+ powerful tools every day. Start exploring now.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                            <Button size="lg" variant="secondary" className="rounded-full px-12 h-16 text-lg font-black shadow-2xl hover:scale-105 transition-transform" asChild>
                                <Link href="/explore">Explore All Tools</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-black border-2 border-primary-foreground/20 bg-white/5 text-primary-foreground hover:bg-white/10 transition-colors" asChild>
                                <Link href="/register">Join Pro Membership</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
