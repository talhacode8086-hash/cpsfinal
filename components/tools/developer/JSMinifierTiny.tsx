'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Copy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function JSMinifierTiny() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [saved, setSaved] = useState(0);

    const minify = () => {
        if (!input.trim()) return;

        // Basic minification logic: remove whitespace, comments, newlines
        let result = input
            .replace(/\/\/.*$/gm, '') // single line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // multi line comments
            .replace(/\s+/g, ' ') // repetitive space
            .replace(/[\n\r]/g, '') // newlines
            .trim();

        const savings = input.length - result.length;
        setSaved(Math.round((savings / input.length) * 100));
        setOutput(result);
        toast.success('JavaScript Minified');
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Scissors className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">JavaScript Minifier</CardTitle>
                <p className="text-muted-foreground mt-2">Compress your Production JS code for maximum loading speed.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-primary">Source Code</label>
                        <Textarea
                            placeholder="function test() { console.log('hello world'); }..."
                            className="h-[400px] rounded-3xl border-primary/10 bg-muted/20 font-mono text-xs leading-relaxed"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-amber-500/10 p-2 rounded-xl">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 px-2">Minified Code</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-green-500">SAVED {saved}%</span>
                                <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(output); toast.success('Copied'); }}>
                                    <Copy className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            readOnly
                            className="h-[400px] rounded-3xl border-primary/10 bg-primary/5 font-mono text-[10px] leading-tight break-all"
                            value={output}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold gap-3" onClick={minify}>
                        <Zap className="h-6 w-6" /> Minify Logic
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
