'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crosshair, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ClickTimingTrainer() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [pos, setPos] = useState(-10);
    const containerRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<any>(null);
    const speed = 0.5;

    useEffect(() => {
        let req: any;
        if (state === 'playing') {
            const animate = () => {
                setPos(prev => {
                    let next = prev + speed;
                    if (next > 110) return -10;
                    return next;
                });
                req = requestAnimationFrame(animate);
            };
            req = requestAnimationFrame(animate);
        }
        return () => cancelAnimationFrame(req);
    }, [state]);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTime(30);

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

    const handleAction = () => {
        if (state !== 'playing') return;
        // Hit box is between 45% and 55%
        if (pos >= 45 && pos <= 55) {
            setScore(s => s + 1);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Crosshair className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Click Timing Trainer</CardTitle>
                <p className="text-muted-foreground mt-2">Click when the target crosses your center mark.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Accurate Hits: {score}</span>
                    <span>Time: {time}s</span>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[300px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={handleAction}
                >
                    {/* Hit Zone */}
                    <div className="absolute top-0 bottom-0 w-[10%] bg-primary/20 border-x-2 border-primary/30 z-0" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[80%] bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] z-0" />

                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-20">
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>
                                Start Trainer
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div
                            className="absolute w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-90"
                            style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
                        >
                            <Target className="text-white h-8 w-8" />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-20">
                            <h3 className="text-5xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Precision Hits</p>
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground italic">
                    Great for practicing "Hold Angles" and "Reactive Clicking" with Snipers/Shotguns.
                </p>
            </CardContent>
        </Card>
    );
}
