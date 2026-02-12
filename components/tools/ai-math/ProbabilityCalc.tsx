'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProbabilityCalc() {
    const [favorable, setFavorable] = useState('');
    const [total, setTotal] = useState('');
    const [result, setResult] = useState<string>('');

    const calculate = () => {
        const f = parseFloat(favorable);
        const t = parseFloat(total);
        if (t === 0) {
            setResult('Error: Total cannot be zero');
            return;
        }
        const prob = f / t;
        const percentage = (prob * 100).toFixed(2);
        setResult(`P = ${prob.toFixed(4)} or ${percentage}%`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">Probability Calculator</h1></div>
            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Favorable outcomes" value={favorable} onChange={(e) => setFavorable(e.target.value)} type="number" />
                    <Input placeholder="Total outcomes" value={total} onChange={(e) => setTotal(e.target.value)} type="number" />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate Probability</Button>
            </Card>
            {result && <Card className="p-8"><p className="text-3xl font-mono">{result}</p></Card>}
        </div>
    );
}
