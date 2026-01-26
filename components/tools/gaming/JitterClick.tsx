'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Timer, Zap, Trophy, RotateCcw, LineChart, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function JitterClickTest() {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [clicks, setClicks] = useState(0);
    const [bestCPS, setBestCPS] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [duration, setDuration] = useState(10);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTest = useCallback(() => {
        setIsActive(true);
        setClicks(0);
        setTimeLeft(duration);
        setIsFinished(false);
    }, [duration]);

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
            const cps = clicks / duration;
            if (cps > bestCPS) setBestCPS(cps);
        }
    }, [isFinished, clicks, duration, bestCPS]);

    const currentCPS = isActive ? (clicks / (duration - timeLeft) || 0) : (clicks / duration || 0);

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* HUD */}
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
            <Card className="overflow-hidden border-2 border-dashed border-primary/30 bg-muted/20 relative group">
                <div
                    className={cn(
                        "h-[400px] flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300",
                        isActive ? "bg-primary/5" : "hover:bg-primary/5"
                    )}
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
                                <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                    <MousePointer2 className="h-10 w-10 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">JITTER CLICK TEST</h3>
                                    <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest">Click to start the challenge</p>
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
                                <p className="text-8xl font-black text-primary drop-shadow-2xl">{clicks}</p>
                                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">KEEP VIBRATING!</p>
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
                                    <p className="text-sm font-bold uppercase text-primary">Test Results</p>
                                    <h3 className="text-6xl font-black tracking-tighter">{currentCPS.toFixed(2)} <span className="text-2xl">CPS</span></h3>
                                    <p className="text-muted-foreground">You clicked {clicks} times in {duration} seconds.</p>
                                </div>
                                <Button size="lg" onClick={() => setIsFinished(false)} className="rounded-xl h-12 px-8 gap-2">
                                    <RotateCcw className="h-4 w-4" /> Try Again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Visual Clicks (Ripple Effect placeholder logic) */}
                {isActive && (
                    <div className="absolute top-4 right-4 text-[10px] font-bold text-primary opacity-50 flex items-center gap-1">
                        <Activity className="h-3 w-3 animate-pulse" /> LIVE ACCURACY TRACKING
                    </div>
                )}
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-8 rounded-2xl border bg-muted/30 space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        What is Jitter Clicking?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Jitter clicking is a technique involving fast arm muscles vibrations to achieve high click rates (10-14 CPS).
                        It is popular among Minecraft PvPers for better knockback and hit registration.
                    </p>
                    <div className="text-[10px] text-destructive font-bold uppercase p-2 border border-destructive/20 rounded-lg bg-destructive/5 leading-relaxed">
                        ⚠️ Warning: Excessive jitter clicking can lead to strain. Take regular breaks and stop if you feel pain.
                    </div>
                </div>
                <div className="p-8 rounded-2xl border bg-primary/5 space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <LineChart className="h-5 w-5 text-primary" />
                        Pro Technique Tips
                    </h3>
                    <ul className="space-y-2">
                        {[
                            'Position your hand like a claw.',
                            'Vibrate your hand by tensing your forearm.',
                            'Keep your wrist locked and use your arm muscles.',
                            'Practice in short 5s bursts first.'
                        ].map(tip => (
                            <li key={tip} className="flex gap-2 text-xs text-muted-foreground">
                                <ChevronRight className="h-3 w-3 text-primary shrink-0 transition-transform" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
