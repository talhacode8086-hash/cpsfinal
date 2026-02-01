"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from 'lucide-react';

export default function NumberBaseOperations() {
    const [num1, setNum1] = useState('1A');
    const [num2, setNum2] = useState('B');
    const [base, setBase] = useState('16');
    const [op, setOp] = useState('+');
    const [result, setResult] = useState<any>(null);

    const calculate = () => {
        try {
            const b = parseInt(base);
            // Parse inputs
            const n1 = parseInt(num1, b);
            const n2 = parseInt(num2, b);

            if (isNaN(n1) || isNaN(n2)) {
                setResult({ error: `Invalid numbers for base ${b}` });
                return;
            }

            let resDec = 0;
            if (op === '+') resDec = n1 + n2;
            else if (op === '-') resDec = n1 - n2;
            else if (op === '*') resDec = n1 * n2;
            else if (op === '/') {
                if (n2 === 0) { setResult({ error: "Division by zero" }); return; }
                resDec = Math.floor(n1 / n2); // Integer division for base ops usually
            }

            const resStr = resDec.toString(b).toUpperCase();

            setResult({
                dec1: n1,
                dec2: n2,
                decRes: resDec,
                resStr
            });

        } catch (e) {
            setResult({ error: "Calculation error" });
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Number Base Operations</CardTitle>
                <p className="text-muted-foreground mt-2">Arithmetic in Binary, Octal, Hex, and more</p>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <Label>Number 1</Label>
                        <Input value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="e.g. 101" />
                    </div>
                    <div className="w-[100px] space-y-2">
                        <Label>Operator</Label>
                        <Select value={op} onValueChange={setOp}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+">+</SelectItem>
                                <SelectItem value="-">-</SelectItem>
                                <SelectItem value="*">×</SelectItem>
                                <SelectItem value="/">÷ (Int)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                        <Label>Number 2</Label>
                        <Input value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="e.g. 11" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Base System</Label>
                    <Select value={base} onValueChange={setBase}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">Binary (Base 2)</SelectItem>
                            <SelectItem value="8">Octal (Base 8)</SelectItem>
                            <SelectItem value="10">Decimal (Base 10)</SelectItem>
                            <SelectItem value="16">Hexadecimal (Base 16)</SelectItem>
                            <SelectItem value="12">Duodecimal (Base 12)</SelectItem>
                            <SelectItem value="36">Base 36 (Alphanumeric)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={calculate} className="w-full bg-primary/90 hover:bg-primary">
                    Calculate
                </Button>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5">
                        {result.error ? (
                            <div className="p-4 bg-destructive/10 text-destructive rounded-lg font-bold text-center">
                                {result.error}
                            </div>
                        ) : (
                            <div className="p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Result (Base {base})</div>
                                <div className="text-4xl font-mono font-bold text-primary mb-4">{result.resStr}</div>

                                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/20 p-2 rounded-lg inline-block mx-auto">
                                    <span>Decimal Check:</span>
                                    <span className="font-mono">{result.dec1} {op} {result.dec2} = {result.decRes}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
