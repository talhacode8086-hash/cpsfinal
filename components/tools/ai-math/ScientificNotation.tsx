'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hash } from 'lucide-react';

export default function ScientificNotation() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState<any>(null);

    const convert = () => {
        const num = parseFloat(number);
        if (isNaN(num)) return;

        const scientific = num.toExponential();
        const [coefficient, exponent] = scientific.split('e');
        const standard = num.toString();

        setResult({
            scientific,
            coefficient,
            exponent,
            standard
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Hash className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Scientific Notation Converter</h1>
                </div>
                <p className="text-muted-foreground">Convert between standard and scientific notation</p>
            </div>

            <Card className="p-8 space-y-6">
                <Input
                    placeholder="Enter number (e.g., 123000 or 1.23e5)"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    type="text"
                    className="text-lg h-14"
                />
                <Button onClick={convert} className="w-full h-12">Convert</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="font-bold mb-2">Scientific Notation:</p>
                        <p className="text-3xl font-mono font-bold">{result.scientific}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Coefficient</p>
                            <p className="text-2xl">{result.coefficient}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Exponent</p>
                            <p className="text-2xl">{result.exponent}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
