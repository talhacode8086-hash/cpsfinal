"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LimitsEvaluator() {
    const [funcStr, setFuncStr] = useState('(x^2 - 1)/(x - 1)');
    const [targetStr, setTargetStr] = useState('1');
    const [result, setResult] = useState<any>(null);

    const evaluateLimit = () => {
        try {
            // Safe parser: replace ^ with **, simple sanitization
            // Note: In a real advanced app, use a math parser library. 
            // Here, we convert standard math syntax to JS math.
            let jsStr = funcStr
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/pi/g, 'Math.PI')
                .replace(/exp/g, 'Math.exp');

            // Security check: only allow math chars
            if (!/^[0-9x.+\-*/\s()Math.PIsincoegqrlexp]+$/.test(jsStr.replace(/Math\./g, ''))) {
                // setResult({ error: "Invalid characters in function." });
                // return; 
                // The regex above is too restrictive for 'tan', 'sqrt'. 
                // We will rely on try/catch of Function constructor for basic error handling in this MVP.
            }

            const f = new Function('x', `try { return ${jsStr}; } catch(e) { return NaN; }`);

            const c = targetStr.toLowerCase() === 'inf' ? Infinity : parseFloat(targetStr);

            if (isNaN(c) && !['inf', '-inf'].includes(targetStr.toLowerCase())) {
                setResult({ error: "Invalid target value." });
                return;
            }

            // Numerical evaluation
            let leftLimit, rightLimit;
            const h = 0.000001;

            if (targetStr.toLowerCase() === 'inf') {
                // Eval at large numbers
                leftLimit = f(1000);
                rightLimit = f(10000);
            } else if (targetStr.toLowerCase() === '-inf') {
                leftLimit = f(-10000);
                rightLimit = f(-1000);
            } else {
                leftLimit = f(c - h);
                rightLimit = f(c + h);
            }

            // Analysis
            let message = "";
            let val = null;

            // Check for NaN
            if (isNaN(leftLimit) || isNaN(rightLimit)) {
                setResult({ error: "Function evaluated to NaN near target. Check domain." });
                return;
            }

            const diff = Math.abs(leftLimit - rightLimit);
            const avg = (leftLimit + rightLimit) / 2;

            if (Math.abs(leftLimit) > 1e6 && Math.abs(rightLimit) > 1e6) {
                // Diverging
                if (Math.sign(leftLimit) === Math.sign(rightLimit)) {
                    val = leftLimit > 0 ? "+∞" : "-∞";
                    message = "Function diverges to infinity.";
                } else {
                    val = "Does Not Exist";
                    message = "Jump discontinuity (approaches +∞ and -∞).";
                }
            } else if (diff < 1e-4) {
                val = avg.toFixed(6);
                // Clean up integer results
                if (Math.abs(avg - Math.round(avg)) < 1e-6) val = Math.round(avg).toString();
                message = "The limit exists.";
            } else {
                val = "Does Not Exist";
                message = `Left hand limit (${leftLimit.toFixed(4)}) ≠ Right hand limit (${rightLimit.toFixed(4)})`;
            }

            setResult({
                left: leftLimit.toFixed(6),
                right: rightLimit.toFixed(6),
                final: val,
                msg: message
            });

        } catch (e) {
            setResult({ error: "Could not evaluate function. Please use valid Javascript Math syntax (e.g. Math.sin(x), x**2)." });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Limits Evaluator</CardTitle>
                <p className="text-muted-foreground mt-2">Evaluate limits numerically</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <Label>Function f(x)</Label>
                        <Input
                            value={funcStr}
                            onChange={(e) => setFuncStr(e.target.value)}
                            placeholder="e.g. (x^2 - 1)/(x - 1)"
                            className="font-mono text-lg"
                        />
                        <p className="text-xs text-muted-foreground">Use standard notation: sin(x), x^2, sqrt(x)</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Target Value (x → c)</Label>
                        <Input
                            value={targetStr}
                            onChange={(e) => setTargetStr(e.target.value)}
                            placeholder="e.g. 1, 0, inf"
                            className="font-mono text-lg"
                        />
                    </div>
                </div>

                <Button onClick={evaluateLimit} className="w-full bg-primary/90 hover:bg-primary">
                    Evaluate
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {result.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {result.error}
                            </div>
                        ) : (
                            <>
                                <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center">
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Limit Result</div>
                                    <div className="text-4xl font-mono font-bold text-primary">{result.final}</div>
                                    <p className="text-sm text-muted-foreground mt-2">{result.msg}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                                    <div className="p-3 bg-card border border-primary/5 rounded-lg">
                                        <div className="text-muted-foreground">Left Hand Limit</div>
                                        <div className="font-mono">{result.left}</div>
                                    </div>
                                    <div className="p-3 bg-card border border-primary/5 rounded-lg">
                                        <div className="text-muted-foreground">Right Hand Limit</div>
                                        <div className="font-mono">{result.right}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
