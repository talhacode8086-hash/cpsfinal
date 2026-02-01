"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RegressionAnalysisTool() {
    const [dataInput, setDataInput] = useState('1 2\n2 3\n3 5\n4 4\n5 6');
    const [type, setType] = useState('linear');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        try {
            // Parse data
            const points = dataInput.trim().split('\n').map(line => {
                const parts = line.trim().split(/[\s,]+/);
                if (parts.length < 2) return null;
                const x = parseFloat(parts[0]);
                const y = parseFloat(parts[1]);
                return isNaN(x) || isNaN(y) ? null : { x, y };
            }).filter(p => p !== null) as { x: number, y: number }[];

            if (points.length < 2) {
                setResult({ error: "Need at least 2 valid data points." });
                return;
            }

            let eq = "";
            let r2 = 0;
            let predFunc: (x: number) => number;

            // Stats helpers
            const n = points.length;
            const sumX = points.reduce((s, p) => s + p.x, 0);
            const sumY = points.reduce((s, p) => s + p.y, 0);

            if (type === 'linear') {
                const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
                const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
                const sumYY = points.reduce((s, p) => s + p.y * p.y, 0);

                const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
                const c = (sumY - m * sumX) / n;

                predFunc = (x) => m * x + c;
                eq = `y = ${m.toFixed(4)}x + ${c.toFixed(4)}`;

                // R2
                const ssTot = points.reduce((s, p) => s + Math.pow(p.y - sumY / n, 2), 0);
                const ssRes = points.reduce((s, p) => s + Math.pow(p.y - predFunc(p.x), 2), 0);
                r2 = 1 - (ssRes / ssTot);

            } else if (type === 'exponential') {
                // y = Ae^Bx -> ln y = ln A + Bx
                // Linear regression on (x, ln y)
                // Filter y > 0
                const validPoints = points.filter(p => p.y > 0);
                if (validPoints.length < 2) { setResult({ error: "For exponential, all y must be > 0." }); return; }

                const n2 = validPoints.length;
                const sumX2 = validPoints.reduce((s, p) => s + p.x, 0);
                const sumY2 = validPoints.reduce((s, p) => s + Math.log(p.y), 0);
                const sumXY2 = validPoints.reduce((s, p) => s + p.x * Math.log(p.y), 0);
                const sumXX2 = validPoints.reduce((s, p) => s + p.x * p.x, 0);

                const B = (n2 * sumXY2 - sumX2 * sumY2) / (n2 * sumXX2 - sumX2 * sumX2);
                const lnA = (sumY2 - B * sumX2) / n2;
                const A = Math.exp(lnA);

                predFunc = (x) => A * Math.exp(B * x);
                eq = `y = ${A.toFixed(4)}e^(${B.toFixed(4)}x)`;

                // R2 (on original scale)
                const meanY = points.reduce((s, p) => s + p.y, 0) / n;
                const ssTot = points.reduce((s, p) => s + Math.pow(p.y - meanY, 2), 0);
                const ssRes = points.reduce((s, p) => s + Math.pow(p.y - predFunc(p.x), 2), 0);
                r2 = 1 - (ssRes / ssTot);
            } else {
                setResult({ error: "Only Linear and Exponential supported currently." });
                return;
            }

            // Scatter Plot Data Generation for SVG
            const minX = Math.min(...points.map(p => p.x));
            const maxX = Math.max(...points.map(p => p.x));
            const minY = Math.min(...points.map(p => p.y));
            const maxY = Math.max(...points.map(p => p.y));

            // Plot dimensions
            const W = 300, H = 200;
            const pad = 20;

            const mapX = (x: number) => pad + ((x - minX) / (maxX - minX || 1)) * (W - 2 * pad);
            const mapY = (y: number) => H - pad - ((y - minY) / (maxY - minY || 1)) * (H - 2 * pad);

            const svgPoints = points.map(p => ({ cx: mapX(p.x), cy: mapY(p.y) }));

            // Curve points
            const curvePts = [];
            const steps = 20;
            for (let i = 0; i <= steps; i++) {
                const x = minX + (i / steps) * (maxX - minX);
                const y = predFunc(x);
                // Clamp y for display
                if (y >= minY && y <= maxY) {
                    curvePts.push(`${mapX(x)},${mapY(y)}`);
                }
            }
            const pathD = `M ${curvePts.join(' L ')}`;

            setResult({
                eq, r2: r2.toFixed(4), points: svgPoints, pathD, width: W, height: H
            });

        } catch (e) {
            setResult({ error: "Calculation Error" });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Regression Analysis</CardTitle>
                <p className="text-muted-foreground mt-2">Find best fit lines and curves</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Data Points (x y)</Label>
                            <Textarea
                                value={dataInput}
                                onChange={(e) => setDataInput(e.target.value)}
                                rows={8}
                                placeholder="1 2.5&#10;2 3.7"
                                className="font-mono"
                            />
                            <p className="text-xs text-muted-foreground">One pair per line, space separated.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Regression Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="linear">Linear (y = mx + c)</SelectItem>
                                    <SelectItem value="exponential">Exponential (y = Ae^Bx)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                            Analyze
                        </Button>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl border border-primary/10 min-h-[300px]">
                        {!result ? (
                            <div className="text-muted-foreground">Run analysis to see plot.</div>
                        ) : result.error ? (
                            <div className="text-destructive font-bold">{result.error}</div>
                        ) : (
                            <div className="w-full space-y-4">
                                <div className="text-center">
                                    <div className="text-lg font-mono font-bold text-primary">{result.eq}</div>
                                    <div className="text-sm text-muted-foreground">R² = {result.r2}</div>
                                </div>
                                <div className="flex justify-center border border-primary/10 bg-white rounded overflow-hidden">
                                    <svg width={result.width} height={result.height} viewBox={`0 0 ${result.width} ${result.height}`}>
                                        {result.points.map((p: any, i: number) => (
                                            <circle key={i} cx={p.cx} cy={p.cy} r="3" fill="#666" />
                                        ))}
                                        <path d={result.pathD} fill="none" stroke="blue" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
