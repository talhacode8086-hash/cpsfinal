"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SyntheticDivisionCalculator() {
    const [coeffsInput, setCoeffsInput] = useState('1, -3, -10, 24');
    const [divisorRoot, setDivisorRoot] = useState('4');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        try {
            // Parse coefficients
            const coeffs = coeffsInput.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
            const c = parseFloat(divisorRoot);

            if (coeffs.length < 2 || isNaN(c)) {
                setResult(null);
                return;
            }

            // Perform synthetic division
            let currentRow = [];
            let resultCoeffs = [];

            // Bring down first coeff
            let prevVal = coeffs[0];
            resultCoeffs.push(prevVal);
            currentRow.push(prevVal); // First val is just brought down

            // Iteration
            for (let i = 1; i < coeffs.length; i++) {
                const multiplyVal = prevVal * c;
                const addVal = coeffs[i] + multiplyVal;

                currentRow.push({
                    original: coeffs[i],
                    multiply: multiplyVal,
                    result: addVal
                });

                prevVal = addVal;
                resultCoeffs.push(addVal);
            }

            const remainder = resultCoeffs[resultCoeffs.length - 1];
            const quotient = resultCoeffs.slice(0, resultCoeffs.length - 1);

            setResult({
                coeffs,
                c,
                rows: currentRow,
                quotient,
                remainder
            });

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Synthetic Division Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Divide polynomials by (x - c)</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Polynomial Coefficients</Label>
                        <Input
                            value={coeffsInput}
                            onChange={(e) => setCoeffsInput(e.target.value)}
                            placeholder="e.g. 1, -3, -10, 24 (for x^3 - 3x^2 - 10x + 24)"
                        />
                        <p className="text-xs text-muted-foreground">Enter coefficients from highest degree to constant.</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Divisor Root (c)</Label>
                        <Input
                            value={divisorRoot}
                            onChange={(e) => setDivisorRoot(e.target.value)}
                            placeholder="e.g. 4 (for divisor x - 4)"
                        />
                    </div>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate Division
                </Button>

                {result && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5">
                        <div className="overflow-x-auto p-4 bg-muted/20 rounded-xl border border-border/50">
                            <table className="w-full text-right font-mono text-lg border-collapse">
                                <tbody>
                                    {/* Row 1: Original Coeffs */}
                                    <tr>
                                        <td className="pr-4 py-2 border-r border-primary/20 font-bold text-primary">{result.c}</td>
                                        {result.coeffs.map((val: number, idx: number) => (
                                            <td key={idx} className="px-4 py-2">{val}</td>
                                        ))}
                                    </tr>
                                    {/* Row 2: Multiplied values */}
                                    <tr>
                                        <td className="pr-4 py-2 border-r border-primary/20"></td>
                                        <td className="px-4 py-2">↓</td>
                                        {result.rows.map((row: any, idx: number) => (
                                            <td key={idx} className="px-4 py-2 text-muted-foreground text-sm">
                                                {row.multiply !== undefined ? row.multiply.toFixed(2).replace(/\.00$/, '') : ''}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Divider */}
                                    <tr>
                                        <td colSpan={result.coeffs.length + 1} className="border-t border-primary/50"></td>
                                    </tr>
                                    {/* Row 3: Result Coeffs */}
                                    <tr>
                                        <td className="pr-4 py-2 border-r border-primary/20"></td>
                                        {result.quotient.map((val: number, idx: number) => (
                                            <td key={idx} className="px-4 py-2 font-bold">{val}</td>
                                        ))}
                                        <td className="px-4 py-2 font-bold text-primary bg-primary/5 rounded">
                                            {result.remainder}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-6 rounded-2xl bg-secondary/20 border border-primary/10">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Interpretation</h3>
                            <p className="text-lg">
                                <span className="text-muted-foreground">Quotient:</span> <span className="font-mono font-bold mx-2">
                                    {result.quotient.map((c: number, i: number) => {
                                        const power = result.quotient.length - 1 - i;
                                        if (power === 0) return `${c}`;
                                        if (power === 1) return `${c}x + `;
                                        return `${c}x^${power} + `;
                                    }).join('').replace(/\+ -/g, '- ').replace(/\+ $/, '')}
                                </span>
                            </p>
                            <p className="text-lg mt-2">
                                <span className="text-muted-foreground">Remainder:</span> <span className="font-mono font-bold mx-2">{result.remainder}</span>
                            </p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
