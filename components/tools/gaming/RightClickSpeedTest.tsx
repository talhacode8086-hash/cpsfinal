'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MousePointer2, Zap, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RightClickSpeedTest() {
    const [clicks, setClicks] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [results, setResults] = useState<number[]>([]);
    const timerRef = useRef<any>(null);

    const startTest = (e: React.MouseEvent) => {
        if (e.button !== 2) return; // Only right click

        setIsRunning(true);
        setClicks(1);
        setTimeLeft(5);

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0.1) {
                    endTest();
                    return 0;
                }
                return parseFloat((prev - 0.1).toFixed(1));
            });
        }, 100);
    };

    const endTest = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setResults(prev => [clicks / 5, ...prev].slice(0, 5));
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (e.button !== 2) return;

        if (!isRunning && timeLeft === 5) {
            startTest(e);
        } else if (isRunning) {
            setClicks(prev => prev + 1);
        }
    };

    const cps = isRunning ? (clicks / (5 - timeLeft || 0.1)).toFixed(1) : (clicks / 5).toFixed(1);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <MousePointer2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Right Click Speed Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure your Clicks Per Second (CPS) using only the right mouse button.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 text-center space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest text-primary">Time Left</p>
                        <p className="text-6xl font-black">{timeLeft}s</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center space-y-2">
                        <p className="text-xs font-black uppercase tracking-widest text-primary">Live CPS</p>
                        <p className="text-6xl font-black">{cps}</p>
                    </div>
                </div>

                <div
                    className={`relative w-full h-[400px] rounded-[3rem] border-4 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer select-none ${isRunning ? 'bg-primary/5 border-primary/40 scale-[1.01]' : 'bg-muted/10 border-primary/5 hover:border-primary/20'
                        }`}
                    onMouseDown={handleClick}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    {!isRunning ? (
                        <div className="text-center space-y-4">
                            <div className="p-6 rounded-3xl bg-primary/20 inline-block mb-4">
                                <Zap className="h-12 w-12 text-primary" />
                            </div>
                            <h3 className="text-4xl font-black">RIGHT CLICK TO START</h3>
                            <p className="text-muted-foreground">Test duration: 5 seconds</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-8xl font-black opacity-20 pointer-events-none">{clicks}</p>
                            <p className="text-xl font-bold text-primary mt-4 uppercase animate-pulse">Keep Clicking!</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                        <History className="h-4 w-4" /> Recent Top CPS
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {results.map((r, i) => (
                            <div key={i} className="px-6 py-3 rounded-2xl bg-background border border-primary/10 font-black text-lg">
                                {r.toFixed(1)} <span className="text-xs font-bold text-muted-foreground">CPS</span>
                            </div>
                        ))}
                        {results.length === 0 && <p className="text-muted-foreground italic text-sm">No tests completed yet...</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
