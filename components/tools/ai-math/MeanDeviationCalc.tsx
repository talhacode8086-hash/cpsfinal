'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MeanDeviationCalc() {
    const [data, setData] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const numbers = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        if (numbers.length === 0) return;

        const mean = numbers.reduce((a, b) => a + b) / numbers.length;
        const deviations = numbers.map(n => Math.abs(n - mean));
        const meanDev = deviations.reduce((a, b) => a + b) / numbers.length;

        setResult({
            mean: mean.toFixed(2),
            meanDev: meanDev.toFixed(4),
            numbers,
            deviations
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <ListChecks className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Mean Deviation Calculator</h1>
                </div>
                <p className="text-muted-foreground text-lg">Calculate Mean Deviation about Mean for ungrouped data</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Enter Data (comma separated)</label>
                    <Input
                        placeholder="e.g., 10, 15, 12, 18, 20"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="text-lg font-mono"
                    />
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Calculate Deviation</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-primary/5 text-center">
                            <p className="text-sm font-bold text-muted-foreground uppercase">Arithmetic Mean (x̄)</p>
                            <p className="text-4xl font-mono font-bold text-primary mt-2">{result.mean}</p>
                        </Card>
                        <Card className="p-6 bg-primary/10 text-center border-primary/20">
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Mean Deviation</p>
                            <p className="text-4xl font-mono font-bold text-primary mt-2">{result.meanDev}</p>
                        </Card>
                    </div>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">Deviations |x - x̄|</h3>
                        <div className="flex flex-wrap gap-3">
                            {result.deviations.map((d: number, i: number) => (
                                <div key={i} className="px-4 py-2 bg-muted rounded-full font-mono text-sm">
                                    {d.toFixed(2)}
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
