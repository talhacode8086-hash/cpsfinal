'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Timer, Zap, Trophy, RotateCcw, LineChart, Activity, Fingerprint, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

interface ClickPoint {
    id: number;
    x: number;
    y: number;
    timestamp: number;
}

export default function JitterClickTest() {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [clicks, setClicks] = useState(0);
    const [bestCPS, setBestCPS] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [duration] = useState(10);
    const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
    const [cpsHistory, setCpsHistory] = useState<{ time: number; cps: number }[]>([]);
    const [vibrationIntensity, setVibrationIntensity] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const lastClickTimeRef = useRef<number>(0);
    const intervalsRef = useRef<number[]>([]);

    const startTest = useCallback(() => {
        setIsActive(true);
        setClicks(0);
        setTimeLeft(duration);
        setIsFinished(false);
        setClickPoints([]);
        setCpsHistory([]);
        setVibrationIntensity(0);
        intervalsRef.current = [];
        lastClickTimeRef.current = performance.now();
    }, [duration]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isFinished) return;

        const now = performance.now();
        if (!isActive) {
            startTest();
        }

        if (isActive) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newPoint = { id: Date.now(), x, y, timestamp: now };
            setClickPoints(prev => [...prev, newPoint]);
            setClicks(prev => prev + 1);

            // Calculate interval for stability
            if (lastClickTimeRef.current > 0) {
                intervalsRef.current.push(now - lastClickTimeRef.current);
            }
            lastClickTimeRef.current = now;

            // Update vibration intensity (instant CPS feel)
            setVibrationIntensity(prev => Math.min(100, prev + 15));
        }
    };

    // Decay vibration intensity
    useEffect(() => {
        if (!isActive) return;
        const decay = setInterval(() => {
            setVibrationIntensity(prev => Math.max(0, prev - 5));
        }, 50);
        return () => clearInterval(decay);
    }, [isActive]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = Math.max(0, prev - 0.1);

                    // Update CPS history
                    if (Math.floor(next * 10) % 5 === 0) {
                        const elapsed = duration - next;
                        const instantCps = elapsed > 0 ? clicks / elapsed : 0;
                        setCpsHistory(h => [...h, {
                            time: parseFloat(elapsed.toFixed(1)),
                            cps: parseFloat(instantCps.toFixed(2))
                        }]);
                    }

                    if (next <= 0) {
                        clearInterval(timerRef.current!);
                        setIsActive(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return parseFloat(next.toFixed(1));
                });
            }, 100);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, clicks, duration]);

    const stabilityScore = useMemo(() => {
        if (intervalsRef.current.length < 2) return 0;
        const avg = intervalsRef.current.reduce((a, b) => a + b, 0) / intervalsRef.current.length;
        const variance = intervalsRef.current.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / intervalsRef.current.length;
        const stdDev = Math.sqrt(variance);
        // Stability = 100 - (Coefficient of Variation * 100)
        const cv = stdDev / avg;
        return Math.max(0, Math.min(100, 100 - (cv * 100)));
    }, [isFinished]);

    useEffect(() => {
        if (isFinished) {
            const cps = clicks / duration;
            if (cps > bestCPS) setBestCPS(cps);
        }
    }, [isFinished, clicks, duration, bestCPS]);

    const currentCPS = isActive ? (clicks / (duration - timeLeft) || 0) : (clicks / duration || 0);

    return (
        <div className="mx-auto max-w-6xl space-y-8 pb-20">
            <div className="grid gap-6 lg:grid-cols-12">
                {/* Left Side: Interaction & Visuals */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className={`overflow-hidden border-2 transition-all duration-300 rounded-[2.5rem] bg-card/50 backdrop-blur-xl ${isActive ? 'border-primary shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)]' : 'border-primary/10'}`}>
                        <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between py-4 px-8">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Zap className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`} />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black">Jitter Master Pro</CardTitle>
                                    <CardDescription>Advanced Vibration Analysis</CardDescription>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase opacity-40">Intensity</p>
                                    <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden mt-1">
                                        <motion.div
                                            className="h-full bg-primary"
                                            animate={{ width: `${vibrationIntensity}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-0 relative h-[450px]">
                            <motion.div
                                animate={isActive ? {
                                    x: [0, (Math.random() - 0.5) * vibrationIntensity * 0.1, 0],
                                    y: [0, (Math.random() - 0.5) * vibrationIntensity * 0.1, 0]
                                } : {}}
                                transition={{ repeat: Infinity, duration: 0.1 }}
                                onClick={handleClick}
                                className={`h-full flex flex-col items-center justify-center cursor-crosshair select-none relative overflow-hidden`}
                            >
                                {/* Heatmap Overlay */}
                                <div className="absolute inset-0 pointer-events-none opacity-40">
                                    {clickPoints.map(p => (
                                        <div
                                            key={p.id}
                                            className="absolute w-4 h-4 rounded-full bg-primary blur-md animate-out fade-out duration-1000"
                                            style={{ left: p.x - 8, top: p.y - 8 }}
                                        />
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {!isActive && !isFinished && (
                                        <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center z-10 group">
                                            <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all border border-primary/20">
                                                <MousePointer2 className="h-12 w-12 text-primary" />
                                            </div>
                                            <h3 className="text-4xl font-black tracking-tighter mb-2">READY TO VIBRATE?</h3>
                                            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">First click starts the 10s drone pulse</p>
                                        </motion.div>
                                    )}

                                    {isActive && (
                                        <motion.div key="active" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center z-10">
                                            <motion.div
                                                key={clicks}
                                                animate={{ scale: [1, 1.1, 1] }}
                                                className="text-9xl font-black text-primary drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
                                            >
                                                {clicks}
                                            </motion.div>
                                            <div className="flex items-center gap-2 justify-center mt-4">
                                                <Activity className="h-4 w-4 text-primary animate-pulse" />
                                                <p className="text-sm font-black uppercase tracking-[0.2em]">{currentCPS.toFixed(1)} CPS</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {isFinished && (
                                        <motion.div key="finish" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center z-20 space-y-6 bg-background/80 backdrop-blur-md p-10 rounded-[3rem] border shadow-2xl mx-10">
                                            <div className="flex justify-center gap-8 mb-4">
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase opacity-50">Stability</p>
                                                    <p className="text-3xl font-black text-primary">{stabilityScore.toFixed(0)}%</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[10px] font-black uppercase opacity-50">Avg Speed</p>
                                                    <p className="text-3xl font-black text-primary">{currentCPS.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <h3 className="text-6xl font-black tracking-tighter">ELITE DRILL DONE</h3>
                                            <div className="flex gap-4 justify-center">
                                                <Button size="lg" onClick={startTest} className="rounded-2xl h-14 px-8 font-black gap-2 shadow-xl shadow-primary/20">
                                                    <RotateCcw className="h-5 w-5" /> Retake
                                                </Button>
                                                <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 font-black gap-2">
                                                    <Share2 className="h-5 w-5" /> Share
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </CardContent>
                    </Card>

                    {/* Stability Graph */}
                    <Card className="rounded-[2.5rem] bg-muted/20 border-primary/5 overflow-hidden h-48">
                        <CardHeader className="py-3 px-8 flex flex-row items-center justify-between bg-muted/40">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <LineChart className="h-4 w-4" /> Velocity Consistency
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={cpsHistory}>
                                    <Area type="monotone" dataKey="cps" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.1)" strokeWidth={3} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'hsl(var(--card))' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Metrics & Info */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2.5rem] bg-primary text-primary-foreground p-8 shadow-xl shadow-primary/20 relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
                        <div className="relative z-10 text-center space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 flex items-center justify-center gap-2">
                                <Timer className="h-4 w-4" /> Pulse Remaining
                            </p>
                            <h2 className="text-7xl font-black tracking-tighter tabular-nums">{timeLeft}<span className="text-xl">s</span></h2>
                            <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-white" initial={{ width: '100%' }} animate={{ width: `${(timeLeft / duration) * 100}%` }} />
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-3xl p-6 text-center border-primary/10">
                            <p className="text-[10px] font-black uppercase opacity-40 mb-1">Max CPS</p>
                            <p className="text-3xl font-black">{bestCPS.toFixed(1)}</p>
                        </Card>
                        <Card className="rounded-3xl p-6 text-center border-primary/10">
                            <p className="text-[10px] font-black uppercase opacity-40 mb-1">Total Hits</p>
                            <p className="text-3xl font-black">{clicks}</p>
                        </Card>
                    </div>

                    <Card className="rounded-[2rem] border-primary/5 bg-secondary/20 p-6 space-y-4">
                        <h3 className="text-sm font-black flex items-center gap-2">
                            <Fingerprint className="h-4 w-4 text-primary" /> TECHNIQUE GUIDE
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <span className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-black">1</span>
                                <p className="text-[11px] font-medium opacity-70">Tense your forearm to create high-frequency micro-shaking.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-black">2</span>
                                <p className="text-[11px] font-medium opacity-70">Focus on the center; wide jittering reduces accuracy and speed.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="h-6 w-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-black">3</span>
                                <p className="text-[11px] font-medium opacity-70 text-destructive font-bold">Limit sessions to 10s to avoid RSI and maintain peak muscle tension.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
