'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer, Play, Pause, RefreshCw, Flag } from 'lucide-react';

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startStop = () => {
        if (isRunning) {
            if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
            const startTime = Date.now() - time;
            intervalRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const reset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    };

    const addLap = () => {
        setLaps([time, ...laps]);
    };

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Timer className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Stopwatch & Laps</CardTitle>
                <p className="text-muted-foreground mt-2">High-precision timer for all your activities.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                <div className="text-center">
                    <h2 className="text-7xl font-black tabular-nums tracking-tighter text-primary">
                        {formatTime(time)}
                    </h2>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        size="lg"
                        className={`rounded-2xl h-16 px-8 text-lg font-bold ${isRunning ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary shadow-lg shadow-primary/20'}`}
                        onClick={startStop}
                    >
                        {isRunning ? <Pause className="mr-2 h-6 w-6" /> : <Play className="mr-2 h-6 w-6 fill-current" />}
                        {isRunning ? 'Stop' : 'Start'}
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="rounded-2xl h-16 px-8 text-lg font-bold"
                        onClick={addLap}
                        disabled={!isRunning && time === 0}
                    >
                        <Flag className="mr-2 h-6 w-6" />
                        Lap
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="rounded-2xl h-16 w-16"
                        onClick={reset}
                    >
                        <RefreshCw className="h-6 w-6" />
                    </Button>
                </div>

                {laps.length > 0 && (
                    <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                        {laps.map((lap, i) => (
                            <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-muted/30 border border-primary/5">
                                <span className="text-xs font-bold text-muted-foreground">LAP {laps.length - i}</span>
                                <span className="font-mono font-bold">{formatTime(lap)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
