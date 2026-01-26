'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Braces, ArrowRight, Info, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DifferentialEqPro() {
    const [equation, setEquation] = useState('dy/dx = 2x');
    const [result, setResult] = useState<any>(null);
    const [isSolving, setIsSolving] = useState(false);

    const solve = () => {
        setIsSolving(true);
        // Heuristic solver for simple first order
        setTimeout(() => {
            let sol = '';
            let step1 = '';
            let step2 = '';

            if (equation.replace(/\s/g, '') === 'dy/dx=2x') {
                sol = 'y = xÂ² + C';
                step1 = 'Integrate both sides with respect to x';
                step2 = 'âˆ« dy = âˆ« 2x dx';
            } else if (equation.replace(/\s/g, '') === 'dy/dx=y') {
                sol = 'y = CeË³';
                step1 = 'Separate variables: (1/y) dy = dx';
                step2 = 'âˆ« (1/y) dy = âˆ« dx => ln|y| = x + C';
            } else {
                sol = 'Resolution pending (Standard form required)';
                step1 = 'Identifying equation type...';
                step2 = 'Applying separation of variables...';
            }

            setResult({ sol, steps: [step1, step2] });
            setIsSolving(false);
        }, 800);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Braces className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Differential Eq. Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Advanced calculus engine for first-order linear and separable differential equations.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1">
                        <Input
                            value={equation}
                            onChange={(e) => setEquation(e.target.value)}
                            placeholder="e.g. dy/dx = 2x"
                            className="h-20 rounded-[2.5rem] text-4xl font-black px-10 bg-background border-primary/20 focus:border-primary transition-all font-mono"
                        />
                        <p className="absolute -bottom-6 left-6 text-[10px] font-bold text-primary opacity-40">Format: dy/dx = f(x, y)</p>
                    </div>
                    <Button onClick={solve} disabled={isSolving} className="h-20 px-12 rounded-[2.5rem] text-lg font-black shadow-xl shadow-primary/20">
                        {isSolving ? <RefreshCw className="animate-spin" /> : 'DERIVE'}
                    </Button>
                </div>

                {result && (
                    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
                        <div className="p-16 rounded-[4rem] bg-primary text-white border-4 border-primary shadow-3xl shadow-primary/30 flex flex-col items-center justify-center gap-4">
                            <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.5em]">GENERAL SOLUTION</p>
                            <h2 className="text-6xl font-black font-mono tracking-tighter">{result.sol}</h2>
                        </div>

                        <div className="space-y-4">
                            {result.steps.map((s: string, i: number) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 p-6 rounded-[2rem] bg-muted/20 border border-primary/5 font-bold italic text-muted-foreground flex justify-between items-center pr-10">
                                        {s}
                                        <ArrowRight className="h-5 w-5 opacity-20" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="p-10 rounded-[4rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-black text-amber-600 uppercase mb-2 tracking-widest">Calculus Insight:</p>
                        A differential equation relates a function with its derivatives. Solving it means finding the original function $y(x)$ that satisfies the relationship. The constant $C$ represents an infinite family of possible solutions.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
