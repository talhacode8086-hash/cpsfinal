"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ImproperIntegralSolver() {
    const [funcStr, setFuncStr] = useState('1/x^2');
    const [lowerBound, setLowerBound] = useState('1');
    const [upperBound, setUpperBound] = useState('inf');
    const [result, setResult] = useState<any>(null);

    const integrate = (f: Function, a: number, b: number, n = 1000) => {
        const h = (b - a) / n;
        let sum = f(a) + f(b);
        for (let i = 1; i < n; i++) {
            const x = a + i * h;
            const y = f(x);
            if (i % 2 === 0) sum += 2 * y;
            else sum += 4 * y;
        }
        return (h / 3) * sum;
    };

    const calculate = () => {
        try {
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

            let aStr = lowerBound.toLowerCase();
            let bStr = upperBound.toLowerCase();

            let a = aStr === '-inf' ? -Infinity : (aStr === 'inf' ? Infinity : parseFloat(aStr));
            let b = bStr === 'inf' ? Infinity : (bStr === '-inf' ? -Infinity : parseFloat(bStr));

            if (isNaN(a) || isNaN(b)) {
                setResult({ error: "Invalid bounds." });
                return;
            }

            // Heuristic for Infinity
            const LARGE_NUM = 10000;
            let val;
            let note = "";

            if (b === Infinity) {
                // Type 1: Upper limit infinity
                // Check convergence: compare Int(a, M) and Int(a, M*10)
                const M1 = Math.max(a + 100, LARGE_NUM);
                const M2 = M1 * 2;

                const val1 = integrate(f, a, M1);
                const val2 = integrate(f, a, M2);

                if (Math.abs(val1 - val2) < 0.01) {
                    val = val2.toFixed(4);
                    note = "Converges";
                } else {
                    val = "Diverges";
                    note = "Integral does not approach a finite limit.";
                }
            } else if (a === -Infinity) {
                const M1 = Math.min(b - 100, -LARGE_NUM);
                const M2 = M1 * 2;
                const val1 = integrate(f, M1, b);
                const val2 = integrate(f, M2, b);

                if (Math.abs(val1 - val2) < 0.01) {
                    val = val2.toFixed(4);
                    note = "Converges";
                } else {
                    val = "Diverges";
                    note = "";
                }
            } else {
                // Type 2: Discontinuity?
                // Just use standard integration but handle NaN near endpoints
                // We'll evaluate at a+eps and b-eps
                const eps = 1e-5;
                val = integrate(f, a + eps, b - eps).toFixed(4);
                note = "Finite bounds evaluation";
            }

            setResult({ val, note });

        } catch (e) {
            setResult({ error: "Expression error." });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Improper Integrals</CardTitle>
                <p className="text-muted-foreground mt-2">Evaluate integrals with infinite limits</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label>Function f(x)</Label>
                        <Input
                            value={funcStr}
                            onChange={(e) => setFuncStr(e.target.value)}
                            placeholder="e.g. 1/x^2, exp(-x)"
                            className="font-mono text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Lower Limit (a)</Label>
                        <Input
                            value={lowerBound}
                            onChange={(e) => setLowerBound(e.target.value)}
                            placeholder="-inf, 0, 1"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Upper Limit (b)</Label>
                        <Input
                            value={upperBound}
                            onChange={(e) => setUpperBound(e.target.value)}
                            placeholder="inf, 100"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Check Convergence & Evaluate
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {result.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {result.error}
                            </div>
                        ) : (
                            <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Analysis Result</div>
                                <div className="text-4xl font-mono font-bold text-primary">{result.val}</div>
                                <p className="text-sm text-muted-foreground mt-2">{result.note}</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
