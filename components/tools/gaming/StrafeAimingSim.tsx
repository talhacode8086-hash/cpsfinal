'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Move, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StrafeAimingSim() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [targetPos, setTargetPos] = useState(50);
    const [playerPos, setPlayerPos] = useState(50);
    const timerRef = useRef<any>(null);
    const requestRef = useRef<number>(0);
    const lastTimeRef = useRef(0);
    const targetVel = useRef(0.2);
    const playerVel = useRef(0.3);

    const animate = useCallback((t: number) => {
        if (state !== 'playing') return;
        if (!lastTimeRef.current) lastTimeRef.current = t;
        const dt = t - lastTimeRef.current;
        lastTimeRef.current = t;

        setTargetPos(prev => {
            let next = prev + targetVel.current * dt * 0.1;
            if (next < 10 || next > 90) {
                targetVel.current *= -1;
                return prev;
            }
            if (Math.random() < 0.02) targetVel.current *= -1;
            return next;
        });

        setPlayerPos(prev => {
            let next = prev + playerVel.current * dt * 0.1;
            if (next < 20 || next > 80) {
                playerVel.current *= -1;
                return prev;
            }
            return next;
        });

        requestRef.current = requestAnimationFrame(animate);
    }, [state]);

    const endGame = useCallback(() => {
        clearInterval(timerRef.current);
        setState('result');
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }, []);

    const startGame = useCallback(() => {
        setState('playing');
        setScore(0);
        setTime(30);
        lastTimeRef.current = 0;
        requestRef.current = requestAnimationFrame(animate);

        timerRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [animate, endGame]);

    const handleShot = () => {
        if (state !== 'playing') return;
    };

    const handleMouseClick = (e: React.MouseEvent) => {
        if (state !== 'playing') return;
        setScore(s => s + 1);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Move className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Strafe Aiming Sim</CardTitle>
                <p className="text-muted-foreground mt-2">Practice aiming while your &quot;character&quot; is automatically strafing.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Accuracy: {score} hits</span>
                    <span>Time: {time}s</span>
                </div>

                <div
                    className="relative w-full h-[400px] bg-muted/10 rounded-[2.5rem] border-2 border-primary/10 overflow-hidden cursor-crosshair pb-20"
                >
                    {/* Perspective lines */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="absolute inset-0 border-t border-primary" style={{ top: `${i * 10}%` }} />
                        ))}
                    </div>

                    {state === 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/40 backdrop-blur-sm z-10">
                            <Button size="lg" className="rounded-2xl" onClick={startGame}>
                                Start Strafing
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <>
                            {/* Moving Target */}
                            <div
                                className="absolute top-1/2 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                style={{ left: `${targetPos}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                                onClick={handleMouseClick}
                            >
                                <Target className="text-white h-8 w-8" />
                            </div>

                            {/* Player Indicator (moving bottom bar) */}
                            <div
                                className="absolute bottom-10 h-4 bg-primary/20 rounded-full border border-primary/30 flex items-center justify-center"
                                style={{ left: `${playerPos}%`, width: '100px', transform: 'translateX(-50%)' }}
                            >
                                <span className="text-[10px] font-black uppercase tracking-tighter text-primary">YOUR VIEW</span>
                            </div>
                        </>
                    )}

                    {state === 'result' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md z-10">
                            <h3 className="text-6xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Strafing Accuracy</p>
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
