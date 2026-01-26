'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Timer, MousePointer2, Trophy, BarChart3, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const TIME_MODES = [1, 5, 10, 30, 60];

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
    const [ripples, setRipples] = useState<ClickRipple[]>([]);
    const [cpsHistory, setCpsHistory] = useState<{ time: number; cps: number }[]>([]);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const clickCountRef = useRef(0);

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
        clickCountRef.current = 0;
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

                    // Update CPS history every 0.5s or so
                    if (Math.floor(next * 10) % 5 === 0) {
                        const elapsed = selectedTime - next;
                        const instantCps = elapsed > 0 ? clickCountRef.current / elapsed : 0;
                        setCpsHistory(h => [...h, { time: parseFloat(elapsed.toFixed(1)), cps: parseFloat(instantCps.toFixed(2)) }]);
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

        setClicks((prev) => prev + 1);
        clickCountRef.current += 1;

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
        clickCountRef.current = 0;
        setTimeLeft(selectedTime);
        setCpsHistory([]);
    };

    const currentCps = isFinished ? (clicks / selectedTime) : (clicks / (selectedTime - timeLeft) || 0);
    const rank = getRank(currentCps);

    return (
        <div className="mx-auto max-w-6xl space-y-8">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Main Interaction Area */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="overflow-hidden border-primary/20 shadow-2xl relative bg-card/50 backdrop-blur-md rounded-[2.5rem]">
                        <CardHeader className="bg-muted/30 border-b pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <MousePointer2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <CardTitle>Click Arena</CardTitle>
                                        <CardDescription>Test your trigger speed</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2 bg-muted/50 p-1 rounded-2xl">
                                    {TIME_MODES.map((mode) => (
                                        <Button
                                            key={mode}
                                            variant={selectedTime === mode ? 'default' : 'ghost'}
                                            size="sm"
                                            className="rounded-xl h-9 px-4 font-bold"
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
                        <CardContent className="p-0 relative h-[450px]">
                            <motion.div
                                onClick={handleClick}
                                className={`h-full flex flex-col items-center justify-center cursor-crosshair select-none transition-colors relative overflow-hidden ${isActive ? 'bg-primary/5' : 'bg-background hover:bg-muted/30'}`}
                            >
                                <AnimatePresence>
                                    {ripples.map(ripple => (
                                        <motion.div
                                            key={ripple.id}
                                            initial={{ scale: 0, opacity: 0.5 }}
                                            animate={{ scale: 4, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                left: ripple.x - 20,
                                                top: ripple.y - 20,
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                backgroundColor: 'hsl(var(--primary))',
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    ))}
                                </AnimatePresence>

                                {isActive ? (
                                    <div className="text-center space-y-2 z-10">
                                        <motion.div
                                            key={clicks}
                                            initial={{ scale: 0.9, opacity: 0.8 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-9xl font-black tracking-tighter text-primary drop-shadow-2xl"
                                        >
                                            {clicks}
                                        </motion.div>
                                        <p className="text-muted-foreground font-black uppercase tracking-[0.2em] animate-pulse">Live Speed: {currentCps.toFixed(1)} CPS</p>
                                    </div>
                                ) : isFinished ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center space-y-8 p-12 z-20 bg-background/80 backdrop-blur-xl rounded-[3rem] border shadow-2xl mx-12"
                                    >
                                        <div className="flex justify-center -mt-20">
                                            <div className={`h-24 w-24 ${rank.bg} rounded-3xl flex items-center justify-center shadow-xl`}>
                                                <Trophy className={`h-12 w-12 ${rank.color}`} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className={`text-sm font-black uppercase tracking-widest ${rank.color}`}>Rank: {rank.name}</p>
                                            <h3 className="text-7xl font-black tracking-tighter">{currentCps.toFixed(2)} <span className="text-2xl opacity-50">CPS</span></h3>
                                            <p className="text-muted-foreground font-medium">{rank.desc}</p>
                                        </div>
                                        <div className="flex gap-4 justify-center">
                                            <Button onClick={resetTest} size="lg" className="rounded-2xl px-10 h-14 font-black text-lg shadow-xl shadow-primary/20">
                                                <RotateCcw className="mr-2 h-5 w-5" /> Retake
                                            </Button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-center space-y-6 z-10">
                                        <div className="h-24 w-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-primary/20 animate-bounce">
                                            <MousePointer2 className="h-12 w-12 text-primary" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-4xl font-black tracking-tight">Click to Start</h3>
                                            <p className="text-muted-foreground max-w-xs mx-auto">The timer will begin as soon as you perform your first click.</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>

                    {/* Live Analytics Chart */}
                    <Card className="rounded-[2.5rem] border-primary/5 shadow-xl overflow-hidden bg-muted/20">
                        <CardHeader className="py-4 px-8 border-b bg-muted/40 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" /> Performance Graph
                            </CardTitle>
                            {isActive && <div className="text-[10px] font-bold text-primary animate-pulse flex items-center gap-1"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> RECORDING...</div>}
                        </CardHeader>
                        <CardContent className="p-0 h-48">
                            {cpsHistory.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={cpsHistory}>
                                        <defs>
                                            <linearGradient id="cpsGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--primary)/0.1)', fontSize: '10px' }}
                                            labelStyle={{ display: 'none' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="cps"
                                            stroke="hsl(var(--primary))"
                                            fillOpacity={1}
                                            fill="url(#cpsGradient)"
                                            strokeWidth={3}
                                            animationDuration={300}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground/30 font-bold uppercase tracking-widest text-xs">
                                    Practice to see data
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[2rem] border-primary/10 bg-primary shadow-xl shadow-primary/20 text-primary-foreground overflow-hidden relative">
                        <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
                        <CardContent className="pt-8 text-center relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Timer Status</p>
                            <div className="text-7xl font-black tabular-nums tracking-tighter mb-4">
                                {timeLeft.toFixed(1)}<span className="text-xl opacity-60 ml-1">s</span>
                            </div>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: '100%' }}
                                    animate={{ width: `${(timeLeft / selectedTime) * 100}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 gap-4">
                        <Card className="rounded-3xl border-primary/10 shadow-sm">
                            <CardContent className="pt-6 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">High Score</p>
                                <p className="text-3xl font-black tabular-nums">{maxCps.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-3xl border-primary/10 shadow-sm">
                            <CardContent className="pt-6 text-center">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Clicks</p>
                                <p className="text-3xl font-black tabular-nums">{clicks}</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="rounded-3xl border-primary/5 bg-secondary/20 shadow-inner">
                        <CardHeader className="py-4">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <Fingerprint className="h-4 w-4" /> Global Benchmarks
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-[11px]">
                            {[
                                { name: 'Normal', cps: '3-6', level: 'Casual' },
                                { name: 'Gaming', cps: '7-9', level: 'Advanced' },
                                { name: 'Butterfly', cps: '10-15', level: 'Pro' },
                                { name: 'Jitter', cps: '12-16', level: 'Grandmaster' },
                                { name: 'DragClick', cps: '20-50', level: 'System Limit' },
                            ].map((b, i) => (
                                <div key={i} className="flex justify-between items-center px-6 py-3 border-b border-primary/5 last:border-0 hover:bg-primary/5 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-primary">{b.name}</span>
                                        <span className="opacity-50 text-[9px]">{b.level}</span>
                                    </div>
                                    <Badge variant="outline" className="font-mono">{b.cps} CPS</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-bold hover:bg-destructive hover:text-white transition-colors" onClick={() => { setMaxCps(0); resetTest(); }}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset High Score
                    </Button>
                </div>
            </div>
        </div>
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
