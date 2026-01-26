'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Play, Pause, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export default function MeditationTimer() {
    const [timeLeft, setTimeLeft] = useState(600);
    const [isActive, setIsActive] = useState(false);
    const [totalTime, setTotalTime] = useState(600);
    const [isMuted, setIsMuted] = useState(false);

    // Web Audio API mock or simple synth could be added here for the gong
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((t) => t - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const reset = () => {
        setIsActive(false);
        setTimeLeft(totalTime);
    };

    const progress = (timeLeft / totalTime) * 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Zen Meditation Timer</CardTitle>
                <p className="text-muted-foreground mt-2">Find your center with a minimalist focus experience.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-16">
                <div className="flex flex-col items-center justify-center relative">
                    <svg className="w-80 h-80 transform -rotate-90">
                        <circle cx="160" cy="160" r="150" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-primary/10" />
                        <circle cx="160" cy="160" r="150" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={942} strokeDashoffset={942 - (942 * progress / 100)} className="text-primary transition-all duration-1000 ease-linear shadow-glow" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <h2 className="text-7xl font-black text-primary tracking-tighter">{formatTime(timeLeft)}</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Breathe Deeply</p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex justify-center gap-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-16 w-16 rounded-full hover:bg-primary/10"
                            onClick={() => setIsMuted(!isMuted)}
                        >
                            {isMuted ? <VolumeX className="h-8 w-8 text-primary" /> : <Volume2 className="h-8 w-8 text-primary" />}
                        </Button>
                        <Button
                            onClick={() => setIsActive(!isActive)}
                            className="h-20 px-12 rounded-full text-2xl font-black shadow-2xl shadow-primary/20"
                        >
                            {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-16 w-16 rounded-full hover:bg-primary/10"
                            onClick={reset}
                        >
                            <RefreshCw className="h-8 w-8 text-primary" />
                        </Button>
                    </div>

                    <div className="max-w-md mx-auto w-full space-y-4">
                        <div className="flex justify-between text-[10px] font-black uppercase text-primary">
                            <span>Duration</span>
                            <span>{totalTime / 60} Minutes</span>
                        </div>
                        <Slider
                            value={[totalTime]}
                            onValueChange={(v) => {
                                setTotalTime(v[0]);
                                if (!isActive) setTimeLeft(v[0]);
                            }}
                            min={60} max={3600} step={60}
                            disabled={isActive}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[5, 10, 20].map((min) => (
                        <Button
                            key={min}
                            variant="outline"
                            className={`h-16 rounded-2xl font-bold border-primary/10 hover:border-primary/40 ${totalTime === min * 60 ? 'bg-primary/5 border-primary' : ''}`}
                            onClick={() => {
                                setTotalTime(min * 60);
                                setTimeLeft(min * 60);
                                setIsActive(false);
                            }}
                            disabled={isActive}
                        >
                            {min} Minutes
                        </Button>
                    ))}
                </div>
            </CardContent>
            <style jsx>{`
                .shadow-glow {
                    filter: drop-shadow(0 0 8px rgba(var(--primary), 0.5));
                }
            `}</style>
        </Card>
    );
}
