'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { List } from 'lucide-react';

export default function SequenceSeriesSolver() {
    const [type, setType] = useState<'AP' | 'GP'>('AP');
    const [a, setA] = useState('');
    const [d, setD] = useState('');
    const [n, setN] = useState('');
    const [result, setResult] = useState<any>(null);

    const solve = () => {
        const first = parseFloat(a);
        const diff = parseFloat(d);
        const terms = parseInt(n);

        if (isNaN(first) || isNaN(diff) || isNaN(terms)) return;

        if (type === 'AP') {
            // Arithmetic Progression
            const nthTerm = first + (terms - 1) * diff;
            const sum = (terms / 2) * (2 * first + (terms - 1) * diff);

            setResult({
                type: 'Arithmetic Progression',
                nthTerm,
                sum,
                formula: `aₙ = a + (n-1)d`,
                sumFormula: `Sₙ = n/2[2a + (n-1)d]`
            });
        } else {
            // Geometric Progression
            const nthTerm = first * Math.pow(diff, terms - 1);
            const sum = diff === 1 ? first * terms : first * (1 - Math.pow(diff, terms)) / (1 - diff);

            setResult({
                type: 'Geometric Progression',
                nthTerm,
                sum,
                formula: `aₙ = ar^(n-1)`,
                sumFormula: `Sₙ = a(1-rⁿ)/(1-r)`
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <List className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Sequence & Series Solver</h1>
                </div>
                <p className="text-muted-foreground">Solve Arithmetic and Geometric Progressions</p>
            </div>

            <Card className="p-8 space-y-6">
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="AP">Arithmetic Progression (AP)</SelectItem>
                        <SelectItem value="GP">Geometric Progression (GP)</SelectItem>
                    </SelectContent>
                </Select>

                <div className="grid grid-cols-3 gap-4">
                    <Input
                        placeholder={`First term (a)`}
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        type="number"
                        step="any"
                    />
                    <Input
                        placeholder={type === 'AP' ? 'Common diff (d)' : 'Common ratio (r)'}
                        value={d}
                        onChange={(e) => setD(e.target.value)}
                        type="number"
                        step="any"
                    />
                    <Input
                        placeholder="Number of terms (n)"
                        value={n}
                        onChange={(e) => setN(e.target.value)}
                        type="number"
                    />
                </div>

                <Button onClick={solve} className="w-full h-12">Solve</Button>
            </Card>

            {result && (
                <Card className="p-8 space-y-4">
                    <h3 className="text-2xl font-black">{result.type}</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">nth Term</p>
                            <p className="text-2xl font-mono">{result.nthTerm.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground mt-2">{result.formula}</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                            <p className="font-bold">Sum of n terms</p>
                            <p className="text-2xl font-mono">{result.sum.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground mt-2">{result.sumFormula}</p>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
