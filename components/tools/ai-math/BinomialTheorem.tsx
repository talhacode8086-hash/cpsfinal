'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Binary } from 'lucide-react';

export default function BinomialTheorem() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [n, setN] = useState('');
    const [result, setResult] = useState<any>(null);

    const factorial = (num: number): number => {
        if (num <= 1) return 1;
        return num * factorial(num - 1);
    };

    const binomialCoeff = (n: number, k: number): number => {
        return factorial(n) / (factorial(k) * factorial(n - k));
    };

    const expand = () => {
        const aVal = parseFloat(a);
        const bVal = parseFloat(b);
        const nVal = parseInt(n);

        if (isNaN(aVal) || isNaN(bVal) || isNaN(nVal) || nVal < 0 || nVal > 10) return;

        const terms: string[] = [];
        for (let k = 0; k <= nVal; k++) {
            const coeff = binomialCoeff(nVal, k);
            const aPower = nVal - k;
            const bPower = k;
            const termValue = coeff * Math.pow(aVal, aPower) * Math.pow(bVal, bPower);

            const termStr = `${coeff}·${aVal}^${aPower}·${bVal}^${bPower} = ${termValue.toFixed(2)}`;
            terms.push(termStr);
        }

        setResult({ terms, formula: `(${aVal} + ${bVal})^${nVal}` });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Binary className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Binomial Theorem Expander</h1>
                </div>
                <p className="text-muted-foreground">Expand (a + b)ⁿ using binomial theorem</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <Input placeholder="a" value={a} onChange={(e) => setA(e.target.value)} type="number" step="any" />
                    <Input placeholder="b" value={b} onChange={(e) => setB(e.target.value)} type="number" step="any" />
                    <Input placeholder="n (max 10)" value={n} onChange={(e) => setN(e.target.value)} type="number" max="10" />
                </div>
                <Button onClick={expand} className="w-full h-12">Expand</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <h3 className="text-2xl font-black">{result.formula}</h3>
                    <div className="space-y-2">
                        {result.terms.map((term: string, idx: number) => (
                            <div key={idx} className="p-3 bg-muted rounded-lg font-mono text-sm">
                                Term {idx + 1}: {term}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
}
