'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TrigCalc() {
    const [angle, setAngle] = useState('');
    const [unit, setUnit] = useState<'deg' | 'rad'>('deg');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        let angleValue = parseFloat(angle);
        if (unit === 'deg') angleValue = (angleValue * Math.PI) / 180;

        const sinValue = Math.sin(angleValue);
        const cosValue = Math.cos(angleValue);
        const tanValue = Math.tan(angleValue);

        setResult({ sin: sinValue, cos: cosValue, tan: tanValue, angleRad: angleValue });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">Trigonometry Calculator</h1></div>
            <Card className="p-8 space-y-6">
                <Input placeholder="Enter angle" value={angle} onChange={(e) => setAngle(e.target.value)} type="number" step="any" />
                <div className="flex gap-4">
                    <Button onClick={() => setUnit('deg')} variant={unit === 'deg' ? 'default' : 'outline'} className="flex-1">Degrees</Button>
                    <Button onClick={() => setUnit('rad')} variant={unit === 'rad' ? 'default' : 'outline'} className="flex-1">Radians</Button>
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>
            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">sin({angle}°)</p><p className="text-2xl font-mono">{result.sin.toFixed(4)}</p></div>
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">cos({angle}°)</p><p className="text-2xl font-mono">{result.cos.toFixed(4)}</p></div>
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">tan({angle}°)</p><p className="text-2xl font-mono">{result.tan.toFixed(4)}</p></div>
                    </div>
                </Card>
            )}
        </div>
    );
}
