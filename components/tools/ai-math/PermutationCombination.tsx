'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PermutationCombination() {
    const [n, setN] = useState('');
    const [r, setR] = useState('');
    const [result, setResult] = useState<any>(null);

    const factorial = (num: number): number => {
        if (num <= 1) return 1;
        return num * factorial(num - 1);
    };

    const calculate = () => {
        const nNum = parseInt(n);
        const rNum = parseInt(r);
        if (nNum < rNum || nNum < 0 || rNum < 0) {
            alert('Invalid input: n must be >= r and both must be non-negative');
            return;
        }
        const perm = factorial(nNum) / factorial(nNum - rNum);
        const comb = perm / factorial(rNum);
        setResult({ permutation: perm, combination: comb });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">Permutation & Combination</h1></div>
            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="n (total items)" value={n} onChange={(e) => setN(e.target.value)} type="number" />
                    <Input placeholder="r (select)" value={r} onChange={(e) => setR(e.target.value)} type="number" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate</Button>
            </Card>
            {result && (
                <Card className="p-8 space-y-4">
                    <div><p className="font-bold text-lg">Permutation P(n,r)</p><p className="text-3xl font-mono">{result.permutation}</p></div>
                    <div><p className="font-bold text-lg">Combination C(n,r)</p><p className="text-3xl font-mono">{result.combination}</p></div>
                </Card>
            )}
        </div>
    );
}
