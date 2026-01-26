'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ruler, RotateCcw, Info, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Common game conversion factors (yaw values)
const GAME_YAW = {
    'cs2': 0.022,
    'valorant': 0.07,
    'overwatch2': 0.0066,
    'apex': 0.022,
    'fortnite': 0.00222,
    'rainbow6': 0.00572,
};

export default function CM360Calculator() {
    const [game, setGame] = useState<keyof typeof GAME_YAW>('cs2');
    const [dpi, setDpi] = useState<string>('800');
    const [sensitivity, setSensitivity] = useState<string>('1.0');
    const [result, setResult] = useState<{ cm: number; inches: number } | null>(null);

    useEffect(() => {
        const d = parseFloat(dpi);
        const s = parseFloat(sensitivity);
        const yaw = GAME_YAW[game];

        if (!isNaN(d) && !isNaN(s) && d > 0 && s > 0) {
            // Formula: 360 / (dpi * sensitivity * yaw) * 2.54 = cm/360
            const inches = 360 / (d * s * yaw);
            const cm = inches * 2.54;
            setResult({ cm, inches });
        } else {
            setResult(null);
        }
    }, [game, dpi, sensitivity]);

    const reset = () => {
        setDpi('800');
        setSensitivity('1.0');
        setGame('cs2');
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-5">
                <Card className="md:col-span-3 border-primary/10">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Ruler className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Distance Config</CardTitle>
                                <CardDescription>Enter your hardware and game settings</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Select Game</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {Object.keys(GAME_YAW).map((g) => (
                                    <Button
                                        key={g}
                                        variant={game === g ? "default" : "outline"}
                                        size="sm"
                                        className="rounded-lg capitalize font-bold"
                                        onClick={() => setGame(g as any)}
                                    >
                                        {g.replace('2', ' 2')}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="dpi">Mouse DPI</Label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="dpi"
                                        type="number"
                                        value={dpi}
                                        onChange={(e) => setDpi(e.target.value)}
                                        className="pl-10 rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sens">Game Sensitivity</Label>
                                <Input
                                    id="sens"
                                    type="number"
                                    step="0.01"
                                    value={sensitivity}
                                    onChange={(e) => setSensitivity(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <Button variant="ghost" className="w-full text-muted-foreground" onClick={reset}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset Fields
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Card */}
                <Card className="md:col-span-2 border-primary/10 overflow-hidden relative">
                    <CardHeader className="py-4 bg-muted/30">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Conversion Results</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 flex flex-col items-center justify-center space-y-8">
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key={result.cm}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6 w-full"
                                >
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-primary italic uppercase">Centimeters for 360°</p>
                                        <p className="text-6xl font-black tracking-tighter text-primary">{result.cm.toFixed(2)}</p>
                                        <p className="text-xl font-bold bg-primary/10 text-primary px-3 py-1 rounded-full inline-block">cm</p>
                                    </div>

                                    <div className="h-px w-full bg-border" />

                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-muted-foreground uppercase">Inches for 360°</p>
                                        <p className="text-4xl font-bold tracking-tight text-muted-foreground">{result.inches.toFixed(2)}"</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center text-muted-foreground italic">
                                    Enter valid values to see calculation
                                </div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                    {/* Background design */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform hover:scale-150" />
                </Card>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Info className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">What is CM per 360?</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    CM/360 is the physical distance (in centimeters) your mouse must travel on your mousepad to
                    complete a full 360-degree rotation in a game. This is the **only truly objective way** to
                    compare sensitivity across different games, mouse DPIs, and resolutions.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-primary mb-2">High Sensitivity</h4>
                        <p className="text-sm text-muted-foreground">Short distance (Low CM/360). Less physical movement, faster aim, harder to be precise.</p>
                    </div>
                    <div className="bg-background p-5 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-primary mb-2">Low Sensitivity</h4>
                        <p className="text-sm text-muted-foreground">Long distance (High CM/360). Large arm movements, extremely precise, but slower for big turns.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
