"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, RefreshCw, ChevronRight } from 'lucide-react';

export default function BinomialExpansionTool() {
    const [a, setA] = useState('x');
    const [b, setB] = useState('1');
    const [n, setN] = useState('3');
    const [result, setResult] = useState<string | null>(null);
    const [steps, setSteps] = useState<string[]>([]);

    const factorial = (num: number): number => {
        if (num < 0) return -1;
        if (num === 0) return 1;
        return num * factorial(num - 1);
    };

    const nCr = (n: number, r: number): number => {
        return factorial(n) / (factorial(r) * factorial(n - r));
    };

    const calculate = () => {
        const power = parseInt(n);
        if (isNaN(power) || power < 0) {
            setResult("Please enter a valid non-negative integer for n.");
            setSteps([]);
            return;
        }
        if (power > 20) {
            setResult("For performance reasons, maximum power is restricted to 20.");
            setSteps([]);
            return;
        }

        let expansion = "";
        let stepList = [];

        stepList.push(`Using Binomial Theorem: (a + b)^n = Σ (nCr) * a^(n-r) * b^r`);
        stepList.push(`Substituting values: a = ${a}, b = ${b}, n = ${power}`);

        for (let r = 0; r <= power; r++) {
            const coeff = nCr(power, r);
            let term = "";

            // Coefficient
            if (coeff !== 1) term += coeff;

            // First term part
            if (power - r > 0) {
                if (power - r === 1) term += `(${a})`;
                else term += `(${a})^${power - r}`;
            }

            // Second term part
            if (r > 0) {
                if (r === 1) term += `(${b})`;
                else term += `(${b})^${r}`;
            }

            // Handle case where term might be empty (if coeff 1 and powers 0, which implies result 1)
            if (term === "") term = "1";

            if (r > 0) expansion += " + ";
            expansion += term;
        }

        // Clean up formatting
        // This simple string concat doesn't simplify terms (like 2^3 -> 8), simpler for visualization first
        // Ideally we would parse 'a' and 'b' if they are numbers, but for symbolic inputs like '2x', formatting is tricky.
        // We stick to the structural expansion.

        setResult(expansion);
        setSteps(stepList);
    };

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Binomial Expansion Tool</CardTitle>
                <p className="text-muted-foreground mt-2">Expand (a + b)ⁿ using Pascal's Triangle</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                        <Label>First Term (a)</Label>
                        <Input
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                            placeholder="e.g. x, 2x, 3"
                            className="text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Second Term (b)</Label>
                        <Input
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            placeholder="e.g. y, -5, 1/x"
                            className="text-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Power (n)</Label>
                        <Input
                            type="number"
                            value={n}
                            onChange={(e) => setN(e.target.value)}
                            placeholder="e.g. 3, 5"
                            className="text-lg"
                            min="0"
                            max="20"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full h-12 text-lg font-bold bg-primary/90 hover:bg-primary">
                    Expand Expression
                </Button>

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="p-6 rounded-2xl bg-secondary/20 border border-primary/10">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Expansion Result</h3>
                                <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy Result">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="text-xl font-mono break-all leading-relaxed">
                                {result}
                            </div>
                        </div>

                        {steps.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-2">Calculation Steps</h3>
                                {steps.map((step, idx) => (
                                    <Alert key={idx} className="bg-card border-l-4 border-l-primary/50">
                                        <AlertDescription className="font-mono text-sm">{step}</AlertDescription>
                                    </Alert>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
