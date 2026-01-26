'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PrimeNumberAnalyzer() {
    const [num, setNum] = useState('101');
    const [result, setResult] = useState<any>(null);

    const checkPrime = () => {
        const n = parseInt(num);
        if (isNaN(n)) return;

        if (n < 2) {
            setResult({ isPrime: false, factors: [], next: 2 });
            return;
        }

        const factors = [];
        let d = 2;
        let temp = n;
        while (temp > 1) {
            if (temp % d === 0) {
                factors.push(d);
                temp /= d;
            } else {
                d++;
                if (d * d > temp) {
                    factors.push(temp);
                    break;
                }
            }
        }

        const isPrime = factors.length === 1;
        setResult({ isPrime, factors, n });
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Hash className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Prime Number Analyzer</CardTitle>
                <p className="text-muted-foreground mt-2">Check for primality and explore prime factorization with high-speed mathematical algorithms.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex gap-6 max-w-xl mx-auto">
                    <Input
                        type="number"
                        value={num}
                        onChange={(e) => setNum(e.target.value)}
                        placeholder="Enter a number..."
                        className="h-16 rounded-2xl text-4xl font-black text-center bg-background border-primary/20"
                    />
                    <Button onClick={checkPrime} className="h-16 px-12 rounded-2xl text-lg font-black bg-primary">
                        ANALYZE
                    </Button>
                </div>

                {result && (
                    <div className="space-y-8 animate-in zoom-in-95 duration-500">
                        <div className={`p-12 rounded-[4rem] border-4 transition-all flex flex-col items-center justify-center gap-4 ${result.isPrime ? 'bg-green-500/10 border-green-500/20 text-green-600' : 'bg-amber-500/10 border-amber-500/20 text-amber-600'}`}>
                            {result.isPrime ? <CheckCircle2 className="h-12 w-12" /> : <AlertCircle className="h-12 w-12" />}
                            <h3 className="text-5xl font-black uppercase tracking-tighter">
                                {result.n} is {result.isPrime ? 'PRIME' : 'COMPOSITE'}
                            </h3>
                            <p className="text-sm font-bold opacity-60">
                                {result.isPrime ? 'This number only has 1 and itself as factors.' : `This number has ${new Set(result.factors).size} unique prime factors.`}
                            </p>
                        </div>

                        {!result.isPrime && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-3xl bg-muted/20 border border-primary/5 space-y-4">
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest pl-2">Prime Factors</p>
                                    <div className="flex flex-wrap gap-3">
                                        {result.factors.map((f: number, i: number) => (
                                            <div key={i} className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl font-black text-primary">
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 rounded-3xl bg-muted/20 border border-primary/5 flex flex-col justify-center items-center text-center">
                                    <p className="text-[10px] font-black uppercase text-primary/40 tracking-widest mb-2">Scientific Notation</p>
                                    <p className="text-2xl font-black font-mono">
                                        {Array.from(new Set(result.factors)).map((f: any) => {
                                            const count = result.factors.filter((x: any) => x === f).length;
                                            return count > 1 ? `${f}^${count}` : `${f}`;
                                        }).join(' Ã— ')}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="text-xs font-black uppercase text-primary mb-1">Number Theory Insight</p>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                            Prime numbers are the atoms of mathematics. Every integer greater than 1 is either a prime or a unique product of prime numbers.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
