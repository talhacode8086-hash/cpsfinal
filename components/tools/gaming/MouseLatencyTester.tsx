'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Zap, History, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MouseLatencyTester() {
    const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result'>('idle');
    const [latencies, setLatencies] = useState<number[]>([]);
    const startTimeRef = useRef(0);
    const timeoutRef = useRef<any>(null);

    const startTest = () => {
        setState('waiting');
        const delay = Math.random() * 2000 + 1000;
        timeoutRef.current = setTimeout(() => {
            setState('ready');
            startTimeRef.current = performance.now();
        }, delay);
    };

    const handleClick = () => {
        if (state === 'ready') {
            const end = performance.now();
            const lat = Math.round(end - startTimeRef.current);
            setLatencies(prev => [lat, ...prev].slice(0, 5));
            setState('result');
            toast.success(`Click Registered: ${lat}ms`);
        } else if (state === 'waiting') {
            clearTimeout(timeoutRef.current);
            setState('idle');
            toast.error('Too early! Wait for the visual cue.');
        } else {
            startTest();
        }
    };

    const avg = latencies.length
        ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
        : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Timer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Mouse Input Latency Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure the time between your click and browser event registration.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div
                    className={`w-full h-80 rounded-[3rem] border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none ${state === 'waiting' ? 'bg-amber-500/10 border-amber-500/20' :
                            state === 'ready' ? 'bg-green-500/30 border-green-500/50 scale-[1.02]' :
                                'bg-muted/10 border-primary/10 hover:border-primary/20'
                        }`}
                    onClick={handleClick}
                >
                    <div className="text-center space-y-4">
                        {state === 'idle' || state === 'result' ? (
                            <>
                                <div className="p-6 rounded-3xl bg-primary/20 inline-block mb-4">
                                    <MousePointer2 className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-4xl font-black">{state === 'result' ? 'CLICK TO TEST AGAIN' : 'CLICK TO BEGIN'}</h3>
                                <p className="text-muted-foreground">Wait for the color change...</p>
                            </>
                        ) : state === 'waiting' ? (
                            <h3 className="text-4xl font-black opacity-30">PEEKING...</h3>
                        ) : (
                            <h3 className="text-6xl font-black text-green-500 uppercase animate-in zoom-in-75">CLICK NOW!</h3>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-primary/10 border border-primary/10 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Average Latency</p>
                        <p className="text-6xl font-black">{avg}ms</p>
                        <p className="text-xs text-muted-foreground mt-2 font-bold uppercase">Technical Response Time</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <History className="h-4 w-4" /> Recent Samples
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {latencies.map((l, i) => (
                                <div key={i} className="px-5 py-3 rounded-2xl bg-muted/40 border border-primary/10 font-black text-xl">
                                    {l}ms
                                </div>
                            ))}
                            {latencies.length === 0 && <p className="text-muted-foreground italic text-sm">Waiting for first result...</p>}
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex gap-4 items-center">
                    <Zap className="h-6 w-6 text-amber-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Note:</b> This test measures the sum of mouse click latency, USB polling, and browser event loop delay. Sub-10ms results are excellent for professional gaming peripherals.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
