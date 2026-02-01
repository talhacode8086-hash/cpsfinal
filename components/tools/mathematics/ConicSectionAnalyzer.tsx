"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConicSectionAnalyzer() {
    const [type, setType] = useState('parabola');

    // Parabola state (y = a(x-h)^2 + k)
    const [pA, setPA] = useState('1');
    const [pH, setPH] = useState('0');
    const [pK, setPK] = useState('0');

    // Ellipse state ((x-h)^2/a^2 + (y-k)^2/b^2 = 1)
    const [eA, setEA] = useState('5');
    const [eB, setEB] = useState('3');
    const [eH, setEH] = useState('0');
    const [eK, setEK] = useState('0');

    const [result, setResult] = useState<any>(null);

    const analyzeParabola = () => {
        const a = parseFloat(pA);
        if (isNaN(a) || a === 0) { setResult({ error: "Coefficient 'a' cannot be zero." }); return; }
        const h = parseFloat(pH) || 0;
        const k = parseFloat(pK) || 0;

        // y = a(x-h)^2 + k
        // Vertex: (h, k)
        // Focus: (h, k + 1/4a)
        // Directrix: y = k - 1/4a
        // LR: |1/a|

        const p = 1 / (4 * a);
        const focusY = k + p;
        const directrixY = k - p;

        setResult({
            type: 'Vertical Parabola',
            eq: `y = ${a}(x - ${h})² + ${k}`,
            vertex: `(${h}, ${k})`,
            focus: `(${h}, ${focusY})`,
            directrix: `y = ${directrixY}`,
            axis: `x = ${h}`,
            lr: Math.abs(1 / a).toFixed(4)
        });
    };

    const analyzeEllipse = () => {
        const a = parseFloat(eA);
        const b = parseFloat(eB);
        const h = parseFloat(eH) || 0;
        const k = parseFloat(eK) || 0;

        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
            setResult({ error: "Semi-axes a and b must be positive." });
            return;
        }

        // Horizontal major axis if a > b, else vertical
        const isHorizontal = a > b;
        const c = Math.sqrt(Math.abs(a * a - b * b));
        const e = c / Math.max(a, b);

        let foci, vertices;

        if (isHorizontal) {
            foci = `(${(h - c).toFixed(2)}, ${k}), (${(h + c).toFixed(2)}, ${k})`;
            vertices = `(${h - a}, ${k}), (${h + a}, ${k})`;
        } else {
            foci = `(${h}, ${(k - c).toFixed(2)}), (${h}, ${(k + c).toFixed(2)})`;
            vertices = `(${h}, ${k - b}), (${h}, ${k + b})`;
        }

        setResult({
            type: isHorizontal ? 'Horizontal Ellipse' : 'Vertical Ellipse',
            eq: `(x - ${h})²/${a * a} + (y - ${k})²/${b * b} = 1`,
            center: `(${h}, ${k})`,
            vertices: vertices,
            foci: foci,
            eccentricity: e.toFixed(4),
            area: (Math.PI * a * b).toFixed(4)
        });
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Conic Section Analyzer</CardTitle>
                <p className="text-muted-foreground mt-2">Find Vertices, Foci, and Properties of Conics</p>
            </CardHeader>
            <CardContent className="p-8">
                <Tabs value={type} onValueChange={setType} className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-[400px] grid-cols-2">
                            <TabsTrigger value="parabola">Parabola</TabsTrigger>
                            <TabsTrigger value="ellipse">Ellipse</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="parabola" className="space-y-6">
                        <div className="text-center bg-muted/20 p-4 rounded-lg font-mono mb-4 text-sm">
                            Vertical Form: y = a(x - h)² + k
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Stretch (a)</Label>
                                <Input value={pA} onChange={(e) => setPA(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>H (x-shift)</Label>
                                <Input value={pH} onChange={(e) => setPH(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>K (y-shift)</Label>
                                <Input value={pK} onChange={(e) => setPK(e.target.value)} />
                            </div>
                        </div>
                        <Button onClick={analyzeParabola} className="w-full">Analyze Parabola</Button>
                    </TabsContent>

                    <TabsContent value="ellipse" className="space-y-6">
                        <div className="text-center bg-muted/20 p-4 rounded-lg font-mono mb-4 text-sm">
                            Standard Form: (x - h)²/a² + (y - k)²/b² = 1
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Semi-axis (a)</Label>
                                <Input value={eA} onChange={(e) => setEA(e.target.value)} placeholder="x-radius" />
                            </div>
                            <div className="space-y-2">
                                <Label>Semi-axis (b)</Label>
                                <Input value={eB} onChange={(e) => setEB(e.target.value)} placeholder="y-radius" />
                            </div>
                            <div className="space-y-2">
                                <Label>Center (h)</Label>
                                <Input value={eH} onChange={(e) => setEH(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Center (k)</Label>
                                <Input value={eK} onChange={(e) => setEK(e.target.value)} />
                            </div>
                        </div>
                        <Button onClick={analyzeEllipse} className="w-full">Analyze Ellipse</Button>
                    </TabsContent>

                    {result && (
                        <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-5 p-6 bg-secondary/10 rounded-xl border border-primary/10">
                            {result.error ? (
                                <div className="text-destructive font-bold text-center">{result.error}</div>
                            ) : (
                                <>
                                    <div className="text-lg font-bold text-center text-primary mb-4">{result.type}</div>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                                        <div className="flex justify-between border-b border-primary/10 pb-1">
                                            <span className="text-muted-foreground">Equation</span>
                                            <span className="font-mono">{result.eq}</span>
                                        </div>
                                        {result.vertex && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Vertex</span>
                                                <span className="font-mono font-bold">{result.vertex}</span>
                                            </div>
                                        )}
                                        {result.center && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Center</span>
                                                <span className="font-mono font-bold">{result.center}</span>
                                            </div>
                                        )}
                                        {result.focus && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Focus</span>
                                                <span className="font-mono">{result.focus}</span>
                                            </div>
                                        )}
                                        {result.foci && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Foci</span>
                                                <span className="font-mono">{result.foci}</span>
                                            </div>
                                        )}
                                        {result.directrix && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Directrix</span>
                                                <span className="font-mono">{result.directrix}</span>
                                            </div>
                                        )}
                                        {result.eccentricity && (
                                            <div className="flex justify-between border-b border-primary/10 pb-1">
                                                <span className="text-muted-foreground">Eccentricity (e)</span>
                                                <span className="font-mono">{result.eccentricity}</span>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
}
