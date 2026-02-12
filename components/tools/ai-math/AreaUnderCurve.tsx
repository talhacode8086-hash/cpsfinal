'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AreaChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AreaUnderCurve() {
    const [expression, setExpression] = useState('');
    const [lower, setLower] = useState('');
    const [upper, setUpper] = useState('');
    const [result, setResult] = useState<any>(null);

    const integrate = (expr: string, xVal: number) => {
        const terms = expr.replace(/\s/g, '').split(/(?=[+-])/);
        let total = 0;
        terms.forEach(term => {
            if (!term) return;
            const match = term.match(/([+-]?\d*\.?\d*)x\^(\d+)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/);
            if (!match) return;
            const parseCoef = (str: string | undefined) => {
                if (!str || str === '+') return 1;
                if (str === '-') return -1;
                return parseFloat(str);
            };
            if (match[1] !== undefined && match[2] !== undefined) {
                const coef = parseCoef(match[1]);
                const power = parseInt(match[2]);
                total += (coef / (power + 1)) * Math.pow(xVal, power + 1);
            } else if (match[3] !== undefined) {
                const coef = parseCoef(match[3]);
                total += (coef / 2) * Math.pow(xVal, 2);
            } else if (match[4] !== undefined) {
                total += parseCoef(match[4]) * xVal;
            }
        });
        return total;
    };

    const calculate = () => {
        const a = parseFloat(lower);
        const b = parseFloat(upper);
        if (isNaN(a) || isNaN(b)) return;

        const valA = integrate(expression, a);
        const valB = integrate(expression, b);
        const area = valB - valA;

        setResult({
            area: area.toFixed(4),
            absArea: Math.abs(area).toFixed(4),
            a,
            b,
            expr: expression
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <AreaChart className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Area Under Curve</h1>
                </div>
                <p className="text-muted-foreground text-lg">Calculate the area between a curve and the x-axis</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Function f(x)</label>
                        <Input placeholder="e.g., x^2" value={expression} onChange={(e) => setExpression(e.target.value)} className="text-xl h-14 font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">Lower Limit (a)</label>
                            <Input value={lower} onChange={(e) => setLower(e.target.value)} type="number" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1">Upper Limit (b)</label>
                            <Input value={upper} onChange={(e) => setUpper(e.target.value)} type="number" />
                        </div>
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">Calculate Area</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-2xl font-black mb-6 text-center">∫<sub>{result.a}</sub><sup>{result.b}</sup> ({result.expr}) dx</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-background rounded-xl border border-primary/20 flex flex-col items-center justify-center">
                                <p className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-widest">Signed Area</p>
                                <p className="text-4xl font-mono font-bold text-primary">{result.area}</p>
                            </div>
                            <div className="p-6 bg-background rounded-xl border border-primary flex flex-col items-center justify-center">
                                <p className="text-sm text-muted-foreground mb-1 uppercase font-bold tracking-widest">Total Area (Absolute)</p>
                                <p className="text-4xl font-mono font-bold text-primary">{result.absArea}</p>
                            </div>
                        </div>
                        <p className="mt-8 text-sm text-center text-muted-foreground italic">
                            Calculated using definite integration of the polynomial expression over the interval [a, b].
                        </p>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
