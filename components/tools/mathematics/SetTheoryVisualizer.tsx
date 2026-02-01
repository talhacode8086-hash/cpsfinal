"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SetTheoryVisualizer() {
    const [setAStr, setSetAStr] = useState('1, 2, 3, 4, 5');
    const [setBStr, setSetBStr] = useState('4, 5, 6, 7, 8');
    const [result, setResult] = useState<any>(null);

    const parseSet = (str: string) => {
        return new Set(
            str.split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0)
        );
    };

    const calculate = () => {
        const A = parseSet(setAStr);
        const B = parseSet(setBStr);

        // Operations
        const union = new Set([...A, ...B]);
        const intersection = new Set([...A].filter(x => B.has(x)));
        const diffAB = new Set([...A].filter(x => !B.has(x)));
        const diffBA = new Set([...B].filter(x => !A.has(x)));
        const symDiff = new Set([...diffAB, ...diffBA]); // A xor B

        const fmt = (s: Set<string>) => `{ ${Array.from(s).join(', ')} }`;
        const size = (s: Set<string>) => s.size;

        setResult({
            union: { val: fmt(union), size: size(union) },
            intersection: { val: fmt(intersection), size: size(intersection) },
            diffAB: { val: fmt(diffAB), size: size(diffAB) },
            diffBA: { val: fmt(diffBA), size: size(diffBA) },
            symDiff: { val: fmt(symDiff), size: size(symDiff) }
        });
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Set Theory Visualizer</CardTitle>
                <p className="text-muted-foreground mt-2">Union, Intersection, and Difference of Sets</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Set A</Label>
                        <Input
                            value={setAStr}
                            onChange={(e) => setSetAStr(e.target.value)}
                            placeholder="e.g. 1, 2, 3"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Set B</Label>
                        <Input
                            value={setBStr}
                            onChange={(e) => setSetBStr(e.target.value)}
                            placeholder="e.g. 3, 4, 5"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate Operations
                </Button>

                {result && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-5">
                        <div className="p-4 bg-secondary/20 rounded-xl border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Union (A ∪ B)</div>
                            <div className="font-mono font-bold text-primary break-words">{result.union.val}</div>
                            <div className="text-xs text-muted-foreground mt-1">Size: {result.union.size}</div>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-xl border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Intersection (A ∩ B)</div>
                            <div className="font-mono font-bold text-primary break-words">{result.intersection.val}</div>
                            <div className="text-xs text-muted-foreground mt-1">Size: {result.intersection.size}</div>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-xl border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Difference (A - B)</div>
                            <div className="font-mono font-bold text-primary break-words">{result.diffAB.val}</div>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-xl border border-primary/10">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Difference (B - A)</div>
                            <div className="font-mono font-bold text-primary break-words">{result.diffBA.val}</div>
                        </div>
                        <div className="p-4 bg-secondary/20 rounded-xl border border-primary/10 col-span-1 md:col-span-2">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Symmetric Difference (A Δ B)</div>
                            <div className="font-mono font-bold text-primary break-words">{result.symDiff.val}</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
