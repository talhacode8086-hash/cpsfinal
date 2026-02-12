'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LogarithmCalc() {
    const [number, setNumber] = useState('');
    const [base, setBase] = useState('10');
    const [result, setResult] = useState<string>('');

    const calculate = () => {
        const num = parseFloat(number);
        const b = parseFloat(base);
        if (num <= 0) {
            setResult('Error: Number must be positive');
            return;
        }
        const log = Math.log(num) / Math.log(b);
        setResult(`log₍${b}₎(${num}) = ${log.toFixed(6)}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center"><h1 className="text-4xl font-black">Logarithm Calculator</h1></div>
            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} type="number" step="any" />
                    <Input placeholder="Base" value={base} onChange={(e) => setBase(e.target.value)} type="number" step="any" />
                </div>
                <Button onClick={calculate} className="w-full">Calculate Log</Button>
            </Card>
            {result && <Card className="p-8"><p className="text-2xl font-mono">{result}</p></Card>}
        </div>
    );
}
