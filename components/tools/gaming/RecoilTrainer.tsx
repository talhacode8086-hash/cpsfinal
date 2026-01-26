'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Activity, Flame, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const RECOIL_PATTERNS = {
    'AK-47': [
        { x: 0, y: 0 }, { x: 0, y: -10 }, { x: 2, y: -20 }, { x: 5, y: -30 },
        { x: 2, y: -45 }, { x: -5, y: -55 }, { x: -12, y: -65 }, { x: -18, y: -70 },
        { x: -15, y: -72 }, { x: -8, y: -74 }, { x: 5, y: -76 }, { x: 15, y: -78 }
    ],
    'M4A4': [
        { x: 0, y: 0 }, { x: 0, y: -8 }, { x: 0, y: -18 }, { x: 1, y: -28 },
        { x: 0, y: -40 }, { x: -2, y: -50 }, { x: -4, y: -58 }, { x: -6, y: -64 },
        { x: -4, y: -68 }, { x: 0, y: -70 }, { x: 4, y: -72 }, { x: 8, y: -74 }
    ]
};

export default function RecoilTrainer() {
    const [selectedGun, setSelectedGun] = useState<'AK-47' | 'M4A4'>('AK-47');
    const [isFiring, setIsFiring] = useState(false);
    const [shotIndex, setShotIndex] = useState(0);
    const [points, setPoints] = useState<{ x: number, y: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isFiring && shotIndex < RECOIL_PATTERNS[selectedGun].length) {
            interval = setInterval(() => {
                setShotIndex(prev => prev + 1);
                const pattern = RECOIL_PATTERNS[selectedGun][shotIndex];
                setPoints(prev => [...prev, { x: 50 + pattern.x, y: 80 + pattern.y }]);
            }, 100);
        } else if (shotIndex >= RECOIL_PATTERNS[selectedGun].length) {
            setIsFiring(false);
        }
        return () => clearInterval(interval);
    }, [isFiring, shotIndex, selectedGun]);

    const startFiring = () => {
        setPoints([]);
        setShotIndex(0);
        setIsFiring(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex gap-2 p-1 bg-muted rounded-2xl border w-fit">
                    {Object.keys(RECOIL_PATTERNS).map(gun => (
                        <Button
                            key={gun}
                            variant={selectedGun === gun ? 'default' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-6"
                            onClick={() => { setSelectedGun(gun as any); setPoints([]); }}
                        >
                            {gun}
                        </Button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Control Rating</div>
                        <div className="text-2xl font-black text-primary">A- Grade</div>
                    </div>
                    <Flame className="h-8 w-8 text-orange-500 opacity-50" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 relative h-[500px] bg-slate-950 rounded-[3rem] border-8 border-slate-900 shadow-2xl overflow-hidden cursor-crosshair group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <Target className="h-64 w-64 text-white" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {points.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute h-3 w-3 bg-red-500 rounded-full border-2 border-white/50 shadow-[0_0_10px_red]"
                                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <div className="h-6 w-6 border-2 border-primary/40 rounded-full flex items-center justify-center">
                            <div className="h-1 w-1 bg-primary rounded-full" />
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 flex justify-center">
                        <Button
                            className="h-16 px-12 rounded-full text-lg font-bold shadow-2xl group-active:scale-95 transition-transform"
                            onMouseDown={startFiring}
                            onMouseUp={() => setIsFiring(false)}
                        >
                            HOLD LEFT CLICK TO SPRAY
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20 rounded-[2rem]">
                        <CardContent className="p-8 space-y-4">
                            <h3 className="font-bold flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" />
                                Spray Pattern
                            </h3>
                            <div className="h-48 bg-zinc-950 rounded-2xl border border-white/5 relative flex items-center justify-center">
                                <svg className="w-full h-full p-8 overflow-visible">
                                    <polyline
                                        points={RECOIL_PATTERNS[selectedGun].map(p => `${p.x * 2 + 100},${p.y * 2 + 150}`).join(' ')}
                                        fill="none"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="animate-pulse"
                                    />
                                </svg>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                To counter recoil, you must move your mouse in the <b>inverse</b> of the pattern shown above.
                            </p>
                        </CardContent>
                    </Card>

                    <Button variant="outline" className="w-full h-12 rounded-2xl" onClick={() => setPoints([])}>
                        <RotateCcw className="mr-2 h-4 w-4" /> Clear Practice Area
                    </Button>
                </div>
            </div>
        </div>
    );
}
