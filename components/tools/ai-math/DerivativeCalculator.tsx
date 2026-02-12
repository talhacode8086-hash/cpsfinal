'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DerivativeCalculator() {
    const [expression, setExpression] = useState('');
    const [variable, setVariable] = useState('x');
    const [derivative, setDerivative] = useState<string>('');
    const [steps, setSteps] = useState<string[]>([]);

    const derivePolynomial = (expr: string) => {
        // Simple polynomial derivative (handles x^n, ax^n, x, ax)
        const terms = expr.replace(/\s/g, '').split(/(?=[+-])/);
        const derivedTerms: string[] = [];
        const stepsList: string[] = [];

        stepsList.push(`**Original expression:** ${expr}`);
        stepsList.push(`**Rule:** d/dx(x^n) = n·x^(n-1)`);

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

                if (power === 0) {
                    stepsList.push(`Term ${idx + 1}: ${term} → 0 (constant rule)`);
                    return;
                }

                const newCoef = coef * power;
                const newPower = power - 1;

                if (newPower === 0) {
                    derivedTerms.push(newCoef.toString());
                    stepsList.push(`Term ${idx + 1}: d/dx(${term}) = ${newCoef}`);
                } else if (newPower === 1) {
                    derivedTerms.push(`${newCoef}x`);
                    stepsList.push(`Term ${idx + 1}: d/dx(${term}) = ${newCoef}x`);
                } else {
                    derivedTerms.push(`${newCoef}x^${newPower}`);
                    stepsList.push(`Term ${idx + 1}: d/dx(${term}) = ${newCoef}x^${newPower}`);
                }
            } else if (match[3] !== undefined) {
                // ax form
                const coef = parseCoef(match[3]);
                derivedTerms.push(coef.toString());
                stepsList.push(`Term ${idx + 1}: d/dx(${term}) = ${coef}`);
            } else if (match[4] !== undefined) {
                // constant
                stepsList.push(`Term ${idx + 1}: ${term} → 0 (constant rule)`);
            }
        });

        const result = derivedTerms.join(' + ').replace(/\+ -/g, '- ');
        return { result: result || '0', steps: stepsList };
    };

    const calculate = () => {
        if (!expression.trim()) {
            alert('Please enter an expression');
            return;
        }

        try {
            const { result, steps: derivSteps } = derivePolynomial(expression);
            setDerivative(result);
            setSteps([...derivSteps, `**Final answer:** d/dx(${expression}) = ${result}`]);
        } catch (error) {
            alert('Error calculating derivative. Please check your input.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="flex items-center justify-center gap-3">
                    <TrendingUp className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Derivative Calculator</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Calculate derivatives with step-by-step explanations
                </p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Enter your function:</h3>
                    <Input
                        placeholder="e.g., 3x^2 + 2x + 5"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="text-xl h-14 font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
                        Supported: x^n, ax^n, x, ax, constants. Use + and - to separate terms.
                    </p>
                </div>

                <Button onClick={calculate} className="w-full h-12 text-lg font-bold">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Calculate Derivative
                </Button>
            </Card>

            {derivative && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    <Card className="p-8">
                        <h3 className="text-2xl font-black mb-6">Step-by-Step Solution</h3>
                        <div className="space-y-4">
                            {steps.map((step, idx) => (
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
                        <h3 className="text-2xl font-black mb-4">Final Answer</h3>
                        <p className="text-3xl font-mono font-bold text-primary">{derivative}</p>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
