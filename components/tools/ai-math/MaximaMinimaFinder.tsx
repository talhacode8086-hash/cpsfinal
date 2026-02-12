'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaximaMinimaFinder() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        // For f(x) = ax^2 + bx + c
        const match = expression.replace(/\s/g, '').match(/([+-]?\d*\.?\d*)x\^2\s*([+-]?\s*\d*\.?\d*)x\s*([+-]?\s*\d+\.?\d*)/);

        if (!match) {
            alert('Currently supports quadratic functions: ax^2 + bx + c');
            return;
        }

        const a = parseFloat(match[1] || '1');
        const b = parseFloat(match[2]?.replace(/\s/g, '') || '0');
        const c = parseFloat(match[3]?.replace(/\s/g, '') || '0');

        // f'(x) = 2ax + b = 0 => x = -b / 2a
        const x = -b / (2 * a);
        const y = a * x * x + b * x + c;

        // f''(x) = 2a
        const secondDeriv = 2 * a;
        const type = secondDeriv > 0 ? 'Relative Minimum' : secondDeriv < 0 ? 'Relative Maximum' : 'Point of Inflection';

        setResult({
            x: x.toFixed(4),
            y: y.toFixed(4),
            type,
            derivative: `f'(x) = ${2 * a}x + ${b}`,
            secondDeriv: `f''(x) = ${2 * a}`,
            isMax: secondDeriv < 0
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <ArrowUpCircle className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Maxima & Minima Finder</h1>
                </div>
                <p className="text-muted-foreground text-lg">Find stationary points and determine if they are maximum or minimum</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Enter Function f(x)</label>
                    <Input
                        placeholder="e.g., x^2 - 4x + 5"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="text-xl h-14 font-mono text-center"
                    />
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Find Extrema</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                    <Card className={`p-8 border-2 ${result.isMax ? 'bg-red-500/5 border-red-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                        <div className="flex items-center gap-4 mb-6">
                            {result.isMax ? <ArrowUpCircle className="h-10 w-10 text-red-500" /> : <ArrowDownCircle className="h-10 w-10 text-green-500" />}
                            <div>
                                <h3 className="text-2xl font-black">{result.type}</h3>
                                <p className="text-muted-foreground">The function reaches its peak/valley here</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 bg-background rounded-xl border border-primary/20 text-center">
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">x-coordinate</p>
                                <p className="text-4xl font-mono font-bold mt-2">{result.x}</p>
                            </div>
                            <div className="p-6 bg-background rounded-xl border border-primary/20 text-center">
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">y-coordinate</p>
                                <p className="text-4xl font-mono font-bold mt-2">{result.y}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">Derivatives Used</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-muted rounded-lg font-mono">
                                <p className="text-xs font-bold text-muted-foreground mb-1">First Derivative</p>
                                {result.derivative}
                            </div>
                            <div className="p-4 bg-muted rounded-lg font-mono">
                                <p className="text-xs font-bold text-muted-foreground mb-1">Second Derivative</p>
                                {result.secondDeriv}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
