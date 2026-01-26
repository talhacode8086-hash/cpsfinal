'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PhysicsFormulaSolver() {
    const [mode, setMode] = useState('Velocity'); // Velocity, Force, Energy
    const [vals, setVals] = useState<any>({ d: '100', t: '5', m: '10', a: '9.8' });

    const solve = () => {
        const { d, t, m, a } = vals;
        const dv = parseFloat(d) || 0;
        const tv = parseFloat(t) || 0;
        const mv = parseFloat(m) || 0;
        const av = parseFloat(a) || 0;

        switch (mode) {
            case 'Velocity': return { res: (dv / tv).toFixed(2), unit: 'm/s', formula: 'v = d / t' };
            case 'Force': return { res: (mv * av).toFixed(2), unit: 'N', formula: 'F = m Ã— a' };
            case 'Energy': return { res: (0.5 * mv * Math.pow(dv / tv, 2)).toFixed(2), unit: 'J', formula: 'KE = Â½mvÂ²' };
            default: return { res: '0', unit: '', formula: '' };
        }
    };

    const result = solve();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Physics Formula Solver</CardTitle>
                <p className="text-muted-foreground mt-2">Solve fundamental physics equations with real-time unit calculation.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Controls */}
                    <div className="w-full md:w-80 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-primary tracking-widest pl-2">Formula Type</label>
                            <div className="grid grid-cols-1 gap-2">
                                {['Velocity', 'Force', 'Energy'].map(m => (
                                    <Button
                                        key={m}
                                        variant={mode === m ? 'default' : 'outline'}
                                        onClick={() => setMode(m)}
                                        className="h-12 rounded-xl justify-between font-bold"
                                    >
                                        {m} {mode === m && <ArrowRight className="h-4 w-4" />}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-primary/5">
                            {mode === 'Velocity' && (
                                <>
                                    <PhyInput label="Distance (d)" sub="meters" value={vals.d} onChange={(v: string) => setVals({ ...vals, d: v })} />
                                    <PhyInput label="Time (t)" sub="seconds" value={vals.t} onChange={(v: string) => setVals({ ...vals, t: v })} />
                                </>
                            )}
                            {mode === 'Force' && (
                                <>
                                    <PhyInput label="Mass (m)" sub="kg" value={vals.m} onChange={(v) => setVals({ ...vals, m: v })} />
                                    <PhyInput label="Accel (a)" sub="m/sÂ²" value={vals.a} onChange={(v) => setVals({ ...vals, a: v })} />
                                </>
                            )}
                            {mode === 'Energy' && (
                                <>
                                    <PhyInput label="Mass (m)" sub="kg" value={vals.m} onChange={(v: string) => setVals({ ...vals, m: v })} />
                                    <PhyInput label="Velocity (v)" sub="m/s" value={vals.d} onChange={(v: string) => setVals({ ...vals, d: v })} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Result */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-8 bg-muted/20 rounded-[3rem] border border-primary/5 p-12">
                        <div className="text-center space-y-2">
                            <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">CALCULATED RESULT</p>
                            <h2 className="text-8xl font-black text-primary animate-in fade-in duration-500">{result.res}<span className="text-4xl ml-2 opacity-50">{result.unit}</span></h2>
                        </div>

                        <div className="px-10 py-4 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center">
                            <p className="text-[8px] font-black uppercase text-primary/60 mb-1">Standard Formula</p>
                            <p className="text-2xl font-black font-mono">{result.formula}</p>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex-1 p-6 rounded-2xl bg-background border border-primary/5 text-center">
                                <p className="text-[8px] font-black uppercase opacity-40">System Accuracy</p>
                                <p className="font-bold">Â±0.001</p>
                            </div>
                            <div className="flex-1 p-6 rounded-2xl bg-background border border-primary/5 text-center">
                                <p className="text-[8px] font-black uppercase opacity-40">Rounding</p>
                                <p className="font-bold">2 Decimals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ArrowRight(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}

function PhyInput({ label, sub, value, onChange }: any) {
    return (
        <div className="space-y-1">
            <div className="flex justify-between px-2">
                <span className="text-[10px] font-black uppercase text-primary/40">{label}</span>
                <span className="text-[10px] font-bold text-primary/40">{sub}</span>
            </div>
            <Input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-12 rounded-xl bg-background"
            />
        </div>
    );
}
