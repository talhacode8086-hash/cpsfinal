'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Timer } from 'lucide-react';

export default function DragClickTest() {
    const [cps, setCps] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const [bestCps, setBestCps] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 0.1) {
                        setIsActive(false);
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleClick = () => {
        if (timeLeft === 0) return;

        if (!isActive) {
            setIsActive(true);
            setStartTime(Date.now());
            setClicks(1);
        } else {
            setClicks(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (clicks > 0) {
            const elapsed = (10 - timeLeft) || 0.1;
            const currentCps = clicks / elapsed;
            setCps(currentCps);
            if (!isActive && currentCps > bestCps) setBestCps(currentCps);
        }
    }, [clicks, timeLeft, isActive, bestCps]);

    const reset = () => {
        setIsActive(false);
        setClicks(0);
        setTimeLeft(10);
        setCps(0);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">CPS</div>
                        <div className="text-4xl font-bold mt-1 text-primary">{cps.toFixed(1)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Time Left</div>
                        <div className="text-4xl font-bold mt-1 flex items-center gap-2">
                            <Timer className="h-6 w-6 text-muted-foreground" />
                            {timeLeft.toFixed(1)}s
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Best CPS</div>
                        <div className="text-4xl font-bold mt-1 opacity-50">{bestCps.toFixed(1)}</div>
                    </CardContent>
                </Card>
            </div>

            <Button
                className="w-full h-[300px] text-4xl font-black rounded-3xl shadow-2xl transition-all active:scale-95 bg-primary hover:bg-primary/90 relative overflow-hidden group"
                onClick={handleClick}
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <Zap className={`h-16 w-16 ${isActive ? 'animate-pulse' : ''}`} />
                    {isActive ? 'DRAG CLICK NOW!' : 'CLICK TO START DRAG TEST'}
                </div>
            </Button>

            <div className="flex justify-center">
                <Button variant="outline" onClick={reset} disabled={isActive}>
                    Reset Challenge
                </Button>
            </div>
        </div>
    );
}
