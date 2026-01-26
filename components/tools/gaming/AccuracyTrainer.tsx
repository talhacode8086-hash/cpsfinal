'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AccuracyTrainer() {
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [target, setTarget] = useState<{ x: number, y: number, id: number } | null>(null);
    const [difficulty, setDifficulty] = useState(1);
    const [timeLeft, setTimeLeft] = useState(30);

    const spawnTarget = useCallback(() => {
        setTarget({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            id: Date.now()
        });
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const startGame = () => {
        setScore(0);
        setMisses(0);
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

    const handleArenaClick = () => {
        if (!isActive) return;
        setMisses(prev => prev + 1);
    };

    const accuracy = score + misses === 0 ? 100 : (score / (score + misses)) * 100;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card><CardContent className="pt-6 px-4">
                    <div className="text-xs text-muted-foreground uppercase">Score</div>
                    <div className="text-2xl font-bold">{score}</div>
                </CardContent></Card>
                <Card><CardContent className="pt-6 px-4">
                    <div className="text-xs text-muted-foreground uppercase">Accuracy</div>
                    <div className="text-2xl font-bold">{accuracy.toFixed(1)}%</div>
                </CardContent></Card>
                <Card><CardContent className="pt-6 px-4">
                    <div className="text-xs text-muted-foreground uppercase">Time</div>
                    <div className="text-2xl font-bold">{timeLeft}s</div>
                </CardContent></Card>
                <Card><CardContent className="pt-6 px-4">
                    <div className="text-xs text-muted-foreground uppercase">High Score</div>
                    <div className="text-2xl font-bold opacity-50">0</div>
                </CardContent></Card>
            </div>

            <div
                className="relative h-[500px] bg-zinc-950 rounded-3xl overflow-hidden border-4 border-muted cursor-crosshair"
                onClick={handleArenaClick}
            >
                {!isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                        <div className="text-center space-y-4">
                            <Target className="h-16 w-16 text-primary mx-auto opacity-50" />
                            <h2 className="text-3xl font-black text-white">READY TO TRAIN?</h2>
                            <p className="text-zinc-400">30 seconds to hit as many targets as possible.</p>
                            <Button size="lg" onClick={startGame} className="rounded-full px-12">START TRAINING</Button>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence>
                        {target && (
                            <motion.div
                                key={target.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="absolute h-10 w-10 -ml-5 -mt-5 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.5)] border-4 border-white flex items-center justify-center"
                                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                                onMouseDown={handleTargetClick}
                            >
                                <div className="h-2 w-2 rounded-full bg-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}

                {isActive && (
                    <div className="absolute bottom-4 left-4 flex gap-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`h-2 w-8 rounded-full ${difficulty >= i ? 'bg-primary' : 'bg-muted'}`} />
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-muted/30 p-4 rounded-xl text-sm flex items-center gap-3">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span>Tip: Focus on small, controlled mouse movements rather than speed initially.</span>
            </div>
        </div>
    );
}
