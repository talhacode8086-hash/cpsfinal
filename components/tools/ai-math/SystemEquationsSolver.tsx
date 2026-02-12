'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layers } from 'lucide-react';

export default function SystemEquationsSolver() {
    const [a1, setA1] = useState('');
    const [b1, setB1] = useState('');
    const [c1, setC1] = useState('');
    const [a2, setA2] = useState('');
    const [b2, setB2] = useState('');
    const [c2, setC2] = useState('');
    const [result, setResult] = useState<any>(null);

    const solve = () => {
        const coeffs = [a1, b1, c1, a2, b2, c2].map(v => parseFloat(v));
        if (coeffs.some(isNaN)) return;

        const [a1v, b1v, c1v, a2v, b2v, c2v] = coeffs;

        // Using Cramer's rule
        const determinant = a1v * b2v - a2v * b1v;

        if (determinant === 0) {
            setResult({ error: 'No unique solution (lines are parallel or coincident)' });
            return;
        }

        const x = (c1v * b2v - c2v * b1v) / determinant;
        const y = (a1v * c2v - a2v * c1v) / determinant;

        setResult({
            x: x.toFixed(4),
            y: y.toFixed(4),
            determinant,
            equations: [
                `${a1v}x + ${b1v}y = ${c1v}`,
                `${a2v}x + ${b2v}y = ${c2v}`
            ]
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Layers className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">System of Equations Solver</h1>
                </div>
                <p className="text-muted-foreground">Solve 2x2 systems using Cramer's Rule</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Input placeholder="a₁" value={a1} onChange={(e) => setA1(e.target.value)} type="number" step="any" />
                        <span className="text-center">x +</span>
                        <Input placeholder="b₁" value={b1} onChange={(e) => setB1(e.target.value)} type="number" step="any" />
                        <div className="flex items-center gap-2">
                            <span>y =</span>
                            <Input placeholder="c₁" value={c1} onChange={(e) => setC1(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 items-center">
                        <Input placeholder="a₂" value={a2} onChange={(e) => setA2(e.target.value)} type="number" step="any" />
                        <span className="text-center">x +</span>
                        <Input placeholder="b₂" value={b2} onChange={(e) => setB2(e.target.value)} type="number" step="any" />
                        <div className="flex items-center gap-2">
                            <span>y =</span>
                            <Input placeholder="c₂" value={c2} onChange={(e) => setC2(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                </div>
                <Button onClick={solve} className="w-full h-12">Solve System</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    {result.error ? (
                        <p className="text-destructive text-lg">{result.error}</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="font-bold">x =</p>
                                    <p className="text-4xl font-mono font-bold">{result.x}</p>
                                </div>
                                <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                                    <p className="font-bold">y =</p>
                                    <p className="text-4xl font-mono font-bold">{result.y}</p>
                                </div>
                            </div>
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="font-bold mb-2">System:</p>
                                {result.equations.map((eq: string, i: number) => (
                                    <p key={i} className="font-mono">{eq}</p>
                                ))}
                            </div>
                        </>
                    )}
                </Card>
            )}
        </div>
    );
}
