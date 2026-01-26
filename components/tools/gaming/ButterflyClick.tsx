'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Zap, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ButterflyClickTest() {
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
            {/* HUD */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Timer className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Timer</p>
                        <p className="text-3xl font-black">{timeLeft}s</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Zap className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Current CPS</p>
                        <p className="text-3xl font-black">{currentCPS.toFixed(1)}</p>
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

            {/* Click Area */}
            <Card className="relative h-[400px] border-2 border-primary/10 overflow-hidden group">
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none z-10"
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
                                <div className="flex gap-4 justify-center items-center mb-6">
                                    <div className="h-12 w-8 bg-primary/10 rounded-full animate-bounce" />
                                    <div className="h-12 w-8 bg-primary/10 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight uppercase">Butterfly Click Test</h3>
                                    <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">Alternate fingers to start</p>
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
                                <p className="text-8xl font-black text-primary">{clicks}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Double finger power!</p>
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
                                    <p className="text-[10px] font-bold uppercase text-primary">Test Finished</p>
                                    <h3 className="text-6xl font-black tracking-tighter">{currentCPS.toFixed(2)} <span className="text-2xl opacity-50">CPS</span></h3>
                                    <p className="text-muted-foreground text-xs font-medium">Excellent coordination detected.</p>
                                </div>
                                <Button size="lg" onClick={() => setIsFinished(false)} className="rounded-xl h-12 px-10 gap-2">
                                    <RotateCcw className="h-4 w-4" /> Restart Test
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Background Visuals */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03)_0,transparent_100%)]" />
            </Card>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-lg font-bold">The Butterfly Technique</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Butterfly clicking is a technique where you alternate between your index and middle
                    finger on a single mouse button. This often causes the mouse to "double click" or
                    register twice the input. Top players can reach speeds of 20+ CPS with this method.
                </p>
            </div>
        </div>
    );
}
