'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mouse, RotateCcw, ArrowUp, ArrowDown, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollTest() {
    const [scrollCount, setScrollCount] = useState<number>(0);
    const [direction, setDirection] = useState<'up' | 'down' | null>(null);
    const [history, setHistory] = useState<{ id: number; dir: 'up' | 'down'; delta: number }[]>([]);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleScroll = useCallback((e: WheelEvent) => {
        // Prevent page scrolling during test
        e.preventDefault();

        const dir = e.deltaY < 0 ? 'up' : 'down';
        setDirection(dir);
        setScrollCount(prev => prev + 1);

        setHistory(prev => [
            { id: Date.now(), dir, delta: Math.abs(e.deltaY) },
            ...prev.slice(0, 19)
        ]);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setDirection(null);
        }, 150);
    }, []);

    useEffect(() => {
        const area = document.getElementById('scroll-area');
        if (area) {
            area.addEventListener('wheel', handleScroll, { passive: false });
        }
        return () => {
            if (area) area.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    const reset = () => {
        setScrollCount(0);
        setDirection(null);
        setHistory([]);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 overflow-hidden border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Mouse className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Scroll Area</CardTitle>
                                <CardDescription>Scroll up and down inside this box</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent
                        id="scroll-area"
                        className="h-80 flex flex-col items-center justify-center p-0 cursor-ns-resize overflow-hidden hover:bg-muted/50 transition-colors"
                    >
                        <div className="text-center space-y-6">
                            <AnimatePresence mode="wait">
                                {direction === 'up' ? (
                                    <motion.div
                                        key="up"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        className="text-primary"
                                    >
                                        <ArrowUp className="h-20 w-20 mx-auto" strokeWidth={3} />
                                        <p className="font-black text-2xl uppercase tracking-widest mt-2">Scrolling Up</p>
                                    </motion.div>
                                ) : direction === 'down' ? (
                                    <motion.div
                                        key="down"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        className="text-primary"
                                    >
                                        <ArrowDown className="h-20 w-20 mx-auto" strokeWidth={3} />
                                        <p className="font-black text-2xl uppercase tracking-widest mt-2">Scrolling Down</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.2 }}
                                        className="text-muted-foreground"
                                    >
                                        <Mouse className="h-24 w-24 mx-auto" strokeWidth={1} />
                                        <p className="font-bold text-sm tracking-widest mt-4">READY TO SCROLL</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-primary/10 bg-primary/5">
                        <CardContent className="pt-6 text-center space-y-1">
                            <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Ticks Detected</p>
                            <p className="text-6xl font-black text-primary tabular-nums">{scrollCount}</p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/10 h-48 overflow-hidden">
                        <CardHeader className="py-2 bg-muted/30">
                            <CardTitle className="text-[10px] font-bold uppercase tracking-widest">Scroll Log</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 h-full overflow-y-auto font-mono text-[10px]">
                            {history.map((h) => (
                                <div key={h.id} className="flex justify-between px-4 py-2 border-b">
                                    <span className={h.dir === 'up' ? 'text-blue-500 font-bold' : 'text-orange-500 font-bold'}>
                                        {h.dir.toUpperCase()}
                                    </span>
                                    <span className="text-muted-foreground">Intensity: {h.delta.toFixed(0)}</span>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="h-full flex items-center justify-center italic text-muted-foreground">No input detected...</div>
                            )}
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full rounded-xl" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Count
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Mouse Wheel Accuracy
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Modern gaming mice use either optical or mechanical encoders for the scroll wheel.
                    Over time, these can become dusty or worn, leading to &quot;ghost scrolls&quot; or missed
                    inputs. This test helps you verify if every physical click of your wheel is
                    registering a tick in the correct direction.
                </p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold bg-primary/5 p-2 rounded border border-primary/10 inline-block">
                    Pro Tip: Keep the scroll wheel clean with compressed air to maintain accuracy.
                </p>
            </div>
        </div>
    );
}
