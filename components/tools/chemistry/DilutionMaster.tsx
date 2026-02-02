'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets, Info, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function DilutionMaster() {
    const [m1, setM1] = useState(1.0);
    const [v1, setV1] = useState(100);
    const [m2, setM2] = useState(0.1);
    const [v2, setV2] = useState(1000);
    const [solvingFor, setSolvingFor] = useState<'M1' | 'V1' | 'M2' | 'V2'>('V1');

    const calculate = () => {
        if (solvingFor === 'M1') return (m2 * v2) / v1;
        if (solvingFor === 'V1') return (m2 * v2) / m1;
        if (solvingFor === 'M2') return (m1 * v1) / v2;
        if (solvingFor === 'V2') return (m1 * v1) / m2;
        return 0;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Droplets className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Dilution Master
                </CardTitle>
                <p className="text-muted-foreground mt-2">Solve M₁V₁ = M₂V₂ problems instantly with precision.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['M1', 'V1', 'M2', 'V2'].map((key) => (
                        <button
                            key={key}
                            onClick={() => setSolvingFor(key as any)}
                            className={`p-6 rounded-3xl border-2 transition-all text-center ${solvingFor === key
                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                : 'bg-muted/10 border-indigo-500/5 text-muted-foreground hover:border-indigo-500/20'
                                }`}
                        >
                            <span className="block text-2xl font-black">{key}</span>
                            <span className="text-[10px] uppercase font-bold opacity-60">Target</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {solvingFor !== 'M1' && <DilutionInput label="Initial Concentration (M1)" value={m1} onChange={setM1} />}
                        {solvingFor !== 'V1' && <DilutionInput label="Initial Volume (V1)" value={v1} onChange={setV1} unit="mL" />}
                        {solvingFor !== 'M2' && <DilutionInput label="Final Concentration (M2)" value={m2} onChange={setM2} />}
                        {solvingFor !== 'V2' && <DilutionInput label="Final Volume (V2)" value={v2} onChange={setV2} unit="mL" />}
                    </div>

                    <div className="flex flex-col justify-center">
                        <motion.div
                            key={solvingFor}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden"
                        >
                            <RefreshCw className="absolute top-8 right-8 h-8 w-8 opacity-10 animate-spin-slow" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-2">Required {solvingFor}</p>
                            <h3 className="text-4xl md:text-7xl font-black">{result.toFixed(3)}</h3>
                            <p className="text-xs font-bold mt-4 opacity-100 bg-white/10 py-2 rounded-full mx-auto w-32 uppercase tracking-widest">
                                {solvingFor.startsWith('M') ? 'Molar' : 'mL'}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Hint:</b> Always ensure your volume units are consistent (e.g., both in mL or both in L) before applying the dilution formula.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function DilutionInput({ label, value, onChange, unit = 'M' }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400 px-1">{label}</label>
            <div className="relative">
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    className="h-12 md:h-14 rounded-2xl bg-muted/20 border-indigo-500/10 text-lg font-bold pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-indigo-400 opacity-60">{unit}</span>
            </div>
        </div>
    );
}
