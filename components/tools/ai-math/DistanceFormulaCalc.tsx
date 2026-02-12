'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

export default function DistanceFormulaCalc() {
    const [x1, setX1] = useState('');
    const [y1, setY1] = useState('');
    const [x2, setX2] = useState('');
    const [y2, setY2] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const x1Val = parseFloat(x1);
        const y1Val = parseFloat(y1);
        const x2Val = parseFloat(x2);
        const y2Val = parseFloat(y2);

        if ([x1Val, y1Val, x2Val, y2Val].some(isNaN)) return;

        const distance = Math.sqrt(Math.pow(x2Val - x1Val, 2) + Math.pow(y2Val - y1Val, 2));
        const midpoint = { x: (x1Val + x2Val) / 2, y: (y1Val + y2Val) / 2 };
        const slope = (y2Val - y1Val) / (x2Val - x1Val);

        setResult({ distance, midpoint, slope });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <MapPin className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Distance Formula Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate distance, midpoint, and slope between two points</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-bold">Point 1 (x₁, y₁)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="x₁" value={x1} onChange={(e) => setX1(e.target.value)} type="number" step="any" />
                            <Input placeholder="y₁" value={y1} onChange={(e) => setY1(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold">Point 2 (x₂, y₂)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="x₂" value={x2} onChange={(e) => setX2(e.target.value)} type="number" step="any" />
                            <Input placeholder="y₂" value={y2} onChange={(e) => setY2(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Distance</p>
                            <p className="text-2xl">{result.distance.toFixed(4)}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Midpoint</p>
                            <p className="text-lg">({result.midpoint.x.toFixed(2)}, {result.midpoint.y.toFixed(2)})</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Slope</p>
                            <p className="text-2xl">{isFinite(result.slope) ? result.slope.toFixed(4) : '∞'}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
