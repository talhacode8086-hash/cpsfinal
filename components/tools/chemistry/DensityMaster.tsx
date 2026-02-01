'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Boxes, Info, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function DensityMaster() {
    const [mass, setMass] = useState(100);
    const [volume, setVolume] = useState(50);
    const [density, setDensity] = useState(2.0);
    const [solvingFor, setSolvingFor] = useState<'D' | 'M' | 'V'>('D');

    const calculate = () => {
        if (solvingFor === 'D') return mass / volume;
        if (solvingFor === 'M') return density * volume;
        if (solvingFor === 'V') return mass / density;
        return 0;
    };

    const result = calculate();

    return (
        <Card className="max-w-4xl mx-auto border-indigo-500/10 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center border-b border-indigo-500/5 pb-8">
                <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <Boxes className="h-8 w-8 text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Density Master
                </CardTitle>
                <p className="text-muted-foreground mt-2">The fundamental trio: Mass, Volume, and Density.</p>
            </CardHeader>

            <CardContent className="p-8 space-y-12">
                <div className="grid grid-cols-3 gap-4">
                    {['D', 'M', 'V'].map((m) => (
                        <button
                            key={m}
                            onClick={() => setSolvingFor(m as any)}
                            className={`p-6 rounded-3xl border-2 transition-all text-center ${solvingFor === m
                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg'
                                    : 'bg-muted/10 border-indigo-500/5 text-muted-foreground hover:border-indigo-500/20'
                                }`}
                        >
                            <span className="block text-2xl font-black">{m}</span>
                            <span className="text-[8px] uppercase font-bold opacity-60">Target</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        {solvingFor !== 'D' && <DensityInput label="Density (ρ)" value={density} onChange={setDensity} unit="g/cm³" />}
                        {solvingFor !== 'M' && <DensityInput label="Mass (m)" value={mass} onChange={setMass} unit="g" />}
                        {solvingFor !== 'V' && <DensityInput label="Volume (V)" value={volume} onChange={setVolume} unit="cm³" />}
                    </div>

                    <div className="flex flex-col justify-center">
                        <motion.div
                            key={solvingFor}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-12 rounded-[4rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-600/40 text-center relative overflow-hidden"
                        >
                            <Boxes className="absolute top-0 left-0 p-8 opacity-10 h-32 w-32" />
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Calculated {solvingFor === 'D' ? 'Density' : solvingFor === 'M' ? 'Mass' : 'Volume'}</p>
                            <h3 className="text-7xl font-black">{result.toFixed(3)}</h3>
                            <p className="text-xs font-bold mt-4 opacity-70 uppercase tracking-widest">
                                {solvingFor === 'D' ? 'g / cm³' : solvingFor === 'M' ? 'grams' : 'cm³'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function DensityInput({ label, value, onChange, unit }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-indigo-400 px-1">{label}</label>
            <div className="relative">
                <Input type="number" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="h-16 rounded-xl border-indigo-500/10 font-bold pr-16" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black opacity-30">{unit}</span>
            </div>
        </div>
    );
}
