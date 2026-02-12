'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Divide } from 'lucide-react';

export default function FractionCalculator() {
    const [num1, setNum1] = useState('');
    const [den1, setDen1] = useState('');
    const [num2, setNum2] = useState('');
    const [den2, setDen2] = useState('');
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState<any>(null);

    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    const simplify = (num: number, den: number) => {
        const divisor = gcd(Math.abs(num), Math.abs(den));
        return { num: num / divisor, den: den / divisor };
    };

    const calculate = () => {
        const n1 = parseInt(num1);
        const d1 = parseInt(den1);
        const n2 = parseInt(num2);
        const d2 = parseInt(den2);

        if ([n1, d1, n2, d2].some(isNaN) || d1 === 0 || d2 === 0) return;

        let resultNum, resultDen;

        switch (operation) {
            case 'add':
                resultNum = n1 * d2 + n2 * d1;
                resultDen = d1 * d2;
                break;
            case 'subtract':
                resultNum = n1 * d2 - n2 * d1;
                resultDen = d1 * d2;
                break;
            case 'multiply':
                resultNum = n1 * n2;
                resultDen = d1 * d2;
                break;
            case 'divide':
                resultNum = n1 * d2;
                resultDen = d1 * n2;
                break;
            default:
                return;
        }

        const simplified = simplify(resultNum, resultDen);
        setResult({
            original: `${resultNum}/${resultDen}`,
            simplified: `${simplified.num}/${simplified.den}`,
            decimal: (resultNum / resultDen).toFixed(4)
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Divide className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Fraction Calculator</h1>
                </div>
                <p className="text-muted-foreground">Add, subtract, multiply, and divide fractions</p>
            </div>

            <Card className="p-8 space-y-6">
                <div className="grid grid-cols-5 gap-4 items-center">
                    <Input placeholder="Num" value={num1} onChange={(e) => setNum1(e.target.value)} type="number" />
                    <Input placeholder="Den" value={den1} onChange={(e) => setDen1(e.target.value)} type="number" />
                    <Select value={operation} onValueChange={setOperation}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="add">+</SelectItem>
                            <SelectItem value="subtract">-</SelectItem>
                            <SelectItem value="multiply">×</SelectItem>
                            <SelectItem value="divide">÷</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input placeholder="Num" value={num2} onChange={(e) => setNum2(e.target.value)} type="number" />
                    <Input placeholder="Den" value={den2} onChange={(e) => setDen2(e.target.value)} type="number" />
                </div>
                <Button onClick={calculate} className="w-full h-12">Calculate</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Result</p>
                            <p className="text-2xl font-mono">{result.original}</p>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="font-bold">Simplified</p>
                            <p className="text-2xl font-mono font-bold">{result.simplified}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Decimal</p>
                            <p className="text-2xl">{result.decimal}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
