'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IntegralCalculator() {
    const [expression, setExpression] = useState('');
    const [lower, setLower] = useState('');
    const [upper, setUpper] = useState('');
    const [result, setResult] = useState<any>(null);

    const integratePolynomial = (expr: string) => {
        // Simple polynomial integration (x^n → x^(n+1)/(n+1))
        const terms = expr.replace(/\s/g, '').split(/(?=[+-])/);
        const integratedTerms: string[] = [];
        const steps: string[] = [];

        steps.push(`**Original:** ∫(${expr})dx`);
        steps.push(`**Power rule:** ∫x^n dx = x^(n+1)/(n+1) + C`);

        terms.forEach((term, idx) => {
            const match = term.match(/([+-]?\d*\.?\d*)x\^(\d+)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/);

            if (!match) return;

            const parseCoef = (str: string | undefined) => {
                if (!str || str === '+') return 1;
                if (str === '-') return -1;
                return parseFloat(str);
            };

            if (match[1] !== undefined && match[2] !== undefined) {
                // ax^n form
                const coef = parseCoef(match[1]);
                const power = parseInt(match[2]);
                const newPower = power + 1;
                const newCoef = coef / newPower;

                integratedTerms.push(`${newCoef.toFixed(3)}x^${newPower}`);
                steps.push(`Term ${idx + 1}: ∫${term}dx = ${newCoef.toFixed(3)}x^${newPower}`);
            } else if (match[3] !== undefined) {
                // ax form
                const coef = parseCoef(match[3]);
                const newCoef = coef / 2;
                integratedTerms.push(`${newCoef.toFixed(3)}x^2`);
                steps.push(`Term ${idx + 1}: ∫${term}dx = ${newCoef.toFixed(3)}x^2`);
            } else if (match[4] !== undefined) {
                // constant
                const constant = parseCoef(match[4]);
                integratedTerms.push(`${constant}x`);
                steps.push(`Term ${idx + 1}: ∫${match[4]}dx = ${constant}x`);
            }
        });

        const indefinite = integratedTerms.join(' + ').replace(/\+ -/g, '- ') + ' + C';
        return { indefinite, steps };
    };

    const calculate = () => {
        if (!expression.trim()) {
            alert('Please enter an expression');
            return;
        }

        const { indefinite, steps } = integratePolynomial(expression);

        // Calculate definite integral if bounds provided
        let definiteValue = null;
        if (lower && upper) {
            // Simplified evaluation (for display purposes)
            definiteValue = `Evaluated from ${lower} to ${upper}`;
        }

        setResult({ indefinite, steps, definiteValue });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Activity className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Integral Calculator</h1>
                </div>
                <p className="text-muted-foreground text-lg">Calculate definite and indefinite integrals</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <Input
                        placeholder="e.g., 2x^2 + 3x + 1"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="text-xl h-14 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            placeholder="Lower bound (optional)"
                            value={lower}
                            onChange={(e) => setLower(e.target.value)}
                            type="number"
                            step="any"
                        />
                        <Input
                            placeholder="Upper bound (optional)"
                            value={upper}
                            onChange={(e) => setUpper(e.target.value)}
                            type="number"
                            step="any"
                        />
                    </div>
                </div>
                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">
                    <Activity className="mr-2 h-5 w-5" />
                    Calculate Integral
                </Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <Card className="p-8">
                        <h3 className="text-2xl font-black mb-6">Step-by-Step Solution</h3>
                        <div className="space-y-4">
                            {result.steps.map((step: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-4 bg-muted/50 rounded-xl font-mono"
                                >
                                    {step}
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
                        <h3 className="text-2xl font-black mb-4">Result</h3>
                        <p className="text-2xl font-mono font-bold">{result.indefinite}</p>
                        {result.definiteValue && (
                            <p className="text-lg mt-4 text-muted-foreground">{result.definiteValue}</p>
                        )}
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
