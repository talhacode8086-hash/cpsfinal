'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Play, Pause, RefreshCw, Coffee, Focus } from 'lucide-react';
import { toast } from 'sonner';

export default function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');

    const switchMode = useCallback((newMode: 'work' | 'break') => {
        setMode(newMode);
        setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
        setIsRunning(false);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            const nextMode = mode === 'work' ? 'break' : 'work';
            toast.success(mode === 'work' ? 'Time for a break!' : 'Back to work!');
            switchMode(nextMode);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, mode, switchMode]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Pomodoro Focus Timer</CardTitle>
                <p className="text-muted-foreground mt-2">Boost your productivity with timed focus and rest intervals.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center gap-4">
                    <Button
                        variant={mode === 'work' ? 'default' : 'outline'}
                        className="rounded-full px-8 h-12 font-bold"
                        onClick={() => switchMode('work')}
                    >
                        <Focus className="mr-2 h-5 w-5" />
                        Focus Mode
                    </Button>
                    <Button
                        variant={mode === 'break' ? 'default' : 'outline'}
                        className="rounded-full px-8 h-12 font-bold"
                        onClick={() => switchMode('break')}
                    >
                        <Coffee className="mr-2 h-5 w-5" />
                        Break Time
                    </Button>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full border-8 border-primary/10 flex flex-col items-center justify-center relative overflow-hidden">
                        <div
                            className="absolute bottom-0 w-full bg-primary transition-all duration-1000 ease-linear opacity-20"
                            style={{ height: `${100 - progress}%` }}
                        />
                        <h2 className="text-7xl font-black tabular-nums tracking-tighter relative z-10">
                            {formatTime(timeLeft)}
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mt-2 relative z-10">
                            {mode === 'work' ? 'Working' : 'Resting'}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        size="lg"
                        className="rounded-2xl h-16 w-16 shadow-xl shadow-primary/20"
                        onClick={() => setIsRunning(!isRunning)}
                    >
                        {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-2xl h-16 w-16"
                        onClick={() => switchMode(mode)}
                    >
                        <RefreshCw className="h-6 w-6" />
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.3em]">
                        Standard: 25m Focus / 5m Break
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
