'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function GasLawAdvanced() {
    const [mode, setMode] = useState<'Ideal' | 'Boyle' | 'Charles'>('Ideal');
    const [p, setP] = useState('1'); // atm
    const [v, setV] = useState('22.4'); // L
    const [n, setN] = useState('1'); // mol
    const [t, setT] = useState('273.15'); // K
    const [solveFor, setSolveFor] = useState<'P' | 'V' | 'n' | 'T'>('P');

    const R = 0.08206; // L*atm/(mol*K)

    const calculate = () => {
        const pv = parseFloat(p) || 0;
        const vv = parseFloat(v) || 0;
        const nv = parseFloat(n) || 0;
        const tv = parseFloat(t) || 0;

        let result = 0;
        let unit = '';

        if (mode === 'Ideal') {
            switch (solveFor) {
                case 'P': result = (nv * R * tv) / vv; unit = 'atm'; break;
                case 'V': result = (nv * R * tv) / pv; unit = 'L'; break;
                case 'n': result = (pv * vv) / (R * tv); unit = 'mol'; break;
                case 'T': result = (pv * vv) / (nv * R); unit = 'K'; break;
            }
        } else if (mode === 'Boyle') {
            // P1V1 = P2V2
            result = (pv * vv) / vv; // placeholder logic for simple solver
        }

        return { val: result.toFixed(3), unit };
    };

    const res = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-primary/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden font-scholar">
            <CardHeader className="text-center border-b border-primary/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">Gas Law Advanced</CardTitle>
                <p className="text-muted-foreground mt-2">Thermodynamic solver for PV=nRT and other fundamental gas laws.</p>
            </CardHeader>
            <CardContent className="p-12 space-y-12">
                <div className="flex justify-center mb-8">
                    <div className="bg-muted/10 p-2 rounded-2xl border border-primary/5 flex gap-2">
                        {['Ideal', 'Boyle', 'Charles'].map(m => (
                            <Button key={m} variant={mode === m ? 'default' : 'ghost'} onClick={() => setMode(m as any)} className="rounded-xl px-8 h-12 font-black">
                                {m} Law
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <GasInput label="Pressure (P)" sub="atm" value={p} onChange={setP} active={solveFor === 'P'} onSelect={() => setSolveFor('P')} />
                            <GasInput label="Volume (V)" sub="L" value={v} onChange={setV} active={solveFor === 'V'} onSelect={() => setSolveFor('V')} />
                            <GasInput label="Moles (n)" sub="mol" value={n} onChange={setN} active={solveFor === 'n'} onSelect={() => setSolveFor('n')} />
                            <GasInput label="Temp (T)" sub="K" value={t} onChange={setT} active={solveFor === 'T'} onSelect={() => setSolveFor('T')} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                        <div className="p-16 rounded-[4rem] bg-background border-4 border-primary/20 shadow-2xl flex flex-col items-center justify-center gap-4 text-primary relative group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3.8rem]" />
                            <p className="text-[10px] font-black uppercase text-primary/40 tracking-[0.4em]">SOLVING FOR {solveFor}</p>
                            <h2 className="text-7xl font-black">{res.val}<span className="text-xl ml-2 opacity-40">{res.unit}</span></h2>
                            <div className="px-6 py-2 rounded-2xl bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">
                                PV = nRT
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 rounded-[4rem] bg-primary/5 border border-primary/10 space-y-4">
                    <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-primary" />
                        <h4 className="text-lg font-black text-primary">Thermodynamic Insights</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        Standard Temperature and Pressure (STP) is defined as 0Â°C (273.15K) and 1 atm. At STP, one mole of any ideal gas occupies approximately 22.4 liters.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function GasInput({ label, sub, value, onChange, active, onSelect }: any) {
    return (
        <div
            onClick={onSelect}
            className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer group ${active ? 'bg-primary/5 border-primary' : 'bg-background border-primary/5 hover:border-primary/20'}`}
        >
            <div className="flex justify-between items-center mb-2">
                <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'text-primary' : 'text-primary/40'}`}>{label}</span>
                <span className="text-[8px] font-bold opacity-40">{sub}</span>
            </div>
            <Input
                type="number"
                value={active ? '?' : value}
                readOnly={active}
                onChange={(e) => onChange(e.target.value)}
                className={`h-10 text-xl font-black border-transparent bg-transparent p-0 text-center focus:ring-0 ${active ? 'text-primary' : ''}`}
            />
        </div>
    );
}
