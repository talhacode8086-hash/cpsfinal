'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hash, Info, RefreshCw, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ComplexNumberPro() {
    const [real1, setReal1] = useState('3');
    const [imag1, setImag1] = useState('4');
    const [real2, setReal2] = useState('1');
    const [imag2, setImag2] = useState('-2');
    const [op, setOp] = useState<'add' | 'sub' | 'mult' | 'div'>('add');

    const calculate = () => {
        const r1 = parseFloat(real1) || 0;
        const i1 = parseFloat(imag1) || 0;
        const r2 = parseFloat(real2) || 0;
        const i2 = parseFloat(imag2) || 0;

        let resR = 0;
        let resI = 0;

        switch (op) {
            case 'add':
                resR = r1 + r2;
                resI = i1 + i2;
                break;
            case 'sub':
                resR = r1 - r2;
                resI = i1 - i2;
                break;
            case 'mult':
                // (a+bi)(c+di) = (ac - bd) + (ad + bc)i
                resR = r1 * r2 - i1 * i2;
                resI = r1 * i2 + i1 * r2;
                break;
            case 'div':
                // (a+bi)/(c+di) = [(ac + bd)/(c2+d2)] + [(bc - ad)/(c2+d2)]i
                const den = r2 * r2 + i2 * i2;
                if (den === 0) return { resR: 0, resI: 0, error: 'Division by Zero' };
                resR = (r1 * r2 + i1 * i2) / den;
                resI = (i1 * r2 - r1 * i2) / den;
                break;
        }

        const mod = Math.sqrt(resR * resR + resI * resI);
        const arg = Math.atan2(resI, resR) * (180 / Math.PI);

        return { resR, resI: resI.toFixed(2), resR_fixed: resR.toFixed(2), mod: mod.toFixed(2), arg: arg.toFixed(2) };
    };

    const result = calculate() as any;

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Hash className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Complex Number Pro</CardTitle>
                <p className="text-muted-foreground mt-2">Advanced arithmetic and polar conversions for imaginary number systems.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Complex Input 1 */}
                    <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em] text-center">Number 1 (a + bi)</p>
                        <div className="flex items-center gap-4 bg-background p-8 rounded-[3rem] border border-primary/5 shadow-inner">
                            <Input value={real1} onChange={(e) => setReal1(e.target.value)} className="h-16 text-3xl font-black text-center border-none bg-transparent" />
                            <span className="text-4xl font-black text-primary opacity-20">+</span>
                            <div className="relative">
                                <Input value={imag1} onChange={(e) => setImag1(e.target.value)} className="h-16 text-3xl font-black text-center border-none bg-transparent" />
                                <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-primary italic">i</span>
                            </div>
                        </div>
                    </div>

                    {/* Complex Input 2 */}
                    <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em] text-center">Number 2 (c + di)</p>
                        <div className="flex items-center gap-4 bg-background p-8 rounded-[3rem] border border-primary/5 shadow-inner">
                            <Input value={real2} onChange={(e) => setReal2(e.target.value)} className="h-16 text-3xl font-black text-center border-none bg-transparent" />
                            <span className="text-4xl font-black text-primary opacity-20">+</span>
                            <div className="relative">
                                <Input value={imag2} onChange={(e) => setImag2(e.target.value)} className="h-16 text-3xl font-black text-center border-none bg-transparent" />
                                <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-2xl font-black text-primary italic">i</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    {['add', 'sub', 'mult', 'div'].map(m => (
                        <Button
                            key={m}
                            variant={op === m ? 'default' : 'outline'}
                            onClick={() => setOp(m as any)}
                            className="h-14 rounded-2xl px-8 font-black uppercase text-xs tracking-widest"
                        >
                            {m === 'add' ? 'Add' : m === 'sub' ? 'Sub' : m === 'mult' ? 'Multiply' : 'Divide'}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="p-16 rounded-[4rem] bg-primary text-white border-4 border-primary shadow-3xl shadow-primary/30 flex flex-col items-center justify-center gap-4">
                        <p className="text-[10px] font-black uppercase text-white/50 tracking-[0.5em]">RECTANGULAR RESULT</p>
                        <h2 className="text-6xl font-black">
                            {result.resR_fixed} <span className="opacity-40">{parseFloat(result.resI) >= 0 ? '+' : ''}</span> {result.resI}<span className="italic ml-1">i</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <PolarStat label="Modulus |z|" value={result.mod} icon={<Calculator className="h-4 w-4" />} />
                        <PolarStat label="Argument (Arg z)" value={`${result.arg}Â°`} icon={<RefreshCw className="h-4 w-4" />} />
                        <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-primary/5 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-primary/40">Euler Form</span>
                            <span className="text-xl font-black text-primary font-mono">{result.mod}e^{result.arg}Â°i</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                    <Info className="h-6 w-6 text-amber-500 shrink-0 mt-1" />
                    <div className="text-xs text-muted-foreground leading-relaxed italic">
                        The complex plane uses the real part on the x-axis and the imaginary part on the y-axis. Multiplication in this plane corresponds to rotating and scaling the vectors.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function PolarStat({ label, value, icon }: any) {
    return (
        <div className="flex justify-between items-center p-6 rounded-3xl bg-background border border-primary/5 shadow-lg group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3">
                <div className="text-primary/20 group-hover:text-primary transition-colors">{icon}</div>
                <span className="text-[10px] font-black uppercase text-primary/40 tracking-widest">{label}</span>
            </div>
            <span className="text-2xl font-black text-primary">{value}</span>
        </div>
    );
}
