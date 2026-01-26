'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, RotateCcw, BarChart3, Info, Fingerprint, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function PollingRateChecker() {
    const [pollingRate, setPollingRate] = useState<number>(0);
    const [maxPollingRate, setMaxPollingRate] = useState<number>(0);
    const [jitter, setJitter] = useState<number>(0);
    const [history, setHistory] = useState<{ time: number; rate: number }[]>([]);
    const [isActive, setIsActive] = useState(false);

    const lastTimeRef = useRef<number>(0);
    const intervalsRef = useRef<number[]>([]);
    const startTimeRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isActive) return;

        const now = performance.now();
        if (lastTimeRef.current !== 0) {
            const interval = now - lastTimeRef.current;
            if (interval > 0.1) { // Filter out same-tick events
                intervalsRef.current.push(interval);

                // Process in chunks of 100 samples
                if (intervalsRef.current.length >= 100) {
                    const avgInterval = intervalsRef.current.reduce((a, b) => a + b, 0) / intervalsRef.current.length;
                    const currentHz = Math.round(1000 / avgInterval);

                    // Jitter calculation (standard deviation of intervals)
                    const variants = intervalsRef.current.map(i => Math.pow(i - avgInterval, 2));
                    const stdDev = Math.sqrt(variants.reduce((a, b) => a + b, 0) / variants.length);

                    setPollingRate(currentHz);
                    setMaxPollingRate(prev => Math.max(prev, currentHz));
                    setJitter(parseFloat(stdDev.toFixed(3)));

                    const elapsed = (now - startTimeRef.current) / 1000;
                    setHistory(prev => [...prev.slice(-29), { time: parseFloat(elapsed.toFixed(1)), rate: currentHz }]);

                    intervalsRef.current = [];
                }
            }
        }
        lastTimeRef.current = now;
    }, [isActive]);

    useEffect(() => {
        if (isActive) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isActive, handleMouseMove]);

    const toggleTest = () => {
        if (!isActive) {
            setPollingRate(0);
            setJitter(0);
            setHistory([]);
            startTimeRef.current = performance.now();
            lastTimeRef.current = 0;
            intervalsRef.current = [];
        }
        setIsActive(!isActive);
    };

    const reset = () => {
        setPollingRate(0);
        setMaxPollingRate(0);
        setJitter(0);
        setHistory([]);
        setIsActive(false);
    };

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Main Measurement Card */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="overflow-hidden border-primary/20 shadow-2xl rounded-[2.5rem] bg-card/50 backdrop-blur-md">
                        <CardHeader className="bg-muted/30 border-b pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground">
                                        <Activity className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle>Polling Rate Engine</CardTitle>
                                        <CardDescription>Move mouse rapidly to benchmark</CardDescription>
                                    </div>
                                </div>
                                <Button
                                    size="lg"
                                    variant={isActive ? "destructive" : "default"}
                                    onClick={toggleTest}
                                    className="rounded-2xl px-10 h-14 font-black shadow-xl"
                                >
                                    {isActive ? "STOP BENCHMARK" : "START TEST"}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px] flex flex-col items-center justify-center p-0 relative overflow-hidden bg-zinc-950">
                            {/* Grid Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)', backgroundSize: '30px 30px' }} />

                            <AnimatePresence mode="wait">
                                {isActive ? (
                                    <motion.div
                                        key="active"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="text-center space-y-4 z-10"
                                    >
                                        <div className="space-y-0">
                                            <p className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-2">Live Reporting Rate</p>
                                            <div className="text-[120px] font-black text-white tracking-tighter leading-none flex items-baseline justify-center">
                                                {pollingRate}
                                                <span className="text-3xl font-bold ml-4 text-primary opacity-50">Hz</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-8 pt-4">
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-white/40 uppercase mb-1">Consistency</p>
                                                <p className="text-xl font-bold text-white">{jitter < 0.2 ? 'ELITE' : jitter < 0.5 ? 'STABLE' : 'UNSTABLE'}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-black text-white/40 uppercase mb-1">Jitter</p>
                                                <p className="text-xl font-bold text-white">{jitter}ms</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center space-y-6 z-10 p-12"
                                    >
                                        <div className="h-24 w-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 animate-pulse">
                                            <Zap className="h-10 w-10 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white">System Ready</h3>
                                            <p className="text-white/40 max-w-xs mx-auto text-sm italic">High-performance sensors require rapid circles to report peak polling rates.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Live Stability Graph */}
                            <div className="absolute bottom-0 left-0 w-full h-32 opacity-30 pointer-events-none">
                                {history.length > 0 && (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={history}>
                                            <defs>
                                                <linearGradient id="rateGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Area type="step" dataKey="rate" stroke="hsl(var(--primary))" fill="url(#rateGrad)" strokeWidth={2} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="rounded-3xl border-primary/10 bg-muted/30 p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500"><ShieldCheck className="h-5 w-5" /></div>
                                <h4 className="font-black text-[10px] uppercase tracking-widest">Hardware Trust</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Lower jitter values indicate a cleaner signal and better internal clock synchronization of your mouse sensor.</p>
                        </Card>
                        <Card className="rounded-3xl border-primary/10 bg-muted/30 p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary"><BarChart3 className="h-5 w-5" /></div>
                                <h4 className="font-black text-[10px] uppercase tracking-widest">Data Analysis</h4>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Our engine calculates frequency based on raw millisecond deltas between browser-level mouse events.</p>
                        </Card>
                    </div>
                </div>

                {/* Sidebar Metrics */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2rem] border-primary/10 bg-primary/5 p-8 text-center space-y-4">
                        <Fingerprint className="h-8 w-8 text-primary mx-auto opacity-40" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Record Peak</p>
                            <div className="text-6xl font-black tracking-tighter text-primary">
                                {maxPollingRate}<span className="text-xl ml-1">Hz</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="rounded-3xl border-primary/5 bg-secondary/10 overflow-hidden">
                        <CardHeader className="py-4 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Professional Tiers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {[
                                { name: 'Legacy/Standard', hz: '125', delay: '8ms' },
                                { name: 'E-Sports Entry', hz: '500', delay: '2ms' },
                                { name: 'Pro Standard', hz: '1000', delay: '1ms' },
                                { name: 'Ultra High-End', hz: '4000+', delay: '<0.25ms' },
                            ].map((t, i) => (
                                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-primary/5 last:border-0">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] font-bold">{t.name}</p>
                                        <p className="text-[9px] text-muted-foreground">Input Lag: {t.delay}</p>
                                    </div>
                                    <div className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full">{t.hz} Hz</div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black border-primary/10 hover:bg-destructive hover:text-white transition-colors" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" /> WIPE BENCHMARK DATA
                    </Button>

                    <div className="p-6 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 text-amber-600 space-y-2">
                        <div className="flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Web Limit</span>
                        </div>
                        <p className="text-[10px] font-medium leading-relaxed italic">Note: Browsers may cap event rates. If you have an 8000Hz mouse, try our standalone desktop tool for 100% accuracy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
