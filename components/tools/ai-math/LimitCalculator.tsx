'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Infinity } from 'lucide-react';

export default function LimitCalculator() {
    const [expression, setExpression] = useState('');
    const [point, setPoint] = useState('');
    const [result, setResult] = useState<string>('');

    const calculate = () => {
        const xVal = parseFloat(point);
        if (isNaN(xVal)) {
            setResult('Please enter a valid point');
            return;
        }

        // Parse polynomial like: 3x^2 + 2x - 5
        const terms = expression.replace(/\s/g, '').split(/(?=[+-])/);
        let total = 0;
        let isValid = true;

        terms.forEach(term => {
            if (!term) return;
            const match = term.match(/([+-]?\d*\.?\d*)x\^(\d+)|([+-]?\d*\.?\d*)x|([+-]?\d+\.?\d*)/);

            if (!match) {
                isValid = false;
                return;
            }

            const parseCoef = (str: string | undefined) => {
                if (!str || str === '+') return 1;
                if (str === '-') return -1;
                return parseFloat(str);
            };

            if (match[1] !== undefined && match[2] !== undefined) {
                // ax^n
                const coef = parseCoef(match[1]);
                const power = parseInt(match[2]);
                total += coef * Math.pow(xVal, power);
            } else if (match[3] !== undefined) {
                // ax
                const coef = parseCoef(match[3]);
                total += coef * xVal;
            } else if (match[4] !== undefined) {
                // constant
                const constant = parseCoef(match[4]);
                total += constant;
            }
        });

        if (!isValid) {
            setResult('Error: Only polynomials supported (e.g., x^2 + 2x + 1)');
            return;
        }

        setResult(`lim(x→${point}) ${expression} = ${total.toFixed(4)}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Infinity className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Limit Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate limits as x approaches a value</p>
            </div>

            <Card className="p-8 space-y-6">
                <Input
                    placeholder="Expression (e.g., x^2 + 2x)"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="font-mono text-lg"
                />
                <Input
                    placeholder="Point (x approaches...)"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                    type="number"
                    step="any"
                />
                <Button onClick={calculate} className="w-full h-12">Calculate Limit</Button>
            </Card>

            {result && (
                <Card className="p-8">
                    <p className="text-2xl font-mono">{result}</p>
                </Card>
            )}
        </div>
    );
}
