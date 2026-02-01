"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, ChevronRight, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as math from 'mathjs';

export default function AlgebraSolver() {
    const [mode, setMode] = useState('linear');
    const [inputA, setInputA] = useState('');
    const [inputB, setInputB] = useState('');
    const [inputC, setInputC] = useState('');
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const solve = () => {
        setError('');
        setResult(null);

        try {
            if (mode === 'linear') { // Ax + B = 0 => x = -B/A
                const a = parseFloat(inputA);
                const b = parseFloat(inputB);
                if (isNaN(a) || isNaN(b)) throw new Error("Please enter valid numbers.");
                if (a === 0) throw new Error("Coefficient 'a' cannot be zero for a linear equation.");

                const x = -b / a;
                setResult({
                    steps: [
                        `Equation: ${a}x + ${b} = 0`,
                        `Subtract ${b} from both sides: ${a}x = ${-b}`,
                        `Divide by ${a}: x = ${-b} / ${a}`,
                        `Result: x = ${x}`
                    ],
                    final: `x = ${x}`
                });
            } else if (mode === 'quadratic') { // Ax² + Bx + C = 0
                const a = parseFloat(inputA);
                const b = parseFloat(inputB);
                const c = parseFloat(inputC);

                if (isNaN(a) || isNaN(b) || isNaN(c)) throw new Error("Please enter valid numbers.");
                if (a === 0) throw new Error("Coefficient 'a' cannot be zero for a quadratic equation.");

                const discriminant = b * b - 4 * a * c;
                const steps = [
                    `Equation: ${a}x² + ${b}x + ${c} = 0`,
                    `Identify coefficients: a=${a}, b=${b}, c=${c}`,
                    `Calculate Discriminant (Δ) = b² - 4ac`,
                    `Δ = (${b})² - 4(${a})(${c}) = ${b * b} - ${4 * a * c} = ${discriminant}`
                ];

                if (discriminant > 0) {
                    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                    steps.push(`Discriminant > 0, so there are two real roots.`);
                    steps.push(`x = (-b ± √Δ) / 2a`);
                    steps.push(`x₁ = (${-b} + ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = ${x1.toFixed(4)}`);
                    steps.push(`x₂ = (${-b} - ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = ${x2.toFixed(4)}`);
                    setResult({ steps, final: `x₁ = ${x1}, x₂ = ${x2}` });
                } else if (discriminant === 0) {
                    const x = -b / (2 * a);
                    steps.push(`Discriminant = 0, so there is one real root.`);
                    steps.push(`x = -b / 2a = ${-b} / ${2 * a}`);
                    setResult({ steps, final: `x = ${x}` });
                } else {
                    const realPart = (-b / (2 * a)).toFixed(4);
                    const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
                    steps.push(`Discriminant < 0, so there are two complex roots.`);
                    steps.push(`x = (-b ± i√|Δ|) / 2a`);
                    setResult({ steps, final: `x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i` });
                }
            } else if (mode === 'expression') {
                // Use mathjs for simplifying or expanding
                const simplified = math.simplify(inputA).toString();
                setResult({
                    steps: [`Original: ${inputA}`],
                    final: `Simplified: ${simplified}`
                });
            }
        } catch (err: any) {
            setError(err.message || "An error occurred.");
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Algebra Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Solve Linear, Quadratic equations and simplify expressions.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex justify-center mb-6">
                    <Select value={mode} onValueChange={(m) => { setMode(m); setResult(null); setError(''); setInputA(''); setInputB(''); setInputC(''); }}>
                        <SelectTrigger className="w-[280px] h-12 text-lg font-medium">
                            <SelectValue placeholder="Select Equation Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="linear">Linear Equation (Ax + B = 0)</SelectItem>
                            <SelectItem value="quadratic">Quadratic Equation (Ax² + Bx + C = 0)</SelectItem>
                            <SelectItem value="expression">Simplify Expression</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-6">
                    {mode === 'expression' ? (
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Expression</label>
                            <Input
                                placeholder="e.g., 2x + 3x + 5"
                                value={inputA}
                                onChange={(e) => setInputA(e.target.value)}
                                className="h-14 text-lg"
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Coefficient A</label>
                                <Input
                                    type="number"
                                    placeholder={mode === 'linear' ? "Slope (m)" : "a (x²)"}
                                    value={inputA}
                                    onChange={(e) => setInputA(e.target.value)}
                                    className="h-14 text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Coefficient B</label>
                                <Input
                                    type="number"
                                    placeholder={mode === 'linear' ? "Intercept (c)" : "b (x)"}
                                    value={inputB}
                                    onChange={(e) => setInputB(e.target.value)}
                                    className="h-14 text-lg"
                                />
                            </div>
                            {mode === 'quadratic' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Coefficient C</label>
                                    <Input
                                        type="number"
                                        placeholder="Constant (c)"
                                        value={inputC}
                                        onChange={(e) => setInputC(e.target.value)}
                                        className="h-14 text-lg"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <Button onClick={solve} size="lg" className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                        Solve Equation <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="p-6 rounded-3xl bg-secondary/20 border border-primary/10">
                            <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Solution</h3>
                            <div className="text-3xl font-bold font-mono text-foreground break-all">{result.final}</div>
                        </div>

                        {result.steps && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Step-by-Step</h3>
                                <div className="space-y-3">
                                    {result.steps.map((step: string, i: number) => (
                                        <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="text-lg font-medium">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
