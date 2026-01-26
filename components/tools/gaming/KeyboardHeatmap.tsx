'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Thermometer, RotateCcw } from 'lucide-react';

export default function KeyboardHeatmap() {
    const [presses, setPresses] = useState<Record<string, number>>({});
    const [totalPresses, setTotalPresses] = useState(0);

    useEffect(() => {
        const handleDown = (e: KeyboardEvent) => {
            setPresses(prev => {
                const key = e.code.replace('Key', '');
                return { ...prev, [key]: (prev[key] || 0) + 1 };
            });
            setTotalPresses(p => p + 1);
        };
        window.addEventListener('keydown', handleDown);
        return () => window.removeEventListener('keydown', handleDown);
    }, []);

    const getKeyColor = (count: number) => {
        if (!count) return 'bg-muted/40';
        const intensity = Math.min(count / 10, 1);
        if (intensity < 0.3) return 'bg-blue-500/30 text-blue-700 dark:text-blue-300';
        if (intensity < 0.6) return 'bg-yellow-500/50 text-yellow-800 dark:text-yellow-200';
        return 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]';
    };

    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end bg-gradient-to-r from-muted/50 to-transparent p-6 rounded-3xl border border-muted">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black flex items-center gap-2">
                        <Thermometer className="h-6 w-6 text-red-500" />
                        Usage Heatmap
                    </h2>
                    <p className="text-sm text-muted-foreground">Real-time visualization of key frequency.</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Total Events</div>
                    <div className="text-4xl font-black text-primary">{totalPresses}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 p-8 bg-zinc-950 rounded-[2.5rem] border-[12px] border-zinc-900 shadow-2xl overflow-x-auto min-w-[600px]">
                <div className="flex justify-center gap-2">
                    {row1.map(k => (
                        <div key={k} className={`h-14 w-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${getKeyColor(presses[k])}`}>
                            <span className="text-xs font-black">{k}</span>
                            <span className="text-[10px] opacity-60 font-mono">{presses[k] || 0}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2 pl-6">
                    {row2.map(k => (
                        <div key={k} className={`h-14 w-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${getKeyColor(presses[k])}`}>
                            <span className="text-xs font-black">{k}</span>
                            <span className="text-[10px] opacity-60 font-mono">{presses[k] || 0}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-2 pl-12">
                    {row3.map(k => (
                        <div key={k} className={`h-14 w-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${getKeyColor(presses[k])}`}>
                            <span className="text-xs font-black">{k}</span>
                            <span className="text-[10px] opacity-60 font-mono">{presses[k] || 0}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-2">
                    <div className={`h-14 w-[300px] rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${getKeyColor(presses['Space'])}`}>
                        <span className="text-[10px] font-black uppercase">Space</span>
                        <span className="text-[10px] opacity-60 font-mono">{presses['Space'] || 0}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <Button variant="outline" className="rounded-full px-8" onClick={() => { setPresses({}); setTotalPresses(0); }}>
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset Heatmap
                </Button>
            </div>
        </div>
    );
}
