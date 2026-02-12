'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, TrendingUp, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuadraticSolver() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [solution, setSolution] = useState<any>(null);

    const solve = () => {
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const cNum = parseFloat(c);

        if (isNaN(aNum) || isNaN(bNum) || isNaN(cNum) || aNum === 0) {
            alert('Please enter valid coefficients (a cannot be 0)');
            return;
        }

        const discriminant = bNum * bNum - 4 * aNum * cNum;
        const steps = [
            `**Given equation:** ${aNum}x² ${bNum >= 0 ? '+' : ''}${bNum}x ${cNum >= 0 ? '+' : ''}${cNum} = 0`,
            `**Step 1:** Identify coefficients: a = ${aNum}, b = ${bNum}, c = ${cNum}`,
            `**Step 2:** Calculate discriminant: Δ = b² - 4ac`,
            `Δ = (${bNum})² - 4(${aNum})(${cNum})`,
            `Δ = ${bNum * bNum} - ${4 * aNum * cNum}`,
            `Δ = ${discriminant}`,
        ];

        let roots: any = {};
        let nature = '';

        if (discriminant > 0) {
            nature = 'Two distinct real roots';
            const root1 = (-bNum + Math.sqrt(discriminant)) / (2 * aNum);
            const root2 = (-bNum - Math.sqrt(discriminant)) / (2 * aNum);
            roots = { root1, root2 };
            steps.push(
                `**Step 3:** Since Δ > 0, we have two real and distinct roots`,
                `Using the quadratic formula: x = (-b ± √Δ) / (2a)`,
                `x₁ = (-${bNum} + √${discriminant}) / (2 × ${aNum}) = ${root1.toFixed(4)}`,
                `x₂ = (-${bNum} - √${discriminant}) / (2 × ${aNum}) = ${root2.toFixed(4)}`
            );
        } else if (discriminant === 0) {
            nature = 'One repeated real root';
            const root = -bNum / (2 * aNum);
            roots = { root };
            steps.push(
                `**Step 3:** Since Δ = 0, we have one repeated real root`,
                `x = -b / (2a)`,
                `x = -${bNum} / (2 × ${aNum}) = ${root.toFixed(4)}`
            );
        } else {
            nature = 'Two complex roots (no real solutions)';
            const realPart = -bNum / (2 * aNum);
            const imagPart = Math.sqrt(Math.abs(discriminant)) / (2 * aNum);
            roots = { realPart, imagPart };
            steps.push(
                `**Step 3:** Since Δ < 0, we have complex roots`,
                `x = (-b ± i√|Δ|) / (2a)`,
                `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`,
                `x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`
            );
        }

        setSolution({ steps, roots, discriminant, nature });
    };

    const reset = () => {
        setA('');
        setB('');
        setC('');
        setSolution(null);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="flex items-center justify-center gap-3">
                    <Calculator className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Quadratic Equation Solver</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Solve equations in the form ax² + bx + c = 0 with step-by-step solutions
                </p>
            </motion.div>

            {/* Input Card */}
            <Card className="p-8 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Enter coefficients:</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="a">Coefficient a (x²)</Label>
                            <Input
                                id="a"
                                type="number"
                                step="any"
                                placeholder="e.g., 1"
                                value={a}
                                onChange={(e) => setA(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="b">Coefficient b (x)</Label>
                            <Input
                                id="b"
                                type="number"
                                step="any"
                                placeholder="e.g., -5"
                                value={b}
                                onChange={(e) => setB(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="c">Constant c</Label>
                            <Input
                                id="c"
                                type="number"
                                step="any"
                                placeholder="e.g., 6"
                                value={c}
                                onChange={(e) => setC(e.target.value)}
                                className="text-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button onClick={solve} className="flex-1 h-12 text-lg font-bold">
                        <Calculator className="mr-2 h-5 w-5" />
                        Solve Equation
                    </Button>
                    <Button onClick={reset} variant="outline" className="h-12">
                        Reset
                    </Button>
                </div>
            </Card>

            {/* Solution Display */}
            {solution && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    {/* Nature of Roots */}
                    <Card className="p-6 bg-primary/5 border-primary/20">
                        <div className="flex items-center gap-3">
                            <Check className="h-6 w-6 text-primary" />
                            <div>
                                <h4 className="font-bold text-lg">Nature of Roots</h4>
                                <p className="text-muted-foreground">{solution.nature}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Step by Step Solution */}
                    <Card className="p-8">
                        <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                            <TrendingUp className="h-6 w-6 text-primary" />
                            Step-by-Step Solution
                        </h3>
                        <div className="space-y-4">
                            {solution.steps.map((step: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-4 bg-muted/50 rounded-xl"
                                >
                                    <p className="text-base leading-relaxed">{step}</p>
                                </motion.div>
                            ))}
                        </div>
                    </Card>

                    {/* Final Answer */}
                    <Card className="p-8 bg-gradient-to-br from-primary/10 to-primary/5">
                        <h3 className="text-2xl font-black mb-4">Final Answer</h3>
                        <div className="space-y-2 text-lg">
                            {solution.discriminant > 0 && (
                                <>
                                    <p><strong>x₁ =</strong> {solution.roots.root1.toFixed(4)}</p>
                                    <p><strong>x₂ =</strong> {solution.roots.root2.toFixed(4)}</p>
                                </>
                            )}
                            {solution.discriminant === 0 && (
                                <p><strong>x =</strong> {solution.roots.root.toFixed(4)}</p>
                            )}
                            {solution.discriminant < 0 && (
                                <>
                                    <p><strong>x₁ =</strong> {solution.roots.realPart.toFixed(4)} + {solution.roots.imagPart.toFixed(4)}i</p>
                                    <p><strong>x₂ =</strong> {solution.roots.realPart.toFixed(4)} - {solution.roots.imagPart.toFixed(4)}i</p>
                                </>
                            )}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
