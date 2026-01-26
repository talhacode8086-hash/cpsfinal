'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, RotateCcw, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MouseAcceleration() {
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState<{ speed: number; distance: number }[]>([]);
    const [accelerationScore, setAccelerationScore] = useState<number>(0);

    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const lastTimeRef = useRef<number>(0);
    const pathRef = useRef<{ speed: number; distance: number }[]>([]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isActive) return;

        const now = performance.now();
        if (lastPosRef.current && lastTimeRef.current !== 0) {
            const dx = e.clientX - lastPosRef.current.x;
            const dy = e.clientY - lastPosRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const dt = now - lastTimeRef.current;

            if (dist > 0 && dt > 0) {
                const speed = dist / dt;
                pathRef.current.push({ speed, distance: dist });

                if (pathRef.current.length > 100) {
                    setData([...pathRef.current]);

                    // Heuristic to calculate acceleration:
                    // Does the distance per pixel change significantly at different speeds?
                    // This is hard in browser due to OS abstraction, but we can measure consistency.
                    const speeds = pathRef.current.map(p => p.speed);
                    const distances = pathRef.current.map(p => p.distance);

                    // Simple correlation check (rough estimation)
                    const n = speeds.length;
                    const sumX = speeds.reduce((a, b) => a + b, 0);
                    const sumY = distances.reduce((a, b) => a + b, 0);
                    const avgX = sumX / n;
                    const avgY = sumY / n;

                    // Variance
                    const variance = speeds.reduce((a, b) => a + Math.pow(b - avgX, 2), 0) / n;
                    setAccelerationScore(Math.min(100, (variance * 100)));

                    pathRef.current = pathRef.current.slice(50);
                }
            }
        }

        lastPosRef.current = { x: e.clientX, y: e.clientY };
        lastTimeRef.current = now;
    }, [isActive]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    const toggle = () => {
        setIsActive(!isActive);
        if (!isActive) {
            lastPosRef.current = null;
            lastTimeRef.current = 0;
            pathRef.current = [];
            setData([]);
        }
    };

    const reset = () => {
        setData([]);
        setAccelerationScore(0);
        pathRef.current = [];
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 overflow-hidden border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Consistency Tracker</CardTitle>
                                    <CardDescription>Move your mouse at varying speeds</CardDescription>
                                </div>
                            </div>
                            <Button variant={isActive ? "destructive" : "default"} onClick={toggle} className="rounded-full">
                                {isActive ? "Stop Analysis" : "Start Analysis"}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="h-80 flex flex-col items-center justify-center p-6 text-center">
                        {isActive ? (
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                                <div className="relative">
                                    <motion.div
                                        className="text-8xl font-black text-primary tracking-tighter"
                                    >
                                        {accelerationScore.toFixed(0)}
                                        <span className="text-xl font-bold ml-1">%</span>
                                    </motion.div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-2">Variance Score</p>
                                </div>

                                <div className="w-full flex items-end justify-center gap-1 h-32 px-4 opacity-50">
                                    {data.slice(-50).map((d, i) => (
                                        <div
                                            key={i}
                                            style={{ height: `${Math.min(100, d.speed * 20)}%` }}
                                            className="flex-1 bg-primary/40 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted-foreground space-y-4">
                                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                                    <TrendingUp className="h-10 w-10" />
                                </div>
                                <p className="max-w-xs mx-auto">Click "Start Analysis" and move your mouse in circles/lines at different speeds.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className={`border-primary/10 ${accelerationScore < 15 ? 'bg-green-500/5' : accelerationScore < 40 ? 'bg-yellow-500/5' : 'bg-destructive/5'}`}>
                        <CardContent className="pt-6 text-center space-y-4">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detection Status</p>
                            {accelerationScore < 15 ? (
                                <div className="space-y-2">
                                    <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                                    <p className="text-sm font-bold text-green-600">Pure Consistency</p>
                                    <p className="text-[10px] text-green-600/70">Linear movement detected.</p>
                                </div>
                            ) : accelerationScore < 40 ? (
                                <div className="space-y-2">
                                    <Info className="h-10 w-10 text-yellow-500 mx-auto" />
                                    <p className="text-sm font-bold text-yellow-600">Minor Variance</p>
                                    <p className="text-[10px] text-yellow-600/70">Potential slight acceleration.</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <AlertTriangle className="h-10 w-10 text-destructive mx-auto" />
                                    <p className="text-sm font-bold text-destructive">High Acceleration</p>
                                    <p className="text-[10px] text-destructive-foreground/70">Non-linear speed detected.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="p-6 rounded-2xl border bg-muted/30 space-y-3">
                        <h4 className="font-bold text-sm">PRO TIP</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Always disable "Enhance Pointer Precision" in Windows Mouse Settings for linear, 1:1 movement.
                        </p>
                    </div>

                    <Button variant="outline" className="w-full rounded-xl" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Clear Analysis
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold">What is Mouse Acceleration?</h3>
                <p className="text-muted-foreground leading-relaxed">
                    Mouse Acceleration means the distance your cursor moves depends on **how fast** you move
                    your mouse, not just how far. In competitive FPS gaming, this is generally considered bad
                    because it makes building muscle memory nearly impossible.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2 text-primary">Acceleration OFF (Raw Input)</h4>
                        <p className="text-xs text-muted-foreground">1cm of mousepad movement = 100 pixels on screen. Faster or slower movement doesn't change this.</p>
                    </div>
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2 text-destructive">Acceleration ON</h4>
                        <p className="text-xs text-muted-foreground">Slow 1cm move = 50 pixels. Fast 1cm move = 200 pixels. Predictability is lost.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
