'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Variable } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RemainderTheoremSolver() {
    const [expression, setExpression] = useState('');
    const [divisor, setDivisor] = useState('');
    const [result, setResult] = useState<any>(null);

    const parsePolynomial = (expr: string) => {
        const terms = expr.replace(/\s/g, '').split(/(?=[+-])/);
        const poly: { coef: number, power: number }[] = [];

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
                poly.push({ coef: parseCoef(match[1]), power: parseInt(match[2]) });
            } else if (match[3] !== undefined) {
                poly.push({ coef: parseCoef(match[3]), power: 1 });
            } else if (match[4] !== undefined) {
                poly.push({ coef: parseCoef(match[4]), power: 0 });
            }
        });
        return poly;
    };

    const evaluate = () => {
        if (!expression || !divisor) return;

        // Divisor should be in form (x - a) or (x + a)
        const divisorMatch = divisor.replace(/\s/g, '').match(/x([+-]\d*\.?\d*)/);
        if (!divisorMatch) {
            alert('Divisor must be in form (x - a) or (x + a)');
            return;
        }

        const aValue = -parseFloat(divisorMatch[1]); // if (x-2), a=2. if (x+3), a=-3.
        const poly = parsePolynomial(expression);

        let remainder = 0;
        const steps: string[] = [];
        steps.push(`Substitute x = ${aValue} into P(x) = ${expression}`);

        poly.forEach(term => {
            const termVal = term.coef * Math.pow(aValue, term.power);
            remainder += termVal;
            steps.push(`Term ${term.coef}x^${term.power}: ${term.coef}(${aValue})^${term.power} = ${termVal.toFixed(2)}`);
        });

        const isFactor = Math.abs(remainder) < 0.0001;

        setResult({
            remainder: remainder.toFixed(2),
            isFactor,
            steps,
            a: aValue
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Variable className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Remainder & Factor Theorem Solver</h1>
                </div>
                <p className="text-muted-foreground text-lg">Find the remainder and check if (x-a) is a factor of P(x)</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Polynomial P(x)</label>
                        <Input
                            placeholder="e.g., x^3 - 6x^2 + 11x - 6"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            className="font-mono"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1">Divisor (x - a)</label>
                        <Input
                            placeholder="e.g., x - 2"
                            value={divisor}
                            onChange={(e) => setDivisor(e.target.value)}
                            className="font-mono"
                        />
                    </div>
                </div>
                <Button onClick={evaluate} className="w-full h-12 text-lg font-bold">Calculate Remainder</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <Card className="p-8 bg-primary/5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-black">Result</h3>
                            {result.isFactor ? (
                                <span className="px-4 py-1 bg-green-500 text-white rounded-full text-sm font-bold">IS A FACTOR</span>
                            ) : (
                                <span className="px-4 py-1 bg-red-500 text-white rounded-full text-sm font-bold">NOT A FACTOR</span>
                            )}
                        </div>
                        <p className="text-4xl font-mono font-bold text-primary mb-4">Remainder R = {result.remainder}</p>
                        <p className="text-muted-foreground italic">
                            {result.isFactor
                                ? `According to Factor Theorem, since R=0, (${divisor}) is a factor.`
                                : `Since R ≠ 0, (${divisor}) is not a factor.`}
                        </p>
                    </Card>

                    <Card className="p-8">
                        <h3 className="text-xl font-bold mb-4">Step-by-Step Evaluation</h3>
                        <div className="space-y-2">
                            {result.steps.map((step: string, i: number) => (
                                <div key={i} className="p-3 bg-muted rounded-lg font-mono text-sm">{i + 1}. {step}</div>
                            ))}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
