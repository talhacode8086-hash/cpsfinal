'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Info, Zap, Weight } from 'lucide-react';

export default function ActuatorForceTest() {
    const [force, setForce] = useState(45);

    const profiles = [
        { name: 'Ultra Light', g: 35, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { name: 'Standard Gaming', g: 45, color: 'text-red-500', bg: 'bg-red-500/10' },
        { name: 'Heavy Tactile', g: 60, color: 'text-amber-600', bg: 'bg-amber-600/10' },
        { name: 'Industry Heavy', g: 80, color: 'text-zinc-600', bg: 'bg-zinc-600/10' },
    ];

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-black">Actuation Discovery</h2>
                <p className="text-muted-foreground">Learn about the physical force required to register a keypress.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card className="bg-muted/30 border-none rounded-[2.5rem] p-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Force Spectrum</span>
                            <Weight className="h-4 w-4 opacity-50" />
                        </div>
                        <div className="text-7xl font-black text-primary mb-2">{force}<span className="text-2xl opacity-40">g</span></div>
                        <p className="text-sm text-muted-foreground">Grams of force (cN) to actuate</p>

                        <div className="mt-8 space-y-4">
                            <input
                                type="range"
                                min="20"
                                max="100"
                                value={force}
                                onChange={(e) => setForce(parseInt(e.target.value))}
                                className="w-full accent-primary"
                            />
                            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                                <span>LIGHT</span>
                                <span>MEDIUM</span>
                                <span>HEAVY</span>
                            </div>
                        </div>
                    </Card>

                    <div className="flex flex-wrap gap-2">
                        {profiles.map(p => (
                            <Button
                                key={p.name}
                                variant="outline"
                                size="sm"
                                className={`rounded-full border-none ${p.bg} ${p.color} font-bold`}
                                onClick={() => setForce(p.g)}
                            >
                                {p.name} ({p.g}g)
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 bg-card border rounded-3xl shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Zap className="h-4 w-4" />
                            </div>
                            <h3 className="font-bold">What it feels like</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {force < 40 && "Extremely sensitive. You might accidentally actuate keys just by resting your fingers on them."}
                            {force >= 40 && force < 55 && "The sweet spot for speed and control. Most red and brown switches fall here."}
                            {force >= 55 && force < 70 && "Solid resistance. You need intentional movement to press keys, reducing accidental inputs."}
                            {force >= 70 && "Heavy and industrial. Great for preventing typos, but might cause fatigue during long gaming sessions."}
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-950 text-white rounded-3xl space-y-4 relative overflow-hidden">
                        <Scale className="absolute -right-4 -bottom-4 h-24 w-24 opacity-10" />
                        <h3 className="font-bold flex items-center gap-2">
                            <Info className="h-4 w-4 text-primary" />
                            Comparison
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs">
                                <span className="opacity-60">Your Choice</span>
                                <span className="font-mono">{force}g</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${(force / 100) * 100}%` }} />
                            </div>
                            <div className="flex justify-between text-[10px] opacity-40">
                                <span>Nickel (5g)</span>
                                <span>10 Nickels</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
