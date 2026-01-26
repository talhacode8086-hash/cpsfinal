'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import { toast } from 'sonner';

export default function NKRORolloverPro() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [history, setHistory] = useState<number[]>([]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.add(e.code);
                return next;
            });
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.delete(e.code);
                return next;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (pressedKeys.size > 0) {
            setHistory(prev => [pressedKeys.size, ...prev].slice(0, 10));
        }
    }, [pressedKeys.size]);

    const maxKeys = history.length > 0 ? Math.max(...history) : 0;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">N-Key Rollover Pro Visualizer</CardTitle>
                <p className="text-muted-foreground mt-2">Advanced visualizer for simultaneous multi-key presses and rollover testing.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
                <div className="flex gap-6 justify-center">
                    <div className="p-8 rounded-[2rem] bg-primary/10 border border-primary/10 text-center flex-1">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Current Pressed</p>
                        <p className="text-7xl font-black">{pressedKeys.size}</p>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-muted/30 border border-primary/5 text-center flex-1">
                        <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">Session Max</p>
                        <p className="text-7xl font-black">{maxKeys}</p>
                    </div>
                </div>

                <div className="p-12 rounded-[3.5rem] bg-muted/10 border-2 border-primary/10 flex flex-wrap gap-4 justify-center min-h-48 items-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
                    {Array.from(pressedKeys).map(key => (
                        <div
                            key={key}
                            className="px-8 py-5 rounded-2xl bg-primary text-white font-black text-2xl shadow-xl shadow-primary/40 animate-in zoom-in-75 duration-100 uppercase border-b-8 border-primary-foreground/30"
                        >
                            {key.replace('Key', '')}
                        </div>
                    ))}
                    {pressedKeys.size === 0 && (
                        <div className="text-center space-y-4">
                            <h3 className="text-3xl font-black opacity-30 uppercase tracking-[0.2em]">Press Multiple Keys</h3>
                            <p className="text-xs text-muted-foreground">Test chords for rhythm games or FPS inputs.</p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <RolloverCard label="Standard" value="6-Key" desc="Common for basic keyboards" />
                    <RolloverCard label="Gaming" value="NKRO" desc="Infinity simultaneous keys" active={maxKeys > 6} />
                    <RolloverCard label="Ghosting" value="None" desc="Matrix paths are isolated" />
                </div>
            </CardContent>
        </Card>
    );
}

function RolloverCard({ label, value, desc, active }: any) {
    return (
        <div className={`p-6 rounded-2xl border transition-all ${active ? 'bg-primary/20 border-primary' : 'bg-background/40 border-primary/5'}`}>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">{label}</p>
            <p className="text-2xl font-black">{value}</p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-1">{desc}</p>
        </div>
    );
}
