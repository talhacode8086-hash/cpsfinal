'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shapes } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#eab308'];
const LABELS = ['RED', 'GREEN', 'BLUE', 'YELLOW'];

export default function ReflexPatternMatch() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [targetColor, setTargetColor] = useState(0);
    const [options, setOptions] = useState<number[]>([]);
    const timerRef = useRef<any>(null);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTime(30);
        nextRound();

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

    const nextRound = useCallback(() => {
        const target = Math.floor(Math.random() * 4);
        setTargetColor(target);
        setOptions([0, 1, 2, 3].sort(() => Math.random() - 0.5));
    }, []);

    const handleMatch = (index: number) => {
        if (state !== 'playing') return;
        if (index === targetColor) {
            setScore(s => s + 1);
            nextRound();
        } else {
            // Penalty for wrong match
            setScore(s => Math.max(0, s - 1));
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shapes className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Reflex Pattern Match</CardTitle>
                <p className="text-muted-foreground mt-2">Identify and match the target color quickly. Improvements target focus.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-primary/5 font-bold">
                    <span>Correct Matches: {score}</span>
                    <span>Time: {time}s</span>
                </div>

                <div className="flex flex-col items-center gap-10 min-h-[400px] justify-center">
                    {state === 'idle' && (
                        <div className="text-center space-y-6">
                            <p className="text-muted-foreground max-w-sm">Match the large colored box with one of the options below as fast as possible.</p>
                            <Button size="lg" className="rounded-2xl h-14" onClick={startGame}>
                                Start Pattern Test
                            </Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <>
                            <div
                                className="w-32 h-32 rounded-[2rem] shadow-2xl transition-all border-8 border-white/20 animate-in zoom-in-50 duration-300"
                                style={{ backgroundColor: COLORS[targetColor] }}
                            />

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                                {options.map(idx => (
                                    <button
                                        key={idx}
                                        className="h-24 rounded-2xl border-2 border-primary/5 hover:border-primary/50 transition-all active:scale-95 shadow-lg group"
                                        style={{ backgroundColor: COLORS[idx] }}
                                        onClick={() => handleMatch(idx)}
                                    >
                                        <span className="text-white font-black drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                            {LABELS[idx]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {state === 'result' && (
                        <div className="text-center">
                            <h3 className="text-6xl font-black text-primary mb-2">{score}</h3>
                            <p className="text-xl font-bold mb-8">Reflex Score</p>
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
