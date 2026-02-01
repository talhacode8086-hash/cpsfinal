"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Triangle, ChevronRight, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as math from 'mathjs';

export default function TrigonometrySolver() {
    const [mode, setMode] = useState('triangle');
    const [inputA, setInputA] = useState('');
    const [inputB, setInputB] = useState('');
    const [inputAngle, setInputAngle] = useState('');
    const [result, setResult] = useState<any>(null);
    const [graphData, setGraphData] = useState<any[]>([]);

    const solve = () => {
        setResult(null);

        try {
            if (mode === 'triangle') {
                // Right Triangle Solver
                // Assume inputs are: Side A, Angle (or Side B), etc.
                // Simple case: Find Height given Base and Angle (Elevation)
                const base = parseFloat(inputA);
                const angle = parseFloat(inputAngle);

                if (!isNaN(base) && !isNaN(angle)) {
                    // Height = Base * tan(angle)
                    const rad = angle * (Math.PI / 180);
                    const height = base * Math.tan(rad);
                    const hyp = base / Math.cos(rad);

                    setResult({
                        type: 'heights',
                        steps: [
                            `Base = ${base}, Angle = ${angle}°`,
                            `Calculate Height (Opposite):`,
                            `tan(θ) = Opposite / Adjacent`,
                            `Opposite = Adjacent * tan(θ) = ${base} * tan(${angle}°)`,
                            `Height = ${height.toFixed(4)}`,
                            `Hypotenuse = ${base} / cos(${angle}°) = ${hyp.toFixed(4)}`
                        ],
                        final: `Height = ${height.toFixed(4)}`
                    });
                } else {
                    throw new Error("Please enter Base and Angle");
                }
            } else if (mode === 'equation') {
                // Solve equation like sin(x) = val
                const val = parseFloat(inputA);
                const func = inputB; // sin, cos, tan

                if (isNaN(val)) throw new Error("Enter a valid value");

                let resDeg, resRad;
                if (func === 'sin') {
                    if (val < -1 || val > 1) throw new Error("Sine value must be between -1 and 1");
                    resRad = Math.asin(val);
                } else if (func === 'cos') {
                    if (val < -1 || val > 1) throw new Error("Cosine value must be between -1 and 1");
                    resRad = Math.acos(val);
                } else if (func === 'tan') {
                    resRad = Math.atan(val);
                }

                resDeg = resRad! * (180 / Math.PI);

                setResult({
                    type: 'equation',
                    steps: [
                        `Solve: ${func}(x) = ${val}`,
                        `x = arc${func}(${val})`,
                        `x (radians) = ${resRad!.toFixed(4)}`,
                        `x (degrees) = ${resDeg.toFixed(4)}°`,
                        `General Solution: ${func === 'tan' ? `x = ${resDeg.toFixed(2)}° + 180°n` : `x = ${resDeg.toFixed(2)}° + 360°n`}`
                    ],
                    final: `x = ${resDeg.toFixed(2)}°`
                });
            }
        } catch (err: any) {
            setResult({ error: err.message });
        }
    };

    useEffect(() => {
        // Generate Graph Data
        const data = [];
        for (let i = -360; i <= 360; i += 5) {
            const rad = i * (Math.PI / 180);
            data.push({
                angle: i,
                sin: Math.sin(rad),
                cos: Math.cos(rad),
                tan: Math.tan(rad) // Tan will have asymptotes, might look weird
            });
        }
        setGraphData(data);
    }, []);

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Triangle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Trigonometry Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Solve Right Triangles, Equations, and Visualize Graphs.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center mb-6">
                    <Select value={mode} onValueChange={(m) => { setMode(m); setResult(null); setInputA(''); setInputB(''); setInputAngle(''); }}>
                        <SelectTrigger className="w-[280px] h-12 text-lg font-medium">
                            <SelectValue placeholder="Select Tool" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="triangle">Heights & Distances (Right Δ)</SelectItem>
                            <SelectItem value="equation">Trig Equations (sin x = a)</SelectItem>
                            <SelectItem value="graph">Unit Circle Graphs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {mode === 'graph' ? (
                    <div className="h-[400px] w-full p-4 bg-muted/10 rounded-3xl border border-primary/5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={graphData}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis dataKey="angle" label={{ value: 'Degrees', position: 'insideBottom', offset: -5 }} />
                                <YAxis domain={[-1.5, 1.5]} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))' }}
                                />
                                <Line type="monotone" dataKey="sin" stroke="#ef4444" strokeWidth={3} dot={false} name="sin(x)" />
                                <Line type="monotone" dataKey="cos" stroke="#3b82f6" strokeWidth={3} dot={false} name="cos(x)" />
                                {/* Tan omitted for clean graph */}
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full" /> sin(x)</div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full" /> cos(x)</div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {mode === 'triangle' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Base (Adjacent)</label>
                                    <Input value={inputA} onChange={(e) => setInputA(e.target.value)} className="h-14 text-lg" placeholder="e.g. 10 meters" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Angle (Elevation)</label>
                                    <Input value={inputAngle} onChange={(e) => setInputAngle(e.target.value)} className="h-14 text-lg" placeholder="degrees" />
                                </div>
                            </div>
                        )}

                        {mode === 'equation' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Function</label>
                                    <Select value={inputB} onValueChange={setInputB}>
                                        <SelectTrigger className="h-14">
                                            <SelectValue placeholder="Function" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sin">sin(x)</SelectItem>
                                            <SelectItem value="cos">cos(x)</SelectItem>
                                            <SelectItem value="tan">tan(x)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Value</label>
                                    <Input value={inputA} onChange={(e) => setInputA(e.target.value)} className="h-14 text-lg" placeholder="e.g. 0.5" />
                                </div>
                            </div>
                        )}

                        <Button onClick={solve} size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                            Solve <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                )}

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
                                    <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Solution</h3>
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
