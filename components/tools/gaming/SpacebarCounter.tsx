'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, Timer, Trophy, RotateCcw, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpacebarCounter() {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [hits, setHits] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [bestScore, setBestScore] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTest = useCallback(() => {
        setIsActive(true);
        setHits(0);
        setTimeLeft(5);
        setIsFinished(false);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Space') {
            e.preventDefault();
            if (!isActive && !isFinished) {
                startTest();
            }
            if (isActive) {
                setHits((prev) => prev + 1);
            }
        }
    }, [isActive, isFinished, startTest]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

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
            if (hits > bestScore) setBestScore(hits);
        }
    }, [isFinished, hits, bestScore]);

    return (
        <div className="mx-auto max-w-4xl space-y-8" onKeyDown={(e) => e.code === 'Space' && e.preventDefault()}>
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Timer className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Time Left</p>
                        <p className="text-3xl font-black">{timeLeft}s</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <BarChart2 className="h-5 w-5 text-primary mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Hits</p>
                        <p className="text-3xl font-black">{hits}</p>
                    </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                        <p className="text-[10px] font-bold uppercase text-muted-foreground">Record</p>
                        <p className="text-3xl font-black">{bestScore}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-muted/20 overflow-hidden relative">
                <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
                    <AnimatePresence mode="wait">
                        {!isActive && !isFinished && (
                            <motion.div
                                key="start"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="h-24 w-48 bg-background border-4 border-muted rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Press Spacebar</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight uppercase">Spacebar Speed Test</h3>
                                    <p className="text-muted-foreground text-xs font-medium max-w-xs mx-auto">Click into the window and start hammering your spacebar to begin.</p>
                                </div>
                            </motion.div>
                        )}

                        {isActive && (
                            <motion.div
                                key="active"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-4"
                            >
                                <p className="text-9xl font-black text-primary drop-shadow-2xl">{hits}</p>
                                <div className="flex gap-1 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="h-1 w-8 rounded-full bg-primary/20 overflow-hidden">
                                            <div className="h-full bg-primary animate-progress origin-left" style={{ animationDelay: `${i * 0.1}s` }} />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {isFinished && (
                            <motion.div
                                key="finished"
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="space-y-6"
                            >
                                <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
                                <div className="space-y-1">
                                    <h3 className="text-5xl font-black tracking-tighter">{hits} Hits</h3>
                                    <p className="text-muted-foreground text-sm">Average: {(hits / 5).toFixed(1)} Hits/sec</p>
                                </div>
                                <Button size="lg" onClick={() => setIsFinished(false)} className="rounded-full h-12 px-8 gap-2">
                                    <RotateCcw className="h-4 w-4" /> Try Again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>

            <div className="rounded-2xl border bg-muted/30 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Keyboard className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">How fast can you tap?</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    The spacebar test measures how many times you can press the spacebar key on your
                    keyboard in a fixed time period. It&apos;s used to test keyboard switch responsiveness
                    and your own finger speed. Pro players often hit 10+ HPS (Hits Per Second).
                </p>
            </div>
        </div>
    );
}
