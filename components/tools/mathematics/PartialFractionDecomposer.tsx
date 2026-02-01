"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Info } from 'lucide-react';

export default function PartialFractionDecomposer() {
    const [numerator, setNumerator] = useState('2x + 3');
    const [denominatorFactors, setDenominatorFactors] = useState('x - 1, x + 2');
    const [result, setResult] = useState<string | null>(null);
    const [steps, setSteps] = useState<string[]>([]);

    // Simple parser for standard form ax^2 + bx + c or ax + b
    // Returns a function that evaluates P(x)
    const parsePolynomial = (polyStr: string) => {
        // Remove spaces
        const str = polyStr.replace(/\s+/g, '').replace(/-/g, '+-');
        const terms = str.split('+').filter(t => t.length > 0);

        let coeffs = { 0: 0 }; // power -> coeff

        terms.forEach(term => {
            let coeff = 1;
            let power = 0;

            if (term.includes('x')) {
                const parts = term.split('x');
                let coeffStr = parts[0];
                if (coeffStr === '' || coeffStr === '+') coeff = 1;
                else if (coeffStr === '-') coeff = -1;
                else coeff = parseFloat(coeffStr);

                if (parts[1] && parts[1].startsWith('^')) {
                    power = parseInt(parts[1].substring(1));
                } else {
                    power = 1;
                }
            } else {
                coeff = parseFloat(term);
                power = 0;
            }

            // @ts-ignore
            coeffs[power] = (coeffs[power] || 0) + coeff;
        });

        return (x: number) => {
            let sum = 0;
            // @ts-ignore
            for (const [p, c] of Object.entries(coeffs)) {
                sum += c * Math.pow(x, parseInt(p));
            }
            return sum;
        };
    };

    const parseLinearFactors = (factorsStr: string) => {
        // Expects comma separated "x - 1", "2x + 3"
        return factorsStr.split(',').map(f => f.trim()).filter(f => f.length > 0);
    };

    const getRootFromLinearFactor = (factor: string): number | null => {
        // Assumes form ax + b or x - c
        // Normalize
        let f = factor.replace(/\s+/g, '');
        // Find x position
        let xIdx = f.indexOf('x');
        if (xIdx === -1) return null; // Not linear?

        let a = 1;
        let b = 0;

        let aStr = f.substring(0, xIdx);
        if (aStr === '' || aStr === '+') a = 1;
        else if (aStr === '-') a = -1;
        else a = parseFloat(aStr);

        let bStr = f.substring(xIdx + 1);
        if (bStr === '') b = 0;
        else b = parseFloat(bStr);

        // Root: ax + b = 0 => x = -b/a
        return -b / a;
    };

    const calculate = () => {
        try {
            const P = parsePolynomial(numerator);
            const factors = parseLinearFactors(denominatorFactors);
            let roots = [];
            let valid = true;

            for (const f of factors) {
                const r = getRootFromLinearFactor(f);
                if (r === null || isNaN(r)) {
                    setResult(`Could not parse factor: "${f}". Ensure linear factors like 'x-1'.`);
                    setSteps([]);
                    return;
                }
                roots.push({ root: r, factor: f });
            }

            // Check if roots are distinct (simple check)
            const rootValues = roots.map(r => r.root);
            const distinctRoots = new Set(rootValues);
            if (distinctRoots.size !== roots.length) {
                setResult("Repeated factors are not supported in this simplified version yet.");
                return;
            }

            let methodSteps = [];
            methodSteps.push("Using Heaviside Cover-up Method for distinct linear factors.");

            let finalParts = [];

            for (let i = 0; i < roots.length; i++) {
                const current = roots[i];
                const r = current.root;

                // Calculate P(r)
                const numVal = P(r);

                // Calculate Q_others(r) product
                let denomVal = 1;
                let denomCalcStr = "";

                for (let j = 0; j < roots.length; j++) {
                    if (i === j) continue;
                    // Evaluate factor j at r
                    // If factor is (ax+b), val = a*r + b. But wait, we parsed root.
                    // We can just evaluate the expression string-wise?
                    // Or re-use parser?
                    // Let's use the root formulation: factor j value at r.
                    // Actually, for Heavside on A/(x-r), we evaluate everything else at x=r.
                    // If factor came as "2x - 3" (root 1.5), and we have "x - 1" (root 1).
                    // We need to evaluate "2x - 3" at x=1.

                    // Let's quickly re-parse the factor to get a and b to evaluate it.
                    let f = roots[j].factor.replace(/\s+/g, '');
                    let xIdx = f.indexOf('x');
                    let a = 1;
                    let bTerm = 0;
                    let aStr = f.substring(0, xIdx);
                    if (aStr === '' || aStr === '+') a = 1; else if (aStr === '-') a = -1; else a = parseFloat(aStr);
                    let bStr = f.substring(xIdx + 1);
                    if (bStr !== '') bTerm = parseFloat(bStr);

                    let val = a * r + bTerm;
                    denomVal *= val;
                    denomCalcStr += `(${val.toFixed(2)})`;
                }

                const A = numVal / denomVal;

                // Keep it nice if integer
                const A_disp = Number.isInteger(A) ? A.toString() : A.toFixed(2);

                methodSteps.push(`For factor ${current.factor} (root x = ${r}):`);
                methodSteps.push(`  Numerator at ${r} = ${numVal.toFixed(2)}`);
                methodSteps.push(`  Denominator (others) at ${r} = ${denomVal.toFixed(2)}`);
                methodSteps.push(`  Coeff = ${numVal.toFixed(2)} / ${denomVal.toFixed(2)} = ${A_disp}`);

                finalParts.push(`${A_disp} / (${current.factor})`);
            }

            setResult(finalParts.join(" + "));
            setSteps(methodSteps);

        } catch (e) {
            setResult("Error calculating. Please check input formats.");
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Partial Fraction Decomposer</CardTitle>
                <p className="text-muted-foreground mt-2">Decompose rational functions with distinct linear factors</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Numerator Polynomial P(x)</Label>
                        <Input
                            value={numerator}
                            onChange={(e) => setNumerator(e.target.value)}
                            placeholder="e.g. 2x + 1 or 3x^2 - x + 5"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Denominator Factors (comma separated)</Label>
                        <Input
                            value={denominatorFactors}
                            onChange={(e) => setDenominatorFactors(e.target.value)}
                            placeholder="e.g. x - 1, x + 2"
                        />
                        <p className="text-xs text-muted-foreground">Currently supports distinct linear factors only.</p>
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Decompose
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        <div className="p-6 rounded-2xl bg-secondary/20 border border-primary/10">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">Result</h3>
                            <div className="text-xl font-mono">
                                {result}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest pl-2">Steps</h3>
                            {steps.map((s, i) => (
                                <div key={i} className="pl-4 text-sm font-mono border-l-2 border-primary/20 py-1">
                                    {s}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
