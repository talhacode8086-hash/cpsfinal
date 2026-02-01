"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TruthTableGenerator() {
    const [exprStr, setExprStr] = useState('A AND (B OR C)');
    const [table, setTable] = useState<any>(null);

    const generate = () => {
        try {
            // Normalize
            let norm = exprStr
                .replace(/AND/gi, '&&')
                .replace(/OR/gi, '||')
                .replace(/NOT/gi, '!')
                .replace(/XOR/gi, '!==') // XOR in JS boolean contexts (A !== B) works for binaries
                .replace(/->/g, '<='); // Implies: A <= B (Equivalent to !A || B)
            // Wait, JS doesn't have IMPLIES operator. A <= B is correct for logic (F<=T is T, T<=F is F).
            // But let's handle strict Implies manually or keep it simple.
            // Replace "A -> B" with "(!A || B)"
            // This replaces the operator, but we need A and B operand identification which is hard with regex.
            // Let's stick to standard JS operators for now and allow '&&', '||', '!'.

            // Find variables (unique letters)
            const vars = Array.from(new Set(exprStr.match(/[A-Z](?![A-Z])/g) || [])).sort();

            if (vars.length === 0) {
                setTable({ error: "No variables found. Use single uppercase letters (A, B, C)." });
                return;
            }

            const rows = [];
            const numRows = Math.pow(2, vars.length);

            for (let i = 0; i < numRows; i++) {
                // Generate row values
                // i = 0 -> 000, i=1 -> 001 ... (binary)
                // We want standard truth table order T/F
                // Usually starts with FFF or TTT. Let's do Standard: 0 to 2^n - 1.
                // Convert i to binary string, padded.
                // Actually, let's map directly.

                const rowVars: Record<string, boolean> = {};
                const rowVals = [];

                for (let v = 0; v < vars.length; v++) {
                    // The v-th variable bit
                    // Higher index var = lower bit?
                    // Standard: A (MSB), B, C (LSB)
                    // A changes slowest.
                    const shift = vars.length - 1 - v;
                    const val = (i >> shift) & 1;
                    rowVars[vars[v]] = val === 1;
                    rowVals.push(val === 1 ? 'T' : 'F');
                }

                // Evaluate
                // Replace vars in string with true/false
                let evalStr = norm;
                vars.forEach(v => {
                    // Regex to match whole word
                    const regex = new RegExp(`\\b${v}\\b`, 'g');
                    evalStr = evalStr.replace(regex, rowVars[v].toString());
                });

                // Result
                const res = new Function(`return ${evalStr}`)();
                rows.push({
                    vals: rowVals,
                    result: res ? 'T' : 'F'
                });
            }

            setTable({ vars, rows });

        } catch (e) {
            setTable({ error: "Invalid logic expression." });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Truth Table Generator</CardTitle>
                <p className="text-muted-foreground mt-2">Generate truth tables for boolean logic</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Logic Expression</Label>
                        <Input
                            value={exprStr}
                            onChange={(e) => setExprStr(e.target.value)}
                            placeholder="A AND B OR C"
                            className="font-mono text-lg"
                        />
                        <p className="text-xs text-muted-foreground">Supported: AND, OR, NOT, (, ). Use uppercase Variables (A, B...)</p>
                    </div>

                    <Button onClick={generate} className="w-full bg-primary/90 hover:bg-primary">
                        Generate Table
                    </Button>
                </div>

                {table && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {table.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {table.error}
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-primary/10">
                                <table className="w-full text-center border-collapse">
                                    <thead className="bg-primary/5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <tr>
                                            {table.vars.map((v: string) => (
                                                <th key={v} className="p-3 border-r border-primary/5">{v}</th>
                                            ))}
                                            <th className="p-3 text-primary bg-primary/5">Output</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono">
                                        {table.rows.map((row: any, i: number) => (
                                            <tr key={i} className={`border-t border-primary/5 ${row.result === 'T' ? 'bg-green-500/5' : ''}`}>
                                                {row.vals.map((val: string, j: number) => (
                                                    <td key={j} className={`p-3 border-r border-primary/5 ${val === 'T' ? 'text-green-500 font-bold' : 'text-red-500/70'}`}>
                                                        {val}
                                                    </td>
                                                ))}
                                                <td className={`p-3 font-bold ${row.result === 'T' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {row.result}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
