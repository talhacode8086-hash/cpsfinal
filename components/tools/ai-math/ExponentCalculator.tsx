'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap } from 'lucide-react';

export default function ExponentCalculator() {
    const [base, setBase] = useState('');
    const [exponent, setExponent] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const b = parseFloat(base);
        const e = parseFloat(exponent);

        if (isNaN(b) || isNaN(e)) return;

        const power = Math.pow(b, e);
        const sqrt = b > 0 ? Math.sqrt(b) : NaN;
        const cube = Math.pow(b, 1 / 3);

        setResult({
            power: power.toFixed(6),
            sqrt: sqrt.toFixed(6),
            cube: cube.toFixed(6),
            base: b,
            exponent: e,
            rules: [
                `${b}^${e} = ${power.toFixed(6)}`,
                `√${b} = ${sqrt.toFixed(6)}`,
                `∛${b} = ${cube.toFixed(6)}`
            ]
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Zap className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Exponent Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate powers, square roots, and cube roots</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        placeholder="Base"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        type="number"
                        step="any"
                    />
                    <Input
                        placeholder="Exponent"
                        value={exponent}
                        onChange={(e) => setExponent(e.target.value)}
                        type="number"
                        step="any"
                    />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold text-sm">Power</p>
                            <p className="text-sm text-muted-foreground">{result.base}^{result.exponent}</p>
                            <p className="text-2xl font-bold mt-2">{result.power}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold text-sm">Square Root</p>
                            <p className="text-sm text-muted-foreground">√{result.base}</p>
                            <p className="text-2xl font-bold mt-2">{result.sqrt}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold text-sm">Cube Root</p>
                            <p className="text-sm text-muted-foreground">∛{result.base}</p>
                            <p className="text-2xl font-bold mt-2">{result.cube}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
