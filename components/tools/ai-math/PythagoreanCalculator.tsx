'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Triangle } from 'lucide-react';

export default function PythagoreanCalculator() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const aVal = parseFloat(a);
        const bVal = parseFloat(b);
        const cVal = parseFloat(c);

        let calculated;
        if (!isNaN(aVal) && !isNaN(bVal) && !c) {
            // Calculate c
            calculated = { c: Math.sqrt(aVal ** 2 + bVal ** 2).toFixed(4), formula: 'c² = a² + b²' };
        } else if (!isNaN(aVal) && !isNaN(cVal) && !b) {
            // Calculate b
            calculated = { b: Math.sqrt(cVal ** 2 - aVal ** 2).toFixed(4), formula: 'b² = c² - a²' };
        } else if (!isNaN(bVal) && !isNaN(cVal) && !a) {
            // Calculate a
            calculated = { a: Math.sqrt(cVal ** 2 - bVal ** 2).toFixed(4), formula: 'a² = c² - b²' };
        } else {
            return;
        }

        setResult(calculated);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Triangle className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Pythagorean Theorem Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate missing side of right triangle: a² + b² = c²</p>
            </div>

            <Card className="p-8 space-y-6">
                <p className="text-sm text-muted-foreground">Enter any two sides, leave one blank</p>
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="Side a" value={a} onChange={(e) => setA(e.target.value)} type="number" step="any" />
                    <Input placeholder="Side b" value={b} onChange={(e) => setB(e.target.value)} type="number" step="any" />
                    <Input placeholder="Hypotenuse c" value={c} onChange={(e) => setC(e.target.value)} type="number" step="any" />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="font-bold mb-2">Result:</p>
                        <p className="text-3xl font-mono font-bold">
                            {result.a && `a = ${result.a}`}
                            {result.b && `b = ${result.b}`}
                            {result.c && `c = ${result.c}`}
                        </p>
                    </div>
                    <p className="text-center text-muted-foreground">Formula: {result.formula}</p>
                </Card>
            )}
        </div>
    );
}
