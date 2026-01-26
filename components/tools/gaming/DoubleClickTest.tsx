'use client';

import { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MousePointer2, RotateCcw, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DOUBLE_CLICK_THRESHOLD = 80; // ms

export default function DoubleClickTest() {
    const [clicks, setClicks] = useState<number>(0);
    const [doubleClicks, setDoubleClicks] = useState<number>(0);
    const [lastClickTime, setLastClickTime] = useState<number>(0);
    const [history, setHistory] = useState<{ id: number; delay: number; isDouble: boolean }[]>([]);

    const clickAreaRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const now = performance.now();
        setClicks(prev => prev + 1);

        if (lastClickTime !== 0) {
            const delay = now - lastClickTime;
            const isDouble = delay < DOUBLE_CLICK_THRESHOLD;

            if (isDouble) {
                setDoubleClicks(prev => prev + 1);
            }

            setHistory(prev => [
                { id: Date.now(), delay, isDouble },
                ...prev.slice(0, 9)
            ]);
        }

        setLastClickTime(now);
    }, [lastClickTime]);

    const reset = () => {
        setClicks(0);
        setDoubleClicks(0);
        setLastClickTime(0);
        setHistory([]);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 overflow-hidden border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <MousePointer2 className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Test Area</CardTitle>
                                <CardDescription>Click anywhere in this box repeatedly</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent
                        className="h-80 flex flex-col items-center justify-center p-0 cursor-pointer select-none"
                        onMouseDown={handleClick}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        <div className="h-full w-full flex flex-col items-center justify-center space-y-4 hover:bg-muted/50 transition-colors">
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                className="h-24 w-24 rounded-3xl bg-primary/10 flex items-center justify-center shadow-inner"
                            >
                                <MousePointer2 className="h-10 w-10 text-primary" />
                            </motion.div>
                            <div className="text-center">
                                <p className="text-xl font-bold">CLICK ME</p>
                                <p className="text-sm text-muted-foreground">Left, Right, or Top buttons</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-primary/10">
                        <CardContent className="pt-6 space-y-4">
                            <div className="text-center pb-4 border-b">
                                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Clicks</p>
                                <p className="text-5xl font-black">{clicks}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold uppercase tracking-widest text-destructive">Double Clicks</p>
                                <p className={`text-5xl font-black ${doubleClicks > 0 ? 'text-destructive' : 'text-primary'}`}>
                                    {doubleClicks}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <AnimatePresence>
                        {doubleClicks > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3 items-center"
                            >
                                <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                                <p className="text-xs font-medium text-destructive-foreground">
                                    <strong>Fault Detected!</strong> Your mouse registered multiple accidental clicks.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button variant="outline" className="w-full rounded-xl" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Counters
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/5">
                    <CardHeader className="py-3 bg-muted/30">
                        <CardTitle className="text-xs font-bold uppercase">Recent Intervals</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 h-64 overflow-y-auto font-mono text-xs">
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className={`flex justify-between items-center border-b px-4 py-3 ${item.isDouble ? 'bg-destructive/10' : ''}`}
                            >
                                <div className="flex items-center gap-2">
                                    {item.isDouble ? <AlertTriangle className="h-3 w-3 text-destructive" /> : <CheckCircle2 className="h-3 w-3 text-green-500" />}
                                    <span className={item.isDouble ? 'text-destructive font-bold' : ''}>
                                        {item.delay.toFixed(1)} ms
                                    </span>
                                </div>
                                <span className="text-[10px] text-muted-foreground uppercase">{item.isDouble ? 'Double' : 'Normal'}</span>
                            </div>
                        ))}
                        {history.length === 0 && (
                            <div className="h-full flex items-center justify-center text-muted-foreground italic">
                                Start clicking to check intervals
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        What is Double Clicking?
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        As gaming mice age, their mechanical switches can wear out, causing a single physical click
                        to be registered twice by the computer. This is common in brands like Logitech or Razer
                        after 1-2 years of heavy use.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        If your click interval is below **80ms** without you intending to double-click, your
                        mouse might have a hardware fault.
                    </p>
                </div>
            </div>
        </div>
    );
}
