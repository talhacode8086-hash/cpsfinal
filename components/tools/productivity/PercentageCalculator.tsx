'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Percent, ArrowRight } from 'lucide-react';

export default function PercentageCalculator() {
    // Mode 1: What is X% of Y?
    const [m1p, setM1p] = useState<number>(20);
    const [m1v, setM1v] = useState<number>(500);
    const r1 = (m1v * m1p) / 100;

    // Mode 2: X is what percent of Y?
    const [m2v1, setM2v1] = useState<number>(50);
    const [m2v2, setM2v2] = useState<number>(200);
    const r2 = (m2v1 / m2v2) * 100;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Percent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Percentage Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Solve any percentage problem instantly with these clean tools.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-12">
                {/* Mode 1 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
                        What is X% of Y?
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                        <span className="text-sm font-bold">What is</span>
                        <Input type="number" className="w-24 h-11 text-center font-bold" value={m1p} onChange={e => setM1p(parseFloat(e.target.value) || 0)} />
                        <span className="text-sm font-bold">% of</span>
                        <Input type="number" className="w-40 h-11 text-center font-bold" value={m1v} onChange={e => setM1v(parseFloat(e.target.value) || 0)} />
                        <ArrowRight className="h-5 w-5 text-primary" />
                        <div className="flex-1 h-11 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                            <span className="text-2xl font-black text-primary">{r1.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Mode 2 */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
                        X is what percent of Y?
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-primary/5">
                        <Input type="number" className="w-32 h-11 text-center font-bold" value={m2v1} onChange={e => setM2v1(parseFloat(e.target.value) || 0)} />
                        <span className="text-sm font-bold">is what % of</span>
                        <Input type="number" className="w-40 h-11 text-center font-bold" value={m2v2} onChange={e => setM2v2(parseFloat(e.target.value) || 0)} />
                        <ArrowRight className="h-5 w-5 text-primary" />
                        <div className="flex-1 h-11 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                            <span className="text-2xl font-black">{r2.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
