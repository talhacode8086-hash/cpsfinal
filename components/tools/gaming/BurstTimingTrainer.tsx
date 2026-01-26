'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BurstTimingTrainer() {
    const [state, setState] = useState<'idle' | 'playing' | 'result'>('idle');
    const [isBeating, setIsBeating] = useState(false);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);
    const bpm = 120; // Default rhythm for burst resets
    const interval = 60000 / bpm;
    const timerRef = useRef<any>(null);
    const lastClickRef = useRef(0);

    const startGame = () => {
        setState('playing');
        setScore(0);
        setTotal(0);

        timerRef.current = setInterval(() => {
            setIsBeating(true);
            setTimeout(() => setIsBeating(false), 100);
        }, interval);
    };

    const endGame = () => {
        clearInterval(timerRef.current);
        setState('result');
    };

    const handleClick = () => {
        if (state !== 'playing') return;
        const now = Date.now();
        const beatTime = Math.round(now / interval) * interval;
        const diff = Math.abs(now - beatTime);

        setTotal(prev => prev + 1);
        if (diff < 100) { // 100ms window
            setScore(prev => prev + 1);
        }

        if (total >= 29) endGame();
    };

    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Music className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Burst Timing Trainer</CardTitle>
                <p className="text-muted-foreground mt-2">Master the reset rhythm for controlled, accurate fire.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div
                    className={`w-full h-64 rounded-[2rem] flex flex-col items-center justify-center border-4 cursor-pointer transition-all ${isBeating ? 'bg-primary/20 border-primary scale-[1.02]' : 'bg-muted/10 border-primary/5'
                        }`}
                    onClick={handleClick}
                >
                    {state === 'idle' && (
                        <Button size="lg" className="rounded-2xl" onClick={(e) => { e.stopPropagation(); startGame(); }}>
                            Start Rhythm Test
                        </Button>
                    )}
                    {state === 'playing' && (
                        <div className="text-center animate-pulse">
                            <p className="text-3xl font-black">CLICK ON BEAT</p>
                            <p className="text-muted-foreground">{total} / 30 clicks</p>
                        </div>
                    )}
                    {state === 'result' && (
                        <div className="text-center">
                            <h3 className="text-5xl font-black text-primary">{accuracy}%</h3>
                            <p className="text-xl font-bold">Rhythm Accuracy</p>
                            <Button size="sm" variant="ghost" className="mt-4" onClick={(e) => { e.stopPropagation(); startGame(); }}>
                                Try Again
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground italic">
                    <p>â€¢ Click when the screen pulses or you feel the rhythm.</p>
                    <p>â€¢ Matching tactical rifles like Vandal or AK require precise burst-tap pauses.</p>
                </div>
            </CardContent>
        </Card>
    );
}
