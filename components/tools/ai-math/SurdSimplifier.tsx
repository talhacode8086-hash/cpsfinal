'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SurdSimplifier() {
    const [number, setNumber] = useState('');
    const [result, setResult] = useState<any>(null);

    const simplifySurd = (n: number) => {
        let outside = 1;
        let inside = n;
        let d = 2;
        while (d * d <= inside) {
            if (inside % (d * d) === 0) {
                outside *= d;
                inside /= (d * d);
            } else {
                d++;
            }
        }
        return { outside, inside };
    };

    const calculate = () => {
        const n = parseInt(number);
        if (isNaN(n) || n <= 0) return;

        const { outside, inside } = simplifySurd(n);

        let simplified = '';
        if (outside === 1) {
            simplified = `√${inside}`;
        } else if (inside === 1) {
            simplified = `${outside}`;
        } else {
            simplified = `${outside}√${inside}`;
        }

        setResult({
            original: `√${n}`,
            simplified,
            outside,
            inside,
            decimal: Math.sqrt(n).toFixed(4)
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Sparkles className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Surd Simplifier</h1>
                </div>
                <p className="text-muted-foreground text-lg">Simplify square roots to their simplest radical form</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Enter number inside √</label>
                    <Input
                        placeholder="e.g., 18, 72, 120"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        type="number"
                        className="text-xl h-14"
                    />
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Simplify</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="p-8 space-y-6 bg-primary/5">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-background rounded-xl border-2 border-primary/20 flex flex-col items-center justify-center">
                                <p className="text-sm text-muted-foreground mb-2">Original</p>
                                <p className="text-4xl font-mono font-bold text-primary">{result.original}</p>
                            </div>
                            <div className="p-6 bg-background rounded-xl border-2 border-primary flex flex-col items-center justify-center">
                                <p className="text-sm text-muted-foreground mb-2">Simplified Form</p>
                                <p className="text-4xl font-mono font-bold text-primary">{result.simplified}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center font-mono">
                            Decimal value: {result.decimal}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
