'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Command } from 'lucide-react';
import { tools } from '@/lib/tools-config';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(tools);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (query.trim() === '') {
            setResults(tools);
        } else {
            const filtered = tools.filter(tool =>
                tool.title.toLowerCase().includes(query.toLowerCase()) ||
                tool.description.toLowerCase().includes(query.toLowerCase()) ||
                tool.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        }
    }, [query]);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-full transition-all border border-transparent hover:border-primary/20 group w-48 md:w-64"
            >
                <SearchIcon className="h-4 w-4 group-hover:text-primary transition-colors" />
                <span>Search tools...</span>
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl bg-background rounded-2xl shadow-2xl border z-[101] overflow-hidden"
                        >
                            <div className="p-4 border-b flex items-center gap-4">
                                <SearchIcon className="h-5 w-5 text-primary" />
                                <input
                                    autoFocus
                                    className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground/60"
                                    placeholder="Search for any tool..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2">
                                {results.length === 0 ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        <div className="mb-2 font-bold">No tools found</div>
                                        <p className="text-sm">Try searching for something else</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-1">
                                        {results.map((tool) => (
                                            <Link
                                                key={tool.slug}
                                                href={`/tools/${tool.slug}`}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 p-3 hover:bg-primary/10 rounded-xl transition-all group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    <SearchIcon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-sm">{tool.title}</div>
                                                    <div className="text-xs text-muted-foreground line-clamp-1">{tool.description}</div>
                                                </div>
                                                <div className="ml-auto text-[10px] font-bold uppercase tracking-widest text-primary/40 px-2 py-1 rounded bg-primary/5">
                                                    {tool.category}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-muted/30 border-t flex items-center gap-6 text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                                <div className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm">Enter</kbd>
                                    <span>to select</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm">↑↓</kbd>
                                    <span>to navigate</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-background border shadow-sm">Esc</kbd>
                                    <span>to close</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
