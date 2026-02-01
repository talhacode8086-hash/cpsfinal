"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as math from 'mathjs';

export default function CalculusSolver() {
    const [mode, setMode] = useState('derivative');
    const [expression, setExpression] = useState('');
    const [variable, setVariable] = useState('x');
    const [limitPoint, setLimitPoint] = useState('0');
    const [lowerBound, setLowerBound] = useState('0');
    const [upperBound, setUpperBound] = useState('1');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const solve = () => {
        setError('');
        setResult(null);

        try {
            if (!expression) throw new Error("Please enter a function.");

            if (mode === 'derivative') {
                const deriv = math.derivative(expression, variable);
                setResult({
                    type: 'derivative',
                    steps: [
                        `Function: f(${variable}) = ${expression}`,
                        `Differentiate with respect to ${variable}`,
                        `Result: ${deriv.toString()}`
                    ],
                    final: deriv.toString()
                });
            } else if (mode === 'integral_definite') {
                // Numeric Integration (Simpson's Rule or Trapezoidal)
                const f = math.compile(expression);
                const a = parseFloat(lowerBound);
                const b = parseFloat(upperBound);
                const n = 1000; // Intervals
                const h = (b - a) / n;

                if (isNaN(a) || isNaN(b)) throw new Error("Invalid bounds");

                let sum = f.evaluate({ [variable]: a }) + f.evaluate({ [variable]: b });
                for (let i = 1; i < n; i++) {
                    const x = a + i * h;
                    sum += 2 * f.evaluate({ [variable]: x });
                }
                const integral = (h / 2) * sum;

                setResult({
                    type: 'integral',
                    steps: [
                        `Function: f(${variable}) = ${expression}`,
                        `Interval: [${a}, ${b}]`,
                        `Method: Trapezoidal Rule (n=${n})`,
                        `Result: ≈ ${integral.toFixed(6)}`
                    ],
                    final: `≈ ${integral.toFixed(6)}`
                });

            } else if (mode === 'limit') {
                // Numeric Limit
                const f = math.compile(expression);
                const val = parseFloat(limitPoint);
                if (isNaN(val)) throw new Error("Invalid limit point");

                const h = 0.000001;
                const left = f.evaluate({ [variable]: val - h });
                const right = f.evaluate({ [variable]: val + h });
                const approx = (left + right) / 2;

                setResult({
                    type: 'limit',
                    steps: [
                        `Function: f(${variable}) = ${expression}`,
                        `Approaching: ${val}`,
                        `Evaluated at ${val} - ${h}: ${left}`,
                        `Evaluated at ${val} + ${h}: ${right}`,
                        `Average: ${approx}`
                    ],
                    final: `≈ ${approx.toFixed(6)}`
                });
            }
        } catch (err: any) {
            setError(err.message || "An error occurred. Please check your syntax.");
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Sigma className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Calculus Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Derivatives, Limits, and Integrals made easy.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center mb-6">
                    <Select value={mode} onValueChange={(m) => { setMode(m); setResult(null); setError(''); }}>
                        <SelectTrigger className="w-[280px] h-12 text-lg font-medium">
                            <SelectValue placeholder="Select Operation" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="derivative">Derivative (Differentiation)</SelectItem>
                            <SelectItem value="integral_definite">Definite Integral (Numeric)</SelectItem>
                            <SelectItem value="limit">Limit (Numeric)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Function f({variable})</label>
                        <div className="flex gap-4">
                            <Input
                                placeholder="e.g., x^2 + sin(x)"
                                value={expression}
                                onChange={(e) => setExpression(e.target.value)}
                                className="h-14 text-lg font-mono"
                            />
                            <div className="w-24">
                                <Select value={variable} onValueChange={setVariable}>
                                    <SelectTrigger className="h-14">
                                        <SelectValue placeholder="Var" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="x">x</SelectItem>
                                        <SelectItem value="t">t</SelectItem>
                                        <SelectItem value="y">y</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {mode === 'integral_definite' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Lower Bound (a)</label>
                                <Input value={lowerBound} onChange={(e) => setLowerBound(e.target.value)} className="h-14 text-lg" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Upper Bound (b)</label>
                                <Input value={upperBound} onChange={(e) => setUpperBound(e.target.value)} className="h-14 text-lg" />
                            </div>
                        </div>
                    )}

                    {mode === 'limit' && (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Approaching Value</label>
                            <Input value={limitPoint} onChange={(e) => setLimitPoint(e.target.value)} className="h-14 text-lg" />
                        </div>
                    )}

                    <Button onClick={solve} size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                        Calculate <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="p-6 rounded-3xl bg-secondary/20 border border-primary/10">
                            <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Result</h3>
                            <div className="text-3xl font-bold font-mono text-foreground break-all">{result.final}</div>
                        </div>

                        {result.steps && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Details</h3>
                                <div className="space-y-3">
                                    {result.steps.map((step: string, i: number) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="text-lg font-medium">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
