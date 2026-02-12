'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Grid3x3, Plus, Minus, X, Divide } from 'lucide-react';
import { motion } from 'framer-motion';

type Matrix = number[][];

export default function MatrixCalculator() {
    const [rows1, setRows1] = useState(2);
    const [cols1, setCols1] = useState(2);
    const [rows2, setRows2] = useState(2);
    const [cols2, setCols2] = useState(2);
    const [matrix1, setMatrix1] = useState<Matrix>([[1, 2], [3, 4]]);
    const [matrix2, setMatrix2] = useState<Matrix>([[5, 6], [7, 8]]);
    const [result, setResult] = useState<Matrix | null>(null);
    const [operation, setOperation] = useState<string>('');

    const updateMatrix1Value = (i: number, j: number, value: string) => {
        const newMatrix = [...matrix1];
        newMatrix[i][j] = parseFloat(value) || 0;
        setMatrix1(newMatrix);
    };

    const updateMatrix2Value = (i: number, j: number, value: string) => {
        const newMatrix = [...matrix2];
        newMatrix[i][j] = parseFloat(value) || 0;
        setMatrix2(newMatrix);
    };

    const add = () => {
        if (rows1 !== rows2 || cols1 !== cols2) {
            alert('Matrices must have the same dimensions for addition');
            return;
        }
        const res: Matrix = matrix1.map((row, i) =>
            row.map((val, j) => val + matrix2[i][j])
        );
        setResult(res);
        setOperation('Addition');
    };

    const subtract = () => {
        if (rows1 !== rows2 || cols1 !== cols2) {
            alert('Matrices must have the same dimensions for subtraction');
            return;
        }
        const res: Matrix = matrix1.map((row, i) =>
            row.map((val, j) => val - matrix2[i][j])
        );
        setResult(res);
        setOperation('Subtraction');
    };

    const multiply = () => {
        if (cols1 !== rows2) {
            alert('Number of columns in Matrix 1 must equal number of rows in Matrix 2');
            return;
        }
        const res: Matrix = Array(rows1).fill(0).map(() => Array(cols2).fill(0));
        for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols2; j++) {
                let sum = 0;
                for (let k = 0; k < cols1; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                res[i][j] = sum;
            }
        }
        setResult(res);
        setOperation('Multiplication');
    };

    const determinant = (matrix: Matrix): number => {
        const n = matrix.length;
        if (n === 1) return matrix[0][0];
        if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

        let det = 0;
        for (let j = 0; j < n; j++) {
            const minor = matrix.slice(1).map(row => row.filter((_, idx) => idx !== j));
            det += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * determinant(minor);
        }
        return det;
    };

    const calculateDeterminant = () => {
        if (rows1 !== cols1) {
            alert('Matrix must be square to calculate determinant');
            return;
        }
        const det = determinant(matrix1);
        setResult([[det]]);
        setOperation('Determinant');
    };

    const renderMatrix = (matrix: Matrix, updateFn: (i: number, j: number, v: string) => void, rows: number, cols: number) => (
        <div className="inline-block">
            <div className="border-l-4 border-r-4 border-primary/30 px-2 py-4">
                {Array(rows).fill(0).map((_, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        {Array(cols).fill(0).map((_, j) => (
                            <Input
                                key={j}
                                type="number"
                                className="w-16 h-12 text-center font-mono"
                                value={matrix[i]?.[j] ?? 0}
                                onChange={(e) => updateFn(i, j, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="flex items-center justify-center gap-3">
                    <Grid3x3 className="h-12 w-12 text-primary" />
                    <h1 className="text-4xl font-black">Matrix Calculator Pro</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    Perform matrix operations with step-by-step visualization
                </p>
            </motion.div>

            <Card className="p-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Matrix 1 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Matrix A</h3>
                        <div className="flex gap-4">
                            <div className="space-y-2">
                                <Label>Rows</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rows1}
                                    onChange={(e) => {
                                        const r = parseInt(e.target.value) || 2;
                                        setRows1(r);
                                        setMatrix1(Array(r).fill(0).map(() => Array(cols1).fill(0)));
                                    }}
                                    className="w-20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Cols</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={cols1}
                                    onChange={(e) => {
                                        const c = parseInt(e.target.value) || 2;
                                        setCols1(c);
                                        setMatrix1(Array(rows1).fill(0).map(() => Array(c).fill(0)));
                                    }}
                                    className="w-20"
                                />
                            </div>
                        </div>
                        {renderMatrix(matrix1, updateMatrix1Value, rows1, cols1)}
                    </div>

                    {/* Matrix 2 */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Matrix B</h3>
                        <div className="flex gap-4">
                            <div className="space-y-2">
                                <Label>Rows</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rows2}
                                    onChange={(e) => {
                                        const r = parseInt(e.target.value) || 2;
                                        setRows2(r);
                                        setMatrix2(Array(r).fill(0).map(() => Array(cols2).fill(0)));
                                    }}
                                    className="w-20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Cols</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={cols2}
                                    onChange={(e) => {
                                        const c = parseInt(e.target.value) || 2;
                                        setCols2(c);
                                        setMatrix2(Array(rows2).fill(0).map(() => Array(c).fill(0)));
                                    }}
                                    className="w-20"
                                />
                            </div>
                        </div>
                        {renderMatrix(matrix2, updateMatrix2Value, rows2, cols2)}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button onClick={add} className="h-12">
                        <Plus className="mr-2 h-5 w-5" />
                        Add
                    </Button>
                    <Button onClick={subtract} className="h-12">
                        <Minus className="mr-2 h-5 w-5" />
                        Subtract
                    </Button>
                    <Button onClick={multiply} className="h-12">
                        <X className="mr-2 h-5 w-5" />
                        Multiply
                    </Button>
                    <Button onClick={calculateDeterminant} className="h-12">
                        <Divide className="mr-2 h-5 w-5" />
                        Det(A)
                    </Button>
                </div>
            </Card>

            {result && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="p-8 bg-primary/5">
                        <h3 className="text-2xl font-black mb-6">Result: {operation}</h3>
                        <div className="flex justify-center">
                            <div className="border-l-4 border-r-4 border-primary px-4 py-6 bg-background rounded-lg">
                                {result.map((row, i) => (
                                    <div key={i} className="flex gap-4 mb-2">
                                        {row.map((val, j) => (
                                            <div key={j} className="w-20 h-12 flex items-center justify-center font-mono font-bold text-lg border rounded bg-muted">
                                                {val.toFixed(2)}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
    );
}
