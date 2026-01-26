'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, Activity, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KeyRepeatRateTest() {
    const [rate, setRate] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const [history, setHistory] = useState<number[]>([]);
    const lastTime = useRef(0);
    const count = useRef(0);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isTesting || e.repeat === false) return;

        const now = performance.now();
        if (lastTime.current > 0) {
            const dt = now - lastTime.current;
            const currentHz = 1000 / dt;
            setRate(Math.round(currentHz));
        }
        lastTime.current = now;
        count.current++;
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isTesting]);

    const toggleTest = () => {
        if (!isTesting) {
            setRate(0);
            lastTime.current = 0;
            count.current = 0;
        } else {
            setHistory(prev => [rate, ...prev].slice(0, 5));
        }
        setIsTesting(!isTesting);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Keyboard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Key Repeat Rate Test</CardTitle>
                <p className="text-muted-foreground mt-2">Measure how many characters per second your OS registers when holding a key.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Characters Per Second (CPS)</p>
                        <p className="text-7xl font-black">{rate}</p>
                        <p className="text-[10px] text-muted-foreground mt-2 font-bold">{rate > 30 ? 'EXTREME' : rate > 15 ? 'FAST' : 'STANDARD'}</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-primary/5">
                            <Activity className="h-5 w-5 text-primary" />
                            <div className="text-xs">
                                <p className="font-bold">Software Influenced</p>
                                <p className="text-muted-foreground">Adjustable in Windows Control Panel.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-primary/5">
                            <Zap className="h-5 w-5 text-primary" />
                            <div className="text-xs">
                                <p className="font-bold">Input Frequency</p>
                                <p className="text-muted-foreground">High rates are preferred by programmers.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`p-16 rounded-[3rem] border-4 transition-all duration-300 flex flex-col items-center justify-center text-center ${isTesting ? 'bg-primary/5 border-primary/40' : 'bg-muted/10 border-primary/5'
                        }`}
                >
                    {!isTesting ? (
                        <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-black" onClick={toggleTest}>
                            Start Testing
                        </Button>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black animate-pulse uppercase">Hold ANY key down...</h3>
                            <p className="text-muted-foreground">Keep it held to measure the sustained rate.</p>
                            <Button variant="destructive" className="rounded-xl" onClick={toggleTest}>Stop Test</Button>
                        </div>
                    )}
                </div>

                {history.length > 0 && (
                    <div className="space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Previous High Scores</p>
                        <div className="flex flex-wrap gap-2">
                            {history.map((h, i) => (
                                <div key={i} className="px-4 py-2 rounded-xl bg-background border border-primary/10 font-bold">
                                    {h} CPS
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
