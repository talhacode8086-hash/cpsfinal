'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RotateCcw, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EDPICalculator() {
    const [dpi, setDpi] = useState<string>('800');
    const [sensitivity, setSensitivity] = useState<string>('1.0');
    const [edpi, setEdpi] = useState<number | null>(null);

    useEffect(() => {
        const d = parseFloat(dpi);
        const s = parseFloat(sensitivity);
        if (!isNaN(d) && !isNaN(s)) {
            setEdpi(d * s);
        } else {
            setEdpi(null);
        }
    }, [dpi, sensitivity]);

    const handleReset = () => {
        setDpi('800');
        setSensitivity('1.0');
    };

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <Card className="border-primary/10 shadow-lg shadow-primary/5">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                        <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">eDPI Calculator</CardTitle>
                    <CardDescription>
                        Formula: DPI × In-Game Sensitivity = eDPI
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="dpi">Mouse DPI</Label>
                            <Input
                                id="dpi"
                                type="number"
                                placeholder="e.g. 800"
                                value={dpi}
                                onChange={(e) => setDpi(e.target.value)}
                                className="rounded-xl border-primary/20 focus-visible:ring-primary/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sensitivity">In-Game Sensitivity</Label>
                            <Input
                                id="sensitivity"
                                type="number"
                                step="0.01"
                                placeholder="e.g. 1.0"
                                value={sensitivity}
                                onChange={(e) => setSensitivity(e.target.value)}
                                className="rounded-xl border-primary/20 focus-visible:ring-primary/30"
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {edpi !== null && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center"
                            >
                                <Label className="text-sm uppercase tracking-widest text-primary font-bold">Your effective DPI (eDPI)</Label>
                                <div className="mt-2 text-6xl font-black tracking-tighter text-primary">
                                    {edpi.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        onClick={handleReset}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset Values
                    </Button>
                </CardContent>
            </Card>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-xl font-bold">What is eDPI?</h3>
                <p className="text-muted-foreground leading-relaxed">
                    Effective DPI (eDPI) is a value used to compare the "real" sensitivity of different players,
                    regardless of their mouse DPI settings or in-game sensitivity.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className="p-4 rounded-xl bg-background border border-primary/5">
                        <p className="font-bold text-primary mb-1">Example A</p>
                        <p className="text-sm text-muted-foreground">800 DPI × 1.0 Sens = 800 eDPI</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background border border-primary/5">
                        <p className="font-bold text-primary mb-1">Example B</p>
                        <p className="text-sm text-muted-foreground">400 DPI × 2.0 Sens = 800 eDPI</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground italic">
                    Both players in the examples above have the exact same physical movement in-game!
                </p>
            </div>
        </div>
    );
}
