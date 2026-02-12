'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VectorCalc() {
    const [x1, setX1] = useState('');
    const [y1, setY1] = useState('');
    const [z1, setZ1] = useState('');
    const [x2, setX2] = useState('');
    const [y2, setY2] = useState('');
    const [z2, setZ2] = useState('');
    const [result, setResult] = useState<any>(null);

    const dotProduct = () => {
        const dot = (parseFloat(x1) || 0) * (parseFloat(x2) || 0) +
            (parseFloat(y1) || 0) * (parseFloat(y2) || 0) +
            (parseFloat(z1) || 0) * (parseFloat(z2) || 0);
        setResult({ operation: 'Dot Product', value: dot });
    };

    const crossProduct = () => {
        const i = (parseFloat(y1) || 0) * (parseFloat(z2) || 0) - (parseFloat(z1) || 0) * (parseFloat(y2) || 0);
        const j = (parseFloat(z1) || 0) * (parseFloat(x2) || 0) - (parseFloat(x1) || 0) * (parseFloat(z2) || 0);
        const k = (parseFloat(x1) || 0) * (parseFloat(y2) || 0) - (parseFloat(y1) || 0) * (parseFloat(x2) || 0);
        setResult({ operation: 'Cross Product', vector: `${i}i + ${j}j + ${k}k` });
    };

    const magnitude = () => {
        const mag1 = Math.sqrt((parseFloat(x1) || 0) ** 2 + (parseFloat(y1) || 0) ** 2 + (parseFloat(z1) || 0) ** 2);
        const mag2 = Math.sqrt((parseFloat(x2) || 0) ** 2 + (parseFloat(y2) || 0) ** 2 + (parseFloat(z2) || 0) ** 2);
        setResult({ operation: 'Magnitude', mag1, mag2 });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">3D Vector Calculator</h1></div>
            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <h3 className="font-bold">Vector 1</h3>
                        <div className="flex gap-2">
                            <Input placeholder="x" value={x1} onChange={(e) => setX1(e.target.value)} type="number" step="any" />
                            <Input placeholder="y" value={y1} onChange={(e) => setY1(e.target.value)} type="number" step="any" />
                            <Input placeholder="z" value={z1} onChange={(e) => setZ1(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold">Vector 2</h3>
                        <div className="flex gap-2">
                            <Input placeholder="x" value={x2} onChange={(e) => setX2(e.target.value)} type="number" step="any" />
                            <Input placeholder="y" value={y2} onChange={(e) => setY2(e.target.value)} type="number" step="any" />
                            <Input placeholder="z" value={z2} onChange={(e) => setZ2(e.target.value)} type="number" step="any" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Button onClick={dotProduct}>Dot Product</Button>
                    <Button onClick={crossProduct}>Cross Product</Button>
                    <Button onClick={magnitude}>Magnitude</Button>
                </div>
            </Card>
            {result && (
                <Card className="p-8">
                    <h3 className="text-2xl font-black mb-4">{result.operation}</h3>
                    {result.value !== undefined && <p className="text-3xl font-mono">{result.value.toFixed(4)}</p>}
                    {result.vector && <p className="text-2xl font-mono">{result.vector}</p>}
                    {result.mag1 !== undefined && (
                        <div>
                            <p>|v₁| = {result.mag1.toFixed(4)}</p>
                            <p>|v₂| = {result.mag2.toFixed(4)}</p>
                        </div>
                    )}
                </Card>
            )}
        </div>
    );
}
