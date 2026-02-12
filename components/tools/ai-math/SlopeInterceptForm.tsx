'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp } from 'lucide-react';

export default function SlopeInterceptForm() {
    const [x1, setX1] = useState('');
    const [y1, setY1] = useState('');
    const [x2, setX2] = useState('');
    const [y2, setY2] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const x1v = parseFloat(x1);
        const y1v = parseFloat(y1);
        const x2v = parseFloat(x2);
        const y2v = parseFloat(y2);

        if ([x1v, y1v, x2v, y2v].some(isNaN)) return;

        const slope = (y2v - y1v) / (x2v - x1v);
        const yIntercept = y1v - slope * x1v;
        const equation = `y = ${slope.toFixed(2)}x + ${yIntercept.toFixed(2)}`;

        setResult({ slope: slope.toFixed(4), yIntercept: yIntercept.toFixed(4), equation });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <TrendingUp className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Slope-Intercept Form</h1>
                </div>
                <p className="text-muted-foreground">Find equation of line from two points</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-bold">Point 1</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="x₁" value={x1} onChange={(e) => setX1(e.target.value)} type="number" step="any" />
                            <Input placeholder="y₁" value={y1} onChange={(e) => setY1(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold">Point 2</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="x₂" value={x2} onChange={(e) => setX2(e.target.value)} type="number" step="any" />
                            <Input placeholder="y₂" value={y2} onChange={(e) => setY2(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12">Get Equation</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="font-bold mb-2">Equation:</p>
                        <p className="text-3xl font-mono font-bold">{result.equation}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Slope (m)</p>
                            <p className="text-2xl">{result.slope}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Y-Intercept (b)</p>
                            <p className="text-2xl">{result.yIntercept}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
