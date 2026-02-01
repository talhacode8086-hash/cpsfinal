"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AreaUnderCurve() {
    const [funcStr, setFuncStr] = useState('x^2');
    const [lowerBound, setLowerBound] = useState('0');
    const [upperBound, setUpperBound] = useState('1');
    const [intervals, setIntervals] = useState('100');
    const [result, setResult] = useState<any>(null);

    const calculateArea = () => {
        try {
            // Safe parser (Shared logic)
            let jsStr = funcStr
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/pi/g, 'Math.PI')
                .replace(/exp/g, 'Math.exp');

            const f = new Function('x', `try { return ${jsStr}; } catch(e) { return NaN; }`);

            const a = parseFloat(lowerBound);
            const b = parseFloat(upperBound);
            const n = parseInt(intervals);

            if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0) {
                setResult({ error: "Invalid bounds or intervals." });
                return;
            }

            // Simpson's Rule (1/3)
            // n needs to be even
            const steps = n % 2 === 0 ? n : n + 1;
            const h = (b - a) / steps;

            let sum = f(a) + f(b);

            for (let i = 1; i < steps; i++) {
                const x = a + i * h;
                const y = f(x);
                if (isNaN(y)) {
                    setResult({ error: "Function undefined within interval." });
                    return;
                }
                if (i % 2 === 0) sum += 2 * y;
                else sum += 4 * y;
            }

            const area = (h / 3) * sum;

            setResult({
                area: area.toFixed(6),
                exactParams: { a, b, n: steps }
            });

        } catch (e) {
            setResult({ error: "Expression error." });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Area Under Curve</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate definite integrals numerically</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label>Function f(x)</Label>
                        <Input
                            value={funcStr}
                            onChange={(e) => setFuncStr(e.target.value)}
                            placeholder="e.g. x^2, sin(x), exp(-x^2)"
                            className="font-mono text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Lower Limit (a)</Label>
                        <Input
                            value={lowerBound}
                            onChange={(e) => setLowerBound(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Upper Limit (b)</Label>
                        <Input
                            value={upperBound}
                            onChange={(e) => setUpperBound(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Intervals (Accuracy)</Label>
                        <Input
                            type="number"
                            value={intervals}
                            onChange={(e) => setIntervals(e.target.value)}
                            placeholder="100"
                        />
                        <p className="text-xs text-muted-foreground">Higher is more accurate but slower.</p>
                    </div>
                </div>

                <Button onClick={calculateArea} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate Area
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {result.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {result.error}
                            </div>
                        ) : (
                            <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Definite Integral Result</div>
                                <div className="text-4xl font-mono font-bold text-primary">{result.area}</div>
                                <p className="text-xs text-muted-foreground mt-4">
                                    Computed using Simpson's Rule with {result.exactParams.n} sub-intervals.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
