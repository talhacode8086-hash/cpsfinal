'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Clock, RotateCcw, Zap } from 'lucide-react';

export default function MacroDelayTester() {
    const [delays, setDelays] = useState<number[]>([]);
    const [lastPress, setLastPress] = useState<number | null>(null);

    useEffect(() => {
        const handleDown = () => {
            const now = performance.now();
            if (lastPress !== null) {
                const delay = now - lastPress;
                setDelays(prev => [...prev.slice(-9), delay]);
            }
            setLastPress(now);
        };
        window.addEventListener('keydown', handleDown);
        return () => window.removeEventListener('keydown', handleDown);
    }, [lastPress]);

    const average = delays.length > 0 ? delays.reduce((a, b) => a + b, 0) / delays.length : 0;
    const consistency = delays.length > 1 ? (1 - (Math.max(...delays) - Math.min(...delays)) / average) * 100 : 100;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-zinc-950 text-white border-zinc-900 shadow-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                    <CardContent className="pt-10 pb-8 text-center relative z-10">
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50 mb-1">Current Delay</div>
                        <div className="text-7xl font-black text-primary">
                            {delays.length > 0 ? delays[delays.length - 1].toFixed(1) : '---'}
                            <span className="text-xl ml-1">ms</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30 border-none rounded-3xl">
                    <CardContent className="pt-8 pb-6 text-center">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Session Avg</div>
                        <div className="text-4xl font-black">{average.toFixed(1)}ms</div>
                        <div className="flex items-center justify-center gap-1 mt-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <Activity className="h-3 w-3" />
                            {consistency.toFixed(0)}% Stable
                        </div>
                    </CardContent>
                </Card>

                <div className="bg-primary/5 rounded-3xl border border-primary/20 p-6 flex flex-col justify-center gap-3">
                    <h3 className="font-bold flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        Macro Precision
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Use this to verify the precision of your hardware macros or rapid-fire software. Perfect delays indicate high-quality timing chips.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-24 w-full bg-muted/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-muted-foreground/10 text-muted-foreground font-black tracking-widest uppercase">
                    Press any keys rapidly to measure inter-key delay
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-xs font-extra-bold uppercase tracking-widest text-muted-foreground">Recent Sequence timeline</span>
                        <Zap className="h-4 w-4 text-yellow-500 opacity-30" />
                    </div>
                    <div className="flex h-12 gap-1 px-4 items-end">
                        {delays.map((d, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-primary rounded-t-lg transition-all"
                                style={{ height: `${Math.min((d / 200) * 100, 100)}%` }}
                            />
                        ))}
                        {Array.from({ length: 10 - delays.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="flex-1 bg-muted rounded-t-lg h-2 opacity-50" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Button variant="ghost" onClick={() => { setDelays([]); setLastPress(null); }}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Logger
                </Button>
            </div>
        </div>
    );
}
