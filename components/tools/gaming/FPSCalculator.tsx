'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Monitor, Timer, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FPSCalculator() {
    const [hz, setHz] = useState<string>('144');
    const [fps, setFps] = useState<string>('240');
    const [stats, setStats] = useState<{
        frameTime: number;
        monitorInterval: number;
        usageRatio: number;
        smoothness: number;
    } | null>(null);

    useEffect(() => {
        const h = parseFloat(hz);
        const f = parseFloat(fps);

        if (!isNaN(h) && !isNaN(f) && h > 0 && f > 0) {
            const frameTime = 1000 / f;
            const monitorInterval = 1000 / h;
            const usageRatio = f / h;

            // Heuristic for smoothness
            let smoothness = (f / h) * 100;
            if (smoothness > 100) smoothness = 100 + (Math.log10(f / h) * 10);

            setStats({ frameTime, monitorInterval, usageRatio, smoothness });
        } else {
            setStats(null);
        }
    }, [hz, fps]);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-primary/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Monitor className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Display Stats</CardTitle>
                                <CardDescription>Compare your monitor capability with game performance</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="hz">Monitor Refresh Rate (Hz)</Label>
                                <Input
                                    id="hz"
                                    type="number"
                                    value={hz}
                                    onChange={(e) => setHz(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fps">In-Game Average FPS</Label>
                                <Input
                                    id="fps"
                                    type="number"
                                    value={fps}
                                    onChange={(e) => setFps(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/50 border border-primary/5 space-y-4">
                            <p className="text-sm font-bold flex items-center gap-2">
                                <Zap className="h-4 w-4 text-yellow-500" />
                                Quick Insights
                            </p>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monitor limit:</span>
                                    <span className="font-bold">{hz} frames/sec</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Frame generation:</span>
                                    <span className="font-bold">{fps} frames/sec</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results Card */}
                <AnimatePresence mode="wait">
                    {stats ? (
                        <motion.div
                            key={hz + fps}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="h-full border-primary/10 shadow-lg shadow-primary/5 overflow-hidden">
                                <CardHeader className="py-4 bg-primary/5 border-b border-primary/10">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Performance Analysis</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                                <Timer className="h-3 w-3" />
                                                Frame Time
                                            </Label>
                                            <p className="text-3xl font-black text-primary tabular-nums">{stats.frameTime.toFixed(2)}<span className="text-sm font-bold ml-1">ms</span></p>
                                            <p className="text-[10px] text-muted-foreground leading-tight">Lower = faster system response.</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                                                Monitor Window
                                            </Label>
                                            <p className="text-3xl font-black tabular-nums">{stats.monitorInterval.toFixed(2)}<span className="text-sm font-bold ml-1">ms</span></p>
                                            <p className="text-[10px] text-muted-foreground leading-tight">Time between screen refreshes.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold">System Smoothness</p>
                                                <p className="text-xs text-muted-foreground">Efficiency of frame delivery</p>
                                            </div>
                                            <p className="text-2xl font-black text-primary">{Math.round(stats.smoothness)}%</p>
                                        </div>
                                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-primary/10 p-0.5">
                                            <motion.div
                                                className="h-full bg-primary rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${Math.min(100, stats.smoothness)}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border flex gap-3 items-start ${stats.usageRatio >= 1 ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                        {stats.usageRatio >= 1 ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-green-700 dark:text-green-400">Optimal Performance</p>
                                                    <p className="text-xs text-green-600/80 dark:text-green-500/80">Your PC generates frames faster than your monitor can display them. This ensures minimum input lag.</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">Monitor Underutilized</p>
                                                    <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80">Your monitor can refresh faster than your hardware is providing frames. Consider lowering graphics settings for more smoothness.</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold">Frame Time vs. FPS</h3>
                <p className="text-muted-foreground leading-relaxed">
                    FPS is just an average of how many frames were rendered in a second. **Frame Time** is the exact
                    time it takes to render a single frame. Consistent frame times are much more important
                    for aim than a high average FPS with large spikes.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <p className="font-bold text-sm">60Hz (16.6ms)</p>
                        <p className="text-xs text-muted-foreground">Standard office monitor. High lag for competitive gaming.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-sm">144Hz (6.9ms)</p>
                        <p className="text-xs text-muted-foreground">The gold standard for gaming. Huge improvement in responsiveness.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-sm">240Hz+ (4.1ms)</p>
                        <p className="text-xs text-muted-foreground">Pro-grade. Extremely low latency for pixel-perfect tracking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
