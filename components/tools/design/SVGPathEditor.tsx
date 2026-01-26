'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SVGPathEditor() {
    const [path, setPath] = useState('M10 80 Q 95 10 180 80');
    const [copied, setCopied] = useState(false);

    const fullSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n  <path d="${path}" fill="transparent" stroke="currentColor" stroke-width="4" />\n</svg>`;

    return (
        <Card className="max-w-6xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">SVG Path Visualizer</CardTitle>
                <p className="text-muted-foreground mt-2">Visually debug and preview complex SVG path data strings.</p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col lg:flex-row min-h-[500px]">
                <div className="w-full lg:w-96 bg-muted/5 p-8 border-b lg:border-b-0 lg:border-r border-primary/5 space-y-8 flex flex-col">
                    <div className="space-y-4 flex-1">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest">Path Data (d attribute)</label>
                        <textarea
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                            className="w-full h-48 p-4 rounded-2xl bg-background border border-primary/10 font-mono text-sm resize-none focus:ring-2 ring-primary/20 outline-none"
                            placeholder="e.g. M10 10 L 90 90..."
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-primary/5">
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                            SVG path commands like M (Move), L (Line), Q (Quadratic Curve), C (Cubic Curve), and Z (Close) are supported.
                        </p>
                    </div>
                </div>

                <div className="flex-1 p-12 flex flex-col items-center justify-center gap-12 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] bg-opacity-10">
                    <div className="w-80 h-80 bg-background border-4 border-primary/10 rounded-[2.5rem] shadow-2xl flex items-center justify-center text-primary relative">
                        <div className="absolute inset-0 opacity-5 grid-pattern p-4" />
                        <svg viewBox="0 0 200 200" className="w-full h-full p-8 overflow-visible drop-shadow-2xl">
                            <path d={path} fill="transparent" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className="w-full max-w-xl space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase text-primary opacity-50">
                            <span>SVG Code Snippet</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(fullSvg);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="flex items-center gap-2 hover:text-primary transition-colors"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? 'COPIED' : 'COPY SVG'}
                            </button>
                        </div>
                        <pre className="p-6 rounded-2xl bg-muted/20 border border-primary/10 font-mono text-xs overflow-x-auto">
                            {fullSvg}
                        </pre>
                    </div>
                </div>
            </CardContent>
            <style jsx>{`
                .grid-pattern {
                    background-image: linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px);
                    background-size: 20px 20px;
                }
            `}</style>
        </Card>
    );
}
