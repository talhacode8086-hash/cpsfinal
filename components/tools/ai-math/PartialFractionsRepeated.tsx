'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Braces } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartialFractionsAdvanced() {
    const [numerator, setNumerator] = useState('');
    const [denominator, setDenominator] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        // Case: Repeated Linear Factors (x-a)^2
        const match = denominator.replace(/\s/g, '').match(/\(x([-+]\d*\.?\d*)\)\^2/);
        if (!match) {
            alert('Currently only supports repeated linear factors like (x-1)^2 in denominator');
            return;
        }

        const a = -parseFloat(match[1]);

        // Numerator cx + d
        const numMatch = numerator.replace(/\s/g, '').match(/([+-]?\d*\.?\d*)x([+-]\d*\.?\d*)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/);
        if (!numMatch) return;

        let c = 0, d = 0;
        if (numMatch[1]) {
            c = parseFloat(numMatch[1] === '+' ? '1' : numMatch[1] === '-' ? '-1' : numMatch[1]);
            d = parseFloat(numMatch[2]);
        } else if (numMatch[3]) {
            c = parseFloat(numMatch[3] === '+' ? '1' : numMatch[3] === '-' ? '-1' : numMatch[3]);
        } else if (numMatch[4]) {
            d = parseFloat(numMatch[4]);
        }

        // (cx + d) / (x-a)^2 = A/(x-a) + B/(x-a)^2
        // A(x-a) + B = cx + d
        // Ax - Aa + B = cx + d
        // A = c
        // -Aa + B = d => B = d + Aa

        const A = c;
        const B = d + (c * a);

        setResult({
            A: A.toFixed(2),
            B: B.toFixed(2),
            a,
            decomposition: `${A.toFixed(2)}/(x - ${a}) + ${B.toFixed(2)}/(x - ${a})^2`.replace(/- -/g, '+ ')
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Braces className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Partial Fractions (Repeated)</h1>
                </div>
                <p className="text-muted-foreground text-lg">Decompose repeated linear factors for Class 12 algebra</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <Input placeholder="Numerator N(x) e.g. 5x + 3" value={numerator} onChange={(e) => setNumerator(e.target.value)} className="text-center font-mono" />
                    <div className="w-full h-0.5 bg-primary/20"></div>
                    <Input placeholder="Denominator D(x) e.g. (x-1)^2" value={denominator} onChange={(e) => setDenominator(e.target.value)} className="text-center font-mono" />
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Decompose</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-xl font-bold mb-4">Decomposition Result</h3>
                        <p className="text-2xl font-mono font-bold text-primary text-center p-6 bg-background rounded-xl border border-primary/20">
                            {result.decomposition}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm font-bold">A</p>
                                <p className="text-2xl font-mono">{result.A}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm font-bold">B</p>
                                <p className="text-2xl font-mono">{result.B}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
