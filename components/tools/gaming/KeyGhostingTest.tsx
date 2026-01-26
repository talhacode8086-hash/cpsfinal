'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Keyboard, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function KeyGhostingTest() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleDown = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.add(e.code);
                return next;
            });
        };
        const handleUp = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.delete(e.code);
                return next;
            });
        };

        window.addEventListener('keydown', handleDown);
        window.addEventListener('keyup', handleUp);
        return () => {
            window.removeEventListener('keydown', handleDown);
            window.removeEventListener('keyup', handleUp);
        };
    }, []);

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black">Ghosting Detector</h2>
                <p className="text-muted-foreground">Press multiple keys simultaneously to see if they all register.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {Array.from(pressedKeys).map(key => (
                    <div
                        key={key}
                        className="h-16 flex items-center justify-center bg-primary text-primary-foreground font-mono rounded-xl shadow-lg shadow-primary/20 animate-in zoom-in-90 duration-75"
                    >
                        {key.replace('Key', '')}
                    </div>
                ))}
            </div>

            {pressedKeys.size === 0 && (
                <div className="h-32 border-2 border-dashed rounded-2xl flex items-center justify-center text-muted-foreground italic bg-muted/20">
                    Waiting for key input...
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="py-6 flex gap-4 items-center">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                        <div>
                            <div className="font-bold">Active Keys</div>
                            <div className="text-2xl font-black">{pressedKeys.size}</div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-muted bg-muted/30">
                    <CardContent className="py-6 flex gap-4 items-center">
                        <ShieldAlert className="h-8 w-8 text-muted-foreground" />
                        <div>
                            <div className="font-bold">Ghosting Info</div>
                            <p className="text-xs text-muted-foreground">Average membrane keyboards ghost after 3-6 keys.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-muted/30 p-6 rounded-3xl text-sm leading-relaxed border border-muted">
                <h3 className="font-bold mb-2">What is Keyboard Ghosting?</h3>
                <p className="text-muted-foreground">
                    Ghosting happens when some keys don't work when multiple keys are pressed simultaneously. This is due to the wiring design in some keyboards. Mechanical gaming keyboards often have "Anti-Ghosting" technology or "N-Key Rollover" (NKRO) to prevent this entirely.
                </p>
            </div>
        </div>
    );
}
