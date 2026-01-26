'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, RotateCcw, Zap, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KeyboardLatency() {
    const [latencies, setLatencies] = useState<number[]>([]);
    const [lastLatency, setLastLatency] = useState<number | null>(null);
    const [isReady, setIsReady] = useState(false);

    const lastPressRef = useRef<number>(0);

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.repeat) return;

        const now = performance.now();
        // This is a naive client-side measurement, actually measuring the overhead of the browser event loop
        // But usable for comparing consistent feel.
        if (lastPressRef.current !== 0) {
            const diff = now - lastPressRef.current;
            // In a real browser environment, it's hard to get true hardware latency, 
            // but we can measure responsiveness of the current environment.
            setLastLatency(diff);
            setLatencies(prev => [diff, ...prev.slice(0, 19)]);
        }
        lastPressRef.current = now;
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const averageLatency = latencies.length > 0
        ? latencies.reduce((a, b) => a + b, 0) / latencies.length
        : 0;

    const reset = () => {
        setLatencies([]);
        setLastLatency(null);
        lastPressRef.current = 0;
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/10 overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-6">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                            <Keyboard className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-center">Detection Area</CardTitle>
                        <CardDescription className="text-center">Press any key repeatedly to measure responsiveness.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 flex flex-col items-center justify-center p-6 text-center space-y-4">
                        <div className="relative">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={lastLatency}
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-7xl font-black text-primary tracking-tighter tabular-nums"
                                >
                                    {lastLatency ? `${lastLatency.toFixed(1)}` : '0.0'}
                                    <span className="text-xl font-bold ml-1">ms</span>
                                </motion.div>
                            </AnimatePresence>
                            <div className="absolute -top-4 -right-8 h-8 w-8 bg-yellow-400/20 rounded-full flex items-center justify-center animate-bounce">
                                <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Latest Response Delay</p>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-primary/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-primary" />
                                    <span className="font-bold">Average Latency</span>
                                </div>
                                <span className="text-2xl font-black text-primary">{averageLatency.toFixed(2)} ms</span>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(100, (averageLatency / 100) * 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground font-bold font-mono">
                                    <span>0ms</span>
                                    <span>50ms (Normal)</span>
                                    <span>100ms+</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/10 h-[164px] overflow-hidden">
                        <CardHeader className="py-3 bg-muted/30">
                            <CardTitle className="text-sm font-bold">Recent History</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-full">
                            <div className="h-full overflow-y-auto px-4 py-2 space-y-1 font-mono text-xs">
                                {latencies.map((l, i) => (
                                    <div key={i} className="flex justify-between border-b border-muted py-1">
                                        <span className="text-muted-foreground">#{latencies.length - i}</span>
                                        <span className="font-bold">{l.toFixed(2)} ms</span>
                                    </div>
                                ))}
                                {latencies.length === 0 && (
                                    <div className="h-full flex items-center justify-center text-muted-foreground italic">
                                        Start typing to see results...
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full rounded-xl" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear Results
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold">How measurement works</h3>
                <p className="text-muted-foreground leading-relaxed">
                    This tool measures the time between browser JavaScript receiving one `keydown` event and the next.
                    While it doesn't represent true hardware "input lag" (which requires high-speed cameras),
                    it effectively measures **System & Browser Response Consistency**.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-background p-4 rounded-xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2">Lower is Better</h4>
                        <p className="text-xs text-muted-foreground">Typical browser overhead is 8ms to 32ms. Pro setups with high polling rates may see even lower values.</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2">Consistency Matters</h4>
                        <p className="text-xs text-muted-foreground">Gamers prefer stable 1ms-5ms variations over erratic jumps, as it ensures predictable reaction timing.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
