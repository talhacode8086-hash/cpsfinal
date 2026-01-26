'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Grid, Plus, Minus, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MatrixCalculatorPro() {
    const [matrixA, setMatrixA] = useState([[1, 2], [3, 4]]);
    const [matrixB, setMatrixB] = useState([[5, 6], [7, 8]]);
    const [op, setOp] = useState<'add' | 'sub' | 'mult'>('add');

    const updateMatrix = (m: 'A' | 'B', r: number, c: number, val: string) => {
        const v = parseInt(val) || 0;
        if (m === 'A') {
            const next = [...matrixA];
            next[r][c] = v;
            setMatrixA(next);
        } else {
            const next = [...matrixB];
            next[r][c] = v;
            setMatrixB(next);
        }
    };

    const calculate = () => {
        const res = [[0, 0], [0, 0]];
        if (op === 'add') {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    res[i][j] = matrixA[i][j] + matrixB[i][j];
                }
            }
        } else if (op === 'sub') {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    res[i][j] = matrixA[i][j] - matrixB[i][j];
                }
            }
        } else {
            // Multiplication
            res[0][0] = matrixA[0][0] * matrixB[0][0] + matrixA[0][1] * matrixB[1][0];
            res[0][1] = matrixA[0][0] * matrixB[0][1] + matrixA[0][1] * matrixB[1][1];
            res[1][0] = matrixA[1][0] * matrixB[0][0] + matrixA[1][1] * matrixB[1][0];
            res[1][1] = matrixA[1][0] * matrixB[0][1] + matrixA[1][1] * matrixB[1][1];
        }
        return res;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Grid className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Linear Matrix Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Perform arithmetic operations on 2x2 matrices with real-time result visualization.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Matrix A */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-center text-primary/40 tracking-widest">Matrix A</p>
                        <div className="grid grid-cols-2 gap-2 p-4 bg-background border-4 border-primary/5 rounded-[2rem] relative">
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                            <div className="absolute -right-2 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                            {matrixA.map((row, r) => row.map((val, c) => (
                                <Input
                                    key={`A-${r}-${c}`}
                                    type="number"
                                    value={val}
                                    onChange={(e) => updateMatrix('A', r, c, e.target.value)}
                                    className="w-16 h-16 text-center text-xl font-black rounded-xl border-transparent bg-muted/10 focus:bg-primary/5 hover:bg-muted/20"
                                />
                            )))}
                        </div>
                    </div>

                    {/* Operator */}
                    <div className="flex flex-col gap-2">
                        <OpBtn active={op === 'add'} onClick={() => setOp('add')} icon={<Plus />} />
                        <OpBtn active={op === 'sub'} onClick={() => setOp('sub')} icon={<Minus />} />
                        <OpBtn active={op === 'mult'} onClick={() => setOp('mult')} icon={<X />} />
                    </div>

                    {/* Matrix B */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-center text-primary/40 tracking-widest">Matrix B</p>
                        <div className="grid grid-cols-2 gap-2 p-4 bg-background border-4 border-primary/5 rounded-[2rem] relative">
                            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                            <div className="absolute -right-2 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                            {matrixB.map((row, r) => row.map((val, c) => (
                                <Input
                                    key={`B-${r}-${c}`}
                                    type="number"
                                    value={val}
                                    onChange={(e) => updateMatrix('B', r, c, e.target.value)}
                                    className="w-16 h-16 text-center text-xl font-black rounded-xl border-transparent bg-muted/10 focus:bg-primary/5 hover:bg-muted/20"
                                />
                            )))}
                        </div>
                    </div>

                    <ArrowRight className="h-8 w-8 text-primary opacity-20 hidden lg:block" />

                    {/* Result */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-center text-primary tracking-widest">Resulting Matrix</p>
                        <div className="grid grid-cols-2 gap-2 p-6 bg-primary/5 border-4 border-primary shadow-2xl shadow-primary/20 rounded-[2.5rem] relative">
                            <div className="absolute -left-2 top-2 bottom-2 w-1.5 bg-primary rounded-full" />
                            <div className="absolute -right-2 top-2 bottom-2 w-1.5 bg-primary rounded-full" />
                            {result.map((row, r) => row.map((val, c) => (
                                <div key={`R-${r}-${c}`} className="w-20 h-20 flex items-center justify-center text-3xl font-black text-primary animate-in zoom-in duration-300">
                                    {val}
                                </div>
                            )))}
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-muted/10 border border-primary/5 flex items-start gap-4">
                    <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-black text-primary mb-1 uppercase tracking-widest">Linear Algebra Concept:</p>
                        Matrix multiplication is <b>not commutative</b> (A Ã— B â‰  B Ã— A). Our solver follows official row-by-column multiplication rules for 2x2 arrays.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function OpBtn({ active, onClick, icon }: any) {
    return (
        <Button
            variant={active ? 'default' : 'outline'}
            size="icon"
            onClick={onClick}
            className={`h-12 w-12 rounded-xl transition-all ${active ? 'scale-110 shadow-lg' : 'opacity-40'}`}
        >
            {icon}
        </Button>
    );
}

function ArrowRight(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}
