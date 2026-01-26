'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, Activity, Zap } from 'lucide-react';

export default function KeyRolloverTest() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [maxKeys, setMaxKeys] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.add(e.code);
                if (newSet.size > maxKeys) setMaxKeys(newSet.size);
                return newSet;
            });
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(e.code);
                return newSet;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [maxKeys]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6">
                <Card className="flex-1 bg-zinc-950 text-white border-zinc-800 shadow-2xl">
                    <CardContent className="py-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity className="h-32 w-32" />
                        </div>
                        <div className="text-xs uppercase font-bold tracking-widest opacity-60 mb-2">Max Rollover Detected</div>
                        <div className="text-9xl font-black text-primary">{maxKeys}</div>
                        <div className="mt-4 text-sm font-medium px-4 py-1 bg-white/10 rounded-full inline-block">
                            {maxKeys >= 10 ? 'NKRO Support Likely' : maxKeys >= 6 ? '6-Key Rollover' : 'Standard Keyboard'}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex-1 flex flex-col justify-between p-6 bg-muted/40 rounded-3xl border border-muted">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary/20 flex items-center justify-center rounded-xl">
                                <Keyboard className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-bold">Currently Registered</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-background/50 rounded-2xl border border-muted shadow-inner">
                            {Array.from(pressedKeys).map(k => (
                                <span key={k} className="px-3 py-1 bg-primary text-primary-foreground text-xs font-mono rounded-md animate-in fade-in slide-in-from-bottom-2">
                                    {k.replace('Key', '')}
                                </span>
                            ))}
                            {pressedKeys.size === 0 && <span className="text-muted-foreground text-xs italic">Press and hold keys...</span>}
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full mt-4" onClick={() => setMaxKeys(0)}>Reset Counter</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm">
                        <Zap className="h-4 w-4 text-primary" />
                        What is NKRO?
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        N-Key Rollover means every single key on the keyboard can be registered at the same time. Important for fast-paced gaming and professional typing.
                    </p>
                </div>
                {/* Add more info boxes as needed */}
            </div>
        </div>
    );
}
