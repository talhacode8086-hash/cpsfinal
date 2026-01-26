'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Scale, Ruler, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SensitivityMatch() {
    const [p1, setP1] = useState({ dpi: '800', sens: '1.0' });
    const [p2, setP2] = useState({ dpi: '400', sens: '2.0' });
    const [result, setResult] = useState<{ edpi1: number; edpi2: number; diff: number } | null>(null);

    useEffect(() => {
        const d1 = parseFloat(p1.dpi);
        const s1 = parseFloat(p1.sens);
        const d2 = parseFloat(p2.dpi);
        const s2 = parseFloat(p2.sens);

        if (!isNaN(d1) && !isNaN(s1) && !isNaN(d2) && !isNaN(s2) && d1 > 0 && d2 > 0) {
            const edpi1 = d1 * s1;
            const edpi2 = d2 * s2;
            const diff = ((edpi2 - edpi1) / edpi1) * 100;
            setResult({ edpi1, edpi2, diff });
        } else {
            setResult(null);
        }
    }, [p1, p2]);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile 1 */}
                <Card className="border-primary/10">
                    <CardHeader className="bg-primary/5 rounded-t-xl py-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Profile A (Reference)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label>DPI</Label>
                            <Input
                                type="number"
                                value={p1.dpi}
                                onChange={(e) => setP1({ ...p1, dpi: e.target.value })}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sensitivity</Label>
                            <Input
                                type="number"
                                value={p1.sens}
                                onChange={(e) => setP1({ ...p1, sens: e.target.value })}
                                className="rounded-xl"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Profile 2 */}
                <Card className="border-primary/10">
                    <CardHeader className="bg-primary/5 rounded-t-xl py-4">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Profile B (Target)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-2">
                            <Label>DPI</Label>
                            <Input
                                type="number"
                                value={p2.dpi}
                                onChange={(e) => setP2({ ...p2, dpi: e.target.value })}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Sensitivity</Label>
                            <Input
                                type="number"
                                value={p2.sens}
                                onChange={(e) => setP2({ ...p2, sens: e.target.value })}
                                className="rounded-xl"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Analysis Result */}
            {result && (
                <Card className="border-primary/10 overflow-hidden shadow-xl shadow-primary/5">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-3 items-center">
                            <div className="p-8 text-center bg-primary/5 space-y-2">
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Profile A</p>
                                <p className="text-4xl font-black text-primary">{result.edpi1}</p>
                                <p className="text-xs font-bold opacity-50">eDPI</p>
                            </div>

                            <div className="p-8 text-center border-y md:border-y-0 md:border-x space-y-4">
                                <Scale className="h-8 w-8 text-primary mx-auto opacity-20" />
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase text-muted-foreground">Difference</p>
                                    <p className={`text-4xl font-black ${Math.abs(result.diff) < 0.1 ? 'text-green-500' : 'text-primary'}`}>
                                        {result.diff > 0 ? '+' : ''}{result.diff.toFixed(2)}%
                                    </p>
                                </div>
                                {Math.abs(result.diff) < 0.1 ? (
                                    <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold">
                                        <CheckCircle2 className="h-3 w-3" /> PERFECT MATCH
                                    </div>
                                ) : (
                                    <p className="text-[10px] font-bold text-muted-foreground">Your target is {result.diff > 0 ? 'faster' : 'slower'}.</p>
                                )}
                            </div>

                            <div className="p-8 text-center bg-primary/5 space-y-2">
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Profile B</p>
                                <p className="text-4xl font-black text-primary">{result.edpi2}</p>
                                <p className="text-xs font-bold opacity-50">eDPI</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="rounded-2xl border bg-muted/30 p-8 space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Ruler className="h-5 w-5 text-primary" />
                    Comparison Logic
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Many players switch mice and want to keep their physical sensitivity identical. Since
                    sensors have different native DPIs, you can use this tool to calculate what your
                    new in-game sensitivity should be to match your old setup exactly.
                </p>
                <div className="bg-background p-4 rounded-xl border border-primary/5 flex gap-4 items-start">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        <strong>Tip:</strong> If you're switching from 400 DPI to 800 DPI, you must halve your in-game
                        sensitivity to stay consistent (e.g., 2.0 @ 400 DPI = 1.0 @ 800 DPI).
                    </p>
                </div>
            </div>
        </div>
    );
}
