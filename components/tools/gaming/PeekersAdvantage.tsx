'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MonitorPlay, Zap, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PeekersAdvantage() {
    const [ping, setPing] = useState(50);
    const [isPeeking, setIsPeeking] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const handlePeek = () => {
        setIsPeeking(true);
        setResult(null);

        // Peekers Advantage = (Ping / 1000) * Movement Speed + Processing Delay
        const delay = ping + 20; // Simulated delay in ms

        setTimeout(() => {
            setIsPeeking(false);
            setResult(`You were visible to enemy for ${delay}ms before you saw them!`);
        }, 1000);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black">Perspective Sim</h2>
                        <p className="text-muted-foreground">Visualize how network latency creates an advantage for the aggressive player.</p>
                    </div>

                    <Card className="bg-muted/30 border-none rounded-3xl p-6">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Simulated Latency (Ping)</label>
                                <span className={`font-mono font-bold ${ping > 100 ? 'text-destructive' : 'text-primary'}`}>{ping}ms</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="300"
                                value={ping}
                                onChange={(e) => setPing(parseInt(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] font-bold opacity-40 uppercase">
                                <span>LAN (0ms)</span>
                                <span>Moderate (50ms)</span>
                                <span>High (300ms)</span>
                            </div>
                        </div>
                    </Card>

                    <Button
                        size="lg"
                        className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20"
                        onClick={handlePeek}
                        disabled={isPeeking}
                    >
                        {isPeeking ? 'PEEKING...' : 'TEST PEEKERS ADVANTAGE'}
                    </Button>
                </div>

                <div className="relative h-[400px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-inner flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                    {/* The Corner */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-800/80 backdrop-blur-md border-l-4 border-slate-700 z-10" />

                    {/* The Player (Attacker) */}
                    <motion.div
                        className="absolute h-16 w-16 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.4)]"
                        initial={{ left: '-10%' }}
                        animate={isPeeking ? { left: '40%' } : { left: '-10%' }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <Zap className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* The Target (Defender) */}
                    <div className="absolute right-10 h-16 w-16 bg-red-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                        <MonitorPlay className="h-8 w-8 text-white" />
                    </div>

                    <div className="absolute bottom-6 left-6 flex gap-2">
                        <div className="h-2 w-8 bg-primary rounded-full" />
                        <div className="h-2 w-8 bg-red-500 rounded-full" />
                    </div>
                </div>
            </div>

            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-primary/10 border border-primary/20 rounded-3xl flex items-center gap-4"
                >
                    <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Wifi className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-bold text-primary">{result}</p>
                </motion.div>
            )}
        </div>
    );
}
