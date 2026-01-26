'use client';

import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('g');
    const [testText, setTestText] = useState('');
    const [matches, setMatches] = useState<RegExpExecArray[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!pattern) {
            setMatches([]);
            setError(null);
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const foundMatches: RegExpExecArray[] = [];
            let match;

            if (flags.includes('g')) {
                while ((match = regex.exec(testText)) !== null) {
                    foundMatches.push(match);
                }
            } else {
                match = regex.exec(testText);
                if (match) foundMatches.push(match);
            }

            setMatches(foundMatches);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setMatches([]);
        }
    }, [pattern, flags, testText]);

    return (
        <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <Label className="text-lg">Regular Expression</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
                                <Input
                                    className="pl-6 pr-6 font-mono h-12 rounded-xl"
                                    placeholder="your-regex-pattern"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">/</span>
                            </div>
                            <Input
                                className="w-20 font-mono h-12 rounded-xl"
                                placeholder="flags"
                                value={flags}
                                onChange={(e) => setFlags(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/5 p-3 rounded-lg border border-destructive/10">
                                <AlertCircle className="h-4 w-4" />
                                <span>Invalid Regex: {error}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-lg">Test String</Label>
                        <textarea
                            className="min-h-[300px] w-full resize-none rounded-2xl border border-input bg-background p-6 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                            placeholder="Insert text to test against the regex..."
                            value={testText}
                            onChange={(e) => setTestText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-primary flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Match Info
                            </h3>
                            <span className="text-xs font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase">
                                {matches.length} Matches
                            </span>
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {matches.map((match, i) => (
                                <div key={i} className="p-3 rounded-xl bg-background border text-xs font-mono space-y-1">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Match #{i + 1}</span>
                                        <span>Index: {match.index}</span>
                                    </div>
                                    <div className="text-primary break-all">{match[0]}</div>
                                </div>
                            ))}
                            {matches.length === 0 && !error && (
                                <div className="text-center py-10 text-muted-foreground italic text-sm">
                                    No matches found
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border bg-muted/30">
                        <h4 className="font-bold text-sm mb-3">Quick Reference</h4>
                        <ul className="text-xs space-y-2 text-muted-foreground">
                            <li><code className="text-primary">.</code> - Any character</li>
                            <li><code className="text-primary">\d</code> - Any digit</li>
                            <li><code className="text-primary">[a-z]</code> - Character range</li>
                            <li><code className="text-primary">+</code> - 1 or more</li>
                            <li><code className="text-primary">*</code> - 0 or more</li>
                            <li><code className="text-primary">^</code> - Start of string</li>
                            <li><code className="text-primary">$</code> - End of string</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
