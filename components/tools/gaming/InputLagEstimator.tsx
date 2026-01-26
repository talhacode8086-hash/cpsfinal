'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Timer, Zap, Cpu, Monitor, MousePointer2, Info, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InputLagEstimator() {
    const [hz, setHz] = useState<number>(144);
    const [polling, setPolling] = useState<number>(1000);
    const [vSync, setVSync] = useState<boolean>(false);
    const [gpuType, setGpuType] = useState<'low' | 'mid' | 'high'>('mid');

    const [estimate, setEstimate] = useState<{ total: number; breakdown: any } | null>(null);

    useEffect(() => {
        // Basic heuristics for input lag estimation
        const displayLag = 1000 / hz; // Frame persistence
        const mouseLag = 1000 / polling; // Polling interval
        const renderLag = gpuType === 'high' ? 8 : gpuType === 'mid' ? 16 : 32;
        const vsyncLag = vSync ? (1000 / hz) * 1.5 : 2; // Rough penalty for VSync

        const total = displayLag + mouseLag + renderLag + vsyncLag;
        setEstimate({ total, breakdown: { displayLag, mouseLag, renderLag, vsyncLag } });
    }, [hz, polling, vSync, gpuType]);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Inputs */}
                <Card className="border-primary/10">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Timer className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>System Config</CardTitle>
                                <CardDescription>Select your hardware and software profile</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Monitor Refresh Rate</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {[60, 144, 240, 360].map(h => (
                                    <Button
                                        key={h}
                                        variant={hz === h ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setHz(h)}
                                    >
                                        {h}Hz
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Mouse Polling Rate</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {[125, 500, 1000, 4000].map(p => (
                                    <Button
                                        key={p}
                                        variant={polling === p ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setPolling(p)}
                                    >
                                        {p}Hz
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Graphics Card Grade</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { id: 'low', label: 'Entry' },
                                    { id: 'mid', label: 'Gaming' },
                                    { id: 'high', label: 'Pro/RTX' }
                                ].map(g => (
                                    <Button
                                        key={g.id}
                                        variant={gpuType === g.id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setGpuType(g.id as any)}
                                    >
                                        {g.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-primary/5">
                            <div className="space-y-0.5">
                                <p className="text-sm font-bold">VSync Enabled?</p>
                                <p className="text-[10px] text-muted-foreground">Increases smoothness, builds lag.</p>
                            </div>
                            <Button
                                variant={vSync ? "destructive" : "outline"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setVSync(!vSync)}
                            >
                                {vSync ? "ON" : "OFF"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {estimate && (
                        <motion.div
                            key={hz + polling + vSync + gpuType}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card className="h-full border-primary/10 overflow-hidden shadow-2xl shadow-primary/5">
                                <CardHeader className="bg-primary py-6 text-white text-center">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80">Estimated System Latency</p>
                                    <h2 className="text-7xl font-black tracking-tighter tabular-nums">
                                        {estimate.total.toFixed(1)}
                                        <span className="text-xl font-bold ml-1 uppercase">ms</span>
                                    </h2>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Latency Breakdown</p>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="flex items-center gap-2"><Monitor className="h-3 w-3" /> Display Persistence</span>
                                                <span className="font-mono">{estimate.breakdown.displayLag.toFixed(1)}ms</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="flex items-center gap-2"><MousePointer2 className="h-3 w-3" /> Peripheral Delay</span>
                                                <span className="font-mono">{estimate.breakdown.mouseLag.toFixed(1)}ms</span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="flex items-center gap-2"><Cpu className="h-3 w-3" /> Render Pipeline</span>
                                                <span className="font-mono">{estimate.breakdown.renderLag.toFixed(1)}ms</span>
                                            </div>
                                            {vSync && (
                                                <div className="flex justify-between items-center text-xs text-destructive">
                                                    <span className="flex items-center gap-2"><Zap className="h-3 w-3" /> VSync Penalty</span>
                                                    <span className="font-mono">+{Number(estimate.breakdown.vsyncLag).toFixed(1)}ms</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl text-center font-bold text-xs ${estimate.total < 15 ? 'bg-green-500/10 text-green-500' : estimate.total < 30 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-destructive/10 text-destructive'}`}>
                                        {estimate.total < 15 ? 'PRO GRADE - EXCELLENT' : estimate.total < 30 ? 'GAMING GRADE - GOOD' : 'STANDARD GRADE - LAGGY'}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Wait, what is System Latency?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "End-to-End System Latency" is the total time it takes for your click to travel through
                    your mouse, to your CPU, be rendered by your GPU, and finally appear as a light change
                    on your monitor.
                </p>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <p className="font-bold text-sm">How to lower it?</p>
                        <div className="space-y-1">
                            {[
                                'Disable VSync in game settings',
                                'Use Fullscreen mode (not Windowed)',
                                'Enable NVIDIA Reflex or AMD Anti-Lag',
                                'Use higher Refresh Rates (Hz)'
                            ].map(t => (
                                <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <ChevronRight className="h-3 w-3 text-primary" /> {t}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-background p-4 rounded-xl border border-primary/5 flex items-center justify-center">
                        <p className="text-[10px] text-muted-foreground text-center">
                            Note: This is an estimator based on hardware physics. True precise measurement requires specialized tools like NVIDIA LDAT or 1000fps cameras.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
