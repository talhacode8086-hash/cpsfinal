'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Hash } from 'lucide-react';

export default function LCMGCFCalculator() {
    const [numbers, setNumbers] = useState('');
    const [result, setResult] = useState<any>(null);

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const lcm = (a: number, b: number): number => {
        return (a * b) / gcd(a, b);
    };

    const calculate = () => {
        const nums = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
        if (nums.length < 2) return;

        let gcdResult = nums[0];
        let lcmResult = nums[0];

        for (let i = 1; i < nums.length; i++) {
            gcdResult = gcd(gcdResult, nums[i]);
            lcmResult = lcm(lcmResult, nums[i]);
        }

        setResult({ gcd: gcdResult, lcm: lcmResult, numbers: nums });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Hash className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">LCM & GCF Calculator</h1>
                </div>
                <p className="text-muted-foreground">Find Least Common Multiple and Greatest Common Factor</p>
            </div>

            <Card className="p-8 space-y-6">
                <Input
                    placeholder="Enter numbers (comma-separated, e.g., 12, 18, 24)"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                />
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <p className="text-lg">Numbers: {result.numbers.join(', ')}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="font-bold text-sm text-muted-foreground">GCF (Greatest Common Factor)</p>
                            <p className="text-4xl font-bold text-primary mt-2">{result.gcd}</p>
                        </div>
                        <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="font-bold text-sm text-muted-foreground">LCM (Least Common Multiple)</p>
                            <p className="text-4xl font-bold text-primary mt-2">{result.lcm}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
