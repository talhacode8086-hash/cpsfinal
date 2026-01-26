'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MicroFlickDrills() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [target, setTarget] = useState({ x: 50, y: 50 });
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

    const spawnTarget = () => {
        // Micro flicks are in a tight radius around the center
        const x = 50 + (Math.random() - 0.5) * 20;
        const y = 50 + (Math.random() - 0.5) * 20;
        setTarget({ x, y });
    };

    const handleTargetClick = () => {
        setScore(s => s + 1);
        spawnTarget();
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Micro-Flick Drills</CardTitle>
                <p className="text-muted-foreground mt-2">Practice small, precise mouse adjustments near the center.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Target Hits: {score}</span>
                    <span>Time Left: {time}s</span>
                </div>

                <div className="relative w-full h-[500px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden cursor-crosshair">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/30 rounded-full" />

                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={startGame}>
                                Start Drills
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div
                            className="absolute w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 active:scale-90 transition-all shadow-md shadow-primary/20"
                            style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
                            onClick={handleTargetClick}
                        >
                            <div className="w-1 h-1 bg-white rounded-full" />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <p className="text-xl font-bold mb-2">Final Hits</p>
                            <h3 className="text-6xl font-black text-primary mb-8">{score}</h3>
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={startGame}>
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
