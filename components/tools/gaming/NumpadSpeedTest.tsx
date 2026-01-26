'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NumpadSpeedTest() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [target, setTarget] = useState("");
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef<any>(null);

    const generateTarget = () => {
        setTarget(Math.floor(Math.random() * 90000 + 10000).toString());
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setInput("");
        generateTarget();
        setState('playing');

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
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

    const handleInput = (val: string) => {
        setInput(val);
        if (val === target) {
            setScore(s => s + 1);
            setInput("");
            generateTarget();
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <LayoutGrid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Numpad Speed Test</CardTitle>
                <p className="text-muted-foreground mt-2">Master the 10-key layout. Type the numbers as fast as you can.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Numbers Entered</p>
                        <p className="text-6xl font-black">{score}</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Time Left</p>
                        <p className="text-6xl font-black">{timeLeft}s</p>
                    </div>
                </div>

                <div className={`p-16 rounded-[4rem] border-4 transition-all duration-300 flex flex-col items-center justify-center text-center ${state === 'playing' ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-primary/5'
                    }`}>
                    {state === 'idle' && (
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase">Ready for 10-Key?</h3>
                            <Button size="lg" className="h-16 px-12 rounded-2xl text-xl font-bold" onClick={startGame}>Start Session</Button>
                        </div>
                    )}

                    {state === 'playing' && (
                        <div className="space-y-8 animate-in zoom-in-50">
                            <p className="text-8xl font-black tracking-widest">{target}</p>
                            <Input
                                autoFocus
                                value={input}
                                onChange={(e) => handleInput(e.target.value)}
                                className="h-20 text-center text-4xl font-black rounded-[2rem] border-primary/30 caret-primary"
                                type="number"
                            />
                        </div>
                    )}

                    {state === 'result' && (
                        <div className="space-y-6 animate-in zoom-in-75">
                            <Trophy className="h-16 w-16 text-primary mx-auto" />
                            <h3 className="text-5xl font-black">{score} Sets</h3>
                            <p className="text-muted-foreground uppercase tracking-widest font-black text-xs">Final Performance Score</p>
                            <Button size="lg" className="rounded-2xl h-14 px-8" onClick={startGame}>Try Again</Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
