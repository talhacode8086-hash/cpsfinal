'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function GoldenRatioCalc() {
    const [val, setVal] = useState('100');
    const phi = 1.61803398875;

    const calculate = (v: number) => {
        return {
            smaller: v / phi,
            larger: v * phi,
            total: v + (v * phi),
            segments: [v / Math.pow(phi, 2), v / phi, v, v * phi]
        };
    };

    const results = calculate(parseFloat(val) || 0);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Compass className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Golden Ratio Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Find nature&apos;s most aesthetic proportions for your UI and layouts.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-8 items-end justify-center">
                    <div className="space-y-4 text-left">
                        <label className="text-[10px] font-black uppercase text-primary tracking-widest text-center block">Reference Length</label>
                        <Input
                            type="number"
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            className="h-20 w-64 text-5xl font-black text-center rounded-3xl bg-muted/20 border-primary/10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ResultTile label="Smaller (A/Φ)" value={results.smaller.toFixed(2)} />
                    <ResultTile label="Larger (A*Φ)" value={results.larger.toFixed(2)} active />
                    <ResultTile label="Total Length" value={results.total.toFixed(2)} />
                </div>

                <div className="relative pt-16">
                    <div className="flex items-end justify-start h-40 gap-1 overflow-hidden rounded-3xl opacity-50">
                        {results.segments.map((s, i) => (
                            <div key={i} className="bg-primary/20 border-t-4 border-primary" style={{ width: s, height: `${20 + i * 20}%` }} />
                        ))}
                    </div>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest text-primary mt-4">Visual Scale Projection</p>
                </div>

                <div className="p-10 rounded-[3rem] bg-background border-2 border-primary/5 flex gap-6 items-center">
                    <Info className="h-10 w-10 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        The Golden Ratio (Φ ≈ 1.618) is a mathematical ratio found in nature and art. In design, it helps create balanced, organic layouts that feel naturally &quot;right&quot; to the human eye.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function ResultTile({ label, value, active }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all text-center ${active ? 'bg-primary text-white border-primary shadow-2xl shadow-primary/30' : 'bg-muted/10 border-primary/5'}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'opacity-60' : 'text-primary'}`}>{label}</p>
            <h4 className="text-4xl font-black mt-2">{value}</h4>
        </div>
    );
}
