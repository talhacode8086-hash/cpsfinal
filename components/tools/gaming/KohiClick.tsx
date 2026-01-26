'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Timer, Trophy, RotateCcw, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KohiClickTest() {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [clicks, setClicks] = useState(0);
    const [bestCPS, setBestCPS] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTest = useCallback(() => {
        setIsActive(true);
        setClicks(0);
        setTimeLeft(10);
        setIsFinished(false);
    }, []);

    const handleClick = () => {
        if (!isActive && !isFinished) {
            startTest();
        }
        if (isActive) {
            setClicks((prev) => prev + 1);
        }
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0.1) {
                        clearInterval(timerRef.current!);
                        setIsActive(false);
                        setIsFinished(true);
                        return 0;
                    }
                    return parseFloat((prev - 0.1).toFixed(1));
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
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Timer className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Time</p>
                        <p className="text-3xl font-black">{timeLeft}s</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <MousePointer2 className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Clicks</p>
                        <p className="text-3xl font-black">{clicks}</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Best CPS</p>
                        <p className="text-3xl font-black">{bestCPS.toFixed(1)}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-muted/20 relative group overflow-hidden">
                <div
                    className="h-[400px] flex flex-col items-center justify-center cursor-pointer select-none"
                    onClick={handleClick}
                >
                    <AnimatePresence mode="wait">
                        {!isActive && !isFinished && (
                            <motion.div
                                key="start"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2 border border-primary/20 group-hover:rotate-12 transition-transform">
                                    <Activity className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black tracking-tight uppercase">Kohi Click Test</h3>
                                    <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Click to begin neural sync</p>
                                </div>
                            </motion.div>
                        )}

                        {isActive && (
                            <motion.div
                                key="active"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <p className="text-7xl font-black text-primary font-mono tabular-nums">{clicks}</p>
                                <div className="mt-2 flex items-center gap-2 justify-center">
                                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">LIVE FEED ACTIVE</p>
                                </div>
                            </motion.div>
                        )}

                        {isFinished && (
                            <motion.div
                                key="finished"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-center space-y-6"
                            >
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-primary">Sync Complete</p>
                                    <h3 className="text-6xl font-black tracking-tighter">{currentCPS.toFixed(1)} <span className="text-2xl opacity-50">CPS</span></h3>
                                    <p className="text-muted-foreground text-xs">A classic performance for Kohi players.</p>
                                </div>
                                <Button size="lg" onClick={() => setIsFinished(false)} className="rounded-xl h-12 px-8 gap-2 bg-primary hover:scale-105 transition-transform">
                                    <RotateCcw className="h-4 w-4" /> Reset Sync
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-lg font-bold">About Kohi Click Test</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    The Kohi Click Test traces its roots back to the legendary Minecraft PvP server, Kohi.
                    It became the industry standard for measuring click speed in competitive Minecraft
                    communities. Players often strive for 8+ CPS to secure better hit combos.
                </p>
            </div>
        </div>
    );
}
