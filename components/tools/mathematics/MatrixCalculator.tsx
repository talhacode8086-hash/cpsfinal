"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, ChevronRight, Plus, Minus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as math from 'mathjs';

export default function MatrixCalculator() {
    const [matrixA, setMatrixA] = useState('[[1, 2], [3, 4]]');
    const [matrixB, setMatrixB] = useState('[[5, 6], [7, 8]]');
    const [result, setResult] = useState<any>(null);

    const parseMatrix = (str: string) => {
        try {
            // Support simple format: "1 2; 3 4" or JSON "[[1,2],[3,4]]"
            if (str.trim().startsWith('[')) {
                return JSON.parse(str);
            } else {
                return math.matrix(str.split(';').map(r => r.trim().split(/\s+/).map(Number))).toArray();
            }
        } catch (e) {
            throw new Error("Invalid matrix format. Use JSON [[1,2],[3,4]] or '1 2; 3 4'");
        }
    };

    const calculate = (op: string) => {
        setResult(null);
        try {
            const A = parseMatrix(matrixA);
            let res, stepDesc;

            if (op === 'det') {
                res = math.det(A);
                stepDesc = `Determinant of Matrix A`;
            } else if (op === 'add') {
                const B = parseMatrix(matrixB);
                res = math.add(A, B);
                stepDesc = `Matrix A + Matrix B`;
            } else if (op === 'sub') {
                const B = parseMatrix(matrixB);
                res = math.subtract(A, B);
                stepDesc = `Matrix A - Matrix B`;
            } else if (op === 'mul') {
                const B = parseMatrix(matrixB);
                res = math.multiply(A, B);
                stepDesc = `Matrix A × Matrix B`;
            } else if (op === 'inv') {
                res = math.inv(A);
                stepDesc = `Inverse of Matrix A`;
            } else if (op === 'cramer') {
                const B = parseMatrix(matrixB);
                // Check if B is a column vector
                const sizeA = math.size(A).valueOf() as number[];
                const sizeB = math.size(B).valueOf() as number[];

                // If B is entered as [1, 2], treat it as column vector [[1], [2]]
                let BVec = B;
                if (sizeB.length === 1) { // Vector [1, 2]
                    // Convert to column matrix for internal consistency if needed, 
                    // but math.det replacements need columns.
                    // Actually simplest is to extract values.
                }

                // Actually, let's just do it manually for 2x2 or 3x3 or general using mathjs subsetting
                const detA = math.det(A);
                if (math.abs(detA) < 1e-10) throw new Error("Determinant is zero. Unique solution does not exist.");

                // Get A as array
                const AArr = A.valueOf() as number[][];
                // Get B as array (flattened)
                const BArr = math.flatten(B).valueOf() as number[];

                if (AArr.length !== BArr.length) throw new Error(`Dimension mismatch: Matrix A is ${sizeA[0]}x${sizeA[1]} but B has ${BArr.length} elements.`);

                const n = AArr.length;
                const solutions = [];
                const steps = [`Determinant D (of A) = ${detA.toFixed(4)}`];

                for (let i = 0; i < n; i++) {
                    // Create matrix Ai by replacing i-th column with B
                    const Ai = AArr.map((row, idx) => {
                        const newRow = [...row];
                        newRow[i] = BArr[idx];
                        return newRow;
                    });

                    const detAi = math.det(Ai);
                    const xi = detAi / detA;
                    solutions.push(xi);
                    steps.push(`Dx${i + 1} (replace col ${i + 1}) = ${detAi.toFixed(4)}`);
                    steps.push(`x${i + 1} = Dx${i + 1} / D = ${detAi.toFixed(4)} / ${detA.toFixed(4)} = ${xi.toFixed(4)}`);
                }

                res = solutions; // Array of numbers
                stepDesc = "Cramer's Rule Solution";

                setResult({
                    label: stepDesc,
                    value: res, // Will format as array
                    steps: steps
                });
                return; // Early return as we set result manually with steps
            }

            setResult({
                label: stepDesc,
                value: res
            });
        } catch (err: any) {
            setResult({ error: err.message });
        }
    };

    const formatMatrix = (m: any) => {
        if (typeof m === 'number') return m.toFixed(4);
        if (Array.isArray(m)) {
            return (
                <div className="inline-block border-l-2 border-r-2 border-primary/50 px-2 py-1 mx-2">
                    {m.map((row: any[], i: number) => (
                        <div key={i} className="flex gap-4 justify-center">
                            {row.map((val: number, j: number) => (
                                <div key={j} className="w-12 text-center font-mono">{val.toFixed(2)}</div>
                            ))}
                        </div>
                    ))}
                </div>
            );
        }
        return JSON.stringify(m);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Grid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Matrix Calculator</CardTitle>
                <p className="text-muted-foreground mt-2">Operations, Determinants, and Inverses.</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Matrix A</label>
                            <span className="text-xs text-muted-foreground">Format: [[1,2],[3,4]]</span>
                        </div>
                        <textarea
                            value={matrixA}
                            onChange={(e) => setMatrixA(e.target.value)}
                            className="w-full h-32 rounded-2xl bg-muted/20 border-primary/10 p-4 font-mono text-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" onClick={() => calculate('det')} className="hover:bg-primary/10">Determinant (A)</Button>
                            <Button variant="outline" onClick={() => calculate('inv')} className="hover:bg-primary/10">Inverse (A)</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Matrix B</label>
                            <span className="text-xs text-muted-foreground">Optional for Det/Inv</span>
                        </div>
                        <textarea
                            value={matrixB}
                            onChange={(e) => setMatrixB(e.target.value)}
                            className="w-full h-32 rounded-2xl bg-muted/20 border-primary/10 p-4 font-mono text-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <Button onClick={() => calculate('add')} className="bg-primary hover:bg-primary/90"><Plus className="w-4 h-4" /></Button>
                            <Button onClick={() => calculate('sub')} className="bg-primary hover:bg-primary/90"><Minus className="w-4 h-4" /></Button>
                            <Button onClick={() => calculate('mul')} className="bg-primary hover:bg-primary/90"><X className="w-4 h-4" /></Button>
                        </div>
                    </div>
                </div>

                {result && (
                    <div className="space-y-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        {result.error ? (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{result.error}</AlertDescription>
                            </Alert>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-8 rounded-3xl bg-secondary/20 border border-primary/10 text-center space-y-4">
                                    <h3 className="text-sm font-black text-primary uppercase tracking-widest">{result.label}</h3>
                                    <div className="text-3xl font-bold font-mono text-foreground overflow-x-auto py-4">
                                        {formatMatrix(result.value)}
                                    </div>
                                </div>
                                {result.steps && (
                                    <div className="p-6 rounded-3xl bg-card border border-primary/5 space-y-4">
                                        <h3 className="text-sm font-black text-muted-foreground uppercase tracking-widest">Step-by-Step</h3>
                                        <div className="space-y-2 text-lg">
                                            {result.steps.map((step: string, i: number) => (
                                                <div key={i} className="flex gap-4 items-start">
                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-1">{i + 1}</div>
                                                    <div>{step}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-12 pt-12 border-t border-primary/5">
                    <CardTitle className="text-2xl font-bold text-center mb-6">Cramer's Rule Solver</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Coefficient Matrix (A)</label>
                            <span className="text-xs text-muted-foreground block">For System Ax = B</span>
                            <textarea
                                value={matrixA}
                                onChange={(e) => setMatrixA(e.target.value)}
                                className="w-full h-32 rounded-2xl bg-muted/20 border-primary/10 p-4 font-mono text-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Constants Vector (B)</label>
                            <span className="text-xs text-muted-foreground block">Format: [c1, c2, ...]</span>
                            <textarea
                                value={matrixB}
                                onChange={(e) => setMatrixB(e.target.value)}
                                className="w-full h-32 rounded-2xl bg-muted/20 border-primary/10 p-4 font-mono text-lg resize-none focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>
                    <Button onClick={() => calculate('cramer')} className="w-full mt-6 h-14 text-lg font-bold bg-primary hover:bg-primary/90">
                        Solve System (Cramer's Rule)
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
