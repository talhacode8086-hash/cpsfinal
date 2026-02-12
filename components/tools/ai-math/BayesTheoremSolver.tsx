'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BayesTheoremSolver() {
    const [pa, setPa] = useState('');
    const [pb, setPb] = useState('');
    const [pba, setPba] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const p_a = parseFloat(pa);
        const p_b = parseFloat(pb);
        const p_ba = parseFloat(pba);

        if ([p_a, p_b, p_ba].some(v => isNaN(v) || v < 0 || v > 1)) {
            alert('Probabilities must be between 0 and 1');
            return;
        }

        // P(A|B) = [P(B|A) * P(A)] / P(B)
        const pab = (p_ba * p_a) / p_b;

        if (pab > 1) {
            alert('Calculated probability exceeds 1. Please check if your P(B) is large enough relative to P(B|A)*P(A)');
            return;
        }

        setResult({
            pab: pab.toFixed(4),
            formula: `P(A|B) = [P(B|A) × P(A)] / P(B)`,
            calc: `[${p_ba} × ${p_a}] / ${p_b} = ${pab.toFixed(4)}`
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Percent className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Bayes' Theorem Solver</h1>
                </div>
                <p className="text-muted-foreground text-lg">Calculate conditional probability P(A|B)</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">P(A) - Prior</label>
                        <Input placeholder="e.g., 0.1" value={pa} onChange={(e) => setPa(e.target.value)} type="number" step="0.01" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">P(B|A) - Likelihood</label>
                        <Input placeholder="e.g., 0.9" value={pba} onChange={(e) => setPba(e.target.value)} type="number" step="0.01" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">P(B) - Evidence</label>
                        <Input placeholder="e.g., 0.2" value={pb} onChange={(e) => setPb(e.target.value)} type="number" step="0.01" />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Calculate P(A|B)</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="p-8 bg-primary/5 text-center">
                        <h3 className="text-2xl font-black mb-2 text-primary">Posterior Probability P(A|B)</h3>
                        <p className="text-5xl font-black mb-6">{result.pab}</p>
                        <div className="p-6 bg-background rounded-xl border border-primary/20 space-y-2">
                            <p className="font-mono text-sm text-muted-foreground">{result.formula}</p>
                            <p className="font-mono text-lg font-bold">{result.calc}</p>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
