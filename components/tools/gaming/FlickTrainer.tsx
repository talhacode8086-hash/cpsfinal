'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Target, Timer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FlickTrainer() {
    const [score, setScore] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [target, setTarget] = useState<{ x: number, y: number, id: number } | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [speed, setSpeed] = useState(1);

    const spawnTarget = useCallback(() => {
        setTarget({
            x: Math.random() * 70 + 15,
            y: Math.random() * 70 + 15,
            id: Date.now()
        });
    }, []);

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            timerInterval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(timerInterval);
    }, [isActive, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsActive(true);
        spawnTarget();
    };

    const handleTargetClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive) return;
        setScore(prev => prev + 1);
        spawnTarget();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Snap Practice
                    </h2>
                    <p className="text-sm text-muted-foreground">Train your flick shots for faster reaction times.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <div className="text-xs text-muted-foreground uppercase font-bold">Flicks</div>
                        <div className="text-2xl font-black">{score}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-muted-foreground uppercase font-bold">Time</div>
                        <div className="text-2xl font-black text-primary">{timeLeft}s</div>
                    </div>
                </div>
            </div>

            <div className="relative h-[500px] bg-slate-900 rounded-[2rem] overflow-hidden border-8 border-slate-800 shadow-2xl">
                {!isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-md z-20">
                        <div className="text-center p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-inner">
                            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">FLICK TRAINER</h3>
                            <p className="text-slate-400 mb-6 max-w-[250px]">Hit the center target as fast as possible after it spawns.</p>
                            <Button size="lg" onClick={startGame} className="w-full rounded-2xl h-14 text-lg">START SESSION</Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-slate-700 rounded-full" />
                        <AnimatePresence mode='wait'>
                            {target && (
                                <motion.button
                                    key={target.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="absolute h-8 w-8 -ml-4 -mt-4"
                                    style={{ left: `${target.x}%`, top: `${target.y}%` }}
                                    onMouseDown={handleTargetClick}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute w-full h-full rounded-full bg-red-500 animate-ping opacity-25" />
                                        <div className="absolute w-full h-full rounded-full border-4 border-red-500" />
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                    </div>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                        <Timer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Latency Adjusted</div>
                        <div className="text-xs text-muted-foreground">Calibration based on your display HZ</div>
                    </div>
                </div>
                <div className="bg-muted p-4 rounded-2xl flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                        <Zap className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Dynamic Scaling</div>
                        <div className="text-xs text-muted-foreground">Targets get smaller as you hit streaks</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
