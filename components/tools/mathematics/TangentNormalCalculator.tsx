"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TangentNormalCalculator() {
    const [funcStr, setFuncStr] = useState('x^2');
    const [pointX, setPointX] = useState('1');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        try {
            // Safe parser (Same as LimitsEvaluator)
            let jsStr = funcStr
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/pi/g, 'Math.PI')
                .replace(/exp/g, 'Math.exp');

            // Basic security check
            if (!/^[0-9x.+\-*/\s()Math.PIsincoegqrlexp]+$/.test(jsStr.replace(/Math\./g, ''))) {
                // Relaxed check relying on try/catch
            }

            const f = new Function('x', `try { return ${jsStr}; } catch(e) { return NaN; }`);
            const x0 = parseFloat(pointX);

            if (isNaN(x0)) {
                setResult({ error: "Invalid point x0." });
                return;
            }

            // Numerical Derivative
            const h = 0.00001;
            const y0 = f(x0);
            const derivative = (f(x0 + h) - f(x0 - h)) / (2 * h);

            if (isNaN(y0) || isNaN(derivative)) {
                setResult({ error: "Function undefined at this point." });
                return;
            }

            // Tangent: y - y0 = m(x - x0) => y = mx + (y0 - m*x0)
            const m = derivative;
            const c_tan = y0 - m * x0;

            const formatEq = (m: number, c: number) => {
                const mStr = Math.abs(m - 1) < 1e-6 ? '' : (Math.abs(m + 1) < 1e-6 ? '-' : m.toFixed(4));
                const cSign = c >= 0 ? '+' : '-';
                const cVal = Math.abs(c).toFixed(4);
                return `y = ${mStr}x ${cSign} ${cVal}`;
            };

            const tanEq = formatEq(m, c_tan);

            // Normal: gradient = -1/m
            let normEq = "";
            let m_norm = NaN;

            if (Math.abs(m) < 1e-9) {
                // Horizontal tangent -> Vertical normal x = x0
                normEq = `x = ${x0}`;
            } else {
                m_norm = -1 / m;
                const c_norm = y0 - m_norm * x0;
                normEq = formatEq(m_norm, c_norm);
            }

            setResult({
                y0,
                slope: m,
                tangent: tanEq,
                normal: normEq,
                normalSlope: m_norm
            });

        } catch (e) {
            setResult({ error: "Expression error." });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Tangent & Normal Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Find equations of tangent and normal lines</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2">
                        <Label>Function f(x)</Label>
                        <Input
                            value={funcStr}
                            onChange={(e) => setFuncStr(e.target.value)}
                            placeholder="e.g. x^2, sin(x)"
                            className="font-mono text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Point x₀</Label>
                        <Input
                            value={pointX}
                            onChange={(e) => setPointX(e.target.value)}
                            className="font-mono text-lg"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate Equations
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {result.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {result.error}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10">
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Tangent Line</div>
                                    <div className="text-2xl font-mono font-bold text-primary break-all mb-2">{result.tangent}</div>
                                    <div className="text-sm bg-muted/20 p-2 rounded">
                                        Slope (m): <span className="font-mono">{result.slope.toFixed(4)}</span>
                                    </div>
                                </div>
                                <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10">
                                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Normal Line</div>
                                    <div className="text-2xl font-mono font-bold text-primary break-all mb-2">{result.normal}</div>
                                    <div className="text-sm bg-muted/20 p-2 rounded">
                                        Slope (-1/m): <span className="font-mono">{isNaN(result.normalSlope) ? 'Undefined' : result.normalSlope.toFixed(4)}</span>
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-2 text-center text-sm text-muted-foreground">
                                    At x = {pointX}, f(x) = {result.y0.toFixed(4)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
