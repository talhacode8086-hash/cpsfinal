"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SurfaceAreaRevolution() {
    const [funcStr, setFuncStr] = useState('x^3');
    const [lowerBound, setLowerBound] = useState('0');
    const [upperBound, setUpperBound] = useState('1');
    const [axis, setAxis] = useState('x'); // x or y
    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        try {
            let jsStr = funcStr
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/pi/g, 'Math.PI');

            const f = new Function('x', `try { return ${jsStr}; } catch(e) { return NaN; }`);
            const a = parseFloat(lowerBound);
            const b = parseFloat(upperBound);

            if (isNaN(a) || isNaN(b)) { setResult("Invalid bounds."); return; }

            const n = 1000;
            const h = (b - a) / n;
            const diffH = 1e-5;

            const df = (x: number) => (f(x + diffH) - f(x - diffH)) / (2 * diffH);

            const integrand = (x: number) => {
                const fx = f(x);
                const prime = df(x);
                const ds = Math.sqrt(1 + prime * prime);

                // S = 2*pi * radius * ds
                // About X-axis: radius = |y| = |f(x)|
                // About Y-axis: radius = |x| (assuming x integration)
                const radius = axis === 'x' ? Math.abs(fx) : Math.abs(x);

                return 2 * Math.PI * radius * ds;
            };

            let sum = integrand(a) + integrand(b);
            for (let i = 1; i < n; i++) {
                const x = a + i * h;
                const y = integrand(x);
                if (i % 2 === 0) sum += 2 * y;
                else sum += 4 * y;
            }

            const area = (h / 3) * sum;
            setResult(area.toFixed(6));

        } catch (e) {
            setResult("Error calculating.");
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Surface Area of Revolution</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate surface area of solid formed by rotation</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <Label>Function f(x)</Label>
                        <Input
                            value={funcStr}
                            onChange={(e) => setFuncStr(e.target.value)}
                            placeholder="e.g. x^3, sqrt(x)"
                            className="font-mono text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Axis of Revolution</Label>
                        <Select value={axis} onValueChange={setAxis}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="x">X-Axis (y = 0)</SelectItem>
                                <SelectItem value="y">Y-Axis (x = 0)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Start (a)</Label>
                                <Input value={lowerBound} onChange={(e) => setLowerBound(e.target.value)} />
                            </div>
                            <div>
                                <Label>End (b)</Label>
                                <Input value={upperBound} onChange={(e) => setUpperBound(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate Surface Area
                </Button>

                {result && (
                    <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center animate-in fade-in slide-in-from-bottom-5">
                        <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Surface Area</div>
                        <div className="text-4xl font-mono font-bold text-primary">{result}</div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
