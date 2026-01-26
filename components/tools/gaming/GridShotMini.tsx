'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GridShotMini() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [activeTarget, setActiveTarget] = useState<number | null>(null);
    const timerRef = useRef<any>(null);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTime(30);
        spawnTarget();

        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setState('result');
    };

    const spawnTarget = useCallback(() => {
        const next = Math.floor(Math.random() * 9);
        setActiveTarget(next);
    }, []);

    const handleTargetClick = (index: number) => {
        if (state !== 'playing' || index !== activeTarget) return;
        setScore(s => s + 1);
        spawnTarget();
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <LayoutGrid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Grid Shot Mini</CardTitle>
                <p className="text-muted-foreground mt-2">High-speed precision clicking in a compact 3x3 grid.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Score: {score}</span>
                    <span>Time: {time}s</span>
                </div>

                <div className="relative w-full aspect-square md:aspect-video bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 p-8 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6 w-full max-w-[400px]">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-2xl transition-all flex items-center justify-center cursor-pointer ${activeTarget === i ? 'bg-primary shadow-xl shadow-primary/40 scale-105' : 'bg-primary/5 border border-primary/5'
                                    }`}
                                onClick={() => handleTargetClick(i)}
                            >
                                {activeTarget === i && <Target className="text-white h-8 w-8" />}
                            </div>
                        ))}
                    </div>

                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14" onClick={startGame}>
                                Start Gridshot
                            </Button>
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <h3 className="text-6xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Targets Hit</p>
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
