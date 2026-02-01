"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SequenceSeriesSolver() {
    const [type, setType] = useState('AP'); // AP or GP
    const [firstTerm, setFirstTerm] = useState('1');
    const [commonDiff, setCommonDiff] = useState('2');
    const [commonRatio, setCommonRatio] = useState('2');
    const [nTerm, setNTerm] = useState('10'); // n
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const a = parseFloat(firstTerm);
        const n = parseInt(nTerm);

        if (isNaN(a) || isNaN(n) || n <= 0) {
            setResult({ error: "Please enter valid numbers. n must be a positive integer." });
            return;
        }

        if (type === 'AP') {
            const d = parseFloat(commonDiff);
            if (isNaN(d)) return;

            // AP Formulas
            const an = a + (n - 1) * d;
            const sn = (n / 2) * (2 * a + (n - 1) * d);

            // Generate sequence preview
            const seq = [];
            for (let i = 0; i < Math.min(n, 10); i++) seq.push(a + i * d);

            setResult({
                type: 'Arithmetic Progression (AP)',
                nth: an,
                sum: sn,
                seq: seq,
                n: n,
                params: { a, d }
            });
        } else {
            const r = parseFloat(commonRatio);
            if (isNaN(r)) return;

            // GP Formulas
            const an = a * Math.pow(r, n - 1);
            let sn;
            if (r === 1) {
                sn = a * n;
            } else {
                sn = a * (Math.pow(r, n) - 1) / (r - 1);
            }

            // Infinite sum
            let sInf = null;
            if (Math.abs(r) < 1) {
                sInf = a / (1 - r);
            }

            // Generate sequence preview
            const seq = [];
            for (let i = 0; i < Math.min(n, 10); i++) seq.push(a * Math.pow(r, i));

            setResult({
                type: 'Geometric Progression (GP)',
                nth: an,
                sum: sn,
                seq: seq,
                sInf: sInf,
                n: n,
                params: { a, r }
            });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Sequence & Series Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Analyze Arithmetic (AP) and Geometric (GP) Progressions</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label>Sequence Type</Label>
                        <Tabs value={type} onValueChange={setType} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="AP">Arithmetic (AP)</TabsTrigger>
                                <TabsTrigger value="GP">Geometric (GP)</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>First Term (a)</Label>
                                <Input
                                    type="number"
                                    value={firstTerm}
                                    onChange={(e) => setFirstTerm(e.target.value)}
                                />
                            </div>

                            {type === 'AP' ? (
                                <div className="space-y-2">
                                    <Label>Common Difference (d)</Label>
                                    <Input
                                        type="number"
                                        value={commonDiff}
                                        onChange={(e) => setCommonDiff(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label>Common Ratio (r)</Label>
                                    <Input
                                        type="number"
                                        value={commonRatio}
                                        onChange={(e) => setCommonRatio(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Term Position (n)</Label>
                                <Input
                                    type="number"
                                    value={nTerm}
                                    onChange={(e) => setNTerm(e.target.value)}
                                    placeholder="Find nth term and Sum to n"
                                />
                            </div>
                        </div>

                        <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                            Calculate
                        </Button>
                    </div>

                    <div className="bg-secondary/10 rounded-xl p-6 border border-primary/5 min-h-[300px] flex items-center justify-center">
                        {!result ? (
                            <div className="text-muted-foreground text-center">
                                Enter parameters to calculate<br />nth term, Sum, and Sequence preview.
                            </div>
                        ) : result.error ? (
                            <div className="text-destructive font-bold">{result.error}</div>
                        ) : (
                            <div className="w-full space-y-6 animate-in fade-in zoom-in-95">
                                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center border-b border-primary/10 pb-2">
                                    {result.type}
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-card rounded-lg border border-primary/10">
                                        <div className="text-xs text-muted-foreground mb-1">{result.n}th Term (a<sub>{result.n}</sub>)</div>
                                        <div className="text-2xl font-bold text-primary truncate" title={result.nth.toString()}>
                                            {result.nth.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-card rounded-lg border border-primary/10">
                                        <div className="text-xs text-muted-foreground mb-1">Sum to {result.n} (S<sub>{result.n}</sub>)</div>
                                        <div className="text-2xl font-bold text-primary truncate" title={result.sum.toString()}>
                                            {result.sum.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                                        </div>
                                    </div>
                                </div>

                                {result.sInf !== null && (
                                    <div className="p-4 bg-card rounded-lg border border-primary/10 text-center">
                                        <div className="text-xs text-muted-foreground mb-1">Sum to Infinity (S<sub>∞</sub>)</div>
                                        <div className="text-xl font-bold text-green-500">
                                            {result.sInf.toFixed(6)}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="text-xs font-bold text-muted-foreground uppercase">Parameter Preview</div>
                                    <div className="text-sm font-mono p-3 bg-muted rounded break-all">
                                        {result.seq.map((n: number) => n.toLocaleString(undefined, { maximumFractionDigits: 4 })).join(', ')}
                                        {result.n > 10 && ' ...'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
