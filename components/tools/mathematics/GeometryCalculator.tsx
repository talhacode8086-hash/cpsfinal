"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Axis3d, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GeometryCalculator() {
    const [mode, setMode] = useState('distance');
    const [x1, setX1] = useState('');
    const [y1, setY1] = useState('');
    const [x2, setX2] = useState('');
    const [y2, setY2] = useState('');
    const [radius, setRadius] = useState('');
    const [result, setResult] = useState<any>(null);

    const solve = () => {
        setResult(null);
        try {
            const vx1 = parseFloat(x1);
            const vy1 = parseFloat(y1);

            if (mode === 'distance') {
                const vx2 = parseFloat(x2);
                const vy2 = parseFloat(y2);
                if (isNaN(vx1) || isNaN(vy1) || isNaN(vx2) || isNaN(vy2)) throw new Error("Please enter valid coordinates");

                const dist = Math.sqrt(Math.pow(vx2 - vx1, 2) + Math.pow(vy2 - vy1, 2));
                const midX = (vx1 + vx2) / 2;
                const midY = (vy1 + vy2) / 2;

                setResult({
                    final: `Distance = ${dist.toFixed(4)}`,
                    steps: [
                        `Point A: (${vx1}, ${vy1}), Point B: (${vx2}, ${vy2})`,
                        `Distance Formula: √((x2-x1)² + (y2-y1)²)`,
                        `d = √((${vx2}-${vx1})² + (${vy2}-${vy1})²) = √(${Math.pow(vx2 - vx1, 2)} + ${Math.pow(vy2 - vy1, 2)})`,
                        `d = √${Math.pow(vx2 - vx1, 2) + Math.pow(vy2 - vy1, 2)} = ${dist.toFixed(4)}`,
                        `Midpoint M = ((x1+x2)/2, (y1+y2)/2)`,
                        `M = (${midX}, ${midY})`
                    ]
                });
            } else if (mode === 'line') {
                const vx2 = parseFloat(x2);
                const vy2 = parseFloat(y2);
                if (isNaN(vx1) || isNaN(vy1) || isNaN(vx2) || isNaN(vy2)) throw new Error("Please enter valid coordinates");

                const slope = (vy2 - vy1) / (vx2 - vx1);
                // y - y1 = m(x - x1) => y = mx - mx1 + y1
                const intercept = -slope * vx1 + vy1;

                setResult({
                    final: `y = ${slope.toFixed(2)}x ${intercept >= 0 ? '+' : ''} ${intercept.toFixed(2)}`,
                    steps: [
                        `Calculate Slope (m) = (y2-y1) / (x2-x1)`,
                        `m = (${vy2}-${vy1}) / (${vx2}-${vx1}) = ${slope.toFixed(4)}`,
                        `Find Equation using Point-Slope Form: y - y1 = m(x - x1)`,
                        `y - ${vy1} = ${slope.toFixed(4)}(x - ${vx1})`,
                        `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`
                    ]
                });
            } else if (mode === 'circle') {
                // Center (h, k) is (x1, y1)
                const r = parseFloat(radius);
                if (isNaN(vx1) || isNaN(vy1) || isNaN(r)) throw new Error("Please enter valid center and radius");

                setResult({
                    final: `(x - ${vx1})² + (y - ${vy1})² = ${r * r}`,
                    steps: [
                        `Center (h, k) = (${vx1}, ${vy1})`,
                        `Radius (r) = ${r}`,
                        `Standard Form: (x - h)² + (y - k)² = r²`,
                        `(x - ${vx1})² + (y - ${vy1})² = ${r * r}`
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
                    <Axis3d className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Coordinate Geometry</CardTitle>
                <p className="text-muted-foreground mt-2">Analytical Geometry for Lines, Circles, and Points.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center mb-6">
                    <Select value={mode} onValueChange={(m) => { setMode(m); setResult(null); setX1(''); setY1(''); setX2(''); setY2(''); setRadius(''); }}>
                        <SelectTrigger className="w-[280px] h-12 text-lg font-medium">
                            <SelectValue placeholder="Select Tool" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="distance">Distance & Midpoint</SelectItem>
                            <SelectItem value="line">Straight Line Equation</SelectItem>
                            <SelectItem value="circle">Circle Equation</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-6 bg-secondary/10 rounded-2xl border border-primary/5">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-2">
                            {mode === 'circle' ? "Center Point" : "Point A (x1, y1)"}
                        </h4>
                        <div className="flex gap-4">
                            <Input placeholder="x1" value={x1} onChange={(e) => setX1(e.target.value)} className="h-14 font-mono" />
                            <Input placeholder="y1" value={y1} onChange={(e) => setY1(e.target.value)} className="h-14 font-mono" />
                        </div>
                    </div>

                    {mode !== 'circle' ? (
                        <div className="space-y-4 p-6 bg-secondary/10 rounded-2xl border border-primary/5">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-2">Point B (x2, y2)</h4>
                            <div className="flex gap-4">
                                <Input placeholder="x2" value={x2} onChange={(e) => setX2(e.target.value)} className="h-14 font-mono" />
                                <Input placeholder="y2" value={y2} onChange={(e) => setY2(e.target.value)} className="h-14 font-mono" />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 p-6 bg-secondary/10 rounded-2xl border border-primary/5">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-2">Radius</h4>
                            <Input placeholder="r" value={radius} onChange={(e) => setRadius(e.target.value)} className="h-14 font-mono" />
                        </div>
                    )}
                </div>

                <Button onClick={solve} size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                    Calculate <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        {result.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                        ) : (
                            <>
                                <div className="p-6 rounded-3xl bg-secondary/20 border border-primary/10">
                                    <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Result</h3>
                                    <div className="text-3xl font-bold font-mono text-foreground break-all">{result.final}</div>
                                </div>

                                {result.steps && (
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Step-by-Step</h3>
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
                            </>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
