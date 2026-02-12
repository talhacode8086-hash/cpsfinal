'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContinuityChecker() {
    const [expression, setExpression] = useState('');
    const [point, setPoint] = useState('');
    const [result, setResult] = useState<any>(null);

    const evaluateAt = (expr: string, xVal: number) => {
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
                total += parseCoef(match[1]) * Math.pow(xVal, parseInt(match[2]));
            } else if (match[3] !== undefined) {
                total += parseCoef(match[3]) * xVal;
            } else if (match[4] !== undefined) {
                total += parseCoef(match[4]);
            }
        });
        return total;
    };

    const checkContinuity = () => {
        const a = parseFloat(point);
        if (isNaN(a)) return;

        // For polynomials, they are always continuous. 
        // This tool checks LHL, RHL and f(a).
        // For simplicity in this UI, we demonstrate the definition.
        const fa = evaluateAt(expression, a);
        const lhl = evaluateAt(expression, a - 0.0001);
        const rhl = evaluateAt(expression, a + 0.0001);

        const isContinuous = Math.abs(lhl - rhl) < 0.01 && Math.abs(lhl - fa) < 0.01;

        setResult({
            fa: fa.toFixed(4),
            lhl: lhl.toFixed(4),
            rhl: rhl.toFixed(4),
            isContinuous,
            a
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Activity className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Continuity Checker</h1>
                </div>
                <p className="text-muted-foreground text-lg">Check if a function is continuous at a given point</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Function f(x)</label>
                        <Input placeholder="e.g., x^2 + 1" value={expression} onChange={(e) => setExpression(e.target.value)} className="font-mono" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">At x = a</label>
                        <Input placeholder="e.g., 2" value={point} onChange={(e) => setPoint(e.target.value)} type="number" />
                    </div>
                </div>
                <Button onClick={checkContinuity} className="w-full h-12 text-lg font-bold">Check Continuity</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                    <Card className={`p-8 border-2 ${result.isContinuous ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black">{result.isContinuous ? 'CONTINUOUS' : 'DISCONTINUOUS'}</h3>
                            <div className="px-4 py-1 rounded-full text-xs font-bold bg-muted uppercase">At x = {result.a}</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">LHL (Left)</p>
                                <p className="text-xl font-mono">{result.lhl}</p>
                            </div>
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">RHL (Right)</p>
                                <p className="text-xl font-mono">{result.rhl}</p>
                            </div>
                            <div className="p-4 bg-background border rounded-lg text-center">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase">f(a) (Value)</p>
                                <p className="text-xl font-mono">{result.fa}</p>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-center text-muted-foreground italic">
                            {result.isContinuous
                                ? "Since LHL = RHL = f(a), the function is continuous at this point."
                                : "The conditions for continuity are not met."}
                        </p>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
