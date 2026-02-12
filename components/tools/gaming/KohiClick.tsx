'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Timer, Trophy, RotateCcw, Activity, ShieldCheck, Terminal, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRO_RECORDS = [
    { name: 'Technoblade', cps: 10, note: 'The King of PvP' },
    { name: 'Dream', cps: 9.5, note: 'Manhunt Specialist' },
    { name: 'Huahwi', cps: 13, note: 'Legacy Legend' },
    { name: 'Cure My Soul', cps: 15, note: 'God Tier' }
];

export default function KohiClickTest() {
    const [isActive, setIsActive] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [clicks, setClicks] = useState(0);
    const [bestCPS, setBestCPS] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isLegacy, setIsLegacy] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            startTest();
        }, 2000);
    };

    const startTest = useCallback(() => {
        setIsActive(true);
        setClicks(0);
        setTimeLeft(10);
        setIsFinished(false);
    }, []);

    const handleClick = () => {
        if (!isActive && !isFinished && !isSyncing) {
            startSync();
        }
        if (isActive) {
            setClicks((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    const next = Math.max(0, prev - 0.1);
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
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (isFinished) {
            const cps = clicks / 10;
            if (cps > bestCPS) setBestCPS(cps);
        }
    }, [isFinished, clicks, bestCPS]);

    const currentCPS = isActive ? (clicks / (10 - timeLeft) || 0) : (clicks / 10 || 0);

    return (
        <div className={`mx-auto max-w-5xl space-y-8 pb-20 transition-all duration-500 ${isLegacy ? 'font-mono' : ''}`}>
            {/* Mode Selector */}
            <div className="flex justify-center">
                <div className="bg-muted p-1 rounded-2xl flex gap-1 border shadow-inner">
                    <Button
                        variant={!isLegacy ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setIsLegacy(false)}
                        className="rounded-xl font-black px-6"
                    >Modern</Button>
                    <Button
                        variant={isLegacy ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setIsLegacy(true)}
                        className="rounded-xl font-black px-6"
                    >Legacy (Kohi)</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <StatCard icon={<Timer className="h-4 w-4" />} label="Time" value={`${timeLeft}s`} />
                <StatCard icon={<MousePointer2 className="h-4 w-4" />} label="Hits" value={clicks} />
                <StatCard icon={<ShieldCheck className="h-4 w-4" />} label="Session" value={isActive ? 'LINKED' : 'READY'} color={isActive ? 'text-green-500' : ''} />
                <StatCard icon={<Trophy className="h-4 w-4 text-yellow-500" />} label="Personal Best" value={bestCPS.toFixed(1)} />
            </div>

            <Card className={`relative group overflow-hidden border-2 transition-all duration-500 ${isLegacy ? 'bg-[#1a1a1a] border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'border-primary/20 bg-muted/20 rounded-[3rem]'}`}>
                {isLegacy && <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />}

                <div
                    className="h-[450px] flex flex-col items-center justify-center cursor-pointer select-none relative z-10"
                    onClick={handleClick}
                >
                    <AnimatePresence mode="wait">
                        {isSyncing && (
                            <motion.div key="sync" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className={`h-20 w-20 border-4 border-t-primary rounded-full mx-auto ${isLegacy ? 'border-green-500 border-t-transparent' : ''}`}
                                />
                                <p className={`text-sm font-black tracking-[0.3em] uppercase animate-pulse ${isLegacy ? 'text-green-500' : 'text-primary'}`}>Establishing Neural Link...</p>
                            </motion.div>
                        )}

                        {!isActive && !isFinished && !isSyncing && (
                            <motion.div key="start" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6">
                                <div className={`h-20 w-20 ${isLegacy ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-primary/10 text-primary border-primary/20'} rounded-2xl flex items-center justify-center mx-auto mb-2 border transition-transform group-hover:scale-110`}>
                                    {isLegacy ? <Terminal className="h-10 w-10" /> : <HeartPulse className="h-10 w-10 animate-pulse" />}
                                </div>
                                <div className="space-y-2">
                                    <h3 className={`text-3xl font-black tracking-tight uppercase ${isLegacy ? 'text-green-400' : ''}`}>Kohi Sync Protocol</h3>
                                    <p className="text-muted-foreground text-[10px] font-black tracking-[0.3em] uppercase opacity-70">Initialize input sequence</p>
                                </div>
                            </motion.div>
                        )}

                        {isActive && (
                            <motion.div key="active" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                                <p className={`text-[12rem] font-black leading-none tracking-tighter tabular-nums ${isLegacy ? 'text-green-500 drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'text-primary'}`}>{clicks}</p>
                                <div className={`mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${isLegacy ? 'border-green-500/30 bg-green-500/5 text-green-500' : 'border-primary/20 bg-primary/5 text-primary'}`}>
                                    <div className={`h-2 w-2 rounded-full animate-pulse ${isLegacy ? 'bg-green-500' : 'bg-primary'}`} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">{currentCPS.toFixed(1)} CPS ACTIVE</p>
                                </div>
                            </motion.div>
                        )}

                        {isFinished && (
                            <motion.div key="finished" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-center space-y-8 p-12 rounded-[3.5rem] border shadow-2xl mx-10 ${isLegacy ? 'bg-[#111] border-green-500/50' : 'bg-background/90 backdrop-blur-xl'}`}>
                                <div className="space-y-1">
                                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLegacy ? 'text-green-500' : 'text-primary'}`}>Neural Sync Log</p>
                                    <h3 className={`text-8xl font-black tracking-tighter ${isLegacy ? 'text-white' : ''}`}>{currentCPS.toFixed(2)} <span className="text-2xl opacity-50">CPS</span></h3>
                                    <p className="text-muted-foreground font-medium">Standard Kohi Efficiency: {currentCPS > 10 ? 'Elite' : 'Competent'}</p>
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <Button size="lg" onClick={() => setIsFinished(false)} className={`rounded-2xl h-14 px-10 font-black gap-2 transition-transform hover:scale-105 ${isLegacy ? 'bg-green-600 hover:bg-green-500 text-black' : ''}`}>
                                        <RotateCcw className="h-5 w-5" /> RE-SYNC
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-12">
                {/* Legacy Info */}
                <div className="md:col-span-8 flex flex-col justify-center p-8 rounded-[2.5rem] border bg-card/50 backdrop-blur-sm space-y-4">
                    <h3 className="text-xl font-black tracking-tight uppercase flex items-center gap-3 italic">
                        <Terminal className="h-6 w-6 text-primary" /> The Kohi Legacy
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                        Born on the legendary Kohi server, this test defined a generation of Minecraft players.
                        It focuses on raw input consistency. In high-level PvP, maintaining a steady 8-12 CPS
                        is critical for managing knockback (KB) and landing the perfect hit combos.
                    </p>
                    <div className="pt-4 border-t border-primary/10 flex gap-6 mt-4">
                        <div className="text-center">
                            <p className="text-lg font-black tracking-tighter">8-10</p>
                            <p className="text-[9px] font-black uppercase opacity-40 italic">Pro Target</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-black tracking-tighter">12+</p>
                            <p className="text-[9px] font-black uppercase opacity-40 italic">Elite Tier</p>
                        </div>
                    </div>
                </div>

                {/* Pro Benchmarks */}
                <Card className="md:col-span-4 rounded-[2.5rem] border-primary/5 bg-secondary/10 overflow-hidden">
                    <CardHeader className="py-4 bg-secondary/20">
                        <CardTitle className="text-xs font-black uppercase tracking-[0.1em] flex items-center gap-2">
                            <Activity className="h-4 w-4" /> Pro Benchmarks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {PRO_RECORDS.map((rec, i) => (
                            <div key={i} className="flex justify-between items-center px-6 py-4 border-b border-primary/5 last:border-0 hover:bg-primary/5 transition-colors">
                                <div>
                                    <p className="text-xs font-black">{rec.name}</p>
                                    <p className="text-[10px] opacity-50">{rec.note}</p>
                                </div>
                                <span className="font-mono font-black text-primary">{rec.cps} CPS</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color = '' }: any) {
    return (
        <Card className="rounded-[1.5rem] border-primary/5 bg-card shadow-sm">
            <CardContent className="pt-6 text-center space-y-1">
                <div className="flex justify-center mb-1 text-primary opacity-60">{icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</p>
                <p className={`text-2xl font-black tabular-nums tracking-tighter ${color}`}>{value}</p>
            </CardContent>
        </Card>
    );
}
