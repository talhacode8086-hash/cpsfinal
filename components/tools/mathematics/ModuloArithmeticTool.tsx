"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ModuloArithmeticTool() {
    const [mode, setMode] = useState('power');
    // Mode Exp: a^b mod n
    const [ba, setBA] = useState('5');
    const [bb, setBB] = useState('13');
    const [bn, setBN] = useState('17');

    // Mode Inverse: a^-1 mod n
    const [invA, setInvA] = useState('3');
    const [invN, setInvN] = useState('11');

    const [result, setResult] = useState<string | null>(null);

    // Modular Exponentiation: (base^exp) % mod
    const modExp = (base: bigint, exp: bigint, mod: bigint) => {
        let res = 1n;
        let b = base % mod;
        let e = exp;
        while (e > 0n) {
            if (e % 2n === 1n) res = (res * b) % mod;
            b = (b * b) % mod;
            e /= 2n;
        }
        return res;
    };

    // Extended Euclidean Algorithm
    const extendedGCD = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
        if (a === 0n) return [b, 0n, 1n];
        const [g, x1, y1] = extendedGCD(b % a, a);
        const x = y1 - (b / a) * x1;
        const y = x1;
        return [g, x, y];
    };

    const modInverse = (a: bigint, m: bigint) => {
        const [g, x] = extendedGCD(a, m);
        if (g !== 1n) return null; // No inverse
        return ((x % m) + m) % m; // Handle negative inputs
    };

    const calculatePower = () => {
        try {
            const a = BigInt(ba);
            const b = BigInt(bb);
            const n = BigInt(bn);

            if (n <= 0n) { setResult("Modulus must be positive."); return; }

            const res = modExp(a, b, n);
            setResult(`${ba}^${bb} ≡ ${res} (mod ${bn})`);
        } catch (e) { setResult("Invalid input integers."); }
    };

    const calculateInverse = () => {
        try {
            const a = BigInt(invA);
            const n = BigInt(invN);

            if (n <= 0n) { setResult("Modulus must be positive."); return; }

            const inv = modInverse(a, n);
            if (inv === null) setResult(`${invA} has no modular inverse mod ${invN} (GCD is not 1).`);
            else setResult(`${invA}^-1 ≡ ${inv} (mod ${invN})`);
        } catch (e) { setResult("Invalid input integers."); }
    };

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <CardTitle className="text-3xl font-bold">Modulo Arithmetic</CardTitle>
                <p className="text-muted-foreground mt-2">Modular Exponentiation and Inverses</p>
            </CardHeader>
            <CardContent className="p-8">
                <Tabs value={mode} onValueChange={(v: string) => { setMode(v); setResult(null); }} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="power">Modular Exponentiation</TabsTrigger>
                        <TabsTrigger value="inverse">Modular Inverse</TabsTrigger>
                    </TabsList>

                    <TabsContent value="power" className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Base (a)</Label>
                                <Input value={ba} onChange={(e) => setBA(e.target.value)} placeholder="Base" />
                            </div>
                            <div className="space-y-2">
                                <Label>Exponent (b)</Label>
                                <Input value={bb} onChange={(e) => setBB(e.target.value)} placeholder="Exp" />
                            </div>
                            <div className="space-y-2">
                                <Label>Modulus (n)</Label>
                                <Input value={bn} onChange={(e) => setBN(e.target.value)} placeholder="Mod" />
                            </div>
                        </div>
                        <Button onClick={calculatePower} className="w-full">Calculate (a^b mod n)</Button>
                    </TabsContent>

                    <TabsContent value="inverse" className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Number (a)</Label>
                                <Input value={invA} onChange={(e) => setInvA(e.target.value)} placeholder="Num" />
                            </div>
                            <div className="space-y-2">
                                <Label>Modulus (n)</Label>
                                <Input value={invN} onChange={(e) => setInvN(e.target.value)} placeholder="Mod" />
                            </div>
                        </div>
                        <Button onClick={calculateInverse} className="w-full">Calculate Inverse (a^-1 mod n)</Button>
                    </TabsContent>

                    {result && (
                        <div className="mt-8 p-6 bg-secondary/20 rounded-xl border border-primary/10 text-center animate-in fade-in">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Result</div>
                            <div className="text-xl font-mono font-bold text-primary break-all">{result}</div>
                        </div>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
}
