'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Keyboard, RotateCcw, Zap, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NKROTester() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [maxKeys, setMaxKeys] = useState<number>(0);
    const [history, setHistory] = useState<string[][]>([]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Prevent default browser behavior for common shortcuts to allow testing
        if (['Tab', 'F1', 'F3', 'F5', 'F6', 'F12'].includes(e.key)) {
            // e.preventDefault();
        }

        setPressedKeys(prev => {
            const next = new Set(prev);
            next.add(e.code); // Use code instead of key for unique physical key detection
            if (next.size > maxKeys) {
                setMaxKeys(next.size);
            }
            return next;
        });
    }, [maxKeys]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        setPressedKeys(prev => {
            const next = new Set(prev);
            next.delete(e.code);
            return next;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        // Handle focus loss to clear keys
        const handleBlur = () => setPressedKeys(new Set());
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, [handleKeyDown, handleKeyUp]);

    const reset = () => {
        setPressedKeys(new Set());
        setMaxKeys(0);
        setHistory([]);
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 overflow-hidden border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Keyboard className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>NKRO Detection</CardTitle>
                                <CardDescription>Press and hold as many keys as possible</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="h-80 flex flex-col items-center justify-center p-6 text-center space-y-6">
                        <div className="relative">
                            <motion.div
                                key={pressedKeys.size}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-9xl font-black text-primary tracking-tighter"
                            >
                                {pressedKeys.size}
                            </motion.div>
                            <div className="absolute top-0 -right-12">
                                <Zap className="h-8 w-8 text-yellow-500 fill-yellow-500 animate-pulse" />
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 max-w-md">
                            <AnimatePresence>
                                {Array.from(pressedKeys).map((key) => (
                                    <motion.div
                                        key={key}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-lg text-xs font-bold font-mono text-primary"
                                    >
                                        {key.replace('Key', '').replace('Digit', '')}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {pressedKeys.size === 0 && (
                                <p className="text-muted-foreground italic">No keys currently pressed</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="border-primary/10 bg-primary/5">
                        <CardContent className="pt-6 text-center">
                            <Layers className="h-8 w-8 text-primary mx-auto mb-2" />
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Max Keys (Rollover)</p>
                            <p className="text-5xl font-black text-primary">{maxKeys}</p>
                        </CardContent>
                    </Card>

                    <div className="p-6 rounded-2xl border bg-muted/30 space-y-4">
                        <h4 className="font-bold text-sm">Hardware Rating</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className={maxKeys >= 2 && maxKeys < 6 ? "text-primary font-bold" : "text-muted-foreground"}>2-Key (Basic)</span>
                                {maxKeys >= 2 && maxKeys < 6 && <Zap className="h-3 w-3 text-yellow-500" />}
                            </div>
                            <div className="h-1 w-full bg-muted rounded-full">
                                <div className={`h-full bg-primary transition-all duration-500 ${maxKeys >= 2 ? 'w-1/3' : 'w-0'}`} />
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className={maxKeys >= 6 && maxKeys < 10 ? "text-primary font-bold" : "text-muted-foreground"}>6-Key (Gaming Standard)</span>
                                {maxKeys >= 6 && maxKeys < 10 && <Zap className="h-3 w-3 text-yellow-500" />}
                            </div>
                            <div className="h-1 w-full bg-muted rounded-full">
                                <div className={`h-full bg-primary transition-all duration-500 ${maxKeys >= 6 ? 'w-2/3' : 'w-0'}`} />
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className={maxKeys >= 10 ? "text-primary font-bold" : "text-muted-foreground"}>N-Key (Full Rollover)</span>
                                {maxKeys >= 10 && <Zap className="h-3 w-3 text-yellow-500" />}
                            </div>
                            <div className="h-1 w-full bg-muted rounded-full">
                                <div className={`h-full bg-primary transition-all duration-500 ${maxKeys >= 10 ? 'w-full' : 'w-0'}`} />
                            </div>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full rounded-xl" onClick={reset}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Record
                    </Button>
                </div>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <h3 className="text-xl font-bold">What is NKRO?</h3>
                <p className="text-muted-foreground leading-relaxed">
                    NKRO (N-Key Rollover) is the ability of a computer keyboard to correctly register all keys
                    being pressed simultaneously. Without it, some keys might be "lost" or ignored by the
                    system when you press many at once.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2">Why it matters for Gaming</h4>
                        <p className="text-xs text-muted-foreground">In complex games like MMOs or competitive shooters, you might need to hold W+A+Shift+1+2+Space all at once. Low rollover can stop you from jumping or moving diagonally while using abilities.</p>
                    </div>
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm mb-2">USB Limitations</h4>
                        <p className="text-xs text-muted-foreground">Standard USB keyboards are often limited to 6-key rollover (6KRO). Modern high-end gaming keyboards use specialized drivers to achieve full N-Key Rollover over USB.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
