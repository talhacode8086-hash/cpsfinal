'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GeometryTheoremChecker() {
    const [shape, setShape] = useState('triangle');
    const [inputs, setInputs] = useState<any>({});
    const [result, setResult] = useState<any>(null);

    const checkTheorem = () => {
        if (shape === 'triangle') {
            const a = parseFloat(inputs.a);
            const b = parseFloat(inputs.b);
            const c = parseFloat(inputs.c);
            if (isNaN(a) || isNaN(b) || isNaN(c)) return;

            const sum = a + b + c;
            const isValid = Math.abs(sum - 180) < 0.1;
            setResult({
                theorem: "Angle Sum Property: Sum of angles = 180°",
                status: isValid ? 'VALID' : 'INVALID',
                details: `Sum: ${a}° + ${b}° + ${c}° = ${sum}°`,
                message: isValid ? 'The angles form a valid triangle.' : 'Angles MUST sum to 180° for a Euclidean triangle.'
            });
        } else if (shape === 'triangle_inequality') {
            const a = parseFloat(inputs.s1);
            const b = parseFloat(inputs.s2);
            const c = parseFloat(inputs.s3);
            if (isNaN(a) || isNaN(b) || isNaN(c)) return;

            const isValid = (a + b > c) && (a + c > b) && (b + c > a);
            setResult({
                theorem: "Triangle Inequality Theorem: Sum of two sides > third side",
                status: isValid ? 'VALID' : 'INVALID',
                details: `${a}+${b}>${c}, ${a}+${c}>${b}, ${b}+${c}>${a}`,
                message: isValid ? 'These side lengths can form a triangle.' : 'Sum of any two sides must be greater than the third side.'
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                    <ShieldCheck className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Geometry Theorem Checker</h1>
                </div>
                <p className="text-muted-foreground text-lg">Verify if shapes satisfy core geometric theorems</p>
            </motion.div>

            <Card className="p-8 space-y-6">
                <div className="flex gap-4">
                    <Button
                        variant={shape === 'triangle' ? 'default' : 'outline'}
                        onClick={() => { setShape('triangle'); setResult(null); }}
                        className="flex-1"
                    >Angle Sum</Button>
                    <Button
                        variant={shape === 'triangle_inequality' ? 'default' : 'outline'}
                        onClick={() => { setShape('triangle_inequality'); setResult(null); }}
                        className="flex-1"
                    >Triangle Inequality</Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {shape === 'triangle' ? (
                        <>
                            <Input placeholder="Angle 1" type="number" onChange={(e) => setInputs({ ...inputs, a: e.target.value })} />
                            <Input placeholder="Angle 2" type="number" onChange={(e) => setInputs({ ...inputs, b: e.target.value })} />
                            <Input placeholder="Angle 3" type="number" onChange={(e) => setInputs({ ...inputs, c: e.target.value })} />
                        </>
                    ) : (
                        <>
                            <Input placeholder="Side 1" type="number" onChange={(e) => setInputs({ ...inputs, s1: e.target.value })} />
                            <Input placeholder="Side 2" type="number" onChange={(e) => setInputs({ ...inputs, s2: e.target.value })} />
                            <Input placeholder="Side 3" type="number" onChange={(e) => setInputs({ ...inputs, s3: e.target.value })} />
                        </>
                    )}
                </div>
                <Button onClick={checkTheorem} className="w-full h-12 text-lg font-bold">Verify Theorem</Button>
            </Card>

            {result && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className={`p-8 border-2 ${result.status === 'VALID' ? 'bg-green-500/5 border-green-500/20 text-green-700' : 'bg-red-500/5 border-red-500/20 text-red-700'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck className="h-8 w-8" />
                            <h3 className="text-2xl font-black">{result.status}</h3>
                        </div>
                        <p className="font-bold text-lg mb-2">{result.theorem}</p>
                        <p className="font-mono mb-4">{result.details}</p>
                        <p className="italic text-muted-foreground">{result.message}</p>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
