'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CursorPrecisionBench() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [target, setTarget] = useState({ x: 50, y: 50 });
    const [precision, setPrecision] = useState<number[]>([]);
    const timerRef = useRef<any>(null);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTime(30);
        setPrecision([]);
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
        setTarget({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
        });
    };

    const handleTargetClick = (e: React.MouseEvent) => {
        if (state !== 'playing') return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const dist = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
        const accuracy = Math.max(0, 100 - (dist * 2));

        setPrecision(prev => [accuracy, ...prev]);
        setScore(s => s + 1);
        spawnTarget();
    };

    const avgPrecision = precision.length
        ? Math.round(precision.reduce((a, b) => a + b, 0) / precision.length)
        : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Crosshair className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Cursor Precision Bench</CardTitle>
                <p className="text-muted-foreground mt-2">Test your ability to hit the exact center of a target under speed.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Avg Precision</p>
                        <p className="text-5xl font-black">{avgPrecision}%</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Time Remaining</p>
                        <p className="text-5xl font-black">{time}s</p>
                    </div>
                </div>

                <div className="relative w-full h-[500px] bg-muted/10 rounded-[3rem] border-2 border-primary/10 overflow-hidden cursor-crosshair">
                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14 font-black px-10 text-xl" onClick={startGame}>
                                Start Benchmark
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div
                            className="absolute w-12 h-12 bg-primary/20 rounded-full border-2 border-primary flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 group"
                            style={{ left: `${target.x}%`, top: `${target.y}%`, transform: 'translate(-50%, -50%)' }}
                            onClick={handleTargetClick}
                        >
                            <div className="w-1 h-1 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                            {/* Inner rings for precision feel */}
                            <div className="absolute w-[60%] h-[60%] border border-primary/30 rounded-full" />
                            <div className="absolute w-[30%] h-[30%] border border-primary/50 rounded-full" />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <h3 className="text-6xl font-black text-primary mb-2">{avgPrecision}%</h3>
                            <p className="text-xl font-bold mb-8 uppercase tracking-widest">Precision Rating</p>
                            <div className="flex gap-4">
                                <Button size="lg" className="rounded-xl" onClick={startGame}>Restart</Button>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
