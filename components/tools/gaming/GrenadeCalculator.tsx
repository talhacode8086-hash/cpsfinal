'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Wind, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GrenadeCalculator() {
    const [angle, setAngle] = useState(45);
    const [power, setPower] = useState(100);

    // Basic physics simulation for visualization
    const points = [];
    const g = 9.8;
    const rad = (angle * Math.PI) / 180;
    const v0 = power * 0.8;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);

    for (let t = 0; t <= 10; t += 0.2) {
        const x = vx * t;
        const y = vy * t - 0.5 * g * t * t;
        if (y < -10) break;
        points.push({ x: 50 + x, y: 350 - y * 3 });
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 h-[500px] bg-slate-950 rounded-[3rem] border-8 border-slate-900 shadow-2xl relative overflow-hidden p-12">
                    <div className="absolute inset-x-0 bottom-20 h-[2px] bg-white/5" />
                    <div className="absolute bottom-20 left-20 h-4 w-4 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.8)]" />

                    <svg className="w-full h-full overflow-visible relative z-10">
                        <motion.path
                            key={`${angle}-${power}`}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            d={`M 20 280 ${points.map(p => `L ${p.x + 20} ${p.y - 50}`).join(' ')}`}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="4"
                            strokeDasharray="8 8"
                        />
                        {points.length > 0 && (
                            <circle
                                cx={points[points.length - 1].x + 20}
                                cy={points[points.length - 1].y - 50}
                                r="8"
                                fill="white"
                                className="animate-ping opacity-20"
                            />
                        )}
                    </svg>

                    <div className="absolute top-10 right-10 text-right opacity-30">
                        <Wind className="h-10 w-10 text-white mb-2 ml-auto" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Wind Factor: 0.0</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black italic">Tactic<span className="text-primary italic">CALC</span></h2>
                        <p className="text-sm text-muted-foreground">Physics-based trajectory analyzer for tactical games.</p>
                    </div>

                    <Card className="rounded-3xl border-none bg-muted/30">
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                    <span>Launch Angle</span>
                                    <span className="text-primary">{angle}°</span>
                                </div>
                                <input type="range" min="0" max="90" value={angle} onChange={(e) => setAngle(parseInt(e.target.value))} className="w-full" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                                    <span>Throw Force</span>
                                    <span className="text-primary">{power}%</span>
                                </div>
                                <input type="range" min="10" max="200" value={power} onChange={(e) => setPower(parseInt(e.target.value))} className="w-full" />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-zinc-950 text-white p-6 rounded-3xl relative overflow-hidden group">
                        <Info className="absolute -right-2 -top-2 h-16 w-16 opacity-5 group-hover:opacity-10 transition-opacity" />
                        <h4 className="font-bold flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-primary" />
                            Tactical Use
                        </h4>
                        <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold tracking-tight">
                            Perfect for learning "nades" in CS2 or Smoke lineups in Valorant. Note: Each game uses custom gravity scales.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
