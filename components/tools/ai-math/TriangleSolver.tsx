'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Triangle } from 'lucide-react';

export default function TriangleSolver() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState<any>(null);

    const solve = () => {
        const sideA = parseFloat(a);
        const sideB = parseFloat(b);
        const sideC = parseFloat(c);

        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) return;

        // Check if valid triangle
        if (sideA + sideB <= sideC || sideB + sideC <= sideA || sideA + sideC <= sideB) {
            setResult({ error: 'Invalid triangle: Sum of two sides must be greater than third side' });
            return;
        }

        // Calculate perimeter
        const perimeter = sideA + sideB + sideC;

        // Calculate area using Heron's formula
        const s = perimeter / 2;
        const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

        // Calculate angles using cosine rule
        const angleA = Math.acos((sideB ** 2 + sideC ** 2 - sideA ** 2) / (2 * sideB * sideC)) * (180 / Math.PI);
        const angleB = Math.acos((sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)) * (180 / Math.PI);
        const angleC = 180 - angleA - angleB;

        setResult({ perimeter, area, angleA, angleB, angleC });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Triangle className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Triangle Solver</h1>
                </div>
                <p className="text-muted-foreground">Calculate area, perimeter, and angles</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Side a" value={a} onChange={(e) => setA(e.target.value)} type="number" step="any" />
                    <Input placeholder="Side b" value={b} onChange={(e) => setB(e.target.value)} type="number" step="any" />
                    <Input placeholder="Side c" value={c} onChange={(e) => setC(e.target.value)} type="number" step="any" />
                </div>
                <Button onClick={solve} className="w-full h-12">Solve Triangle</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    {result.error ? (
                        <p className="text-destructive text-lg">{result.error}</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="font-bold">Perimeter</p>
                                    <p className="text-2xl">{result.perimeter.toFixed(2)}</p>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="font-bold">Area</p>
                                    <p className="text-2xl">{result.area.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="font-bold">Angle A</p>
                                    <p className="text-xl">{result.angleA.toFixed(2)}°</p>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="font-bold">Angle B</p>
                                    <p className="text-xl">{result.angleB.toFixed(2)}°</p>
                                </div>
                                <div className="p-4 bg-muted rounded-lg">
                                    <p className="font-bold">Angle C</p>
                                    <p className="text-xl">{result.angleC.toFixed(2)}°</p>
                                </div>
                            </div>
                        </>
                    )}
                </Card>
            )}
        </div>
    );
}
