"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as math from 'mathjs';

export default function StatsCalculator() {
    const [mode, setMode] = useState('descriptive');
    const [dataset, setDataset] = useState('');
    const [inputN, setInputN] = useState('');
    const [inputR, setInputR] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        setResult(null);
        try {
            if (mode === 'descriptive') {
                const data = dataset.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
                if (data.length === 0) throw new Error("Please enter valid numbers");

                const mean = math.mean(data);
                const median = math.median(data);
                const modeVal = math.mode(data);
                const std = math.std(data);
                const min = math.min(data);
                const max = math.max(data);

                setResult({
                    type: 'stats',
                    values: [
                        { label: 'Mean', val: (mean as number).toFixed(4) },
                        { label: 'Median', val: median },
                        { label: 'Mode', val: Array.isArray(modeVal) ? modeVal.join(', ') : modeVal },
                        { label: 'Std Dev', val: (std as unknown as number).toFixed(4) },
                        { label: 'Min', val: min },
                        { label: 'Max', val: max },
                        { label: 'Count', val: data.length }
                    ]
                });
            } else if (mode === 'counting') {
                const n = parseInt(inputN);
                const r = parseInt(inputR);
                if (isNaN(n) || isNaN(r) || n < 0 || r < 0) throw new Error("Please enter valid positive integers");
                if (r > n) throw new Error("R cannot be greater than N");

                const nCr = math.combinations(n, r);
                const nPr = math.permutations(n, r);

                setResult({
                    type: 'counting',
                    values: [
                        { label: 'Combinations (nCr)', val: nCr },
                        { label: 'Permutations (nPr)', val: nPr }
                    ],
                    steps: [
                        `n = ${n}, r = ${r}`,
                        `nCr = n! / (r! * (n-r)!) = ${nCr}`,
                        `nPr = n! / (n-r)! = ${nPr}`
                    ]
                });
            } else if (mode === 'probability') {
                // Simple Probability: P(A) = Event / Total
                const event = parseFloat(inputN); // overloading inputN for "Event count"
                const total = parseFloat(inputR); // overloading inputR for "Total outcomes"

                if (isNaN(event) || isNaN(total) || total === 0) throw new Error("Please enter valid numbers");
                if (event > total) throw new Error("Events cannot exceed Total outcomes");

                const prob = event / total;
                const percent = (prob * 100).toFixed(2) + '%';
                const odds = `${event}:${total - event}`;

                setResult({
                    type: 'prob',
                    values: [
                        { label: 'Probability', val: prob.toFixed(4) },
                        { label: 'Percentage', val: percent },
                        { label: 'Odds (For)', val: odds }
                    ]
                });
            }
        } catch (err: any) {
            setResult({ error: err.message });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Probability & Statistics</CardTitle>
                <p className="text-muted-foreground mt-2">Data Analysis, Counting, and Probability.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center mb-6">
                    <Select value={mode} onValueChange={(m) => { setMode(m); setResult(null); setDataset(''); setInputN(''); setInputR(''); }}>
                        <SelectTrigger className="w-[280px] h-12 text-lg font-medium">
                            <SelectValue placeholder="Select Tool" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="descriptive">Descriptive Stats (Mean, Median)</SelectItem>
                            <SelectItem value="counting">Permutations & Combinations</SelectItem>
                            <SelectItem value="probability">Simple Probability</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-6">
                    {mode === 'descriptive' ? (
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Dataset (comma or space separated)</label>
                            <textarea
                                value={dataset}
                                onChange={(e) => setDataset(e.target.value)}
                                placeholder="e.g. 10, 20, 30, 40, 50"
                                className="w-full h-32 rounded-2xl bg-muted/20 border-primary/10 p-4 font-mono text-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    {mode === 'counting' ? 'Total Items (n)' : 'Favorable Events (E)'}
                                </label>
                                <Input type="number" value={inputN} onChange={(e) => setInputN(e.target.value)} className="h-14 font-medium text-lg" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    {mode === 'counting' ? 'Selection (r)' : 'Total Outcomes (T)'}
                                </label>
                                <Input type="number" value={inputR} onChange={(e) => setInputR(e.target.value)} className="h-14 font-medium text-lg" />
                            </div>
                        </div>
                    )}

                    <Button onClick={calculate} size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                        Calculate <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        {result.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {result.values.map((item: any, i: number) => (
                                        <div key={i} className="p-6 rounded-2xl bg-secondary/10 border border-primary/5 flex flex-col items-center justify-center text-center">
                                            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{item.label}</div>
                                            <div className="text-2xl font-black">{item.val}</div>
                                        </div>
                                    ))}
                                </div>

                                {result.steps && (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Formula & Steps</h3>
                                        <div className="space-y-2">
                                            {result.steps.map((step: string, i: number) => (
                                                <div key={i} className="text-lg font-medium">{step}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
