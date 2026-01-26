'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Volume2, Play } from 'lucide-react';
import { toast } from 'sonner';

export default function SoundReactionTest() {
    const [state, setState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'early'>('idle');
    const [time, setTime] = useState<number[]>([]);
    const startTimeRef = useRef(0);
    const timeoutRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize audio
        const audio = new Audio('/beep.mp3'); // We'll assume a standard notification sound or create one
        audioRef.current = audio;
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const playSound = () => {
        // Fallback to a synthetic beep if file is missing
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.error('Audio failed');
        }
    };

    const startTest = useCallback(() => {
        setState('waiting');
        const delay = Math.random() * 3000 + 2000;
        timeoutRef.current = setTimeout(() => {
            setState('ready');
            startTimeRef.current = performance.now();
            playSound();
        }, delay);
    }, []);

    const handleAction = () => {
        if (state === 'waiting') {
            clearTimeout(timeoutRef.current);
            setState('early');
        } else if (state === 'ready') {
            const reactionTime = Math.round(performance.now() - startTimeRef.current);
            setTime(prev => [reactionTime, ...prev]);
            setState('result');
        } else if (state === 'idle' || state === 'result' || state === 'early') {
            startTest();
        }
    };

    const avg = time.length ? Math.round(time.reduce((a, b) => a + b, 0) / time.length) : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Sound Reaction Test</CardTitle>
                <p className="text-muted-foreground mt-2">How fast can you react to an audio cue?</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div
                    className={`w-full h-[400px] rounded-[3rem] shadow-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none border-4 ${state === 'waiting' ? 'bg-amber-500/20 border-amber-500/40' :
                        state === 'ready' ? 'bg-green-500/30 border-green-500/50 scale-[1.02]' :
                            state === 'early' ? 'bg-red-500/20 border-red-500/40' :
                                'bg-primary/5 border-primary/20'
                        }`}
                    onClick={handleAction}
                >
                    <div className="text-center space-y-6">
                        {state === 'idle' && (
                            <>
                                <div className="p-6 rounded-3xl bg-primary/20 inline-block mb-4">
                                    <Play className="h-12 w-12 text-primary fill-primary" />
                                </div>
                                <h3 className="text-4xl font-black">Click to Start</h3>
                                <p className="text-muted-foreground text-lg">Wait for the beep...</p>
                            </>
                        )}
                        {state === 'waiting' && (
                            <h3 className="text-4xl font-black opacity-50">shhh... wait for it</h3>
                        )}
                        {state === 'ready' && (
                            <h3 className="text-6xl font-black animate-bounce text-green-500 uppercase">Click Now!</h3>
                        )}
                        {state === 'result' && (
                            <>
                                <h3 className="text-7xl font-black">{time[0]}ms</h3>
                                <p className="text-muted-foreground text-xl">Click to try again</p>
                            </>
                        )}
                        {state === 'early' && (
                            <>
                                <h3 className="text-4xl font-black text-red-500">Too Early!</h3>
                                <p className="text-muted-foreground text-xl">Wait for the sound next time</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-muted/30 border border-primary/5 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-2">Your Average</p>
                        <p className="text-5xl font-black">{avg}ms</p>
                        <p className="text-xs text-muted-foreground mt-2">Based on {time.length} attempts</p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            Recent Attempts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {time.map((t, i) => (
                                <div key={i} className="px-4 py-2 rounded-xl bg-background border border-primary/10 font-bold text-sm">
                                    {t}ms
                                </div>
                            ))}
                            {time.length === 0 && <p className="text-muted-foreground italic text-sm">No attempts yet...</p>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
