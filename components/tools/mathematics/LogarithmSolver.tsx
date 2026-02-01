"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy } from 'lucide-react';

export default function LogarithmSolver() {
    const [calcBase, setCalcBase] = useState('10');
    const [calcVal, setCalcVal] = useState('100');
    const [calcRes, setCalcRes] = useState<string | null>(null);

    const [solveBase, setSolveBase] = useState('2');
    const [solveY, setSolveY] = useState('3');
    const [solveRes, setSolveRes] = useState<string | null>(null);

    const calculateLog = () => {
        const b = parseFloat(calcBase);
        const x = parseFloat(calcVal);
        if (isNaN(b) || isNaN(x) || b <= 0 || b === 1 || x <= 0) {
            setCalcRes("Invalid input. Base must be > 0 and != 1. Value must be > 0.");
            return;
        }
        const res = Math.log(x) / Math.log(b);
        setCalcRes(`log${b}(${x}) = ${res.toString().includes('.') ? res.toFixed(6) : res}`);
    };

    const solveEquation = () => {
        // Solve log_b(x) = y => x = b^y
        const b = parseFloat(solveBase);
        const y = parseFloat(solveY);

        if (isNaN(b) || isNaN(y) || b <= 0 || b === 1) {
            setSolveRes("Invalid base. Base must be > 0 and != 1.");
            return;
        }

        const x = Math.pow(b, y);
        setSolveRes(`x = ${b}^${y} = ${x.toString().includes('e') ? x.toExponential(4) : (x % 1 === 0 ? x : x.toFixed(6))}`);
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Logarithm Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Calculate logs and solve logarithmic equations</p>
            </CardHeader>
            <CardContent className="p-8">
                <Tabs defaultValue="calculate" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="calculate">Calculate Log</TabsTrigger>
                        <TabsTrigger value="solve">Solve Equation</TabsTrigger>
                    </TabsList>

                    <TabsContent value="calculate" className="space-y-6">
                        <div className="flex gap-4 items-end">
                            <div className="space-y-2 flex-1">
                                <Label>Base (b)</Label>
                                <Input
                                    type="number"
                                    value={calcBase}
                                    onChange={(e) => setCalcBase(e.target.value)}
                                    placeholder="10"
                                />
                            </div>
                            <div className="space-y-2 flex-[2]">
                                <Label>Value (x)</Label>
                                <Input
                                    type="number"
                                    value={calcVal}
                                    onChange={(e) => setCalcVal(e.target.value)}
                                    placeholder="100"
                                />
                            </div>
                        </div>
                        <Button onClick={calculateLog} className="w-full">Calculate</Button>

                        {calcRes && (
                            <div className="p-4 bg-secondary/20 rounded-xl text-center font-mono text-xl animate-in fade-in">
                                {calcRes}
                            </div>
                        )}

                        <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
                            <p className="font-bold mb-2">Properties:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>log<sub>b</sub>(x) = ln(x) / ln(b)</li>
                                <li>log<sub>b</sub>(1) = 0</li>
                                <li>log<sub>b</sub>(b) = 1</li>
                            </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="solve" className="space-y-6">
                        <div className="text-center mb-4 text-lg font-medium">
                            Solve for x in: <span className="font-mono">log<sub>{solveBase || 'b'}</sub>(x) = {solveY || 'y'}</span>
                        </div>
                        <div className="flex gap-4 items-end">
                            <div className="space-y-2 flex-1">
                                <Label>Base (b)</Label>
                                <Input
                                    type="number"
                                    value={solveBase}
                                    onChange={(e) => setSolveBase(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 flex-1">
                                <Label>Result (y)</Label>
                                <Input
                                    type="number"
                                    value={solveY}
                                    onChange={(e) => setSolveY(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button onClick={solveEquation} className="w-full">Solve for x</Button>

                        {solveRes && (
                            <div className="p-4 bg-secondary/20 rounded-xl text-center font-mono text-xl animate-in fade-in">
                                {solveRes}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
