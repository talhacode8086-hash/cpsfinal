'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shuffle, Info, Sparkles, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SensitivityRandomizer() {
    const [baseSens, setBaseSens] = useState<string>('1.0');
    const [range, setRange] = useState<string>('0.2');
    const [currentSens, setCurrentSens] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const randomize = useCallback(() => {
        const base = parseFloat(baseSens);
        const r = parseFloat(range);

        if (!isNaN(base) && !isNaN(r)) {
            const min = base - r;
            const max = base + r;
            const result = Math.random() * (max - min) + min;
            setCurrentSens(parseFloat(result.toFixed(3)));
            setCopied(false);
        }
    }, [baseSens, range]);

    const copyToClipboard = () => {
        if (currentSens) {
            navigator.clipboard.writeText(currentSens.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            <div className="grid gap-6 md:grid-cols-5">
                <Card className="md:col-span-3 border-primary/10">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Shuffle className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Randomizer Setup</CardTitle>
                                <CardDescription>Configure your practice range</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="base">Base Sensitivity</Label>
                                <Input
                                    id="base"
                                    type="number"
                                    step="0.01"
                                    value={baseSens}
                                    onChange={(e) => setBaseSens(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="range">Range (±)</Label>
                                <Input
                                    id="range"
                                    type="number"
                                    step="0.01"
                                    value={range}
                                    onChange={(e) => setRange(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={randomize}
                            className="w-full h-14 rounded-2xl shadow-lg shadow-primary/20 text-lg font-bold transition-all hover:scale-[1.02]"
                        >
                            <Shuffle className="mr-2 h-5 w-5" />
                            Generate Random Sens
                        </Button>
                    </CardContent>
                </Card>

                {/* Results Card */}
                <Card className="md:col-span-2 border-primary/10 overflow-hidden bg-primary/5 flex flex-col justify-center items-center p-8 gap-6">
                    <AnimatePresence mode="wait">
                        {currentSens ? (
                            <motion.div
                                key={currentSens}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center space-y-6 w-full"
                            >
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Generated Sensitivity</p>
                                    <h2 className="text-7xl font-black text-primary tracking-tighter">{currentSens}</h2>
                                </div>

                                <Button
                                    variant={copied ? "default" : "outline"}
                                    className="rounded-full w-full bg-background"
                                    onClick={copyToClipboard}
                                >
                                    {copied ? (
                                        <><Check className="mr-2 h-4 w-4" /> Copied!</>
                                    ) : (
                                        <><Copy className="mr-2 h-4 w-4" /> Copy Value</>
                                    )}
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="text-center text-muted-foreground space-y-2">
                                <Sparkles className="h-10 w-10 mx-auto opacity-20" />
                                <p className="text-sm">Click the button to start your training session!</p>
                            </div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Info className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Why use a Randomizer?</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    Aim randomizers are used by high-level FPS players to improve their **adaptability and mouse control**.
                    By constantly changing your sensitivity slightly, you force your brain to stop relying purely on
                    physical muscle memory and instead focus on visual correction and fine motor control.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <p className="font-bold text-sm">Anti-Plateau</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">Breaks the "plateau" where you stop improving because your practice becomes too comfortable.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-sm">Better Control</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">Teaches your hand to adjust to both small flicks and large tracking movements regardless of gain.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-sm">Efficient Practice</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">Many trainers claim 30 mins of randomized practice equals 1 hour of static practice.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
