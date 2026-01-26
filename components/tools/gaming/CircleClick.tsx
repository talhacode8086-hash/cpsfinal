'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, Target, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CircleClick() {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [isActive, setIsActive] = useState(false);
    const [targets, setTargets] = useState<{ id: number, angle: number }[]>([]);
    const radius = 150;

    const spawnTargets = useCallback(() => {
        const newTargets = [];
        for (let i = 0; i < 8; i++) {
            newTargets.push({ id: Math.random(), angle: (i * 45) * (Math.PI / 180) });
        }
        setTargets(newTargets);
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const start = () => {
        setScore(0);
        setTimeLeft(20);
        setIsActive(true);
        spawnTargets();
    };

    const handleHit = (id: number) => {
        setScore(s => s + 1);
        setTargets(prev => prev.filter(t => t.id !== id));
        if (targets.length === 1) {
            spawnTargets();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-muted">
                <div>
                    <h2 className="text-xl font-black">Circle Flow</h2>
                    <p className="text-xs text-muted-foreground">Pattern-based clicking accuracy</p>
                </div>
                <div className="flex gap-6">
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Hits</div>
                        <div className="text-2xl font-black text-primary">{score}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">Remaining</div>
                        <div className="text-2xl font-black">{timeLeft}s</div>
                    </div>
                </div>
            </div>

            <div className="relative h-[500px] bg-background rounded-3xl border-2 overflow-hidden flex items-center justify-center">
                <div className="absolute w-[300px] h-[300px] border-2 border-dashed border-muted rounded-full opacity-20" />

                {!isActive ? (
                    <div className="z-10 text-center space-y-4">
                        <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MousePointer2 className="h-10 w-10 text-primary" />
                        </div>
                        <Button size="lg" onClick={start} className="rounded-full px-12">BEGIN CHALLENGE</Button>
                    </div>
                ) : (
                    <div className="relative w-full h-full">
                        <AnimatePresence>
                            {targets.map(t => (
                                <motion.button
                                    key={t.id}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute h-12 w-12 -ml-6 -mt-6 rounded-full bg-card border-4 border-primary shadow-lg flex items-center justify-center group"
                                    style={{
                                        left: `calc(50% + ${Math.cos(t.angle) * radius}px)`,
                                        top: `calc(50% + ${Math.sin(t.angle) * radius}px)`
                                    }}
                                    onClick={() => handleHit(t.id)}
                                >
                                    <div className="h-4 w-4 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                                </motion.button>
                            ))}
                        </AnimatePresence>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <Target className="h-8 w-8 text-muted opacity-20" />
                        </div>
                    </div>
                )}
            </div>

            <Button variant="ghost" className="w-full gap-2" onClick={start} disabled={isActive}>
                <RotateCcw className="h-4 w-4" /> Restart
            </Button>
        </div>
    );
}
