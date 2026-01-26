'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Minimize2, Check } from 'lucide-react';

export default function HTMLMinifier() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [stats, setStats] = useState({ original: 0, minified: 0 });

    const minifyHTML = () => {
        if (!input.trim()) return;

        // Basic minification logic: remove whitespace between tags, remove comments, remove multiple spaces
        const minified = input
            .replace(/<!--[\s\S]*?-->/g, '') // remove comments
            .replace(/>\s+</g, '><') // remove whitespace between tags
            .replace(/\s{2,}/g, ' ') // remove multiple spaces
            .trim();

        setOutput(minified);
        setStats({
            original: input.length,
            minified: minified.length
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
    };

    const savings = stats.original > 0 ? ((stats.original - stats.minified) / stats.original * 100).toFixed(1) : 0;

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Input HTML</Label>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => setInput('')}
                        disabled={!input}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                    </Button>
                </div>
                <textarea
                    className="min-h-[400px] w-full resize-none rounded-2xl border border-input bg-background p-6 font-mono text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    placeholder="Paste your HTML code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button className="w-full rounded-xl h-12 shadow-lg shadow-primary/20" onClick={minifyHTML} disabled={!input}>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    Minify HTML
                </Button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label className="text-lg">Minified Output</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={copyToClipboard}
                        disabled={!output}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </Button>
                </div>
                <div className="min-h-[400px] w-full rounded-2xl border bg-zinc-950 text-zinc-50 p-6 font-mono text-sm overflow-auto">
                    {output || <span className="text-zinc-500 italic">Minified code will appear here...</span>}
                </div>
                {stats.original > 0 && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <div className="flex items-center gap-2 text-primary">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-bold">Optimization Complete</span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Savings</span>
                            <p className="text-xl font-black text-primary">{savings}%</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
