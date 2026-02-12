'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sigma } from 'lucide-react';

export default function StatisticsCalc() {
    const [data, setData] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const numbers = data.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        if (numbers.length === 0) return;

        const sorted = [...numbers].sort((a, b) => a - b);
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const median = numbers.length % 2 === 0
            ? (sorted[numbers.length / 2 - 1] + sorted[numbers.length / 2]) / 2
            : sorted[Math.floor(numbers.length / 2)];

        const freq: any = {};
        numbers.forEach(n => freq[n] = (freq[n] || 0) + 1);
        const mode = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);

        setResult({ mean, median, mode: parseFloat(mode), count: numbers.length, sorted });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">Statistics Calculator</h1></div>
            <Card className="p-8 space-y-6">
                <Input placeholder="Enter numbers (comma-separated)" value={data} onChange={(e) => setData(e.target.value)} />
                <Button onClick={calculate} className="w-full"><Sigma className="mr-2" />Calculate</Button>
            </Card>
            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">Mean</p><p className="text-2xl">{result.mean.toFixed(2)}</p></div>
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">Median</p><p className="text-2xl">{result.median.toFixed(2)}</p></div>
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">Mode</p><p className="text-2xl">{result.mode}</p></div>
                        <div className="p-4 bg-muted rounded-lg"><p className="font-bold">Count</p><p className="text-2xl">{result.count}</p></div>
                    </div>
                </Card>
            )}
        </div>
    );
}
