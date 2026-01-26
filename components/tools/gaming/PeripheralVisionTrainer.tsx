'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PeripheralVisionTrainer() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [targets, setTargets] = useState<{ x: number, y: number, id: number }[]>([]);
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<any>(null);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTime(30);
        setTargets([]);
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
        setTargets([]);
    };

    const spawnTarget = () => {
        if (!containerRef.current) return;
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const side = Math.floor(Math.random() * 4);
        let x = 0, y = 0;
        const padding = 60;

        if (side === 0) { // Top
            x = Math.random() * (width - padding * 2) + padding;
            y = padding + Math.random() * 50;
        } else if (side === 1) { // Bottom
            x = Math.random() * (width - padding * 2) + padding;
            y = height - padding - Math.random() * 50;
        } else if (side === 2) { // Left
            x = padding + Math.random() * 50;
            y = Math.random() * (height - padding * 2) + padding;
        } else { // Right
            x = width - padding - Math.random() * 50;
            y = Math.random() * (height - padding * 2) + padding;
        }

        setTargets([{ x, y, id: Date.now() }]);
    };

    const handleTargetClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScore(prev => prev + 1);
        spawnTarget();
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Peripheral Vision Trainer</CardTitle>
                <p className="text-muted-foreground mt-2">Improve awareness by clicking targets without losing center focus.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span>Score: {score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span>Time: {time}s</span>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden cursor-crosshair"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-primary/20 rounded-full animate-ping" />

                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm">
                            <h3 className="text-3xl font-black mb-4">Ready to Focus?</h3>
                            <p className="text-muted-foreground mb-8 text-center max-w-sm">Keep your eyes on the central dot and click targets as they appear in your side view.</p>
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={startGame}>
                                Start Training
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && targets.map(t => (
                        <div
                            key={t.id}
                            className="absolute w-14 h-14 bg-primary/80 rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/30"
                            style={{ left: t.x, top: t.y, transform: 'translate(-50%, -50%)' }}
                            onClick={handleTargetClick}
                        >
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                    ))}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md">
                            <h3 className="text-5xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Targets Cleared!</p>
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
