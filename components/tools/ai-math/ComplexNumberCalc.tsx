'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Workflow } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ComplexNumberCalc() {
    const [a1, setA1] = useState('');
    const [b1, setB1] = useState('');
    const [a2, setA2] = useState('');
    const [b2, setB2] = useState('');
    const [result, setResult] = useState<any>(null);

    const add = () => {
        const real = (parseFloat(a1) || 0) + (parseFloat(a2) || 0);
        const imag = (parseFloat(b1) || 0) + (parseFloat(b2) || 0);
        setResult({ real, imag, operation: 'Addition', formula: `(${a1} + ${b1}i) + (${a2} + ${b2}i) = ${real} + ${imag}i` });
    };

    const subtract = () => {
        const real = (parseFloat(a1) || 0) - (parseFloat(a2) || 0);
        const imag = (parseFloat(b1) || 0) - (parseFloat(b2) || 0);
        setResult({ real, imag, operation: 'Subtraction', formula: `(${a1} + ${b1}i) - (${a2} + ${b2}i) = ${real} + ${imag}i` });
    };

    const multiply = () => {
        const real = (parseFloat(a1) || 0) * (parseFloat(a2) || 0) - (parseFloat(b1) || 0) * (parseFloat(b2) || 0);
        const imag = (parseFloat(a1) || 0) * (parseFloat(b2) || 0) + (parseFloat(b1) || 0) * (parseFloat(a2) || 0);
        setResult({ real, imag, operation: 'Multiplication', formula: `(${a1} + ${b1}i) × (${a2} + ${b2}i) = ${real} + ${imag}i` });
    };

    const modulus = () => {
        const mod1 = Math.sqrt((parseFloat(a1) || 0) ** 2 + (parseFloat(b1) || 0) ** 2);
        const mod2 = Math.sqrt((parseFloat(a2) || 0) ** 2 + (parseFloat(b2) || 0) ** 2);
        setResult({ mod1, mod2, operation: 'Modulus', formula: `|z₁| = ${mod1.toFixed(4)}, |z₂| = ${mod2.toFixed(4)}` });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <Workflow className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Complex Number Calculator</h1>
                </div>
                <p className="text-muted-foreground text-lg">Calculate with complex numbers (a + bi)</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">First Number (a + bi)</h3>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Real (a)" value={a1} onChange={(e) => setA1(e.target.value)} type="number" step="any" />
                            <span className="text-2xl font-bold">+</span>
                            <Input placeholder="Imaginary (b)" value={b1} onChange={(e) => setB1(e.target.value)} type="number" step="any" />
                            <span className="text-xl font-bold">i</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Second Number (c + di)</h3>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Real (c)" value={a2} onChange={(e) => setA2(e.target.value)} type="number" step="any" />
                            <span className="text-2xl font-bold">+</span>
                            <Input placeholder="Imaginary (d)" value={b2} onChange={(e) => setB2(e.target.value)} type="number" step="any" />
                            <span className="text-xl font-bold">i</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={add}>Add</Button>
                    <Button onClick={subtract}>Subtract</Button>
                    <Button onClick={multiply}>Multiply</Button>
                    <Button onClick={modulus}>Modulus</Button>
                </div>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-2xl font-black mb-4">{result.operation} Result</h3>
                        <div className="text-xl font-mono">
                            {result.formula}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
