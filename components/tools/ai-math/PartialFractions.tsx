'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Braces } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartialFractions() {
    const [numerator, setNumerator] = useState('');
    const [denominator, setDenominator] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        // This is a highly complex symbolic task. 
        // For a frontend tool without a symbolic backend like mathjs (which we aren't using fully here for logic),
        // we'll implement a solver for the most common Class 12 case: linear factors in denominator.

        // Denominator in form (x-a)(x-b)
        const match = denominator.replace(/\s/g, '').match(/\(x([-+]\d*\.?\d*)\)\(x([-+]\d*\.?\d*)\)/);
        if (!match) {
            alert('Currently only supports non-repeated linear factors like (x-1)(x-2)');
            return;
        }

        const a = -parseFloat(match[1]);
        const b = -parseFloat(match[2]);

        // Numerator in form cx + d
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

        // Resolving: (cx + d) / (x-a)(x-b) = A/(x-a) + B/(x-b)
        // A(x-b) + B(x-a) = cx + d
        // At x = a: A(a-b) = ca + d => A = (ca + d) / (a-b)
        // At x = b: B(b-a) = cb + d => B = (cb + d) / (b-a)

        const A = (c * a + d) / (a - b);
        const B = (c * b + d) / (b - a);

        setResult({
            A: A.toFixed(2),
            B: B.toFixed(2),
            a,
            b,
            decomposition: `${A.toFixed(2)}/(x - ${a}) + ${B.toFixed(2)}/(x - ${b})`.replace(/- -/g, '+ ')
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Braces className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Partial Fraction Decomposer</h1>
                </div>
                <p className="text-muted-foreground text-lg">Decompose complex rational functions into simpler fractions</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-full max-w-sm space-y-2">
                        <label className="text-sm font-bold">Numerator N(x)</label>
                        <Input placeholder="e.g., 3x + 1" value={numerator} onChange={(e) => setNumerator(e.target.value)} className="text-center text-xl font-mono" />
                    </div>
                    <div className="w-full max-w-sm h-0.5 bg-primary/20"></div>
                    <div className="w-full max-w-sm space-y-2">
                        <label className="text-sm font-bold">Denominator D(x)</label>
                        <Input placeholder="e.g., (x-1)(x-2)" value={denominator} onChange={(e) => setDenominator(e.target.value)} className="text-center text-xl font-mono" />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Decompose</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-xl font-bold mb-4">Decomposition Result</h3>
                        <div className="p-6 bg-background rounded-xl border border-primary/20 text-center">
                            <p className="text-2xl font-mono font-bold text-primary">{result.decomposition}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm font-bold">Value of A</p>
                                <p className="text-2xl font-mono">{result.A}</p>
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-center">
                                <p className="text-sm font-bold">Value of B</p>
                                <p className="text-2xl font-mono">{result.B}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
