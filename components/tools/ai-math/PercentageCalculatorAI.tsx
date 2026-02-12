'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Percent } from 'lucide-react';

export default function PercentageCalculator() {
    const [value, setValue] = useState('');
    const [percent, setPercent] = useState('');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        const val = parseFloat(value);
        const pct = parseFloat(percent);

        if (isNaN(val) || isNaN(pct)) return;

        const percentOf = (val * pct) / 100;
        const increase = val + percentOf;
        const decrease = val - percentOf;

        setResult({ percentOf, increase, decrease, value: val, percent: pct });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Percent className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Percentage Calculator</h1>
                </div>
                <p className="text-muted-foreground">Calculate percentages, increase, and decrease</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        placeholder="Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="number"
                        step="any"
                    />
                    <Input
                        placeholder="Percentage %"
                        value={percent}
                        onChange={(e) => setPercent(e.target.value)}
                        type="number"
                        step="any"
                    />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold text-sm text-muted-foreground">{result.percent}% of {result.value}</p>
                            <p className="text-3xl font-bold mt-2">{result.percentOf.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                            <p className="font-bold text-sm text-muted-foreground">{result.percent}% Increase</p>
                            <p className="text-3xl font-bold mt-2 text-green-600">{result.increase.toFixed(2)}</p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                            <p className="font-bold text-sm text-muted-foreground">{result.percent}% Decrease</p>
                            <p className="text-3xl font-bold mt-2 text-red-600">{result.decrease.toFixed(2)}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
