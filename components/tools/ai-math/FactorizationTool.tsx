'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SplitSquareVertical } from 'lucide-react';

export default function FactorizationTool() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState<any>(null);

    const factorize = () => {
        // Parse simple quadratic: ax^2 + bx + c
        const match = expression.match(/([+-]?\d*\.?\d*)x\^2\s*([+-]?\s*\d*\.?\d*)x\s*([+-]?\s*\d+\.?\d*)/);

        if (!match) {
            setResult({ error: 'Please enter in format: ax² + bx + c' });
            return;
        }

        const parseCoef = (val: string | undefined) => {
            if (!val) return 0;
            const str = val.replace(/\s/g, '');
            if (!str || str === '+') return 1;
            if (str === '-') return -1;
            return parseFloat(str);
        };

        const a = parseCoef(match[1]);
        const b = parseCoef(match[2]);
        const c = parseCoef(match[3]);

        // Find factors
        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            setResult({
                factors: 'Cannot factor over real numbers (complex roots)',
                discriminant,
                steps: [`Discriminant = b² - 4ac = ${discriminant}`, 'Since discriminant < 0, roots are complex']
            });
            return;
        }

        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

        // Express as factors: a(x - r1)(x - r2)
        const factored = `${a === 1 ? '' : a}(x - ${root1.toFixed(2)})(x - ${root2.toFixed(2)})`;

        setResult({
            factors: factored,
            root1,
            root2,
            discriminant,
            steps: [
                `Given: ${a}x² + ${b}x + ${c}`,
                `Discriminant = ${b}² - 4(${a})(${c}) = ${discriminant}`,
                `Roots: x = (-b ± √discriminant) / 2a`,
                `x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}`,
                `Factored form: ${factored}`
            ]
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <SplitSquareVertical className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Factorization Tool</h1>
                </div>
                <p className="text-muted-foreground">Factor quadratic expressions into linear factors</p>
            </div>

            <Card className="p-8 space-y-6">
                <Input
                    placeholder="e.g., x^2 - 5x + 6 or 2x^2 + 7x + 3"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="font-mono text-lg h-14"
                />
                <Button onClick={factorize} className="w-full h-12 text-lg">Factor Expression</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    {result.error ? (
                        <p className="text-destructive">{result.error}</p>
                    ) : (
                        <>
                            <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                                <p className="font-bold mb-2">Factored Form:</p>
                                <p className="text-3xl font-mono font-bold">{result.factors}</p>
                            </div>
                            <div className="space-y-2 mt-6">
                                <p className="font-bold">Steps:</p>
                                {result.steps?.map((step: string, idx: number) => (
                                    <div key={idx} className="p-3 bg-muted rounded-lg font-mono text-sm">
                                        {idx + 1}. {step}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Card>
            )}
        </div>
    );
}
