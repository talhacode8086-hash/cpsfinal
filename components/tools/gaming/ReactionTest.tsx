'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, RotateCcw, BarChart3, Timer, Fingerprint, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

type State = 'waiting' | 'ready' | 'result' | 'early';

export default function ReactionTest() {
    const [state, setState] = useState<State>('waiting');
    const [startTime, setStartTime] = useState<number>(0);
    const [lastResult, setLastResult] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const startTest = useCallback(() => {
        setState('waiting');
        const delay = Math.random() * 3000 + 2000; // 2-5 seconds
        timeoutRef.current = setTimeout(() => {
            setState('ready');
            setStartTime(performance.now());
        }, delay);
    }, []);

    const handleClick = useCallback(() => {
        if (state === 'waiting') {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setState('early');
        } else if (state === 'ready') {
            const reactionTime = performance.now() - startTime;
            setLastResult(reactionTime);
            setHistory(prev => [...prev, reactionTime].slice(-20)); // Keep last 20
            setState('result');
        } else {
            startTest();
        }
    }, [state, startTime, startTest]);

    const reset = () => {
        setState('waiting');
        setLastResult(null);
        setHistory([]);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        startTest();
    };

    const average = history.length > 0
        ? history.reduce((a, b) => a + b, 0) / history.length
        : 0;

    const best = history.length > 0 ? Math.min(...history) : 0;

    const chartData = history.map((val, i) => ({
        attempt: i + 1,
        ms: Math.round(val)
    }));

    useEffect(() => {
        startTest();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [startTest]);

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Interaction Area */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden rounded-[2.5rem] relative group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <CardContent
                            className={`h-[550px] flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer select-none relative ${state === 'waiting' ? 'bg-primary' :
                                    state === 'ready' ? 'bg-green-500 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]' :
                                        state === 'early' ? 'bg-destructive shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]' :
                                            'bg-muted/80 backdrop-blur-xl'
                                }`}
                            onClick={handleClick}
                        >
                            <AnimatePresence mode="wait">
                                {state === 'waiting' && (
                                    <motion.div
                                        key="waiting"
                                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="text-center space-y-6"
                                    >
                                        <div className="h-24 w-24 bg-white/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/30">
                                            <Timer className="h-12 w-12 text-white animate-pulse" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-5xl font-black text-white tracking-tighter">WAIT FOR GREEN</h2>
                                            <p className="text-white/70 font-bold uppercase tracking-widest text-sm">Do not click too early</p>
                                        </div>
                                    </motion.div>
                                )}

                                {state === 'ready' && (
                                    <motion.div
                                        key="ready"
                                        initial={{ opacity: 0, scale: 1.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center"
                                    >
                                        <h2 className="text-[120px] font-black text-white tracking-tighter leading-none filter drop-shadow-2xl">CLICK!</h2>
                                    </motion.div>
                                )}

                                {state === 'result' && (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-10 w-full"
                                    >
                                        <div className="space-y-4">
                                            <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">Response Speed</p>
                                            <h2 className="text-[140px] font-black tracking-tighter text-primary leading-none">
                                                {Math.round(lastResult || 0)}
                                                <span className="text-3xl font-bold ml-2 opacity-50">ms</span>
                                            </h2>
                                        </div>
                                        <div className="flex justify-center gap-4">
                                            <Button size="lg" className="rounded-2xl h-16 px-12 font-black text-xl shadow-xl shadow-primary/20">
                                                Test Again
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {state === 'early' && (
                                    <motion.div
                                        key="early"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center space-y-8"
                                    >
                                        <div className="h-24 w-24 bg-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto border-2 border-white/40">
                                            <Zap className="h-12 w-12 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-5xl font-black text-white tracking-tighter">TOO FAST!</h2>
                                            <p className="text-white/80 font-medium">Wait for the screen to turn green.</p>
                                        </div>
                                        <Button variant="outline" className="rounded-2xl h-14 bg-white/10 border-white/30 text-white hover:bg-white/20 font-black px-10">
                                            Try Again
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>

                    {/* Performance Stability Graph */}
                    <Card className="rounded-[2.5rem] border-primary/5 shadow-xl bg-muted/20 overflow-hidden h-64">
                        <CardHeader className="py-4 px-8 border-b bg-muted/40 flex flex-row items-center justify-between">
                            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Stability Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-full">
                            {history.length > 1 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--primary)/0.05)" />
                                        <XAxis dataKey="attempt" hide />
                                        <YAxis domain={['dataMin - 50', 'dataMax + 50']} hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            formatter={(value: any) => [`${value}ms`, 'Reaction']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="ms"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={4}
                                            dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'white' }}
                                            activeDot={{ r: 8, strokeWidth: 0 }}
                                            animationDuration={1000}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground/30 font-black uppercase tracking-widest text-xs italic">
                                    Continue testing to see growth
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="grid gap-6">
                        <Card className="rounded-3xl border-primary/10 bg-primary shadow-xl shadow-primary/20 text-primary-foreground overflow-hidden relative">
                            <div className="absolute -right-5 -bottom-5 h-32 w-32 bg-white/10 rounded-full blur-2xl" />
                            <CardContent className="p-8 text-center relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Personal Best</p>
                                <div className="text-6xl font-black tabular-nums tracking-tighter">
                                    {best === 0 ? '--' : Math.round(best)}<span className="text-xl opacity-60 ml-1">ms</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-3xl border-primary/10 shadow-lg">
                            <CardContent className="p-8 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Global Average</p>
                                <div className="text-4xl font-black tabular-nums tracking-tighter">
                                    {average === 0 ? '--' : Math.round(average)}<span className="text-lg opacity-40 ml-1">ms</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="rounded-[2rem] border-primary/5 bg-secondary/10 shadow-inner h-[380px] overflow-hidden">
                        <CardHeader className="py-4 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" /> History Log
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 overflow-y-auto h-full font-mono text-xs custom-scrollbar">
                            {[...history].reverse().map((h, i) => (
                                <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${h < 200 ? 'bg-green-500' : h < 250 ? 'bg-amber-500' : 'bg-red-500'}`} />
                                        <span className="text-muted-foreground font-bold italic">#{history.length - i}</span>
                                    </div>
                                    <span className="font-black text-sm">{Math.round(h)} <span className="text-[10px] font-normal opacity-50">ms</span></span>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground/30 gap-2">
                                    <Zap className="h-8 w-8" />
                                    <span className="font-black uppercase text-[10px] tracking-widest">No data collected</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black hover:bg-destructive hover:text-white transition-colors" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Wipe Personal Stats
                    </Button>

                    <Card className="rounded-3xl border-primary/5 bg-muted/20 p-6 flex flex-col items-center text-center gap-3">
                        <Fingerprint className="h-6 w-6 text-primary" />
                        <h4 className="font-black text-[10px] uppercase tracking-widest underline decoration-primary decoration-2 underline-offset-4">Reflex Science</h4>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">Human brain takes ~100ms for visual processing and ~50ms for motor signal transmission. Pure biological limits are near 120ms.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
