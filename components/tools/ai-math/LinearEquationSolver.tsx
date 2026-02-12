'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp } from 'lucide-react';

export default function LinearEquationSolver() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [solution, setSolution] = useState<string>('');

    const solve = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        if (aNum === 0) {
            setSolution(bNum === 0 ? 'Infinite solutions (0 = 0)' : 'No solution');
        } else {
            const x = -bNum / aNum;
            setSolution(`x = ${x.toFixed(4)}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black">Linear Equation Solver</h1>
                <p className="text-muted-foreground">Solve equations of the form ax + b = 0</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <Input placeholder="Coefficient a" value={a} onChange={(e) => setA(e.target.value)} type="number" step="any" />
                    <Input placeholder="Constant b" value={b} onChange={(e) => setB(e.target.value)} type="number" step="any" />
                </div>
                <Button onClick={solve} className="w-full h-12"><TrendingUp className="mr-2" />Solve</Button>
            </Card>

            {solution && (
                <Card className="p-8 bg-primary/5">
                    <h3 className="text-2xl font-black mb-4">Solution</h3>
                    <p className="text-3xl font-mono">{solution}</p>
                </Card>
            )}
        </div>
    );
}
