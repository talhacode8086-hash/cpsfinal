'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Timer, MousePointer2, Trophy, BarChart3, Fingerprint, Zap, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const TIME_MODES = [1, 5, 10, 30, 60, 100];

interface ClickRipple {
    id: number;
    x: number;
    y: number;
}

export default function CPSTest() {
    const [timeLeft, setTimeLeft] = useState(5);
    const [selectedTime, setSelectedTime] = useState(5);
    const [clicks, setClicks] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [maxCps, setMaxCps] = useState(0);
    const [peakBurst, setPeakBurst] = useState(0);
    const [ripples, setRipples] = useState<ClickRipple[]>([]);
    const [cpsHistory, setCpsHistory] = useState<{ time: number; cps: number }[]>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const clickCountRef = useRef(0);
    const lastWindowClicksRef = useRef<number[]>([]);

    const getRank = (cps: number) => {
        if (cps >= 15) return { name: 'The Flash', color: 'text-purple-500', bg: 'bg-purple-500/10', desc: 'God-like clicking speed!' };
        if (cps >= 12) return { name: 'Cheetah', color: 'text-red-500', bg: 'bg-red-500/10', desc: 'Incredible reflexes.' };
        if (cps >= 10) return { name: 'Rabbit', color: 'text-orange-500', bg: 'bg-orange-500/10', desc: 'Pro gamer level.' };
        if (cps >= 7) return { name: 'Cat', color: 'text-green-500', bg: 'bg-green-500/10', desc: 'Faster than average.' };
        if (cps >= 5) return { name: 'Human', color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Standard human speed.' };
        return { name: 'Sloth', color: 'text-slate-400', bg: 'bg-slate-400/10', desc: 'Need more practice!' };
    };

    const startTest = useCallback(() => {
        setIsActive(true);
        setIsFinished(false);
        setClicks(0);
        setPeakBurst(0);
        clickCountRef.current = 0;
        lastWindowClicksRef.current = [];
        setTimeLeft(selectedTime);
        setCpsHistory([]);
    }, [selectedTime]);

    const endTest = useCallback(() => {
        setIsActive(false);
        setIsFinished(true);
        if (timerRef.current) clearInterval(timerRef.current);

        const currentCpsVal = clickCountRef.current / selectedTime;
        if (currentCpsVal > maxCps) {
            setMaxCps(currentCpsVal);
        }
    }, [selectedTime, maxCps]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = Math.max(0, prev - 0.1);

                    // Update CPS history every 0.1s for high precision
                    const elapsed = selectedTime - next;
                    const instantCps = elapsed > 0 ? clickCountRef.current / elapsed : 0;

                    if (Math.floor(next * 10) % 2 === 0) { // Every 0.2s
                        setCpsHistory(h => [...h, {
                            time: parseFloat(elapsed.toFixed(1)),
                            cps: parseFloat(instantCps.toFixed(2))
                        }].slice(-50)); // Keep last 50 points for long tests
                    }

                    if (next <= 0) {
                        endTest();
                        return 0;
                    }
                    return next;
                });
            }, 100);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, selectedTime, endTest]);

    const handleClick = (e: React.MouseEvent) => {
        if (isFinished) return;

        if (!isActive) {
            startTest();
        }

        const now = performance.now();
        setClicks((prev) => prev + 1);
        clickCountRef.current += 1;

        // Calculate burst (last 1 second rolling window)
        lastWindowClicksRef.current.push(now);
        const oneSecAgo = now - 1000;
        lastWindowClicksRef.current = lastWindowClicksRef.current.filter(t => t > oneSecAgo);
        const currentBurst = lastWindowClicksRef.current.length;
        if (currentBurst > peakBurst) setPeakBurst(currentBurst);

        // Add ripple
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        setRipples(r => [...r, newRipple]);
        setTimeout(() => {
            setRipples(r => r.filter(rip => rip.id !== newRipple.id));
        }, 600);
    };

    const resetTest = () => {
        setIsActive(false);
        setIsFinished(false);
        setClicks(0);
        setPeakBurst(0);
        clickCountRef.current = 0;
        setTimeLeft(selectedTime);
        setCpsHistory([]);
    };

    const currentCps = isFinished ? (clicks / selectedTime) : (clicks / (selectedTime - timeLeft) || 0);
    const rank = getRank(currentCps);

    return (
        <div className="mx-auto max-w-6xl space-y-8 pb-20">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Main Interaction Area */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="overflow-hidden border-2 border-primary/10 shadow-2xl relative bg-card/50 backdrop-blur-xl rounded-[3rem] transition-all hover:border-primary/30">
                        <CardHeader className="bg-muted/30 border-b pb-6 px-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                        <MousePointer2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black italic">ELITE ARENA</CardTitle>
                                        <CardDescription className="font-bold uppercase tracking-widest text-[10px]">Neural-Speed Calibration</CardDescription>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 bg-muted/50 p-1.5 rounded-2xl border">
                                    {TIME_MODES.map((mode) => (
                                        <Button
                                            key={mode}
                                            variant={selectedTime === mode ? 'default' : 'ghost'}
                                            size="sm"
                                            className="rounded-xl h-10 px-4 font-black text-xs"
                                            onClick={() => {
                                                setSelectedTime(mode);
                                                setTimeLeft(mode);
                                                resetTest();
                                            }}
                                            disabled={isActive}
                                        >
                                            {mode}s
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 relative h-[480px]">
                            <motion.div
                                onClick={handleClick}
                                className={`h-full flex flex-col items-center justify-center cursor-crosshair select-none transition-all relative overflow-hidden ${isActive ? 'bg-primary/5' : 'bg-background hover:bg-muted/20'}`}
                            >
                                <AnimatePresence>
                                    {ripples.map(ripple => (
                                        <motion.div
                                            key={ripple.id}
                                            initial={{ scale: 0, opacity: 0.6 }}
                                            animate={{ scale: 6, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                left: ripple.x - 20,
                                                top: ripple.y - 20,
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: 'hsl(var(--primary))',
                                                pointerEvents: 'none',
                                                zIndex: 1
                                            }}
                                        />
                                    ))}
                                </AnimatePresence>

                                {isActive ? (
                                    <div className="text-center space-y-4 z-10">
                                        <motion.div
                                            key={clicks}
                                            initial={{ scale: 0.8, opacity: 0.5 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-[12rem] font-black tracking-tighter text-primary drop-shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] leading-none"
                                        >
                                            {clicks}
                                        </motion.div>
                                        <div className="flex flex-col items-center gap-1">
                                            <p className="text-muted-foreground font-black uppercase tracking-[0.3em] text-xs animate-pulse">Live Optimization: {currentCps.toFixed(1)} CPS</p>
                                            <div className="flex gap-2">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary font-black">BURST: {peakBurst} CPS</Badge>
                                            </div>
                                        </div>
                                    </div>
                                ) : isFinished ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="text-center space-y-8 p-12 z-20 bg-background/90 backdrop-blur-2xl rounded-[4rem] border shadow-[0_32px_64px_rgba(0,0,0,0.2)] mx-12 border-primary/20"
                                    >
                                        <div className="flex justify-center -mt-24">
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className={`h-28 w-28 ${rank.bg} rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-white/10`}
                                            >
                                                <Trophy className={`h-14 w-14 ${rank.color}`} />
                                            </motion.div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className={`text-xs font-black uppercase tracking-[0.4em] ${rank.color}`}>Classification: {rank.name}</p>
                                            <h3 className="text-8xl font-black tracking-tighter">{currentCps.toFixed(2)} <span className="text-3xl opacity-30 font-light">CPS</span></h3>
                                            <p className="text-muted-foreground font-bold tracking-tight max-w-xs mx-auto text-sm">{rank.desc}</p>
                                        </div>
                                        <div className="flex gap-4 justify-center">
                                            <Button onClick={resetTest} size="lg" className="rounded-2xl px-12 h-16 font-black text-xl shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95">
                                                <RotateCcw className="mr-3 h-6 w-6" /> PULSE RESTART
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center space-y-8 z-10 group">
                                        <div className="h-28 w-28 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 border-2 border-primary/20 transition-all group-hover:rotate-6 group-hover:scale-110 shadow-xl shadow-primary/5">
                                            <MousePointer2 className="h-14 w-14 text-primary" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-5xl font-black tracking-tighter text-foreground/90 uppercase italic">Init Sequence</h3>
                                            <p className="text-muted-foreground max-w-xs mx-auto font-medium opacity-60">Timer triggers on the first interaction vector.</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>

                    {/* High Precision Analytics */}
                    <Card className="rounded-[3rem] border-primary/5 shadow-2xl overflow-hidden bg-muted/20">
                        <CardHeader className="py-5 px-10 border-b bg-muted/40 flex flex-row items-center justify-between">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 flex items-center gap-3 italic">
                                <BarChart3 className="h-4 w-4 text-primary" /> Velocity Vector Stream
                            </CardTitle>
                            {isActive && <div className="text-[10px] font-bold text-primary animate-pulse flex items-center gap-2"><div className="w-2 h-2 bg-primary rounded-full" /> CAPTURING DATA...</div>}
                        </CardHeader>
                        <CardContent className="p-0 h-56">
                            {cpsHistory.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={cpsHistory}>
                                        <defs>
                                            <linearGradient id="cpsGlow" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '16px', border: '1px solid hsl(var(--primary)/20%)', fontSize: '12px', fontWeight: '900', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                            labelStyle={{ display: 'none' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="cps"
                                            stroke="hsl(var(--primary))"
                                            fillOpacity={1}
                                            fill="url(#cpsGlow)"
                                            strokeWidth={4}
                                            animationDuration={150}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                                    <BarChart3 className="h-10 w-10" />
                                    <p className="font-black uppercase tracking-widest text-[10px]">Awaiting active stream...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats & Expert Info */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2.5rem] border-none bg-primary shadow-2xl shadow-primary/30 text-primary-foreground overflow-hidden relative group">
                        <div className="absolute -right-20 -top-20 h-60 w-60 bg-white/10 rounded-full blur-[80px] transition-transform group-hover:scale-150 duration-700" />
                        <CardContent className="pt-10 pb-8 text-center relative z-10 transition-transform group-hover:translate-y-[-4px]">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-4">
                                <Clock className="h-3 w-3" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Temporal Sync</span>
                            </div>
                            <div className="text-[10rem] md:text-[8rem] font-black tabular-nums tracking-[-0.08em] leading-none mb-4 drop-shadow-2xl">
                                {timeLeft.toFixed(1)}
                            </div>
                            <div className="px-10">
                                <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden border border-white/10">
                                    <motion.div
                                        className="h-full bg-white shadow-[0_0_15px_white]"
                                        initial={{ width: '100%' }}
                                        animate={{ width: `${(timeLeft / selectedTime) * 100}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <StatWidget icon={<Zap className="h-4 w-4 text-orange-400" />} label="Peak Burst" value={`${peakBurst} CPS`} />
                        <StatWidget icon={<Fingerprint className="h-4 w-4 text-primary" />} label="Total Hits" value={clicks} />
                    </div>

                    <Card className="rounded-[2.5rem] border-primary/5 bg-secondary/20 shadow-inner p-2">
                        <CardHeader className="py-5 px-6">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3">
                                <Trophy className="h-4 w-4 text-primary" /> Mastery tiers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-[11px] space-y-1">
                            {[
                                { name: 'CASUAL', cps: '2-5', rank: 'A' },
                                { name: 'PRO-PLAYER', cps: '8-11', rank: 'S' },
                                { name: 'DRAG-FLICK', cps: '15-25', rank: 'SS' },
                                { name: 'NEURAL-LIMIT', cps: '50+', rank: 'GOD' },
                            ].map((b, i) => (
                                <div key={i} className="flex justify-between items-center px-6 py-4 rounded-3xl hover:bg-primary/5 transition-all group cursor-default mx-1">
                                    <div className="flex flex-col">
                                        <span className="font-black text-primary/80 group-hover:text-primary transition-colors">{b.name}</span>
                                        <span className="opacity-40 text-[9px] font-bold">SECTOR RANK: {b.rank}</span>
                                    </div>
                                    <Badge variant="outline" className="font-black px-3 py-1 bg-background shadow-sm border-primary/10">{b.cps} CPS</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full h-16 rounded-[2rem] border-2 font-black text-xs hover:bg-destructive hover:text-white transition-all shadow-lg active:scale-95 group" onClick={() => { setMaxCps(0); resetTest(); }}>
                        <RotateCcw className="mr-3 h-5 w-5 transition-transform group-hover:rotate-[-180deg] duration-500" /> WIPE LOCAL CORE DATA
                    </Button>
                </div>
            </div>
        </div>
    );
}

function StatWidget({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <Card className="rounded-[2rem] border-primary/10 shadow-xl overflow-hidden group hover:border-primary/40 transition-all">
            <CardContent className="p-6 text-center space-y-2 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/5" />
                <div className="flex justify-center transition-transform group-hover:scale-110">{icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</p>
                <p className="text-2xl font-black tabular-nums tracking-tighter">{value}</p>
            </CardContent>
        </Card>
    );
}

function Badge({ children, variant = 'default', className }: any) {
    const variants: any = {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-primary/20 text-primary',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive/10 text-destructive'
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
