'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Info, Zap, Settings2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

export default function IdealGasLaw() {
    const [p, setP] = useState(1);
    const [v, setV] = useState(22.4);
    const [n, setN] = useState(1);
    const [t, setT] = useState(273.15);
    const [solvingFor, setSolvingFor] = useState<'P' | 'V' | 'n' | 'T'>('P');

    const R = 0.08206; // L*atm/(mol*K)

    const calculate = () => {
        if (solvingFor === 'P') return (n * R * t) / v;
        if (solvingFor === 'V') return (n * R * t) / p;
        if (solvingFor === 'n') return (p * v) / (R * t);
        if (solvingFor === 'T') return (p * v) / (n * R);
        return 0;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Wind className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Ideal Gas Pro
                </CardTitle>
                <p className="text-muted-foreground mt-2">The ultimate PV=nRT solver with universal unit support.</p>
            </CardHeader>

            <CardContent className="p-4 md:p-8 space-y-8 md:space-y-12">
                <div className="flex justify-center gap-2 mb-8">
                    {['P', 'V', 'n', 'T'].map((target) => (
                        <Button
                            key={target}
                            variant={solvingFor === target ? 'default' : 'outline'}
                            onClick={() => setSolvingFor(target as any)}
                            className={`w-16 h-16 rounded-2xl text-xl font-black ${solvingFor === target ? 'bg-indigo-600 shadow-indigo-600/20' : 'border-indigo-500/10'}`}
                        >
                            {target}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {solvingFor !== 'P' && <GasInput label="Pressure (atm)" value={p} onChange={setP} min={0.1} max={10} step={0.1} />}
                        {solvingFor !== 'V' && <GasInput label="Volume (L)" value={v} onChange={setV} min={0.1} max={100} step={0.1} />}
                        {solvingFor !== 'n' && <GasInput label="Amount (mol)" value={n} onChange={setN} min={0.01} max={10} step={0.01} />}
                        {solvingFor !== 'T' && <GasInput label="Temperature (K)" value={t} onChange={setT} min={100} max={1000} step={1} />}
                    </div>

                    <div className="flex flex-col justify-center">
                        <motion.div
                            key={solvingFor}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Settings2 className="h-24 w-24" />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Calculated {solvingFor}</p>
                            <h3 className="text-4xl md:text-7xl font-black">{result.toFixed(3)}</h3>
                            <p className="text-xs font-bold mt-4 opacity-50 uppercase tracking-widest">
                                {solvingFor === 'P' ? 'atm' : solvingFor === 'V' ? 'Liters' : solvingFor === 'n' ? 'moles' : 'Kelvin'}
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 flex gap-4">
                    <Info className="h-6 w-6 text-indigo-500 shrink-0" />
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                        <b>Lab Tip:</b> R = 0.08206 L·atm/(mol·K). Ensure all inputs are converted to these base units before calculating for maximum accuracy.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function GasInput({ label, value, onChange, min, max, step }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{label}</label>
                <span className="font-bold text-sm bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-400">{value}</span>
            </div>
            <Slider
                value={[value]}
                onValueChange={(v) => onChange(v[0])}
                min={min}
                max={max}
                step={step}
                className="py-2"
            />
        </div>
    );
}
