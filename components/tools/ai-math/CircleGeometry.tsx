'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Circle } from 'lucide-react';

export default function CircleGeometry() {
    const [h, setH] = useState('');
    const [k, setK] = useState('');
    const [r, setR] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const hVal = parseFloat(h);
        const kVal = parseFloat(k);
        const rVal = parseFloat(r);

        if ([hVal, kVal, rVal].some(isNaN) || rVal <= 0) return;

        const area = Math.PI * rVal * rVal;
        const circumference = 2 * Math.PI * rVal;
        const diameter = 2 * rVal;
        const equation = `(x - ${hVal})² + (y - ${kVal})² = ${rVal}²`;

        setResult({
            equation,
            area: area.toFixed(4),
            circumference: circumference.toFixed(4),
            diameter: diameter.toFixed(4),
            center: `(${hVal}, ${kVal})`,
            radius: rVal
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Circle className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Circle Geometry Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate circle properties and equation</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="Center x (h)" value={h} onChange={(e) => setH(e.target.value)} type="number" step="any" />
                        <Input placeholder="Center y (k)" value={k} onChange={(e) => setK(e.target.value)} type="number" step="any" />
                    </div>
                    <Input placeholder="Radius (r)" value={r} onChange={(e) => setR(e.target.value)} type="number" step="any" />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-6">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="font-bold mb-2">Equation:</p>
                        <p className="text-2xl font-mono">{result.equation}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Area</p>
                            <p className="text-2xl">{result.area}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Circumference</p>
                            <p className="text-2xl">{result.circumference}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Center</p>
                            <p className="text-xl">{result.center}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Diameter</p>
                            <p className="text-2xl">{result.diameter}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
