'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Sparkles, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Search from './Search';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSidebar } from '@/components/providers/SidebarProvider';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const { toggleSidebar } = useSidebar();
    const [mounted, setMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { name: 'Gaming', href: '/category/gaming-utilities' },
        { name: 'Productivity', href: '/category/text-tools' },
        { name: 'Dev', href: '/category/development-tools' },
        { name: 'Blog', href: '/blog' },
    ];

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-500",
                isScrolled
                    ? "border-b bg-background/60 backdrop-blur-2xl shadow-lg py-2"
                    : "bg-transparent py-4"
            )}
        >
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="flex rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                            onClick={toggleSidebar}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </motion.div>

                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                        >
                            <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg sm:text-xl tracking-tighter leading-none">Assets Tools</span>
                            <span className="text-[8px] sm:text-[10px] font-black text-primary uppercase tracking-[0.3em] leading-none mt-1">Premium</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-1 ml-4">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors group/link"
                                >
                                    {link.name}
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left"
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Search />

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl sm:rounded-2xl bg-muted/30 hover:bg-muted h-9 w-9 sm:h-10 sm:w-10"
                            aria-label="Toggle Theme"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {mounted && theme === 'dark' ? (
                                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                            ) : (
                                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                            )}
                        </Button>
                    </motion.div>

                    <Link href="/pro">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="sm" className="rounded-xl sm:rounded-2xl px-3 sm:px-6 bg-primary font-black uppercase tracking-widest text-[9px] sm:text-[10px] h-9 sm:h-11 shadow-xl shadow-primary/20 hover:shadow-primary/40 border-t border-white/20">
                                <Sparkles className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline">Join Pro</span>
                                <span className="sm:hidden">Pro</span>
                            </Button>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.header>
    );
}
