'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TargetTrackingPro() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const [velocity, setVelocity] = useState({ x: 0.5, y: 0.3 });
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const isTracking = useRef(false);
    const timerRef = useRef<any>(null);

    const animate = useCallback((t: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = t - lastTimeRef.current;
        lastTimeRef.current = t;

        setPos(prev => {
            let nx = prev.x + velocity.x * dt * 0.1;
            let ny = prev.y + velocity.y * dt * 0.1;
            let nvx = velocity.x;
            let nvy = velocity.y;

            if (nx < 5 || nx > 95) {
                nvx *= -1;
                nx = nx < 5 ? 5 : 95;
            }
            if (ny < 5 || ny > 95) {
                nvy *= -1;
                ny = ny < 5 ? 5 : 95;
            }

            // Randomly change direction slightly
            if (Math.random() < 0.01) {
                nvx = (Math.random() - 0.5) * 0.8;
                nvy = (Math.random() - 0.5) * 0.8;
            }

            setVelocity({ x: nvx, y: nvy });
            return { x: nx, y: ny };
        });

        if (isTracking.current) {
            setScore(s => s + 1);
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [velocity.x, velocity.y]);

    const endGame = useCallback(() => {
        setState('result');
        clearInterval(timerRef.current);
        cancelAnimationFrame(requestRef.current);
    }, []);

    const startGame = useCallback(() => {
        setState('playing');
        setScore(0);
        setTime(30);
        setPos({ x: 50, y: 50 });
        setVelocity({ x: Math.random() * 0.4 + 0.2, y: Math.random() * 0.4 + 0.2 });

        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        requestRef.current = requestAnimationFrame(animate);
    }, [animate, endGame]);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Target Tracking Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Smooth tracking practice. Keep your crosshair on the target.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Precision: {score} pts</span>
                    <span>Time: {time}s</span>
                </div>

                <div
                    ref={containerRef}
                    className="relative w-full h-[500px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden cursor-crosshair"
                    onMouseDown={() => isTracking.current = false}
                >
                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-bold" onClick={startGame}>
                                Start Tracking
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div
                            className="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg shadow-primary/40"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                            onMouseEnter={() => isTracking.current = true}
                            onMouseLeave={() => isTracking.current = false}
                        >
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <h3 className="text-5xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Score Achieved!</p>
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
