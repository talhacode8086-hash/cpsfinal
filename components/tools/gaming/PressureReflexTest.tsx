'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PressureReflexTest() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [target, setTarget] = useState({ x: 50, y: 50, size: 80 });
    const [difficulty, setDifficulty] = useState(1);
    const timerRef = useRef<any>(null);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setDifficulty(1);
        spawnTarget();
    };

    const spawnTarget = () => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        const startSize = Math.max(80 - (difficulty * 5), 20);
        setTarget({ x, y, size: startSize });

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTarget(prev => {
                const nextSize = prev.size - (1 + difficulty * 0.2);
                if (nextSize <= 0) {
                    endGame();
                    return prev;
                }
                return { ...prev, size: nextSize };
            });
        }, 30);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setState('result');
    };

    const handleTargetClick = () => {
        if (state !== 'playing') return;
        setScore(s => s + 1);
        setDifficulty(d => d + 0.5);
        spawnTarget();
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Timer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Pressure Reflex Test</CardTitle>
                <p className="text-muted-foreground mt-2">Hit targets before they shrink and vanish. The speed increases!</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Performance: {score}</span>
                    <span>Intensity Level: {Math.floor(difficulty)}</span>
                </div>

                <div className="relative w-full h-[500px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden cursor-crosshair">
                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14" onClick={startGame}>
                                Start Pressure Test
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div
                            className="absolute bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-primary/30"
                            style={{
                                left: `${target.x}%`,
                                top: `${target.y}%`,
                                width: `${target.size}px`,
                                height: `${target.size}px`,
                                transform: 'translate(-50%, -50%)',
                                opacity: target.size / 80 + 0.2
                            }}
                            onClick={handleTargetClick}
                        >
                            <Target className="text-white h-1/2 w-1/2" />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <p className="text-xl font-bold">Final Score</p>
                            <h3 className="text-6xl font-black text-primary mb-8">{score}</h3>
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
