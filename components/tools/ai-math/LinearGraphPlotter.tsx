'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LinearGraphPlotter() {
    const [m, setM] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const slope = parseFloat(m);
        const intercept = parseFloat(c);

        if (isNaN(slope) || isNaN(intercept)) return;

        // Points for plotting
        const points = [];
        for (let x = -5; x <= 5; x++) {
            points.push({ x, y: (slope * x + intercept).toFixed(2) });
        }

        setResult({
            m: slope,
            c: intercept,
            points,
            equation: `y = ${slope}x ${intercept >= 0 ? '+ ' + intercept : '- ' + Math.abs(intercept)}`,
            xIntercept: (-intercept / slope).toFixed(2),
            yIntercept: intercept.toFixed(2)
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <LineChart className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Linear Graph Plotter</h1>
                </div>
                <p className="text-muted-foreground text-lg">Plot linear equations and find intercepts</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Slope (m)</label>
                        <Input placeholder="e.g., 2" value={m} onChange={(e) => setM(e.target.value)} type="number" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">y-intercept (c)</label>
                        <Input placeholder="e.g., -3" value={c} onChange={(e) => setC(e.target.value)} type="number" />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Plot Equation</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-2xl font-black mb-4 text-center">{result.equation}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <p className="text-xs font-bold text-muted-foreground uppercase">x-intercept</p>
                                <p className="text-2xl font-mono">({result.xIntercept}, 0)</p>
                            </div>
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <p className="text-xs font-bold text-muted-foreground uppercase">y-intercept</p>
                                <p className="text-2xl font-mono">(0, {result.yIntercept})</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">Table of Values</h3>
                        <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                            {result.points.map((p: any, i: number) => (
                                <div key={i} className="flex flex-col items-center p-2 bg-muted rounded">
                                    <span className="text-[10px] font-bold text-muted-foreground">x: {p.x}</span>
                                    <span className="text-xs font-mono font-bold">y: {p.y}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
